// ...existing code...
// Place these lines inside the Index component, after all imports
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
import heroTravel from '@/assets/hero-travel.webp';
// Array of hero background images
// Ajoutez vos images personnalisées ici
const heroImages = [
  heroTravel,
  '/gallery/suede/coucher-soleil-rose-violet-lac-miroir.jpg',
  '/gallery/islande/soleil-couchant-plage-diamant-islande.jpg',
  // Ajoutez d'autres chemins d'images ici
];
import destIslande from '../assets/dest-islande.jpg';
import destNorvege from '../assets/dest-norvege.jpg';
import destSuede from '../assets/dest-suede.jpg';
import destFinlande from '../assets/dest-finlande.jpg';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
// Tags populaires pour le hero
const popularTags = [
  'Nature',
  'Aventure',
  'Bien-être',
  'Grand Nord',
  'Slow Travel',
  'Déconnexion',
];

// Destinations pour la section Destinations
const destinations = [
  { id: 1, name: 'Islande', tag: 'Volcans & Glaciers', img: destIslande, to: '/gallery/islande' },
  { id: 2, name: 'Norvège', tag: 'Fjords & Liberté', img: destNorvege, to: '/gallery/norvege' },
  { id: 3, name: 'Suède', tag: 'Lacs & Forêts', img: destSuede, to: '/gallery/suede' },
  { id: 4, name: 'Finlande', tag: 'Nuit polaire', img: destFinlande, to: '/gallery/finlande' },
];

// Raisons pour la section "6 raisons"
const reasons = [
  { title: "Écoute & empathie", description: "Un accompagnement humain, à l’écoute de vos besoins.", icon: HandHeart },
  { title: "Gain de temps", description: "Vous arrêtez de chercher, je m'en occupe : économisez des heures de recherches et de doutes.", icon: Hourglass },
  { title: "Itinéraires sur-mesure", description: "Chaque voyage est unique, pensé pour vous.", icon: Sparkles },
  { title: "Transparence budget", description: "Vous réservez directement vos prestations au prix réel, sans frais cachés ni commissions. Vous savez où va votre argent.", icon: BadgeCheck },
  { title: "Zéro charge mentale / sérénité", description: "Votre voyage s'organise pendant que votre esprit se repose.", icon: Sun },
  { title: "Expertise terrain", description: "Je sélectionne avec soin, une connaissance fine des destinations.", icon: Compass },
];

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Star,
  Phone,
  Hourglass,
  Compass,
  Sparkles,
  BadgeCheck,
  HandHeart,
  Map,
  Calendar,
  PenTool,
  Mountain,
  Truck,
  Home,
  Leaf,
  Footprints,
  Sun,
  ChevronDown,
} from 'lucide-react';

import { GradualSpacing } from '../components/GradualSpacing';


const processSteps = [
  {
    step: '1',
    title: "L'appel découverte",
    description: "On échange sur votre énergie du moment et vos envies profondes.",
    icon: Phone,
  },
  {
    step: '2',
    title: 'Proposition & immersion',
    description: "Je vous transmets une proposition tarifaire claire et votre questionnaire d'immersion.",
    icon: PenTool,
  },
  {
    step: '3',
    title: 'Sélection & réservations',
    description: "Je sélectionne les meilleurs options, vous choisissez ET vous réservez.",
    icon: Calendar,
  },
  {
    step: '4',
    title: "Création de l'itinéraire",
    description: 'Je dessine un parcours fluide, jour par jour.',
    icon: Map,
  },
  {
    step: '5',
    title: 'Carnet de route',
    description: 'Vous recevez un carnet personnalisé pour partir serein.',
    icon: BadgeCheck,
  },
  // Le processus sera revu après le module 2
];

