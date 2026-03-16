import { useState } from 'react';
import { motion } from 'framer-motion';

type AmbassadorCardProps = {
  className?: string;
  compact?: boolean;
};

const AmbassadorCard = ({ className = '', compact = false }: AmbassadorCardProps) => {
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });

  return (
    <section
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
          active: true,
        });
      }}
      onMouseLeave={() => setPointer((current) => ({ ...current, active: false }))}
      className={`relative overflow-hidden rounded-3xl border border-accent/30 bg-[linear-gradient(135deg,rgba(219,39,119,0.08),rgba(255,255,255,0.96),rgba(244,114,182,0.12))] p-6 md:p-8 shadow-sm ${className}`.trim()}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        animate={{ opacity: pointer.active ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.24)_0%,rgba(244,114,182,0.12)_35%,rgba(244,114,182,0)_72%)] blur-2xl"
          animate={{
            x: pointer.x - 96,
            y: pointer.y - 96,
          }}
          transition={{ type: 'spring', stiffness: 140, damping: 22, mass: 0.3 }}
        />
      </motion.div>

      <div className="w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/90">Programme Ambassadeur</p>
        <h2 className="mt-3 text-2xl md:text-3xl font-serif text-primary">Un tarif tout doux pour votre fidélité</h2>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-primary/90">
          L'Échappée d'Emma grandit grâce à vous, et je tenais à vous en remercier.
        </p>

        <div className="mt-6 rounded-[1.75rem] border border-primary/10 bg-background/80 p-5 md:p-6 backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/60">Devenez ambassadeur</p>
          <p className="mt-3 text-base md:text-lg leading-relaxed text-primary">
            Partagez l'échappée et profitez de mon programme de parrainage « Gratitude & Bienvenue ».
          </p>

          <div className={`mt-5 grid gap-4 ${compact ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
            <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/65">Pour vos proches</p>
              <p className="mt-2 text-lg font-serif text-primary">Le Filleul</p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-primary/90">-10 % sur leur première création d'itinéraire.</p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/65">Pour vous</p>
              <p className="mt-2 text-lg font-serif text-primary">Votre prochaine échappée</p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-primary/90">
                -10 % sur votre prochaine échappée, que vous reveniez ou que vous parrainiez un proche.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm italic leading-relaxed text-primary/70">Note : le montant varie en fonction de l'offre.</p>
          <p className="mt-3 text-xs leading-relaxed text-primary/60">
            Offres applicables sur tous les itinéraires sur-mesure (hors offre Étincelle) et non cumulables.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AmbassadorCard;