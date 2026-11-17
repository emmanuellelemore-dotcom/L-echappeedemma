// Liste des pages publiques du site, partagée par le sitemap et la pré-génération.
// Les fichiers .ts sont importés directement (Node 22.18+ sait lire le TypeScript simple).
import { PAGES } from '../src/seo/pages.ts';
import { ARTICLES } from '../src/blog/articles.ts';
import { galleryConfigs } from '../src/gallery/galleryData.ts';

export const SITE_URL = 'https://lechappeedemma.com';

const GALLERY_BY_PATH = {
  '/gallery/islande': galleryConfigs.islande,
  '/gallery/norvege': galleryConfigs.norvege,
  '/gallery/suede': galleryConfigs.suede,
  '/gallery/finlande': galleryConfigs.finlande,
};

/** Toutes les pages à référencer, avec leurs réglages de sitemap et leurs images */
export const getRoutes = () => {
  const pages = Object.values(PAGES)
    .filter((page) => !page.noindex)
    .map((page) => {
      const gallery = GALLERY_BY_PATH[page.path];
      return {
        path: page.path,
        priority: page.priority,
        changefreq: page.changefreq,
        images: gallery ? gallery.sources.map((source) => ({ loc: `${gallery.basePath}/${source.src}`, caption: source.caption })) : [],
      };
    });

  // Seuls les articles publiés sont référencés (les brouillons restent en local)
  const articles = ARTICLES.filter((article) => article.status === 'publie').map((article) => ({
    path: `/blog/${article.slug}`,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: article.updated ?? article.date,
    images: [{ loc: article.image, caption: article.imageAlt }],
  }));

  return [...pages, ...articles];
};
