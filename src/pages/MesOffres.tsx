import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import AmbassadorCard from '../components/AmbassadorCard';
import OfferCard, { type Offer } from '../components/OfferCard';
import EmmaHello from '../components/EmmaHello';
import Seo from '@/components/Seo';
import { PAGES } from '@/seo/pages';

const MotionLink = motion(Link);

const offers: Offer[] = [
  {
    id: 'etincelle',
    kicker: 'Conseil express',
    name: "L'Étincelle",
    need: 'Vous ressentez la nécessité de clarifier vos choix et de lever vos doutes.',
    solution: '1h de visio-conseil pour valider vos choix techniques.',
    price: '100 €',
    emblem: 'spark',
  },
  {
    id: 'echappee',
    kicker: 'Voyage sur mesure',
    name: "L'Échappée",
    need: "Vous ressentez la nécessité de vous ressourcer, l'envie de vivre une expérience nordique ou l'appel des grands espaces et de la route.",
    solution:
      'Je conçois votre voyage sur mesure, en fonction de vos envies et de ce que vous souhaitez me déléguer : itinéraire, hébergements, transports, activités…',
    pricePrefix: 'À partir de',
    price: '250 €',
    feeNote: 'Selon la durée, la complexité du voyage et les prestations confiées.',
    emblem: 'horizon',
    featured: true,
  },
];

type TripFact = { label: string; value: string };

type TripExample = {
  id: string;
  region: string;
  image?: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  hook?: string;
  intro: string[];
  facts: TripFact[];
  spirit?: string[];
  budgetTitle: string;
  price: string;
  budgetDescription: string;
};

const BUDGET_DISCLAIMER =
  "Honoraires de conception inclus. Estimation établie à une date donnée, susceptible d'évoluer selon les disponibilités, les tarifs et la période choisie. Les réservations sont effectuées directement par les voyageurs auprès des prestataires.";

