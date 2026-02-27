
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Mock d'articles pour la démo
const articles = [
  {
    id: 1,
    title: 'Roadtrip en Laponie : conseils pour un hiver magique',
    summary: 'Préparez votre aventure dans le Grand Nord avec nos astuces pour un voyage inoubliable sous les aurores boréales.',
    image: '/gallery/finlande/paysage-hiver-lever-soleil-riviere-gelee-laponie.jpg',
    date: '2026-02-15',
    tags: ['Finlande', 'Hiver', 'Conseils'],
  },
  {
    id: 2,
    title: 'Islande : 5 randonnées à couper le souffle',
    summary: 'Découvrez les plus beaux sentiers d’Islande, entre volcans, glaciers et cascades spectaculaires.',
    image: '/gallery/islande/soleil-couchant-plage-diamant-islande.jpg',
    date: '2026-01-28',
    tags: ['Islande', 'Randonnée'],
  },
  {
    id: 3,
    title: 'Bien choisir son équipement pour le Nord',
    summary: 'Nos conseils pour s’équiper sans se ruiner et profiter pleinement de l’expérience nordique.',
    image: '/gallery/norvege/vue-panoramique-fjord-coucher-soleil-hauteur.jpg',
    date: '2025-12-10',
    tags: ['Equipement', 'Conseils'],
  },

  {
    id: 4,
    title: 'Suède secrète : immersion en forêt boréale',
    summary: 'Partez à la découverte de la Suède sauvage, entre lacs gelés et forêts silencieuses.',
    image: '/gallery/suede/coucher-soleil-rose-violet-lac-miroir.jpg',
    date: '2025-11-05',
    tags: ['Suède', 'Nature'],
  },
  // 5e card factice pour la démo
  {
    id: 5,
    title: 'Voyager en Norvège : fjords et liberté',
    summary: 'Explorez les fjords norvégiens, itinéraires en van, conseils pour un roadtrip nordique inoubliable.',
    image: '/gallery/norvege/village-maisons-rouges-fjord-norvege.jpg',
    date: '2025-10-20',
    tags: ['Norvège', 'Fjords', 'Roadtrip'],
  },
];


const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const articlesPerPage = 3;

  const filtered = selectedTag
    ? articles.filter(a => a.tags.includes(selectedTag))
    : articles;
  const paginated = filtered.slice(0, page * 4); // 4 articles par page
  const hasMore = filtered.length > paginated.length;

  return (

    <div className="min-h-screen bg-secondary/60">
      <Navbar />


      {/* Bandeau fond coloré sous la nav */}
      <section className="w-full pt-28 pb-12 px-4 bg-secondary/60 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Le Blog du Grand Nord</h1>
      </section>

      {/* Présentation immersive à deux colonnes */}
      <section className="w-full bg-white py-16 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Image immersive à gauche */}
          <div className="flex justify-center">
            <img
              src="/gallery/finlande/finlande-hiver-foret.jpg"
              alt="Voyageuse dans le Grand Nord, ambiance boréale"
              className="rounded-3xl shadow-lg object-cover w-full max-w-md h-80 md:h-96"
            />
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
            // Génère un slug SEO-friendly pour l'URL
            let slug = article.title
              .toLowerCase()
              .replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ\s-]/g, '')
              .replace(/\s+/g, '-');
            if (article.id === 1) slug = 'roadtrip-laponie-aurores-boreales';
            // Description SEO pour chaque article
            let seoDescription = '';
            if (article.id === 1) seoDescription = "Conseils pratiques pour organiser un roadtrip en Laponie, voir les aurores boréales, choisir son itinéraire et vivre une expérience nordique authentique.";
            if (article.id === 2) seoDescription = "Top randonnées en Islande : volcans, glaciers, cascades. Itinéraires, conseils et spots secrets pour randonner dans le Grand Nord islandais.";
            if (article.id === 3) seoDescription = "Guide équipement Grand Nord : vêtements, matériel, astuces pour voyager en Islande, Norvège, Finlande ou Suède sans se ruiner.";
            if (article.id === 4) seoDescription = "Voyage en Suède boréale : immersion en forêt, lacs gelés, hébergements insolites et conseils pour explorer la nature sauvage du Nord.";
            return (
              <Link
                key={article.id}
                to={`/blog/${slug}`}
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
