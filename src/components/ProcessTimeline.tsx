import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MessageCircle, PenLine, Compass, Sparkles, BookOpen } from 'lucide-react';

interface ProcessStep {
  title: string;
  verb: string;
  description: string;
  icon: ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    title: "L'Esquisse",
    verb: 'Je vous écoute',
    description: "Un temps d'échange offert pour faire connaissance et valider la faisabilité de votre projet.",
    icon: <MessageCircle className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "L'Engagement",
    verb: 'Je formalise',
    description: "Signature du contrat, règlement et envoi de votre pack de bienvenue pour lancer l'aventure.",
    icon: <PenLine className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: 'Le Socle',
    verb: 'Je bâtis',
    description:
      'Je sélectionne transports et hébergements. Vous validez vos coups de cœur puis réservez en direct, sans commission.',
    icon: <Compass className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: 'La Création',
    verb: 'Je dessine',
    description: 'Conception de votre itinéraire sur-mesure, jour par jour, pour une itinérance fluide, rythmée par vos envies.',
    icon: <Sparkles className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: 'Votre Carnet',
    verb: 'Je vous accompagne',
    description: 'Remise de votre carnet de route digital et personnalisé. Votre échappée peut enfin commencer.',
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const LAST = processSteps.length - 1;

/**
 * Frise « de l'idée à l'échappée » : une ligne lumineuse se trace au défilement
 * et allume chaque étape à son passage. Horizontale sur grand écran, verticale sur mobile.
 */
const ProcessTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Grand écran : la ligne arrive au bout quand le haut de la frise atteint le quart
  // supérieur de l'écran (les étapes sont encore visibles).
  // Mobile : la frise est verticale, on suit toute sa hauteur.
  const [isWide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isWide ? ['start 90%', 'start 40%'] : ['start 75%', 'end 75%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(prefersReducedMotion ? LAST : -1);

  useMotionValueEvent(progress, 'change', (value) => {
    if (prefersReducedMotion) return;
    // Une étape s'allume quand la ligne arrive à sa hauteur
    setReached(Math.min(LAST, Math.floor(value * LAST + 0.15)));
  });

  return (
    <div ref={sectionRef} className="relative w-full">
      {/* Lueurs d'ambiance */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-2 py-8 md:py-12 lg:px-4">
        {/* Ligne horizontale (grand écran) */}
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-[5.5rem] hidden h-px lg:block">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,hsl(var(--primary)/0.25)_0_6px,transparent_6px_14px)]" />
          <motion.div
            className="absolute inset-0 origin-left bg-gradient-to-r from-accent via-accent to-primary shadow-[0_0_12px_hsl(var(--accent)/0.8)]"
            style={{ scaleX: prefersReducedMotion ? 1 : lineScale }}
          />
        </div>

        <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5 xl:gap-7">
          {processSteps.map((step, index) => {
            const active = index <= reached;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Segment vertical vers l'étape suivante (mobile / tablette) */}
                {index < LAST && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[2.125rem] top-[2.125rem] -bottom-[4.125rem] w-px md:left-10 md:top-10 md:-bottom-[4.5rem] lg:hidden"
                  >
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,hsl(var(--primary)/0.25)_0_6px,transparent_6px_14px)]" />
                    <motion.div
                      className="absolute inset-0 origin-top bg-gradient-to-b from-accent to-primary shadow-[0_0_10px_hsl(var(--accent)/0.7)]"
                      initial={false}
                      animate={{ scaleY: index < reached ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </div>
                )}

                {/* Pastille de l'étape */}
                <div className="relative z-10 flex-none self-start lg:mb-8 lg:self-auto">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-accent/40 blur-md"
                    animate={{ opacity: active ? 1 : 0, scale: active ? 1.35 : 0.8 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <div
                    className={`relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border transition-all duration-700 md:h-20 md:w-20 ${
                      active
                        ? 'border-accent bg-accent text-accent-foreground shadow-[0_14px_30px_-12px_hsl(var(--accent))]'
                        : 'border-primary/20 bg-background text-primary/60'
                    }`}
                  >
                    <span className="font-serif text-2xl italic md:text-[1.7rem]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Carte de l'étape */}
                <div
                  className={`relative w-full overflow-hidden rounded-[1.75rem] border bg-background/80 p-6 backdrop-blur-sm transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_50px_-30px_hsl(var(--navy-deep)/0.5)] lg:min-h-[17rem] xl:p-7 ${
                    active ? 'border-accent/35 shadow-[0_24px_44px_-34px_hsl(var(--navy-deep)/0.45)]' : 'border-border'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/15 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div
                    className={`relative mx-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 lg:mx-auto ${
                      active ? 'bg-accent/15 text-accent' : 'bg-muted text-primary/60'
                    } group-hover:bg-primary group-hover:text-primary-foreground`}
                  >
                    {step.icon}
                  </div>
                  <p className="relative text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-accent">{step.verb}</p>
                  <h3 className="relative mt-2 font-serif text-2xl text-primary xl:text-[1.65rem]">{step.title}</h3>
                  <div
                    aria-hidden="true"
                    className="relative mx-0 my-4 h-px w-10 bg-gradient-to-r from-accent to-transparent transition-all duration-700 group-hover:w-20 lg:mx-auto lg:bg-gradient-to-r lg:from-transparent lg:via-accent lg:to-transparent"
                  />
                  <p className="relative text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProcessTimeline;
