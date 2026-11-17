import { Helmet } from 'react-helmet';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, SITE_NAME, absoluteUrl } from '@/seo/site';

interface SeoProps {
  /** Titre de la page, sans le nom du site (vide pour l'accueil) */
  title?: string;
  description: string;
  /** Chemin de la page, utilisé pour l'adresse canonique (« /blog ») */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Exclut la page des moteurs de recherche (ex. page 404) */
  noindex?: boolean;
  /** Données structurées schema.org propres à la page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Balises de référencement d'une page : titre, description, adresse canonique,
 * aperçu pour les réseaux sociaux et données structurées.
 */
const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} · Travel planner Grand Nord, voyages sur mesure`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const structuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
