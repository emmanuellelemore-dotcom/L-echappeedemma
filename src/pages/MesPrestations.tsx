import { useAnimation } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MesPrestationsTitle } from './MesPrestationsTitle';
import { TextEffect } from '../components/core/text-effect';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Hourglass, Sparkles, BadgeCheck, Sun, Compass, Phone, PenTool, Calendar, Mountain, Footprints, Sun as SunIcon, ChevronDown } from 'lucide-react';

import FlipCard from '../components/FlipCard';

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
  { number: '1', title: "L'Éclat (Islande)", subtitle: "Le souffle de l’émerveillement", spirit: "Saturer ses sens de beauté pour ne plus laisser de place aux pensées parasites.", experience: "Un roadtrip intense entre volcans et glaciers pour ceux qui ont besoin d’un 'choc visuel' pour se sentir à nouveau vibrer.", icon: 'montagne' },
  { number: '2', title: "L'Horizon (Norvège)", subtitle: "Le souffle de la liberté", spirit: "Reprendre les commandes de sa vie. Ne plus subir aucun horaire ni aucune contrainte extérieure.", experience: "La vie en van le long des fjords. Changer d’avis, changer de route, et s’arrêter là où le cœur nous dit de rester.", icon: 'van' },
  { number: '3', title: "Le Cocon (Finlande)", subtitle: "Le souffle de la douceur", spirit: "Mettre le monde sur 'pause'. Ralentir et s’autoriser enfin à ne rien faire, sans culpabiliser.", experience: "Un chalet sous la nuit polaire. Le crépitement du feu et la chaleur du sauna. Avec accès au choix, la liberté d’un temps sans programme.", icon: 'maison_bois' },
  { number: '4', title: "La Source (Suède)", subtitle: "Le souffle de l’essentiel", spirit: "Une 'digital detox' profonde pour s’entendre à nouveau réfléchir.", experience: "Canoë-trip sur les lacs sauvages. Un confort minimaliste pour se reconnecter à la simplicité de l’eau, du bois et du feu et réfléchir.", icon: 'feuille' },
  { number: '5', title: "L'Éveil (Scandinavie)", subtitle: "Le souffle du dépassement", spirit: "Retrouver confiance en ses capacités et se prouver que l’on peut encore franchir des montagnes.", experience: "Une itinérance à pied, de refuge en refuge. Porter son sac, passer un col et sortir grandi de chaque pas.", icon: 'empreinte' },
  { number: '6', title: "L'Infini (Lofoten)", subtitle: "Le souffle hors du temps", spirit: "Perdre ses repères habituels pour mieux se retrouver. S’affranchir de la dictature de la montre.", experience: "Vivre le Soleil de Minuit. Randonner ou lire à 2h du matin sous une lumière dorée éternelle. Un voyage où 'l’heure qu’il est' n’a plus aucune importance.", icon: 'soleil' },
];

