import { useEffect } from "react";
import { Link } from "react-router-dom";

import InfiniteGrid from "./InfiniteGrid";
import { DestinationInfo } from "./DestinationInfo";
import "../styles/gallery.css";

interface GalleryLayoutProps {
  title: string;
  basePath: string;
  sources: { src: string; caption: string }[];
  data: { x: number; y: number; w: number; h: number }[];
  originalSize: { w: number; h: number };
}


// Infos personnalisées pour chaque destination
const destinationInfos: Record<string, { description: string; highlights: string[]; cta?: string; ctaLink?: string }> = {
  "Islande": {
    description: "L'île de feu et de glace : volcans, glaciers, cascades et paysages à couper le souffle. Parfait pour l'aventure et l'émerveillement.",
    highlights: [
      "Roadtrip entre volcans et glaciers",
      "Sources chaudes naturelles",
      "Aurores boréales et nuits magiques",
      "Paysages lunaires uniques au monde",
    ],
    cta: "Demander un devis Islande",
    ctaLink: "/devis?destination=islande",
  },
  "Norvège": {
    description: "Fjords majestueux, liberté totale en van ou en randonnée, nature brute et villages colorés. L'appel du grand nord scandinave.",
    highlights: [
      "Fjords spectaculaires et routes panoramiques",
      "Vie en van, liberté totale",
      "Randonnées et nature sauvage",
      "Villages de pêcheurs typiques",
    ],
    cta: "Demander un devis Norvège",
    ctaLink: "/devis?destination=norvege",
  },
  "Suède": {
    description: "Lacs paisibles, forêts profondes, cabanes rouges et slow life. Idéal pour se ressourcer et vivre la nature nordique.",
    highlights: [
      "Canoë sur les lacs sauvages",
      "Forêts et cabanes traditionnelles",
      "Ambiance slow travel et déconnexion",
      "Feux de camp et nuits étoilées",
    ],
    cta: "Demander un devis Suède",
    ctaLink: "/devis?destination=suede",
  },
  "Finlande": {
    description: "Nuit polaire, aurores boréales, sauna et douceur de vivre. Pour ralentir, se reconnecter et vivre l'hiver autrement.",
    highlights: [
      "Aurores boréales et nuit polaire",
      "Chalets bois & sauna traditionnel",
      "Rencontres avec les rennes",
      "Expériences nordiques authentiques",
    ],
    cta: "Demander un devis Finlande",
    ctaLink: "/devis?destination=finlande",
  },
};

const GalleryLayout = ({ title, basePath, sources, data, originalSize }: GalleryLayoutProps) => {
  const info = destinationInfos[title] || null;
  return (
    <div className="gallery-root">
      <header className="gallery-header">
        <Link to="/#destinations" className="gallery-back">
          Retour
        </Link>
        <div className="gallery-title">
          <h1>Galerie</h1>
          <h2>{title}</h2>
        </div>
      </header>
      {info && (
        <DestinationInfo
          title={title}
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