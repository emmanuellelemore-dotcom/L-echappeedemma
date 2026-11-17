import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useHaloPointer } from '@/hooks/use-halo-pointer';

export type OfferEmblem = 'spark' | 'horizon';

export interface Offer {
  id: string;
  kicker: string;
  name: string;
  need: string;
  solution: string;
  pricePrefix?: string;
  price: string;
  feeNote?: string;
  emblem: OfferEmblem;
  /** Carte mise en avant (fond marine + badge « Signature ») */
  featured?: boolean;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, delay: 0.25 + i * 0.18, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay: 0.25 + i * 0.18 } },
  }),
};

/** Emblèmes dessinés au trait, qui se tracent à l'apparition */
const Emblem = ({ type, strokeWidth = 1.5 }: { type: OfferEmblem; strokeWidth?: number }) => (
  <motion.svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-full w-full"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.6 }}
    aria-hidden="true"
  >
    {type === 'spark' ? (
      <>
        {/* Étincelle : étoile à quatre branches et éclats */}
        <motion.path variants={draw} custom={0} d="M32 10 C33.6 25 39 30.4 54 32 C39 33.6 33.6 39 32 54 C30.4 39 25 33.6 10 32 C25 30.4 30.4 25 32 10 Z" />
        <motion.path variants={draw} custom={1} d="M32 22 C32.7 29 35 31.3 42 32 C35 32.7 32.7 35 32 42 C31.3 35 29 32.7 22 32 C29 31.3 31.3 29 32 22 Z" />
        <motion.path variants={draw} custom={2} d="M49 11 V19 M45 15 H53" />
        <motion.path variants={draw} custom={3} d="M15 45 V51 M12 48 H18" />
      </>
    ) : (
      <>
        {/* Échappée : aurore, montagnes et route vers l'horizon */}
        <motion.path variants={draw} custom={0} d="M12 22 C22 13 42 13 52 22" />
        <motion.path variants={draw} custom={1} d="M17 27 C25 21 39 21 47 27" />
        <motion.path variants={draw} custom={2} d="M8 44 L21 29 L28 36 L37 24 L56 44" />
        <motion.path variants={draw} custom={3} d="M8 44 H56" />
        <motion.path variants={draw} custom={4} d="M30 44 C29 49 26 52 21 56 M34 44 C35 49 38 52 43 56" />
      </>
    )}
  </motion.svg>
);

