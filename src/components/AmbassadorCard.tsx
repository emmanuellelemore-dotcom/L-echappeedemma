import { useState, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type AmbassadorCardProps = {
  className?: string;
  compact?: boolean;
};

type AmbassadorBenefitCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const useHaloPointer = (haloSize: number) => {
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(-haloSize);
  const pointerY = useMotionValue(-haloSize);
  const x = useSpring(pointerX, { stiffness: 240, damping: 30, mass: 0.18 });
  const y = useSpring(pointerY, { stiffness: 240, damping: 30, mass: 0.18 });

  const getPointerPosition = (event: ReactMouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - bounds.left - haloSize / 2,
      y: event.clientY - bounds.top - haloSize / 2,
    };
  };

  const enterPointer = (event: ReactMouseEvent<HTMLElement>) => {
    const nextPointer = getPointerPosition(event);

    pointerX.jump(nextPointer.x);
    pointerY.jump(nextPointer.y);
    x.jump(nextPointer.x);
    y.jump(nextPointer.y);
    setActive(true);
  };

  const updatePointer = (event: ReactMouseEvent<HTMLElement>) => {
    const nextPointer = getPointerPosition(event);

    pointerX.set(nextPointer.x);
    pointerY.set(nextPointer.y);

    if (!active) {
      setActive(true);
    }
  };

  const hidePointer = () => setActive(false);

  return { active, x, y, enterPointer, updatePointer, hidePointer };
};

const AmbassadorBenefitCard = ({ eyebrow, title, description }: AmbassadorBenefitCardProps) => {
  const halo = useHaloPointer(144);

  return (
    <motion.div
      onMouseEnter={halo.enterPointer}
      onMouseMove={halo.updatePointer}
      onMouseLeave={halo.hidePointer}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-[1.6rem] border border-accent/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(244,228,235,0.92),rgba(248,240,243,0.84))] p-5 shadow-[0_18px_45px_rgba(36,46,89,0.08)]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        animate={{ opacity: halo.active ? 1 : 0 }}
        transition={{ duration: 0.14, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.28)_0%,rgba(244,114,182,0.12)_42%,rgba(244,114,182,0)_72%)] blur-2xl"
          style={{ x: halo.x, y: halo.y }}
        />
      </motion.div>

      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="absolute -left-10 bottom-0 h-20 w-20 rounded-full bg-primary/8 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary/65">{eyebrow}</p>
          <span className="rounded-full border border-accent/25 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent shadow-sm">
            -10 %
          </span>
        </div>
        <p className="mt-3 text-xl font-serif text-primary">{title}</p>
        <div className="mt-4 h-px w-14 bg-gradient-to-r from-accent/70 to-transparent" />
        <p className="mt-4 text-sm md:text-base leading-relaxed text-primary/90">{description}</p>
      </div>
    </motion.div>
  );
};

const AmbassadorCard = ({ className = '', compact = false }: AmbassadorCardProps) => {
  const halo = useHaloPointer(192);

  return (
    <section
      onMouseEnter={halo.enterPointer}
      onMouseMove={halo.updatePointer}
      onMouseLeave={halo.hidePointer}
      className={`relative overflow-hidden rounded-3xl border border-accent/30 bg-[linear-gradient(135deg,rgba(219,39,119,0.08),rgba(255,255,255,0.96),rgba(244,114,182,0.12))] p-6 md:p-8 shadow-sm ${className}`.trim()}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        animate={{ opacity: halo.active ? 1 : 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.24)_0%,rgba(244,114,182,0.12)_35%,rgba(244,114,182,0)_72%)] blur-2xl"
          style={{ x: halo.x, y: halo.y }}
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
            <AmbassadorBenefitCard
              eyebrow="Pour vos proches"
              title="Le Filleul"
              description="-10 % sur leur première création d'itinéraire."
            />

            <AmbassadorBenefitCard
              eyebrow="Pour vous"
              title="Votre prochaine échappée"
              description="-10 % sur votre prochaine échappée, que vous reveniez ou que vous parrainiez un proche."
            />
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