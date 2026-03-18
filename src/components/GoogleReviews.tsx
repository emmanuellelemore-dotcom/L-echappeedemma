'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLACE_ID = 'ChIJm2NF0mML5kcRXlMfFIy36ew';
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
const USE_LIVE_GOOGLE_REVIEWS = true;

const getReviewsApiBase = () => {
  const configuredBase = import.meta.env.VITE_CONTACT_API_URL?.trim();

  if (configuredBase) {
    try {
      const apiUrl = new URL(configuredBase);
      const isLocalApi = ['localhost', '127.0.0.1'].includes(apiUrl.hostname);
      const isLocalSite = ['localhost', '127.0.0.1'].includes(window.location.hostname);

      if (isLocalApi && !isLocalSite) {
        return '';
      }
    } catch {
      return configuredBase.replace(/\/$/, '');
    }

    return configuredBase.replace(/\/$/, '');
  }

  return '';
};

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  id?: string;
}

interface PlaceSummary {
  name: string;
  rating: number;
  userRatingsTotal: number;
}

interface ReviewsApiResponse {
  ok: boolean;
  reviews?: Review[];
  place?: PlaceSummary;
}

// Placeholder reviews - will be replaced with dynamic Google API data
const placeholderReviews: Review[] = [
  {
    author: 'Sarah M.',
    rating: 5,
    text: 'Emma a créé un itinéraire parfait pour ma première visite en Islande. Tout était préparé, logistique au top, et j\'ai vraiment pu déconnecter.',
    date: 'Il y a 2 mois',
  },
  {
    author: 'Thomas D.',
    rating: 5,
    text: 'C\'était exactement ce dont j\'avais besoin après un changement professionnel. Un vrai tournant !',
    date: 'Il y a 1 mois',
  },
  {
    author: 'Marine L.',
    rating: 5,
    text: 'Service impeccable, écoute incroyable, et un voyage en Norvège qui m\'a transformée.',
    date: 'Il y a 3 semaines',
  },
  {
    author: 'Alex P.',
    rating: 5,
    text: 'La meilleure décision pour mon voyage en Finlande. Détails absolument parfaits !',
    date: 'Il y a 2 semaines',
  },
];

const getReviewsPerView = () => {
  if (typeof window === 'undefined') {
    return 4;
  }

  if (window.innerWidth < 640) {
    return 1;
  }

  if (window.innerWidth < 1024) {
    return 2;
  }

  return 4;
};

