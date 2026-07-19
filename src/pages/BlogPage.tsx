
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CurvedLoop from '../components/CurvedLoop';
import Marquee from '../components/Marquee';

// Mock d'articles pour la démo
const articles = [
  {
    id: 1,
    slug: 'lofoten-organiser-votre-echappee-sereine-grand-nord',
    title: 'Lofoten : Organiser votre échappée sereine dans le Grand Nord',
    summary: "Besoin de reprendre votre souffle ? Je conçois des échappées sur-mesure aux Lofoten pour vous libérer de la logistique et vous reconnecter à l'essentiel.",
    image: '/gallery/norvege/vue-panoramique-fjord-coucher-soleil-hauteur.jpg',
    date: '2026-02-15',
    tags: ['Lofoten', 'Norvege', 'Conseils'],
  },
  {
    id: 2,
    slug: 'bien-choisir-son-equipement-grand-nord',
    title: 'Bien choisir son équipement pour le Grand Nord',
    summary: "Le Grand Nord ne se dompte pas, il s'apprivoise. L'équipement n'est pas qu'une question de confort ; c'est votre allié de sécurité.",
    image: '/gallery/finlande/riviere-hiver-glace-neige-foret-nordique-paysage.jpg',
    date: '2026-01-28',
    tags: ['Equipement', 'Conseils'],
  },
  {
    id: 3,
    slug: 'randonner-grand-nord-guide-insider',
    title: "Randonner dans le Grand Nord : le guide de l'insider",
    summary: 'Les plus belles vues du Grand Nord se méritent. Voici comment aborder ces randonnées avec un esprit serein.',
    image: '/gallery/norvege/route-panoramique-vallee-verte-ete.jpg',
    date: '2025-12-10',
    tags: ['Randonnee', 'Conseils'],
  },

  {
    id: 4,
    slug: 'pourquoi-choisir-la-laponie-parenthese-hivernale',
    title: 'Pourquoi choisir la Laponie pour votre prochaine parenthèse hivernale ?',
    summary: "Entre silence, immensités blanches et aurores boréales, la Laponie est une invitation à ralentir.",
    image: '/gallery/finlande/aurore-boreale-verte-montagnes-enneigees-nuit.jpg',
    date: '2025-11-05',
    tags: ['Laponie', 'Hiver'],
  },
  {
    id: 5,
    slug: 'suede-secrete-immersion-foret-boreale',
    title: 'Suède secrète : immersion en forêt boréale',
    summary: "Il existe des voyages qui ne se racontent pas, ils se ressentent. Cette échappée en canoë en fait partie.",
    image: '/gallery/suede/cabane-rouge-bord-lac-canoe.jpg',
    date: '2025-10-20',
    tags: ['Suede', 'Nature'],
  },
];


const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

