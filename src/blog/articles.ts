/**
 * Articles du blog : source unique utilisée par la page Blog, chaque article
 * (titre, description, données structurées), le sitemap et la pré-génération.
 *
 * Publier un brouillon :
 *   1. Emma enrichit le texte dans src/content/blog/<slug>.md
 *      (remplacer chaque encadré « > [!emma] » par son vécu, ajouter ses photos) ;
 *   2. mettre `status: 'publie'` et la date du jour dans `date` ci-dessous ;
 *   3. lancer « npm run build » : l'article entre dans le blog, le sitemap et Google.
 * Les brouillons ne sont visibles qu'en local (npm run dev), jamais sur le site en ligne.
 */
export interface BlogArticle {
  slug: string;
  /** Titre affiché et titre de l'onglet (sans le nom du site) */
  title: string;
  /** Résumé affiché sur la page Blog et description pour Google (environ 150 caractères) */
  description: string;
  image: string;
  imageAlt: string;
  /** Date de publication (AAAA-MM-JJ) */
  date: string;
  /** Date de dernière mise à jour, si l'article a été enrichi */
  updated?: string;
  tags: string[];
  /** 'brouillon' : visible uniquement en local ; 'publie' : en ligne et référencé */
  status: 'publie' | 'brouillon';
  /** Recherche Google principale visée par l'article (aide à la rédaction) */
  keyword?: string;
}

const galerie = (pays: string, fichier: string) => `/images/galeries/${pays}/${fichier}.jpg`;
const BROUILLON = { status: 'brouillon' as const, date: '2026-11-17' };

