import { ARTICLES, PUBLISHED_ARTICLES, type BlogArticle } from './articles';

/** En local (npm run dev), les brouillons sont visibles pour être relus ; en ligne, jamais. */
export const SHOW_DRAFTS = import.meta.env.DEV;

export const VISIBLE_ARTICLES: BlogArticle[] = (SHOW_DRAFTS ? ARTICLES : PUBLISHED_ARTICLES)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const isVisible = (article: BlogArticle) => article.status === 'publie' || SHOW_DRAFTS;