export default function BlogPage() {
  /* H1 SEO pour la page blog */
  /* eslint-disable-next-line jsx-a11y/heading-has-content */
  const h1 = <h1 className="sr-only">L'échappée d'Emma - Blog voyage Grand Nord, conseils, itinéraires et inspirations de L'Échappée d'Emma</h1>;
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const articlesPerPage = 3;

  const filtered = selectedTag
    ? articles.filter(a => a.tags.includes(selectedTag))
    : articles;
  const paginated = filtered.slice(0, page * 4); // 4 articles par page
  const hasMore = filtered.length > paginated.length;

  return (

    <div className="min-h-screen bg-secondary/60 relative overflow-x-hidden max-w-full">
      <Navbar />


      {/* Bandeau fond coloré sous la nav */}
        {/* Marquee mobile / CurvedLoop desktop */}
        <div className="block lg:hidden w-full bg-secondary/60 py-3 mt-[104px] border-b border-border">
          <Marquee text="Le Blog du Grand Nord" />
        </div>
        <div className="hidden lg:block w-full mt-[-300px] mb-0 h-[550px] overflow-hidden bg-secondary/60">
          <div className="max-w-7xl mx-auto px-4">
            <CurvedLoop
              marqueeText="Le Blog du Grand Nord"
              speed={1}
              className="text-primary text-7xl font-serif"
              curveAmount={400}
              direction="left"
              interactive={true}
            />
          </div>
        </div>
      
      {/* Présentation immersive à deux colonnes */}
      <section className="w-full bg-white py-16 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Image immersive à gauche */}
          <div className="flex justify-center items-center min-h-[120px] text-muted-foreground text-lg font-medium">
            pas de photo pour le moment
          </div>
          {/* Texte d'accueil à droite */}
          <div className="text-center md:text-left">
            <h2 className="uppercase text-accent font-bold text-lg mb-2 tracking-widest">Bienvenue sur</h2>
            <span className="block text-4xl font-serif font-extrabold text-accent mb-4 italic">le blog&nbsp;!</span>
            <p className="text-lg text-foreground mb-4 leading-relaxed">
              Retrouvez ici des conseils et inspirations pour préparer votre aventure dans le Grand Nord&nbsp;: Islande, Norvège, Suède, Finlande…
              <br />
              Passionnée par ces terres sauvages, je partage avec vous mes expériences, mes coups de cœur, des itinéraires testés, des hébergements authentiques et des activités hors du commun.
            </p>
            <p className="text-base text-muted-foreground mb-4 leading-relaxed">
              Chaque article, chaque conseil est le fruit d’une expérience vécue, d’une rencontre ou d’un émerveillement. Mon objectif&nbsp;: vous aider à vivre un voyage qui a du sens, loin des sentiers battus, en toute confiance.
            </p>
            <p className="text-xl font-bold text-accent mt-6">Prêt·e à partir à l’aventure&nbsp;?</p>
          </div>
        </div>
      </section>

      {/* Hero visuel supprimé */}

      {/* Filtres tags */}
      <div className="max-w-5xl mx-auto px-4 mt-12 mb-6 flex flex-wrap gap-3 justify-center">
        <button
          className={`px-5 py-2 rounded-full font-semibold border transition-colors text-sm ${selectedTag === null ? 'bg-accent text-accent-foreground border-accent' : 'bg-white text-foreground border-border hover:bg-accent/10'}`}
          onClick={() => setSelectedTag(null)}
        >
          Tous
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`px-5 py-2 rounded-full font-semibold border transition-colors text-sm ${selectedTag === tag ? 'bg-accent text-accent-foreground border-accent' : 'bg-white text-foreground border-border hover:bg-accent/10'}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grille d'articles */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginated.map(article => {
            // Description SEO pour chaque article
            let seoDescription = '';
            if (article.id === 1) seoDescription = "Conseils pratiques pour organiser un roadtrip en Laponie, voir les aurores boréales, choisir son itinéraire et vivre une expérience nordique authentique.";
            if (article.id === 2) seoDescription = "Top randonnées en Islande : volcans, glaciers, cascades. Itinéraires, conseils et spots secrets pour randonner dans le Grand Nord islandais.";
            if (article.id === 3) seoDescription = "Guide équipement Grand Nord : vêtements, matériel, astuces pour voyager en Islande, Norvège, Finlande ou Suède sans se ruiner.";
            if (article.id === 4) seoDescription = "Voyage en Suède boréale : immersion en forêt, lacs gelés, hébergements insolites et conseils pour explorer la nature sauvage du Nord.";
            return (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group"
                aria-label={article.title}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-secondary/60 rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-80 w-full object-cover"
                  />
                  <div className="flex-1 flex flex-col p-5">
                    <span className="text-xs text-muted-foreground mb-2">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <h2 className="text-lg font-bold text-foreground mb-2 leading-snug">{article.title}</h2>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Pagination / Charger plus */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setPage(p => p + 1)}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-lg shadow hover:opacity-90 transition-opacity"
            >
              Charger plus d’articles
            </button>
          </div>
        )}

        {/* Message si aucun article */}
        {paginated.length === 0 && (
          <div className="text-center text-muted-foreground py-24 text-lg">
            Aucun article trouvé pour ce filtre.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
