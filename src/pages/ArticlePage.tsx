import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '@/components/Seo';
import NotFound from './NotFound';
import { findArticle } from '@/blog/articles';
import { isVisible, VISIBLE_ARTICLES } from '@/blog/visibility';
import { loadArticleContent } from '@/blog/content';
import { Markdown, extractFaq, parseMarkdown, readingMinutes } from '@/blog/Markdown';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/seo/schema';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/**
 * Modèle d'article du blog : en-tête, photo, sommaire, texte (Markdown),
 * encart auteur, appel à l'action et articles liés.
 */
const ArticlePage = () => {
  const { slug = '' } = useParams();
  const article = findArticle(slug);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setSource(null);
    loadArticleContent(slug).then((text) => {
      if (active) setSource(text ?? '');
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const blocks = useMemo(() => (source ? parseMarkdown(source) : []), [source]);
  const faq = useMemo(() => extractFaq(blocks), [blocks]);
  const toc = blocks.filter((block): block is Extract<typeof block, { type: 'h2' }> => block.type === 'h2');
  const draft = article?.status === 'brouillon';

  const related = useMemo(() => {
    if (!article) return [];
    return VISIBLE_ARTICLES.filter((other) => other.slug !== article.slug)
      .map((other) => ({ other, score: other.tags.filter((tag) => article.tags.includes(tag)).length }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.other);
  }, [article]);

  if (!article || !isVisible(article)) return <NotFound />;

  const path = `/blog/${article.slug}`;
  const jsonLd = [
    articleJsonLd(article),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: article.title, path },
    ]),
    ...(faq.length ? [faqJsonLd(faq)] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={article.title}
        description={article.description}
        path={path}
        image={article.image}
        imageAlt={article.imageAlt}
        type="article"
        noindex={draft}
        jsonLd={jsonLd}
      />
      <Navbar />

      {draft && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/40 bg-accent/95 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground backdrop-blur">
          Brouillon — visible uniquement en local · à enrichir par Emma avant publication
        </div>
      )}

      {/* En-tête */}
      <header className="bg-secondary/60 px-4 pb-14 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <nav aria-label="Fil d'Ariane" className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-accent">Accueil</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link to="/blog" className="transition-colors hover:text-accent">Blog</Link>
          </nav>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-accent/30 bg-background/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                {tag}
              </span>
            ))}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-serif text-3xl leading-tight text-primary md:text-5xl md:leading-tight"
          >
            {article.title}
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{article.description}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            Par <Link to="/emma" className="font-semibold text-primary hover:text-accent">Emma</Link>
            <span className="mx-2" aria-hidden="true">·</span>
            <time dateTime={article.updated ?? article.date}>{formatDate(article.updated ?? article.date)}</time>
            {source && (
              <>
                <span className="mx-2" aria-hidden="true">·</span>
                {readingMinutes(source)} min de lecture
              </>
            )}
          </p>
        </div>
      </header>

      {/* Photo principale */}
      <div className="mx-auto -mt-8 max-w-5xl px-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-28px_hsl(var(--navy-deep)/0.5)] md:aspect-[21/9]">
          <img src={article.image} alt={article.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>

      {/* Contenu + sommaire */}
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="mx-auto w-full max-w-[44rem] lg:mx-0" data-article-ready={source !== null ? 'true' : 'false'}>
          {source === null ? (
            <p className="mt-12 text-center text-muted-foreground">Chargement de l'article…</p>
          ) : (
            <Markdown blocks={blocks} showEmmaNotes={draft} />
          )}

          {/* Encart auteur */}
          <section className="mt-16 flex flex-col items-center gap-5 rounded-[1.75rem] border border-border bg-secondary/40 p-6 text-center sm:flex-row sm:text-left md:p-8">
            <img
              src="/images/emma-travel-planner-norvege-portrait.webp"
              alt="Portrait d'Emma, travel planner"
              width={96}
              height={96}
              className="h-24 w-24 flex-none rounded-full object-cover ring-2 ring-accent/40 ring-offset-2 ring-offset-background"
            />
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-accent">Écrit par Emma</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                Travel planner indépendante, je conçois des voyages sur mesure dans le Grand Nord et je partage ici mes conseils de terrain.
              </p>
              <Link to="/emma" className="mt-3 inline-block text-sm font-semibold text-primary underline decoration-accent/50 underline-offset-4 hover:text-accent">
                Découvrir mon histoire
              </Link>
            </div>
          </section>

          {/* Appel à l'action */}
          <section className="mt-8 rounded-[1.75rem] bg-primary p-8 text-center text-primary-foreground md:p-10">
            <p className="font-serif text-2xl md:text-3xl">Envie de vivre ce voyage, sans la charge de l'organisation ?</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              Racontez-moi vos envies : je dessine votre échappée sur mesure, et vous réservez directement, sans commission.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/devis" className="btn-primary btn-lg">Débuter mon échappée</Link>
              <Link to="/mes-offres" className="btn-light btn-lg">Voir mes offres</Link>
            </div>
          </section>
        </article>

        {/* Sommaire */}
        {toc.length > 2 && (
          <aside className="hidden lg:block">
            <nav aria-label="Sommaire" className="sticky top-28 rounded-[1.5rem] border border-border bg-background/80 p-6 backdrop-blur">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-accent">Dans cet article</p>
              <ol className="mt-4 space-y-3 text-sm">
                {toc.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="leading-snug text-muted-foreground transition-colors hover:text-primary">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>

      {/* Articles liés */}
      {related.length > 0 && (
        <section className="bg-secondary/50 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-2xl text-primary md:text-3xl">À lire aussi</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((other) => (
                <Link key={other.slug} to={`/blog/${other.slug}`} className="group overflow-hidden rounded-[1.5rem] bg-background shadow-sm transition-shadow hover:shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={other.image} alt={other.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="p-5 font-serif text-lg leading-snug text-primary">{other.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;
