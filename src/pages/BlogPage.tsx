
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CurvedLoop from '../components/CurvedLoop';
import Marquee from '../components/Marquee';
import Seo from '@/components/Seo';
import { PAGES } from '@/seo/pages';
import { VISIBLE_ARTICLES } from '@/blog/visibility';

const articles = VISIBLE_ARTICLES;


const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = selectedTag
    ? articles.filter(a => a.tags.includes(selectedTag))
    : articles;
  const paginated = filtered.slice(0, page * 4); // 4 articles par page
  const hasMore = filtered.length > paginated.length;

  return (

    <div className="min-h-screen bg-secondary/60 relative overflow-x-hidden max-w-full">
      <Seo title={PAGES.blog.title} description={PAGES.blog.description} path={PAGES.blog.path} />
      <Navbar />


      {/* Bandeau fond coloré sous la nav */}
        {/* Marquee mobile / CurvedLoop desktop */}
        <div className="block lg:hidden w-full bg-secondary/60 py-3 mt-[104px] border-b border-border">
          <Marquee text="Le Blog du Grand Nord" />
        </div>
        <div className="hidden lg:block w-full overflow-hidden bg-secondary/60 pt-20 pb-3">
          <div className="mx-auto max-w-[1600px]">
            <CurvedLoop
              marqueeText="Le Blog du Grand Nord"
              speed={1}
              className="text-primary text-7xl font-serif"
              curveAmount={260}
              direction="left"
              interactive={true}
            />
          </div>
        </div>
      
      {/* Présentation immersive à deux colonnes */}
      <section className="w-full bg-white py-16 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Photo d'Emma sur le terrain */}
          <figure className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(var(--navy-deep)/0.45)]">
              <img
                src="/images/emma-travel-planner-grand-nord-falaise.webp"
                alt="Emma, travel planner, assise au sommet d'une falaise au-dessus d'une mer turquoise dans le Grand Nord"
                width={960}
                height={1200}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
              Emma, sur le terrain
            </figcaption>
          </figure>
          {/* Texte d'accueil à droite */}
          <div className="text-center md:text-left">
            <h1 className="mb-4">
              <span className="block uppercase text-accent font-bold text-lg mb-2 tracking-widest">Bienvenue sur</span>{' '}
              <span className="block text-4xl font-serif font-extrabold text-accent italic">le blog&nbsp;!</span>
            </h1>
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
            return (
              <Link
                key={article.slug}
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
                    alt={article.imageAlt}
                    loading="lazy"
                    className="h-80 w-full object-cover"
                  />
                  <div className="flex-1 flex flex-col p-5">
                    {article.status === 'brouillon' && (
                      <span className="mb-2 self-start rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">Brouillon</span>
                    )}
                    <span className="text-xs text-muted-foreground mb-2">{new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
              className="btn-dark"
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
