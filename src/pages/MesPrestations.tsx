import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  HandHeart, Hourglass, Sparkles, BadgeCheck, Sun, Compass, Phone, PenTool, Calendar, Mountain, Footprints, Sun as SunIcon, ChevronDown
} from 'lucide-react';

// Copie des données et animations depuis Index.tsx
const reasons = [
  { title: "Écoute & empathie", description: "Un accompagnement humain, à l’écoute de vos besoins.", icon: HandHeart },
  { title: "Gain de temps", description: "Vous arrêtez de chercher, je m'en occupe : économisez des heures de recherches et de doutes.", icon: Hourglass },
  { title: "Itinéraires sur-mesure", description: "Chaque voyage est unique, pensé pour vous.", icon: Sparkles },
  { title: "Transparence budget", description: "Vous réservez directement vos prestations au prix réel, sans frais cachés ni commissions. Vous savez où va votre argent.", icon: BadgeCheck },
  { title: "Zéro charge mentale / sérénité", description: "Votre voyage s'organise pendant que votre esprit se repose.", icon: Sun },
  { title: "Expertise terrain", description: "Je sélectionne avec soin, une connaissance fine des destinations.", icon: Compass },
];

const processSteps = [
  { step: '1', title: "L'appel découverte", description: "On échange sur votre énergie du moment et vos envies profondes.", icon: Phone },
  { step: '2', title: 'Proposition & immersion', description: "Je vous transmets une proposition tarifaire claire et votre questionnaire d'immersion.", icon: PenTool },
  { step: '3', title: 'Sélection & réservations', description: "Je sélectionne les meilleurs options, vous choisissez ET vous réservez.", icon: Calendar },
  { step: '4', title: "Création de l'itinéraire", description: 'Je dessine un parcours fluide, jour par jour.', icon: Calendar },
  { step: '5', title: 'Carnet de route', description: 'Vous recevez un carnet personnalisé pour partir serein.', icon: BadgeCheck },
  // Le processus sera revu après le module 2
];

const breathNeeds = [
  { number: '1', title: "L'Étincelle (Islande)", subtitle: 'Le souffle du renouveau', spirit: "Pour celles et ceux qui ont besoin d’un choc visuel pour se sentir à nouveau vibrer. Saturer ses sens de beauté pour ne plus laisser de place aux parasites.", experience: "Un roadtrip intense entre volcans et glaciers, pour retrouver l’étincelle.", icon: Mountain },
  { number: '2', title: "L'Éveil (Scandinavie)", subtitle: 'Le souffle du dépassement', spirit: "Pour celles et ceux qui veulent retrouver confiance en leur force intérieure. Se prouver que l’on peut encore devenir celui/celle que l’on veut.", experience: "Porter son sac, passer un col, gravir une montagne et sortir grandi de chaque pas.", icon: Footprints },
  { number: '3', title: "L'Infini (Lofoten)", subtitle: 'Le souffle hors du temps', spirit: "Pour celles et ceux qui veulent perdre leurs repères pour mieux se retrouver. S’affranchir de la dictature de la montre.", experience: "Vivre le Soleil de Minuit, randonner OU lire à 3h du matin sous une lumière dorée.", icon: SunIcon },
];

