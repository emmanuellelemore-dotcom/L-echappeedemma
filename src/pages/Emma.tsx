import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortraitChinois from '../components/PortraitChinois';
import { TournantDeVieText } from '../components/TournantDeVie';

const challenges = [
  {
    title: "L'épuisement relationnel",
    description: "Ne plus avoir l’énergie pour soi, ni pour ceux que l'on aime."
  },
  {
    title: "Le sommeil impossible",
    description: "Dormir sans jamais réussir à reposer son esprit."
  },
  {
    title: "La perte d'identité",
    description: "Ne plus se reconnaître dans son propre reflet."
  },
  {
    title: "Le chaos intérieur",
    description: "Avoir la sensation que tout nous échappe."
  },
  {
    title: "La charge mentale",
    description: "Se sentir au bout du rouleau, sans savoir par où recommencer."
  },
  {
    title: "La peur de l'avenir",
    description: "Ne pas savoir ce que l'on va devenir et redouter chaque lendemain."
  },
  {
    title: "Le désintérêt",
    description: "Perdre le plaisir des choses les plus simples."
  },
  {
    title: "Le poids physique",
    description: "Sentir son corps s'alourdir sous une pression invisible."
  },
  {
    title: "L'isolement émotionnel",
    description: "Se sentir incompris(e) même entouré(e)."
  },
  {
    title: "La perte de confiance",
    description: "Douter de ses propres capacités et décisions."
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const EmmaWaveRibbon = () => {
  const { scrollY } = useScroll();
  const growProgress = useTransform(scrollY, [90, 210, 360, 440], [0, 0.38, 0.88, 1]);
  const opacity = useTransform(scrollY, [0, 90, 150, 430, 560], [0, 0, 0.94, 0.94, 0]);
  const mainPathLength = useTransform(growProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[-18%] top-[13%] z-0 hidden h-[19rem] overflow-hidden md:block lg:top-[15%]"
      style={{ opacity }}
    >
      <svg viewBox="0 0 1720 280" className="h-full w-[128%] min-w-[1050px]" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="emma-wave-gradient" x1="18" y1="58" x2="1688" y2="214" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(229, 154, 187, 0.98)" />
            <stop offset="18%" stopColor="rgba(223, 128, 174, 0.98)" />
            <stop offset="36%" stopColor="rgba(204, 112, 191, 0.97)" />
            <stop offset="56%" stopColor="rgba(155, 136, 209, 0.97)" />
            <stop offset="76%" stopColor="rgba(96, 116, 179, 0.98)" />
            <stop offset="100%" stopColor="rgba(45, 65, 106, 0.98)" />
          </linearGradient>
          <linearGradient id="emma-wave-underpaint" x1="-12" y1="48" x2="1674" y2="222" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(229, 154, 187, 0.34)" />
            <stop offset="46%" stopColor="rgba(191, 132, 205, 0.3)" />
            <stop offset="100%" stopColor="rgba(45, 65, 106, 0.3)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M-64 16C4 16 64 20 124 34C184 48 238 78 288 112C338 146 390 182 446 194C502 206 560 202 618 188C676 174 732 152 786 146C840 140 892 146 944 158C996 170 1046 184 1098 188C1150 192 1198 184 1248 174C1298 164 1348 160 1398 168C1448 176 1498 194 1546 212C1594 230 1638 250 1678 266C1718 282 1744 294 1768 300"
          stroke="url(#emma-wave-underpaint)"
          strokeWidth="34"
          strokeLinecap="butt"
          style={{ opacity: 0.18, pathLength: mainPathLength, pathOffset: 0 }}
          filter="blur(7px)"
        />
        <motion.path
          d="M-64 16C4 16 64 20 124 34C184 48 238 78 288 112C338 146 390 182 446 194C502 206 560 202 618 188C676 174 732 152 786 146C840 140 892 146 944 158C996 170 1046 184 1098 188C1150 192 1198 184 1248 174C1298 164 1348 160 1398 168C1448 176 1498 194 1546 212C1594 230 1638 250 1678 266C1718 282 1744 294 1768 300"
          stroke="url(#emma-wave-gradient)"
          strokeWidth="18"
          strokeLinecap="round"
          style={{ pathLength: mainPathLength, pathOffset: 0 }}
        />
      </svg>
    </motion.div>
  );
};

const Emma = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden max-w-full">
      <Navbar />

      <main className="pt-28 relative">
        <h1 className="sr-only">L'échappée d'Emma - Emma, Travel Planner Grand Nord, créatrice d’itinéraires sur-mesure de L'Échappée d'Emma</h1>
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-accent/15 blur-[80px]"
            animate={{ x: [0, 20, -10], y: [0, 10, -15] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
          />
          <motion.div
            className="absolute top-60 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-[90px]"
            animate={{ x: [0, -20, 15], y: [0, -10, 12] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
          />
        </motion.div>

        {/* Qui suis-je */}
        <motion.section
          className="px-2 sm:px-6 py-10 pt-8 sm:pt-20 text-black overflow-x-hidden"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
        >
          <EmmaWaveRibbon />

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row lg:gap-32 gap-8 items-center px-2 sm:px-6">
            <motion.div variants={slideRight} className="w-full lg:w-3/5">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Qui suis-je ?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Bonjour, moi c’est Emma.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Après 25 ans d'une carrière intense,  puis une année  d’épreuves particulièrement éprouvantes,  je me suis totalement perdue.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                J’ai alors compris une chose fondamentale : le voyage n’est plus un luxe, c’est une nécessité pour l’âme.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                C’est l’appel des grands espaces qui m’a permis de retrouver mon cap et, surtout, le sentiment de liberté nécessaire pour me projeter à nouveau.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                De cette renaissance est née ”L’Échappée d’Emma”.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mon rôle est d’accompagner ceux qui traversent un <TournantDeVieText />, qu’ils célèbrent un nouveau départ ou qu’ils aient besoin de reprendre leur souffle.
                Je conçois pour vous des itinéraires où la logistique s'efface pour vous offrir le luxe de vous réapproprier votre temps. En vous libérant de chaque contrainte, je crée l'espace nécessaire pour ralentir,
                savourer la simplicité des lieux et redevenir l'acteur principal de votre propre histoire. En tant qu’architecte de voyage, je dessine une parenthèse sur-mesure, fluide et sereine.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Je vous décharge totalement de l'organisation car la vraie liberté, c’est de n’avoir rien d'autre à vivre que l'instant présent.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Il est temps de vous reconnecter à ce qui compte vraiment.
              </p>
            </motion.div>

            <motion.div
              variants={slideLeft}
              className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 flex flex-col items-center w-full max-w-sm mx-auto lg:w-2/5"
            >
              <img
                src="/Emma.JPG"
                alt="Portrait d'Emma"
                className="h-72 w-auto max-w-full rounded-3xl object-cover shadow-md mb-4"
                loading="lazy"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">Portrait d'Emma</p>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Ma passion pour cette liberté de mouvement est telle que je recevrai mon propre van cet été.<br />
                Je prendrai la route à la fin de la saison pour continuer de dénicher de nouveaux spots secrets, afin de nourrir vos futures échappées.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Portrait chinois */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <PortraitChinois />
          </div>
        </section>

        {/* Moi aussi */}
        <motion.section
          className="bg-secondary/60 px-6 py-20"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <motion.h2 variants={fadeDown} className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Moi aussi je suis passée par là...
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-10">
              Ces sensations, je les ai connues. C'est pour cela que je crée des itinéraires qui
              redonnent de l'air.
            </motion.p>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4 text-left">
              {challenges.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-background border border-border rounded-2xl p-5 text-sm text-muted-foreground"
                  whileHover={{ y: -4 }}
                >
                  <span className="font-semibold text-foreground block mb-1">{item.title}</span>
                  <span className="text-xs text-muted-foreground block">{item.description}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="px-6 py-20"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Une échappée qui commence par une conversation
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Racontez-moi votre besoin de souffle, je m'occupe du reste.
            </p>
                {/* CTA supprimée */}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Emma;
