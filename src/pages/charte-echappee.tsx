import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const rowOne = [
  {
    type: 'photo',
    title: 'Photo',
    text: 'Contemplation : Un détail apaisant. Une tasse de café fumante devant une fenêtre de rorbu (cabane de pêcheur), ou un gros plan sur de la mousse et du lichen arctique. Quelque chose de très “statique”.',
  },
  {
    type: 'value',
    title: "L'Équilibre du Souffle",
    value: 'Valeur : Émerveillement',
    text: "Parce que la vie est courte, chaque instant doit être savouré. Que vous choisissiez la contemplation ou l'énergie d'un road trip, je conçois des parcours qui privilégient l'intensité de l'émotion à la simple accumulation de kilomètres.",
  },
  {
    type: 'photo',
    title: 'Photo',
    text: 'Mouvement : Une photo de voyage “en route”. Un van sur une route côtière, ou le pont d’un ferry qui fend l’eau. Quelque chose qui évoque l’itinéraire.',
  },
];

const rowTwo = [
  {
    type: 'value',
    title: 'La Connexion Nordique',
    value: 'Valeur : Partage',
    text: 'Mon travail est au service de votre sérénité. Je mets mon énergie à dénicher pour vous des hébergements et des itinéraires en terre nordique qui favorisent une véritable parenthèse de reconnexion.',
  },
  {
    type: 'photo',
    title: 'Photo',
    text: 'L’idée : Un intérieur “Hygge” ou “Koselig”. Un feu de bois, une main qui tient un carnet de voyage, ou un éclairage doux dans une cabane en bois le soir.',
  },
  {
    type: 'value',
    title: 'Bienveillance & Respect',
    value: 'Valeur : Humanité',
    text: 'Ayant moi-même traversé des tournants de vie, je vous offre une écoute sans jugement. Cette bienveillance est le pilier de notre collaboration. Pour protéger ma sérénité et la qualité de mon travail, je privilégie des relations basées sur le respect mutuel et me réserve le droit de ne pas engager un projet si le lien ne semble pas naturel.',
  },
];

const CharteEchappee = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-serif text-foreground mb-8">
          La Charte de l’Échappée
        </h1>

        <div className="max-w-5xl mx-auto text-center text-muted-foreground text-base md:text-lg leading-relaxed mb-12 space-y-2">
          <p>Parce que je connais la valeur d’une parenthèse pour soi, je fonde notre relation sur la transparence et la bienveillance.</p>
          <p>Cette charte est le socle de notre confiance, pour que votre échappée soit sereine, du premier échange au dernier pas.</p>
        </div>

        <div className="space-y-4 md:space-y-5">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {rowOne.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className={`min-h-[320px] md:min-h-[400px] p-6 md:p-8 flex flex-col justify-start text-center ${card.type === 'value' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-6 font-serif">{card.title}</h2>
                {card.value && <p className="text-xl md:text-2xl font-semibold mb-6">{card.value}</p>}
                <p className="text-lg md:text-2xl leading-snug font-medium">{card.text}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {rowTwo.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className={`min-h-[320px] md:min-h-[400px] p-6 md:p-8 flex flex-col justify-start text-center ${card.type === 'value' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-6 font-serif">{card.title}</h2>
                {card.value && <p className="text-xl md:text-2xl font-semibold mb-6">{card.value}</p>}
                <p className="text-lg md:text-2xl leading-snug font-medium">{card.text}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            <article className="min-h-[320px] md:min-h-[400px] p-6 md:p-8 flex flex-col justify-start text-center bg-primary text-primary-foreground">
              <h2 className="text-2xl md:text-4xl font-semibold mb-6 font-serif">L'Indépendance Absolue</h2>
              <p className="text-xl md:text-2xl font-semibold mb-6">Valeur : Transparence</p>
              <p className="text-lg md:text-2xl leading-snug font-medium">
                Je travaille exclusivement pour vous. Je ne perçois aucune commission sur vos réservations.
                Cette liberté me permet de sélectionner les adresses en totale cohérence avec vos envies et votre budget, pour vous garantir le prix juste.
              </p>
            </article>

            <article className="min-h-[320px] md:min-h-[400px] p-6 md:p-8 flex flex-col justify-start text-center bg-accent text-accent-foreground">
              <h2 className="text-2xl md:text-4xl font-semibold mb-6 font-serif">Photo</h2>
              <p className="text-lg md:text-2xl leading-snug font-medium">
                Un grand paysage norvégien avec une route sinueuse mais vide, ou un fjord embrumé vu de haut.
              </p>
            </article>

            <article className="min-h-[320px] md:min-h-[400px] p-6 md:p-8 flex flex-col justify-start text-center bg-primary text-primary-foreground">
              <h2 className="text-2xl md:text-4xl font-semibold mb-6 font-serif">La Maîtrise de votre Échappée</h2>
              <p className="text-xl md:text-2xl font-semibold mb-6">Valeur : Liberté</p>
              <p className="text-lg md:text-2xl leading-snug font-medium">
                Votre carnet de route est un guide, pas une contrainte.
                Je dessine la structure logistique pour sécuriser votre voyage, mais vous validez chaque étape et restez libre d'écouter vos envies une fois sur place.
              </p>
            </article>
          </section>
        </div>

        <p className="text-center text-muted-foreground italic font-serif text-base md:text-lg mt-10">
          Une charte pensée pour protéger votre liberté, votre souffle et la qualité de votre expérience.
        </p>

      </main>

      <Footer />
    </div>
  );
};

export default CharteEchappee;
