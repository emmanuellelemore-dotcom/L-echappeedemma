import { useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteGrid from "./InfiniteGrid";
import "../styles/gallery.css";

interface GalleryLayoutProps {
  title: string;
  basePath: string;
  sources: { src: string; caption: string }[];
  data: { x: number; y: number; w: number; h: number }[];
  originalSize: { w: number; h: number };
}

const GalleryLayout = ({ title, basePath, sources, data, originalSize }: GalleryLayoutProps) => {

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