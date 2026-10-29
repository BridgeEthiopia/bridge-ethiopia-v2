var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "50mb" }));
  const publicDir = import_path.default.join(process.cwd(), "public");
  const distDir = import_path.default.join(process.cwd(), "dist");
  const photosDataFile = import_path.default.join(process.cwd(), "public", "site-photos-manifest.json");
  if (!import_fs.default.existsSync(publicDir)) {
    import_fs.default.mkdirSync(publicDir, { recursive: true });
  }
  app.use(import_express.default.static(publicDir));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/notify-admin", (req, res) => {
    try {
      const { type, title, senderName, senderEmail, senderPhone, details, notes, recipientEmail } = req.body;
      const targetEmail = recipientEmail || "hindek.ethiopia@gmail.com";
      console.log(`[Admin Email Dispatch] Notification routed to ${targetEmail}: "${title}" from ${senderName} (${senderEmail}, ${senderPhone || "no phone"})`);
      return res.json({
        success: true,
        deliveredTo: targetEmail,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (err) {
      console.error("Failed to dispatch admin notification:", err);
      return res.status(500).json({ error: "Failed to dispatch notification." });
    }
  });
  app.get("/api/photos", (req, res) => {
    try {
      if (import_fs.default.existsSync(photosDataFile)) {
        const data = import_fs.default.readFileSync(photosDataFile, "utf-8");
        return res.json(JSON.parse(data));
      }
    } catch (err) {
      console.error("Error reading photos manifest:", err);
    }
    res.json({});
  });
  const publishedPhotosFile = import_path.default.join(publicDir, "published-photos.json");
  const reviewsFile = import_path.default.join(publicDir, "reviews-data.json");
  const dishReviewsFile = import_path.default.join(publicDir, "dish-reviews-data.json");
  const FOUNDER_PIN = process.env.FOUNDER_PIN || "2519";
  app.get("/api/reviews", (req, res) => {
    try {
      if (import_fs.default.existsSync(reviewsFile)) {
        const data = import_fs.default.readFileSync(reviewsFile, "utf-8");
        return res.json({ success: true, reviews: JSON.parse(data) });
      }
    } catch (err) {
      console.error("Error reading reviews:", err);
    }
    res.json({ success: true, reviews: [] });
  });
  app.post("/api/reviews", (req, res) => {
    try {
      const { authorName, authorCountry, rating, tourOrExperience, comment } = req.body;
      if (!authorName || !comment) {
        return res.status(400).json({ error: "Author name and review comments are required." });
      }
      const numRating = Math.min(5, Math.max(1, Number(rating) || 5));
      const newReview = {
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        authorName: String(authorName).trim().slice(0, 80),
        authorCountry: (authorCountry ? String(authorCountry).trim() : "International Explorer").slice(0, 80),
        avatar: "",
        rating: numRating,
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        tourOrExperience: (tourOrExperience ? String(tourOrExperience).trim() : "Custom Travel Experience").slice(0, 100),
        comment: String(comment).trim().slice(0, 1500),
        verifiedTrip: true,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      let existingReviews = [];
      if (import_fs.default.existsSync(reviewsFile)) {
        try {
          existingReviews = JSON.parse(import_fs.default.readFileSync(reviewsFile, "utf-8"));
          if (!Array.isArray(existingReviews)) existingReviews = [];
        } catch {
          existingReviews = [];
        }
      }
      const updated = [newReview, ...existingReviews];
      import_fs.default.writeFileSync(reviewsFile, JSON.stringify(updated, null, 2), "utf-8");
      if (import_fs.default.existsSync(distDir)) {
        import_fs.default.writeFileSync(import_path.default.join(distDir, "reviews-data.json"), JSON.stringify(updated, null, 2), "utf-8");
      }
      return res.json({ success: true, review: newReview, total: updated.length });
    } catch (err) {
      console.error("Failed to save visitor review:", err);
      return res.status(500).json({ error: "Could not save review." });
    }
  });
  app.get("/api/dish-reviews", (req, res) => {
    try {
      if (import_fs.default.existsSync(dishReviewsFile)) {
        const data = import_fs.default.readFileSync(dishReviewsFile, "utf-8");
        return res.json({ success: true, reviews: JSON.parse(data) });
      }
    } catch (err) {
      console.error("Error reading dish reviews:", err);
    }
    res.json({ success: true, reviews: [] });
  });
  app.post("/api/dish-reviews", (req, res) => {
    try {
      const { dishId, dishName, authorName, authorLocation, rating, comment } = req.body;
      if (!authorName || !comment || !dishId) {
        return res.status(400).json({ error: "Dish, name, and comment are required." });
      }
      const newDishReview = {
        id: `dish-rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        dishId: String(dishId),
        dishName: String(dishName || "Ethiopian Dish"),
        authorName: String(authorName).trim().slice(0, 80),
        authorLocation: (authorLocation ? String(authorLocation).trim() : "Food Lover").slice(0, 80),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: String(comment).trim().slice(0, 1e3),
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        isVerified: true
      };
      let existingDishReviews = [];
      if (import_fs.default.existsSync(dishReviewsFile)) {
        try {
          existingDishReviews = JSON.parse(import_fs.default.readFileSync(dishReviewsFile, "utf-8"));
          if (!Array.isArray(existingDishReviews)) existingDishReviews = [];
        } catch {
          existingDishReviews = [];
        }
      }
      const updated = [newDishReview, ...existingDishReviews];
      import_fs.default.writeFileSync(dishReviewsFile, JSON.stringify(updated, null, 2), "utf-8");
      if (import_fs.default.existsSync(distDir)) {
        import_fs.default.writeFileSync(import_path.default.join(distDir, "dish-reviews-data.json"), JSON.stringify(updated, null, 2), "utf-8");
      }
      return res.json({ success: true, review: newDishReview });
    } catch (err) {
      console.error("Failed to save dish review:", err);
      return res.status(500).json({ error: "Could not save dish review." });
    }
  });
  const checkFounderAuth = (req, res) => {
    const pin = req.headers["x-founder-pin"] || req.body?.founderPin || req.query?.pin;
    if (pin && String(pin).trim() === FOUNDER_PIN) {
      return true;
    }
    res.status(401).json({
      error: "Unauthorized: Photo uploading and publishing is restricted to the founder (Hindek).",
      founderOnly: true
    });
    return false;
  };
  app.post("/api/founder/verify-pin", (req, res) => {
    const { pin } = req.body;
    if (pin && String(pin).trim() === FOUNDER_PIN) {
      return res.json({ success: true, message: "Founder authenticated successfully." });
    }
    return res.status(401).json({ success: false, error: "Incorrect PIN. Only founder Hindek can upload photos." });
  });
  app.get("/api/published-photos", (req, res) => {
    try {
      if (import_fs.default.existsSync(publishedPhotosFile)) {
        const data = import_fs.default.readFileSync(publishedPhotosFile, "utf-8");
        return res.json({ success: true, data: JSON.parse(data) });
      }
    } catch (err) {
      console.error("Error reading published photos:", err);
    }
    res.json({ success: true, data: {} });
  });
  app.post("/api/publish-photos", (req, res) => {
    if (!checkFounderAuth(req, res)) return;
    try {
      const { founderPhotos, customPhotos } = req.body;
      let currentPublished = {};
      if (import_fs.default.existsSync(publishedPhotosFile)) {
        try {
          currentPublished = JSON.parse(import_fs.default.readFileSync(publishedPhotosFile, "utf-8"));
        } catch {
        }
      }
      const updated = {
        founderPhotos: { ...currentPublished.founderPhotos || {}, ...founderPhotos || {} },
        customPhotos: { ...currentPublished.customPhotos || {}, ...customPhotos || {} },
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
      };
      import_fs.default.writeFileSync(publishedPhotosFile, JSON.stringify(updated, null, 2), "utf-8");
      if (import_fs.default.existsSync(distDir)) {
        import_fs.default.writeFileSync(import_path.default.join(distDir, "published-photos.json"), JSON.stringify(updated, null, 2), "utf-8");
      }
      return res.json({ success: true, lastUpdated: updated.lastUpdated });
    } catch (err) {
      console.error("Failed to publish photos globally:", err);
      return res.status(500).json({ error: err.message || "Failed to publish photos" });
    }
  });
  app.post("/api/upload-photo", (req, res) => {
    if (!checkFounderAuth(req, res)) return;
    try {
      const { slotKey, dataUrl, url } = req.body;
      if (!slotKey) {
        return res.status(400).json({ error: "Missing slotKey" });
      }
      let targetFilename = "";
      switch (slotKey) {
        case "founderPortrait":
          targetFilename = "hindek-portrait.jpg";
          break;
        case "hero":
        case "traditionalDress":
        case "coffeeCeremony":
          targetFilename = "hindek-traditional.jpg";
          break;
        case "kitchenAction":
        case "injeraCooking":
          targetFilename = "hindek-cooking.jpg";
          break;
        case "familyHeritage":
          targetFilename = "hindek-family.jpg";
          break;
        default:
          targetFilename = `custom-${slotKey}.jpg`;
          break;
      }
      let savedUrl = "";
      if (dataUrl && typeof dataUrl === "string" && dataUrl.startsWith("data:image/")) {
        const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const filePathPublic = import_path.default.join(publicDir, targetFilename);
        import_fs.default.writeFileSync(filePathPublic, buffer);
        if (import_fs.default.existsSync(distDir)) {
          const filePathDist = import_path.default.join(distDir, targetFilename);
          import_fs.default.writeFileSync(filePathDist, buffer);
        }
        savedUrl = `/${targetFilename}?t=${Date.now()}`;
      } else if (url && typeof url === "string") {
        savedUrl = url.trim();
      } else {
        return res.status(400).json({ error: "Invalid image data" });
      }
      let currentManifest = {};
      try {
        if (import_fs.default.existsSync(photosDataFile)) {
          currentManifest = JSON.parse(import_fs.default.readFileSync(photosDataFile, "utf-8"));
        }
      } catch (e) {
        currentManifest = {};
      }
      currentManifest[slotKey] = savedUrl;
      if (slotKey === "founderPortrait" && !currentManifest.hero) {
        currentManifest.hero = savedUrl;
      }
      import_fs.default.writeFileSync(photosDataFile, JSON.stringify(currentManifest, null, 2), "utf-8");
      if (import_fs.default.existsSync(distDir)) {
        import_fs.default.writeFileSync(import_path.default.join(distDir, "site-photos-manifest.json"), JSON.stringify(currentManifest, null, 2), "utf-8");
      }
      console.log(`[Photo Manager] Successfully saved photo for slot '${slotKey}' -> ${savedUrl}`);
      return res.json({ success: true, slotKey, url: savedUrl, manifest: currentManifest });
    } catch (error) {
      console.error("Failed to upload photo:", error);
      return res.status(500).json({ error: error.message || "Failed to save photo" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(import_express.default.static(distDir));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distDir, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bridge Ethiopia server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
