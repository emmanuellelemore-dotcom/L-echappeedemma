// Pré-génération du <head> de chaque page, lancée après « vite build ».
//
// Le site est une application React : sans JavaScript, toutes les pages ont le même
// titre. Ce script ouvre chaque page dans Chrome (sans fenêtre), récupère le titre,
// la description, l'aperçu social et les données structurées posés par le composant Seo,
// et écrit dist/_prerender/<page>.html. Le .htaccess sert ensuite ces fichiers.
// Le contenu de la page reste rendu par React : seul l'en-tête change.
//
// Si Chrome est introuvable, le build continue sans pré-génération (avertissement).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRoutes, SITE_URL } from './site-routes.mjs';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const OUT = path.join(DIST, '_prerender');
const SERVER_PORT = 4787;
const DEBUG_PORT = 9229 + Math.floor(Math.random() * 500);
const MARKER = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Supprime les dossiers vides de dist (ils créeraient des conflits avec les adresses des pages) */
const removeEmptyDirs = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
  }
  if (dir !== DIST && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
};

const findChrome = () =>
  [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].find((candidate) => candidate && fs.existsSync(candidate));

/** Petit serveur statique pour dist, avec retour sur index.html (comme le .htaccess) */
const startServer = (shell) =>
  http
    .createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(DIST, urlPath);
      if (file.startsWith(DIST) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        const types = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
        res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] ?? 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(shell);
      }
    })
    .listen(SERVER_PORT);

const connect = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const target = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()).find((t) => t.type === 'page');
      if (target) {
        const ws = new WebSocket(target.webSocketDebuggerUrl);
        await new Promise((resolve) => ws.addEventListener('open', resolve));
        let id = 0;
        const pending = new Map();
        ws.addEventListener('message', (event) => {
          const message = JSON.parse(event.data);
          if (message.id && pending.has(message.id)) {
            pending.get(message.id)(message);
            pending.delete(message.id);
          }
        });
        const send = (method, params = {}) =>
          new Promise((resolve) => {
            const callId = ++id;
            pending.set(callId, resolve);
            ws.send(JSON.stringify({ id: callId, method, params }));
          });
        return { ws, send };
      }
    } catch {
      // Chrome démarre encore
    }
    await sleep(250);
  }
  throw new Error('Impossible de se connecter à Chrome');
};

const main = async () => {
  removeEmptyDirs(DIST);

  const chromePath = findChrome();
  if (!chromePath) {
    console.warn('⚠ Chrome introuvable : pré-génération ignorée (définir CHROME_PATH pour l’activer).');
    return;
  }

  const shell = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  if (!MARKER.test(shell)) throw new Error('Repères <!-- seo:start --> / <!-- seo:end --> absents de index.html');

  const server = startServer(shell);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'prerender-'));
  const chrome = spawn(
    chromePath,
    ['--headless=new', '--disable-gpu', '--no-first-run', '--disable-component-update', '--disable-extensions', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, 'about:blank'],
    { stdio: 'ignore' },
  );

  // Fermeture : on attend que Chrome libère ses fichiers avant de supprimer son dossier
  // temporaire ; un échec de ce nettoyage ne doit jamais faire échouer le build.
  const cleanup = async () => {
    server.close();
    const exited = new Promise((resolve) => chrome.once('exit', resolve));
    chrome.kill();
    await Promise.race([exited, sleep(5000)]);
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        fs.rmSync(profile, { recursive: true, force: true });
        return;
      } catch {
        await sleep(500);
      }
    }
  };

  try {
    const { ws, send } = await connect();
    const evaluate = async (expression) =>
      (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

    fs.rmSync(OUT, { recursive: true, force: true });
    const routes = getRoutes();
    let done = 0;

    for (const route of routes) {
      await send('Page.navigate', { url: `http://127.0.0.1:${SERVER_PORT}${route.path}` });
      const expected = SITE_URL + route.path;
      let head = null;
      for (let i = 0; i < 60 && !head; i++) {
        await sleep(250);
        head = await evaluate(`(() => {
          const canonical = document.querySelector('link[rel="canonical"][data-react-helmet]');
          if (!canonical || canonical.href !== ${JSON.stringify(new URL(expected).toString())}) return null;
          // Article : attendre que le texte soit chargé (la FAQ pour Google en dépend)
          const article = document.querySelector('[data-article-ready]');
          if (article && (article.dataset.articleReady !== 'true' || !article.querySelector('h2'))) return null;
          const hasFaq = [...document.querySelectorAll('article h2')].some((h) => h.textContent.trim() === 'Questions fréquentes');
          const faqInHead = [...document.head.querySelectorAll('script[data-react-helmet]')].some((s) => s.textContent.includes('FAQPage'));
          if (hasFaq && !faqInHead) return null;
          const tags = [...document.head.querySelectorAll('[data-react-helmet]')].filter((tag) => tag.tagName !== 'TITLE');
          const title = document.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
          return ['<title>' + title + '</title>', ...tags.map((tag) => tag.outerHTML)].join('\\n    ');
        })()`);
      }
      if (!head) {
        console.warn(`⚠ ${route.path} : balises SEO non trouvées, page ignorée`);
        continue;
      }
      const html = shell.replace(MARKER, head);
      const file = route.path === '/' ? path.join(OUT, 'index.html') : path.join(OUT, `${route.path.slice(1)}.html`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html);
      done++;
    }

    ws.close();
    console.log(`Pré-génération : ${done}/${routes.length} pages`);
  } finally {
    await cleanup();
  }
};

main().catch((error) => {
  console.error('Pré-génération en échec :', error.message);
  process.exit(1);
});
