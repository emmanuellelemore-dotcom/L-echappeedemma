export const gridData = [
  { x: 71, y: 58, w: 400, h: 270 },
  { x: 211, y: 255, w: 540, h: 360 },
  { x: 631, y: 158, w: 400, h: 270 },
  { x: 1191, y: 245, w: 260, h: 195 },
  { x: 351, y: 687, w: 260, h: 290 },
  { x: 751, y: 824, w: 205, h: 154 },
  { x: 911, y: 540, w: 260, h: 350 },
  { x: 1051, y: 803, w: 400, h: 300 },
  { x: 71, y: 922, w: 350, h: 260 },
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
    basePath: "/gallery/islande",
    sources: buildSources(islandeFiles, islandeKeywords),
  },
  norvege: {
    title: "Norvège",
    basePath: "/gallery/norvege",
    sources: buildSources(norvegeFiles, norvegeKeywords),
  },
  suede: {
    title: "Suède",
    basePath: "/gallery/suede",
    sources: buildSources(suedeFiles, suedeKeywords),
  },
  finlande: {
    title: "Finlande",
    basePath: "/gallery/finlande",
    sources: buildSources(finlandeFiles, finlandeKeywords),
  },
};
