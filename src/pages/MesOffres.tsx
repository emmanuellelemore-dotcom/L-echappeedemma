import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import AmbassadorCard from '../components/AmbassadorCard';

const offers = [
  {
    title: "Offre L'Étincelle",
    need: 'Vous ressentez la nécessité de clarifier vos choix et de lever vos doutes.',
    solution: '1h de visio-conseil pour valider vos choix techniques.',
    displayPrice: '70 €',
    feeNote: 'Honoraires de visio-conseil pour une session dédiée à vos questions prioritaires.',
    detailTitle: 'Format expertise express',
    detailPrice: '70 €',
    items: [
      "1h30 d’entretien pour lever vos doutes.",
      'Thématique au choix : itinéraire, budget ou logistique.',
      'Envoi d’un PDF récapitulatif de nos échanges.',
      'Cible : voyageurs autonomes en quête d’un regard expert.',
    ],
  },
  {
    title: "Offre L’Escale",
    need: "Vous ressentez l'appel du silence et d’une pause immédiate.",
    solution: 'Un séjour court (4-5 jours) dans un cocon unique et apaisant.',
    displayPrice: 'À partir de 2 000 € pour 2*',
    feeNote: 'Dont un minimum de 300 € d’honoraires de création, à adapter selon la durée du séjour.',
    detailTitle: 'Premières Lueurs d’Islande',
    detailPrice: 'À partir de 2 000 € pour 2*',
    items: [
      '4 nuits au cœur des ponts de mai, là où le jour ne finit jamais vraiment.',
      'Vol direct',
      'Voiture de location',
      'Hébergement standard',
      'Une expérience incluse chaque jour',
    ],
  },
  {
    title: "Offre L’Ancrage",
    need: "Vous ressentez l'envie de ralentir et de vous imprégner d’un lieu.",
    solution: '7 à 10 jours avec un ou deux hébergements maximum.',
    displayPrice: 'À partir de 2 500 € pour 2*',
    feeNote: 'Dont un minimum de 460 € d’honoraires de création, à adapter selon la durée du séjour.',
    detailTitle: 'Douceur de vivre en Suède',
    detailPrice: 'À partir de 2 500 € pour 2*',
    items: [
      '7 nuits fin juin pour célébrer le solstice.',
      'Vol direct',
      'Voiture de location pour explorer les forêts',
      'Immersion totale dans une maison près du lac',
      'Temps pour soi : randonnées, lectures et repos',
    ],
  },
  {
    title: 'Offre Le Boréal',
    need: 'Vous ressentez le désir de vivre la féerie nordique (Aurores, Noël).',
    solution: '5 à 7 jours thématiques avec une logistique arctique sécurisée.',
    displayPrice: 'À partir de 4 300 € pour 2*',
    feeNote: 'Dont un minimum de 480 € d’honoraires de création, à adapter selon la durée du séjour.',
    detailTitle: 'La Magie d’Inari',
    detailPrice: 'À partir de 4 300 € pour 2*',
    items: [
      '5 nuits au début de l’hiver, quand la Finlande revêt son manteau blanc.',
      'Vol avec escale vers le cercle polaire',
      'Voiture équipée pour la conduite sur neige',
      'Cocon douillet choisi pour son authenticité',
      '5 activités au choix : traîneau, motoneige, rennes, karting...',
    ],
  },
  {
    title: 'Offre Le Tracé',
    need: "Vous ressentez l'appel de la route et de la liberté totale.",
    solution: 'Un itinéraire de 8 jours ou plus, dédié exclusivement à la Vanlife.',
    displayPrice: 'À partir de 7 000 € pour 4*',
    feeNote: 'Dont un minimum de 500 € d’honoraires de création, à adapter selon la durée du séjour.',
    detailTitle: 'La Liberté Nomade',
    detailPrice: 'À partir de 7 000 € pour 4*',
    items: [
      '3 semaines d’été à travers les fjords du Sud-Ouest de la Norvège.',
      'Van tout confort aménagé pour 4 personnes',
      'Ferry inclus pour traverser les fjords',
      'Activités : vélo sur rail et tyroliennes en famille',
    ],
  },
  {
    title: 'Offre La Traversée',
    need: "Vous ressentez l'envie d’une immersion longue et de diversité.",
    solution: 'Un road trip complet de 10 jours ou plus, à votre rythme.',
    displayPrice: 'À partir de 5 000 € pour 2*',
    feeNote: 'Dont un minimum de 880 € d’honoraires de création, à adapter selon la durée du séjour.',
    detailTitle: 'L’Odyssée des Lofoten',
    detailPrice: 'À partir de 5 000 € pour 2*',
    items: [
      '11 nuits en mai, entre sommets enneigés et mer turquoise.',
      'Vol avec escale',
      'Voiture de location',
      'Escales variées',
      'Kayak de mer, randonnées & culture locale',
    ],
  },
];

