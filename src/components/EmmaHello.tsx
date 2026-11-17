import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/** Petit « bonjour » : le portrait se soulève doucement */
const HELLO = {
  y: [0, -8, 0, -3, 0],
  rotate: [0, -3, 2, 0, 0],
  transition: { duration: 1.2, ease: 'easeInOut' as const },
};

/**
 * Emma salue le visiteur et présente, dans une bulle, son engagement
 * de transparence. Le texte complet se déplie à la demande.
 */
const EmmaHello = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const portrait = useAnimationControls();
  const [typing, setTyping] = useState(!prefersReducedMotion);
  const [expanded, setExpanded] = useState(false);

  // Arrivée : le portrait apparaît, salue, puis la bulle « écrit » son message
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      portrait.set({ opacity: 1, y: 0, scale: 1 });
      return;
    }
    let cancelled = false;
    (async () => {
      await portrait.start({ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 18 } });
      if (cancelled) return;
      await portrait.start(HELLO);
    })();
    const timer = window.setTimeout(() => setTyping(false), 1400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, portrait, prefersReducedMotion]);

  const sayHello = () => {
    if (prefersReducedMotion) return;
    portrait.start(HELLO);
  };

  return (
    <div ref={ref} className="mx-auto mt-10 flex max-w-3xl items-end gap-4 text-left md:gap-6">
      {/* Bulle */}
      <motion.div
        initial={{ opacity: 0, x: 16, scale: 0.96 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex-1 rounded-[1.6rem] rounded-br-md border border-accent/25 bg-background/90 px-5 py-4 shadow-[0_20px_44px_-30px_hsl(var(--navy-deep)/0.55)] backdrop-blur-sm md:px-6 md:py-5"
      >
        {/* Pointe de la bulle, vers Emma */}
        <span
          aria-hidden="true"
          className="absolute -right-[7px] bottom-4 h-3.5 w-3.5 rotate-45 border-r border-t border-accent/25 bg-background"
        />

        <AnimatePresence mode="wait" initial={false}>
          {typing ? (
            <motion.div
              key="typing"
              exit={{ opacity: 0 }}
              className="flex h-12 items-center gap-1.5"
              aria-label="Emma écrit…"
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-2 w-2 rounded-full bg-accent/70"
                  animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="message" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="font-serif text-lg italic text-primary">
                Bonjour !{' '}
                <span className="not-italic text-[0.62rem] font-sans font-semibold uppercase tracking-[0.26em] text-accent">
                  · Une transparence totale
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                En tant que Travel Planner, je vous propose un service de conseil et de conception de voyages. Je ne suis pas une agence de voyages : je ne perçois aucune commission sur vos réservations et n'encaisse pas le budget de votre séjour.
              </p>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                      <p>
                        Vous réservez directement vos vols, hébergements et activités, à partir des liens et recommandations sélectionnés dans votre carnet de route. Vous gardez ainsi la maîtrise de vos réservations et de votre budget, tout en bénéficiant de mon expertise pour préparer votre échappée.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:text-primary"
                aria-expanded={expanded}
              >
                {expanded ? 'Réduire' : 'En savoir plus'}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Portrait d'Emma */}
      <motion.button
        type="button"
        onClick={sayHello}
        onMouseEnter={sayHello}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.85 }}
        animate={portrait}
        className="relative h-20 w-20 flex-none rounded-full md:h-28 md:w-28"
        style={{ transformOrigin: '50% 85%' }}
        aria-label="Emma vous salue"
      >
        <span aria-hidden="true" className="absolute -inset-2 rounded-full bg-accent/20 blur-xl" />
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-accent-light to-primary/40 p-[2px]">
          <span className="block h-full w-full rounded-full bg-background" />
        </span>
        <img
          src="/images/emma-travel-planner-norvege-portrait.webp"
          alt="Emma, travel planner, souriante au bord d'un fjord en Norvège"
          width={112}
          height={112}
          className="relative h-full w-full rounded-full object-cover p-[3px]"
        />
      </motion.button>
    </div>
  );
};

export default EmmaHello;
