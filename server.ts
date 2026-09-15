import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing for JSON and large base64 photo uploads (up to 50MB)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');
  const photosDataFile = path.join(process.cwd(), 'public', 'site-photos-manifest.json');

  // Helper to ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Serve public static assets directly (including user uploads and images)
  app.use(express.static(publicDir));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get active site photos
  app.get('/api/photos', (req, res) => {
    try {
      if (fs.existsSync(photosDataFile)) {
        const data = fs.readFileSync(photosDataFile, 'utf-8');
        return res.json(JSON.parse(data));
      }
    } catch (err) {
      console.error('Error reading photos manifest:', err);
    }
    // Return empty object if no manifest yet
    res.json({});
  });

  const publishedPhotosFile = path.join(publicDir, 'published-photos.json');
  const reviewsFile = path.join(publicDir, 'reviews-data.json');
  const dishReviewsFile = path.join(publicDir, 'dish-reviews-data.json');
  const FOUNDER_PIN = process.env.FOUNDER_PIN || '2519';

  // ==========================================
  // PUBLIC VISITOR REVIEWS & RATINGS ENDPOINTS
  // Visitors can comment and rate with 1-5 stars freely without any PIN!
  // ==========================================

  // Get all visitor reviews
  app.get('/api/reviews', (req, res) => {
    try {
      if (fs.existsSync(reviewsFile)) {
        const data = fs.readFileSync(reviewsFile, 'utf-8');
        return res.json({ success: true, reviews: JSON.parse(data) });
      }
    } catch (err) {
      console.error('Error reading reviews:', err);
    }
    res.json({ success: true, reviews: [] });
  });

  // Post a new visitor review with 1-5 stars and comments (open to all visitors!)
  app.post('/api/reviews', (req, res) => {
    try {
      const { authorName, authorCountry, rating, tourOrExperience, comment } = req.body;

      if (!authorName || !comment) {
        return res.status(400).json({ error: 'Author name and review comments are required.' });
      }

      const numRating = Math.min(5, Math.max(1, Number(rating) || 5));
      const newReview = {
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        authorName: String(authorName).trim().slice(0, 80),
        authorCountry: (authorCountry ? String(authorCountry).trim() : 'International Explorer').slice(0, 80),
        avatar: '',
        rating: numRating,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        tourOrExperience: (tourOrExperience ? String(tourOrExperience).trim() : 'Custom Travel Experience').slice(0, 100),
        comment: String(comment).trim().slice(0, 1500),
        verifiedTrip: true,
        createdAt: new Date().toISOString()
      };

      let existingReviews: any[] = [];
      if (fs.existsSync(reviewsFile)) {
        try {
          existingReviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf-8'));
          if (!Array.isArray(existingReviews)) existingReviews = [];
        } catch {
          existingReviews = [];
        }
      }

      const updated = [newReview, ...existingReviews];
      fs.writeFileSync(reviewsFile, JSON.stringify(updated, null, 2), 'utf-8');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'reviews-data.json'), JSON.stringify(updated, null, 2), 'utf-8');
      }

      return res.json({ success: true, review: newReview, total: updated.length });
    } catch (err: any) {
      console.error('Failed to save visitor review:', err);
      return res.status(500).json({ error: 'Could not save review.' });
    }
  });

  // Get dish reviews
  app.get('/api/dish-reviews', (req, res) => {
    try {
      if (fs.existsSync(dishReviewsFile)) {
        const data = fs.readFileSync(dishReviewsFile, 'utf-8');
        return res.json({ success: true, reviews: JSON.parse(data) });
      }
    } catch (err) {
      console.error('Error reading dish reviews:', err);
    }
    res.json({ success: true, reviews: [] });
  });

  // Post dish review and rating (open to all visitors!)
  app.post('/api/dish-reviews', (req, res) => {
    try {
      const { dishId, dishName, authorName, authorLocation, rating, comment } = req.body;
      if (!authorName || !comment || !dishId) {
        return res.status(400).json({ error: 'Dish, name, and comment are required.' });
      }

      const newDishReview = {
        id: `dish-rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        dishId: String(dishId),
        dishName: String(dishName || 'Ethiopian Dish'),
        authorName: String(authorName).trim().slice(0, 80),
        authorLocation: (authorLocation ? String(authorLocation).trim() : 'Food Lover').slice(0, 80),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: String(comment).trim().slice(0, 1000),
        createdAt: new Date().toISOString().split('T')[0],
        isVerified: true
      };

      let existingDishReviews: any[] = [];
      if (fs.existsSync(dishReviewsFile)) {
        try {
          existingDishReviews = JSON.parse(fs.readFileSync(dishReviewsFile, 'utf-8'));
          if (!Array.isArray(existingDishReviews)) existingDishReviews = [];
        } catch {
          existingDishReviews = [];
        }
      }

      const updated = [newDishReview, ...existingDishReviews];
      fs.writeFileSync(dishReviewsFile, JSON.stringify(updated, null, 2), 'utf-8');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'dish-reviews-data.json'), JSON.stringify(updated, null, 2), 'utf-8');
      }

      return res.json({ success: true, review: newDishReview });
    } catch (err: any) {
      console.error('Failed to save dish review:', err);
      return res.status(500).json({ error: 'Could not save dish review.' });
    }
  });

  // Founder Auth validation helper
  const checkFounderAuth = (req: express.Request, res: express.Response): boolean => {
    const pin = (req.headers['x-founder-pin'] as string) || req.body?.founderPin || req.query?.pin;
    if (pin && String(pin).trim() === FOUNDER_PIN) {
      return true;
    }
    res.status(401).json({
      error: 'Unauthorized: Photo uploading and publishing is restricted to the founder (Hindek).',
      founderOnly: true,
    });
    return false;
  };

  // Endpoint to verify founder PIN
  app.post('/api/founder/verify-pin', (req, res) => {
    const { pin } = req.body;
    if (pin && String(pin).trim() === FOUNDER_PIN) {
      return res.json({ success: true, message: 'Founder authenticated successfully.' });
    }
    return res.status(401).json({ success: false, error: 'Incorrect PIN. Only founder Hindek can upload photos.' });
  });

  // Endpoint for published photos synced across all visitors
  app.get('/api/published-photos', (req, res) => {
    try {
      if (fs.existsSync(publishedPhotosFile)) {
        const data = fs.readFileSync(publishedPhotosFile, 'utf-8');
        return res.json({ success: true, data: JSON.parse(data) });
      }
    } catch (err) {
      console.error('Error reading published photos:', err);
    }
    res.json({ success: true, data: {} });
  });

  // Global publish endpoint - PROTECTED FOR FOUNDER ONLY
  app.post('/api/publish-photos', (req, res) => {
    if (!checkFounderAuth(req, res)) return;
    try {
      const { founderPhotos, customPhotos } = req.body;
      let currentPublished: any = {};
      if (fs.existsSync(publishedPhotosFile)) {
        try {
          currentPublished = JSON.parse(fs.readFileSync(publishedPhotosFile, 'utf-8'));
        } catch {}
      }

      const updated = {
        founderPhotos: { ...(currentPublished.founderPhotos || {}), ...(founderPhotos || {}) },
        customPhotos: { ...(currentPublished.customPhotos || {}), ...(customPhotos || {}) },
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(publishedPhotosFile, JSON.stringify(updated, null, 2), 'utf-8');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'published-photos.json'), JSON.stringify(updated, null, 2), 'utf-8');
      }

      return res.json({ success: true, lastUpdated: updated.lastUpdated });
    } catch (err: any) {
      console.error('Failed to publish photos globally:', err);
      return res.status(500).json({ error: err.message || 'Failed to publish photos' });
    }
  });

  // Upload and persist photo permanently to disk - PROTECTED FOR FOUNDER ONLY
  app.post('/api/upload-photo', (req, res) => {
    if (!checkFounderAuth(req, res)) return;
    try {
      const { slotKey, dataUrl, url } = req.body;

      if (!slotKey) {
        return res.status(400).json({ error: 'Missing slotKey' });
      }

      let targetFilename = '';
      switch (slotKey) {
        case 'founderPortrait':
          targetFilename = 'hindek-portrait.jpg';
          break;
        case 'hero':
        case 'traditionalDress':
        case 'coffeeCeremony':
          targetFilename = 'hindek-traditional.jpg';
          break;
        case 'kitchenAction':
        case 'injeraCooking':
          targetFilename = 'hindek-cooking.jpg';
          break;
        case 'familyHeritage':
          targetFilename = 'hindek-family.jpg';
          break;
        default:
          targetFilename = `custom-${slotKey}.jpg`;
          break;
      }

      let savedUrl = '';

      if (dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:image/')) {
        // Extract base64 and write image file to disk
        const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const filePathPublic = path.join(publicDir, targetFilename);
        fs.writeFileSync(filePathPublic, buffer);

        // Also update in dist if dist exists (for production)
        if (fs.existsSync(distDir)) {
          const filePathDist = path.join(distDir, targetFilename);
          fs.writeFileSync(filePathDist, buffer);
        }

        savedUrl = `/${targetFilename}?t=${Date.now()}`;
      } else if (url && typeof url === 'string') {
        savedUrl = url.trim();
      } else {
        return res.status(400).json({ error: 'Invalid image data' });
      }

      // Update persistent manifest
      let currentManifest: Record<string, string> = {};
      try {
        if (fs.existsSync(photosDataFile)) {
          currentManifest = JSON.parse(fs.readFileSync(photosDataFile, 'utf-8'));
        }
      } catch (e) {
        currentManifest = {};
      }

      currentManifest[slotKey] = savedUrl;
      // If hero or portrait uploaded, mirror appropriately
      if (slotKey === 'founderPortrait' && !currentManifest.hero) {
        currentManifest.hero = savedUrl;
      }

      fs.writeFileSync(photosDataFile, JSON.stringify(currentManifest, null, 2), 'utf-8');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'site-photos-manifest.json'), JSON.stringify(currentManifest, null, 2), 'utf-8');
      }

      console.log(`[Photo Manager] Successfully saved photo for slot '${slotKey}' -> ${savedUrl}`);
      return res.json({ success: true, slotKey, url: savedUrl, manifest: currentManifest });
    } catch (error: any) {
      console.error('Failed to upload photo:', error);
      return res.status(500).json({ error: error.message || 'Failed to save photo' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bridge Ethiopia server running on http://localhost:${PORT}`);
  });
}

startServer();