const offers = [
  { title: 'La Parenthèse "Inspiration"', subtitle: "Pour celles et ceux qui ont besoin d'une boussole pour se lancer. (Ici, je ne créé pas de carnet de route. c'est plus une vision pour les guider)", price: 'Forfait à partir de XX EUR', items: [ 'Questionnaire "Éclaireur" : pour cibler vos besoins en amont.', 'Appel Horizon (1h) : échange personnalisé pour lever vos blocages.', 'Kit "Essentiel" (PDF) : vos 9 cartes mémos stratégiques :', '5 Fondamentales (équipement, sécurité, admin...).', '2 Spécifiques selon votre profil (vanlife, rando...).', '1 Destination dédiée à votre terre d’aventure.', '1 Bonus pour optimiser votre budget.', ], },
  { title: 'L’itinéraire', subtitle: "Pour celles et ceux qui ont besoin d'une boussole pour se lancer. (Ici, je ne créé pas de carnet de route. c'est plus une vision pour les guider)", price: 'Sur devis, à partir de XXX EUR', items: [ 'Appel Découverte (offert) : pour faire connaissance et valider votre projet.', 'Questionnaire d’immersion à compléter qui me servira de boussole pour la création de votre échappée.', 'Itinéraire sur-mesure : tracé jour par jour selon votre propre rythme.', 'Sélection "Pépites" : hébergements et transports sélectionnés pour vous.', 'Carnet de Route  : votre guide complet avec liens de réservation, activités et infos.', 'Expertise intégrée : mes conseils logistiques personnalisés distillés au fil du Carnet.', ], },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeDown = { hidden: { opacity: 0, y: -18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const MesPrestations = () => {
  const processSectionRef = useRef<HTMLElement | null>(null);
  const reasonsSectionRef = useRef<HTMLElement | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Scroll progressif pour Mon processus
  useEffect(() => {
    const root = processSectionRef.current;
    if (!root) return;
    const triggers = Array.from(root.querySelectorAll('[data-process-step]')) as HTMLElement[];
    if (!triggers.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = Number(entry.target.getAttribute('data-process-step'));
            setActiveProcessStep(step);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    triggers.forEach((trigger) => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  // Scroll progressif pour 6 raisons
  // Carrousel horizontal infini pour les 6 raisons
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  // On duplique la liste pour couvrir au moins 3x la largeur d'écran (effet ruban)
  const reasonsList = Array(4).fill(reasons).flat();
  const xRef = useRef(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const totalDuration = 32; // durée totale pour parcourir toute la liste (plus lent)
  const containerRef = useRef<HTMLDivElement>(null);

  // Mesure la largeur du carrousel pour l'infini
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 2); // 2x la liste de base
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let animationPromise: Promise<any> | null = null;
    const animate = async () => {
      if (isPaused || !containerWidth) return;
      let currentX = xRef.current;
      if (currentX <= -containerWidth) {
        xRef.current = 0;
        await controls.set({ x: 0 });
        currentX = 0;
      }
      const endX = -containerWidth;
      const remaining = Math.abs(endX - currentX);
      const duration = (remaining / Math.abs(endX)) * totalDuration;
      animationPromise = controls.start({
        x: endX,
        transition: {
          x: {
            duration,
            ease: 'linear',
          },
        },
      });
      await animationPromise;
      if (!isCancelled && !isPaused) animate();
    };
    if (!isPaused) animate();
    return () => {
      isCancelled = true;
      controls.stop();
    };
  }, [isPaused, controls, containerWidth]);

  const handlePause = () => {
    setIsPaused(true);
  };
  const handleResume = () => {
    setIsPaused(false);
  };
  const processProgress = processSteps.length > 1 ? activeProcessStep / (processSteps.length - 1) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 px-6">
        <MesPrestationsTitle />
        <p className="text-center text-lg mb-16">
          <TextEffect per="char" preset="fade">
            Retrouvez ici toutes les raisons de faire appel à moi, mon processus, les besoins de souffle et les offres d'accompagnement.
          </TextEffect>
        </p>
      </section>
      {/* 6 raisons */}
      <motion.section ref={reasonsSectionRef} id="reasons" className="bg-secondary/60 py-24 px-6 min-h-[80vh]" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-6xl mx-auto relative">
          <div className="sticky top-24">
            <div className="text-center mb-14">
              <motion.h2 initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.08, ease: 'easeOut' }} className="text-3xl md:text-4xl font-serif text-foreground">6 raisons de faire appel à moi</motion.h2>
              <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.08, ease: 'easeOut' }} className="text-muted-foreground mt-4 text-lg">Un accompagnement humain pour un voyage qui a du sens.</motion.p>
            </div>
            {/* Ajout pour scroll progressif : déclencheurs juste après le sous-titre */}
            <div className="overflow-x-hidden w-screen relative left-1/2 -translate-x-1/2">
              <motion.div
                className="flex gap-6 py-4"
                ref={containerRef}
                animate={controls}
                style={{ width: 'max-content' }}
                onUpdate={(latest) => {
                  if (typeof latest.x === 'number') xRef.current = latest.x;
                }}
              >
                {reasonsList.map((reason, idx) => (
                  <div
                    key={reason.title + idx}
                    className="bg-background border border-border rounded-3xl p-6 shadow-sm min-w-[220px] max-w-[90vw] sm:min-w-[320px] sm:max-w-xs flex-shrink-0 cursor-pointer"
                    onClick={() => setIsPaused((prev) => !prev)}
                    onMouseEnter={handlePause}
                    onMouseLeave={handleResume}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                      <reason.icon className="text-accent" size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Scroll triggers pour animation progressive, sans trou */}
            <div className="sr-only" aria-hidden="true">
              {reasons.map((reason, index) => (
                <div key={reason.title} data-reason-step={index} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      {/* Besoin de souffle */}
      <motion.section className="bg-background py-24 px-4 sm:px-6 relative overflow-hidden" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-3xl md:text-4xl font-serif text-foreground mb-4">Quel est votre besoin de souffle ?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-muted-foreground text-base mb-2">Parce que chaque tournant de vie demande une énergie différente, j'ai conçu cinq approches pour vous aider à retrouver votre cap.</motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-muted-foreground text-base">C'est vous qui choisissez l'intensité de votre déconnexion.</motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-8">
            {breathNeeds.map((need, index) => (
              <motion.div key={need.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex flex-col items-center relative">
                <FlipCard
                  recto={
                    <div className="bg-[#1e3a5f] text-white rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col items-center justify-center w-full h-full min-h-[220px] relative">
                      <h3 className="text-base sm:text-lg font-bold mb-2 text-center break-words">{need.title}</h3>
                      <p className="text-xs sm:text-base text-center mb-4 text-white/90 font-medium break-words">{need.subtitle}</p>
                      <span className="block sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-xs font-semibold text-pink-500 animate-pulse">
                        Touchez pour retourner
                      </span>
                    </div>
                  }
                  verso={
                    <div className="bg-[#1e3a5f] text-white rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col items-center justify-center w-full h-full min-h-[220px]">
                      <div className="mb-4 w-full flex flex-col items-center">
                        <span className="font-semibold block mb-2 text-center">L'esprit :</span>
                        <span className="block text-white/80 leading-relaxed text-xs sm:text-sm mb-4 text-center break-words">{need.spirit}</span>
                        <span className="font-semibold block mb-2 text-center">L'expérience :</span>
                        <span className="block text-white/80 leading-relaxed text-xs sm:text-sm text-center break-words">{need.experience}</span>
                      </div>
                      <div className={`flex justify-center ${need.icon === 'maison_bois' ? 'mt-2' : 'mt-2'}`}> 
                        {need.icon === 'maison_bois' ? (
                          <img src="/logo/maison_bois.webp" alt="Chalet Finlande" className="w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] object-contain" />
                        ) : need.icon === 'van' ? (
                          <img src="/logo/van.webp" alt="Van Norvège" className="w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] object-contain" />
                        ) : need.icon === 'montagne' ? (
                          <img src="/logo/montagne.webp" alt="Montagne Islande" className="w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] object-contain" />
                        ) : need.icon === 'soleil' ? (
                          <img src="/logo/soleil.webp" alt="Soleil Lofoten" className="w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] object-contain" />
                        ) : need.icon === 'feuille' ? (
                          <img src="/logo/feuille.webp" alt="Feuille Suède" className="w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] object-contain" />
                        ) : need.icon === 'empreinte' ? (
                          <img src="/logo/empreinte.webp" alt="Empreinte Scandinavie" className="w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] object-contain" />
                        ) : (
                          null
                        )}
                      </div>
                    </div>
                  }
                  className="w-full max-w-xs mx-auto h-[520px]"
                />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <a href="/devis" className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-10 rounded-full text-lg shadow transition">Prendre son souffle</a>
          </div>
        </div>
      </motion.section>
      {/* Mon processus */}
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
              {/* Bandeau bleu "En développement" */}
              <div className="w-full bg-primary text-primary-foreground rounded-2xl py-8 px-4 mt-8 shadow-lg flex items-center justify-center text-2xl font-bold">
                🚧 En développement 🚧
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Offres */}
      <motion.section className="bg-secondary/40 py-24 px-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="text-3xl md:text-4xl font-serif text-foreground mb-4">Les offres d'accompagnement</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-muted-foreground text-base">Choisissez l'accompagnement qui vous correspond.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <motion.div key={offer.title} variants={fadeUp} className="border border-border rounded-[32px] p-8 bg-background" whileHover={{ y: -6 }}>
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
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default MesPrestations;
