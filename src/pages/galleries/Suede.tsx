import GalleryLayout from "../../components/GalleryLayout";
import { galleryConfigs, gridData, originalSize } from "../../gallery/galleryData";

const Suede = () => {
  const config = galleryConfigs.suede;

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

export default Suede;
