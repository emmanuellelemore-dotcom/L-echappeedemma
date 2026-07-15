import { Link } from "react-router-dom";

import InfiniteGrid from "./InfiniteGrid";
import { DestinationInfo } from "./DestinationInfo";
import SEO from "./SEO";
import "../styles/gallery.css";

interface GalleryLayoutProps {
  title: string;
  basePath: string;
  sources: { src: string; caption: string }[];
  data: { x: number; y: number; w: number; h: number }[];
  originalSize: { w: number; h: number };
}


// Infos personnalisées pour chaque destination
const destinationInfos: Record<string, {
  seoTitle: string;
  description: string;
  highlights: string[];
  cta?: string;
  ctaLink?: string;
  canonicalPath: string;
  ogImage: string;
}> = {
  "Islande": {
    seoTitle: "Voyage sur mesure en Islande",
    description: "L'île de feu et de glace : volcans, glaciers, cascades et paysages à couper le souffle. Parfait pour l'aventure et l'émerveillement.",
    highlights: [
      "Roadtrip entre volcans et glaciers",
      "Sources chaudes naturelles",
      "Aurores boréales et nuits magiques",
      "Paysages lunaires uniques au monde",
    ],
    cta: "Je commence mon échappée",
    ctaLink: "/devis?destination=islande",
    canonicalPath: "/gallery/islande",
    ogImage: "/gallery/islande/soleil-couchant-plage-diamant-islande.jpg",
  },
  "Norvège": {
    seoTitle: "Voyage sur mesure en Norvège",
    description: "Fjords majestueux, liberté totale en van ou en randonnée, nature brute et villages colorés. L'appel du grand nord scandinave.",
    highlights: [
      "Fjords spectaculaires et routes panoramiques",
      "Vie en van, liberté totale",
      "Randonnées et nature sauvage",
      "Villages de pêcheurs typiques",
    ],
    cta: "Je commence mon échappée",
    ctaLink: "/devis?destination=norvege",
    canonicalPath: "/gallery/norvege",
    ogImage: "/gallery/norvege/vue-panoramique-fjord-coucher-soleil-hauteur.jpg",
  },
  "Suède": {
    seoTitle: "Voyage sur mesure en Suède",
    description: "Lacs paisibles, forêts profondes, cabanes rouges et slow life. Idéal pour se ressourcer et vivre la nature nordique.",
    highlights: [
      "Canoë sur les lacs sauvages",
      "Forêts et cabanes traditionnelles",
      "Ambiance slow travel et déconnexion",
      "Feux de camp et nuits étoilées",
    ],
    cta: "Je commence mon échappée",
    ctaLink: "/devis?destination=suede",
    canonicalPath: "/gallery/suede",
    ogImage: "/gallery/suede/coucher-soleil-rose-violet-lac-miroir.jpg",
  },
  "Finlande": {
    seoTitle: "Voyage sur mesure en Finlande",
    description: "Nuit polaire, aurores boréales, sauna et douceur de vivre. Pour ralentir, se reconnecter et vivre l'hiver autrement.",
    highlights: [
      "Aurores boréales et nuit polaire",
      "Chalets bois & sauna traditionnel",
      "Rencontres avec les rennes",
      "Expériences nordiques authentiques",
    ],
    cta: "Je commence mon échappée",
    ctaLink: "/devis?destination=finlande",
    canonicalPath: "/gallery/finlande",
    ogImage: "/gallery/finlande/aurore-boreale-verte-montagnes-enneigees-nuit.jpg",
  },
};

const buildStructuredData = (title: string, info: (typeof destinationInfos)[string]) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": info.seoTitle,
  "description": info.description,
  "url": `https://lechappeedemma.com${info.canonicalPath}`,
  "image": `https://lechappeedemma.com${info.ogImage}`,
  "touristType": "Voyageur indépendant cherchant une expérience nordique sur mesure",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://lechappeedemma.com/" },
      { "@type": "ListItem", "position": 2, "name": title, "item": `https://lechappeedemma.com${info.canonicalPath}` }
    ]
  }
});

const GalleryLayout = ({ title, basePath, sources, data, originalSize }: GalleryLayoutProps) => {
  const info = destinationInfos[title] || null;
  return (
    <div className="gallery-root">
      {info && (
        <SEO
          title={`${info.seoTitle} | L'échappée d'Emma`}
          description={`${info.description} Créez votre voyage sur mesure en ${title} avec Emma, travel planner spécialiste du Grand Nord.`}
          canonical={info.canonicalPath}
          ogImage={info.ogImage}
          structuredData={buildStructuredData(title, info)}
        />
      )}
      <header className="gallery-header">
        <Link to="/#destinations" className="gallery-back">
          Retour
        </Link>
        <div className="gallery-title">
          <span>Galerie</span>
          <h1>{title}</h1>
        </div>
      </header>
      {info && (
        <DestinationInfo
          title={info.seoTitle}
          description={info.description}
          highlights={info.highlights}
          cta={info.cta}
          ctaLink={info.ctaLink}
        />
      )}
      <div className="gallery-canvas">
        <InfiniteGrid
          sources={sources}
          data={data}
          originalSize={originalSize}
          basePath={basePath}
        />
      </div>
    </div>
  );
};

export default GalleryLayout;