/**
 * Avis Google de la fiche L'échappée d'Emma : les 5 plus récents.
 *
 * Google ne renvoie jamais plus de 5 avis par requête. Place Details est la seule API qui
 * permet de les trier par date ; si elle échoue, on se replie sur la Places API (avis
 * « pertinents »), triés à leur tour du plus récent au plus ancien.
 *
 * Utilisé par le serveur (route /api/reviews) et par le build (scripts/fetch-reviews.mjs).
 */

export const MAX_REVIEWS = 5;

/** Date ISO arrondie à la seconde (Google renvoie parfois des nanosecondes) */
const toIso = (value) => {
  const time = typeof value === "number" ? value : Date.parse(String(value ?? "").replace(/\.\d+Z$/, "Z"));
  return Number.isNaN(time) ? null : new Date(Math.floor(time / 1000) * 1000).toISOString();
};

/** Les avis les plus récents, sans doublon (même auteur, même jour) */
export const latestReviews = (...lists) => {
  const unique = new Map();
  for (const review of lists.flat()) {
    const key = `${review.author}|${String(review.id).slice(0, 10)}`;
    if (!unique.has(key)) unique.set(key, review);
  }
  return [...unique.values()].sort((a, b) => String(b.id).localeCompare(String(a.id))).slice(0, MAX_REVIEWS);
};

const fetchNewest = async ({ apiKey, placeId }) => {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.search = new URLSearchParams({
    place_id: placeId,
    fields: "name,rating,user_ratings_total,reviews",
    language: "fr",
    reviews_sort: "newest",
    reviews_no_translations: "true",
    key: apiKey,
  }).toString();
  const data = await (await fetch(url)).json();
  if (data.status !== "OK") throw new Error(data.error_message || `Place Details : ${data.status}`);

  return {
    place: {
      name: data.result?.name || "L'échappée d'Emma",
      rating: Number(data.result?.rating || 0),
      userRatingsTotal: Number(data.result?.user_ratings_total || 0),
    },
    reviews: (data.result?.reviews || []).map((review) => ({
      id: toIso(review.time * 1000),
      author: review.author_name || "Voyageur",
      rating: Number(review.rating || 0),
      text: review.text || "",
      date: review.relative_time_description || "Récemment",
    })),
  };
};

const fetchRelevant = async ({ apiKey, placeId }) => {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error?.message || `Google Places request failed (${response.status}).`);
    error.status = 502;
    throw error;
  }

  return {
    place: {
      name: data.displayName?.text || "L'échappée d'Emma",
      rating: Number(data.rating || 0),
      userRatingsTotal: Number(data.userRatingCount || 0),
    },
    reviews: (Array.isArray(data.reviews) ? data.reviews : []).map((review, index) => ({
      id: toIso(review.publishTime) || String(index),
      author: review.authorAttribution?.displayName || "Voyageur",
      rating: Number(review.rating || 0),
      text: review.text?.text || "",
      date: review.relativePublishTimeDescription || "Récemment",
    })),
  };
};

export const fetchGoogleReviews = async ({ apiKey, placeId }) => {
  let result;
  try {
    result = await fetchNewest({ apiKey, placeId });
  } catch (error) {
    console.warn("Avis les plus récents indisponibles, repli sur les avis pertinents :", error.message);
    result = await fetchRelevant({ apiKey, placeId });
  }
  return { place: result.place, reviews: latestReviews(result.reviews) };
};
