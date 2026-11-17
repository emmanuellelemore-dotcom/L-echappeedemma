import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortraitChinois from '../components/PortraitChinois';
import AuroraTrail from '../components/AuroraTrail';
import Seo from '@/components/Seo';
import { PAGES } from '@/seo/pages';
import { aboutPageJsonLd } from '@/seo/schema';

const challenges = [
  {
    title: "Le besoin de respirer",
    description: "Prendre de la distance avec un quotidien parfois trop chargé."
  },
  {
    title: "L'envie de ralentir",
    description: "Retrouver du temps pour soi et savourer les choses simples."
  },
  {
    title: "Le besoin de déconnexion",
    description: "S'éloigner du bruit, des sollicitations et des habitudes."
  },
  {
    title: "L'envie de renouveau",
    description: "Changer d'horizon, découvrir de nouveaux paysages et ouvrir une nouvelle page."
  },
  {
    title: "La recherche de liberté",
    description: "Retrouver le plaisir de choisir son rythme et de suivre ses envies."
  },
  {
    title: "Le besoin de se retrouver",
    description: "S'accorder une parenthèse pour faire le point et se reconnecter à l'essentiel."
  },
  {
    title: "L'envie d'aventure",
    description: "Sortir de ses habitudes et vivre des expériences qui marquent les souvenirs."
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

const Emma = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-clip max-w-full">
      <Seo title={PAGES.emma.title} description={PAGES.emma.description} path={PAGES.emma.path} jsonLd={aboutPageJsonLd()} image="/Emma.JPG" imageAlt="Portrait d'Emma, travel planner du Grand Nord" />
      <Navbar />

      <main className="pt-28 relative isolate">
        {/* Lueur d'aurore boréale qui suit le défilement */}
        <AuroraTrail />

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
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row lg:gap-32 gap-8 items-center px-2 sm:px-6">
            <motion.div variants={slideRight} className="w-full lg:w-3/5">
              <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Qui suis-je ?</h1>
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
                Aujourd'hui, j'ai à cœur de vous faire découvrir la magie du Grand Nord à travers des itinéraires sur-mesure, pensés selon vos envies et votre façon de voyager.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                En tant qu'architecte de voyage, je conçois des échappées qui vous ressemblent, en prenant en charge les aspects de l'organisation que vous souhaitez me confier, pour vous permettre de profiter pleinement de chaque instant.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Il est temps de vous offrir votre propre échappée.
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
                Mon van Uggla est devenu mon compagnon d'exploration. Après six semaines à parcourir l'Islande à son bord, je poursuivrai mes aventures nordiques au fil de mes escapades, toujours à la recherche de nouveaux lieux et d'inspirations pour vos futures échappées.
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
          className="bg-gradient-to-b from-transparent via-secondary/50 to-secondary/60 px-6 py-20"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <motion.h2 variants={fadeDown} className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Moi aussi, j'ai ressenti ce besoin de m'évader…
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-4">
              Le besoin de prendre du recul, de ralentir, de sortir du quotidien ou simplement de retrouver le plaisir de vivre autre chose.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-10">
              C'est cette conviction qui m'anime : chacun mérite de s'offrir une parenthèse qui lui ressemble.
            </motion.p>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4 text-left">
              {challenges.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className={`bg-background border border-border rounded-2xl p-5 text-sm text-muted-foreground ${
                    challenges.length % 2 === 1 && index === challenges.length - 1
                      ? 'sm:col-span-2 sm:w-1/2 sm:justify-self-center'
                      : ''
                  }`}
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
              Racontez-moi vos envies, vos rêves, votre façon de voyager… Créons ensemble une échappée qui vous ressemble.
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
