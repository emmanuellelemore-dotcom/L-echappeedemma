import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortraitChinois from '../components/PortraitChinois';
import { Button } from '../components/ui/button';

const challenges = [
  "Ne plus avoir l'énergie pour soi ni pour les autres.",
  "Dormir sans réussir à reposer son esprit.",
  "Se sentir au bout du rouleau sans savoir par où recommencer.",
  "Avoir la sensation que tout part en vrille.",
  "Ne plus se reconnaître dans le miroir.",
  "Perdre le plaisir des choses simples.",
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <main className="pt-28 relative">
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
          className="px-6 py-20"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideRight}>
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
                Mon rôle est d’accompagner ceux qui traversent un tournant de vie,  qu’ils célèbrent un nouveau départ ou qu’ils aient besoin de reprendre leur souffle.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Je conçois pour vous des itinéraires où la logistique s'efface pour vous offrir le luxe de vous réapproprier votre temps. En vous libérant de chaque contrainte, je crée l'espace nécessaire pour ralentir,
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
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
              className="rounded-[32px] border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8"
              whileHover={{ y: -6, rotate: 0.3 }}
            >
              <div className="h-72 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary to-accent/20" />
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-6">Portrait d'Emma</p>
              <p className="text-sm text-muted-foreground mt-2">
                Photo à venir. Une image lumineuse, nature, qui vous parle de sérénité.
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
                  key={item}
                  variants={fadeUp}
                  className="bg-background border border-border rounded-2xl p-5 text-sm text-muted-foreground"
                  whileHover={{ y: -4 }}
                >
                  {item}
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
