/** Adresse officielle du site (sans www : le .htaccess redirige www vers cette adresse) */
export const SITE_URL = 'https://lechappeedemma.com';
export const SITE_NAME = "L'échappée d'Emma";

/** Image affichée lors des partages (Facebook, WhatsApp, LinkedIn…) : 1200 × 630 */
export const DEFAULT_OG_IMAGE = '/og-image.jpg';
export const DEFAULT_OG_IMAGE_ALT = 'Aurore boréale verte au-dessus des montagnes enneigées de Laponie';

/** Construit une adresse complète à partir d'un chemin (« /blog » → « https://lechappeedemma.com/blog ») */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