const northExamples: TripExample[] = [
  {
    id: 'magie-inari',
    region: 'Finlande · Laponie',
    image: '/images/galeries/finlande/paysage-hiver-lever-soleil-riviere-gelee-laponie.jpg',
    imageAlt: "Lever de soleil sur une rivière gelée en Laponie finlandaise, au début de l'hiver",
    title: 'La Magie d’Inari',
    subtitle: '5 nuits au cœur de la Laponie finlandaise – Pour 2 personnes',
    hook: 'Et si vous partiez là-haut, au-delà du cercle polaire, pour vivre les premiers instants de l’hiver arctique ?',
    intro: [
      'Direction Inari, au nord de la Finlande, pour une parenthèse à deux au rythme des paysages nordiques. Ici, les grands espaces, les forêts boréales et l’immensité du lac Inari invitent à ralentir et à profiter pleinement de l’instant.',
      'Un voyage imaginé en début d’hiver, entre découverte, liberté et douceur nordique, avec le plaisir de prendre la route à son rythme.',
    ],
    facts: [
      { label: 'Destination', value: 'Inari, Laponie finlandaise' },
      { label: 'Durée', value: '5 nuits' },
      { label: 'Voyageurs', value: '2 personnes' },
      { label: 'Période', value: 'Début d’hiver' },
      { label: 'Transport', value: 'Vols avec escale et location d’une voiture équipée pour les conditions hivernales' },
      { label: 'Hébergement', value: 'Adresse cosy et authentique, pour retrouver le plaisir de se poser après les journées d’exploration' },
    ],
    spirit: [
      "Prendre le temps de découvrir les paysages arctiques, s'imprégner de l'atmosphère si particulière du Grand Nord et profiter de soirées dans un cocon chaleureux.",
      "Inari est aussi une porte d'entrée vers la culture sámi et les traditions du Grand Nord. Une destination qui permet de mêler nature, rencontres et expériences nordiques, sans chercher à multiplier les étapes.",
      "Et si les conditions météo sont favorables, peut-être aurez-vous la chance d'apercevoir les aurores boréales. Un spectacle magique, mais toujours imprévisible !",
    ],
    budgetTitle: 'Le budget indicatif de cette échappée',
    price: 'À partir de 4 300 € pour 2 personnes',
    budgetDescription:
      "Cette estimation comprend les principaux postes du voyage, de la conception de l'itinéraire aux transports, à l'hébergement et aux expériences prévues.",
  },
  {
    id: 'liberte-nomade',
    region: 'Norvège · Fjords',
    image: '/images/galeries/norvege/route-panoramique-vallee-verte-ete.jpg',
    imageAlt: 'Route panoramique serpentant dans une vallée verdoyante de Norvège en été',
    title: 'La Liberté Nomade',
    subtitle: '3 semaines sur les routes des fjords norvégiens – Pour 4 personnes',
    hook: 'Et si vous preniez la route en famille, avec les fjords norvégiens pour horizon et la liberté de choisir votre prochaine étape ?',
    intro: [
      "Pendant trois semaines d'été, partez à la découverte du sud-ouest de la Norvège à bord d'un camping-car confortable. Un voyage itinérant pour vivre au plus près de la nature, traverser des paysages spectaculaires et partager de belles aventures en famille.",
      "Au fil des routes, les montagnes plongent dans les eaux des fjords, les cascades ponctuent les paysages et chaque étape devient une nouvelle occasion de s'émerveiller.",
    ],
    facts: [
      { label: 'Destination', value: 'Sud-ouest de la Norvège' },
      { label: 'Durée', value: '3 semaines' },
      { label: 'Voyageurs', value: '4 personnes' },
      { label: 'Période', value: 'Été' },
      { label: 'Transport', value: 'Traversée en ferry et déplacements en camping-car' },
      { label: 'Hébergement', value: "Camping-car confortable, pour voyager ensemble et profiter d'une belle liberté de mouvement" },
    ],
    spirit: [
      "Prendre le temps de parcourir les routes panoramiques, s'arrêter face à un fjord, découvrir de petits villages et profiter des grands espaces.",
      "Mais cette échappée est aussi pensée pour partager des expériences qui sortent de l'ordinaire : une balade en rail bike pour découvrir les paysages autrement, ou encore des descentes en tyrolienne pour faire le plein de sensations.",
      'Un équilibre entre contemplation, découverte et moments de complicité, où chacun trouve sa place dans l’aventure.',
    ],
    budgetTitle: 'Le budget indicatif de cette échappée',
    price: 'À partir de 7 100 € pour 4 personnes',
    budgetDescription:
      'Cette estimation comprend les principaux postes du voyage : la traversée en ferry, le van aménagé, les étapes et les activités familiales sélectionnées.',
  },
  {
    id: 'premieres-lueurs-islande',
    region: 'Islande · Printemps',
    image: '/images/galeries/islande/lagune-glaciaire-icebergs-soleil.jpg',
    imageAlt: 'Lagune glaciaire islandaise et icebergs baignés de soleil',
    title: 'Premières Lueurs d’Islande',
    subtitle: '4 nuits au pays des contrastes – Pour 2 personnes',
    hook: 'Et si vous découvriez l’Islande au printemps, lorsque la lumière s’étire et que les paysages reprennent doucement vie ?',
    intro: [
      "Pour cette première escapade islandaise, cap sur les paysages fascinants de l'île : cascades impressionnantes, étendues volcaniques, sources chaudes et panoramas à couper le souffle.",
      "Pendant quatre nuits, partez à deux sur les routes islandaises, au volant de votre voiture de location. Un séjour imaginé pour découvrir les incontournables à votre rythme, sans multiplier les kilomètres ni courir d'une étape à l'autre.",
    ],
    facts: [
      { label: 'Destination', value: 'Islande' },
      { label: 'Durée', value: '4 nuits' },
      { label: 'Voyageurs', value: '2 personnes' },
      { label: 'Période', value: 'Mai, autour des ponts de printemps' },
      { label: 'Transport', value: "Vol direct depuis la France et location d'une voiture" },
      { label: 'Hébergement', value: "Hébergements standards, sélectionnés au fil de l'itinéraire" },
      { label: 'Expériences', value: 'Une activité ou expérience sélectionnée chaque jour' },
    ],
    spirit: [
      'Se laisser surprendre par les contrastes islandais : la puissance des cascades, les paysages façonnés par les volcans, les étendues sauvages et les premières couleurs du printemps.',
      'Chaque journée réserve une découverte, avec une expérience choisie pour enrichir le voyage et varier les plaisirs.',
      "En mai, les journées sont déjà très longues en Islande. Une belle occasion de profiter de la lumière, de prendre son temps et de savourer les paysages avant l'arrivée de la haute saison estivale.",
      "Une première immersion dans l'univers islandais, idéale pour goûter à la liberté du road trip et donner envie de revenir explorer davantage cette île fascinante.",
    ],
    budgetTitle: 'Le budget indicatif de cette échappée',
    price: 'À partir de 2 040 € pour 2 personnes',
    budgetDescription:
      'Cette estimation comprend les principaux postes du voyage : les vols directs, la location de voiture et les hébergements. Chaque journée réserve une expérience : découverte culturelle, bain chaud, randonnée au cœur des paysages islandais ou pause gourmande.',
  },
];

