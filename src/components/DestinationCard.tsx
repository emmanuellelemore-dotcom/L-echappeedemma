import type { MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  name: string;
  tag: string;
  image: string;
  index: number;
  to: string;
}

const MotionLink = motion(Link);
const TILT = 7; // inclinaison maximale en degrés

/**
 * Carte destination : photo plein cadre, inclinaison 3D qui suit le curseur,
 * reflet lumineux, double cadre intérieur et appel « Découvrir » au survol.
 */
const DestinationCard = ({ name, tag, image, index, to }: DestinationCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Position du curseur dans la carte, de 0 à 1
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 20, mass: 0.4 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-TILT, TILT]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [TILT, -TILT]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)`;

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - bounds.left) / bounds.width);
    py.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1100 }}
    >
      <MotionLink
        to={to}
        aria-label={`Découvrir la galerie ${name}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative block h-[420px] overflow-hidden rounded-[2rem] bg-navy-deep shadow-[0_24px_50px_-28px_hsl(var(--navy-deep)/0.7)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_hsl(var(--navy-deep)/0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-4 md:h-[480px]"
      >
        {/* Photo */}
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform ease-out [transition-duration:1400ms] group-hover:scale-[1.08]"
        />

        {/* Voiles de lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-navy-deep/10" />
        <div className="absolute inset-0 bg-navy-deep/0 transition-colors duration-700 group-hover:bg-navy-deep/10" />

        {/* Reflet qui suit le curseur */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />

        {/* Double cadre intérieur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-white/25 transition-all duration-700 group-hover:inset-4 group-hover:border-white/55"
        />

        {/* Haut : numéro + étiquette */}
        <div className="absolute inset-x-7 top-7 flex items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
          <span className="font-serif text-2xl italic text-white/85">{String(index + 1).padStart(2, '0')}</span>
          <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
            Galerie
          </span>
        </div>

        {/* Bas : nom de la destination */}
        <div className="absolute inset-x-7 bottom-8" style={{ transform: 'translateZ(40px)' }}>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-accent-light">{tag}</p>
          <h3 className="mt-2 font-serif text-4xl leading-none text-white md:text-[2.6rem]">{name}</h3>
          <div className="mt-5 h-px w-10 bg-white/60 transition-all duration-700 group-hover:w-24 group-hover:bg-accent-light" />
          <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/90 transition-all duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            Découvrir
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </MotionLink>
    </motion.div>
  );
};

export default DestinationCard;
