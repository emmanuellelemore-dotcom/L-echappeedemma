import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Hand } from "lucide-react";

import InfiniteGrid from "./InfiniteGrid";
import { DestinationInfo } from "./DestinationInfo";
import Seo from "@/components/Seo";
import { GALLERY_PAGES } from "@/seo/pages";
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
    cta: "Je commence mon échappée",
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
    cta: "Je commence mon échappée",
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
    cta: "Je commence mon échappée",
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
    cta: "Je commence mon échappée",
    ctaLink: "/devis?destination=finlande",
  },
};

const GalleryLayout = ({ title, basePath, sources, data, originalSize }: GalleryLayoutProps) => {
  const info = destinationInfos[title] || null;
  const seo = GALLERY_PAGES[title];
  return (
    <div className="gallery-root">
      {seo && (
        <Seo
          title={seo.title}
          description={seo.description}
          path={seo.path}
          image={`${basePath}/${sources[0]?.src}`}
          imageAlt={`Photo de voyage : ${title}`}
        />
      )}
      {/* Voiles haut et bas pour la lisibilité des commandes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-navy-deep/80 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-navy-deep/70 to-transparent" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-7">
        <Link to="/#destinations" className="btn-light btn-sm pointer-events-auto">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-right drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] md:absolute md:left-1/2 md:top-6 md:-translate-x-1/2 md:text-center"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/60">Galerie</p>
          <h1 className="font-serif text-2xl leading-tight text-white md:text-4xl">
            <span className="sr-only">Galerie </span>
            {title}
          </h1>
        </motion.div>

        <span aria-hidden="true" className="hidden md:block md:w-28" />
      </header>

      {/* Indication d'usage, qui s'efface d'elle-même */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.15, 0.8, 1], delay: 1 }}
        className="pointer-events-none absolute bottom-10 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/20 bg-navy-deep/50 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md md:flex"
      >
        <Hand className="h-4 w-4" aria-hidden="true" />
        Glissez pour explorer · cliquez pour agrandir
      </motion.p>
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