/**
 * Texte des articles (src/content/blog/<slug>.md), chargé à la demande :
 * chaque article est un petit fichier séparé, seul celui consulté est téléchargé.
 */
const loaders = import.meta.glob<string>('../content/blog/*.md', { query: '?raw', import: 'default' });

export const loadArticleContent = async (slug: string): Promise<string | null> => {
  const loader = loaders[`../content/blog/${slug}.md`];
  return loader ? loader() : null;
};
