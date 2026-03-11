import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const offers = [
  {
    title: "Offre L'Étincelle",
    need: 'Vous ressentez la nécessité de clarifier vos choix et de lever vos doutes.',
    solution: '1h de visio-conseil pour valider vos choix techniques.',
    price: '70 €',
    detailTitle: 'Format expertise express',
    detailPrice: '70€',
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
    price: 'À partir de 300 €',
    detailTitle: 'Premières Lueurs d’Islande',
    detailPrice: 'À partir de 2000€ pour 2*',
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
    price: 'À partir de 460 €',
    detailTitle: 'Douceur de vivre en Suède',
    detailPrice: 'À partir de 2500€ pour 2*',
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
    price: 'À partir de 480 €',
    detailTitle: 'La Magie d’Inari',
    detailPrice: 'À partir de 4300€ pour 2*',
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
    price: 'À partir de 500 €',
    detailTitle: 'La Liberté Nomade',
    detailPrice: 'À partir de 7000€ pour 4*',
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
    price: 'À partir de 880 €',
    detailTitle: 'L’Odyssée des Lofoten',
    detailPrice: 'À partir de 5000€ pour 2*',
    items: [
      '11 nuits en mai, entre sommets enneigés et mer turquoise.',
      'Vol avec escale',
      'Voiture de location',
      'Escales variées',
      'Kayak de mer, randonnées & culture locale',
    ],
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
              Mes Offres
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
                <motion.div key={offer.title} variants={fadeUp} className="relative overflow-hidden text-primary bg-background border border-border/60 rounded-3xl p-6 md:p-7 shadow-sm flex flex-col self-start">
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
                        <span><strong>Tarif :</strong> {offer.price}</span>
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
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-base md:text-lg mt-10 leading-relaxed">
              Votre échappée commence ici : au point de rencontre entre votre besoin de déconnexion et mon expertise,
              <br />
              pour vous permettre de vous reconnecter à l’essentiel.
            </p>
            <p className="text-center text-muted-foreground text-base md:text-lg mt-8 leading-relaxed">
              * Exemples de budgets incluant mes honoraires de recherche et de conseil, sur la base des premiers tarifs constatés...
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default MesOffres;