const offers = [
  { title: 'La Parenthèse "Inspiration"', subtitle: "Pour celles et ceux qui ont besoin d'une boussole pour se lancer. (Ici, je ne créé pas de carnet de route. c'est plus une vision pour les guider)", price: 'Forfait à partir de XX EUR', items: [ 'Questionnaire "Éclaireur" : pour cibler vos besoins en amont.', 'Appel Horizon (1h) : échange personnalisé pour lever vos blocages.', 'Kit "Essentiel" (PDF) : vos 9 cartes mémos stratégiques :', '5 Fondamentales (équipement, sécurité, admin...).', '2 Spécifiques selon votre profil (vanlife, rando...).', '1 Destination dédiée à votre terre d’aventure.', '1 Bonus pour optimiser votre budget.', ], },
  { title: 'L’itinéraire', subtitle: "Pour celles et ceux qui ont besoin d'une boussole pour se lancer. (Ici, je ne créé pas de carnet de route. c'est plus une vision pour les guider)", price: 'Sur devis, à partir de XXX EUR', items: [ 'Appel Découverte (offert) : pour faire connaissance et valider votre projet.', 'Questionnaire d’immersion à compléter qui me servira de boussole pour la création de votre échappée.', 'Itinéraire sur-mesure : tracé jour par jour selon votre propre rythme.', 'Sélection "Pépites" : hébergements et transports sélectionnés pour vous.', 'Carnet de Route  : votre guide complet avec liens de réservation, activités et infos.', 'Expertise intégrée : mes conseils logistiques personnalisés distillés au fil du Carnet.', ], },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeDown = { hidden: { opacity: 0, y: -18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const MesPrestations = () => {
  const processSectionRef = useRef<HTMLElement | null>(null);
  const reasonsSectionRef = useRef<HTMLElement | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeReasonStep, setActiveReasonStep] = useState(0);

  useEffect(() => {
    const root = processSectionRef.current;
    if (!root) return;
    const triggers = Array.from(root.querySelectorAll('[data-process-step]')) as HTMLElement[];
    if (!triggers.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = Number((entry.target as HTMLElement).dataset.processStep || '0');
            setActiveProcessStep(step);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    triggers.forEach((trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = reasonsSectionRef.current;
    if (!root) return;
    const triggers = Array.from(root.querySelectorAll('[data-reason-step]')) as HTMLElement[];
    if (!triggers.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = Number((entry.target as HTMLElement).dataset.reasonStep || '0');
            setActiveReasonStep(step);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    triggers.forEach((trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  const processProgress = processSteps.length > 1 ? activeProcessStep / (processSteps.length - 1) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 px-6">
        <h1 className="text-4xl font-serif text-center mb-10">Mes Prestations</h1>
        <p className="text-center text-lg mb-16">Retrouvez ici toutes les raisons de faire appel à moi, mon processus, les besoins de souffle et les offres d'accompagnement.</p>
      </section>
      {/* 6 raisons */}
      <motion.section ref={reasonsSectionRef} id="reasons" className="bg-secondary/60 py-24 px-6 min-h-[80vh]" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-6xl mx-auto relative">
          <div className="sticky top-24">
            <div className="text-center mb-14">
              <motion.h2 initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.55, ease: 'easeOut' }} className="text-3xl md:text-4xl font-serif text-foreground">6 raisons de faire appel à moi</motion.h2>
              <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-muted-foreground mt-4 text-lg">Un accompagnement humain pour un voyage qui a du sens.</motion.p>
              {/* Flèche scroll SOUS la zone de texte 6 raisons */}
              <div className="flex flex-col items-center mt-2 mb-4">
                <span className="text-accent text-sm font-semibold mb-1">scroll</span>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  <ChevronDown size={36} className="animate-bounce text-accent" />
                </motion.div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason, index) => {
                const isActive = activeReasonStep >= index;
                return (
                  <motion.div key={reason.title} initial={{ opacity: 0, scale: 0.85, y: 12 }} animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85, y: isActive ? 0 : 12 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="bg-background border border-border rounded-3xl p-6 shadow-sm" whileHover={{ y: -6, rotate: -0.3 }}>
                    <motion.div animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                      <reason.icon className="text-accent" size={22} />
                    </motion.div>
                    <motion.div animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
                      <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Ajout pour scroll progressif */}
          <div className="mt-24" aria-hidden="true">
            {reasons.map((reason, index) => (
              <div key={reason.title} data-reason-step={index} className="h-[24vh]" />
            ))}
            <div className="h-[60vh]" />
          </div>
        </div>
      </motion.section>
      {/* Besoin de souffle déplacé ici */}
      <motion.section className="bg-background py-24 px-6 relative overflow-hidden" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-3xl md:text-4xl font-serif text-foreground mb-6">Quel est votre besoin de souffle ?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-muted-foreground text-sm mb-4">Parce que chaque tourment de vie demande une énergie différente, j'ai conçu una approche pour vous aider à retrouver votre cap.</motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-muted-foreground text-sm">C'est vous qui choisissez l'intensité de votre déconnexion.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-16 relative">
            {breathNeeds.map((need, index) => (
              <motion.div key={need.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex flex-col items-center relative">
                <motion.div className="bg-[#1e3a5f] text-white rounded-2xl p-6 w-full shadow-lg relative h-[420px] flex flex-col" whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-lg font-bold mb-2 text-center">{need.title}</h3>
                  <p className="text-sm text-center mb-6 text-white/90 font-medium">{need.subtitle}</p>
                  <div className="space-y-4 text-sm mb-6 flex-grow">
                    <div>
                      <p className="font-semibold mb-1">• L'esprit :</p>
                      <p className="text-white/80 leading-relaxed text-xs">{need.spirit}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">• L'expérience :</p>
                      <p className="text-white/80 leading-relaxed text-xs">{need.experience}</p>
                    </div>
                  </div>
                  <div className="flex justify-center"><need.icon className="text-white/60" size={40} strokeWidth={1.5} /></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Mon processus déplacé après besoin de souffle */}
      <motion.section ref={processSectionRef} id="processus" className="py-24 px-6 min-h-[80vh]" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-6xl mx-auto relative">
          <div className="sticky top-24">
            <div className="text-center mb-14">
              <motion.h2 initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.55, ease: 'easeOut' }} className="text-3xl md:text-4xl font-serif text-foreground">Mon processus : de l'idée à l'échappée</motion.h2>
              <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-muted-foreground mt-4 text-lg">Une méthode simple et fluide pour avancer avec sérénité.</motion.p>
              {/* Flèche scroll SOUS la zone de texte Mon processus */}
              <div className="flex flex-col items-center mt-2 mb-4">
                <span className="text-accent text-sm font-semibold mb-1">scroll</span>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  <ChevronDown size={36} className="animate-bounce text-accent" />
                </motion.div>
              </div>
            </div>
            <motion.div variants={stagger} className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => {
                const isActive = activeProcessStep >= index;
                return (
                  <motion.div key={step.step} variants={fadeUp} animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85, y: isActive ? 0 : 12 }} transition={{ duration: 0.4, ease: 'easeOut' }} className={`rounded-3xl p-6 text-center transition-all duration-300 ${isActive ? 'bg-secondary/50 border border-border' : 'bg-transparent border-transparent pointer-events-none'}`} whileHover={{ y: -6 }}>
                    <motion.div animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="w-12 h-12 rounded-full font-bold flex items-center justify-center mx-auto mb-4 bg-accent text-accent-foreground" aria-hidden={!isActive}>{step.step}</motion.div>
                    <motion.div animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }} transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }} className="w-10 h-10 rounded-2xl bg-background flex items-center justify-center mx-auto mb-3" aria-hidden={!isActive}><step.icon className="text-accent" size={18} /></motion.div>
                    <motion.div animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="min-h-[64px]" aria-hidden={!isActive}><h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3><p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p></motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          {/* Ajout pour scroll progressif */}
          <div className="mt-24" aria-hidden="true">
            {processSteps.map((step, index) => (
              <div key={step.step} data-process-step={index} className="h-[24vh]" />
            ))}
            <div className="h-[60vh]" />
          </div>
        </div>
      </motion.section>
      {/* Offres */}
      <motion.section className="py-24 px-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 variants={fadeDown} className="text-3xl md:text-4xl font-serif text-foreground">Investir dans votre sérénité</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 text-lg">Deux formats d'accompagnement, selon votre besoin de soutien et l'énergie que vous souhaitez y consacrer.</motion.p>
          </div>
          <motion.div variants={stagger} className="grid lg:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <motion.div key={offer.title} variants={fadeUp} className="border border-border rounded-[32px] p-8 bg-secondary/40" whileHover={{ y: -6 }}>
                <h3 className="text-xl font-serif text-foreground mb-2">{offer.title}</h3>
                <p className="text-muted-foreground mb-4">{offer.subtitle}</p>
                <span className="inline-flex bg-accent/20 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">{offer.price}</span>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {offer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" /><span>{item}</span></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default MesPrestations;
