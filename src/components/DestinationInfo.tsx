import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface DestinationInfoProps {
  title: string;
  description: string;
  highlights: string[];
  cta?: string;
  ctaLink?: string;
}

const isDesktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

/**
 * Encart de la destination, en verre dépoli, ancré en bas à gauche de la galerie.
 * Ouvert par défaut sur ordinateur, replié sur mobile pour laisser voir les photos.
 */
export const DestinationInfo = ({ title, description, highlights, cta, ctaLink }: DestinationInfoProps) => {
  const [open, setOpen] = useState(isDesktop);

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-30 flex md:inset-x-auto md:bottom-8 md:left-8">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.section
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-navy-deep/75 p-6 text-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl md:w-[25rem] md:p-7"
            aria-label={`À propos de la destination ${title}`}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-accent-light">L'esprit de la destination</p>
                <p className="mt-2 font-serif text-3xl leading-none">{title}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                aria-label="Réduire l'encart"
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="relative mt-4 text-sm leading-relaxed text-white/75">{description}</p>

            <ul className="relative mt-5 space-y-2.5">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="mt-[0.15rem] text-[0.6rem] text-accent-light" aria-hidden="true">✦</span>
                  {highlight}
                </li>
              ))}
            </ul>

            {cta && ctaLink && (
              <Link to={ctaLink} className="btn-primary btn-sm btn-block relative mt-6">
                {cta}
              </Link>
            )}
          </motion.section>
        ) : (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="btn-light btn-sm pointer-events-auto bg-navy-deep/50"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
            Découvrir {title}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
