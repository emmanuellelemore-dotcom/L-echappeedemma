import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  name: string;
  tag: string;
  image: string;
  index: number;
  to: string;
}

const DestinationCard = ({ name, tag, image, index, to }: DestinationCardProps) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
    >
      <img
        src={image}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        alt={name}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 p-8 w-full text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-primary-foreground/60 mb-2 block uppercase">
          {tag}
        </span>
        <h2 className="text-2xl text-primary-foreground font-serif">{name}</h2>
      </div>
    </motion.div>
  );

  return (
    <Link
      to={to}
      aria-label={`Galerie ${name}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-3xl"
    >
      {card}
    </Link>
  );
};

export default DestinationCard;