const elsewhereExamples: TripExample[] = [
  {
    id: 'lumieres-budapest',
    region: 'Hongrie · City-break',
    title: 'Lumières de Budapest',
    subtitle: 'Le charme du Danube et la chaleur des sources',
    hook: '3 nuits au cœur de Budapest',
    intro: [
      "Une escapade de trois nuits à la mi-novembre pour savourer l'atmosphère feutrée de la perle du Danube. Une parenthèse citadine entre architecture impériale, promenades au bord du fleuve et bains historiques, parfaite pour reprendre son souffle.",
    ],
    facts: [
      { label: 'Destination', value: 'Budapest, Hongrie' },
      { label: 'Durée', value: '3 nuits' },
      { label: 'Voyageurs', value: '2 personnes' },
      { label: 'Période', value: 'Mi-novembre' },
      { label: 'Transport', value: 'Vol direct' },
      { label: 'Hébergement', value: '1 logement au cœur de la ville, selon vos besoins' },
      { label: 'Expériences', value: 'Une expérience à découvrir chaque jour' },
    ],
    budgetTitle: 'Le budget de votre voyage',
    price: 'À partir de 800 € pour 2 personnes',
    budgetDescription:
      'Cette estimation globale comprend les principaux postes du voyage ainsi que les honoraires de conception.',
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

/** Petit titre de section en capitales espacées */
const Eyebrow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-accent ${className}`.trim()}>{children}</p>
);

/** Fiche d'un voyage exemple : visuel d'un côté, récit de l'autre (alterné sur grand écran) */
const TripExampleCard = ({ trip, index, reverse = false }: { trip: TripExample; index: number; reverse?: boolean }) => (
  <motion.article
    id={trip.id}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    variants={fadeUp}
    className={`grid scroll-mt-28 items-start gap-8 lg:gap-14 ${reverse ? 'lg:grid-cols-[8fr_4fr]' : 'lg:grid-cols-[4fr_8fr]'}`}
  >
    {/* Visuel */}
    <div className={`mx-auto w-full max-w-xl lg:sticky lg:top-28 lg:max-w-none ${reverse ? 'lg:order-2' : ''}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(var(--navy-deep)/0.45)] lg:aspect-[4/5]">
        {trip.image ? (
          <img
            src={trip.image}
            alt={trip.imageAlt || trip.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:1.5s] ease-out hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.35),transparent_55%),linear-gradient(160deg,hsl(var(--navy)),hsl(var(--navy-deep)))] p-8 text-center">
            <span className="text-sm text-accent" aria-hidden="true">✦</span>
            <p className="mt-4 font-serif text-4xl italic text-primary-foreground md:text-5xl">{trip.title}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-primary-foreground/60">{trip.region}</p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
          <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {trip.region}
          </span>
          <span className="font-serif text-4xl italic text-white/80" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>

    {/* Récit */}
    <div className={reverse ? 'lg:order-1' : ''}>
      <h3 className="font-serif text-3xl text-primary md:text-4xl">{trip.title}</h3>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/60">{trip.subtitle}</p>
      <div className="mt-6 h-px w-16 bg-gradient-to-r from-accent to-transparent" />

      {trip.hook && (
        <p className="mt-6 font-serif text-xl italic leading-relaxed text-primary md:text-2xl">{trip.hook}</p>
      )}

      <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
        {trip.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* En quelques mots */}
      <div className="mt-8 rounded-[1.75rem] border border-border/70 bg-background p-6 md:p-7">
        <p className="font-serif text-xl text-primary">Votre échappée en quelques mots</p>
        <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {trip.facts.map((fact) => (
            <div key={fact.label} className="border-t border-border/60 pt-3">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-primary md:text-[0.95rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* L'esprit du voyage */}
      {trip.spirit && trip.spirit.length > 0 && (
        <div className="mt-8">
          <p className="font-serif text-xl text-primary">L’esprit du voyage</p>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {trip.spirit.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Budget */}
      <div className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-primary p-6 text-primary-foreground md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{trip.budgetTitle}</p>
          <p className="mt-3 font-serif text-2xl md:text-3xl">{trip.price}</p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 md:text-base">{trip.budgetDescription}</p>
          <p className="mt-4 border-t border-primary-foreground/15 pt-4 text-xs italic leading-relaxed text-primary-foreground/55">
            {BUDGET_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  </motion.article>
);

const MesOffres = () => {
  return (
    <>
      <Seo title={PAGES.offres.title} description={PAGES.offres.description} path={PAGES.offres.path} />
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      <motion.section className="bg-secondary/40 pt-36 pb-24 px-4 md:px-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Introduction */}
          <div id="cap-au-nord" className="mx-auto max-w-4xl text-center mb-8 md:mb-10 scroll-mt-28">
            <motion.h1 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={fadeDown} className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Mon offre sur mesure & Programme Ambassadeur
            </motion.h1>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp} className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                Chaque envie d'évasion est unique. Mon offre est une page blanche que nous construisons ensemble, selon vos envies, votre façon de voyager et ce que vous souhaitez me déléguer.
              </p>
              <p>
                Que vous rêviez d'une parenthèse pour vous ressourcer, d'un séjour autour d'une expérience particulière ou d'un road trip au cœur des grands espaces nordiques, je compose un accompagnement adapté à votre projet.
              </p>
            </motion.div>

            {/* Transparence : Emma dit bonjour et présente son engagement */}
            <EmmaHello />
          </div>

          {/* Les deux offres */}
          <div className="px-4 py-8 md:p-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
              {offers.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} index={index} />
              ))}
            </div>
          </div>

          {/* Exemples Grand Nord */}
          <section className="mt-16 md:mt-20" aria-labelledby="exemples-titre">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp} className="mx-auto max-w-3xl text-center">
              <Eyebrow>Inspirations</Eyebrow>
              <h2 id="exemples-titre" className="mt-3 text-3xl md:text-4xl font-serif text-primary">Des exemples pour vous inspirer</h2>
              <div className="mt-5 space-y-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Chaque projet est unique. À travers ces trois voyages, découvrez différentes possibilités d’évasion dans le Grand Nord et obtenez une première idée du budget à prévoir, honoraires de Travel Planner inclus.
                </p>
                <p>
                  Ces voyages sont des inspirations, pas des formules toutes faites. Chaque itinéraire est conçu sur mesure, selon vos envies et votre façon de voyager.
                </p>
              </div>
            </motion.div>

            <div className="mx-auto mt-14 max-w-6xl space-y-20 md:space-y-28">
              {northExamples.map((trip, index) => (
                <TripExampleCard key={trip.id} trip={trip} index={index} reverse={index % 2 === 1} />
              ))}
            </div>
          </section>

          {/* Ailleurs */}
          <section id="autre-latitudes-experience" className="mt-24 md:mt-32 pt-8 scroll-mt-24" aria-labelledby="ailleurs-titre">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp} className="mx-auto max-w-3xl text-center">
              <Eyebrow>Sous d'autres latitudes</Eyebrow>
              <h2 id="ailleurs-titre" className="mt-3 text-3xl md:text-4xl font-serif text-primary">Et si votre échappée vous emmenait ailleurs ?</h2>
              <div className="mt-5 space-y-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Parce que vos envies peuvent aussi vous conduire sous d'autres latitudes, découvrez quelques inspirations de voyages hors Grand Nord.
                </p>
                <p>
                  Cet exemple vous donne un aperçu des possibilités et du budget à prévoir, honoraires de Travel Planner inclus. Il n'est pas une formule imposée : votre voyage sera imaginé sur mesure, selon vos envies et vos attentes.
                </p>
              </div>
            </motion.div>

            <div className="mx-auto mt-14 max-w-6xl space-y-20">
              {elsewhereExamples.map((trip, index) => (
                <TripExampleCard key={trip.id} trip={trip} index={northExamples.length + index} />
              ))}
            </div>
          </section>

          {/* Conversation */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="mx-auto mt-24 md:mt-32 max-w-3xl text-center"
          >
            <span className="text-sm text-accent" aria-hidden="true">✦</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-serif text-primary">Une échappée qui commence par une conversation</h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
              Racontez-moi vos envies, vos rêves, votre façon de voyager… Créons ensemble une échappée qui vous ressemble.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/devis"
                className="btn-primary btn-lg"
              >
                Débuter mon échappée
              </Link>
              <Link
                to="/contact"
                className="btn-outline btn-lg"
              >
                Me contacter
              </Link>
            </div>
          </motion.div>

          {/* Programme Ambassadeur */}
          <div className="px-4 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mx-auto mt-20 max-w-6xl">
              <AmbassadorCard />
            </motion.div>
          </div>

          {/* Carte cadeau Noël */}
          <div className="mt-14 flex justify-center px-4">
            <MotionLink
              to="/village-du-pere-noel"
              className="group relative block w-full max-w-xl"
              initial="rest"
              whileHover="hover"
            >
              <motion.div
                className="relative overflow-hidden rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,1),hsl(var(--blush-50)/0.98))] px-6 pb-8 pt-10 shadow-[0_24px_55px_hsl(var(--shadow-plum)/0.14)]"
                variants={{
                  rest: { rotate: 0, x: 0, y: 0 },
                  hover: {
                    rotate: [0, -0.8, 0.8, -0.6, 0.6, -0.35, 0.35, 0],
                    x: [0, -2.5, 2.5, -1.8, 1.8, -1, 1, 0],
                    y: [0, -0.5, 0, -0.5, 0],
                    transition: {
                      duration: 0.65,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 0.32,
                    },
                  },
                }}
              >
                <div className="absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_18px_18px,hsl(var(--confetti-pink)/0.55)_0_2px,transparent_2.5px),radial-gradient(circle_at_42px_22px,hsl(var(--confetti-green)/0.5)_0_2px,transparent_2.5px),radial-gradient(circle_at_26px_44px,hsl(var(--confetti-gold)/0.55)_0_2px,transparent_2.5px),radial-gradient(circle_at_52px_50px,hsl(var(--confetti-blue)/0.45)_0_2px,transparent_2.5px)] [background-size:72px_72px]" />
                <div className="absolute inset-x-0 top-[5.35rem] h-4 bg-[linear-gradient(180deg,hsl(var(--gift-gold)),hsl(var(--gift-gold-deep)))] shadow-[0_8px_18px_hsl(var(--gift-gold-deep)/0.25)]" />
                <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 bg-[linear-gradient(180deg,hsl(var(--gift-gold-light)),hsl(var(--gift-gold-deep)))] shadow-[0_8px_18px_hsl(var(--gift-gold-deep)/0.2)]" />
                <div className="absolute left-1/2 top-[5.35rem] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-[hsl(var(--gift-gold-mid))] bg-white/95 shadow-[0_8px_18px_hsl(var(--gift-gold-deep)/0.18)]" />
                <div className="absolute left-[calc(50%-2.5rem)] top-[2.35rem] h-11 w-11 rounded-full border-[10px] border-[hsl(var(--gift-gold-mid))] border-b-0 border-r-0 bg-transparent rotate-[10deg]" />
                <div className="absolute left-[calc(50%+0.15rem)] top-[2.35rem] h-11 w-11 rounded-full border-[10px] border-[hsl(var(--gift-gold-mid))] border-b-0 border-l-0 bg-transparent -rotate-[10deg]" />

                <div className="relative z-10 text-center">
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary/60">Idée cadeau</p>
                  <h3 className="mt-3 text-2xl font-serif text-primary md:text-3xl">L'Échappée de Noël</h3>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-primary/75 md:text-base">
                    Glissez sous le sapin bien plus qu'un voyage : une promesse d'émerveillement à partager. Offrez la féerie polaire et le bonheur de créer ensemble des souvenirs qui dureront toute une vie, là où le temps s'arrête.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,hsl(var(--noel-red)),hsl(var(--noel-red-deep)))] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_20px_hsl(var(--noel-red-deep)/0.28)]">
                    Entrer dans la féérie
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            </MotionLink>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  </>);
};

export default MesOffres;
