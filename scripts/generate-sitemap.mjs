// Génère public/sitemap.xml à partir des pages et des articles du site.
// Lancé automatiquement par « npm run build ».
import fs from 'node:fs';
import { getRoutes, SITE_URL } from './site-routes.mjs';
import { ARTICLES } from '../src/blog/articles.ts';

// Garde-fou : un article publié ne doit plus contenir d'encadré « À compléter par Emma »
for (const article of ARTICLES.filter((item) => item.status === 'publie')) {
  const file = new URL(`../src/content/blog/${article.slug}.md`, import.meta.url);
  if (!fs.existsSync(file)) console.warn(`⚠ Article publié sans texte : ${article.slug}`);
  else if (fs.readFileSync(file, 'utf8').includes('[!emma]'))
    console.warn(`⚠ Article publié contenant encore un encadré « À compléter par Emma » : ${article.slug}`);
}

const escape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const routes = getRoutes();

const urls = routes
  .map((route) => {
    const lines = [`    <loc>${escape(SITE_URL + route.path)}</loc>`];
    if (route.lastmod) lines.push(`    <lastmod>${route.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
    lines.push(`    <priority>${route.priority.toFixed(1)}</priority>`);
    for (const image of route.images) {
      lines.push(
        '    <image:image>',
        `      <image:loc>${escape(SITE_URL + image.loc)}</image:loc>`,
        '    </image:image>',
      );
    }
    return `  <url>\n${lines.join('\n')}\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml : ${routes.length} pages, ${routes.reduce((n, r) => n + r.images.length, 0)} images`);
