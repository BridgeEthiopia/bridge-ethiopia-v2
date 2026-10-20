import { Review } from '../types';
import { REVIEWS_DATA } from './ethiopiaData';

const REVIEWS_STORAGE_KEY = 'bridge_ethiopia_traveler_reviews_v3';

export const getSavedTravelerReviews = (): Review[] => {
  try {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading traveler reviews from local storage:', e);
  }
  return REVIEWS_DATA;
};

export const saveTravelerReview = async (input: {
  authorName: string;
  authorCountry: string;
  rating: number;
  tourOrExperience: string;
  comment: string;
}): Promise<Review> => {
  const allCurrent = getSavedTravelerReviews();

  const newReview: Review = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    authorName: input.authorName.trim(),
    authorCountry: input.authorCountry.trim() || 'Global Traveler',
    avatar: '',
    rating: Math.min(5, Math.max(1, input.rating)),
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    tourOrExperience: input.tourOrExperience.trim() || 'Bridge Ethiopia Experience',
    comment: input.comment.trim(),
    verifiedTrip: true
  };

  const updated = [newReview, ...allCurrent];

  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving review to localStorage:', err);
  }

  // Dispatch custom event so any open reviews widget updates immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('traveler-reviews-updated', { detail: newReview }));
  }

  // Also sync to server in background so all visitors see it
  try {
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    }).catch(() => {});
  } catch {}

  return newReview;
};

// Asynchronously load server-persisted reviews and merge
export const syncServerReviews = async (): Promise<Review[]> => {
  try {
    const res = await fetch('/api/reviews');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.reviews) && json.reviews.length > 0) {
        const local = getSavedTravelerReviews();
        // Merge by id
        const map = new Map<string, Review>();
        // Add initial and local first
        local.forEach(r => map.set(r.id, r));
        // Add server reviews (server reviews take priority if matching, or append)
        json.reviews.forEach((r: Review) => map.set(r.id, r));
        
        const merged = Array.from(map.values()).sort((a, b) => {
          // Keep newest first
          return (b.id || '').localeCompare(a.id || '');
        });

        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch (err) {
    // Network errors or offline fallback
  }
  return getSavedTravelerReviews();
};
