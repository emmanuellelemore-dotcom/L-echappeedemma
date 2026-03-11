'use client';

import { useState, useEffect } from 'react';
import { Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GOOGLE_BUSINESS_URL = 'https://www.google.com/maps/place/ChIJm2NF0mML5kcRXlMfFIy36ew';
const PLACE_ID = 'ChIJm2NF0mML5kcRXlMfFIy36ew';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  id?: string;
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

const REVIEWS_PER_VIEW = 4;

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    key={review.id || index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    className="bg-background p-6 rounded-2xl shadow-sm border-l-4 border-accent flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-12px)]"
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
    <div className="flex justify-between items-center text-sm">
      <span className="font-bold text-foreground">{review.author}</span>
      <span className="text-muted-foreground text-xs">{review.date}</span>
    </div>
  </motion.div>
);

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(placeholderReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Google reviews when API key is available (to be added later)
  useEffect(() => {
    // TODO: Fetch from your backend API once Google Places API is configured
    // const fetchGoogleReviews = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch('/api/reviews');
    //     const data = await response.json();
    //     if (data.reviews && data.reviews.length > 0) {
    //       setReviews(data.reviews);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching reviews:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchGoogleReviews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, reviews.length - REVIEWS_PER_VIEW) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + REVIEWS_PER_VIEW >= reviews.length ? 0 : prev + 1
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + REVIEWS_PER_VIEW
  );

  const totalGroups = Math.ceil(reviews.length / REVIEWS_PER_VIEW);
  const currentGroup = Math.floor(currentIndex / REVIEWS_PER_VIEW) + 1;

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
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Reviews Carousel */}
        <div className="overflow-hidden px-4">
          <div className="flex gap-6">
            <AnimatePresence mode="wait">
              {visibleReviews.map((review, idx) => (
                <ReviewCard
                  key={`${currentIndex}-${idx}`}
                  review={review}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        {reviews.length > REVIEWS_PER_VIEW && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-primary text-primary-foreground p-2 rounded-full hover:opacity-80 transition-opacity shadow-lg disabled:opacity-50"
              aria-label="Avis précédents"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 bg-primary text-primary-foreground p-2 rounded-full hover:opacity-80 transition-opacity shadow-lg disabled:opacity-50"
              aria-label="Avis suivants"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {reviews.length > REVIEWS_PER_VIEW && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalGroups }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * REVIEWS_PER_VIEW)}
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
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Laisser un avis Google
          <ExternalLink size={18} />
        </a>
      </div>

      {/* Google Places Badge */}
      <div className="text-center text-xs text-muted-foreground pt-6">
        <a
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          Voir tous les avis sur Google Maps →
        </a>
      </div>
    </div>
  );
};

export default GoogleReviews;
