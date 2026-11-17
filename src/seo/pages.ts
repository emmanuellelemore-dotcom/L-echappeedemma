/**
 * Référencement de chaque page : titre (affiché dans l'onglet et dans Google),
 * description (le petit texte sous le titre dans Google) et réglages du sitemap.
 *
 * Bonnes pratiques :
 * - titre : environ 50 à 60 caractères, le nom du site est ajouté automatiquement ;
 * - description : environ 140 à 160 caractères, une phrase naturelle qui donne envie de cliquer.
 */
export interface PageSeo {
  path: string;
  /** Titre sans le nom du site (laisser vide pour l'accueil) */
  title?: string;
  description: string;
  /** Importance relative dans le sitemap (0 à 1) */
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  /** Page exclue des moteurs de recherche */
  noindex?: boolean;
}

export const PAGES = {
  home: {
    path: '/',
    description:
      "Travel planner indépendante, Emma conçoit votre voyage sur mesure en Islande, Norvège, Suède et Finlande : itinéraire, hébergements, aurores boréales et road trips.",
    priority: 1,
    changefreq: 'weekly',
  },
  emma: {
    path: '/emma',
    title: 'Qui suis-je ? Emma, travel planner du Grand Nord',
    description:
      "Après 25 ans de carrière et une année d'épreuves, Emma a retrouvé son souffle dans les grands espaces nordiques. Découvrez son histoire et sa façon de voyager.",
    priority: 0.8,
    changefreq: 'monthly',
  },
  prestations: {
    path: '/mes-prestations',
    title: 'Mes prestations de travel planner sur mesure',
    description:
      "Écoute, itinéraire jour par jour, sélection d'hébergements et carnet de route : découvrez comment Emma prépare votre voyage sur mesure dans le Grand Nord.",
    priority: 0.8,
    changefreq: 'monthly',
  },
  offres: {
    path: '/mes-offres',
    title: 'Offres et tarifs : voyage sur mesure dès 250 €',
    description:
      "L'Étincelle (visio-conseil, 100 €) ou L'Échappée (voyage sur mesure dès 250 €) : tarifs transparents, sans commission, et exemples de budgets en Islande, Laponie et Norvège.",
    priority: 0.9,
    changefreq: 'monthly',
  },
  village: {
    path: '/village-du-pere-noel',
    title: 'Voyage de Noël en Laponie : une idée cadeau magique',
    description:
      "Offrez la magie de Noël en Laponie : une échappée sur mesure au pays du Père Noël, à glisser sous le sapin pour créer des souvenirs à partager.",
    priority: 0.6,
    changefreq: 'yearly',
  },
  blog: {
    path: '/blog',
    title: 'Blog voyage Grand Nord : conseils et itinéraires',
    description:
      'Aurores boréales, Laponie, Lofoten, équipement, randonnée : conseils de terrain et itinéraires testés pour préparer votre voyage dans le Grand Nord.',
    priority: 0.9,
    changefreq: 'weekly',
  },
  devis: {
    path: '/devis',
    title: 'Demande de devis pour votre voyage sur mesure',
    description:
      'Décrivez vos envies, vos dates et votre budget : Emma vous recontacte pour un échange offert de 15 minutes et dessine votre échappée sur mesure.',
    priority: 0.7,
    changefreq: 'yearly',
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    description:
      'Une question sur votre voyage dans le Grand Nord ? Contactez Emma, travel planner à Sucy-en-Brie, par téléphone, e-mail ou formulaire.',
    priority: 0.6,
    changefreq: 'yearly',
  },
  charte: {
    path: '/charte-echappee',
    title: "La charte de l'Échappée",
    description:
      "Transparence, bienveillance et engagements : la charte qui encadre la relation entre Emma et ses voyageurs, du premier échange au dernier pas.",
    priority: 0.4,
    changefreq: 'yearly',
  },
  mentions: {
    path: '/mentions-legales',
    title: 'Mentions légales',
    description: "Mentions légales du site L'échappée d'Emma, travel planner indépendante à Sucy-en-Brie.",
    priority: 0.2,
    changefreq: 'yearly',
  },
  galerieIslande: {
    path: '/gallery/islande',
    title: 'Islande en photos : volcans, glaciers et lagunes',
    description:
      "L'île de feu et de glace en images : volcans, glaciers, cascades et sources chaudes. Laissez-vous inspirer pour votre voyage sur mesure en Islande.",
    priority: 0.6,
    changefreq: 'monthly',
  },
  galerieNorvege: {
    path: '/gallery/norvege',
    title: 'Norvège en photos : fjords, routes et villages',
    description:
      'Fjords majestueux, routes panoramiques et villages colorés en images : laissez-vous inspirer pour votre voyage sur mesure en Norvège.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  galerieSuede: {
    path: '/gallery/suede',
    title: 'Suède en photos : lacs, forêts et cabanes rouges',
    description:
      'Lacs paisibles, forêts profondes, canoë et cabanes rouges en images : laissez-vous inspirer pour votre voyage sur mesure en Suède.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  galerieFinlande: {
    path: '/gallery/finlande',
    title: 'Laponie finlandaise en photos : aurores et rennes',
    description:
      'Aurores boréales, rennes, rivières gelées et chalets en images : laissez-vous inspirer pour votre voyage sur mesure en Laponie finlandaise.',
    priority: 0.6,
    changefreq: 'monthly',
  },
} satisfies Record<string, PageSeo>;

/** Pages des galeries, par titre de destination (utilisé par GalleryLayout) */
export const GALLERY_PAGES: Record<string, PageSeo> = {
  Islande: PAGES.galerieIslande,
  Norvège: PAGES.galerieNorvege,
  Suède: PAGES.galerieSuede,
  Finlande: PAGES.galerieFinlande,
};
