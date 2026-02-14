import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import ReviewCard from '../components/ReviewCard';

import heroImage from '@/assets/hero-travel.webp';
import destIslande from '@/assets/dest-islande.jpg';
import destNorvege from '@/assets/dest-norvege.jpg';
import destSuede from '@/assets/dest-suede.jpg';
import destFinlande from '@/assets/dest-finlande.jpg';

const destinations = [
  { id: 1, name: 'Islande', img: destIslande, tag: 'Geyser', to: '/galerie/islande' },
  { id: 2, name: 'Norvège', img: destNorvege, tag: 'Fjords', to: '/galerie/norvege' },
  { id: 3, name: 'Suède', img: destSuede, tag: 'Nature', to: '/galerie/suede' },
  { id: 4, name: 'Finlande', img: destFinlande, tag: 'Hiver', to: '/galerie/finlande' },
];

const reviews = [
  { id: 1, user: 'Sophie L.', text: 'Un voyage sur mesure parfait en Islande. Tout était millimétré !', rating: 5 },
  { id: 2, user: 'Marc D.', text: "L'expertise sur la Norvège a fait toute la différence pour notre lune de miel.", rating: 5 },
  { id: 3, user: 'Elena V.', text: 'Très réactive et de très bon conseil pour un premier voyage en famille.', rating: 4 },
];

const popularTags = ['Norvège', 'Islande', 'Égypte', 'Suède'];

const reasons = [
  {
    title: 'Gagnez du temps',
    description: 'Plus de 40 heures de recherches économisées pour votre itinéraire.',
    icon: Hourglass,
  },
  {
    title: 'Expertise terrain',
    description: 'Des pépites dénichées hors des sentiers battus.',
    icon: Compass,
  },
  {
    title: 'Zero charge mentale',
    description: 'Je gère toute la logistique pour vous laisser vivre l’instant.',
    icon: Sparkles,
  },
  {
    title: '100 % sur-mesure',
    description: 'Un parcours écrit pour votre rythme et vos besoins profonds.',
    icon: PenTool,
  },
  {
    title: 'Transparence totale',
    description: 'Vous réservez directement, sans frais cachés ni commissions.',
    icon: BadgeCheck,
  },
  {
    title: 'Accompagnement humain',
    description: 'Une écoute sincère pour un voyage qui a du sens.',
    icon: HandHeart,
  },
];

