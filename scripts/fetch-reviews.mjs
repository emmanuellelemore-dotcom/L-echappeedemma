/**
 * Copie des 5 avis Google les plus récents, récupérée à chaque build.
 *
 * Le site l'affiche immédiatement, puis la met à jour avec la version en direct dès que
 * l'API Render répond (le serveur gratuit peut mettre plusieurs secondes à se réveiller).
 *
 * Source : Google directement si la clé GOOGLE_PLACES_API_KEY est disponible en local
 * (.env.local), sinon l'API du site sur Render. La clé n'est jamais copiée dans le site.
 * En cas d'échec, la copie précédente est conservée : le build n'est jamais bloqué.
 */
import fs from 'node:fs';
import { fetchGoogleReviews, latestReviews } from '../server/googleReviews.js';

const OUT = new URL('../src/data/googleReviewsSnapshot.ts', import.meta.url);

const envValue = (name) => {
  if (process.env[name]) return process.env[name].trim();
  for (const file of ['.env.local', '.env', '.env.production']) {
    try {
      const text = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
      const value = text.match(new RegExp(`^${name}=(.*)$`, 'm'))?.[1]?.trim();
      if (value) return value;
    } catch {
      // fichier absent
    }
  }
  return '';
};

const fromGoogle = async () => {
  const apiKey = envValue('GOOGLE_PLACES_API_KEY');
  if (!apiKey) throw new Error('clé GOOGLE_PLACES_API_KEY absente');
  return fetchGoogleReviews({ apiKey, placeId: envValue('GOOGLE_PLACE_ID') || 'ChIJm2NF0mML5kcRXlMfFIy36ew' });
};

const fromRenderApi = async () => {
  const base = envValue('VITE_CONTACT_API_URL').replace(/\/$/, '');
  if (!base || base.includes('localhost')) throw new Error('VITE_CONTACT_API_URL absent');
  const data = await (await fetch(`${base}/api/reviews`, { signal: AbortSignal.timeout(90_000) })).json();
  if (!data.ok) throw new Error(data.error || 'réponse invalide');
  return { place: data.place, reviews: latestReviews(data.reviews || []) };
};

try {
  let result;
  try {
    result = await fromGoogle();
  } catch (error) {
    console.warn(`Avis Google : appel direct impossible (${error.message}), passage par l'API Render.`);
    result = await fromRenderApi();
  }
  if (!result.reviews.length) throw new Error('aucun avis renvoyé');

  const snapshot = { fetchedAt: new Date().toISOString(), place: result.place, reviews: result.reviews };
  fs.mkdirSync(new URL('.', OUT), { recursive: true });
  fs.writeFileSync(
    OUT,
    `// Fichier généré par scripts/fetch-reviews.mjs à chaque build : ne pas modifier à la main.
// Copie des 5 avis Google les plus récents, affichée immédiatement en attendant la version en direct.
import type { GoogleReviewsSnapshot } from './googleReviewsTypes';

export const GOOGLE_REVIEWS_SNAPSHOT: GoogleReviewsSnapshot = ${JSON.stringify(snapshot, null, 2)};
`,
  );
  console.log(
    `Avis Google : ${result.reviews.length} avis les plus récents copiés (note ${result.place?.rating}/5 sur ${result.place?.userRatingsTotal} avis) : ${result.reviews.map((r) => r.author).join(', ')}`,
  );
} catch (error) {
  const kept = fs.existsSync(OUT) ? 'la copie précédente est conservée' : 'aucune copie disponible';
  console.warn(`⚠ Avis Google non récupérés (${error.message}) : ${kept}.`);
}
