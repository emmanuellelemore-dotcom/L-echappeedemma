import type { BlogArticle } from '@/blog/articles';
import { SITE_NAME, SITE_URL, absoluteUrl } from './site';

/** Données structurées (schema.org) : elles aident Google à comprendre le contenu des pages */

type JsonLd = Record<string, unknown>;

const EMMA = {
  '@type': 'Person',
  name: 'Emma',
  jobTitle: 'Travel planner',
  url: absoluteUrl('/emma'),
};

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const articleJsonLd = (article: BlogArticle): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  description: article.description,
  image: absoluteUrl(article.image),
  datePublished: article.date,
  dateModified: article.updated ?? article.date,
  inLanguage: 'fr-FR',
  author: EMMA,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') },
  },
  mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  keywords: article.tags.join(', '),
});

export const faqJsonLd = (items: { question: string; answer: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export const aboutPageJsonLd = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: absoluteUrl('/emma'),
  mainEntity: {
    ...EMMA,
    image: absoluteUrl('/Emma.JPG'),
    worksFor: { '@type': 'TravelAgency', name: SITE_NAME, url: SITE_URL },
    knowsAbout: ['Islande', 'Norvège', 'Lofoten', 'Suède', 'Finlande', 'Laponie', 'Aurores boréales', 'Road trip en van'],
  },
});