const latitudeOffers = [
  {
    title: 'Offre L’Horizon',
    need: 'Vous souhaitez vous envoler vers une destination ensoleillée ou citadine que j’ai moi-même déjà explorée.',
    solution: 'Un itinéraire sur-mesure (dès 3 nuits) basé sur mon expérience de terrain pour une échappée authentique.',
    displayPrice: 'À partir de 300 €',
    explorationGroups: [
      {
        title: 'Douceur de France',
        destinations: 'Road trip en Bretagne, Côte d’Opale, Baie de Somme.',
      },
      {
        title: 'Escales Européennes',
        destinations: 'Prague, Budapest, Lisbonne & l’Algarve.',
      },
      {
        title: 'Méditerranée & Balkans',
        destinations: 'Croatie, Albanie, Égypte.',
      },
      {
        title: 'Horizons Lointains',
        destinations: 'Thaïlande, Polynésie française, La Réunion, La Guadeloupe.',
      },
    ],
    exampleTitle: 'L’Horizon : "Lumières de Budapest"',
    exampleSubtitle: 'Le charme du Danube et la chaleur des sources.',
    examplePrice: 'À partir de 800 € pour 2*',
    exampleFeeNote: 'Estimation globale (incluant un minimum de 300 € d’honoraires de création) à adapter selon la durée du séjour.',
    description:
      '3 nuits à la mi-novembre pour savourer l’atmosphère feutrée de la perle du Danube. Une parenthèse citadine entre architecture impériale et bains historiques, parfaite pour reprendre son souffle.',
    facts: [
      'Vol direct',
      'City-break au cœur de la ville',
      '1 logement (selon vos besoins)',
      'Une expérience incluse chaque jour',
    ],
  },
  {
    title: 'Offre L’Inconnue',
    need: 'Vous rêvez d’une destination lointaine ou atypique que je n’ai pas encore explorée, mais vous voulez la sécurité d’un itinéraire expert.',
    solution: 'Une création d’itinéraire de A à Z (dès 7 nuits) incluant une phase de recherche logistique approfondie sur cette terre nouvelle.',
    displayPrice: 'À partir de 630 €',
    exampleTitle: 'L’Inconnue : "La Page Blanche"',
    exampleSubtitle: 'Le monde est vaste, partons l’explorer ensemble.',
    examplePrice: 'Sur devis *',
    exampleFeeNote: 'Honoraires dès 560 €, à ajuster selon la complexité et la durée de votre échappée.',
    description:
      '7 à 20 nuits pour donner vie à ce projet qui vous fait rêver. Que vous soyez attirés par la spiritualité du Laos, les temples du Cambodge ou la douceur des Seychelles, je construis votre sécurité là où tout est nouveau.',
    facts: [
      'Logistique et vols internationaux analysés',
      'Itinéraire créé de A à Z (page blanche)',
      'Sélection d’étapes selon vos besoins',
      'Une expérience phare dénichée par jour',
    ],
    closingTitle: 'Tout est possible',
    closingCopy:
      'Chaque projet est unique : tout dépendra de vos envies, de votre rythme et de votre budget. Pour transformer cette page blanche en une échappée qui vous ressemble, rencontrons-nous d’abord pour en parler.',
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

const snowflakes = [
  { left: '8%', top: '8%', size: 'text-xs', delay: 0, duration: 7 },
  { left: '20%', top: '20%', size: 'text-sm', delay: 0.6, duration: 8 },
  { left: '34%', top: '10%', size: 'text-xs', delay: 1.1, duration: 6.8 },
  { left: '48%', top: '28%', size: 'text-sm', delay: 0.3, duration: 7.5 },
  { left: '62%', top: '14%', size: 'text-xs', delay: 1.6, duration: 8.3 },
  { left: '76%', top: '24%', size: 'text-sm', delay: 0.8, duration: 7.1 },
  { left: '88%', top: '12%', size: 'text-xs', delay: 1.9, duration: 8.6 },
  { left: '15%', top: '52%', size: 'text-sm', delay: 0.9, duration: 7.9 },
  { left: '30%', top: '64%', size: 'text-xs', delay: 1.4, duration: 6.9 },
  { left: '44%', top: '50%', size: 'text-sm', delay: 0.2, duration: 8.1 },
  { left: '58%', top: '68%', size: 'text-xs', delay: 1.7, duration: 7.4 },
  { left: '72%', top: '56%', size: 'text-sm', delay: 0.5, duration: 8.2 },
  { left: '84%', top: '70%', size: 'text-xs', delay: 1.2, duration: 7.3 },
  { left: '10%', top: '82%', size: 'text-sm', delay: 0.4, duration: 8.4 },
  { left: '54%', top: '86%', size: 'text-xs', delay: 1.8, duration: 7.8 },
  { left: '90%', top: '84%', size: 'text-sm', delay: 0.7, duration: 8.7 },
];

const SnowflakesOverlay = () => (
  <div className="pointer-events-none absolute top-0 left-0 right-0 h-[700px] overflow-hidden rounded-3xl z-0" aria-hidden="true">
    {snowflakes.map((flake, index) => (
      <motion.span
        key={index}
        className={`absolute select-none text-accent/80 ${flake.size}`}
        style={{ left: flake.left, top: flake.top }}
        animate={{
          y: [0, 6, -4, 0],
          x: [0, 2, -2, 0],
          rotate: [0, 8, -6, 0],
          opacity: [0.75, 0.95, 0.8, 0.75],
        }}
        transition={{
          duration: flake.duration,
          delay: flake.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ❄
      </motion.span>
    ))}
  </div>
);

const MesOffres = () => {
  const [openOffers, setOpenOffers] = useState<Record<string, boolean>>({
    [offers[0].title]: true,
  });

  const isOfferOpen = (title: string) => !!openOffers[title];

  const toggleOffer = (title: string) => {
    setOpenOffers((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <motion.section className="bg-secondary/40 pt-36 pb-24 px-4 md:px-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <motion.h1 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={fadeDown} className="text-4xl md:text-5xl font-serif text-foreground mb-5">
              Mes Offres & Programme Ambassadeur
            </motion.h1>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={fadeUp} className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Chaque besoin de reconnexion est unique. Mes offres sont des pages blanches que nous remplissons selon vos envies.
            </motion.p>
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }} variants={fadeUp} className="text-muted-foreground text-base md:text-lg mt-2 leading-relaxed">
              En toute indépendance, je ne perçois aucune commission sur vos réservations.
            </motion.p>
          </div>

          <div className="border border-border/70 px-4 py-8 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 items-start">
              {offers.map((offer) => (
                <motion.div key={offer.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="relative overflow-hidden text-primary bg-background border border-border/60 rounded-3xl p-6 md:p-7 shadow-sm flex flex-col self-start">
                  <SnowflakesOverlay />

                  <div className="relative z-10 flex flex-col">
                    <h3 className="text-3xl font-serif text-primary text-center mb-5">{offer.title}</h3>
                    <ul className="space-y-4 text-[1.05rem] text-primary leading-relaxed mb-6">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span><strong>Votre besoin :</strong> {offer.need}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span><strong>Ma solution :</strong> {offer.solution}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <div>
                          <p><strong>Tarif :</strong> {offer.displayPrice}</p>
                          <p className="mt-1 text-sm italic leading-relaxed text-primary/70">{offer.feeNote}</p>
                        </div>
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={() => toggleOffer(offer.title)}
                      className="w-full mb-4 inline-flex justify-center border border-accent text-accent rounded-full py-2.5 px-5 text-base font-medium hover:bg-accent/10 transition-colors"
                    >
                      {isOfferOpen(offer.title) ? 'Masquer le détail / exemple' : 'Voir le détail / exemple'}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOfferOpen(offer.title) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 300 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-border/60 pt-5 mt-1 overflow-hidden"
                        >
                          <div className="h-[300px] overflow-y-auto pr-1">
                            <p className="text-center text-primary font-semibold text-lg leading-snug">{offer.detailTitle}</p>
                            <p className="text-center text-primary/90 font-semibold text-base mt-2 mb-4">{offer.detailPrice}</p>
                            <ul className="space-y-2 text-[1.02rem] leading-relaxed mb-4">
                              {offer.items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Link
                      to="/devis"
                      className="w-full inline-flex justify-center bg-accent text-accent-foreground rounded-full py-3 px-5 text-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Débuter mon échappée
                    </Link>
                    <p className="mt-3 text-center text-[0.72rem] italic leading-relaxed text-muted-foreground">
                      Estimation globale (incluant mes honoraires de conseil)
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mt-10">
              <AmbassadorCard />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="mt-12 md:mt-14">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-primary">Parce que votre souffle peut aussi se trouver sous d’autres latitudes...</h2>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                  Si mon cœur bat pour le Nord, ma méthode de conception et mon exigence de sérénité n'ont pas de frontières. Pour ceux qui ont besoin de températures plus douces, de la caresse du soleil, ou d'un autre horizon pour marquer leur nouveau cap, j'ouvre mon carnet de route à de nouvelles destinations.
                </p>
              </div>

              <div className="mt-8 space-y-8">
                {latitudeOffers.map((offer) => (
                  <div key={offer.title} className="overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-sm">
                    <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="border-b border-border/60 p-6 md:p-8 lg:border-b-0 lg:border-r">
                        <h3 className="text-center text-2xl md:text-3xl font-serif text-primary">{offer.title}</h3>
                        <ul className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-primary">
                          <li className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Votre besoin :</strong> {offer.need}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Ma solution :</strong> {offer.solution}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span><strong>Tarif :</strong> {offer.displayPrice}</span>
                          </li>
                        </ul>

                        <Link
                          to="/devis"
                          className="mt-8 inline-flex w-full justify-center rounded-full bg-accent px-5 py-3 text-xl font-medium text-accent-foreground transition-opacity hover:opacity-90"
                        >
                          Débuter mon échappée
                        </Link>

                        {offer.explorationGroups && (
                          <details className="mt-5 rounded-2xl border border-border/70 bg-secondary/20 p-4 text-primary">
                            <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.14em] text-primary/75">
                              Mes terres d’exploration
                            </summary>
                            <div className="mt-4 space-y-3 text-sm leading-relaxed text-primary/85">
                              {offer.explorationGroups.map((group) => (
                                <p key={group.title}>
                                  <strong>{group.title} :</strong> {group.destinations}
                                </p>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="border-b border-dashed border-border/70 pb-6 text-center">
                          <h4 className="text-2xl font-serif text-primary">{offer.exampleTitle}</h4>
                          <p className="mt-2 text-lg font-semibold leading-snug text-primary">{offer.exampleSubtitle}</p>
                          <p className="mt-6 text-2xl font-semibold text-primary">{offer.examplePrice}</p>
                          <p className="mt-2 text-sm italic leading-relaxed text-primary/75">{offer.exampleFeeNote}</p>
                        </div>

                        <p className="mt-6 text-lg leading-relaxed text-primary/90">{offer.description}</p>

                        <div className="mt-8">
                          <p className="text-xl font-serif text-primary">Les faits :</p>
                          <ul className="mt-4 space-y-3 text-[1.04rem] leading-relaxed text-primary/90">
                            {offer.facts.map((fact) => (
                              <li key={fact} className="flex items-start gap-3">
                                <span className="mt-1 text-accent">✦</span>
                                <span>{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {offer.closingTitle && offer.closingCopy && (
                          <div className="mt-8 border-t border-border/60 pt-6">
                            <p className="text-xl font-serif text-primary">{offer.closingTitle}</p>
                            <p className="mt-3 text-lg leading-relaxed text-primary/90">{offer.closingCopy}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <p className="text-center text-muted-foreground text-base md:text-lg mt-10 leading-relaxed">
              Votre échappée commence ici : au point de rencontre entre votre besoin de déconnexion et mon expertise,
              <br />
              pour vous permettre de vous reconnecter à l’essentiel.
            </p>
            <p className="text-center text-muted-foreground text-base md:text-lg mt-8 leading-relaxed">
              Exemples de budgets globaux incluant mes honoraires de recherche et de conseil, sur la base des premiers tarifs constatés.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default MesOffres;