const breathNeeds = [
  {
    number: '1',
    title: "L'Étincelle (Islande)",
    subtitle: 'Le souffle du renouveau',
    spirit: "Pour celles et ceux qui ont besoin d’un choc visuel pour se sentir à nouveau vibrer. Saturer ses sens de beauté pour ne plus laisser de place aux parasites.",
    experience: "Un roadtrip intense entre volcans et glaciers, pour retrouver l’étincelle.",
    icon: Mountain,
  },
  {
    number: '2',
    title: "L'Éveil (Scandinavie)",
    subtitle: 'Le souffle du dépassement',
    spirit: "Pour celles et ceux qui veulent retrouver confiance en leur force intérieure. Se prouver que l’on peut encore devenir celui/celle que l’on veut.",
    experience: "Porter son sac, passer un col, gravir une montagne et sortir grandi de chaque pas.",
    icon: Footprints,
  },
  {
    number: '3',
    title: "L'Infini (Lofoten)",
    subtitle: 'Le souffle hors du temps',
    spirit: "Pour celles et ceux qui veulent perdre leurs repères pour mieux se retrouver. S’affranchir de la dictature de la montre.",
    experience: "Vivre le Soleil de Minuit, randonner OU lire à 3h du matin sous une lumière dorée.",
    icon: Sun,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const offers = [
  {
    title: 'La Parenthèse "Inspiration"',
    subtitle: "Pour celles et ceux qui ont besoin d'une boussole pour se lancer. (Ici, je ne créé pas de carnet de route. c'est plus une vision pour les guider)",
    price: 'Forfait à partir de XX EUR',
    items: [
      'Questionnaire "Éclaireur" : pour cibler vos besoins en amont.',
      'Appel Horizon (1h) : échange personnalisé pour lever vos blocages.',
      'Kit "Essentiel" (PDF) : vos 9 cartes mémos stratégiques :',
      '5 Fondamentales (équipement, sécurité, admin...).',
      '2 Spécifiques selon votre profil (vanlife, rando...).',
      '1 Destination dédiée à votre terre d’aventure.',
      '1 Bonus pour optimiser votre budget.',
    ],
  },
  {
    title: 'L’itinéraire',
    subtitle: "Pour celles et ceux qui ont besoin d'une boussole pour se lancer. (Ici, je ne créé pas de carnet de route. c'est plus une vision pour les guider)",
    price: 'Sur devis, à partir de XXX EUR',
    items: [
      'Appel Découverte (offert) : pour faire connaissance et valider votre projet.',
      'Questionnaire d’immersion à compléter qui me servira de boussole pour la création de votre échappée.',
      'Itinéraire sur-mesure : tracé jour par jour selon votre propre rythme.',
      'Sélection "Pépites" : hébergements et transports sélectionnés pour vous.',
      'Carnet de Route  : votre guide complet avec liens de réservation, activités et infos.',
      'Expertise intégrée : mes conseils logistiques personnalisés distillés au fil du Carnet.',
    ],
  },
];

const Index = () => {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeReasonStep, setActiveReasonStep] = useState(0);
  const [showExtraDests, setShowExtraDests] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const reasonsSectionRef = useRef<HTMLElement | null>(null);
  const destBtnGroupRef = useRef<HTMLDivElement>(null);
  // Rotate hero background every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroImages.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const processProgress = processSteps.length > 1
    ? activeProcessStep / (processSteps.length - 1)
    : 0;

  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setShowWelcome(window.scrollY < 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.length > 0 ? (
            <img
              src={heroImages[heroIndex]}
              className="w-full h-full object-cover brightness-[0.7] transition-all duration-1000"
              alt="Paysage lumineux et serein — L'échappée d'Emma voyage sur mesure"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/60 text-white text-xl font-serif">
              Aucun visuel n'a été défini pour le fond du hero. Ajoutez des images dans le tableau heroImages.
            </div>
          )}
        </div>

        <div className="relative z-10 text-center px-2 w-full max-w-xl mx-auto">
          <div className="mb-3">
            <GradualSpacing
              text="Faisons l'Echappée ensemble"
              renderChar={(char, i) => {
                const start = 8;
                const end = 18;
                const isAccent = i >= start && i < end;
                return (
                  <span
                    className={`font-bold font-serif ${isAccent ? 'text-accent' : 'text-white'}`}
                    key={i}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                );
              }}
            />
          </div>
          <div className="flex justify-center mb-6">
            <Link
              to="/devis"
              className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 rounded-full font-bold text-base shadow-lg flex items-center gap-2 transition-colors duration-200 w-full max-w-xs justify-center"
            >
              Débuter mon échappée
              <span><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/></svg></span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/gallery/norvege" className="border border-white/80 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition opacity-70 hover:opacity-90">Norvège</Link>
            <Link to="/gallery/islande" className="border border-white/80 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition opacity-70 hover:opacity-90">Islande</Link>
            <Link to="/gallery/suede" className="border border-white/80 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition opacity-70 hover:opacity-90">Suède</Link>
            <button
              onClick={() => setShowExtraDests(v => !v)}
              className="border border-white/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-white/10 transition focus:outline-none opacity-70 hover:opacity-90"
              aria-expanded={showExtraDests}
              aria-controls="extra-dests"
            >
              Destinations exotiques
              <span className={`transition-transform duration-200 ${showExtraDests ? 'rotate-90' : ''}`}>{showExtraDests ? '▲' : '▼'}</span>
            </button>
            {showExtraDests && (
              <div id="extra-dests" className="flex flex-wrap justify-center gap-2 animate-fade-in mt-2">
                <Link to="/gallery/egypte" className="border border-white/80 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition opacity-70 hover:opacity-90">Égypte</Link>
                <Link to="/gallery/thailande" className="border border-white/80 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition opacity-70 hover:opacity-90">Thaïlande</Link>
                <Link to="/gallery/polynesie" className="border border-white/80 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition opacity-70 hover:opacity-90">Polynésie FR</Link>
              </div>
            )}
          </div>
        </div>

        {/* Réseaux sociaux - bas gauche */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-6 left-6 z-10 text-left"
        >
          <div className="flex gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/lechappee_demma?igsh=MWFtY2NrYzFpOHpvbw==" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <p className="text-primary-foreground/60 text-xs mt-3">Mes contacts</p>
        </motion.div>
      </section>


      {/* Texte de bienvenue entre hero et Introduction */}
      <div className="w-full my-1">
        <span
          className={
            `block w-full text-xs sm:text-sm md:text-base lg:text-lg font-serif font-bold text-blue-900 px-4 py-3 text-center whitespace-nowrap overflow-x-auto transition-opacity duration-500 ${showWelcome ? 'opacity-100' : 'opacity-0'}`
          }
        >
          Je conçois des parenthèses de sérénité sur-mesure dans le Grand Nord. Pour ralentir, se réapproprier son temps et, enfin, reprendre son souffle.
        </span>
      </div>

      {/* Introduction - Bienvenue et histoire */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-serif text-2xl mb-10">Bienvenue</button>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">Comment est née L'Échappée d'Emma?</h2>
          <p className="font-sans font-bold text-muted-foreground text-base md:text-lg mb-6">Je suis convaincue qu'à un tournant de vie, on a besoin de ralentir pour se retrouver.</p>
          <p className="font-sans text-muted-foreground text-base md:text-lg mb-2">C'est de cette conviction qu'est née <span className="font-bold">L'Échappée d'Emma</span>.</p>
          <p className="font-sans text-muted-foreground text-base md:text-lg mb-2">Après avoir moi-même cherché ce souffle dans les grands espaces nordiques,</p>
          <p className="font-sans text-muted-foreground text-base md:text-lg mb-2">je conçois aujourd'hui pour vous des itinéraires où je m'occupe de toute la logistique.</p>
          <p className="font-sans text-muted-foreground text-base md:text-lg">Mon objectif : vous laisser, simplement, respirer et vous reconnecter à l'essentiel.</p>
        </div>
      </section>

      {/* Je suis Emma - 2 colonnes : texte à gauche, photo à droite, légende sous la photo */}
      <section id="emma" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-5">Je suis Emma</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Travel planner pour vous aider à reprendre votre souffle</h2>
            <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-6">
              Je crée des itinéraires sur mesure dans le Grand Nord pour celles et ceux qui ont besoin de ralentir et de se recentrer. Mon approche : écoute, simplicité et nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/emma"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Découvrir mon histoire
              </Link>
              <Link
                to="/devis"
                className="border border-border px-8 py-3 rounded-full font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Débuter mon échappée
              </Link>
            </div>
          </div>
          <div>
            <div className="rounded-[32px] border border-border bg-gradient-to-br from-secondary via-background to-secondary/40 p-8 shadow-sm">
              <img
                src="/bureau-table-espace-travaille.webp"
                alt="Emma, travel planner, à son bureau de travail."
                className="h-80 w-full max-w-xl object-cover rounded-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Mes <span className="text-accent">destinations</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Inspirations pour votre prochaine échappée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              name={dest.name}
              tag={dest.tag}
              image={dest.img}
              index={i}
              to={dest.to}
            />
          ))}
        </div>
      </section>


      {/* Lien vers Mes prestations */}
      <section className="py-8 px-6 text-center">
        <Link
          to="/mes-prestations"
          className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg mb-8"
        >
          Voir toutes mes prestations
        </Link>
      </section>
      {/* Section 6 raisons supprimée */}

      {/* Reviews / Social proof */}
      <section id="avis" className="bg-secondary py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-foreground mb-6 leading-tight">
            Bientôt vos mots ici...
          </h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            L'échappée d'Emma commence avec vous. J'ai hâte de recueillir vos premières impressions et de partager ici vos récits.
          </p>
        </div>
      </section>

      {/* Section offres supprimée */}

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Prêt à sauter le pas ?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Complétez le formulaire ou contactez-moi directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Me contacter
              </Link>
              <Link
                to="/devis"
                className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Débuter mon échappée
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
