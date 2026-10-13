import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing for JSON and large base64 photo uploads (up to 50MB)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const publicDir = path.join(process.cwd(), 'public');
  const uploadsDir = path.join(publicDir, 'uploads', 'videos');
  const distDir = path.join(process.cwd(), 'dist');
  const reviewsFile = path.join(publicDir, 'reviews-data.json');
  const inquiriesFile = path.join(publicDir, 'inquiries-data.json');
  const volunteerFile = path.join(publicDir, 'volunteer-applications.json');
  const videoManifestFile = path.join(publicDir, 'video-manifest.json');
  const featuredVideoFile = path.join(publicDir, 'featured-video.json');
  const FOUNDER_PIN = process.env.FOUNDER_PIN || '2519';

  // Ensure public & video upload directories exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Multer storage for direct video file uploads from phone or computer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.mp4';
      const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      cb(null, `${Date.now()}-${cleanName}${ext}`);
    }
  });

  const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 } // Up to 500MB video uploads
  });

  // Static assets
  if (fs.existsSync(path.join(process.cwd(), 'assets'))) {
    app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  }
  app.use('/uploads', express.static(path.join(publicDir, 'uploads')));
  app.use(express.static(publicDir));

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Founder Login Authentication Endpoint
  app.post('/api/founder/login', (req, res) => {
    try {
      const { pin } = req.body;
      if (!pin || String(pin).trim() !== FOUNDER_PIN) {
        return res.status(401).json({ success: false, error: 'Incorrect PIN. Please try again.' });
      }
      return res.json({ 
        success: true, 
        message: 'Welcome back, Hindek!', 
        founder: { name: 'Hindek', role: 'Founder & Certified Guide' } 
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || 'Server error' });
    }
  });

  // Admin Notification
  app.post('/api/notify-admin', (req, res) => {
    try {
      const { title, senderName, senderEmail, senderPhone } = req.body;
      const targetEmail = 'hindek.ethiopia@gmail.com';
      console.log(`[Admin Dispatch] Notification to ${targetEmail}: "${title}" from ${senderName} (${senderEmail}, ${senderPhone || 'no phone'})`);
      return res.json({ success: true, deliveredTo: targetEmail, timestamp: new Date().toISOString() });
    } catch (err) {
      console.error('Failed to dispatch admin notification:', err);
      return res.status(500).json({ error: 'Failed to dispatch notification.' });
    }
  });

  // ==========================================
  // TRIP INQUIRIES ENDPOINTS
  // ==========================================
  app.get('/api/inquiries', (req, res) => {
    try {
      if (fs.existsSync(inquiriesFile)) {
        return res.json({ success: true, inquiries: JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8')) });
      }
    } catch (e) {
      console.error('Error reading inquiries:', e);
    }
    res.json({ success: true, inquiries: [] });
  });

  app.post('/api/inquiries', (req, res) => {
    try {
      const { travelerName, email, phoneOrWhatsapp, experience, arrivalTime, groupSize, notes } = req.body;
      if (!travelerName || (!email && !phoneOrWhatsapp)) {
        return res.status(400).json({ error: 'Name and at least one contact method (email or phone) are required.' });
      }
      const newInquiry = {
        id: 'inq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        travelerName: String(travelerName).trim().slice(0, 100),
        email: email ? String(email).trim().slice(0, 120) : '',
        phoneOrWhatsapp: phoneOrWhatsapp ? String(phoneOrWhatsapp).trim().slice(0, 50) : '',
        experience: experience || 'Custom Private Expedition',
        arrivalTime: arrivalTime || 'Upcoming Months',
        groupSize: groupSize || '2 Travelers',
        notes: notes ? String(notes).trim().slice(0, 1500) : '',
        createdAt: new Date().toISOString()
      };

      let inquiries = [];
      if (fs.existsSync(inquiriesFile)) {
        try {
          inquiries = JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8'));
          if (!Array.isArray(inquiries)) inquiries = [];
        } catch {
          inquiries = [];
        }
      }
      const updated = [newInquiry, ...inquiries];
      fs.writeFileSync(inquiriesFile, JSON.stringify(updated, null, 2), 'utf-8');
      return res.json({ success: true, inquiry: newInquiry });
    } catch (err) {
      console.error('Failed to save inquiry:', err);
      return res.status(500).json({ error: 'Could not record inquiry.' });
    }
  });

  app.delete('/api/inquiries/:id', (req, res) => {
    try {
      const pin = req.headers['x-founder-pin'] || req.query.pin || (req.body && req.body.pin);
      if (pin && String(pin).trim() !== FOUNDER_PIN) {
        return res.status(401).json({ error: 'Unauthorized. Incorrect PIN.' });
      }
      const { id } = req.params;
      if (fs.existsSync(inquiriesFile)) {
        let inquiries = JSON.parse(fs.readFileSync(inquiriesFile, 'utf-8'));
        if (Array.isArray(inquiries)) {
          inquiries = inquiries.filter((inq: any) => inq.id !== id);
          fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2), 'utf-8');
        }
      }
      return res.json({ success: true, message: 'Inquiry deleted.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to delete inquiry.' });
    }
  });

  // ==========================================
  // VOLUNTEER CULTURAL & LANGUAGE PREPARATION ENDPOINTS
  // (Afaan Oromoo & Amharic Only)
  // ==========================================
  app.get('/api/volunteers', (req, res) => {
    try {
      if (fs.existsSync(volunteerFile)) {
        return res.json({ success: true, applications: JSON.parse(fs.readFileSync(volunteerFile, 'utf-8')) });
      }
    } catch (e) {
      console.error('Error reading volunteer applications:', e);
    }
    res.json({ success: true, applications: [] });
  });

  app.post('/api/volunteers', (req, res) => {
    try {
      const { volunteerName, email, phoneOrWhatsapp, countryOfOrigin, programInterest, duration, background } = req.body;
      if (!volunteerName || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
      }
      const newApp = {
        id: 'vol-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        volunteerName: String(volunteerName).trim().slice(0, 100),
        email: String(email).trim().slice(0, 120),
        phoneOrWhatsapp: phoneOrWhatsapp ? String(phoneOrWhatsapp).trim().slice(0, 50) : '',
        countryOfOrigin: countryOfOrigin ? String(countryOfOrigin).trim().slice(0, 80) : 'International',
        programInterest: programInterest || 'Amharic & Afaan Oromoo Cultural Preparation',
        duration: duration || '1-Week Language & Cultural Bootcamp',
        background: background ? String(background).trim().slice(0, 1000) : '',
        createdAt: new Date().toISOString()
      };

      let list = [];
      if (fs.existsSync(volunteerFile)) {
        try {
          list = JSON.parse(fs.readFileSync(volunteerFile, 'utf-8'));
          if (!Array.isArray(list)) list = [];
        } catch {
          list = [];
        }
      }
      const updated = [newApp, ...list];
      fs.writeFileSync(volunteerFile, JSON.stringify(updated, null, 2), 'utf-8');
      return res.json({ success: true, application: newApp });
    } catch (err) {
      console.error('Failed to save volunteer application:', err);
      return res.status(500).json({ error: 'Could not submit application.' });
    }
  });

  app.delete('/api/volunteers/:id', (req, res) => {
    try {
      const pin = req.headers['x-founder-pin'] || req.query.pin || (req.body && req.body.pin);
      if (pin && String(pin).trim() !== FOUNDER_PIN) {
        return res.status(401).json({ error: 'Unauthorized. Incorrect PIN.' });
      }
      const { id } = req.params;
      if (fs.existsSync(volunteerFile)) {
        let list = JSON.parse(fs.readFileSync(volunteerFile, 'utf-8'));
        if (Array.isArray(list)) {
          list = list.filter((app: any) => app.id !== id);
          fs.writeFileSync(volunteerFile, JSON.stringify(list, null, 2), 'utf-8');
        }
      }
      return res.json({ success: true, message: 'Volunteer application deleted.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to delete application.' });
    }
  });

  // ==========================================
  // PUBLIC VISITOR REVIEWS & RATINGS ENDPOINTS
  // ==========================================
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

      let existingReviews = [];
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

      return res.json({ success: true, review: newReview, total: updated.length });
    } catch (err: any) {
      console.error('Failed to save visitor review:', err);
      return res.status(500).json({ error: 'Could not save review.' });
    }
  });

  app.delete('/api/reviews/:id', (req, res) => {
    try {
      const pin = req.headers['x-founder-pin'] || req.query.pin || (req.body && req.body.pin);
      if (pin && String(pin).trim() !== FOUNDER_PIN) {
        return res.status(401).json({ error: 'Unauthorized. Incorrect PIN.' });
      }
      const { id } = req.params;
      if (fs.existsSync(reviewsFile)) {
        let list = JSON.parse(fs.readFileSync(reviewsFile, 'utf-8'));
        if (Array.isArray(list)) {
          list = list.filter((rev: any) => rev.id !== id);
          fs.writeFileSync(reviewsFile, JSON.stringify(list, null, 2), 'utf-8');
        }
      }
      return res.json({ success: true, message: 'Review deleted.' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to delete review.' });
    }
  });

  // ==========================================
  // VIDEO ENDPOINTS (For Adding & Managing Videos)
  // ==========================================
  app.get('/api/videos', (req, res) => {
    try {
      if (fs.existsSync(videoManifestFile)) {
        const data = fs.readFileSync(videoManifestFile, 'utf-8');
        return res.json({ success: true, videos: JSON.parse(data) });
      }
    } catch (e) {
      console.error('Error reading video manifest:', e);
    }
    // Default video list showcasing authentic experiences
    const defaultVideos = [
      {
        id: "vid-coffee",
        title: "The Sacred Ethiopian Coffee Ceremony",
        subtitle: "Addis Ababa with Grandpa & Hindek",
        category: "Ceremony & Rituals",
        duration: "3:45",
        // High quality embeddable video & fallback preview
        youtubeId: "Y5e-4N15Ntc", // Authentic Ethiopian coffee ceremony
        embedUrl: "https://www.youtube-nocookie.com/embed/Y5e-4N15Ntc",
        thumbnail: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
        description: "Watch the roasting of fresh green Kafa beans over glowing olive wood charcoal, the fragrant frankincense smoke, and the traditional three rounds of Jebena brewing."
      },
      {
        id: "vid-kitchen",
        title: "Hindek Kitchen: Traditional Teff Injera & Wat Masterclass",
        subtitle: "Live Cooking in Addis Ababa",
        category: "Culinary Heritage",
        duration: "5:20",
        youtubeId: "J2M28oXWkWg", // Authentic Ethiopian cooking
        embedUrl: "https://www.youtube-nocookie.com/embed/J2M28oXWkWg",
        thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
        description: "Follow Hindek as guests ferment pure gluten-free teff dough, pour circular spirals over the blazing clay mitad, and simmer traditional aromatic Berbere sauces."
      },
      {
        id: "vid-bale",
        title: "Expedition into Bale Mountains & Afro-Alpine Sanetti",
        subtitle: "Oromia Highlands & Wildlife Safari",
        category: "Wildlife & Trekking",
        duration: "4:15",
        youtubeId: "pP6hS1gQe8w",
        embedUrl: "https://www.youtube-nocookie.com/embed/pP6hS1gQe8w",
        thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
        description: "Breathtaking cinematic vistas of the Afro-alpine Sanetti Plateau at 4,000m, ancient Harenna cloud forest moss, and tracking the rare endangered Ethiopian wolf."
      },
      {
        id: "vid-lalibela",
        title: "Lalibela: Monolithic Rock-Hewn Sanctuaries",
        subtitle: "12th Century Ancient Heritage",
        category: "Historic Route",
        duration: "4:50",
        youtubeId: "rK4qXqT2J-A",
        embedUrl: "https://www.youtube-nocookie.com/embed/rK4qXqT2J-A",
        thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop",
        description: "Journey into solid volcanic rock monoliths at Bet Giyorgis and listen to sacred Ge'ez liturgical chants echoing through subterranean tunnels."
      }
    ];
    res.json({ success: true, videos: defaultVideos });
  });

  app.post('/api/videos', (req, res) => {
    try {
      const pin = req.headers['x-founder-pin'] || req.body.founderPin;
      if (pin && String(pin).trim() !== FOUNDER_PIN) {
        return res.status(401).json({ error: 'Incorrect PIN. Only founder Hindek can modify videos.' });
      }

      const { title, youtubeUrl, description, category } = req.body;
      if (!title || !youtubeUrl) {
        return res.status(400).json({ error: 'Title and video URL are required.' });
      }

      // Extract YouTube ID if applicable
      let ytId = '';
      const ytMatch = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (ytMatch && ytMatch[1]) {
        ytId = ytMatch[1];
      }

      const newVideo = {
        id: 'vid-' + Date.now(),
        title: String(title).trim().slice(0, 100),
        subtitle: 'Bridge Ethiopia Experience',
        category: category || 'Cultural Experience',
        duration: 'HD Video',
        youtubeId: ytId,
        embedUrl: ytId ? `https://www.youtube-nocookie.com/embed/${ytId}` : youtubeUrl,
        thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
        description: description ? String(description).trim().slice(0, 500) : ''
      };

      let videos = [];
      if (fs.existsSync(videoManifestFile)) {
        try {
          videos = JSON.parse(fs.readFileSync(videoManifestFile, 'utf-8'));
          if (!Array.isArray(videos)) videos = [];
        } catch {
          videos = [];
        }
      }
      const updated = [newVideo, ...videos];
      fs.writeFileSync(videoManifestFile, JSON.stringify(updated, null, 2), 'utf-8');
      return res.json({ success: true, video: newVideo });
    } catch (err: any) {
      console.error('Failed to save video:', err);
      return res.status(500).json({ error: err.message || 'Failed to save video' });
    }
  });

  // Direct video file upload endpoint (MP4, MOV, WebM from phone/computer)
  app.post('/api/upload-video', upload.single('video'), (req, res) => {
    try {
      const pin = req.headers['x-founder-pin'] || req.body.founderPin;
      if (pin && String(pin).trim() !== FOUNDER_PIN) {
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(401).json({ error: 'Incorrect PIN. Only founder Hindek can upload videos.' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Please select a video file to upload.' });
      }

      const { title, category, description } = req.body;
      const fileUrl = `/uploads/videos/${req.file.filename}`;

      const newVideo = {
        id: 'vid-file-' + Date.now(),
        title: title ? String(title).trim().slice(0, 100) : req.file.originalname.replace(/\.[^/.]+$/, ''),
        subtitle: 'Uploaded by Hindek',
        category: category || 'Authentic Video',
        duration: 'Direct Video',
        fileUrl: fileUrl,
        isVideoFile: true,
        mimeType: req.file.mimetype || 'video/mp4',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: description ? String(description).trim().slice(0, 500) : 'Video uploaded directly from device by Hindek.'
      };

      let videos = [];
      if (fs.existsSync(videoManifestFile)) {
        try {
          videos = JSON.parse(fs.readFileSync(videoManifestFile, 'utf-8'));
          if (!Array.isArray(videos)) videos = [];
        } catch {
          videos = [];
        }
      }
      const updated = [newVideo, ...videos];
      fs.writeFileSync(videoManifestFile, JSON.stringify(updated, null, 2), 'utf-8');

      return res.json({ success: true, video: newVideo });
    } catch (err: any) {
      console.error('Failed to upload video file:', err);
      return res.status(500).json({ error: err.message || 'Failed to upload video.' });
    }
  });

  // Delete video endpoint
  app.delete('/api/videos/:id', (req, res) => {
    try {
      const pin = req.headers['x-founder-pin'] || req.query.pin || (req.body && req.body.founderPin);
      if (pin && String(pin).trim() !== FOUNDER_PIN) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }
      const { id } = req.params;
      if (!fs.existsSync(videoManifestFile)) {
        return res.json({ success: true });
      }
      let videos = JSON.parse(fs.readFileSync(videoManifestFile, 'utf-8'));
      const target = videos.find((v: any) => v.id === id);
      if (target && target.isVideoFile && target.fileUrl) {
        const filePath = path.join(publicDir, target.fileUrl);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (e) {
            console.error('Error deleting file:', e);
          }
        }
      }
      videos = videos.filter((v: any) => v.id !== id);
      fs.writeFileSync(videoManifestFile, JSON.stringify(videos, null, 2), 'utf-8');
      return res.json({ success: true });
    } catch (err: any) {
      console.error('Failed to delete video:', err);
      return res.status(500).json({ error: err.message || 'Failed to delete video.' });
    }
  });

  // ==========================================
  // SINGLE SPACE FEATURED VIDEO ENDPOINTS
  // One space where Hindek can upload/change his video anytime
  // ==========================================
  app.get('/api/featured-video', (req, res) => {
    try {
      if (fs.existsSync(featuredVideoFile)) {
        const data = JSON.parse(fs.readFileSync(featuredVideoFile, 'utf-8'));
        return res.json({ success: true, ...data });
      }
    } catch (e) {
      console.error('Error reading featured video:', e);
    }
    return res.json({
      success: true,
      hasVideo: true,
      isDefault: true,
      isIframe: true,
      url: "https://www.youtube-nocookie.com/embed/Y5e-4N15Ntc",
      title: "The Sacred Ethiopian Coffee Ceremony with Grandpa & Hindek",
      description: "Roasting raw wild Kafa beans over charcoal, wafting sacred frankincense smoke, and sipping Abol, Tona, and Baraka."
    });
  });

  app.post('/api/upload-featured-video', upload.single('video'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Please select a video file from your phone or computer.' });
      }

      const fileUrl = `/uploads/videos/${req.file.filename}`;
      let cleanTitle = req.body.title ? String(req.body.title).trim() : '';
      // If title looks like a file hash, UUID, or extension, keep it blank
      if (/^[0-9a-fA-F]{16,}$/.test(cleanTitle) || /^[\w-]{25,}$/.test(cleanTitle) || /^(video|mov|mp4|img|dsc)[-_0-9]+$/i.test(cleanTitle)) {
        cleanTitle = '';
      }

      const videoData = {
        hasVideo: true,
        isDefault: false,
        isIframe: false,
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        uploadedAt: new Date().toISOString(),
        title: cleanTitle,
        description: ''
      };

      fs.writeFileSync(featuredVideoFile, JSON.stringify(videoData, null, 2), 'utf-8');
      return res.json({ success: true, video: videoData });
    } catch (err: any) {
      console.error('Failed to upload featured video:', err);
      return res.status(500).json({ error: err.message || 'Failed to upload video.' });
    }
  });

  // Update or remove the video name/title
  app.post('/api/featured-video/title', (req, res) => {
    try {
      if (fs.existsSync(featuredVideoFile)) {
        const data = JSON.parse(fs.readFileSync(featuredVideoFile, 'utf-8'));
        data.title = req.body.title !== undefined ? String(req.body.title).trim() : '';
        fs.writeFileSync(featuredVideoFile, JSON.stringify(data, null, 2), 'utf-8');
        return res.json({ success: true, video: data });
      }
      return res.status(404).json({ error: 'No video found' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/featured-video', (req, res) => {
    try {
      if (fs.existsSync(featuredVideoFile)) {
        const data = JSON.parse(fs.readFileSync(featuredVideoFile, 'utf-8'));
        if (data.filename) {
          const p = path.join(uploadsDir, data.filename);
          if (fs.existsSync(p)) fs.unlinkSync(p);
        }
        fs.unlinkSync(featuredVideoFile);
      }
      return res.json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // ==========================================
  // STATIC SERVING & HTML FALLBACK
  // ==========================================
  const hasSource = fs.existsSync(path.join(process.cwd(), 'src', 'main.tsx'));
  if (process.env.NODE_ENV !== 'production' && hasSource) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
    }
    app.use(express.static(process.cwd()));
    app.get('*', (req, res) => {
      const distIndex = path.join(distDir, 'index.html');
      const rootIndex = path.join(process.cwd(), 'index.html');
      if (fs.existsSync(distIndex)) {
        return res.sendFile(distIndex);
      }
      if (fs.existsSync(rootIndex)) {
        return res.sendFile(rootIndex);
      }
      res.status(404).send('Not Found');
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bridge Ethiopia server running on http://localhost:${PORT}`);
  });
}

startServer();
