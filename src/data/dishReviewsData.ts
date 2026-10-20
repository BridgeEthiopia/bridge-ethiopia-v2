import { DishReview } from '../types';

export const INITIAL_DISH_REVIEWS: DishReview[] = [
  {
    id: 'rev-doro-1',
    dishId: 'doro-wat',
    dishName: 'Authentic Doro Wat',
    authorName: 'Elena Rostova',
    authorLocation: 'Vienna, Austria',
    rating: 5,
    comment: 'Learning the slow 4-hour onion caramelization with Hindek in Addis was the single best culinary experience of my travels! The berbere aroma was heavenly.',
    createdAt: '2026-08-14',
    isVerified: true,
  },
  {
    id: 'rev-doro-2',
    dishId: 'doro-wat',
    dishName: 'Authentic Doro Wat',
    authorName: 'Marcus Bennett',
    authorLocation: 'Toronto, Canada',
    rating: 5,
    comment: 'The depth of flavor in this Doro Wat is unmatched. Hindek guided us through every step with so much patience and joy.',
    createdAt: '2026-08-02',
    isVerified: true,
  },
  {
    id: 'rev-shiro-1',
    dishId: 'shiro-tegamino',
    dishName: 'Clay Pot Shiro Tegamino',
    authorName: 'Sofia Lindqvist',
    authorLocation: 'Stockholm, Sweden',
    rating: 5,
    comment: 'Bubbling hot in the traditional clay pot! As a vegan, this was absolute perfection. Savoring it with fresh warm Injera was pure bliss.',
    createdAt: '2026-08-19',
    isVerified: true,
  },
  {
    id: 'rev-shiro-2',
    dishId: 'shiro-tegamino',
    dishName: 'Clay Pot Shiro Tegamino',
    authorName: 'David & Karen',
    authorLocation: 'Melbourne, Australia',
    rating: 5,
    comment: 'Silky, rich, and comforting. The Hindek blend of garlic and niter kibbeh seasoning is phenomenal.',
    createdAt: '2026-07-28',
    isVerified: true,
  },
  {
    id: 'rev-injera-1',
    dishId: 'teff-injera',
    dishName: '100% Pure Teff Injera',
    authorName: 'Jean-Luc Moreau',
    authorLocation: 'Lyon, France',
    rating: 5,
    comment: 'Baking Injera on the clay mitad griddle and seeing the Ayn eyes form in seconds was magical! 100% gluten-free and so airy.',
    createdAt: '2026-08-10',
    isVerified: true,
  },
  {
    id: 'rev-coffee-1',
    dishId: 'coffee-ceremony',
    dishName: 'Grandpa Coffee Ceremony',
    authorName: 'Amina Al-Mansoor',
    authorLocation: 'Dubai, UAE',
    rating: 5,
    comment: 'The frankincense, freshly roasted green beans over the charcoal brazier, and 3 rounds of coffee (Abol, Tona, Baraka) was an unforgettable ritual.',
    createdAt: '2026-08-18',
    isVerified: true,
  },
  {
    id: 'rev-tibs-1',
    dishId: 'shekla-tibs',
    dishName: 'Sizzling Shekla Tibs',
    authorName: 'Carlos Rivera',
    authorLocation: 'Madrid, Spain',
    rating: 5,
    comment: 'The fire brazier kept it sizzling until the last bite. Rosemary and green pepper aromas were mouth-watering!',
    createdAt: '2026-07-15',
    isVerified: true,
  },
  {
    id: 'rev-marqaa-1',
    dishId: 'marqaa',
    dishName: 'Marqaa (Oromo Genfo)',
    authorName: 'Hannah Meyer',
    authorLocation: 'Munich, Germany',
    rating: 5,
    comment: 'The traditional Marqaa was incredible! The warm well of spiced butter with honey and fresh yogurt was so rich and comforting.',
    createdAt: '2026-08-05',
    isVerified: true,
  },
];

const STORAGE_KEY = 'bridge_ethiopia_dish_reviews_v2';

export const getSavedDishReviews = (): DishReview[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load dish reviews from localStorage', err);
  }
  return INITIAL_DISH_REVIEWS;
};

export const saveDishReview = (newReview: Omit<DishReview, 'id' | 'createdAt'>): DishReview => {
  const allReviews = getSavedDishReviews();
  const created: DishReview = {
    ...newReview,
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString().split('T')[0],
    isVerified: true,
  };
  const updated = [created, ...allReviews];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save review to localStorage', err);
  }

  // Send to server in background so other visitors can see it too!
  try {
    fetch('/api/dish-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(created)
    }).catch(() => {});
  } catch {}

  return created;
};
