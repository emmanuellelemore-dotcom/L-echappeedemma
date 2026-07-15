import { Helmet } from 'react-helmet';

const BASE_URL = 'https://www.lechappeedemma.com';
const SITE_NAME = "L'échappée d'Emma";
const DEFAULT_IMAGE = '/logo.png';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object | object[];
}

const SEO = ({
  title,
  description,
  canonical,
  robots = 'index, follow',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  structuredData,
}: SEOProps) => {
  const fullUrl = `${BASE_URL}${canonical}`;
  const fullImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