export const ARTICLES: BlogArticle[] = [
  // ------------------------------------------------------------------
  // Articles publiés
  // ------------------------------------------------------------------
  {
    slug: 'lofoten-organiser-votre-echappee-sereine-grand-nord',
    title: 'Lofoten : organiser votre échappée sereine dans le Grand Nord',
    description:
      'Ferries, tunnels, péages, budget : comment organiser un voyage aux Lofoten serein et sur mesure, sans la charge mentale de la logistique.',
    image: galerie('norvege', 'vue-panoramique-fjord-coucher-soleil-hauteur'),
    imageAlt: 'Vue panoramique sur un fjord norvégien au coucher du soleil',
    date: '2026-02-15',
    updated: '2026-11-17',
    tags: ['Lofoten', 'Norvège', 'Préparer son voyage'],
    status: 'publie',
  },
  {
    slug: 'bien-choisir-son-equipement-grand-nord',
    title: 'Bien choisir son équipement pour le Grand Nord',
    description:
      'Technique des trois couches, grand froid, indispensables oubliés : comment choisir son équipement pour voyager sereinement dans le Grand Nord.',
    image: galerie('finlande', 'riviere-hiver-glace-neige-foret-nordique-paysage'),
    imageAlt: 'Rivière gelée et forêt enneigée en Laponie finlandaise',
    date: '2026-01-28',
    updated: '2026-11-17',
    tags: ['Préparer son voyage', 'Hiver'],
    status: 'publie',
  },
  {
    slug: 'randonner-grand-nord-guide-insider',
    title: "Randonner dans le Grand Nord : le guide de l'insider",
    description:
      'Balisage, confort, timing et sécurité : mes conseils pour randonner sereinement en Norvège, en Suède et dans tout le Grand Nord.',
    image: galerie('norvege', 'route-panoramique-vallee-verte-ete'),
    imageAlt: 'Route panoramique dans une vallée verdoyante de Norvège en été',
    date: '2025-12-10',
    updated: '2026-11-17',
    tags: ['Randonnée', 'Préparer son voyage'],
    status: 'publie',
  },
  {
    slug: 'pourquoi-choisir-la-laponie-parenthese-hivernale',
    title: 'Pourquoi choisir la Laponie pour votre prochaine parenthèse hivernale ?',
    description:
      'Entre silence, immensités blanches et aurores boréales, la Laponie est une invitation à ralentir.',
    image: galerie('finlande', 'aurore-boreale-verte-montagnes-enneigees-nuit'),
    imageAlt: 'Aurore boréale verte au-dessus des montagnes enneigées de Laponie',
    date: '2025-11-05',
    updated: '2026-11-17',
    tags: ['Laponie', 'Hiver', 'Aurores boréales'],
    status: 'publie',
  },
  {
    slug: 'suede-secrete-immersion-foret-boreale',
    title: 'Suède secrète : immersion en forêt boréale',
    description:
      "Itinérance en canoë et bivouac en forêt boréale : vivre la Suède secrète au rythme de la pagaie, loin de l'agitation du quotidien.",
    image: galerie('suede', 'cabane-rouge-bord-lac-canoe'),
    imageAlt: "Cabane rouge et canoë au bord d'un lac en Suède",
    date: '2025-10-20',
    updated: '2026-11-17',
    tags: ['Suède', 'Nature'],
    status: 'publie',
  },

  // ------------------------------------------------------------------
  // Brouillons — Aurores boréales
  // ------------------------------------------------------------------
  {
    ...BROUILLON,
    slug: 'aurores-boreales-ou-et-quand-les-voir',
    title: 'Aurores boréales : où et quand les voir ? Le guide complet',
    description:
      "Saison, meilleures régions, heures et météo : tout pour maximiser vos chances de voir des aurores boréales en Islande, Norvège, Suède ou Finlande.",
    keyword: 'aurores boréales où et quand les voir',
    image: galerie('finlande', 'aurore-boreale-verte-montagnes-enneigees-nuit'),
    imageAlt: 'Aurore boréale verte au-dessus des montagnes enneigées de Laponie',
    tags: ['Aurores boréales'],
  },
  {
    ...BROUILLON,
    slug: 'prevoir-aurores-boreales-indice-kp',
    title: 'Prévoir une aurore boréale : indice Kp, météo et applications',
    description:
      "Indice Kp, nuages, vent solaire : apprenez à lire les prévisions et à choisir le bon soir pour partir à la chasse aux aurores boréales.",
    keyword: 'prévision aurore boréale indice kp',
    image: galerie('finlande', 'riviere-gelee-brume-hiver-laponie-paysage-nordique'),
    imageAlt: 'Rivière gelée dans la brume en Laponie, en hiver',
    tags: ['Aurores boréales'],
  },
  {
    ...BROUILLON,
    slug: 'photographier-aurores-boreales',
    title: 'Photographier les aurores boréales : réglages et conseils',
    description:
      'Smartphone ou appareil photo : réglages, trépied, mise au point et composition pour rapporter de belles images des aurores boréales.',
    keyword: 'photographier aurore boréale réglages',
    image: galerie('islande', 'montagne-enneigee-glacier-islande'),
    imageAlt: 'Montagne enneigée et glacier en Islande',
    tags: ['Aurores boréales'],
  },
  {
    ...BROUILLON,
    slug: 'aurores-boreales-tromso',
    title: 'Voir les aurores boréales à Tromsø : le guide',
    description:
      "Pourquoi Tromsø est l'une des meilleures bases pour observer les aurores, quand partir et comment s'éloigner des lumières de la ville.",
    keyword: 'aurores boréales Tromsø',
    image: galerie('norvege', 'vue-panoramique-fjord-coucher-soleil-hauteur'),
    imageAlt: 'Fjord norvégien vu des hauteurs au coucher du soleil',
    tags: ['Aurores boréales', 'Norvège'],
  },
  {
    ...BROUILLON,
    slug: 'aurores-boreales-islande',
    title: 'Aurores boréales en Islande : saison, lieux et conseils',
    description:
      "De septembre à avril, l'Islande offre de longues nuits propices aux aurores. Lieux, météo changeante et conseils pour les observer en sécurité.",
    keyword: 'aurores boréales Islande',
    image: galerie('islande', 'soleil-couchant-plage-diamant-islande'),
    imageAlt: 'Coucher de soleil sur la plage de diamants en Islande',
    tags: ['Aurores boréales', 'Islande'],
  },
  {
    ...BROUILLON,
    slug: 'islande-norvege-finlande-suede-quelle-destination',
    title: 'Islande, Norvège, Finlande ou Suède : quelle destination choisir ?',
    description:
      'Paysages, saisons, budget, activités : un comparatif clair des quatre grandes destinations du Grand Nord pour choisir celle qui vous ressemble.',
    keyword: 'Islande ou Norvège ou Finlande',
    image: galerie('norvege', 'village-maisons-rouges-fjord-norvege'),
    imageAlt: 'Village aux maisons rouges au bord d’un fjord en Norvège',
    tags: ['Inspiration'],
  },
  {
    ...BROUILLON,
    slug: 'aurores-boreales-abisko-laponie-suedoise',
    title: 'Abisko : voir les aurores en Laponie suédoise',
    description:
      "Grâce à son microclimat, Abisko est réputé pour ses ciels souvent dégagés. Comment y aller, quand partir et que faire en journée.",
    keyword: 'Abisko aurores boréales',
    image: galerie('finlande', 'renne-laponie-neige-animaux-sauvages-hiver'),
    imageAlt: 'Renne dans la neige en Laponie',
    tags: ['Aurores boréales', 'Suède', 'Laponie'],
  },
  {
    ...BROUILLON,
    slug: 'dormir-igloo-de-verre-laponie',
    title: 'Dormir dans un igloo de verre sous les aurores',
    description:
      "Igloos de verre, cabanes vitrées, aurora huts : comment choisir l'hébergement idéal pour admirer le ciel depuis son lit en Laponie.",
    keyword: 'igloo de verre Laponie',
    image: galerie('finlande', 'cabane-laponie-feu-de-bois-diner-hiver-ambiance'),
    imageAlt: 'Dîner au coin du feu dans une cabane de Laponie en hiver',
    tags: ['Aurores boréales', 'Laponie'],
  },

  // ------------------------------------------------------------------
  // Brouillons — Islande
  // ------------------------------------------------------------------
  {
    ...BROUILLON,
    slug: 'road-trip-islande-7-jours',
    title: "Road trip en Islande en 7 jours : l'itinéraire du sud",
    description:
      "Cercle d'Or, côte sud, glaciers et lagune de Jökulsárlón : un itinéraire réaliste d'une semaine pour découvrir l'Islande sans courir.",
    keyword: 'road trip Islande 7 jours',
    image: galerie('islande', 'lagune-glaciaire-icebergs-soleil'),
    imageAlt: 'Lagune glaciaire et icebergs au soleil en Islande',
    tags: ['Islande'],
  },
  {
    ...BROUILLON,
    slug: 'tour-islande-route-1',
    title: "Le tour de l'Islande par la route 1 : en combien de jours ?",
    description:
      "Faire le tour complet de l'île par la route circulaire : durée idéale, étapes clés, saisons et pièges à éviter.",
    keyword: 'tour Islande route 1',
    image: galerie('islande', 'riviere-glacee-canyon-islande'),
    imageAlt: 'Rivière glacée au fond d’un canyon en Islande',
    tags: ['Islande'],
  },
  {
    ...BROUILLON,
    slug: 'quand-partir-en-islande',
    title: 'Quand partir en Islande ? Le guide saison par saison',
    description:
      "Soleil de minuit, aurores, Hautes Terres, affluence : ce que chaque saison réserve en Islande pour choisir le bon moment.",
    keyword: 'quand partir en Islande',
    image: galerie('islande', 'rocher-basalte-plage-enneigee'),
    imageAlt: 'Rocher de basalte sur une plage enneigée en Islande',
    tags: ['Islande'],
  },
  {
    ...BROUILLON,
    slug: 'islande-en-hiver',
    title: "L'Islande en hiver : ce qu'il faut savoir avant de partir",
    description:
      "Jours courts, routes enneigées, grottes de glace et aurores : comment préparer un voyage en Islande en hiver en toute sérénité.",
    keyword: 'Islande en hiver',
    image: galerie('islande', 'interieur-grotte-glace-bleue'),
    imageAlt: 'Intérieur d’une grotte de glace bleue en Islande',
    tags: ['Islande', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 'conduire-en-islande',
    title: 'Conduire en Islande : règles, routes F et pièges à éviter',
    description:
      "Limitations, pistes F, gués, vent, moutons : les règles et les bons réflexes pour conduire en Islande sans mauvaise surprise.",
    keyword: 'conduire en Islande',
    image: galerie('islande', 'riviere-bleue-paysage-hiver-islande'),
    imageAlt: 'Rivière bleue dans un paysage d’hiver en Islande',
    tags: ['Islande', 'Préparer son voyage'],
  },
  {
    ...BROUILLON,
    slug: 'sources-chaudes-islande',
    title: "Les sources chaudes d'Islande : bains naturels et lagons",
    description:
      "Lagons aménagés, piscines locales, sources sauvages : profiter des eaux chaudes islandaises en respectant les lieux et les règles d'hygiène.",
    keyword: 'sources chaudes Islande',
    image: galerie('islande', 'source-chaude-vapeur-soleil-hiver'),
    imageAlt: 'Source chaude fumante au soleil d’hiver en Islande',
    tags: ['Islande'],
  },
  {
    ...BROUILLON,
    slug: 'budget-voyage-islande',
    title: 'Quel budget pour un voyage en Islande ?',
    description:
      "Vols, voiture, hébergements, repas, activités : les postes de dépenses d'un voyage en Islande et les astuces pour maîtriser votre budget.",
    keyword: 'budget voyage Islande',
    image: galerie('islande', 'texture-glace-bleue-islande'),
    imageAlt: 'Texture de glace bleue d’un glacier islandais',
    tags: ['Islande', 'Préparer son voyage'],
  },

  // ------------------------------------------------------------------
  // Brouillons — Norvège et Lofoten
  // ------------------------------------------------------------------
  {
    ...BROUILLON,
    slug: 'road-trip-lofoten-itineraire',
    title: 'Road trip aux Lofoten : itinéraire et conseils',
    description:
      "Reine, Hamnøy, plages arctiques et villages de pêcheurs : comment organiser un road trip aux Lofoten, étape par étape.",
    keyword: 'road trip Lofoten',
    image: galerie('norvege', 'maison-cabane-jardin-fleur-toit-norvege'),
    imageAlt: 'Maison norvégienne au toit végétalisé et fleuri',
    tags: ['Lofoten', 'Norvège'],
  },
  {
    ...BROUILLON,
    slug: 'lofoten-en-van',
    title: 'Les Lofoten en van : conseils pour une itinérance sereine',
    description:
      "Où dormir, comment respecter les lieux, quelle saison choisir : les clés d'un voyage en van réussi aux Lofoten.",
    keyword: 'Lofoten en van',
    image: galerie('norvege', 'mouton-traversant-route-montagne-toundra'),
    imageAlt: 'Mouton traversant une route de montagne en Norvège',
    tags: ['Lofoten', 'Norvège', 'Van'],
  },
  {
    ...BROUILLON,
    slug: 'quand-partir-aux-lofoten',
    title: 'Quand partir aux Lofoten ? Soleil de minuit ou aurores',
    description:
      "Été lumineux, automne coloré ou hiver aux aurores : ce que chaque saison offre aux Lofoten pour choisir la période qui vous ressemble.",
    keyword: 'quand partir aux Lofoten',
    image: galerie('norvege', 'reflet-coucher-soleil-nuages-lac-calme'),
    imageAlt: 'Reflet d’un coucher de soleil sur un lac calme en Norvège',
    tags: ['Lofoten', 'Norvège'],
  },
  {
    ...BROUILLON,
    slug: 'road-trip-fjords-norvege',
    title: 'Road trip dans les fjords de Norvège : itinéraire',
    description:
      "Geirangerfjord, Nærøyfjord, routes panoramiques et ferries : un itinéraire pour découvrir les fjords de l'ouest de la Norvège.",
    keyword: 'road trip fjords Norvège',
    image: galerie('norvege', 'vue-panoramique-fjord-coucher-soleil-hauteur'),
    imageAlt: 'Fjord norvégien vu des hauteurs au coucher du soleil',
    tags: ['Norvège'],
  },
  {
    ...BROUILLON,
    slug: 'van-norvege-regles',
    title: 'Voyager en van en Norvège : règles et bonnes pratiques',
    description:
      "Droit d'accès à la nature, bivouac, vidanges, ferries et péages : les règles pour voyager en van en Norvège de façon responsable.",
    keyword: 'van Norvège règles',
    image: galerie('norvege', 'route-panoramique-vallee-verte-ete'),
    imageAlt: 'Route panoramique dans une vallée verdoyante de Norvège',
    tags: ['Norvège', 'Van'],
  },
  {
    ...BROUILLON,
    slug: 'tromso-en-hiver-que-faire',
    title: 'Tromsø en hiver : que faire sous la nuit polaire ?',
    description:
      "Aurores, chiens de traîneau, fjords, culture sâme et ville arctique : les expériences à vivre à Tromsø pendant l'hiver.",
    keyword: 'Tromsø en hiver que faire',
    image: galerie('finlande', 'riviere-gelee-brume-hiver-laponie-paysage-nordique'),
    imageAlt: 'Paysage arctique enneigé dans la brume',
    tags: ['Norvège', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 'plus-belles-randonnees-norvege',
    title: 'Les plus belles randonnées de Norvège',
    description:
      "Preikestolen, Trolltunga, Reinebringen, Besseggen : les randonnées emblématiques de Norvège, leur niveau et la bonne saison.",
    keyword: 'randonnées Norvège',
    image: galerie('norvege', 'grande-cascade-ete-riviere-rochers'),
    imageAlt: 'Grande cascade en été en Norvège',
    tags: ['Norvège', 'Randonnée'],
  },
  {
    ...BROUILLON,
    slug: 'budget-voyage-norvege',
    title: 'Quel budget pour un voyage en Norvège ?',
    description:
      "Hébergements, voiture, ferries, péages, alimentation : les postes de dépenses d'un voyage en Norvège et les astuces pour garder le contrôle.",
    keyword: 'budget voyage Norvège',
    image: galerie('norvege', 'eglise-bois-debout-stave-church-norvege'),
    imageAlt: 'Église en bois debout (stavkirke) en Norvège',
    tags: ['Norvège', 'Préparer son voyage'],
  },

  // ------------------------------------------------------------------
  // Brouillons — Laponie finlandaise
  // ------------------------------------------------------------------
  {
    ...BROUILLON,
    slug: 'laponie-finlandaise-hiver-que-faire',
    title: 'Que faire en Laponie finlandaise en hiver ?',
    description:
      "Huskies, rennes, raquettes, sauna, aurores : les expériences incontournables d'un hiver en Laponie finlandaise, et comment bien les choisir.",
    keyword: 'Laponie finlandaise hiver que faire',
    image: galerie('finlande', 'nourrir-renne-laponie-hiver-experience-nordique'),
    imageAlt: 'Voyageur nourrissant un renne en Laponie en hiver',
    tags: ['Laponie', 'Finlande', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 'rovaniemi-village-pere-noel',
    title: 'Rovaniemi et le village du Père Noël : le guide',
    description:
      "Cercle polaire, village du Père Noël, activités et conseils pour vivre la magie de Noël à Rovaniemi, en famille ou à deux.",
    keyword: 'Rovaniemi village du Père Noël',
    image: galerie('finlande', 'renne-laponie-tourisme-hiver-photo-souvenir'),
    imageAlt: 'Renne en Laponie finlandaise en hiver',
    tags: ['Laponie', 'Finlande', 'Noël'],
  },
  {
    ...BROUILLON,
    slug: 'traineau-chiens-husky-laponie',
    title: 'Balade en traîneau à chiens : comment bien la choisir',
    description:
      "Courte balade ou expédition, mener son attelage, bien-être des chiens : comment choisir son activité husky en Laponie.",
    keyword: 'traîneau à chiens Laponie',
    image: galerie('finlande', 'paysage-hiver-lever-soleil-riviere-gelee-laponie'),
    imageAlt: 'Lever de soleil sur une rivière gelée en Laponie',
    tags: ['Laponie'],
  },
  {
    ...BROUILLON,
    slug: 'sauna-finlandais',
    title: 'Le sauna finlandais : rituel et bonnes manières',
    description:
      "Patrimoine culturel immatériel de l'UNESCO, le sauna est au cœur de la vie finlandaise. Origines, rituel et règles à connaître.",
    keyword: 'sauna finlandais rituel',
    image: galerie('finlande', 'cabane-laponie-feu-de-bois-diner-hiver-ambiance'),
    imageAlt: 'Cabane en bois chaleureuse en Laponie',
    tags: ['Finlande'],
  },
  {
    ...BROUILLON,
    slug: 'laponie-en-ete',
    title: 'La Laponie en été : soleil de minuit et grands espaces',
    description:
      "Randonnée, canoë, baies sauvages et lumière continue : pourquoi la Laponie est aussi une destination magnifique en été.",
    keyword: 'Laponie en été',
    image: galerie('suede', 'rayons-soleil-foret-pins-matin'),
    imageAlt: 'Rayons de soleil dans une forêt de pins au matin',
    tags: ['Laponie', 'Été'],
  },
  {
    ...BROUILLON,
    slug: 'culture-same-laponie',
    title: 'Découvrir la culture sâme avec respect',
    description:
      "Les Sâmes sont le seul peuple autochtone reconnu de l'Union européenne. Comment découvrir leur culture de façon respectueuse en Laponie.",
    keyword: 'culture sâme Laponie',
    image: galerie('finlande', 'renne-laponie-neige-animaux-sauvages-hiver'),
    imageAlt: 'Renne dans la neige en Laponie',
    tags: ['Laponie'],
  },

  // ------------------------------------------------------------------
  // Brouillons — Suède
  // ------------------------------------------------------------------
  {
    ...BROUILLON,
    slug: 'laponie-suedoise-kiruna-icehotel',
    title: "Laponie suédoise en hiver : Kiruna, Abisko et l'Icehotel",
    description:
      "De l'Icehotel de Jukkasjärvi au parc national d'Abisko : comment organiser un séjour d'hiver en Laponie suédoise.",
    keyword: 'Laponie suédoise hiver',
    image: galerie('finlande', 'peche-sur-glace-lac-gele-coucher-soleil-hiver'),
    imageAlt: 'Pêche sur un lac gelé au coucher du soleil',
    tags: ['Suède', 'Laponie', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 'canoe-suede-lacs-bivouac',
    title: 'Canoë en Suède : partir en itinérance sur les lacs',
    description:
      "Choisir sa région, préparer son itinérance, bivouaquer au bord de l'eau : le guide pour un voyage en canoë en Suède.",
    keyword: 'canoë Suède',
    image: galerie('suede', 'balade-canoe-lac-calme-crepuscule'),
    imageAlt: 'Balade en canoë sur un lac calme au crépuscule en Suède',
    tags: ['Suède', 'Nature'],
  },
  {
    ...BROUILLON,
    slug: 'allemansratten-droit-acces-nature',
    title: "Le droit d'accès à la nature en Scandinavie",
    description:
      "Allemansrätten en Suède, allemannsretten en Norvège, jokamiehenoikeus en Finlande : ce que vous pouvez faire dans la nature, et ce qui est interdit.",
    keyword: 'allemansrätten',
    image: galerie('suede', 'camping-foret-feu-camp-guimauves'),
    imageAlt: 'Bivouac en forêt autour d’un feu de camp en Suède',
    tags: ['Préparer son voyage', 'Nature'],
  },
  {
    ...BROUILLON,
    slug: 'kungsleden-randonnee',
    title: 'Kungsleden : la randonnée mythique de Laponie suédoise',
    description:
      "Refuges, étapes, saison et niveau : préparer la randonnée de la Kungsleden entre Abisko et Nikkaluokta.",
    keyword: 'Kungsleden randonnée',
    image: galerie('suede', 'lac-paisible-rochers-crepuscule'),
    imageAlt: 'Lac paisible et rochers au crépuscule',
    tags: ['Suède', 'Randonnée'],
  },

  // ------------------------------------------------------------------
  // Brouillons — Préparer son voyage et inspiration
  // ------------------------------------------------------------------
  {
    ...BROUILLON,
    slug: 'valise-grand-nord-hiver',
    title: 'Valise pour le Grand Nord en hiver : la liste complète',
    description:
      "Vêtements, accessoires, matériel photo et petits indispensables : la liste pour partir sereinement dans le Grand Nord en hiver.",
    keyword: 'valise Laponie hiver liste',
    image: galerie('finlande', 'riviere-hiver-glace-neige-foret-nordique-paysage'),
    imageAlt: 'Forêt enneigée et rivière gelée en hiver',
    tags: ['Préparer son voyage', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 's-habiller-grand-froid-trois-couches',
    title: "S'habiller par grand froid : la règle des 3 couches",
    description:
      "Laine mérinos, polaire, doudoune et coque : comprendre le système des trois couches pour rester au chaud sans transpirer.",
    keyword: 'règle des 3 couches grand froid',
    image: galerie('finlande', 'paysage-hiver-lever-soleil-riviere-gelee-laponie'),
    imageAlt: 'Paysage d’hiver au lever du soleil en Laponie',
    tags: ['Préparer son voyage', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 'conduire-neige-scandinavie',
    title: 'Conduire sur la neige en Scandinavie',
    description:
      "Pneus hiver, routes verglacées, animaux, nuit polaire : les règles et réflexes pour conduire en hiver en Norvège, Suède et Finlande.",
    keyword: 'conduire sur la neige Norvège Finlande',
    image: galerie('finlande', 'riviere-hiver-glace-neige-foret-nordique-paysage'),
    imageAlt: 'Route et forêt enneigées en hiver',
    tags: ['Préparer son voyage', 'Hiver'],
  },
  {
    ...BROUILLON,
    slug: 'soleil-de-minuit-nuit-polaire',
    title: 'Soleil de minuit et nuit polaire : comprendre et en profiter',
    description:
      "Pourquoi le soleil ne se couche pas en été et se lève à peine en hiver au-delà du cercle polaire, et comment bien vivre ces lumières extrêmes.",
    keyword: 'soleil de minuit nuit polaire',
    image: galerie('suede', 'coucher-soleil-rose-violet-lac-miroir'),
    imageAlt: 'Ciel rose et violet reflété sur un lac miroir',
    tags: ['Inspiration'],
  },
  {
    ...BROUILLON,
    slug: 'pourquoi-travel-planner-grand-nord',
    title: 'Pourquoi faire appel à un travel planner pour le Grand Nord ?',
    description:
      "Gain de temps, itinéraire réaliste, sécurité en hiver, transparence des prix : ce qu'un travel planner apporte à un voyage dans le Grand Nord.",
    keyword: 'travel planner Grand Nord',
    image: '/images/emma-travel-planner-grand-nord-falaise.webp',
    imageAlt: "Emma, travel planner, au sommet d'une falaise au-dessus de la mer",
    tags: ['Inspiration'],
  },
  {
    ...BROUILLON,
    slug: 'voyage-de-noces-grand-nord',
    title: 'Voyage de noces dans le Grand Nord : idées romantiques',
    description:
      "Aurores à deux, chalet avec sauna, fjords sous le soleil de minuit : des idées de voyage de noces romantique et hors des sentiers battus.",
    keyword: 'voyage de noces Laponie Norvège',
    image: galerie('suede', 'vue-proue-canoe-coucher-soleil-lac'),
    imageAlt: 'Proue d’un canoë face au coucher du soleil sur un lac',
    tags: ['Inspiration'],
  },
  {
    ...BROUILLON,
    slug: 'voyager-seule-grand-nord',
    title: 'Voyager seule dans le Grand Nord : conseils et sérénité',
    description:
      "Sécurité, choix des destinations, rencontres et organisation : comment vivre un voyage en solo dans le Grand Nord en toute confiance.",
    keyword: 'voyager seule Norvège Islande',
    image: galerie('suede', 'grand-feu-camp-foret-nuit'),
    imageAlt: 'Feu de camp dans une forêt nordique, la nuit',
    tags: ['Inspiration'],
  },
];

export const getArticle = (slug: string): BlogArticle => {
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) throw new Error(`Article introuvable : ${slug}`);
  return article;
};

export const findArticle = (slug: string): BlogArticle | undefined => ARTICLES.find((item) => item.slug === slug);

export const PUBLISHED_ARTICLES = ARTICLES.filter((article) => article.status === 'publie');
