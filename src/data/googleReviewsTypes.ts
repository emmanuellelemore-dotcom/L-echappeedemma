export interface GoogleReview {
  /** Date de publication Google (ISO) quand elle est connue */
  id?: string;
  author: string;
  rating: number;
  text: string;
  /** Date relative fournie par Google (« il y a 2 mois ») */
  date: string;
}

export interface GooglePlaceSummary {
  name: string;
  rating: number;
  userRatingsTotal: number;
}

export interface GoogleReviewsSnapshot {
  fetchedAt: string | null;
  place: GooglePlaceSummary | null;
  reviews: GoogleReview[];
}