const formatAuthorName = (author: string) => {
  const nameParts = author.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length <= 1) {
    return author;
  }

  const firstName = nameParts[0];
  const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  return `${firstName} ${lastNameInitial}.`;
};

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    key={review.id || index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    className="min-w-0 bg-background p-6 rounded-2xl shadow-sm border-l-4 border-accent"
  >
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(review.rating)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill="hsl(var(--accent))"
          color="hsl(var(--accent))"
        />
      ))}
    </div>

    {/* Review Text */}
    <p className="italic text-muted-foreground mb-4 leading-relaxed line-clamp-3">
      "{review.text}"
    </p>

    {/* Author & Date */}
    <div className="grid min-h-[3.5rem] grid-cols-[minmax(0,1fr)_7.5rem] items-start gap-x-4 text-sm">
      <span className="min-w-0 pr-2 font-bold leading-snug text-foreground">{formatAuthorName(review.author)}</span>
      <span className="w-[7.5rem] text-right text-xs leading-snug text-muted-foreground">{review.date}</span>
    </div>
  </motion.div>
);

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(USE_LIVE_GOOGLE_REVIEWS ? [] : placeholderReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [placeSummary, setPlaceSummary] = useState<PlaceSummary | null>(null);
  const [reviewsPerView, setReviewsPerView] = useState(getReviewsPerView);

  useEffect(() => {
    const updateReviewsPerView = () => {
      setReviewsPerView(getReviewsPerView());
    };

    updateReviewsPerView();
    window.addEventListener('resize', updateReviewsPerView);

    return () => window.removeEventListener('resize', updateReviewsPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => {
      if (prev >= reviews.length) {
        return 0;
      }

      return Math.floor(prev / reviewsPerView) * reviewsPerView;
    });
  }, [reviews.length, reviewsPerView]);

  useEffect(() => {
    if (!USE_LIVE_GOOGLE_REVIEWS) {
      setReviews(placeholderReviews);
      setIsLoading(false);
      setLoadFailed(false);
      return;
    }

    const controller = new AbortController();

    const fetchGoogleReviews = async () => {
      try {
        setIsLoading(true);
        setLoadFailed(false);
        const endpoint = `${getReviewsApiBase()}/api/reviews`;
        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Reviews request failed with status ${response.status}`);
        }

        const data: ReviewsApiResponse = await response.json();

        if (data.place) {
          setPlaceSummary(data.place);
        }

        if (data.ok && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
          setCurrentIndex(0);
          return;
        }

        setLoadFailed(true);
        setReviews(placeholderReviews);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error fetching reviews:', error);
          setLoadFailed(true);
          setReviews(placeholderReviews);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoogleReviews();

    return () => controller.abort();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, Math.floor((reviews.length - 1) / reviewsPerView) * reviewsPerView)
        : Math.max(0, prev - reviewsPerView)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + reviewsPerView >= reviews.length ? 0 : prev + reviewsPerView
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + reviewsPerView
  );

  const totalGroups = Math.ceil(reviews.length / reviewsPerView);
  const currentGroup = Math.floor(currentIndex / reviewsPerView) + 1;
  const showLoadingState = USE_LIVE_GOOGLE_REVIEWS && isLoading && reviews.length === 0;
  const gridClassName =
    reviewsPerView === 1
      ? 'grid-cols-1'
      : reviewsPerView === 2
        ? 'grid-cols-2'
        : 'grid-cols-4';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-foreground mb-6 leading-tight">
          Vos avis, vos témoignages
        </h2>
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
          Découvrez ce que les voyageurs pensent de L'Échappée d'Emma.
        </p>
        {placeSummary && (
          <p className="text-sm text-muted-foreground">
            Note Google {placeSummary.rating.toFixed(1).replace('.', ',')}/5 sur {placeSummary.userRatingsTotal} note{placeSummary.userRatingsTotal > 1 ? 's' : ''}
            {placeSummary.userRatingsTotal > reviews.length
              ? `, dont ${reviews.length} avis textuels visibles via l'API Google.`
              : '.'}
          </p>
        )}
        {USE_LIVE_GOOGLE_REVIEWS && isLoading && (
          <p className="text-sm text-muted-foreground">Chargement des avis Google...</p>
        )}
        {loadFailed && (
          <p className="text-sm text-muted-foreground">Les avis Google mettent plus de temps que prévu à se charger. Affichage temporaire des témoignages de secours.</p>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {showLoadingState ? (
          <div className="px-4">
            <div className="mx-auto flex max-w-md flex-col items-center rounded-[2rem] border border-accent/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] px-8 py-10 text-center shadow-sm">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex h-32 w-32 items-center justify-center md:h-36 md:w-36"
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.92, 1.05, 0.92] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-white/90 blur-2xl"
                />

                <video
                  className="relative h-28 w-28 rounded-full object-cover shadow-[0_18px_35px_rgba(120,84,102,0.14)] md:h-32 md:w-32"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src="/chouette_neige.webm" type="video/webm" />
                </video>
              </motion.div>

              <p className="mt-5 text-lg font-serif text-primary">La chouette récupère vos avis...</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Les témoignages Google arrivent doucement depuis le Grand Nord.
              </p>

              <div className="mt-5 flex items-center gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.span
                    key={index}
                    animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                    transition={{ duration: 1.4, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-2.5 w-2.5 rounded-full bg-accent/70"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden px-8 lg:px-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`grid gap-6 ${gridClassName}`}
              >
                {visibleReviews.map((review, idx) => (
                  <ReviewCard
                    key={review.id || `${currentIndex}-${idx}`}
                    review={review}
                    index={idx}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Navigation Arrows */}
        {!showLoadingState && reviews.length > reviewsPerView && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary p-2 text-primary-foreground rounded-full shadow-lg transition-opacity hover:opacity-80 disabled:opacity-50 lg:-translate-x-3/4"
              aria-label="Avis précédents"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 bg-primary p-2 text-primary-foreground rounded-full shadow-lg transition-opacity hover:opacity-80 disabled:opacity-50 lg:translate-x-3/4"
              aria-label="Avis suivants"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {!showLoadingState && reviews.length > reviewsPerView && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalGroups }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * reviewsPerView)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentGroup - 1
                    ? 'bg-accent w-8'
                    : 'bg-accent/30 w-2 hover:bg-accent/60'
                }`}
                aria-label={`Aller au groupe ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 mt-12">
        <p className="text-muted-foreground text-base">
          Vous avez vécu une échappée mémorable ? Partagez votre avis !
        </p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Laisser un avis Google
        </a>
      </div>
    </div>
  );
};

export default GoogleReviews;