const processSteps = [
  {
    step: '1',
    title: "L'appel découverte",
    description: 'On échange sur votre énergie du moment et vos envies profondes.',
    icon: Phone,
  },
  {
    step: '2',
    title: 'Devis & immersion',
    description: 'Je cadre votre projet avec une proposition claire et inspirée.',
    icon: PenTool,
  },
  {
    step: '3',
    title: 'Sélection & réservations',
    description: 'Je sélectionne les meilleures options, vous validez.',
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
];

const breathNeeds = [
  {
    number: '1',
    title: "L'État (Islande)",
    subtitle: "Le souffle de l'émerveillement",
    spirit: "Saturer ses sens de beauté pour ne plus laisser de place aux pensées négatives.",
    experience: "Un roadtrip intense entre volcans et glaciers pour ceux qui ont besoin d'un choc pour se sentir à nouveau vibrer.",
    icon: Mountain,
  },
  {
    number: '2',
    title: "L'Horizon (Norvège)",
    subtitle: 'Le souffle de la liberté',
    spirit: "Reprendre les commandes de sa vie. Ne plus subir aucun horaire ni aucune obligation logistique.",
    experience: "La vie en van le long des fjords. Changer d'avis, changer de route, et s'apercevoir que le cœur nous dit où rester.",
    icon: Truck,
  },
  {
    number: '3',
    title: "Le Cocon (Finlande)",
    subtitle: 'Le souffle de la douceur',
    spirit: "Mettre le monde sur \"pause\". Ralentir et s'autoriser enfin à ne rien faire, sans culpabiliser.",
    experience: "Un chalet sous la nuit polaire. Le crépitement du feu et la chaleur du sauna. Une activité au choix (contemplative ou sportive) ou la liberté d'un temps sans programme.",
    icon: Home,
  },
  {
    number: '4',
    title: "La Source (Suède)",
    subtitle: "Le souffle de l'essentiel",
    spirit: "Une \"digital detox\" profonde pour s'entendre à nouveau réfléchir.",
    experience: "Canoë-trip sur les lacs sauvages. Un circuit minimaliste pour se reconnecter à la simplicité de l'eau, du bois et du feu.",
    icon: Leaf,
  },
  {
    number: '5',
    title: "L'Éveil (Scandinavie)",
    subtitle: 'Le souffle du dépassement',
    spirit: "Retrouver confiance en sa force intérieure. Se prouver que l'on peut encore devenir celui (ou celle) que l'on veut.",
    experience: "Une itinérance à pied ou à vélo sans voiture. Partir sans sac, passer une nuit gratuit de chaque pas.",
    icon: Footprints,
  },
  {
    number: '6',
    title: "L'Infini (Lofoten)",
    subtitle: 'Le souffle hors du temps',
    spirit: "Perdre ses repères habituels pour mieux se retrouver. S'affranchir de la dictature de la montre.",
    experience: "Vivre le Soleil de Minuit. Randonner au lire à 3h du matin sous une lumière dorée, éternelle. Un voyage où \"l'heure qu'il est\" n'a plus aucune importance.",
    icon: Sun,
  },
];

const offers = [
  {
    title: 'La Parenthèse "Inspiration"',
    subtitle: "Pour celles et ceux qui veulent s'élancer en douceur.",
    price: 'Forfait à partir de XX EUR',
    items: [
      'Questionnaire "Éclaireur" pour cerner vos besoins.',
      'Appel Horizon offert pour faire le point.',
      'Kit Essentiel (PDF) : 9 cartes pour visualiser.',
      '5 Fondamentaux pour choisir votre destination.',
      '2 Spécificités selon votre profil.',
    ],
  },
  {
    title: "L'itinérance sérénité",
    subtitle: 'Pour celles et ceux qui veulent tout déléguer.',
    price: 'Sur devis, à partir de XXX EUR',
    items: [
      'Appel Découverte offert pour cadrer votre projet.',
      'Itinéraire sur-mesure jour par jour.',
      'Sélection d’hébergements et transports.',
      'Carnet de route complet avec liens de réservation.',
      'Conseils logistiques personnalisés tout au long du parcours.',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideRight = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const dotPop = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const Index = () => {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeReasonStep, setActiveReasonStep] = useState(0);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const reasonsSectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Aurore boréale et montagnes enneigées en Islande — L'échappée d'Emma voyage sur mesure"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="uppercase tracking-[0.3em] text-sm mb-6 font-light text-primary-foreground/80"
          >
            L'échappée d'Emma — Voyage sur mesure
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif mb-10 leading-tight text-primary-foreground"
          >
            Faisons le <span className="italic">voyage</span> ensemble
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/devis"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-2xl"
            >
              Créer mon voyage <Search size={20} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to="/devis"
                className="px-5 py-2 rounded-full border border-primary-foreground/30 text-primary-foreground/80 hover:bg-primary-foreground hover:text-foreground transition-colors text-sm"
              >
                {tag}
              </Link>
            ))}
          </motion.div>

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
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <p className="text-primary-foreground/60 text-xs mt-3">Nos réseaux sociaux</p>
        </motion.div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Nos top <span className="text-accent">destinations</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Inspirations pour votre prochain départ.
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

      {/* Je suis Emma */}
      <motion.section
        id="emma"
        className="py-24 px-6"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideRight}>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-5">
              Je suis Emma
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Travel planner pour vous aider à reprendre votre souffle
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Je crée des itinéraires sur mesure dans le Grand Nord pour celles et ceux qui ont
              besoin de ralentir et de se recentrer. Mon approche : écoute, simplicité et nature.
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
                Créer mon voyage
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={slideLeft}
            className="rounded-[32px] border border-border bg-gradient-to-br from-secondary via-background to-secondary/40 p-8 shadow-sm"
            whileHover={{ y: -6, rotate: -0.4 }}
          >
            <div className="rounded-3xl bg-background/70 border border-border p-8">
              <div className="h-52 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-secondary" />
              <p className="text-sm text-muted-foreground mt-5">
                Un espace de travail doux, pour imaginer un voyage qui vous ressemble.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6 raisons */}
      <motion.section
        ref={reasonsSectionRef}
        className="bg-secondary/60 py-24 px-6 min-h-[200vh]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto relative">
          <div className="sticky top-24">
            <div className="text-center mb-14">
              <motion.h2 
                initial={{ opacity: 0, y: -18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="text-3xl md:text-4xl font-serif text-foreground"
              >
                6 raisons de faire appel à moi
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-muted-foreground mt-4 text-lg"
              >
                Un accompagnement humain pour un voyage qui a du sens.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason, index) => {
                const isActive = activeReasonStep >= index;
                return (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, scale: 0.85, y: 12 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="bg-background border border-border rounded-3xl p-6 shadow-sm"
                    whileHover={{ y: -6, rotate: -0.3 }}
                  >
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4"
                    >
                      <reason.icon className="text-accent" size={22} />
                    </motion.div>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-24" aria-hidden="true">
            {reasons.map((reason, index) => (
              <div key={reason.title} data-reason-step={index} className="h-[24vh]" />
            ))}
            <div className="h-[60vh]" />
          </div>
        </div>
      </motion.section>

      {/* Reviews / Social proof */}
      <section id="avis" className="bg-secondary py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex mb-4 items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={20} fill="hsl(var(--gold))" color="hsl(var(--gold))" />
                ))}
              </div>
              <span className="font-bold text-foreground">4,9/5 — Avis cumulés</span>
            </div>
            <h2 className="text-4xl font-serif text-foreground mb-6 leading-tight">
              Expertise et passion du voyage
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Je vous accompagne pour créer un itinéraire unique et mémorable.
            </p>
            <div className="bg-background p-5 rounded-2xl shadow-sm border inline-flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Phone className="text-accent" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                  Assistance Voyage
                </p>
                <p className="font-bold text-lg text-foreground">06 78 21 88 23</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {reviews.map((review, i) => (
              <ReviewCard
                key={review.id}
                user={review.user}
                text={review.text}
                rating={review.rating}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <motion.section
        ref={processSectionRef}
        className="py-24 px-6 min-h-[200vh]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto relative">
          <div className="sticky top-24">
            <div className="text-center mb-14">
              <motion.h2 
                initial={{ opacity: 0, y: -18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="text-3xl md:text-4xl font-serif text-foreground"
              >
                Mon processus : de l'idée à l'échappée
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-muted-foreground mt-4 text-lg"
              >
                Une méthode simple et fluide pour avancer avec sérénité.
              </motion.p>
            </div>

            <motion.div
              aria-hidden="true"
              animate={{ scaleX: processProgress }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden md:block absolute left-6 right-6 top-[170px] h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent origin-left"
            />

            <motion.div variants={stagger} className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => {
                const isActive = activeProcessStep >= index;
                return (
                  <motion.div
                    key={step.step}
                    variants={fadeUp}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`rounded-3xl p-6 text-center transition-all duration-300 ${isActive ? 'bg-secondary/50 border border-border' : 'bg-transparent border-transparent pointer-events-none'}`}
                    whileHover={{ y: -6 }}
                  >
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-12 h-12 rounded-full font-bold flex items-center justify-center mx-auto mb-4 bg-accent text-accent-foreground"
                      aria-hidden={!isActive}
                    >
                      {step.step}
                    </motion.div>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                      className="w-10 h-10 rounded-2xl bg-background flex items-center justify-center mx-auto mb-3"
                      aria-hidden={!isActive}
                    >
                      <step.icon className="text-accent" size={18} />
                    </motion.div>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="min-h-[64px]"
                      aria-hidden={!isActive}
                    >
                      <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-24" aria-hidden="true">
            {processSteps.map((step, index) => (
              <div key={step.step} data-process-step={index} className="h-[24vh]" />
            ))}
            <div className="h-[60vh]" />
          </div>
        </div>
      </motion.section>

      {/* Besoin de souffle */}
      <motion.section
        className="bg-background py-24 px-6 relative overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-3xl md:text-4xl font-serif text-foreground mb-6"
            >
              Quel est votre besoin de souffle ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-sm mb-4"
            >
              Parce que chaque tourment de vie demande une énergie différente, j'ai conçu una approche pour vous aider à retrouver votre cap.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-sm"
            >
              C'est vous qui choisissez l'intensité de votre déconnexion.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-16 relative">
            {breathNeeds.map((need, index) => (
              <motion.div
                key={need.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center relative"
              >
                {/* Card */}
                <motion.div
                  className="bg-[#1e3a5f] text-white rounded-2xl p-6 w-full shadow-lg relative h-[420px] flex flex-col"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
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

                  {/* Icon */}
                  <div className="flex justify-center">
                    <need.icon className="text-white/60" size={40} strokeWidth={1.5} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Offres */}
      <motion.section
        className="py-24 px-6"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2 variants={fadeDown} className="text-3xl md:text-4xl font-serif text-foreground">
              Investir dans votre sérénité
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 text-lg">
              Deux formats d'accompagnement, selon votre niveau de besoin.
            </motion.p>
          </div>

          <motion.div variants={stagger} className="grid lg:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <motion.div
                key={offer.title}
                variants={fadeUp}
                className="border border-border rounded-[32px] p-8 bg-secondary/40"
                whileHover={{ y: -6 }}
              >
                <h3 className="text-xl font-serif text-foreground mb-2">{offer.title}</h3>
                <p className="text-muted-foreground mb-4">{offer.subtitle}</p>
                <span className="inline-flex bg-accent/20 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">
                  {offer.price}
                </span>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {offer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

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
              Prêt à partir ?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Créez votre voyage sur mesure en quelques clics ou contactez-moi directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/devis"
                className="bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Créer mon voyage
              </Link>
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Nous contacter
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
