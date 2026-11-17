// Mosaïque d'une tuile de 1522 × 1238 (répétée à l'infini).
// Aucune photo ne se chevauche, et les marges aux bords laissent un espace
// régulier aux raccords entre deux tuiles.
export const gridData = [
  { x: 60, y: 60, w: 420, h: 290 },
  { x: 560, y: 120, w: 460, h: 310 },
  { x: 1100, y: 60, w: 360, h: 250 },
  { x: 120, y: 450, w: 330, h: 420 },
  { x: 530, y: 540, w: 300, h: 220 },
  { x: 900, y: 480, w: 520, h: 350 },
  { x: 60, y: 960, w: 400, h: 230 },
  { x: 540, y: 860, w: 420, h: 300 },
  { x: 1040, y: 900, w: 380, h: 260 },
];

export const originalSize = { w: 1522, h: 1238 };

const buildSources = (files: string[], keywords: string[]) => {
  return files.map((file, i) => ({
    src: file,
    caption: keywords[i % keywords.length],
  }));
};

const islandeKeywords = ["Góðan daginn", "Glacier", "Hæ!", "Geyser", "Neiges"];
const norvegeKeywords = ["God ettermiddag", "Hei", "Montagnes", "Viking", "Natures"];
const suedeKeywords = ["Hej", "Tjena", "Lac", "Forêts", "Nord"];
const finlandeKeywords = ["Hyvää yötä !", "Aurore Boréale", "Renne", "Lac gelé", "Sauna"];

const norvegeFiles = [
  "grande-cascade-ete-riviere-rochers.jpg",
  "eglise-bois-debout-stave-church-norvege.jpg",
  "maison-cabane-jardin-fleur-toit-norvege.jpg",
  "forgerons-forge-historique-viking.jpg",
  "reflet-coucher-soleil-nuages-lac-calme.jpg",
  "mouton-traversant-route-montagne-toundra.jpg",
  "route-panoramique-vallee-verte-ete.jpg",
  "village-maisons-rouges-fjord-norvege.jpg",
  "vue-panoramique-fjord-coucher-soleil-hauteur.jpg",
];

const suedeFiles = [
  "balade-canoe-lac-calme-crepuscule.jpg",
  "vue-proue-canoe-coucher-soleil-lac.jpg",
  "coucher-soleil-rose-violet-lac-miroir.jpg",
  "rayons-soleil-foret-pins-matin.jpg",
  "grand-feu-camp-foret-nuit.jpg",
  "lac-paisible-rochers-crepuscule.jpg",
  "cabane-rouge-bord-lac-canoe.jpg",
  "nenuphars-lac-reflet-foret.jpg",
  "camping-foret-feu-camp-guimauves.jpg",
  
];

const islandeFiles = [
  "interieur-grotte-glace-bleue.jpg",
  "lagune-glaciaire-icebergs-soleil.jpg",
  "montagne-enneigee-glacier-islande.jpg",
  "riviere-bleue-paysage-hiver-islande.jpg",
  "riviere-glacee-canyon-islande.jpg",
  "rocher-basalte-plage-enneigee.jpg",
  "soleil-couchant-plage-diamant-islande.jpg",
  "source-chaude-vapeur-soleil-hiver.jpg",
  "texture-glace-bleue-islande.jpg",
];

const finlandeFiles = [
  "riviere-gelee-brume-hiver-laponie-paysage-nordique.jpg",
  "riviere-hiver-glace-neige-foret-nordique-paysage.jpg",
  "paysage-hiver-lever-soleil-riviere-gelee-laponie.jpg",
  "peche-sur-glace-lac-gele-coucher-soleil-hiver.jpg",
  "aurore-boreale-verte-montagnes-enneigees-nuit.jpg",
  "nourrir-renne-laponie-hiver-experience-nordique.jpg",
  "renne-laponie-tourisme-hiver-photo-souvenir.jpg",
  "renne-laponie-neige-animaux-sauvages-hiver.jpg",
   "cabane-laponie-feu-de-bois-diner-hiver-ambiance.jpg",
  
];

export const galleryConfigs = {
  islande: {
    title: "Islande",
    basePath: "/images/galeries/islande",
    sources: buildSources(islandeFiles, islandeKeywords),
  },
  norvege: {
    title: "Norvège",
    basePath: "/images/galeries/norvege",
    sources: buildSources(norvegeFiles, norvegeKeywords),
  },
  suede: {
    title: "Suède",
    basePath: "/images/galeries/suede",
    sources: buildSources(suedeFiles, suedeKeywords),
  },
  finlande: {
    title: "Finlande",
    basePath: "/images/galeries/finlande",
    sources: buildSources(finlandeFiles, finlandeKeywords),
  },
};
