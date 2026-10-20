import { CoffeePackage } from '../types';

export const HINDEK_COFFEE_TAGLINE = 'Ethiopian Coffee, Roasted with Care.';

export const CUSTOM_ORDERS_INFO = {
  title: 'Custom & Wholesale Orders',
  heading: 'Need a different quantity or custom packaging for your business?',
  description: 'Contact us for wholesale, private-label packaging, and custom roast profiles tailored for cafés, hotels, restaurants, and international importers.',
  tagline: 'Hindek Coffee — Ethiopian Coffee, Roasted with Care.'
};

export const COFFEE_PACKAGES: CoffeePackage[] = [
  // 1. 200g
  {
    id: 'pkg-200g-personal',
    title: '200g Freshly Roasted Ethiopian Coffee',
    weight: '200g',
    roastType: 'Medium Roasted Black Arabica',
    purpose: 'Perfect for personal use',
    description: 'Signature single-origin Ethiopian heirloom Arabica in our protective black freshness pouch. Rich floral aroma, velvety crema, and a remarkably smooth finish. "Good Coffee • Better Days".',
    priceUSD: 8,
    priceETB: 950,
    badge: 'Personal Use • 200g',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-200g-medium-black',
    tier: 'retail',
    grindOptions: [
      'Whole Bean (Peak freshness)',
      'Traditional Jebena Grind',
      'Medium Drip / Filter Grind',
      'Fine Espresso Grind'
    ],
    features: [
      '100% Ethiopian Heirloom Arabica',
      'Perfect for Personal Daily Enjoyment',
      'One-Way Degassing Valve Pouch',
      'Lightweight & Souvenir-Ready'
    ],
    inStock: true
  },

  // 2. 250g
  {
    id: 'pkg-250g-everyday',
    title: '250g Freshly Roasted Ethiopian Coffee',
    weight: '250g',
    roastType: 'Medium Roast / Half Roast',
    purpose: 'Great for everyday coffee',
    description: 'The classic morning standard. Freshly roasted artisan beans with delicate honey sweetness, jasmine hints, and vibrant highland character for your daily brew.',
    priceUSD: 10,
    priceETB: 1150,
    badge: 'Everyday Coffee • 250g',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-250g-everyday',
    tier: 'retail',
    grindOptions: [
      'Whole Bean',
      'Traditional Jebena Grind',
      'Medium Drip Grind',
      'Fine Espresso Grind',
      'Coarse French Press Grind'
    ],
    features: [
      'Ideal Everyday Morning Brew',
      'Balanced Acidity & Velvety Body',
      'Resealable Fresh-Lock Seal',
      'Sourced from Oromia & Southern Highlands'
    ],
    inStock: true
  },

  // 3. 500g
  {
    id: 'pkg-500g-family',
    title: '500g Freshly Roasted Ethiopian Coffee',
    weight: '500g',
    roastType: 'Medium-Dark Roast / Half Roast',
    purpose: 'Ideal for coffee lovers and families',
    description: 'Generous half-kilo pack for true coffee aficionados and welcoming households. Offers rich caramel notes, dark cocoa undertones, and sustained freshness.',
    priceUSD: 15,
    priceETB: 1800,
    badge: 'Coffee Lovers & Families • 500g',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-500g-half',
    tier: 'retail',
    grindOptions: [
      'Whole Bean',
      'Traditional Jebena Grind',
      'Medium Drip Grind',
      'Fine Espresso Grind',
      'French Press Grind'
    ],
    features: [
      'Generous Family & Host Size',
      'Artisan Batch Roasted to Order',
      'Rich Caramel & Nutty Undertones',
      'Hand-Packaged in Addis Ababa'
    ],
    inStock: true
  },

  // 4. 1kg
  {
    id: 'pkg-1kg-regular',
    title: '1 kg Freshly Roasted Ethiopian Coffee',
    weight: '1 kg (1000g)',
    roastType: 'Half Roast / Medium-Dark Roast',
    purpose: 'Great value for regular coffee drinkers',
    description: 'Our most popular flagship roast. Handcrafted high-altitude Arabica beans delivering bold fragrance, long-lasting crema, and the authentic depth of Ethiopian coffee ceremonies.',
    priceUSD: 24,
    priceETB: 2800,
    badge: 'Great Value • 1kg Flagship',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-1kg-roasted-half',
    tier: 'retail',
    grindOptions: [
      'Whole Bean (Peak freshness)',
      'Traditional Jebena Grind',
      'Medium Drip / Aeropress Grind',
      'Fine Espresso Grind',
      'Coarse Cold Brew Grind'
    ],
    features: [
      'Best Value for Daily Coffee Drinkers',
      '100% Ethiopian Heirloom Highland Arabica',
      'Heavy Aroma Shield Valve Bag',
      'Certified Flight-Safe for International Luggage'
    ],
    inStock: true
  },

  // 5. 2kg
  {
    id: 'pkg-2kg-homes-offices',
    title: '2 kg Freshly Roasted Ethiopian Coffee',
    weight: '2 kg',
    roastType: 'Medium-Dark / Tailored Roast',
    purpose: 'Perfect for homes, offices, and small businesses',
    description: 'Two full kilograms of highland perfection. Keeps offices energized and active households fully stocked without compromising artisan freshness.',
    priceUSD: 45,
    priceETB: 5200,
    badge: 'Offices & Small Businesses • 2kg',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-2kg-office',
    tier: 'commercial',
    grindOptions: [
      'Whole Bean (Recommended)',
      'Office Drip Grind',
      'Commercial Espresso Grind',
      'Traditional Jebena Grind'
    ],
    features: [
      'Perfect for Shared Office Pantries',
      'Economical Multi-Kilo Rate',
      'Double Foil-Sealed Freshness',
      'Consistent Smooth Profile'
    ],
    inStock: true
  },

  // 6. 5kg
  {
    id: 'pkg-5kg-cafes-restaurants',
    title: '5 kg Freshly Roasted Ethiopian Coffee',
    weight: '5 kg',
    roastType: 'Specialty Café Espresso or Traditional Roast',
    purpose: 'For cafés, restaurants, and businesses',
    description: 'Commercial 5kg package designed for professional baristas, hospitality venues, and boutique restaurants seeking genuine Ethiopian single-origin flavor on tap.',
    priceUSD: 105,
    priceETB: 12000,
    badge: 'Cafés & Restaurants • 5kg',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-5kg-cafe',
    tier: 'commercial',
    grindOptions: [
      'Whole Bean (Commercial Grinders)',
      'Café Espresso Grind',
      'Restaurant Drip Grind'
    ],
    features: [
      'Optimized for Commercial Espresso Extractions',
      'Batch-Roasted for Strict Consistency',
      'Direct Roastery-to-Door Delivery in Addis',
      'Includes Barista Brewing Advice'
    ],
    inStock: true
  },

  // 7. 10kg
  {
    id: 'pkg-10kg-bulk',
    title: '10 kg Bulk Order Roasted Coffee',
    weight: '10 kg',
    roastType: 'Freshly Roasted to Client Specification',
    purpose: 'Bulk order',
    description: 'High-volume commercial dispatch for conference venues, corporate campuses, catering companies, or overseas community shipments.',
    priceUSD: 195,
    priceETB: 22500,
    badge: 'Bulk Order • 10kg',
    imageUrl: '/images/hindek-coffee-package.jpg',
    photoKey: 'coffee-pkg-10kg-bulk',
    tier: 'commercial',
    grindOptions: [
      'Whole Bean (Long-term freshness)',
      'Uniform Commercial Grind'
    ],
    features: [
      'Substantial Bulk Discount Savings',
      'Freshly Roasted within 24h of Order',
      'Industrial Heavy-Duty Packaging',
      'Priority Delivery Logistics'
    ],
    inStock: true
  },

  // 8. 25kg
  {
    id: 'pkg-25kg-wholesale',
    title: '25 kg Wholesale Roastery Sack',
    weight: '25 kg',
    roastType: 'Wholesale Roast or Green Arabica',
    purpose: 'Wholesale',
    description: 'Quarter-quintal commercial sack for wholesale distributors, specialty roasteries, and large-scale culinary institutions.',
    priceUSD: 450,
    priceETB: 52000,
    badge: 'Wholesale Partner • 25kg',
    imageUrl: '/images/hindek-green-coffee.jpg',
    photoKey: 'coffee-pkg-25kg-wholesale',
    tier: 'wholesale',
    isWholesale: true,
    grindOptions: [
      'Whole Roasted Beans',
      'Grade 1 Raw Green Beans'
    ],
    features: [
      'Wholesale Trade Rates',
      'GrainPro Lined Moisture-Barrier Bag',
      'Full Origin Traceability Documentation',
      'B2B Invoicing & Custom Scheduling'
    ],
    inStock: true
  },

  // 9. 50kg
  {
    id: 'pkg-50kg-large-wholesale',
    title: '50 kg Large Wholesale / Commercial Order',
    weight: '50 kg',
    roastType: 'Commercial Roast or Raw Green Beans',
    purpose: 'Large wholesale orders',
    description: 'Half-quintal commercial master sack for export partners, roastery collectives, and institutional food-service chains.',
    priceUSD: 850,
    priceETB: 98000,
    badge: 'Large Wholesale Orders • 50kg',
    imageUrl: '/images/hindek-green-coffee.jpg',
    photoKey: 'coffee-pkg-50kg-wholesale',
    tier: 'wholesale',
    isWholesale: true,
    grindOptions: [
      'Grade 1 Specialty Raw Green Beans',
      'Whole Roasted Beans'
    ],
    features: [
      'Maximum Volume Wholesale Pricing',
      'Jute Outer Sack with GrainPro Hermetic Liner',
      'Export & Customs Documentation Assistance',
      'Direct Founder B2B Coordination'
    ],
    inStock: true
  },

  // 10. Raw Green Beans (Bonus specialty ceremonial option)
  {
    id: 'pkg-green-raw-coffee',
    title: 'Ceremonial Raw Green Coffee Beans (Unroasted)',
    weight: '1 kg or 500g',
    roastType: 'Raw / Unroasted Green Arabica',
    purpose: 'Ceremonial green beans for authentic pan-roasting',
    description: 'Grade 1 specialty raw green coffee beans from Sidama, Yirgacheffe, and Kafa. Hand-sorted and sun-dried. Perfect for traditional Ethiopian charcoal pan-roasting or home roasters.',
    priceUSD: 18,
    priceETB: 2100,
    badge: 'Ceremonial Raw Beans',
    imageUrl: '/images/hindek-green-coffee.jpg',
    photoKey: 'coffee-pkg-green-raw',
    tier: 'retail',
    grindOptions: [
      'Raw Whole Green Beans (Unroasted)'
    ],
    features: [
      'Grade 1 Specialty Raw Green Arabica',
      'Hand-Selected Sun-Dried Beans',
      'Authentic for Home Charcoal Roasting',
      'Stays Fresh for 12+ Months in Jute/Burlap'
    ],
    inStock: true
  }
];
