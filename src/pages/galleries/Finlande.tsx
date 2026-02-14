import GalleryLayout from "../../components/GalleryLayout";
import { galleryConfigs, gridData, originalSize } from "../../gallery/galleryData";

const Finlande = () => {
  const config = galleryConfigs.finlande;

  return (
    <GalleryLayout
      title={config.title}
      basePath={config.basePath}
      sources={config.sources}
      data={gridData}
      originalSize={originalSize}
    />
  );
};

export default Finlande;
