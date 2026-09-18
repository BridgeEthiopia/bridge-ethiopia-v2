export type RegionId =
  | 'addis-ababa'
  | 'oromia'
  | 'northern-ethiopia'
  | 'tigray'
  | 'southern-ethiopia'
  | 'eastern-ethiopia'
  | 'afar-danakil'
  | 'kafa-southwest'
  | 'gambella-west';

export interface DestinationChronicle {
  historicalOrigins: string;
  architecturalMastery: string;
  sacredTraditions: string;
  livingEcosystem: string;
  travelerAdvisory: string;
  advisoryAndProtocol?: string;
}

export interface Destination {
  id: string;
  name: string;
  amharicName?: string;
  oromoName?: string;
  tigrinyaName?: string;
  region: RegionId;
  regionLabel: string;
  heroImage: string;
  gallery: string[];
  tagline: string;
  description: string;
  whyVisit: string[];
  thingsToDo: string[];
  keyAttractions: string[];
  cultureAndHeritage: string;
  localFoodHighlights: string[];
  bestTimeToVisit: string;
  suggestedDuration?: string;
  scheduleType?: string;
  travelTips: string[];
  coordinates?: { lat: number; lng: number };
  elevation?: string;
  nearbyLodging: string[];
  availableTourIds: string[];
  featured?: boolean;
  isChronicleOnly?: boolean;
  chronicle?: DestinationChronicle;
}

export interface Tour {
  id: string;
  title: string;
  category:
    | 'City Tours'
    | 'Historical & UNESCO'
    | 'Cultural & Tribal'
    | 'Nature & Trekking'
    | 'Wildlife & Birding'
    | 'Food & Culinary'
    | 'Coffee Trail'
    | 'Photography Expedition'
    | 'Custom & Private';
  region: RegionId | 'multi-region';
  duration?: string;
  scheduleType?: string;
  groupSize: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  priceFromUSD: number;
  image: string;
  shortDescription: string;
  itinerarySummary: string[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isChronicleOnly?: boolean;
  chronicle?: {
    historicalOrigins?: string;
    ceremonialPhilosophy?: string;
    sacredTraditions?: string;
    ritualInstruments?: string;
    livingEcosystem?: string;
    travelerAdvisory?: string;
  };
}

export interface FoodDish {
  id: string;
  name: string;
  nativeName?: string;
  category: 'national' | 'oromo' | 'fasting-vegan' | 'meat' | 'bread-grains';
  image: string;
  description: string;
  mainIngredients: string[];
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Customizable';
  culturalBackground: string;
  servedWith: string;
  oromoRegion?: string;
  isVegetarian?: boolean;
}

export interface Festival {
  id: string;
  name: string;
  nativeName?: string;
  culture: 'Pan-Ethiopian' | 'Oromo' | 'Orthodox Christian' | 'Sidama' | 'Regional' | 'Islamic Heritage' | 'Orthodox Pilgrimage' | 'Northern Cultural Heritage' | string;
  dateOrSeason: string;
  primaryLocations: string[];
  image: string;
  history: string;
  culturalMeaning: string;
  visitorExperience: string[];
  travelTips: string[];
  nextDate: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'Hotel' | 'Resort' | 'Eco-Lodge' | 'Guesthouse' | 'Safari Camp';
  location: string;
  region: RegionId;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  priceRange: string;
  pricePerNightUSD?: number;
  contactPhone: string;
  whatsapp: string;
  rating: number;
  isVerified?: boolean;
}

export interface BusinessListing {
  id: string;
  businessName: string;
  category:
    | 'Hotels & Lodges'
    | 'Restaurants & Cafes'
    | 'Local Tour Guides'
    | 'Transport & Car Rentals'
    | 'Cultural Shops & Artisans'
    | 'Coffee Experiences'
    | 'Food Experiences';
  location: string;
  description: string;
  services: string[];
  prices: string;
  phone: string;
  whatsapp: string;
  email?: string;
  openingHours: string;
  website?: string;
  image: string;
  packageType: 'Free Listing' | 'Premium Listing' | 'Featured Advertisement';
  status: 'pending' | 'active' | 'expired' | 'suspended';
  isVerified: boolean;
  isOfficialBridgeEthiopia?: boolean;
  submittedDate: string;
}

export interface PlanTripRequest {
  fullName: string;
  email: string;
  phoneOrWhatsApp: string;
  country: string;
  travelDates: string;
  estimatedDays?: string;
  travelPace?: string;
  numberOfTravelers: number;
  travelerType: 'Solo' | 'Couple' | 'Family with Children' | 'Group of Friends' | 'Organization/NGO';
  budgetLevel: 'Backpacker / Budget' | 'Comfortable Mid-Range' | 'Premium / Luxury' | 'Flexible';
  selectedDestinations: string[];
  interests: string[];
  foodPreferences: string[];
  culturalDepth: 'General overview' | 'Deep cultural immersion' | 'Photography & filming' | 'Academic / Research';
  adventureLevel: 'Relaxed & easy' | 'Moderate walking/exploring' | 'Active trekking & mountains' | 'Extreme adventure (Danakil, etc.)';
  hotelPreference: 'Eco-Lodges & Nature' | 'Boutique & Heritage Guesthouses' | '4/5-Star City Stays' | '4/5-Star City Hotels' | 'Local Guesthouses' | 'Mix of styles';
  transportationNeeds: 'Private 4WD Land Cruiser with Driver' | 'Minibus for group' | 'Domestic flights + local transfers' | 'Airport pickup only' | 'Need recommendations';
  specialRequests: string;
  createdAt: string;
}

export interface BookingRequest {
  id?: string;
  itemType: 'tour' | 'experience' | 'hindek-kitchen' | 'coffee-ceremony' | 'hotel' | 'custom-trip';
  itemId: string;
  itemTitle: string;
  customerName: string;
  email: string;
  whatsapp: string;
  country: string;
  selectedDate: string;
  numberOfGuests: number;
  specialNotes?: string;
  totalEstimatedUSD?: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DishReview {
  id: string;
  dishId: string;
  dishName: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerified?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorCountry: string;
  avatar: string;
  rating: number;
  date: string;
  tourOrExperience: string;
  comment: string;
  verifiedTrip: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    | 'Addis Ababa'
    | 'Oromia'
    | 'Northern Ethiopia'
    | 'Southern Ethiopia'
    | 'Eastern Ethiopia'
    | 'Other Regions'
    | 'Food'
    | 'Oromo Food'
    | 'Coffee'
    | 'Festivals'
    | 'Culture'
    | 'Wildlife'
    | 'Nature'
    | 'Historical Sites'
    | 'Hindek Kitchen';
  imageUrl: string;
  location: string;
  caption: string;
}

export interface NgoInquiry {
  organizationName: string;
  contactPerson: string;
  role: string;
  email: string;
  whatsapp: string;
  countryOfOrigin: string;
  purposeOfVisit: string;
  servicesNeeded: string[];
  travelDates: string;
  delegationSize: number;
  specialLogistics: string;
  createdAt: string;
}

export interface CoffeePackage {
  id: string;
  title: string;
  weight: string;
  roastType: string;
  description: string;
  priceUSD: number;
  priceETB: number;
  badge?: string;
  imageUrl: string;
  photoKey: string;
  grindOptions: string[];
  features: string[];
  inStock: boolean;
  purpose?: string;
  tier?: 'retail' | 'commercial' | 'wholesale';
  isWholesale?: boolean;
}