const OfferCard = ({ offer, index }: { offer: Offer; index: number }) => {
  const halo = useHaloPointer(280);
  const dark = !!offer.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full"
    >
      {/* Liseré en dégradé (bordure de 1px) */}
      <div
        onMouseEnter={halo.enterPointer}
        onMouseMove={halo.updatePointer}
        onMouseLeave={halo.hidePointer}
        className={`relative h-full rounded-[2.25rem] p-px transition-all duration-700 ease-out group-hover:-translate-y-1.5 ${
          dark
            ? 'bg-[linear-gradient(150deg,hsl(var(--gold-light)),hsl(var(--primary))_38%,hsl(var(--primary))_70%,hsl(var(--accent)/0.7))] shadow-[0_30px_60px_-30px_hsl(var(--navy-deep)/0.75)] group-hover:shadow-[0_44px_80px_-32px_hsl(var(--navy-deep)/0.85)]'
            : 'bg-[linear-gradient(150deg,hsl(var(--accent)/0.6),hsl(var(--border))_35%,hsl(var(--border))_70%,hsl(var(--primary)/0.25))] shadow-[0_24px_50px_-32px_hsl(var(--navy-deep)/0.35)] group-hover:shadow-[0_38px_70px_-34px_hsl(var(--navy-deep)/0.45)]'
        }`}
      >
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[calc(2.25rem-1px)] p-6 sm:p-8 md:p-10 ${
            dark ? 'bg-primary text-primary-foreground' : 'bg-background text-primary'
          }`}
        >
          {/* Halo qui suit le curseur */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
            animate={{ opacity: halo.active ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className={`absolute h-[280px] w-[280px] rounded-full blur-3xl ${
                dark
                  ? 'bg-[radial-gradient(circle,hsl(var(--accent)/0.35)_0%,hsl(var(--accent)/0)_70%)]'
                  : 'bg-[radial-gradient(circle,hsl(var(--accent)/0.22)_0%,hsl(var(--accent)/0)_70%)]'
              }`}
              style={{ x: halo.x, y: halo.y }}
            />
          </motion.div>

          {/* Grand emblème en filigrane */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-14 top-1/3 h-72 w-72 transition-transform duration-1000 ease-out group-hover:-rotate-6 group-hover:scale-105 ${
              dark ? 'text-primary-foreground/[0.07]' : 'text-primary/[0.06]'
            }`}
          >
            <Emblem type={offer.emblem} strokeWidth={0.6} />
          </div>

          {/* Lueur fixe en haut à droite */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-125 ${
              dark ? 'bg-accent/25' : 'bg-accent/15'
            }`}
          />

          <div className="relative z-10 flex h-full flex-col">
            {/* En-tête */}
            <div className="flex items-start justify-between gap-4">
              <div
                className={`relative h-[4.5rem] w-[4.5rem] flex-none rounded-full border p-3.5 ${
                  dark ? 'border-accent-light/50 text-accent-light' : 'border-accent/40 text-accent'
                }`}
              >
                <span aria-hidden="true" className={`absolute inset-1.5 rounded-full ${dark ? 'bg-white/[0.07]' : 'bg-accent/[0.07]'}`} />
                <span className="relative block h-full w-full">
                  <Emblem type={offer.emblem} />
                </span>
              </div>

              {dark ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-light/40 bg-white/5 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-accent-light">
                  <span aria-hidden="true">✦</span> Signature
                </span>
              ) : (
                <span className="font-serif text-3xl italic text-primary/15" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>

            <p className={`mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.3em] ${dark ? 'text-accent-light' : 'text-accent'}`}>
              {offer.kicker}
            </p>
            <h3 className="mt-3 font-serif leading-none">
              <span className={`block text-lg italic ${dark ? 'text-primary-foreground/60' : 'text-primary/50'}`}>Offre</span>
              <span className="mt-1 block text-4xl md:text-5xl">{offer.name}</span>
            </h3>

            <div
              aria-hidden="true"
              className={`mt-7 h-px w-16 transition-all duration-700 group-hover:w-28 ${
                dark ? 'bg-gradient-to-r from-accent-light to-transparent' : 'bg-gradient-to-r from-accent to-transparent'
              }`}
            />

            {/* Contenu */}
            <dl className="mt-7 space-y-6">
              <div>
                <dt className={`text-[0.66rem] font-semibold uppercase tracking-[0.26em] ${dark ? 'text-primary-foreground/50' : 'text-primary/45'}`}>
                  Votre envie
                </dt>
                <dd className={`mt-2 text-base leading-relaxed md:text-[1.05rem] ${dark ? 'text-primary-foreground/85' : 'text-primary/85'}`}>
                  {offer.need}
                </dd>
              </div>
              <div>
                <dt className={`text-[0.66rem] font-semibold uppercase tracking-[0.26em] ${dark ? 'text-primary-foreground/50' : 'text-primary/45'}`}>
                  Mon accompagnement
                </dt>
                <dd className={`mt-2 text-base leading-relaxed md:text-[1.05rem] ${dark ? 'text-primary-foreground/85' : 'text-primary/85'}`}>
                  {offer.solution}
                </dd>
              </div>
            </dl>

            {/* Tarif */}
            <div className={`mt-auto pt-9`}>
              <div className={`border-t pt-7 ${dark ? 'border-primary-foreground/15' : 'border-border'}`}>
                <p className={`text-[0.66rem] font-semibold uppercase tracking-[0.26em] ${dark ? 'text-primary-foreground/50' : 'text-primary/45'}`}>
                  Votre tarif
                </p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {offer.pricePrefix && (
                    <span className={`font-serif text-lg italic ${dark ? 'text-primary-foreground/70' : 'text-primary/60'}`}>
                      {offer.pricePrefix}
                    </span>
                  )}
                  <span className="font-serif text-5xl leading-none md:text-6xl">{offer.price}</span>
                </p>
                {offer.feeNote && (
                  <p className={`mt-3 text-sm italic leading-relaxed ${dark ? 'text-primary-foreground/60' : 'text-primary/60'}`}>
                    {offer.feeNote}
                  </p>
                )}
              </div>

              <Link to="/devis" className={`${dark ? 'btn-primary' : 'btn-dark'} btn-lg btn-block mt-8`}>
                Débuter mon échappée
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default OfferCard;
