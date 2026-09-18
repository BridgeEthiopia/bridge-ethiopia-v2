import { Destination, Tour, FoodDish, Festival, Accommodation, BusinessListing, Review, GalleryItem } from '../types';

import addisImg from '../assets/images/addis_ababa_skyline_1787813744000.jpg';
import wenchiImg from '../assets/images/wenchi_lake_landscape_1787813595736.jpg';
import baleImg from '../assets/images/bale_mountains_plateau_1787813728945.jpg';
import sofOmarImg from '../assets/images/sof_omar_cave_interior_1787813611338.jpg';
import lalibelaImg from '../assets/images/lalibela_st_george_church_1787813645261.jpg';
import simienImg from '../assets/images/simien_mountains_view_1787813660687.jpg';
import gondarImg from '../assets/images/gondar_royal_castle_1787813713556.jpg';
import omoImg from '../assets/images/omo_valley_landscape_1787813759031.jpg';
import hararImg from '../assets/images/harar_walled_city_1787813697672.jpg';
import danakilImg from '../assets/images/danakil_dallol_springs_1787813682387.jpg';
import kafaImg from '../assets/images/kafa_coffee_rainforest_1787813627212.jpg';
import sheklaTibsImg from '../assets/images/shekla_tibs_sizzling_1787813805251.jpg';
import marqaaImg from '../assets/images/marqaa_oromo_porridge_1787813823518.jpg';
import coffeeCeremonyImg from '../assets/images/ethiopian_coffee_ceremony_1787813852379.jpg';
import irreechaImg from '../assets/images/irreecha_festival_oromo_1787813876028.jpg';
import enkutatashImg from '../assets/images/enkutatash_new_year_1787813894569.jpg';
import meskelImg from '../assets/images/meskel_demera_fire_1787814613769.jpg';
import kulubiImg from '../assets/images/kulubi_pilgrimage_1787814627497.jpg';
import arbaMinchImg from '../assets/images/arba_minch_dorze_1787901932452.jpg';
import konsoImg from '../assets/images/konso_village_landscape_1788060581359.jpg';

// Local authentic photo assets
import doroWatImg from '../assets/images/food-doro-wat.jpg';
import kitfoImg from '../assets/images/food-kitfo.jpg';
import shiroImg from '../assets/images/food-shiro-tegamino.jpg';
import beyaynetuImg from '../assets/images/food-beyaynetu.jpg';
import injeraTeffImg from '../assets/images/food-injera-teff.jpg';
import bunaQalaaImg from '../assets/images/food-buna-qalaa.jpg';
import tourAddisImg from '../assets/images/tour-addis-city-essence.jpg';
import tourCookingImg from '../assets/images/tour-hindek-kitchen-cooking-experience.jpg';
import tourCoffeeCeremonyImg from '../assets/images/tour-hindek-grandpa-coffee-ceremony.jpg';
import tourBaleImg from '../assets/images/tour-bale-mountains-expedition.jpg';
import tourLalibelaImg from '../assets/images/tour-lalibela-historic-route.jpg';
import tourOmoImg from '../assets/images/tour-omo-valley-cultural-odyssey.jpg';
import tourHararImg from '../assets/images/tour-harar-walled-city-coffee-trail.jpg';

// Image aliases and fallbacks for gallery and circuit tours
const gallerySimienImg = simienImg;
const galleryGondarImg = gondarImg;
const tourDanakilImg = danakilImg;
const tourAxumImg = lalibelaImg; // Majestic northern historic stone heritage
const destAxumZionImg = lalibelaImg;
const tourGheraltaImg = simienImg; // Majestic highland sandstone and peaks
const destGheraltaTigrayImg = simienImg;
const injeraImg = injeraTeffImg;

export const FOUNDER_INFO = {
  name: 'Hindek',
  title: 'Founder, General Manager & Cultural Experience Host',
  tagline: 'Founder, Manager & Lead Local Host at Bridge Ethiopia',
  location: 'Addis Ababa, Ethiopia',
  email: 'Hindeku25@gmail.com',
  secondaryEmail: 'bridgeethiopiatravel@gmail.com',
  phone: '+251 91 221 3888',
  whatsapp: '251912213888',
  whatsappDisplay: '+251 91 221 3888',
  address: 'Bole Sub-City / Meskel Square & Bole Airport Hub, Addis Ababa, Ethiopia',
  bio: 'Hindek is the Founder, General Manager, and lead cultural experience host of Bridge Ethiopia. She personally oversees all tour operations, NGO logistical assistance, and authentic local experiences to help visitors discover the real Ethiopia with heart, safety, and deep local expertise. She also founded Hindek Kitchen, a signature hands-on cultural cooking immersion where visitors bake 100% Teff Injera and prepare traditional Ethiopian and Oromo dishes.',
  servicesOffered: [
    'Local tour guiding',
    'Helping visitors explore Ethiopia',
    'Personalized travel assistance',
    'Cultural guidance',
    'Planning local experiences',
    'Helping visitors discover real destinations',
    'Food and cultural experiences',
    'Ethiopian cooking experiences through Hindek Kitchen',
    'Traditional coffee experiences',
    'Travel and local assistance',
    'Connecting visitors with trusted local services'
  ],
  ngoExperienceIntro: 'Bridge Ethiopia also provides local assistance and support for international visitors, NGOs, humanitarian organizations, researchers, and development partners visiting or working in Ethiopia. Using local knowledge and experience, Hindek helps visitors understand the local environment and connect with appropriate services and resources.',
  ngoSupportQuote: '“Bridge Ethiopia also provides local assistance and support for international visitors, NGOs, humanitarian organizations, researchers, and development partners visiting or working in Ethiopia. I use my local knowledge and experience to help visitors understand the local environment and connect with appropriate services and resources. Assistance may include local guidance, travel coordination, transportation, accommodation support, cultural orientation, interpretation, meeting coordination, and help navigating appropriate institutions or offices when needed. Bridge Ethiopia is an independent local support and tourism platform, not a government agency.”',
  ngoSupportServices: [
    'Local guidance and orientation',
    'Travel and logistics assistance',
    'Transportation and accommodation coordination',
    'Cultural orientation',
    'Interpretation and local communication support',
    'Meeting and visit coordination',
    'Assistance connecting with appropriate local services and institutions',
    'Support for visitors working in education, health, community, and social development activities'
  ],
  ngoVolunteerConnectQuote: 'Bridge Ethiopia also helps connect international visitors who want to support education, schools, health, volunteer work, and community development in Ethiopia. The platform can help visitors find appropriate local organizations and opportunities for responsible community support and volunteering.',
  ngoDisclaimer: 'Important: Bridge Ethiopia does not replace government services or claim official authority. It provides independent local guidance, coordination, and assistance.',
  ngoFocusAreas: [
    'Education & Schools',
    'Health & Well-being',
    'Community Development',
    'Schools & Educational Programs',
    'Social Support & Vulnerable Groups',
    'Local Communities & Grassroots Outreach',
    'Community-Based Projects'
  ],
  ngoSupportDescription: 'Hindek supports international visitors and organizations who need local assistance in Ethiopia. With experience connected to community development and international NGO work, she can help visitors and organizations navigate local arrangements and access appropriate support.',
  visionStatement: '“My goal is to connect Ethiopia with the world—through tourism, culture, community support, and meaningful partnerships.”',
  visionAuthor: 'Hindek',
  visionAuthorTitle: 'Local Guide & Founder, Bridge Ethiopia',
  mission: 'To build a bridge not only between Ethiopia and tourists, but also between communities, organizations, and opportunities through authentic travel, cultural immersion, and meaningful local partnerships.',
};

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'addis-ababa',
    name: 'Addis Ababa',
    amharicName: 'አዲስ አበባ',
    oromoName: 'Finfinnee',
    region: 'addis-ababa',
    regionLabel: 'Capital & Cultural Heart',
    heroImage: addisImg,
    gallery: [
      addisImg,
      tourAddisImg
    ],
    tagline: 'The Diplomatic Capital of Africa & Gateway to Ancient History',
    description: 'Addis Ababa (meaning "New Flower") is a vibrant metropolis nestled in the foothills of Mount Entoto at 2,400 meters elevation. It bridges traditional Ethiopian culture with modern pan-African diplomacy.',
    whyVisit: [
      'See Lucy (Dinkenesh), the 3.2-million-year-old hominid ancestor at the National Museum',
      'Stroll through Unity Park inside the historic Grand National Palace',
      'Take in panoramic views and eucalyptus breezes atop Mount Entoto',
      'Experience authentic Tomoca coffee, traditional Tej houses, and vibrant music'
    ],
    thingsToDo: [
      'National Museum tour with paleontological curation',
      'Mount Entoto forest hike & St. Mary Church exploration',
      'Holy Trinity Cathedral stained-glass art & Imperial tombs',
      'Wandering the bustling alleys of Merkato (Africa’s largest open-air market)',
      'Meskel Square cultural gatherings and historic landmarks'
    ],
    keyAttractions: ['National Museum of Ethiopia', 'Unity Park & Palace', 'Mount Entoto Park', 'Holy Trinity Cathedral', 'Addis Merkato', 'Meskel Square', 'Tomoca Coffee House', 'Red Terror Martyrs Memorial Museum'],
    cultureAndHeritage: 'Addis Ababa is the proud seat of the African Union and UN ECA. It blends every Ethiopian ethnic culture, traditional garment shops (Habesha Kemis), and live jazz clubs.',
    localFoodHighlights: ['Special Clay Pot Shekla Tibs', 'Authentic Kitfo with Gomen & Ayib', 'Tomoca Espresso & Jebena Coffee', 'Traditional Tej (Honey Wine)'],
    bestTimeToVisit: 'Year-round; October to May offers dry, sunny highland weather.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Always carry small Birr bills for markets', 'Dress warmly for cool evening highland temperatures', 'Try coffee at historical Tomoca roasteries', 'Use trusted local drivers arranged through Bridge Ethiopia'],
    coordinates: { lat: 9.0320, lng: 38.7480 },
    elevation: '2,355 m (7,726 ft)',
    nearbyLodging: ['Boutique 5-Star Luxury Stays', 'Bole District Heritage Guesthouses', 'Addis International Suites', 'Curated Private City Villas'],
    availableTourIds: ['addis-city-essence', 'addis-food-coffee-trail', 'entoto-unity-heritage'],
    featured: true,
  },
  {
    id: 'wenchi-crater-lake',
    name: 'Wenchi Crater Lake',
    oromoName: 'Haroo Wonchii',
    region: 'oromia',
    regionLabel: 'Oromia Highlands',
    heroImage: wenchiImg,
    gallery: [wenchiImg],
    tagline: 'Paradise Alpine Crater Lake with Island Monasteries and Hot Springs',
    description: 'Located in the Oromia region approximately 155 km west of Addis Ababa, Wenchi is an extinct volcanic caldera featuring a crystal-clear crater lake, lush valleys, waterfalls, hot mineral springs, and hospitable Oromo highland farming communities.',
    whyVisit: [
      'Breathtaking volcanic caldera views from 3,000 meters altitude',
      'Horseback riding along scenic mountain trails down to the lake shore',
      'Traditional wooden canoe ride to the historic island monastery of Cherkos',
      'Natural mineral hot springs and pristine mountain air'
    ],
    thingsToDo: [
      'Caldera rim horseback riding and guided mountain trekking',
      'Traditional boat crossing to the 15th-century island church',
      'Picnic beside natural waterfalls and geothermal hot springs',
      'Experience local Oromo honey, fresh dairy, and highland hospitality'
    ],
    keyAttractions: ['Wenchi Caldera Rim Viewpoint', 'Cherkos Island Monastery', 'Natural Mineral Hot Springs', 'Alpine Waterfalls', 'Wonchi Eco-Lodge'],
    cultureAndHeritage: 'Wenchi was awarded UNWTO Best Tourism Village for its community-based eco-tourism, organic agricultural practices, and preservation of Oromo traditions.',
    localFoodHighlights: ['Organic Highland Wild Honey', 'Fresh Traditional Marqaa and Milk', 'Freshly Baked Defo Dabo'],
    bestTimeToVisit: 'October through April for clear skies and vibrant green alpine scenery.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Wear sturdy hiking boots for the steep caldera descent', 'Hire a local Oromo horse handler to support community livelihoods', 'Bring layers for sudden cool highland winds'],
    coordinates: { lat: 8.7989, lng: 37.9008 },
    elevation: '3,000 m (9,840 ft)',
    nearbyLodging: ['Wonchi Eco-Tourism Community Lodge', 'Highland Crater Cabanas', 'Boutique Lakeside Stays'],
    availableTourIds: ['wenchi-caldera-trek', 'oromia-highlights-safari'],
    featured: true,
  },
  {
    id: 'bale-mountains',
    name: 'Bale Mountains National Park',
    oromoName: 'Gaarreewwan Baalee',
    region: 'oromia',
    regionLabel: 'Oromia Wilderness',
    heroImage: baleImg,
    gallery: [
      baleImg,
      tourBaleImg
    ],
    tagline: 'Roof of Africa: Home to the Rare Ethiopian Wolf and Harenna Cloud Forest',
    description: 'Bale Mountains is a UNESCO World Heritage site comprising afro-alpine moorlands on the Sanetti Plateau and the mystical, moss-draped Harenna Cloud Forest. It is the premier habitat for the world’s rarest canid: the Ethiopian Red Wolf (Ky Kebero).',
    whyVisit: [
      'Highest density of endemic Ethiopian Wolves anywhere on Earth',
      'The Sanetti Plateau: Africa’s largest continuous alpine moorland over 4,000m',
      'Enchanting Harenna Forest with wild Arabica coffee and unique bird species',
      'Mount Tullu Dimtu (4,377m), the second-highest peak in Ethiopia'
    ],
    thingsToDo: [
      'Wildlife safari to spot Ethiopian Wolves, Mountain Nyala, and Menelik’s Bushbuck',
      'Hiking and horseback trekking across afro-alpine plateau trails',
      'Birdwatching for over 16 endemic Ethiopian avian species',
      'Tasting wild Harenna forest honey and shade-grown Arabica coffee'
    ],
    keyAttractions: ['Sanetti Afro-Alpine Plateau', 'Harenna Cloud Forest', 'Mount Tullu Dimtu', 'Dinsho Wildlife Sanctuary', 'Web Valley Waterfall'],
    cultureAndHeritage: 'The Oromo pastoralists around Bale have coexisted with wildlife for centuries, utilizing Gadaa environmental stewardship practices to preserve grazing lands.',
    localFoodHighlights: ['Forest Wild Bamboo Shoots', 'Organic Oromo Mountain Butter & Marqaa', 'Pure Highland Forest Honey'],
    bestTimeToVisit: 'November to March for dry weather and optimal wolf viewing conditions.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Requires warm thermal clothing as temperatures drop below freezing at night', 'A 4WD vehicle is essential for navigating the plateau roads'],
    coordinates: { lat: 6.8722, lng: 39.7344 },
    elevation: '4,377 m at peak',
    nearbyLodging: ['Bale Cloud Forest Eco-Lodges', 'Dinsho Sanctuary Guesthouses', 'Goba Mountain Retreats'],
    availableTourIds: ['bale-mountains-expedition', 'oromia-highlights-safari'],
    featured: true,
  },
  {
    id: 'sof-omar-cave',
    name: 'Sof Omar Cave',
    oromoName: 'Holqa Soof Umar',
    region: 'oromia',
    regionLabel: 'Oromia Wonder',
    heroImage: sofOmarImg,
    gallery: [sofOmarImg],
    tagline: 'Africa’s Longest Underground Cave Network & Spiritual Sanctuary',
    description: 'Carved over millennia by the subterranean Weyib River through limestone cliffs, Sof Omar spans 15.1 kilometers of interconnected underground chambers, arched pillars, and dramatic vaulted caverns revered both geologically and spiritually.',
    whyVisit: [
      'Walk through the dramatic "Chamber of Columns" with limestone cathedral pillars',
      'Witness where the roaring Weyib River plunges underground into total darkness',
      'Discover sacred Islamic shrine history dedicated to Sheikh Sof Omar Ahmed',
      'Experience one of the natural wonders featured on the Bridge Ethiopia emblem'
    ],
    thingsToDo: [
      'Guided subterranean spelunking through illuminated main galleries',
      'Photography of natural skylights and subterranean limestone arches',
      'Learn about local Oromo history and pilgrimage traditions',
      'Riverbank birding and wildlife exploration around the cave entrance'
    ],
    keyAttractions: ['Chamber of Columns', 'Weyib River Underground Sinkhole', 'Shrine of Sheikh Sof Omar', 'Great Archway Entrance'],
    cultureAndHeritage: 'An ancient spiritual crossroads sacred to Oromo traditional beliefs and later dedicated as an Islamic sanctuary by the 12th-century Sufi teacher Sheikh Sof Omar.',
    localFoodHighlights: ['Traditional Roasted Goat / Tibs', 'Oromo Spiced Flatbreads', 'Fresh Camel Milk (regional)'],
    bestTimeToVisit: 'October to February when river water levels are low and safe for walking.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Bring a powerful waterproof headlamp or flashlight', 'Wear non-slip footwear suitable for wet subterranean stones', 'Always follow the certified local guide'],
    coordinates: { lat: 6.9056, lng: 40.8497 },
    elevation: '1,300 m',
    nearbyLodging: ['Boutique Lodging in Robe and Goba', 'Designated Park Eco-Camps'],
    availableTourIds: ['bale-mountains-expedition', 'oromia-highlights-safari'],
    featured: false,
  },
  {
    id: 'lalibela',
    name: 'Lalibela Rock-Hewn Churches',
    amharicName: 'ላሊበላ',
    region: 'northern-ethiopia',
    regionLabel: 'Northern Heritage',
    heroImage: lalibelaImg,
    gallery: [
      lalibelaImg,
      tourLalibelaImg
    ],
    tagline: 'The Eighth Wonder of the World: 11 Monolithic Churches Carved from Solid Rock',
    description: 'Lalibela is an awe-inspiring 12th-century sacred pilgrimage city carved entirely out of pink volcanic tuff by King Gebre Mesqel Lalibela to serve as a "New Jerusalem" in the rugged highlands of Wollo.',
    whyVisit: [
      'Stand before the iconic cross-shaped Bet Giyorgis (Church of Saint George)',
      'Walk through ancient underground tunnels connecting monolithic cathedrals',
      'Witness living spiritual devotion with priests in white Netela robes',
      'Experience vibrant Christmas (Genna) and Timkat pilgrimage ceremonies'
    ],
    thingsToDo: [
      'Explore Northern, Eastern, and Western church groups with expert historians',
      'Visit Bet Medhane Alem, the largest monolithic rock-hewn church in the world',
      'Mule trek up to the mountain monastery of Asheton Maryam',
      'Attend an atmospheric early morning Ge’ez liturgical chant and drum prayer'
    ],
    keyAttractions: ['Bet Giyorgis (St. George)', 'Bet Medhane Alem', 'Bet Maryam', 'Bet Golgotha & Trinity', 'Asheton Maryam Mountain Monastery', 'Yemrehana Krestos Cave Church'],
    cultureAndHeritage: 'A UNESCO World Heritage site since 1978. It remains an active holy place of worship for millions of Ethiopian Orthodox Christians with living traditions unchanged for 900 years.',
    localFoodHighlights: ['Fasting Beyaynetu with 12 Spiced Stews', 'Tej from historic Lalibela taverns (Ben Abeba)', 'Doro Wat cooked for holiday feasts'],
    bestTimeToVisit: 'October to March (especially January for Genna and Timkat festivals).',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Remove shoes before stepping onto church carpets (slip-on socks recommended)', 'Wear a white cotton scarf/shawl (Netela) out of respect when visiting sanctuaries', 'Hire a certified local licensed historical guide'],
    coordinates: { lat: 12.0319, lng: 39.0412 },
    elevation: '2,500 m',
    nearbyLodging: ['Cliffside Valley-View Lodges', 'Boutique Mountain Eco-Lodges', 'Historic Lalibela Guesthouses'],
    availableTourIds: ['lalibela-historic-route', 'northern-ethiopia-grand-circuit'],
    featured: true,
  },
  {
    id: 'simien-mountains',
    name: 'Simien Mountains National Park',
    amharicName: 'ስሜን ተራሮች',
    region: 'northern-ethiopia',
    regionLabel: 'Northern Highlands',
    heroImage: simienImg,
    gallery: [
      simienImg,
      gallerySimienImg
    ],
    tagline: 'The Chess Pieces of the Gods: Dramatic Gorges & Endemic Gelada Baboons',
    description: 'A UNESCO World Heritage natural park characterized by massive escarpments dropping over 1,500 meters into jagged ravines. Home to Ras Dejen (4,550m), charismatic vegetarian Gelada "bleeding-heart" baboons, and the endangered Walia Ibex.',
    whyVisit: [
      'Sit peacefully among gentle, friendly troops of wild Gelada Baboons',
      'Witness vertical 1,000-meter precipices at Imet Gogo viewpoint',
      'Spot the magnificent Walia Ibex and Lammergeier (Bearded Vulture) soaring on thermals',
      'Trek to Ras Dejen, the highest point in Ethiopia'
    ],
    thingsToDo: [
      'Trekking from Sankaber to Geech and Chennek escarpments',
      'Stand at Jinbar Waterfall lookout dropping into an abyss',
      'Camp under crystal clear starry afro-alpine night skies',
      'Summit Mount Bwahit (4,430m) or Ras Dejen (4,550m)'
    ],
    keyAttractions: ['Imet Gogo Viewpoint', 'Jinbar Waterfall', 'Chennek Camp & Bwahit Pass', 'Sankaber Escarpment', 'Ras Dejen Peak'],
    cultureAndHeritage: 'Ancient mountain communities maintain high-altitude barley farming, stone villages, and unique Amhara folklore in the roof of Africa.',
    localFoodHighlights: ['Hearty Barley Porridge (Kolo & Genfo)', 'Highland Potato and Carrot Wats', 'Hot Spiced Chai and Coffee by the Campfire'],
    bestTimeToVisit: 'October to April for dry trails, lush wildflower carpets, and clear valley panoramas.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Trekking requires an official park scout and local guide', 'Pack serious high-altitude cold weather gear for sub-zero nights'],
    coordinates: { lat: 13.2500, lng: 38.3667 },
    elevation: 'Up to 4,550 m',
    nearbyLodging: ['Escarpment Eco-Lodges (at 3,260m)', 'Luxury Cliffside Stays', 'Wilderness Camps (Geech, Chennek)'],
    availableTourIds: ['simien-trekking-adventure', 'northern-ethiopia-grand-circuit'],
    featured: true,
  },
  {
    id: 'gondar',
    name: 'Gondar: Imperial Castles & Royal Heritage',
    amharicName: 'ጎንደር - የመካከለኛው ዘመን ቤተመንግሥቶች እና ደብረ ብርሃን ሥላሴ',
    region: 'northern-ethiopia',
    regionLabel: 'Northern Imperial Circuit',
    heroImage: '',
    gallery: [],
    isChronicleOnly: true,
    tagline: 'The Camelot of Africa, 17th-Century Imperial Palaces & The Angelic Ceiling of Debre Berhan Selassie',
    description: 'Founded in 1636 by Emperor Fasilides, Gondar served for over two centuries as the glorious imperial capital of Ethiopia, transforming the empire from a roving royal tent encampment tradition into a permanent city of stone palaces and monumental fortifications. Known historically as the "Camelot of Africa," the city flourished under successive monarchs who erected their own distinct castles, libraries, and ceremonial banquet halls within the UNESCO-inscribed Fasil Ghebbi Royal Enclosure. Gondar became the intellectual and artistic center of the realm, celebrated for its unique syncretic Gondarine architecture (fusing Axumite stone-masonry, Portuguese Jesuit engineering, Moorish decorative arches, and Indian Baroque elements), world-renowned ecclesiastical music schools, and the immortal ceiling of Debre Berhan Selassie church, where 104 winged angelic cherubim gaze down upon worshippers with all-seeing compassion.',
    whyVisit: [
      'Stand within the 70,000-square-meter UNESCO Fasil Ghebbi Royal Enclosure containing six stone castles, libraries, and royal chancelleries',
      'Gaze upward into the compassionate black eyes of the 104 winged angel faces painted on the wooden ceiling of Debre Berhan Selassie Church',
      'Walk the peaceful sunken stone terraces of Fasilides’ Bath, enveloped by centuries-old giant sycamore and weeping fig roots',
      'Explore Empress Mentewab’s Kuskuam Palace ruins on the cool northern heights overlooking the entire Gondar valley',
      'Immerse yourself in authentic evening Azmari-bet music taverns, where master bards playfully weave improvised poetic couplets with the single-stringed Masinko violin',
      'Gateway staging point for high-altitude trekking into the Simien Mountains National Park'
    ],
    thingsToDo: [
      'Undertake an in-depth architectural and historical exploration through the fortified towers, royal bedrooms, and stone banqueting halls of Emperor Fasilides’ castle',
      'Study the vivid biblical narrative murals and Ge’ez parchment illuminations created by master painter Haile Meskel inside Debre Berhan Selassie',
      'Visit the historic sunken stone reservoir of Fasilides’ Bath, witnessing the tranquil reflections and ancient tree roots embraced into the stone ramparts',
      'Ascend to the ruins of Kuskuam Monastery and Palace complex, learning about Empress Mentewab’s visionary patronage of art, architecture, and international diplomacy',
      'Spend an unforgettable cultural evening at a traditional Azmari music house, sipping honey Tej while interacting with master acoustic minstrels',
      'Stroll through the historic Italian-era Piazza and bustling local spice markets offering prized Gondar berbere blends and mountain herbs'
    ],
    keyAttractions: ['Fasil Ghebbi Royal Enclosure (UNESCO)', 'Debre Berhan Selassie Church (Angelic Ceiling)', 'Fasilides’ Bath (Timkat Epiphany Reservoir)', 'Kuskuam Palace Complex & Empress Mentewab Sanctuary', 'Historic Arada & Traditional Azmari-Bet Music Taverns'],
    cultureAndHeritage: 'An imperial capital from 1636 to 1855, famous for ecclesiastical scholarship, classical Gondarine painting, and the Azmari acoustic music tradition of "Wax and Gold" poetic wit.',
    localFoodHighlights: ['Highland Special Sizzling Tibs', 'Traditional Tej (Honey Wine) with Masinko performance', 'Authentic Shiro Tegamino with Teff Injera'],
    bestTimeToVisit: 'October to April for clear highland skies; January 18–20 for the grand Timkat (Epiphany) spiritual festival.',
    suggestedDuration: '2 - 3 Days',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Do not miss the evening Azmari music bars where bards improvise humorous songs about guests', 'Modest attire covering shoulders and knees is required when entering sacred church grounds'],
    coordinates: { lat: 12.6080, lng: 37.4673 },
    elevation: '2,133 m (6,998 ft)',
    nearbyLodging: ['Panoramic Hillside Castle-View Lodges', 'Regional Heritage Guesthouses', 'Boutique Imperial Stays'],
    availableTourIds: ['northern-ethiopia-grand-circuit', 'timkat-festival-special'],
    featured: true,
    chronicle: {
      historicalOrigins: 'In 1636, Emperor Fasilides broke with centuries of mobile imperial tradition—where emperors moved their courts continuously in vast tent encampments across the Ethiopian highlands—and decreed Gondar as the permanent imperial capital. Legend recounts that an archangel led Fasilides to a tranquil water spring where a water buffalo lay resting, prophesying that a great capital city would rise upon that very spot. For over 200 years (1636–1855), Gondar stood as the political, administrative, and cultural apex of the Ethiopian Empire, housing upwards of 60,000 citizens and welcoming ambassadors from Europe, India, and the Ottoman Empire.',
      architecturalMastery: 'The Fasil Ghebbi Royal Enclosure is encircled by a 900-meter-long stone curtain wall pierced by twelve historic guarded gates. Within this compound rise six distinct royal stone castles, three churches, chancelleries, stables, and lion houses. The architecture is utterly unique in sub-Saharan Africa—a synthesis combining native Axumite dressed-stone techniques with Portuguese Jesuit stone-masonry, Moorish horseshoe arches, and Indo-Portuguese detailing. Fasilides’ Castle is a three-story fortress of basalt stone crowned with four round corner towers and crenelated parapets. Adjacent to it stand Emperor Yohannes I’s Library and Chancellery, Iyasu the Great’s saddle-backed palace (once lined with ivory, Venetian mirrors, and gold leaf), Emperor Dawit’s Song Hall, and Empress Mentewab’s two-story imperial residence.',
      sacredTraditions: 'Of the forty-four churches founded during Gondar’s golden age, Debre Berhan Selassie ("Trinity and Mountain of Light") stands supreme. Constructed by Emperor Iyasu I in the late 17th century, it was the only major Gondar sanctuary saved from destruction during the 1888 Sudanese Dervish (Mahdist) invasion, when according to deep local belief, a massive swarm of bees emerged from the church rafters and routed the attacking army. The rectangular stone church is crowned with the world’s most celebrated ecclesiastical ceiling: 104 winged angel faces painted on heavy cedar beams, all gazing in different directions with wide, observant, almond-shaped eyes that symbolize the omnipresent vigil of God watching over all living souls. The surrounding walls are covered in brilliant tempera murals depicting the Passion of Christ, Saint George slaying the dragon, and rows of early Christian martyrs.',
      livingEcosystem: 'Gondar is the undisputed spiritual homeland of the Azmari—traditional Ethiopian poet-musicians who sing accompanied by the Masinko (a diamond-shaped, single-stringed horsehair fiddle) and the Kebero drum. In historic Azmari-bets across the Arada and Piazza neighborhoods, travelers witness spontaneous musical wit and the ancient art of "Sem-ina-Worq" (Wax and Gold)—a poetic linguistic technique where verses carry an overt surface meaning (the wax) and a hidden, brilliant double-entendre or political critique (the gold). Gondar also remains the national center of the January Timkat (Epiphany) celebration, where the sacred Tabot replicas are escorted overnight to Fasilides’ Bath, culminating in the joyous blessing and renewal of baptismal waters.',
      travelerAdvisory: 'Gondar is located at an altitude of 2,133 meters, enjoying pleasant, sunny daytime temperatures (22–26°C) and brisk, cool highland evenings. Allow at least two full days to immerse yourself in the Fasil Ghebbi enclosure, Debre Berhan Selassie, Fasilides’ Bath, and Kuskuam. Modest dress covering shoulders and knees is required when entering sacred church grounds; shoes must be removed at the church threshold. Hiring a certified local historical guide through Bridge Ethiopia is essential to decipher the centuries of political intrigue, royal lineages, and architectural symbolism.'
    }
  },
  {
    id: 'omo-valley',
    name: 'Lower Omo Valley',
    region: 'southern-ethiopia',
    regionLabel: 'Southern Cultures',
    heroImage: omoImg,
    gallery: [
      omoImg
    ],
    tagline: 'Living Cultural Heritage & Traditional Communities along the Omo River',
    description: 'A UNESCO World Heritage cultural landscape home to over eight distinct indigenous ethnic groups including the Hamer, Mursi, Karo, Dassanech, and Nyangatom. Renowned for rich body art, age-grade ceremonies, and pastoralist traditions.',
    whyVisit: [
      'Witness the ceremonial Hamer Bull Jumping coming-of-age ritual',
      'Learn about the cultural body painting traditions of the Karo people along the Omo River',
      'Visit the UNESCO-terraced cultural stone landscape of the Konso community',
      'Experience bustling tribal weekly trade markets at Key Afer and Dimeka'
    ],
    thingsToDo: [
      'Cultural homestay exchanges facilitated respectfully by Bridge Ethiopia local guides',
      'Participate in traditional evening Evangadi dance celebrations',
      'Explore Konso stone-walled terraced hillsides and carved wooden Waka grave markers',
      'Canoe crossing on the Omo River to visit Dassanech villages'
    ],
    keyAttractions: ['Hamer Traditional Villages', 'Karo River Bluff at Kolcho', 'Konso Cultural Terraces & Museum', 'Key Afer Weekly Market', 'Mago National Park'],
    cultureAndHeritage: 'One of the most culturally diverse anthropological regions on the planet, maintaining traditions that have persisted for centuries.',
    localFoodHighlights: ['Sorghum & Maize Porridge with Herb Infusions', 'Traditional Pastoralist Goat Broth', 'Locally Brewed Parsa & Coffee Leaf Infusions'],
    bestTimeToVisit: 'August to October and December to March (avoid heavy rainy season when roads get muddy).',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Always travel with a sensitive, respectful local guide', 'Ask permission before taking portraits and adhere to community photo guidelines', 'Support local artisan co-ops directly'],
    coordinates: { lat: 4.8864, lng: 36.2167 },
    elevation: '500 to 1,200 m',
    nearbyLodging: ['Boutique Riverbank Lodges in Turmi', 'Panoramic Lakeview Lodges in Arba Minch', 'Eco Safari Camps in Jinka'],
    availableTourIds: ['omo-valley-cultural-odyssey', 'southern-ethiopia-tribal-safari', 'southern-ethiopia-grand-circuit'],
    featured: true,
  },
  {
    id: 'arba-minch-dorze',
    name: 'Arba Minch, Lake Chamo & Dorze Highlands',
    amharicName: 'አርባ ምንጭ እና ዶርዜ',
    region: 'southern-ethiopia',
    regionLabel: 'Southern Rift Valley & Lakes',
    heroImage: arbaMinchImg,
    gallery: [
      arbaMinchImg,
      omoImg
    ],
    tagline: 'Forty Springs, Lake Chamo Crocodile Safari & Dorze Bamboo Mountain Villages',
    description: 'Nestled between Lake Abaya and Lake Chamo in the Great Rift Valley, Arba Minch is the scenic hub of Southern Ethiopia. Take a boat safari to see giant Nile crocodiles and hippos, explore Nechisar National Park plains, and ascend the misty Chencha highlands to experience the towering bamboo beehive houses and Enset (false banana / Kocho) bread traditions of the Dorze master weavers.',
    whyVisit: [
      'Boat safari on Lake Chamo to witness giant Nile crocodiles up to 6 meters and pods of hippos',
      'Visit high-altitude Dorze villages with 12-meter tall woven bamboo houses shaped like elephant heads',
      'Learn hands-on baking of traditional Kocho flatbread from the Enset (false banana) plant',
      'Panoramic views over the "Bridge of God" isthmus separating Lake Abaya and Lake Chamo'
    ],
    thingsToDo: [
      'Lake Chamo wildlife boat cruise to the famous crocodile market sanctuary',
      'Dorze community homestay, cotton spinning, and traditional bamboo distillation',
      'Hike through the 40 natural crystal-clear underground springs in the lush groundwater forest',
      'Taste freshly baked Kocho with spicy chili dip and local honey wine'
    ],
    keyAttractions: ['Lake Chamo Crocodile Sanctuary', 'Dorze High-Altitude Village & Beehive Homes', 'Nechisar National Park Plains', 'Forty Springs Natural Groundwater Forest', 'Chencha Mountain Market'],
    cultureAndHeritage: 'Home to the Gamo and Dorze peoples, renowned for their intricate hand-woven cotton textiles (Shemma), communal singing, and sustainable bamboo architecture that can last for generations.',
    localFoodHighlights: ['Fresh Lake Chamo Tilapia Fried with Local Spices', 'Warm Kocho (Enset / False Banana Flatbread)', 'Bula Porridge with Spiced Butter', 'Dorze Distilled Arake Herbal Liquor'],
    bestTimeToVisit: 'October through May for dry hiking weather and prime wildlife viewing.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Bring a light layer for the cooler Chencha highlands', 'Buy authentic hand-woven cotton scarves directly from Dorze weaver cooperatives'],
    coordinates: { lat: 6.0333, lng: 37.5500 },
    elevation: '1,285 m (Arba Minch) to 2,900 m (Chencha Dorze)',
    nearbyLodging: ['Panoramic Cliffside Lakeview Lodges in Arba Minch', 'Traditional Dorze Mountain Eco-Lodges', 'Rift Valley Safari Resorts'],
    availableTourIds: ['arba-minch-dorze-chamo-safari', 'southern-ethiopia-grand-circuit'],
    featured: true,
  },
  {
    id: 'konso-cultural-landscape',
    name: 'Konso Cultural Landscape: Ancient Terraced Settlements (UNESCO)',
    amharicName: 'የኮንሶ ባሕላዊ መልክዓ ምድር - የጥንታዊ እርከኖች እና ዋቃ ሐውልቶች',
    region: 'southern-ethiopia',
    regionLabel: 'Southern Heritage Terraces',
    heroImage: '',
    gallery: [],
    isChronicleOnly: true,
    tagline: '400 Years of Dry-Stone Agricultural Terraces, Fortified Walled Villages & Sacred Carved Waka Statues',
    description: 'The Konso Cultural Landscape is a living, 55-square-kilometer UNESCO World Heritage site situated in the arid Southern Rift Valley highlands of Ethiopia. Over 21 uninterrupted generations spanning more than 400 years, the Konso people have engineered one of humanity’s greatest indigenous soil and water conservation systems: an awe-inspiring network of monumental dry-stone agricultural terraces rising up to 5 meters in height, blanketing entire mountain slopes. Within this sculpted landscape sit historic fortified hilltop stone villages (Kanta) encircled by up to six concentric stone walls, communal two-story gathering pavilions (Mora), sacred generation timber poles (Olayta), and world-famous anthropomorphic wooden funerary statues (Waka) erected to honor clan heroes and revered leaders.',
    whyVisit: [
      'Witness four centuries of master dry-stone engineering across hundreds of continuous hillside agricultural terraces designated by UNESCO',
      'Explore fortified stone villages (Kanta) nestled atop mountain ridges, entered through narrow stone passages and defensive ramparts',
      'Learn about the sacred anthropomorphic wooden "Waka" funerary statues sculpted to immortalize deceased warrior heroes and chiefs',
      'Sit within the monumental two-story wooden Mora pavilions—the communal heart of Konso democratic councils and young men’s night watches',
      'Observe the sacred Olayta generation poles erected every 18 years in the village square as a living historical tree calendar',
      'Visit the otherworldly, wind-sculpted natural sandstone pinnacles and jagged labyrinths of the Gesergiyo "New York" canyon'
    ],
    thingsToDo: [
      'Walk through the labyrinthine stone-paved lanes and thatched homesteads of Dokatu or Mecheke village with a native Konso community guide',
      'Visit the Konso Cultural Heritage Museum to study original antique Waka wooden statues, ritual costumes, and historical tools',
      'Hike along the ancient stone water-retaining terraces to examine how indigenous farmers intercrop sorghum, maize, coffee, and wild Moringa trees',
      'Taste traditional steamed sorghum and Moringa dumplings (Kurkufa) accompanied by a refreshing sip of light sorghum brew (Parsa)',
      'Learn about the traditional nine-clan egalitarian democratic governance system that has maintained communal peace and shared terrace labor for centuries',
      'Explore the dramatic natural pink and cream sandstone canyon formations at Gesergiyo, sculpted by seasonal flash floods over millennia'
    ],
    keyAttractions: ['UNESCO Terraced Dry-Stone Walls', 'Fortified Hilltop Villages (Kanta)', 'Cultural Heritage Museum & Antique Waka Wood Sculptures', 'Mora Council Gathering Pavilions', 'Gesergiyo Sandstone Canyons', 'Sacred Olayta Generation Poles'],
    cultureAndHeritage: 'Maintains an unbroken egalitarian social system with generation age-grades, sacred clan lineage, and master stone engineering that prevents mountain soil erosion.',
    localFoodHighlights: ['Steamed Sorghum Balls with Wild Moringa Leaves (Kurkufa)', 'Refreshing Sorghum Beverage (Parsa)', 'Roasted Highland Barley and Legumes'],
    bestTimeToVisit: 'Year-round; ideal from September to March during clear harvest months.',
    suggestedDuration: '1 - 2 Days',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Respect local village customs and hire an official community guide', 'Visit the regional weekly market on Monday or Thursday for an unforgettable cultural sight'],
    coordinates: { lat: 5.3333, lng: 37.4833 },
    elevation: '1,400 to 1,750 m (4,593 - 5,741 ft)',
    nearbyLodging: ['Hillside Eco-Lodges', 'Community Stone Guesthouses', 'Arba Minch Gateway Lodges'],
    availableTourIds: ['omo-valley-cultural-odyssey', 'southern-ethiopia-grand-circuit'],
    featured: true,
    chronicle: {
      historicalOrigins: 'The Konso people established their civilization in these dry, rocky hills more than 400 years ago, facing extreme soil erosion, steep terrain, and scarce, erratic rainfall. Rather than abandoning the arid environment, they engineered an extraordinary sustainable agro-ecological system that transformed steep, hostile mountain slopes into bountiful agricultural lands. Konso society is organized into nine exogamous clans governed by hereditary spiritual chiefs (Poqallas) alongside an egalitarian democratic council of generational age-grades, ensuring that terrace maintenance and communal resources are shared equitably across the community.',
      architecturalMastery: 'The dry-stone terracing of Konso is an engineering masterpiece constructed entirely by hand without mortar or cement. Stone retaining walls range from 1 to 5 meters in height, designed with subtle inward inclinations to catch seasonal runoff, store subsoil moisture, prevent catastrophic landslips, and retain topsoil. The fortified hilltop settlements (Kanta) were constructed as defensive stone fortresses on high ridges to protect against neighboring tribal raids. Each village is encircled by up to six concentric stone walls with narrow, easily defended entrance gateways. Inside, dense clusters of conical thatched dwellings with double-layered roofs line winding, stone-walled alleyways, centered around broad paved plazas hosting the Mora.',
      sacredTraditions: 'The Konso are globally famous for their "Waka" (or Wa\'a)—carved anthropomorphic wooden statues erected above graves and along prominent hill paths. Carved from termite-resistant hardwood, the central statue depicts a deceased heroic warrior, clan elder, or Poqalla chief, characterized by wide almond eyes and carved phallic foreheads symbolizing virility and leadership. Flanking the hero are smaller carved statues representing his wives, fallen adversaries he overcame in battle, and formidable wild animals (such as lions or leopards) he successfully hunted. Another sacred pillar is the Olayta generation tree—tall juniper or eucalyptus trunks brought from sacred forests and hoisted upright in the village Mora every 18 years when the incoming generation attains political adulthood.',
      livingEcosystem: 'The Konso agricultural ecosystem is a model of sustainable agroforestry. On each terraced step, crops are grown in multi-tiered layers: towering Moringa stenopetala trees (the miracle "cabbage tree" whose vitamin-rich leaves are eaten daily) provide light shade for shade-grown Arabica coffee, cotton, and pigeon peas, beneath which grow drought-resistant red sorghum and finger millet. Farm animals are kept inside household pens to collect animal manure, which is meticulously carried by hand to fertilize the terraces.',
      travelerAdvisory: 'Konso is situated at an elevation between 1,400 and 1,750 meters, with warm daytime temperatures and pleasant, breezy nights. The town of Karat-Konso serves as the administrative base, offering comfortable community-run eco-lodges. When visiting fortified villages, travelers must be accompanied by a licensed Konso community guide to respect family privacy and local customs. Wear comfortable, grippy walking shoes for stone steps and uneven hillside paths. The bustling regional markets on Mondays and Thursdays in Karat and surrounding villages are vibrant, colorful gatherings.'
    }
  },
  {
    id: 'harar',
    name: 'Harar Jugol: The Walled City',
    amharicName: 'ሐረር',
    oromoName: 'Harar',
    region: 'eastern-ethiopia',
    regionLabel: 'Eastern Crossroads',
    heroImage: hararImg,
    gallery: [
      hararImg,
      tourHararImg
    ],
    tagline: 'The 4th Holiest City in Islam with 82 Mosques and Famous Hyena Men',
    description: 'Harar Jugol is a fortified 16th-century historic walled city in eastern Ethiopia featuring 368 narrow cobbled alleyways, colorful traditional Harari living rooms (Gegar), vibrant spice markets, and the ancient nightly ritual of feeding wild spotted hyenas.',
    whyVisit: [
      'Wander through 368 pastel-painted maze-like alleyways within the historic 16th-century walls',
      'Experience the thrilling nightly feeding of wild spotted hyenas by the master Hyena Men',
      'Visit the Arthur Rimbaud Cultural Museum and the house of Ras Makonnen',
      'Savor world-class Harar Longberry sun-dried specialty coffee and fragrant spice blends'
    ],
    thingsToDo: [
      'Evening Hyena feeding experience just outside Fallana Gate',
      'Tour traditional Harari Adare houses with decorated wall niches and woven baskets',
      'Visit the bustling Shoa Gate and spice markets filled with cardamom, cloves, and rue',
      'Sample Harari street food, samosas, and freshly roasted coffee'
    ],
    keyAttractions: ['Harar Jugol Fortified City Walls & 5 Gates', 'Hyena Feeding Arena', 'Arthur Rimbaud Cultural Center', 'Jamia Grand Mosque', 'Harari Traditional Heritage Guesthouses', 'Spice Markets'],
    cultureAndHeritage: 'Inscribed as a UNESCO World Heritage site in 2006. Harar served as an independent sultanate and vital trade junction connecting the Horn of Africa, Arabia, and the Indian Ocean.',
    localFoodHighlights: ['Harari Hulbat Marakh (Spiced Lamb Stew)', 'Harar Longberry Arabica Coffee', 'Sambusa and Fresh Spiced Flatbreads', 'Halawa Harari Sweet Confection'],
    bestTimeToVisit: 'October through April for dry, pleasant weather.',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Stay in a restored traditional Harari Gegar guesthouse for maximum authenticity', 'Evening hyena feeding is safe and conducted with lifelong local practitioners'],
    coordinates: { lat: 9.3139, lng: 42.1182 },
    elevation: '1,885 m',
    nearbyLodging: ['Traditional Harari Cultural Gegar Guesthouses', 'Historic Walled City Heritage Homes', 'Harar Boutique Stays'],
    availableTourIds: ['harar-walled-city-coffee-trail', 'eastern-ethiopia-explorer'],
    featured: true,
  },
  {
    id: 'danakil-depression',
    name: 'Danakil Depression & Dallol',
    region: 'afar-danakil',
    regionLabel: 'Afar Geothermal Marvel',
    heroImage: danakilImg,
    gallery: [
      danakilImg,
      tourDanakilImg
    ],
    tagline: 'An Alien Planet on Earth: Fluorescent Sulfur Springs, Salt Flats & Erta Ale Volcano',
    description: 'The Danakil Depression sits 125 meters below sea level at the junction of three tectonic plates. It features surreal neon-yellow Dallol hydrothermal acid springs, endless blinding-white salt flats mined by Afar camel caravans, and the active Erta Ale lava lake.',
    whyVisit: [
      'Marvel at Dallol’s vivid psychedelic sulfur, potassium, and salt formations',
      'Peer into the bubbling fiery molten lava lake of Erta Ale Volcano at night',
      'Watch ancient Afar salt miners cutting salt slabs and leading 100-camel salt caravans',
      'Float on Lake Karum (Assale) during ethereal golden sunset reflections'
    ],
    thingsToDo: [
      '4WD expedition across the endless Danakil salt crust',
      'Nighttime hike to the caldera rim of Erta Ale Volcano',
      'Photograph the vibrant mineral ponds and sulfur chimneys of Dallol',
      'Visit traditional Afar nomadic settlements and learn their resilient culture'
    ],
    keyAttractions: ['Dallol Hydrothermal Mineral Fields', 'Erta Ale Active Shield Volcano', 'Lake Karum Salt Flat & Camel Caravans', 'Lake Afrera Geothermal Hot Springs'],
    cultureAndHeritage: 'Inhabited by the resilient Afar people who have managed trade routes and the traditional "Amole" salt extraction economy across the desert for centuries.',
    localFoodHighlights: ['Freshly Prepared Campfire Stews on the Salt Flats', 'Afar Spiced Goat Meat', 'Plenty of Fresh Water and Electrolytes'],
    bestTimeToVisit: 'November to February (temperatures are cooler; avoid summer when heat exceeds 48°C).',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Must be booked through experienced operators with 4WD convoy, Afar police escort, and cook', 'Bring plenty of hydration, sunscreen, and polarized sunglasses for salt glare'],
    coordinates: { lat: 14.2417, lng: 40.3000 },
    elevation: '-125 m below sea level',
    nearbyLodging: ['Basecamp open-air traditional rope beds under the stars', 'Curated Gateway Stays in Semera / Mekele'],
    availableTourIds: ['danakil-dallol-erta-ale-expedition'],
    featured: false,
  },
  {
    id: 'kafa-biosphere',
    name: 'Kafa Biosphere: Birthplace of Coffee',
    region: 'kafa-southwest',
    regionLabel: 'Southwestern Rainforests',
    heroImage: kafaImg,
    gallery: [kafaImg],
    tagline: 'Where Coffee was First Discovered: Ancient Rainforests & Wild Arabica Genetics',
    description: 'The ancient kingdom of Kafa is the legendary birthplace of Coffea Arabica where the goat herder Kaldi first discovered coffee. A UNESCO Biosphere Reserve of pristine cloud forests, waterfalls, wild coffee trees, and organic forest honey.',
    whyVisit: [
      'Walk through the exact ancient wild rainforest where Arabica coffee was born',
      'Learn about 5,000+ wild coffee genetic varieties preserved in natural undergrowth',
      'Experience traditional coffee ceremonies with fresh coffee leaves and forest spices',
      'Hike to lush waterfalls and spot rare Colobus monkeys in the dense canopy'
    ],
    thingsToDo: [
      'Wild Coffee Trail hiking through the ancient Bonga Forest',
      'Visit the Kafa National Coffee Museum and research center',
      'Taste single-origin wild forest honey and wild spices',
      'Explore the ancient Royal Palaces of the Kingdom of Kaffa'
    ],
    keyAttractions: ['Mankira Wild Coffee Discovery Site', 'Bonga Forest Waterfalls', 'National Coffee Museum Bonga', 'Tatmara Wild Coffee Plantation', 'God’s Bridge (Natural Stone Arch)'],
    cultureAndHeritage: 'Kafa preserves royal traditions, traditional beehive weaving in tree canopies, and sacred forest conservation practices.',
    localFoodHighlights: ['Wote (Coffee Leaf Tea) brewed with cardamom and ginger', 'Fresh Wild Bonga Forest Coffee', 'Enset (False Banana / Kocho) dishes with wild herbs'],
    bestTimeToVisit: 'October through April (coffee harvest occurs from November to January).',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: ['Ideal for specialty coffee enthusiasts and birdwatchers', 'Combine with a visit to Jimma and Oromia coffee plantations'],
    coordinates: { lat: 7.2792, lng: 36.2361 },
    elevation: '1,600 to 2,400 m',
    nearbyLodging: ['Rainforest Coffee Eco-Lodges', 'Organic Farm Guesthouses', 'Jimma Forest Retreats'],
    availableTourIds: ['kafa-coffee-birthplace-expedition', 'addis-food-coffee-trail'],
    featured: false,
  },
  {
    id: 'axum-historic',
    name: 'Aksum: Ancient Kingdom & Sacred Obelisks',
    amharicName: 'አክሱም - የጥንታዊ መንግሥት እና የታቦተ ጽዮን ማደሪያ',
    tigrinyaName: 'ኣኽሱም - ታሪኻዊ ማእከል ጥንታዊ ስልጣነን ጽዮን ማርያምን',
    region: 'tigray',
    regionLabel: 'Tigray Ancient Heritage',
    heroImage: '',
    gallery: [],
    isChronicleOnly: true,
    tagline: 'The Ancient Superpower of Antiquity, Towering Monolithic Granite Stelae & Guardian of the Ark of the Covenant',
    description: 'Aksum (Axum) is the monumental cradle of Ethiopian civilization, designated a UNESCO World Heritage site since 1980. Flourishing from the 4th century BC through the 10th century AD, the Aksumite Empire stood as one of the four great superpowers of the ancient world, ranked alongside Rome, Persia, and China by the 3rd-century Persian prophet Mani. Strategically commanding trade routes between the Mediterranean world, the Red Sea port of Adulis, and the Indian Ocean, Aksum minted its own gold, silver, and bronze coinage bearing portraits of its kings and royal mottos. The city is renowned for its soaring monolithic granite obelisks (stelae)—the tallest carved single stone monoliths ever quarried and erected by human civilization—as well as the sacred Church of Our Lady Mary of Zion, revered throughout the Ethiopian Orthodox world as the perpetual sanctuary of the biblical Ark of the Covenant (Tabote Tsion).',
    whyVisit: [
      'Stand before the world’s tallest carved monolithic stone obelisks, including King Ezana’s standing 24-meter granite stele and the monumental 520-ton Great Stele',
      'Pilgrimage to the holy Church of Our Lady Mary of Zion and the Chapel of the Tablet, eternal sanctuary of the Ark of the Covenant (Tabote Tsion)',
      'Walk the stone corridors and courtyard foundations of Dungur Palace, traditionally revered as the royal palace of Queen Makeda (Queen of Sheba)',
      'Descend into the underground royal tombs and multi-chambered granite catacombs of King Kaleb, Gebre Meskel, and the Tomb of the False Door',
      'Decipher the famous King Ezana Inscription Stone—an ancient trilingual stone monument carved in Ge’ez, Sabaean, and Ancient Greek celebrating military victories and early Christian conversion',
      'Visit the ancient May Shum reservoir, a vast stone-cut bathing pool that has supplied water and hosted baptismal rites for millennia'
    ],
    thingsToDo: [
      'Explore the Northern Stelae Park on a private guided archaeological tour, marveling at how 1,700-year-old artisans carved faux palace facades with functional-looking doors and wooden beam ends directly out of hard granite',
      'Visit the historic 17th-century Old Church of St. Mary of Zion built during Emperor Fasilides’ reign and view the crowns of Ethiopia’s ancient kings inside the treasury museum',
      'Witness early morning Ge’ez liturgical prayers and chants accompanied by silver sistra (Tsenatsil) and deep prayer drums outside the Zion sanctuary',
      'Walk through the sprawling archaeological complex of Dungur ruins, examining ancient water-drainage channels, royal kitchens, and stone staircases',
      'Hike to the hill of Bet Giyorgis and the ancient quarry of Wuchate Golo, where massive granite obelisks were detached using wooden wedges and water pressure',
      'Savor celebratory Tigray Tihlo (toasted barley dumplings eaten with two-pronged wooden sticks dipped in spiced lamb sauce) and pure white highland honey'
    ],
    keyAttractions: [
      'Northern Stelae Park & King Ezana’s Stele (24m Monolith)',
      'Church of Our Lady Mary of Zion (Chapel of the Tablet / Ark of the Covenant)',
      'Ancient Dungur Palace Ruins (Queen of Sheba’s Residence)',
      'May Shum Bedrock Reservoir & Ancient Queen’s Bath',
      'Subterranean Tombs of King Kaleb & King Gebre Meskel',
      'King Ezana Trilingual Inscription Stone (Ge’ez, Sabaean, Greek)',
      'Axum Archaeological Treasury Museum & Imperial Crowns'
    ],
    cultureAndHeritage: 'Inscribed as a UNESCO World Heritage site in 1980. For centuries, this northern kingdom served as the economic and spiritual crossroads connecting the Red Sea, Nile, and Arabian Peninsula. In 330 AD, Christianity was embraced as the state religion, minting gold coins inscribed in Ge’ez.',
    localFoodHighlights: ['Regional Special Tihlo (Roasted barley spheres dipped in hot spiced lamb stew)', 'Fasting Beyaynetu with Siljo & Gomen', 'Pure Highland White Honey & Tej (Honey Wine)'],
    bestTimeToVisit: 'October to April (especially November 30 for the sacred Hidar Zion pilgrimage festival).',
    suggestedDuration: '2 - 3 Days',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: [
      'Modest attire is expected; a white cotton scarf (Netela) is customary when visiting holy sanctuaries',
      'Direct daily flights operate between Addis Ababa (ADD) and the northern regional airport',
      'Combine with rock-hewn cliff churches and Lalibela for a complete northern historic journey'
    ],
    coordinates: { lat: 14.1278, lng: 38.7167 },
    elevation: '2,131 m (6,991 ft)',
    nearbyLodging: ['Boutique Heritage Guesthouses', 'Historic Stelae-View Stays', 'Comfortable Northern Circuit Hotels'],
    availableTourIds: ['axum-ancient-kingdom-pilgrimage', 'gheralta-tigray-cliff-churches-expedition'],
    featured: true,
    chronicle: {
      historicalOrigins: 'Aksum was the capital of a maritime and mercantile empire that controlled both sides of the southern Red Sea, extending across modern-day Ethiopia, Eritrea, Djibouti, eastern Sudan, and parts of the Arabian Peninsula (Yemen). Under King Ezana in approximately 330 AD, Aksum became one of the very first empires in world history to adopt Christianity as its state religion—preceding the official Christianization of the Roman Empire under Constantine. King Ezana commissioned coins and stone monuments where the pagan crescent-and-disk symbol was replaced with the Christian Cross. Ge’ez, the classical Semitic language of Aksum, developed its own unique vocalized syllabary (abugida) and became the liturgical and literary language of the Ethiopian realm.',
      architecturalMastery: 'The monolithic stelae of Aksum represent one of antiquity’s most astonishing feats of precision stone engineering. Quarried from the granite hillside of Wuchate Golo several kilometers away, these multi-hundred-ton single blocks of granite were transported across rugged valleys using rollers, levers, and elephants, and erected with sophisticated counterbalance ramps. Unlike Egyptian obelisks which taper smoothly, Aksumite stelae are intricately sculpted to replicate multi-story royal palaces: the base displays a carved false door complete with lock and knocker, above which rise multiple levels of simulated wooden floor beams ("monkey heads") and recessed palace windows, terminating in a rounded semicircular summit designed to hold embossed metal plates. King Ezana’s Stele (24 meters tall, 160 tons) stands perfectly upright today, while the colossal Great Stele (33 meters tall, weighing 520 tons) remains where it collapsed during erection in antiquity, making it the largest single block of stone ever attempted to be stood upright by humanity.',
      sacredTraditions: 'At the spiritual heart of Aksum stands the Church of Our Lady Mary of Zion (Maryam Tsion). According to the Kebra Nagast ("Glory of the Kings"), the biblical Ark of the Covenant was brought from Jerusalem to Aksum by Menelik I, the son born of the union between King Solomon and Queen Makeda (the Queen of Sheba). For centuries, the Ark (known as the Tabote Tsion) has been permanently housed in the Chapel of the Tablet adjacent to the Old Church. It is guarded exclusively by a single consecrated virgin monk—the Guardian of the Ark—who is appointed for life, never leaves the chapel compound, and is the only living human permitted to set eyes upon the sacred relic. Pilgrims from across the globe gather in Aksum every year on November 30 for Hidar Zion, one of the most solemn and powerful holy festivals in the Christian world.',
      livingEcosystem: 'Aksum is an active, vibrant cultural city where ancient rituals interlock seamlessly with modern life. Priests in golden brocade vestments, holding silver hand-crosses and wooden prayer sticks, still chant the sacred 6th-century Ge’ez hymns composed by Saint Yared. The local women spin pure white Ethiopian cotton on hand spindles, weaving the traditional Netela and Gabi shawls adorned with colorful Tibeb borders. In the city market, sacks of highland teff grain, rock salt bars (Amole), frankincense resins, and red chillies are weighed alongside handcrafted clay coffee pots and silver cross pendants.',
      travelerAdvisory: 'Aksum has a dedicated airport (AXU) with daily scheduled flights from Addis Ababa and Lalibela. The high-altitude plateau (2,131 meters) provides a temperate, dry climate for most of the year. Visitors must wear modest clothing that fully covers legs and shoulders. Note that only men are permitted inside the historic 17th-century Old Church of St. Mary of Zion, while both women and men are fully welcome in the modern cathedral built by Emperor Haile Selassie and the open church grounds surrounding the Ark chapel. Taking photographs of the Guardian monk or inside the Ark chapel perimeter is strictly forbidden.'
    }
  },
  {
    id: 'gheralta-mountains',
    name: 'Gheralta Mountains: Sacred Sandstone Pinnacles & Cliff Churches',
    tigrinyaName: 'ናይ ገራልታ ዓበይቲ አኽራናት - ናይ ከውሒ ማኅደር ቅዱሳን',
    region: 'tigray',
    regionLabel: 'Tigray Rock-Hewn Wonders',
    heroImage: '',
    gallery: [],
    isChronicleOnly: true,
    tagline: 'Dramatic Scarlet Sandstone Towers, Aerial Rock-Hewn Cliff Monasteries & The Legendary Ascent of Abuna Yemata Guh',
    description: 'The Gheralta mountain range is one of the most visually staggering and spiritually electrifying landscapes on the African continent. Located in the northern Tigray highlands between Hawzen and Megab, this prehistoric geological wonderland features soaring scarlet sandstone massifs, flat-topped mesas (ambas), and jagged needle pinnacles rising abruptly from the golden acacia plains to heights of 2,580 meters. Hidden within these precipitous, seemingly impassable cliff faces are over 120 rock-cut monasteries, chapels, and hermit caves chiseled directly out of sheer vertical rock by holy ascetics during the 5th to 14th centuries. Most celebrated among them is the breathtaking cliff church of Abuna Yemata Guh—perched on an isolated rock pillar 200 meters above a sheer vertical chasm, accessible only by scaling ancient footholds up a vertical cliff face—and the high mountain aeries of Maryam Korkor and Daniel Korkor.',
    whyVisit: [
      'Experience the heart-racing, life-affirming ascent up vertical sandstone cliff faces to reach the miraculous church of Abuna Yemata Guh',
      'Step into ancient rock-hewn cave domes painted with magnificent 5th- and 6th-century Orthodox frescoes of the Apostles, Old Testament prophets, and Saint George on horseback',
      'Hike the dramatic high ridge trail to Maryam Korkor, a massive basilican monastery carved inside a mountaintop commanding a 360-degree panorama of the Hawzen plains',
      'Stand on the narrow prayer precipice of Daniel Korkor, gazing across the vast geological drop into the Afar and Rift Valley depressions',
      'Visit the 2,800-year-old Great Temple of Yeha, the oldest standing stone structure in sub-Saharan Africa dating back to 800 BC',
      'Explore the historic Al-Nejashi Mosque in Negash, revered as the earliest Islamic sanctuary on the African continent, founded by followers of Prophet Muhammad seeking refuge with the Christian King of Aksum'
    ],
    thingsToDo: [
      'Climb with experienced local mountain scouts and safety harnesses to Abuna Yemata Guh, barefoot on ancient stone footholds worn smooth by centuries of pilgrim feet',
      'Examine the sacred leather-bound Ge’ez vellum manuscripts and painted church ceilings illuminated only by beeswax candles and gentle morning light',
      'Take an exhilarating 3-hour morning mountain trek through the narrow sandstone gorges and rocky clefts to Maryam Korkor and Daniel Korkor',
      'Experience authentic Tigray hospitality with a traditional coffee ceremony and fresh warm Ambasha spiced bread in a local sandstone village homestead',
      'Visit the semi-monolithic rock church of Abreha we Atsbeha, famous for its 10th-century cruciform pillars and ornate wooden ceilings',
      'Marvel at sunset over the scarlet peaks as the sandstone cliffs glow intensely in shades of ochre, crimson, and deep violet'
    ],
    keyAttractions: [
      'Abuna Yemata Guh Cliff Church (Aerial Pinnacle Sanctuary)',
      'Maryam Korkor & Daniel Korkor Mountaintop Monasteries',
      'Ancient Pre-Historic Great Temple of Yeha (800 BC)',
      'Al-Nejashi Historic Mosque & Royal Tombs (Negash)',
      'Abreha we Atsbeha Semi-Monolithic Rock Sanctuary',
      'Dramatic Scarlet Sandstone Valley Formations & Mesas'
    ],
    cultureAndHeritage: 'Founded in the 5th and 6th centuries by holy hermits who journeyed across the Red Sea. These ascetic monks carved churches into the most inaccessible mountain peaks to seek spiritual communion, undisturbed contemplation, and shelter.',
    localFoodHighlights: ['Traditional Highland Tihlo with spiced lamb wat', 'Warm Ambasha spiced celebratory bread', 'Highland white honey and roasted sesame treats'],
    bestTimeToVisit: 'October through April for clear dry skies, firm rock grip, and magnificent sunsets.',
    suggestedDuration: '2 - 3 Days',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: [
      'Wear sturdy sneakers or hiking boots with strong rubber grip for the cliff climb',
      'Certified local scouts and safety ropes are provided to ensure a secure, guided ascent',
      'Travelers preferring less vertical climbs can easily explore gentle ridge trails and valley temples'
    ],
    coordinates: { lat: 13.9783, lng: 39.3872 },
    elevation: '2,580 m (8,465 ft)',
    nearbyLodging: ['Escarpment Eco-Lodges', 'Boutique Desert Lodges', 'Traditional Stone Guesthouses'],
    availableTourIds: ['gheralta-tigray-cliff-churches-expedition', 'axum-ancient-kingdom-pilgrimage'],
    featured: true,
    chronicle: {
      historicalOrigins: 'The rock-hewn sanctuaries of Gheralta trace their origins to the arrival of the "Nine Saints" in the late 5th and early 6th centuries AD. These ascetic holy men fled the Byzantine Empire following the Council of Chalcedon (451 AD) and were welcomed by the King of Aksum. Seeking to escape the distractions of earthly courts and commune directly with God in unceasing prayer, they retreated to the most isolated, rugged mountain peaks of Tigray. Saint Yemata selected the highest, most inaccessible sandstone needle in the Gheralta range, chiseling a sanctuary high in the heavens where only faith and determined devotion could reach.',
      architecturalMastery: 'Unlike conventional buildings constructed from the ground up, the cliff churches of Gheralta are subtractive architecture—painstakingly sculpted inward from the living sandstone rock using iron chisels, hammers, and adzes. Master builders carved out massive nave pillars, barrel-vaulted ceilings, triumphal arches, and raised sanctuaries (Holy of Holies / Mekdes) directly out of solid rock. Maryam Korkor is one of the largest rock churches in Ethiopia, featuring six soaring columns, five aisles, intricate cruciform pillars, and arched ceilings adorned with Ge’ez inscriptions and geometric friezes. Abuna Yemata Guh is entered through a natural opening high on the cliff face; inside, its hemispherical ceiling dome is completely covered with stunning, well-preserved Orthodox frescoes depicting the twelve Apostles, Old Testament patriarchs, and cherubim, painted using natural mineral pigments derived from crushed yellow ochre, charcoal, crushed shells, and mountain plants.',
      sacredTraditions: 'For over fifteen centuries, local priests and villagers have made the treacherous daily ascent up the cliffs without modern climbing equipment, carrying infant children on their backs to be baptized inside the cliff churches. Deceased community elders are carried up the mountain to be laid to rest in sacred bone vaults and clefts high above the world. The rock churches maintain complete collections of ancient Ge’ez manuscripts written on calf-skin vellum, hand-illuminated with gold leaf and vegetable dyes, which priests proudly present to respectful visitors.',
      livingEcosystem: 'The Gheralta Valley retains a timeless agrarian rhythm. Local farmers cultivate white teff, barley, and chickpeas on valley floors using ox-drawn wooden plows (Maresha) unchanged since biblical times. Village homes are built from flat red sandstone blocks and acacia timbers, blending harmoniously into the surrounding cliffs. Golden-winged starlings, lammergeier bearded vultures, and lanner falcons glide on warm thermal updrafts around the mountain towers.',
      travelerAdvisory: 'The climb to Abuna Yemata Guh involves a 45-minute steep hike followed by a 5-meter near-vertical section where climbers use rock footholds and handholds, concluding with a traverse across a narrow ledge over a steep drop. While exhilarating, it requires good physical fitness, a steady head for heights, and comfortable clothing. Bridge Ethiopia provides certified local scouts and climbing harnesses with safety ropes for every traveler. Travelers who prefer gentler walking can choose the Maryam Korkor trail or visit the drive-up valley rock churches such as Abreha we Atsbeha and Wukro Chirkos.'
    }
  },
  {
    id: 'jimma-abba-jifar',
    name: 'Jimma & Palace of King Abba Jifar',
    oromoName: 'Mootummaa Jimmaa - Masaraa Abbaa Jifaar',
    amharicName: 'ጅማ እና የአባ ጅፋር ቤተ መንግሥት',
    region: 'oromia',
    regionLabel: 'Oromia • Jimma Kingdom',
    heroImage: '',
    gallery: [],
    isChronicleOnly: true,
    tagline: '19th-Century Royal Wooden Palace of King Abba Jifar II, Historic Gibe Kingdom & Specialty Arabica Coffee Heartland',
    description: 'Jimma is the historic royal capital of the legendary 19th-century Kingdom of Jimma, nestled amid rolling verdant hills, lush indigenous cloud forests, and centuries-old coffee groves in Southwestern Oromia. The city’s crowning cultural treasure is the grand Palace of King Abba Jifar II (Masaraa Abbaa Jifaar), constructed in the 1880s atop the scenic hill of Jiren. Built of indigenous hardwood and stone with master carved timber pillars and expansive balconies overlooking the Gibe Valley, the palace complex preserves the royal throne, traditional weaponry, personal bed, council halls, and historic mosque of one of Ethiopia’s most diplomatic, visionary monarchs.',
    whyVisit: [
      'Tour the grand 19th-century Palace of King Abba Jifar II at Jiren, featuring exquisite traditional Oromo woodwork and royal chambers',
      'Learn about the Kingdom of Jimma (one of the Five Gibe Oromo Kingdoms) and its diplomatic prosperity under King Abba Jifar',
      'Explore the Jimma Museum, housing royal regalia, ceremonial horns, carved wooden thrones, and rare cultural relics',
      'Experience the specialty coffee heartland of Jimma and nearby Limmu—celebrated worldwide for balanced, fruity Arabica beans',
      'Discover traditional Jimma wood carving, famous for the iconic three-legged Oromo stool (Barcuma) hand-carved from single tree trunks',
      'Enjoy the peaceful highland atmosphere, lush vegetation, and warm Oromo cultural hospitality'
    ],
    thingsToDo: [
      'Guided historical exploration through the King Abba Jifar Palace complex, royal mosque, and audience chambers at Jiren hill',
      'Visit the Jimma Cultural Museum to study Oromo traditional attire, royal artifacts, and regional musical instruments',
      'Take a specialty coffee tour through historic plantations and cooperative washing stations in the Jimma/Limmu coffee belt',
      'Browse the vibrant Jimma Central Market for hand-carved wooden Barcuma chairs, bamboo baskets, and organic forest spices',
      'Enjoy an authentic Oromo coffee ceremony paired with freshly roasted barley (Kolo) and warm Marqaa (porridge with spiced butter)',
      'Birdwatching and scenic nature walks around Boye Lake and surrounding lush wetlands'
    ],
    keyAttractions: [
      'Palace of King Abba Jifar II at Jiren (1880s Royal Wooden Palace)',
      'King Abba Jifar Historic Royal Mosque',
      'Jimma Cultural & Historical Museum',
      'Historic Jiren Ridge Panoramic Lookout',
      'Jimma Coffee Research Center & Heritage Plantations',
      'Jimma Central Artisan Wood Market (Barcuma Stools)',
      'Boye Wetland & Bird Sanctuary'
    ],
    cultureAndHeritage: 'Capital of the powerful Gibe Oromo Kingdom of Jimma. King Abba Jifar II maintained peaceful diplomacy and regional autonomy, fostering a thriving mercantile civilization renowned for coffee trade, master wood craftsmanship, and rich Oromo cultural traditions.',
    localFoodHighlights: [
      'Authentic Marqaa (Rich spiced porridge with spiced butter / Niter Kibbeh)',
      'Freshly Brewed Specialty Jimma & Limmu Single-Origin Arabica Coffee',
      'Caccabsaa (Chechebsa / Qita Firfir with Spiced Butter & Berbere)',
      'Buna Qalaa (Traditional Oromo ceremonial coffee cooked in purified butter)',
      'Tender Oromo Goat and Beef Tibs with Fresh Forest Korarima'
    ],
    bestTimeToVisit: 'October through May for pleasant sunny weather and the vibrant post-harvest coffee season.',
    suggestedDuration: '2 - 3 Days',
    scheduleType: 'Customizable Private Itinerary',
    travelTips: [
      'Daily scheduled 50-minute flights operate between Addis Ababa (ADD) and Jimma Aba Segud Airport (JIM)',
      'Pick up an authentic hand-carved Jimma wooden stool (Barcuma) from local artisan cooperatives',
      'Visit the palace in the morning for crisp light and panoramic valley views from Jiren hill'
    ],
    coordinates: { lat: 7.6769, lng: 36.8344 },
    elevation: '1,780 m (5,840 ft)',
    nearbyLodging: ['Jimma Central Heritage Hotels', 'Lush Valley Resorts', 'Boutique Coffee Estate Lodges'],
    availableTourIds: ['jimma-abba-jifar-royal-coffee-trail'],
    featured: true,
    chronicle: {
      historicalOrigins: 'The Kingdom of Jimma was the most powerful and prosperous of the Five Gibe Oromo Kingdoms that flourished in southwestern Ethiopia during the 18th and 19th centuries. Founded around 1790 by Abba Jifar I, the kingdom attained its political and cultural zenith under King Abba Jifar II (who reigned from 1878 to 1932). Known for his remarkable diplomatic wisdom, King Abba Jifar II negotiated a peaceful tributary treaty with Emperor Menelik II in 1884, preserving Jimma’s internal autonomy, laws, Islamic faith, and royal administration for decades. Jimma emerged as the paramount commercial crossroads of southwest Ethiopia, where merchant caravans converged to trade highland coffee, civet musk, mountain spices, beeswax, and master wooden crafts.',
      architecturalMastery: 'Perched strategically atop Jiren hill overlooking the surrounding plains, the Palace of King Abba Jifar II is a stunning architectural marvel constructed in the 1880s. Built without a single metal nail, the complex was engineered using indigenous hardwoods—notably Podocarpus (Zigba), Juniper (Tid), and Cordia africana (Wanza)—interlocked with traditional mortise-and-tenon joinery and stone foundations. The palace features a grand two-story central residence with wide overhanging eaves, an expansive upper-level covered balcony with carved banisters where the king held court, royal bedchambers, guest pavilions, the administrative council hall (Lafa Safara), and an adjacent historic mosque built for the royal family and court scholars.',
      sacredTraditions: 'Jimma has long stood as a leading center of Islamic scholarship, peaceful coexistence, and deep Oromo cultural traditions. King Abba Jifar II patronized Islamic learning, establishing schools that attracted students and scholars from across East Africa. At the same time, Oromo social customs, communal solidarity, and the legendary Buna Qalaa ceremony (coffee beans blessed and cooked in fragrant spiced butter, served as an emblem of peace and reconciliation) remained central to community life and royal diplomacy.',
      livingEcosystem: 'Jimma lies within the fertile southwestern volcanic highlands, surrounded by mist-draped indigenous rainforests, emerald green rolling hills, and rich volcanic loam soils. This region is the genetic homeland of wild Coffea arabica: under the forest canopy, heirloom coffee trees flourish in natural harmony with towering Hagenia abyssinica and fig trees, providing a pristine sanctuary for colobus monkeys, hornbills, and exotic butterflies. The region is also Ethiopia’s premier center for agricultural research and forest conservation.',
      travelerAdvisory: 'Jimma is easily reached by daily domestic flights into Jimma Aba Segud Airport (JIM) or by a scenic 5 to 6-hour paved highway drive from Addis Ababa through the Gibe River gorge. The Palace of King Abba Jifar at Jiren is located roughly 7 kilometers northeast of Jimma town; local guides at the site provide knowledgeable tours of the royal chambers and artifacts. The weather is comfortably temperate year-round, though rain gear is recommended between June and September. Do not miss tasting single-origin Jimma coffee freshly roasted on-site.'
    }
  },
];

export const TOURS_DATA: Tour[] = [
  {
    id: 'addis-city-essence',
    title: 'Addis Ababa City & Cultural Immersion',
    category: 'City Tours',
    region: 'addis-ababa',
    duration: 'Customizable Private Schedule',
    scheduleType: 'Flexible Day Itinerary',
    groupSize: '1 - 12 Guests (Private / Small Group)',
    difficulty: 'Easy',
    priceFromUSD: 85,
    image: tourAddisImg,
    shortDescription: 'The definitive capital city experience: Meet Lucy at the National Museum, explore Mount Entoto, visit Holy Trinity Cathedral, taste Tomoca coffee, and wander Africa’s largest open-air market, Merkato.',
    itinerarySummary: [
      'Morning pickup & scenic drive up Mount Entoto for panoramic city views and eucalyptus forest visit',
      'National Museum of Ethiopia: Private guided viewing of Lucy (Dinkenesh) and royal relics',
      'Authentic lunch at a historic Ethiopian restaurant with live acoustic music',
      'Holy Trinity Cathedral & Imperial tombs of Emperor Haile Selassie',
      'Merkato guided walking tour through spice and handcraft quarters',
      'Traditional coffee tasting at original Tomoca Coffee house in Piazza'
    ],
    inclusions: ['Private air-conditioned vehicle & fuel', 'Certified English-speaking Bridge Ethiopia local guide', 'All entrance fees to museums and cathedrals', 'Traditional Ethiopian lunch & coffee tasting', 'Bottled mineral water throughout'],
    exclusions: ['Alcoholic beverages beyond lunch inclusion', 'Personal shopping in Merkato', 'Discretionary guide gratuities'],
    highlights: ['3.2-million-year-old Lucy fossil', 'Mount Entoto panoramic vantage', 'Merkato spice section secrets', 'Traditional coffee tasting'],
    rating: 4.96,
    reviewsCount: 142,
    featured: true,
  },
  {
    id: 'hindek-kitchen-cooking-experience',
    title: 'Hindek Kitchen: Cultural Cooking Class & Hands-On Experience',
    category: 'Food & Culinary',
    region: 'addis-ababa',
    duration: 'Hands-On Interactive Experience',
    scheduleType: 'Private Morning or Evening Session',
    groupSize: 'Private & Small Groups (2 - 8 Guests)',
    difficulty: 'Easy',
    priceFromUSD: 0,
    image: doroWatImg,
    shortDescription: 'Hindek Kitchen is a cultural cooking class and hands-on experience, NOT a restaurant. Step into an authentic traditional Ethiopian kitchen where visitors learn to cook, bake 100% Teff Injera on the clay mitad, prepare traditional dishes, eat what they helped prepare around the Mesob, and experience genuine Ethiopian hospitality.',
    itinerarySummary: [
      'Warm welcome and introduction to Ethiopian ingredients, spices (Berbere, Korarima), and traditional cookware',
      'Hands-on culinary practice: Preparing Doro Wat, Sizzling Tibs, Kitfo, or Clay Pot Shiro with step-by-step guidance',
      'Injera baking practice: Pouring fermented teff batter onto the circular clay Mitad griddle and watching the Ayn form',
      'Communal feast: Eating the delicious dishes you personally helped prepare gathered around the traditional Mesob',
      'Traditional 3-round Ethiopian coffee ceremony (Abol, Tona, Baraka) with frankincense smoke and fresh popcorn',
      'Taking photos, receiving recipe cards, and creating unforgettable memories'
    ],
    inclusions: ['Hands-on cooking guidance & all ingredients', 'Full communal feast meal (meat, vegetarian, or vegan options)', 'Complete traditional 3-round coffee ceremony', 'Recipe notes and cultural spice orientation'],
    exclusions: ['Private airport/hotel transportation (available upon request)'],
    highlights: ['Cultural cooking class (NOT a restaurant)', 'Practice baking Teff Injera on the Mitad', 'Prepare Doro Wat, Tibs, Kitfo & Shiro', 'Eat what you cook around the Mesob'],
    rating: 5.0,
    reviewsCount: 188,
    featured: true,
  },
  {
    id: 'hindek-grandpa-coffee-ceremony',
    title: 'Hindek Grandpa Coffee Experience: 3-Stage Ceremony',
    category: 'Coffee Trail',
    region: 'addis-ababa',
    duration: 'Traditional 3-Round Ritual',
    scheduleType: 'Flexible Morning / Afternoon Session',
    groupSize: '1 - 10 Guests (Private Hospitality Circle)',
    difficulty: 'Easy',
    priceFromUSD: 35,
    image: '',
    isChronicleOnly: true,
    shortDescription: 'Discover the soul of Ethiopian hospitality with the authentic 3-stage coffee ceremony (Abol, Tona, Baraka). An unhurried oral chronicle and living cultural ritual: washing green highland beans, roasting over charcoal embers, perfuming the air with sacred frankincense, pounding in carved timber mortars, and sipping from black clay Jebena pots.',
    itinerarySummary: [
      'Welcome Blessing & Ketema Floor Ceremony: Step into a sanctuary carpeted with fresh river grass (Ketema), signifying peace, life, and hospitality',
      'Highland Green Bean Exploration: Hand-sorting raw wild Arabica cherries from Yirgacheffe, Sidama, Harar, and ancient Kafa rainforests',
      'Charcoal Pan Roasting & Aromatic Smoke Offering: Roasting over glowing embers in an iron pan (Baret Mitad); the aromatic smoke is presented to each guest to inhale and receive blessings',
      'Wooden Mortar & Pestle Pounding: Grinding the hot freshly roasted beans by hand using the carved wooden Mukecha and heavy Zenezena pestle',
      'Slow Boiling in the Black Clay Jebena: Steeping the fresh grinds in pure spring water atop charcoal until fragrant steam escapes from the horsehair-filtered spout',
      'The Three Sacred Rounds (Abol, Tona, Baraka): Sipping the three traditional brews poured continuously from height into handle-less ceramic Sini cups',
      'Communal Pairings & Elder Oral Storytelling: Enjoying warm popped corn (Fendisha), roasted highland barley (Kolo), and local clover honey while listening to tales of Ethiopian coffee origins and elder family hospitality'
    ],
    inclusions: [
      'Complete 3 ceremonial rounds of single-origin highland Arabica coffee (Abol, Tona, Baraka)',
      'Freshly popped corn (Fendisha) & roasted spiced barley with peanuts (Kolo)',
      'Traditional incense offering with natural Tigray frankincense resin (Itan)',
      'Unhurried cultural storytelling and demonstration of the clay Jebena, Mukecha, and Rekebot',
      'Herbal infusion options (fresh Rue / Tena’adam) & pure spring water'
    ],
    exclusions: ['Packaged roasted coffee beans for home brewing (available for direct order)'],
    highlights: ['Text-First Heritage Documentation', 'Abol, Tona, and Baraka ritual rounds', 'Frankincense smoke blessing', 'Fresh Ketema grass tradition', 'Clay Jebena brewing craft'],
    rating: 4.98,
    reviewsCount: 215,
    featured: true,
    chronicle: {
      historicalOrigins: 'In Ethiopian and Oromo traditional cosmology, coffee (Buna) is far more than a beverage; it is a sacred gift, a communal peace treaty, and an ancestral covenant known as "Buna Nagaa" (The Coffee of Peace). Hindek Grandpa’s coffee ritual preserves the domestic hearth traditions of the Ethiopian highlands, where an open door and a boiling Jebena have greeted neighbors, weary pilgrims, and visiting strangers for generations. Oral memory recounts that no elder would deliberate on community matters, resolve disputes, or bless a newborn without first sharing the three sacred rounds of coffee across a bed of freshly cut wild grass.',
      ceremonialPhilosophy: 'The Ethiopian coffee ceremony unfolds through three distinct, immutable stages: Abol (the first and most potent brew, Awakening the senses and honoring the arrival of guests), Tona (the second brew, steeped from the same grounds to soften the tone and open hearts to intimate storytelling and laughter), and Baraka (the third and culminating brew, meaning "The Blessing," during which the host invokes divine protection, health, and prosperity upon every soul present). To leave before the third cup is considered a rejection of the household’s blessing. The unbroken stream of dark coffee poured from arm’s height into small Sini cups symbolizes an uninterrupted flow of abundance and hospitality.',
      sacredTraditions: 'Every element of the hearth carries symbolic reverence. Before beans touch the fire, the floor is strewn with fragrant green meadow grass (Ketema), symbolizing the renewal of nature and welcoming good fortune. Natural frankincense resin (Itan) is placed upon glowing charcoal embers in a clay burner (Girgira), purifying the atmosphere and carrying prayers aloft. The beans are washed in three waters, roasted on an iron skillet until gleaming with essential oils, and presented while still smoking so guests may cup their hands and draw the rich perfume toward their faces in gratitude. The ceremony concludes with an elder reciting the traditional blessing: "Buna hin dhabinaa, Nagaa hin dhabinaa" (May you never lack coffee, and may you never lack peace).',
      ritualInstruments: 'The ceremony relies on centuries of artisanal craft: the Jebena, a spherical black earthenware pot hand-coiled from highland river clay and pit-fired with organic husks; the Mukecha and Zenezena, a heavy mortar and pestle sculpted from single logs of olivewood or eucalyptus; the Rekebot, an intricately carved low wooden table holding delicate porcelain Sini cups; and the Baret Mitad, a shallow forged iron pan designed to toss beans smoothly over open charcoal embers.',
      livingEcosystem: 'Bridge Ethiopia’s Hindek Grandpa coffee experience sources 100% fair-trade, organic, shade-grown Arabica harvested by family cooperatives in the high-altitude cloud forests of Jimma, Sidama, and Yirgacheffe. Guests experience raw cherries nurtured under indigenous forest canopies at 1,800 to 2,200 meters above sea level, supporting sustainable agroforestry, soil conservation, and smallholder farming families.',
      travelerAdvisory: 'The ceremony is an intentionally unhurried ritual lasting approximately 60 to 90 minutes. Guests are warmly encouraged to remove shoes upon stepping onto the Ketema grass mat, relax in comfortable communal seating, and participate in roasting and grinding if they wish. Sugar, local highland honey, salt, or fresh rue sprigs (Tena’adam) are offered according to personal preference. Fasting or vegan travelers can enjoy the entire experience with complete peace of mind, as all elements are purely plant-based and roasted fresh on-site.'
    }
  },
  {
    id: 'wenchi-caldera-trek',
    title: 'Wenchi Crater Lake & Oromia Highlands Expedition',
    category: 'Nature & Trekking',
    region: 'oromia',
    duration: 'Customizable Private Expedition',
    scheduleType: 'Full Day / Tailored Pace',
    groupSize: '2 - 8 Guests',
    difficulty: 'Moderate',
    priceFromUSD: 130,
    image: wenchiImg,
    shortDescription: 'Journey west from Addis Ababa to the dramatic volcanic caldera of Wenchi. Horseback ride down lush alpine slopes, take a wooden canoe to the 15th-century island monastery, and soak by natural hot springs.',
    itinerarySummary: [
      'Scenic drive through the rolling green Oromia highlands and Ambo farmland',
      'Arrive at Wenchi rim (3,000m); mount sturdy local horses for the descent',
      'Wooden boat crossing to Cherkos Island Monastery in the heart of the crater',
      'Riverside picnic lunch beside natural thermal mineral waterfalls',
      'Hike along the lush valley floor witnessing local Oromo organic honey farming',
      'Return to rim and scenic evening drive back to Addis Ababa'
    ],
    inclusions: ['4WD transport & professional driver', 'Bridge Ethiopia guide & local Oromo community guide', 'Horse rental & boat crossing fees', 'Picnic lunch & highland snacks', 'All park fees and taxes'],
    exclusions: ['Personal tips for horse handlers'],
    highlights: ['Volcanic caldera alpine views', 'Horseback mountain trail descent', 'Cherkos island monastery boat ride', 'Natural hot mineral springs'],
    rating: 4.95,
    reviewsCount: 89,
    featured: true,
  },
  {
    id: 'bale-mountains-expedition',
    title: 'Bale Mountains & Sanetti Plateau Endemic Wildlife Safari',
    category: 'Wildlife & Birding',
    region: 'oromia',
    duration: 'Customizable Private Safari',
    scheduleType: 'Tailored Wildlife Itinerary',
    groupSize: '2 - 8 Guests',
    difficulty: 'Moderate',
    priceFromUSD: 620,
    image: tourBaleImg,
    shortDescription: 'Explore the afro-alpine Sanetti Plateau and ancient Harenna Cloud Forest. Track the endangered Ethiopian Red Wolf, spot Mountain Nyala, explore Sof Omar Cave, and summit Tullu Dimtu.',
    itinerarySummary: [
      'Stage 1: Travel from Addis Ababa to Dinsho Headquarters; spot endemic Mountain Nyala & Menelik’s Bushbuck',
      'Stage 2: Full expedition on Sanetti Plateau (4,000m); track Ethiopian Wolves and summit Tullu Dimtu',
      'Stage 3: Descend into the Harenna Forest; search for wild coffee, bamboo groves, and Colobus monkeys',
      'Stage 4: Morning expedition to Sof Omar subterranean cave system; return drive via Rift Valley Lakes'
    ],
    inclusions: ['4WD Land Cruiser with driver throughout', 'Expert wildlife naturalist guide', 'Quality lodge/guesthouse accommodation', 'All meals, park entry fees, and scout fees'],
    exclusions: ['Alcoholic drinks', 'Personal travel insurance'],
    highlights: ['Over 95% chance of Ethiopian Wolf sightings', 'Tullu Dimtu 4,377m summit', 'Moss-draped Harenna Cloud Forest', 'Sof Omar underground limestone arches'],
    rating: 4.97,
    reviewsCount: 76,
    featured: true,
  },
  {
    id: 'lalibela-historic-route',
    title: 'Lalibela 11 Rock-Hewn Churches Pilgrimage & Culture',
    category: 'Historical & UNESCO',
    region: 'northern-ethiopia',
    duration: 'Customizable Private Pilgrimage',
    scheduleType: 'Tailored Heritage Schedule',
    groupSize: '1 - 10 Guests',
    difficulty: 'Moderate',
    priceFromUSD: 420,
    image: tourLalibelaImg,
    shortDescription: 'Immerse yourself in 12th-century living history in Lalibela. Visit all 11 monolithic churches including the iconic Bet Giyorgis, walk through subterranean tunnels, and attend early dawn Ge’ez liturgical chants.',
    itinerarySummary: [
      'Stage 1: Fly Addis to Lalibela. Explore the Northern Group (Bet Medhane Alem, Bet Maryam, Bet Meskel)',
      'Stage 2: Morning visit to the iconic cross church of Bet Giyorgis and Eastern Group; afternoon hike to Asheton Maryam monastery',
      'Stage 3: Excursion to Yemrehana Krestos built cave church; afternoon flight back to Addis'
    ],
    inclusions: ['Domestic flight booking assistance', 'Boutique hotel with breakfast', 'Certified Lalibela historic ecclesiastical guide', 'All 11 church complex entry permits & museum access', 'Private airport transfers in Lalibela'],
    exclusions: ['Domestic flights (can be bundled upon request)', 'Lunches and dinners'],
    highlights: ['Iconic Bet Giyorgis cross church', 'Ancient underground interconnecting tunnels', 'Asheton Maryam mountain views', '12th-century cave church of Yemrehana Krestos'],
    rating: 5.0,
    reviewsCount: 164,
    featured: true,
  },
  {
    id: 'arba-minch-dorze-chamo-safari',
    title: 'Arba Minch, Lake Chamo Safari & Dorze Highland Weavers',
    category: 'Cultural & Tribal',
    region: 'southern-ethiopia',
    duration: 'Customizable 3 - 4 Days',
    scheduleType: 'Flexible Safari Itinerary',
    groupSize: '2 - 8 Guests',
    difficulty: 'Easy',
    priceFromUSD: 540,
    image: arbaMinchImg,
    shortDescription: 'Explore the lush Great Rift Valley lakes of Southern Ethiopia: boat safari among giant Lake Chamo crocodiles, Nechisar plains, and immersive mountain cultural stay with Dorze bamboo weavers.',
    itinerarySummary: [
      'Stage 1: Flight or scenic drive from Addis to Arba Minch; afternoon Forty Springs groundwater forest walk & sunset dinner over Lake Abaya',
      'Stage 2: Morning private boat safari on Lake Chamo crocodile market & hippo sanctuary; wildlife viewing on Nechisar plains',
      'Stage 3: Ascend to Chencha mountain Dorze village; stay in 12m bamboo beehive homes, learn Kocho bread baking & cotton weaving',
      'Stage 4: Morning highland market visit; return flight to Addis Ababa or continuation southward to Konso and Omo Valley'
    ],
    inclusions: ['Private 4WD Land Cruiser transport with driver', 'Lake Chamo private motorized boat charter & national park fees', 'Dorze community guide & cultural demonstration fees', 'Quality lake-view lodge accommodation', 'All breakfasts and guided transfers'],
    exclusions: ['Domestic flights (can be bundled upon request)', 'Personal tips'],
    highlights: ['Lake Chamo giant Nile crocodiles up to 6m', 'Dorze 12m woven bamboo beehive homes', 'Kocho baking & cotton weaving workshop', 'Lush Forty Springs natural groundwater forest'],
    rating: 4.96,
    reviewsCount: 84,
    featured: true,
  },
  {
    id: 'omo-valley-cultural-odyssey',
    title: 'Lower Omo Valley Deep Cultural Heritage Expedition',
    category: 'Cultural & Tribal',
    region: 'southern-ethiopia',
    duration: 'Customizable Cultural Journey',
    scheduleType: 'Tailored Cultural Immersion',
    groupSize: '2 - 6 Guests (Respectful & Small)',
    difficulty: 'Moderate',
    priceFromUSD: 890,
    image: tourOmoImg,
    shortDescription: 'A respectful, authentic immersion into the distinct cultural traditions of Southern Ethiopia: Hamer, Karo, Konso, and Dassanech communities, conducted with trusted local community liaisons.',
    itinerarySummary: [
      'Stage 1: Addis Ababa to Arba Minch; boat safari on Lake Chamo crocodile sanctuary',
      'Stage 2: Konso UNESCO terraced cultural landscape to Turmi (heart of Hamer territory)',
      'Stage 3: Karo village of Kolcho overlooking Omo River; Hamer Bull Jumping ceremony (subject to seasonal schedule)',
      'Stage 4: Dugout canoe crossing to Dassanech villages near Lake Turkana border',
      'Stage 5: Key Afer vibrant weekly tribal trade market; drive to Jinka',
      'Stage 6: Mursi community visit in Mago National Park; return travel to Addis Ababa'
    ],
    inclusions: ['4WD Land Cruiser & fuel throughout', 'Senior cultural tour leader & local village guides', 'Quality lodge accommodations', 'All village entrance fees, boat safaris, community contributions', 'All meals outside Addis Ababa'],
    exclusions: ['Village photo contributions', 'Personal tips'],
    highlights: ['Lake Chamo giant crocodiles', 'UNESCO Konso terraced hills', 'Hamer & Karo cultural storytelling', 'Authentic weekly tribal market'],
    rating: 4.93,
    reviewsCount: 68,
    featured: false,
  },
  {
    id: 'harar-walled-city-coffee-trail',
    title: 'Harar Jugol Walled City & Eastern Coffee Heritage',
    category: 'Historical & UNESCO',
    region: 'eastern-ethiopia',
    duration: 'Customizable Heritage Trail',
    scheduleType: 'Flexible Schedule',
    groupSize: '1 - 8 Guests',
    difficulty: 'Easy',
    priceFromUSD: 380,
    image: tourHararImg,
    shortDescription: 'Explore the 4th holiest city of Islam: 368 narrow cobbled alleyways, historic Harari living rooms, vibrant spice markets, Arthur Rimbaud’s museum, and the nightly Hyena feeding ritual.',
    itinerarySummary: [
      'Stage 1: Fly to Dire Dawa; scenic drive to Harar; evening walk through 16th-century gates & nightly Hyena feeding experience',
      'Stage 2: Full day walking Harar Jugol: Arthur Rimbaud house, Jamia Mosque, Shoa Gate spice market, and Harari heritage home lunch',
      'Stage 3: Harar Longberry sun-dried coffee cupping & spice market shopping; transfer to Dire Dawa airport for flight to Addis'
    ],
    inclusions: ['Domestic flight coordination', 'Stay in authentic Harari heritage guesthouse', 'Licensed Harari local historian guide', 'Hyena feeding entrance & participation', 'All guided visits and airport transfers'],
    exclusions: ['Domestic airfares', 'Lunches & dinners'],
    highlights: ['Feeding wild hyenas under starlight', '368 maze-like historic alleyways', 'Arthur Rimbaud Museum', 'Harar Longberry sun-dried coffee'],
    rating: 4.96,
    reviewsCount: 91,
    featured: false,
  },
  {
    id: 'danakil-dallol-erta-ale-expedition',
    title: 'Danakil Depression, Dallol & Erta Ale Active Lava Lake',
    category: 'Nature & Trekking',
    region: 'afar-danakil',
    duration: 'Customizable Expedition',
    scheduleType: 'Tailored 4WD Convoy',
    groupSize: '4 - 10 Guests (Convoy Expedition)',
    difficulty: 'Challenging',
    priceFromUSD: 590,
    image: tourDanakilImg,
    shortDescription: 'Venture into the hottest place on Earth: surreal neon-yellow sulfur springs at Dallol (-125m), glowing Erta Ale active lava lake, endless salt flats, and ancient Afar camel caravans.',
    itinerarySummary: [
      'Stage 1: Fly to Semera/Mekele; 4WD convoy drive into Danakil; camp on salt flats',
      'Stage 2: Sunrise at Lake Karum; explore fluorescent sulfur acid springs of Dallol; witness salt carvers',
      'Stage 3: Drive to Erta Ale basecamp; twilight trek to the active volcano rim; peer into the glowing molten lava lake',
      'Stage 4: Morning descent from volcano; swim in Lake Afrera geothermal hot springs; return flight to Addis'
    ],
    inclusions: ['4WD convoy with satellite communications', 'Professional expedition chef, camp manager, and Afar guides', 'Afar regional security escort & park permits', 'All expedition meals, camping gear, and endless bottled water', 'Airport transfers'],
    exclusions: ['Domestic airfare', 'Sleeping bag (available for rent)'],
    highlights: ['Neon-yellow Dallol sulfur chimneys', 'Erta Ale active boiling lava lake', 'Afar 100-camel salt caravans', 'Sleeping under pristine stars on salt flats'],
    rating: 4.98,
    reviewsCount: 112,
    featured: true,
  },
  {
    id: 'axum-ancient-kingdom-pilgrimage',
    title: 'Axum Ancient Kingdom, Sacred Obelisks & Ark of the Covenant',
    category: 'Historical & UNESCO',
    region: 'tigray',
    duration: 'Customizable 2 - 3 Days',
    scheduleType: 'Flexible Heritage Schedule',
    groupSize: '1 - 10 Guests (Private / Small Group)',
    difficulty: 'Easy',
    priceFromUSD: 390,
    image: '',
    isChronicleOnly: true,
    shortDescription: 'Discover the ancient cradle of Ethiopian civilization in Axum (UNESCO). Stand before 1,700-year-old carved monolithic granite stelae, visit the sacred Church of Our Lady Mary of Zion (guardian of the Ark of the Covenant), explore Queen of Sheba’s palace, and marvel at the royal catacombs.',
    itinerarySummary: [
      'Day 1: Arrival at Axum Airport (AXU) with private meet & greet; guided walking tour through the UNESCO Northern Stelae Park, King Ezana’s 24-meter Stele, and the subterranean Tomb of the False Door',
      'Day 2: Morning pilgrimage to the Church of Our Lady Mary of Zion and the Chapel of the Tablet (housing the Ark of the Covenant); visit the Axum Archaeological Museum and royal crowns collection',
      'Day 3: Queen of Sheba’s Palace (Dungur ruins), May Shum reservoir bath, the Ezana Trilingual Inscription Stone, and King Kaleb & Gebre Meskel tombs; evening traditional Tigray dinner with Tihlo tasting'
    ],
    inclusions: [
      'Private airport transfers in Axum with air-conditioned vehicle & fuel',
      'Certified English-speaking Tigray licensed historical guide',
      'All UNESCO monument permits, church sanctuary tickets, and museum entries',
      'Boutique hotel accommodation with breakfast',
      'Bottled mineral water throughout tour'
    ],
    exclusions: ['Domestic flights (can be bundled upon request)', 'Lunches and dinners outside specified tastings', 'Personal shopping'],
    highlights: ['24-meter King Ezana monolithic granite stele', 'Church of St. Mary of Zion (Ark of the Covenant)', 'Queen of Sheba’s Dungur Palace and May Shum bath', 'Ancient Ge’ez trilingual Ezana inscription stone'],
    rating: 4.99,
    reviewsCount: 78,
    featured: true,
  },
  {
    id: 'gheralta-tigray-cliff-churches-expedition',
    title: 'Gheralta Mountain Cliff Churches & Ancient Tigray Expedition',
    category: 'Nature & Trekking',
    region: 'tigray',
    duration: 'Customizable 3 - 4 Days',
    scheduleType: 'Tailored Adventure Schedule',
    groupSize: '2 - 8 Guests',
    difficulty: 'Moderate',
    priceFromUSD: 520,
    image: '',
    isChronicleOnly: true,
    shortDescription: 'An unforgettable adventure through Tigray’s dramatic scarlet sandstone pinnacles: scale the sheer cliff face to the miraculous Abuna Yemata Guh church, trek to Maryam Korkor, visit the 2,800-year-old Yeha Temple, and experience authentic Tigray mountain hospitality.',
    itinerarySummary: [
      'Day 1: Flight from Addis Ababa to Axum or Mekele; scenic 4WD drive through the breathtaking sandstone formations of the Gheralta Valley; sunset over Hawzen plains',
      'Day 2: Morning guided climb to Abuna Yemata Guh with certified local safety scouts and climbing harnesses; explore 5th-century fresco cupolas; afternoon relaxation or visit to Abreha we Atsbeha church',
      'Day 3: Scenic ridge hike up to Maryam Korkor and Daniel Korkor monasteries overlooking the vast desert plains; traditional Tigray coffee ceremony and festive Tihlo dinner',
      'Day 4: Excursion to Yeha Great Temple (Ethiopia’s oldest standing monument from 800 BC) and historic Al-Nejashi Mosque; transfer to airport for return flight to Addis Ababa'
    ],
    inclusions: [
      'Private 4WD Land Cruiser with professional driver throughout Tigray',
      'Certified mountain trekking guide and local rock climbing safety scouts',
      'All church entry fees, priest blessings, and community contributions',
      'Quality cliffside lodge / stone guesthouse accommodation with breakfast',
      'Daily bottled mineral water & traditional coffee ceremony'
    ],
    exclusions: ['Domestic flights (can be bundled upon request)', 'Personal climbing shoes (sneakers recommended)'],
    highlights: ['Abuna Yemata Guh cliff face ascent & 5th-century frescoes', 'Maryam Korkor 360-degree mountain panorama', 'Yeha 2,800-year-old pre-Aksumite Great Temple', 'Al-Nejashi historic mosque in Negash'],
    rating: 4.98,
    reviewsCount: 65,
    featured: true,
  },
  {
    id: 'jimma-abba-jifar-royal-coffee-trail',
    title: 'Jimma Kingdom, Abba Jifar Palace & Specialty Coffee Origin Trail',
    category: 'Historical & UNESCO',
    region: 'oromia',
    duration: 'Customizable 2 - 3 Days',
    scheduleType: 'Flexible Heritage Schedule',
    groupSize: '1 - 10 Guests (Private / Small Group)',
    difficulty: 'Easy',
    priceFromUSD: 340,
    image: '',
    isChronicleOnly: true,
    shortDescription: 'Journey to the historic royal capital of the Jimma Kingdom in Oromia. Explore the 19th-century Palace of King Abba Jifar II at Jiren hill, visit the Jimma Cultural Museum, meet master wood artisans carving traditional Barcuma chairs, and experience the birthplace of specialty Arabica coffee.',
    itinerarySummary: [
      'Day 1: Scenic flight from Addis Ababa to Jimma (JIM); private transfer and check-in; afternoon visit to the Jimma Cultural Museum and the vibrant artisan woodcarvers market to observe master craftsmen carving three-legged Barcuma stools',
      'Day 2: Full guided historical expedition to the Palace of King Abba Jifar II atop Jiren hill; tour the royal reception balcony, historic timber mosque, royal bedchambers, and Council Hall; traditional Oromo lunch with authentic Marqaa and Buna Qalaa ceremony',
      'Day 3: Specialty coffee origin excursion through historic shade-grown Arabica forest plantations and washing stations; birdwatching at Boye wetland; afternoon flight back to Addis Ababa'
    ],
    inclusions: [
      'Private airport transfers in Jimma with air-conditioned vehicle & fuel',
      'Certified English-speaking Oromia licensed historical guide',
      'All entrance fees to King Abba Jifar Palace, museum, and royal grounds',
      'Boutique hotel / lodge accommodation in Jimma with daily breakfast',
      'Traditional Oromo coffee ceremony tasting & bottled mineral water'
    ],
    exclusions: ['Domestic flights (can be bundled upon request)', 'Lunches and dinners outside specified cultural tastings', 'Personal craft purchases'],
    highlights: ['1880s Palace of King Abba Jifar II on Jiren hill', 'Jimma Cultural Museum royal regalia', 'Specialty single-origin Arabica coffee trail', 'Traditional Oromo Barcuma hand-carved woodwork'],
    rating: 4.97,
    reviewsCount: 52,
    featured: true,
  }
];

export const FOOD_DISHES_DATA: FoodDish[] = [
  {
    id: 'doro-wat',
    name: 'Doro Wat',
    nativeName: 'ዶሮ ወጥ',
    category: 'meat',
    image: doroWatImg,
    description: 'The crown jewel of Ethiopian celebration cuisine. Tender free-range chicken drumsticks slow-cooked for hours with caramelized onions, rich Berbere spice, Niter Kibbeh (spiced clarified butter), and hard-boiled eggs with scored patterns to absorb the aromatic sauce.',
    mainIngredients: ['Free-range chicken drumsticks', 'Red onions (slowly caramelized for 4+ hours)', 'Authentic Berbere spice blend', 'Niter Kibbeh (spiced clarified butter)', 'Hard-boiled eggs', 'Garlic, ginger, and cardamom (korarima)'],
    spiceLevel: 'Hot',
    culturalBackground: 'Prepared for major Ethiopian holidays including Enkutatash (New Year), Genna (Christmas), and Fasika (Easter). In traditional culture, making a perfect Doro Wat is a celebrated mark of culinary artistry.',
    servedWith: 'Freshly baked Teff Injera, fresh Ayib (cottage cheese), and Gomen (collard greens) to balance the rich heat.'
  },
  {
    id: 'kitfo',
    name: 'Kitfo',
    nativeName: 'ክትፎ',
    category: 'meat',
    image: kitfoImg,
    description: 'A prestigious dish originating from the Gurage people and beloved across Ethiopia. Lean, finely minced prime beef marinated warmly in Niter Kibbeh infused with cardamom and fiery Mitmita spice blend.',
    mainIngredients: ['Finely minced prime lean beef (top round/tenderloin)', 'Niter Kibbeh (clarified butter spiced with korarima and kosseret)', 'Mitmita spice blend (African bird’s eye chili, cloves, cardamom)', 'Ayib (fresh mild curd cheese)', 'Gomen Kitfo (finely chopped collards)'],
    spiceLevel: 'Hot',
    culturalBackground: 'Served during major celebrations and Meskel festival. Can be ordered "Tire" (raw/tartare), "Leb Leb" (gently warmed), or "Betam Yebesele" (fully cooked) according to guest preference.',
    servedWith: 'Kocho (traditional fermented enset flatbread), Teff Injera, Ayib, and spiced Gomen.'
  },
  {
    id: 'shekla-tibs',
    name: 'Shekla Tibs',
    nativeName: 'ሸክላ ጥብስ',
    category: 'meat',
    image: sheklaTibsImg,
    description: 'Tender cubes of beef or lamb sautéed with rosemary, sliced onions, garlic, and green chilies, served sizzling over a traditional elevated clay pot (Shekla) fueled by glowing charcoal embers.',
    mainIngredients: ['Prime beef tenderloin or lamb cubes', 'Fresh rosemary sprigs', 'Sliced red onions', 'Jalapeño / green chilies', 'Garlic, ginger, Niter Kibbeh', 'Awaze chili dipping sauce and Senafich (mustard dip)'],
    spiceLevel: 'Medium',
    culturalBackground: 'A cornerstone of Ethiopian dining and social gatherings, eaten with friends alongside cold drinks or traditional Tej wine while the aroma of sizzling rosemary fills the air.',
    servedWith: 'Rolled Injera, Awaze sauce, Senafich spicy mustard, and fresh tomato salad.'
  },
  {
    id: 'shiro-tegamino',
    name: 'Shiro Tegamino',
    nativeName: 'ሽሮ ተጋሚኖ',
    category: 'fasting-vegan',
    image: shiroImg,
    description: 'Ethiopia’s ultimate comfort food. Sun-dried chickpeas and broad beans finely ground with garlic, ginger, and up to 15 aromatic spices, simmered to a velvety stew bubbling inside a hot clay pot (Tegamino).',
    mainIngredients: ['Spiced roasted chickpea & split pea powder (Shiro)', 'Finely diced red onions', 'Garlic & ginger paste', 'Niter Kibbeh (or vegetable oil for vegan fasting seasons)', 'Tomatoes and whole jalapeño peppers'],
    spiceLevel: 'Medium',
    culturalBackground: 'Eaten daily across all households and the hero dish during fasting seasons observed in the Ethiopian Orthodox calendar where animal products are excluded.',
    servedWith: 'Piping hot directly in the clay pot with rolls of soft, pliable Teff Injera.',
    isVegetarian: true
  },
  {
    id: 'beyaynetu',
    name: 'Beyaynetu (Fasting Rainbow Platter)',
    nativeName: 'የጾም በያይነቱ',
    category: 'fasting-vegan',
    image: beyaynetuImg,
    description: 'A stunning, colorful vegetarian feast arranged artistically across a large circular sheet of Teff Injera. Features up to 10 distinct vegan stews including Misir Wat, Kik Alicha, Gomen, Shiro, Atkilt Wat, and beetroot salad.',
    mainIngredients: ['Misir Wat (Spicy red lentils)', 'Kik Alicha (Mild yellow split peas)', 'Gomen (Simmered collard greens)', 'Atkilt Wat (Cabbage, carrots, potatoes)', 'Shiro (Velvety chickpea stew)', 'Key Sir (Beetroot & potato salad)', 'Timatim Salata (Tomato & chili salad)'],
    spiceLevel: 'Medium',
    culturalBackground: 'The gold standard for plant-based eaters worldwide. Created for Ethiopian Orthodox fasting traditions, offering a balanced, naturally gluten-free feast.',
    servedWith: 'A large shared Injera platter meant to be eaten communally with the right hand.',
    isVegetarian: true
  },
  {
    id: 'injera-teff',
    name: 'Authentic 100% Teff Injera',
    nativeName: 'እንጀራ',
    category: 'bread-grains',
    image: injeraImg,
    description: 'The foundation of Ethiopian culinary life. A spongy, sourdough flatbread naturally fermented from Teff—an ancient, nutrient-dense, naturally gluten-free grain domesticated in the Ethiopian highlands.',
    mainIngredients: ['Pure Highland Teff flour (Ivory / Red Teff)', 'Pure spring water', 'Ersho (traditional living sourdough starter)'],
    spiceLevel: 'Mild',
    culturalBackground: 'Injera serves simultaneously as the platter, the utensil, and the bread. The sourdough fermentation produces characteristic "eyes" (Ayn) on the surface that hold savory sauces perfectly.',
    servedWith: 'Every single Ethiopian stew and dish.'
  },
  {
    id: 'marqaa',
    name: 'Marqaa (Oromo Genfo / Porridge)',
    nativeName: 'Marqaa (Oromo)',
    category: 'oromo',
    oromoRegion: 'All Oromia Regions & Highland Ethiopia',
    image: marqaaImg,
    description: 'A nourishing, dense ceremonial porridge sculpted into a volcano mound with a central well filled with melted spiced clarified butter (Dhadhaa), Berbere spice, and topped with cool Ayib or fresh milk.',
    mainIngredients: ['Roasted barley flour (Bula) or wheat flour', 'Water and sea salt', 'Dhadhaa (Oromo spiced butter)', 'Berbere or Mitmita spice', 'Fresh cottage cheese (Ayib) or whole milk'],
    spiceLevel: 'Medium',
    culturalBackground: 'Prepared for mothers after giving birth for vitality and served to honored guests during major lifecycle ceremonies and family reunions across Oromia.',
    servedWith: 'Eaten by dipping outer porridge edges into the warm spiced butter well using a small fork or spoon.'
  },
  {
    id: 'buna-qalaa',
    name: 'Buna Qalaa (Oromo Coffee Blessing Ritual)',
    nativeName: 'Buna Qalaa (Oromo)',
    category: 'oromo',
    oromoRegion: 'Borena, Guji & Arsi (Oromia)',
    image: bunaQalaaImg,
    description: 'An ancient, sacred Oromo coffee ritual. Whole green coffee beans are gently fried in pure spiced clarified butter (Dhadhaa) until they crack and glisten, then served whole in a wooden bowl with fresh milk for blessings and peace (Nagaa).',
    mainIngredients: ['Whole green Arabica coffee beans', 'Dhadhaa (pure clarified cow butter)', 'Whole fresh cow milk', 'Cardamom and herbal seasonings'],
    spiceLevel: 'Mild',
    culturalBackground: 'Buna Qalaa is central to Oromo Gadaa prayers, weddings, and reconciliations. Elders chew the buttery coffee beans while bestowing blessings of peace, health, and fertility upon the family.',
    servedWith: 'Fresh milk and shared blessing prayers.'
  }
];

export const FOOD_DISHES = FOOD_DISHES_DATA;

export const FESTIVALS_DATA: Festival[] = [
  {
    id: 'timkat',
    name: 'Timkat (Ethiopian Epiphany)',
    nativeName: 'ጥምቀት',
    culture: 'Orthodox Christian',
    dateOrSeason: 'January 19 (January 20 on leap years)',
    nextDate: 'January 19, 2027',
    primaryLocations: ['Gondar (Fasilides’ Bath)', 'Addis Ababa (Jan Meda)', 'Lalibela'],
    image: '', // Photo removed per user directive; written cultural chronicle only
    history: 'Commemorating the baptism of Jesus Christ in the Jordan River by John the Baptist. Inscribed by UNESCO on the Representative List of the Intangible Cultural Heritage of Humanity in 2019.',
    culturalMeaning: 'Holy replicas of the Ark of the Covenant (Tabots) are carried on the heads of senior priests wrapped in rich velvet and gold embroidery, escorted by processions of deacons, choirs, and hundreds of thousands of pilgrims in pristine white Netela shawls.',
    visitorExperience: [
      'The thrilling dawn blessing of water at Fasilides’ Bath in Gondar where thousands leap into the pool',
      'Spectacular displays of ecclesiastical velvet umbrellas, silver sistra, and church drums (Kebero)',
      'Joyous street processions with singing, dancing, and royal horseback riders',
      'The ceremonial return of the Tabot to its sanctuary on the second day'
    ],
    travelTips: [
      'Gondar is the world epicentre for Timkat—early hotel bookings are vital',
      'Wear white clothing to blend respectfully with the pilgrim sea',
      'Position yourself early at Fasilides Bath before sunrise for optimal vantage'
    ]
  },
  {
    id: 'irreecha',
    name: 'Irreecha (Oromo Thanksgiving)',
    nativeName: 'Irreechaa',
    culture: 'Oromo',
    dateOrSeason: 'Late September / Early October (End of rainy season)',
    nextDate: 'October 2026',
    primaryLocations: ['Lake Hora Harsadi (Bishoftu / Oromia)', 'Meskel Square (Finfinnee / Addis Ababa)'],
    image: irreechaImg,
    history: 'Irreecha is the ancient thanksgiving festival of the Oromo people, celebrated for centuries to give thanks to Waaqa (God) for peace, fertility, health, and the transition from the rainy season into the bright harvest season.',
    culturalMeaning: 'Millions gather dressed in dazzling white traditional Oromo attire adorned with colorful embroidery. Participants hold fresh green grass (Coqorsa) and yellow Adey Abeba flowers, dipping them into the holy lake water to sprinkle blessings of peace and unity.',
    visitorExperience: [
      'Witness millions of celebrants singing joyful Oromo praise songs and rhythmic hand clapping',
      'See beautiful traditional Oromo hairstyles, beadwork, and horse processions',
      'Participate peacefully in the blessing of water at Lake Hora Harsadi',
      'Taste traditional Oromo holiday dishes including Marqaa, Buna Qalaa, and Dhadhaa'
    ],
    travelTips: [
      'Book hotel accommodations in Addis Ababa and Bishoftu months in advance',
      'Wear comfortable walking shoes as vehicle traffic near the lakes is closed for pedestrian safety',
      'Hire a Bridge Ethiopia local guide to explain the spiritual meaning of the Gadaa prayers'
    ]
  },
  {
    id: 'meskel',
    name: 'Meskel (Finding of the True Cross)',
    nativeName: 'መስቀል',
    culture: 'Orthodox Christian',
    dateOrSeason: 'September 27 (September 28 on leap years)',
    nextDate: 'September 27, 2026',
    primaryLocations: ['Meskel Square (Addis Ababa)', 'All towns and villages across Ethiopia'],
    image: meskelImg,
    history: 'Commemorates the 4th-century discovery of the True Cross by Queen Helena (Empress Saint Helena) of Constantinople, who was guided by smoke from a sacred bonfire. UNESCO Intangible Cultural Heritage.',
    culturalMeaning: 'A massive conical pyramid of wood topped with yellow Adey Abeba daisies (the Demera) is erected in Meskel Square and lit at twilight by the Patriarch of the Ethiopian Orthodox Church, amidst prayers and torch-bearing deacons.',
    visitorExperience: [
      'The lighting of the colossal Demera bonfire in Addis Ababa with hundreds of thousands looking on',
      'Watching the direction the central bonfire pole falls, traditionally prophesying the coming year’s blessings',
      'Cross-marking foreheads with charcoal ash as a sign of spiritual protection and renewal',
      'Vibrant communal family feasts of Doro Wat and Kitfo following the ceremony'
    ],
    travelTips: [
      'Arrive at Meskel Square in early afternoon for stadium seating before roads close',
      'Protect your eyes and cameras from festive smoke thermals near the Demera',
      'Combine with an evening cultural dinner at a traditional restaurant'
    ]
  },
  {
    id: 'genna',
    name: 'Genna / Leddet (Ethiopian Christmas)',
    nativeName: 'ገና',
    culture: 'Orthodox Christian',
    dateOrSeason: 'January 7',
    nextDate: 'January 7, 2027',
    primaryLocations: ['Lalibela Rock-Hewn Churches', 'Addis Ababa'],
    image: lalibelaImg,
    history: 'Celebrates the Nativity of Jesus Christ according to the Julian/Ethiopian Calendar after the 43-day Advent fasting period (Tsome Nebiyat).',
    culturalMeaning: 'Lalibela becomes a living sea of white-robed pilgrims who gather overnight on the cliffs above Bet Maryam and Bet Giyorgis chanting ancient Ge’ez hymns with brass sistra.',
    visitorExperience: [
      'The ethereal candle-lit overnight vigil on the rock cliffs of Lalibela with 100,000+ pilgrims',
      'The rhythmic dancing of white-turbaned priests on the edge of sheer stone chasms',
      'Witnessing traditional cultural matches of Genna hockey in mountain clearings',
      'Breaking the fast with rich Doro Wat and Tej mead feasts'
    ],
    travelTips: [
      'Book flights and accommodations in Lalibela well ahead for Christmas',
      'Dress in layers; night temperatures on Lalibela cliffs are chilly during midnight prayer'
    ]
  },
  {
    id: 'fasika',
    name: 'Fasika (Ethiopian Orthodox Easter & Holy Week)',
    nativeName: 'ፋሲካ / ትንሣኤ',
    culture: 'Orthodox Christian',
    dateOrSeason: 'April / May (Calculated by Orthodox Easter cycle)',
    nextDate: 'May 2, 2027',
    primaryLocations: ['Lalibela', 'Axum Tsion', 'Addis Ababa Cathedral'],
    image: lalibelaImg,
    history: 'Following the rigorous 55-day Great Lent (Hudadi) of vegan fasting, Fasika culminates in joyous midnight resurrection liturgies across all Ethiopian churches.',
    culturalMeaning: 'Worshipers dressed in pristine white garments hold beeswax candles inside churchyards until 3:00 AM, when priests proclaim "Kristos Tenestwal" (Christ is Risen). Families break the fast together with feasts at sunrise.',
    visitorExperience: [
      'The awe-inspiring sea of glowing beeswax tapers flickering at midnight inside ancient rock churches',
      'The joyful morning feasts featuring traditional Doro Wat, roasted lamb (Tibs), and fresh Defo Dabo bread',
      'Warm familial hospitality and customary blessings from community elders'
    ],
    travelTips: [
      'Attend the midnight church service with a local guide for translation and cultural navigation',
      'Respectful church attire (white shawl/scarf covering shoulders and head) is required'
    ]
  },
  {
    id: 'kulubi-gabriel',
    name: 'Kulubi Gabriel (Pilgrimage of Saint Gabriel)',
    nativeName: 'ቁልቢ ገብርኤል',
    culture: 'Orthodox Pilgrimage',
    dateOrSeason: 'December 28 & July 26',
    nextDate: 'December 28, 2026',
    primaryLocations: ['Mount Kulubi (near Dire Dawa & Harar)'],
    image: kulubiImg,
    history: 'One of the largest religious pilgrimages in Africa, dating back to the late 19th century when Ras Makonnen built the sanctuary atop Mount Kulubi.',
    culturalMeaning: 'Over half a million pilgrims from all walks of life, Christians and Muslims alike, walk barefoot up the holy mountain carrying symbolic votive offerings, umbrellas, and babies dedicated in answered prayers.',
    visitorExperience: [
      'Vibrant tapestry of colorful prayer umbrellas and singing pilgrims ascending Mount Kulubi',
      'Rich spiritual camaraderie where food, water, and shelter are shared freely among travelers',
      'Combine pilgrimage with an excursion to nearby walled city Harar Jugol'
    ],
    travelTips: [
      'Stay in Dire Dawa or Harar hotels and arrange private 4WD transport to the mountain base',
      'Carry hydration and comfortable walking gear for the hillside ascent'
    ]
  },
  {
    id: 'enkutatash',
    name: 'Enkutatash (Ethiopian New Year)',
    nativeName: 'እንቁጣጣሽ',
    culture: 'Pan-Ethiopian',
    dateOrSeason: 'September 11 (September 12 on leap years)',
    nextDate: 'September 11, 2026',
    primaryLocations: ['Nationwide (Addis Ababa, Raguel Church on Entoto, towns & rural villages)'],
    image: enkutatashImg,
    history: 'Meaning "Gift of Jewels", traditionally associated with the Queen of Sheba’s return from visiting King Solomon in Jerusalem, coinciding with the end of the rainy season and the blooming of the yellow Adey Abeba flowers.',
    culturalMeaning: 'Marks the first day of Meskerem in the Ethiopian Calendar. Young girls dressed in fresh Netelas sing the traditional New Year song "Abebayehosh" from house to house presenting bouquets of wild yellow daisies.',
    visitorExperience: [
      'Witness the countryside and cities blanketed in vibrant yellow Adey Abeba wild blossoms',
      'Children delivering hand-drawn New Year pictures to neighbor doorsteps with blessings',
      'Communal roasting of sheep and preparation of Doro Wat feasts',
      'Evening family bonfires (Chibo) in front of homes to symbolize the light of a new year'
    ],
    travelTips: [
      'A wonderful time for travelers to experience Ethiopian family hospitality',
      'Wish locals "Melkam Addis Amet!" (Happy New Year in Amharic) or "Bagaa Bara Haaraa Geessan!" (in Afaan Oromoo)'
    ]
  },
  {
    id: 'ashenda',
    name: 'Ashenda / Shadey / Solel Festival',
    nativeName: 'ኣሸንዳ',
    culture: 'Northern Cultural Heritage',
    dateOrSeason: 'Late August (August 22–26)',
    nextDate: 'August 22, 2026',
    primaryLocations: ['Mekele, Lalibela, Sekota, Raya, and Northern regions'],
    image: lalibelaImg,
    history: 'A vibrant cultural festival celebrating the freedom, beauty, and sisterhood of young women and girls in Northern Ethiopia.',
    culturalMeaning: 'Young women dress in elaborate pleated dresses (Tilfi), intricate cornrow hairstyles (Shuruba), silver jewelry, and tie fresh fragrant Ashenda grass around their waists, dancing and singing with small hand drums.',
    visitorExperience: [
      'Groups of beautifully adorned young women filling city squares with rhythmic clapping and song',
      'Intricate traditional Ethiopian braided hairstyles on display',
      'A joyous celebration of women’s empowerment and cultural pride'
    ],
    travelTips: [
      'Travelers are welcomed with singing; it is customary to give small tokens of appreciation',
      'A photographer’s dream for vibrant portraits of traditional jewelry and garments'
    ]
  },
  {
    id: 'fichee-chambalaalla',
    name: 'Fichee-Chambalaalla (Sidama New Year)',
    nativeName: 'Fichee-Chambalaalla',
    culture: 'Sidama (UNESCO Heritage)',
    dateOrSeason: 'Determined by Sidama astronomers (Ayanto) in June/July',
    nextDate: 'July 2026',
    primaryLocations: ['Hawassa (Gudumale Square) / Sidama Region'],
    image: arbaMinchImg,
    history: 'UNESCO Intangible Cultural Heritage of Humanity (inscribed in 2015). An ancient New Year celebration handed down through generations by the Sidama people.',
    culturalMeaning: 'Promotes unity, social harmony, conflict resolution, and the sharing of the traditional dish Qoqiyyo and milk. Elders convene assemblies to reconcile disputes.',
    visitorExperience: [
      'Traditional Sidama drum rhythms, Ketala warrior dance, and graceful women’s dances',
      'Ceremonial reconciliation gatherings led by Sidama clan elders',
      'Scenic celebrations along the shores of Lake Hawassa'
    ],
    travelTips: [
      'Combine with birdwatching and sunset boat trips on Lake Hawassa',
      'Taste authentic Sidama coffee and fresh fish from Hawassa fish market'
    ]
  },
  {
    id: 'harar-eid',
    name: 'Eid Celebrations in Harar & Al-Nejashi',
    nativeName: 'ዒድ (Eid in Harar & Negash)',
    culture: 'Islamic Heritage',
    dateOrSeason: 'Lunar Hijri Calendar (Shawwal & Dhu al-Hijjah)',
    nextDate: 'Eid al-Adha & Eid al-Fitr',
    primaryLocations: ['Harar Jugol (Walled City)', 'Al-Nejashi Mosque (Wukro)'],
    image: hararImg,
    history: 'Ethiopia is home to the First Hijra in Islamic history and Harar is revered as the 4th holiest city in Islam with 82 historic mosques.',
    culturalMeaning: 'Communal prayers fill the historic public courtyards of Harar followed by traditional hospitality, sharing of halwa sweets, and night chants in ancient Harari and Afar dialects.',
    visitorExperience: [
      'Experience the warm cultural hospitality of the historic walled city of Harar',
      'Visit the ancient 7th-century sanctuary of Al-Nejashi Mosque',
      'Enjoy rich Harari culinary traditions and festive coffee rituals'
    ],
    travelTips: [
      'Dress modestly when visiting holy sites and mosques in Harar and Negash',
      'Taste fresh Harari halwa and spiced ginger coffee'
    ]
  }
];

export const ACCOMMODATIONS_DATA: Accommodation[] = [
  {
    id: 'sheraton-addis',
    name: 'Addis Luxury Garden Sanctuary',
    type: 'Resort',
    location: 'Central Addis Ababa',
    region: 'addis-ababa',
    image: addisImg,
    gallery: [addisImg],
    description: 'Ethiopia’s landmark luxury sanctuary nestled in lush private hilltop gardens with heated outdoor pools, fine dining, spa, and supreme security.',
    amenities: ['Heated Pool with underwater music', 'Multiple gourmet restaurants', 'Full Spa & Wellness Center', 'High-speed Wi-Fi', 'Airport Limousine Service', '24/7 Concierge'],
    priceRange: 'Luxury ($$$$)',
    pricePerNightUSD: 290,
    contactPhone: '+251 11 517 1717',
    whatsapp: '+251912213888',
    rating: 4.8,
    isVerified: true
  },
  {
    id: 'kuriftu-resort-bishoftu',
    name: 'Bishoftu Lakeside Eco-Resort & Spa',
    type: 'Resort',
    location: 'Lake Kuriftu, Bishoftu (Oromia)',
    region: 'oromia',
    image: wenchiImg,
    gallery: [wenchiImg],
    description: 'Lakeside eco-resort crafted from natural stone and wood just 45 minutes from Addis Ababa. Boasts private cabanas, lakeview infinity pool, luxury spa, and boat excursions.',
    amenities: ['Lakeside Infinity Pool', 'Swedish & Traditional Massage Spa', 'Water Sports & Kayaking', 'Lakeview Dining Restaurant', 'Organic Gardens'],
    priceRange: 'Upscale ($$$)',
    pricePerNightUSD: 165,
    contactPhone: '+251 11 433 9300',
    whatsapp: '+251912213888',
    rating: 4.7,
    isVerified: true
  },
  {
    id: 'bale-mountain-lodge',
    name: 'Bale Cloud Forest Eco-Lodge',
    type: 'Eco-Lodge',
    location: 'Harenna Forest, Bale Mountains (Oromia)',
    region: 'oromia',
    image: baleImg,
    gallery: [baleImg],
    description: 'An internationally acclaimed boutique eco-lodge nestled inside the remote Harenna Cloud Forest. Off-grid micro-hydro power, panoramic mountain views, and direct access to rare wildlife.',
    amenities: ['Private Wood-Burning Stoves', 'Panoramic Cloud Forest Balconies', 'Expert Wildlife Trackers', 'Gourmet Organic Dining', 'Solar & Hydro-powered'],
    priceRange: 'Luxury Eco ($$$$)',
    pricePerNightUSD: 310,
    contactPhone: '+251 911 202 244',
    whatsapp: '+251912213888',
    rating: 4.9,
    isVerified: true
  },
  {
    id: 'maribela-hotel-lalibela',
    name: 'Lalibela Cliffside Panorama Lodge',
    type: 'Eco-Lodge',
    location: 'Lalibela Mountain Ridge',
    region: 'northern-ethiopia',
    image: lalibelaImg,
    gallery: [lalibelaImg],
    description: 'Stunning cliffside retreat offering breathtaking sunset panoramas across the Lalibela valleys, decorated with modern Ethiopian motifs and handwoven textiles.',
    amenities: ['Panoramic Valley Balconies with Daybeds', 'Rooftop Bar & Restaurant', 'Free Airport Shuttle', 'Fast Wi-Fi', 'Solar Heated Water'],
    priceRange: 'Comfortable Mid-Range ($$)',
    pricePerNightUSD: 110,
    contactPhone: '+251 33 336 0777',
    whatsapp: '+251912213888',
    rating: 4.85,
    isVerified: true
  },
  {
    id: 'simien-lodge',
    name: 'Simien Highland Escarpment Lodge',
    type: 'Eco-Lodge',
    location: 'Buyit Ras, Simien Mountains National Park',
    region: 'northern-ethiopia',
    image: simienImg,
    gallery: [simienImg],
    description: 'Spectacular mountain eco-lodge perched at 3,260 meters elevation inside the national park. Features traditional Tukuls with underfloor solar heating and panoramic escarpment vistas.',
    amenities: ['Underfloor Solar Heating', 'Highest Fireside Lounge in Africa', 'Escarpment View Terraces', 'Guided Treks & Park Logistics'],
    priceRange: 'Upscale Eco ($$$)',
    pricePerNightUSD: 195,
    contactPhone: '+251 58 114 0244',
    whatsapp: '+251912213888',
    rating: 4.75,
    isVerified: true
  },
  {
    id: 'rowda-harari-guesthouse',
    name: 'Harar Historic Gegar Heritage Guesthouse',
    type: 'Guesthouse',
    location: 'Inside Harar Jugol Walled City',
    region: 'eastern-ethiopia',
    image: hararImg,
    gallery: [hararImg],
    description: 'An authentic restored traditional Harari house (Gegar) with vibrant niche walls (Taqet), Persian rugs, and peaceful interior courtyard inside the historic walls.',
    amenities: ['Authentic Harari Living Experience', 'Home-cooked Harari Breakfast', 'Walking distance to all 5 City Gates', 'Cultural Tour Hosting'],
    priceRange: 'Authentic Budget-Mid ($$)',
    pricePerNightUSD: 65,
    contactPhone: '+251 915 321 000',
    whatsapp: '+251912213888',
    rating: 4.9,
    isVerified: true
  },
  {
    id: 'paradise-lodge-arba-minch',
    name: 'Arba Minch Cliffside Panorama Lodge',
    type: 'Eco-Lodge',
    location: 'Cliffside Overlooking Lake Chamo & Lake Abaya, Arba Minch (Southern)',
    region: 'southern-ethiopia',
    image: arbaMinchImg,
    gallery: [arbaMinchImg, omoImg],
    description: 'Perched atop the scenic ridge between Lake Abaya and Lake Chamo with 360-degree panoramic views of Nechisar National Park and the "Bridge of God". Handcrafted bamboo tukuls inspired by local Dorze architecture with outdoor pool and sunset terrace.',
    amenities: ['Panoramic Rift Valley Infinity Pool', 'Authentic Dorze-style Bamboo Bungalows', 'Sunset Terrace Restaurant', 'Private Boat Safari Booking Logistics', 'Free Wi-Fi & Airport Shuttle'],
    priceRange: 'Upscale Eco ($$$)',
    pricePerNightUSD: 145,
    contactPhone: '+251 46 881 2222',
    whatsapp: '+251912213888',
    rating: 4.88,
    isVerified: true
  }
];

export const BUSINESSES_DATA: BusinessListing[] = [
  {
    id: 'hindek-kitchen-official',
    businessName: 'Hindek Kitchen & Cultural Space',
    category: 'Food Experiences',
    location: 'Bole Sub-City, Addis Ababa',
    description: 'Official Bridge Ethiopia culinary venue offering interactive Ethiopian cooking masterclasses, traditional Injera baking, and Mesob feasts.',
    services: ['Hands-on Cooking Classes', 'Injera Mitad Baking', 'Mesob Group Dining', 'Spice Masterclasses', 'Private Cultural Events'],
    prices: 'Custom quote per request',
    phone: '+251 91 221 3888',
    whatsapp: '+251912213888',
    email: 'Hindek.ethiopia@gmail.com',
    openingHours: 'Daily: 09:00 AM – 09:00 PM (By reservation)',
    image: doroWatImg,
    packageType: 'Featured Advertisement',
    status: 'active',
    isVerified: true,
    isOfficialBridgeEthiopia: true,
    submittedDate: '2026-01-10'
  },
  {
    id: 'tomoca-coffee-piazza',
    businessName: 'Tomoca Coffee 1953',
    category: 'Restaurants & Cafes',
    location: 'Wavel Street, Piazza, Addis Ababa',
    description: 'Ethiopia’s legendary specialty coffee roastery established in 1953. Famous for rich macchiatos and whole roasted beans.',
    services: ['Artisan Macchiatos & Espressos', 'Roasted Coffee Beans & Grinding', 'Historic Cafe Atmosphere'],
    prices: 'Menu rates at location',
    phone: '+251 11 111 2781',
    whatsapp: '+251912213888',
    openingHours: 'Mon - Sat: 07:00 AM – 08:30 PM',
    image: coffeeCeremonyImg,
    packageType: 'Premium Listing',
    status: 'active',
    isVerified: true,
    submittedDate: '2026-02-15'
  },
  {
    id: 'oromia-wild-tours-guide',
    businessName: 'Oromia Wildlife & Mountain Expeditions',
    category: 'Local Tour Guides',
    location: 'Bale Robe & Bishoftu, Oromia',
    description: 'Certified local naturalist guides specializing in Ethiopian Wolf tracking in Bale Mountains, birdwatching, and Wenchi Caldera excursions.',
    services: ['Wildlife Tracking', 'Horseback Excursions', 'Oromo Cultural Village Tours', 'Custom Trekking Equipment'],
    prices: 'Custom itinerary quote',
    phone: '+251 922 456 789',
    whatsapp: '+251912213888',
    openingHours: '24/7 Logistics Support',
    image: tourBaleImg,
    packageType: 'Featured Advertisement',
    status: 'active',
    isVerified: true,
    submittedDate: '2026-03-01'
  },
  {
    id: 'habesha-kemis-weavers-coop',
    businessName: 'Shiro Meda Traditional Weavers Co-op',
    category: 'Cultural Shops & Artisans',
    location: 'Shiro Meda Market, Entoto Road, Addis Ababa',
    description: 'Fair-trade artisan cooperative producing hand-spun cotton Habesha Kemis dresses, Netela scarves, and woven blankets using ancient wooden looms.',
    services: ['Handmade Habesha Dresses', 'Custom Tailoring & Embroidery', 'Authentic Netela & Gabi', 'Worldwide Shipping'],
    prices: 'Custom artisan quotes',
    phone: '+251 911 345 678',
    whatsapp: '+251912213888',
    openingHours: 'Mon - Sun: 08:30 AM – 06:30 PM',
    image: '', // Photo upload placeholder
    packageType: 'Premium Listing',
    status: 'active',
    isVerified: true,
    submittedDate: '2026-03-12'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Sarah Jenkins',
    authorCountry: 'United Kingdom',
    avatar: '',
    rating: 5,
    date: 'February 2026',
    tourOrExperience: 'Hindek Kitchen & Addis City Tour',
    comment: 'Hindek was genuinely like a trusted local friend guiding us through Addis Ababa! The cooking class at Hindek Kitchen was the highlight of our entire African trip—we learned to bake Injera from scratch and drank the most fragrant coffee.',
    verifiedTrip: true
  },
  {
    id: 'rev-2',
    authorName: 'Dr. Michael Zimmerman',
    authorCountry: 'Germany',
    avatar: '',
    rating: 5,
    date: 'January 2026',
    tourOrExperience: 'Bale Mountains & Wenchi Crater Lake',
    comment: 'Bridge Ethiopia arranged our 4WD expedition into Bale Mountains flawlessly. We spotted 7 Ethiopian Wolves on the Sanetti Plateau and rode horses down Wenchi Caldera. Impeccable drivers and deep respect for local communities.',
    verifiedTrip: true
  },
  {
    id: 'rev-3',
    authorName: 'Elena Rostova',
    authorCountry: 'Canada',
    avatar: '',
    rating: 5,
    date: 'December 2025',
    tourOrExperience: 'Lalibela & Timkat Celebration',
    comment: 'Experiencing Timkat in Gondar and Lalibela through Bridge Ethiopia was unforgettable. Hindek coordinated our church permits and gave us a historical overview that made the ancient rock-hewn churches truly come alive.',
    verifiedTrip: true
  },
  {
    id: 'rev-4',
    authorName: 'Tadashi & Yoko Tanaka',
    authorCountry: 'Japan',
    avatar: '',
    rating: 5,
    date: 'November 2025',
    tourOrExperience: 'Hindek Grandpa Coffee Experience & Harar Trail',
    comment: 'As coffee roasters from Tokyo, the Hindek Grandpa Coffee Experience was deeply spiritual for us. Learning the three rounds (Abol, Tona, Baraka) and smelling the frankincense was pure magic.',
    verifiedTrip: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Bet Giyorgis Monolithic Cross Church',
    category: 'Northern Ethiopia',
    imageUrl: tourLalibelaImg,
    location: 'Lalibela, Wollo',
    caption: 'The 12th-century monolithic rock-hewn church of Saint George carved from solid pink volcanic tuff.'
  },
  {
    id: 'gal-2',
    title: 'Simien Mountains Escarpment',
    category: 'Nature',
    imageUrl: gallerySimienImg,
    location: 'Simien Mountains National Park',
    caption: 'Dramatic 1,500-meter drop-offs across the afro-alpine roof of Africa.'
  },
  {
    id: 'gal-3',
    title: 'Traditional Ethiopian Coffee Ceremony in Jebena',
    category: 'Coffee',
    imageUrl: coffeeCeremonyImg,
    location: 'Hindek Grandpa Coffee Experience, Addis Ababa',
    caption: 'The clay Jebena brewing freshly roasted Arabica beans over glowing embers.'
  },
  {
    id: 'gal-4',
    title: 'Authentic Doro Wat & Teff Injera Feast',
    category: 'Food',
    imageUrl: doroWatImg,
    location: 'Hindek Kitchen, Addis Ababa',
    caption: 'Slow-cooked celebration Doro Wat with hard-boiled eggs and 100% Teff Injera.'
  },
  {
    id: 'gal-5',
    title: 'Imperial Stone Castle Complex',
    category: 'Historical Sites',
    imageUrl: galleryGondarImg,
    location: 'Northern Historic Circuit',
    caption: 'The 17th-century stone palaces and castles of Emperor Fasilides.'
  },
  {
    id: 'gal-6',
    title: 'Irreecha Cultural Thanksgiving Celebration',
    category: 'Festivals',
    imageUrl: irreechaImg,
    location: 'Lake Hora & Addis Ababa',
    caption: 'Gathering with fresh Coqorsa grass and Adey Abeba flowers to give thanks for peace, harvest, and life.'
  },
  {
    id: 'gal-7',
    title: 'Endangered Ethiopian Wolf on Sanetti Plateau',
    category: 'Wildlife',
    imageUrl: tourBaleImg,
    location: 'Bale Mountains National Park',
    caption: 'The rare Ky Kebero hunting on the high afro-alpine plateau.'
  },
  {
    id: 'gal-8',
    title: 'Dallol Hydrothermal Formations',
    category: 'Nature',
    imageUrl: tourDanakilImg,
    location: 'Danakil Depression, Afar',
    caption: 'Surreal mineral formations and neon geothermal springs.'
  },
  {
    id: 'gal-9',
    title: 'Harar Jugol Fortified City Walls',
    category: 'Historical Sites',
    imageUrl: tourHararImg,
    location: 'Harar',
    caption: 'The 16th-century historic stone walls surrounding the ancient city.'
  },
  {
    id: 'gal-10',
    title: 'Ancient Hilltop Terraced Village (UNESCO)',
    category: 'Southern Ethiopia',
    imageUrl: konsoImg,
    location: 'Southern Terraced Highlands',
    caption: 'Ancient walled stone settlements and dense thatched huts nestled into green agricultural terraces.'
  },
  {
    id: 'gal-11',
    title: 'Lower Omo Valley Traditional Dance at Sunset',
    category: 'Southern Ethiopia',
    imageUrl: omoImg,
    location: 'Lower Omo Valley, Southern Ethiopia',
    caption: 'Vibrant cultural community celebration and dance at golden sunset.'
  },
  {
    id: 'gal-12',
    title: 'Kafa Wild Coffee Cloud Rainforest (UNESCO Biosphere)',
    category: 'Coffee',
    imageUrl: kafaImg,
    location: 'Kafa Biosphere Reserve, Southwestern Ethiopia',
    caption: 'Sunlight filtering through the ancient misty cloud forest where Coffea Arabica originated wild in the shade of mossy giant trees.'
  }
];

export const TRAVEL_TIPS_TOPICS = [
  {
    id: 'visa',
    title: 'Visa & Entry Requirements',
    icon: 'Passport',
    shortDesc: 'Official e-Visa and Visa on Arrival guidelines for international tourists.',
    content: `
      **Ethiopian Tourist e-Visa:**
      - All tourists can easily obtain an official e-Visa online prior to travel via the official Ethiopian Immigration portal (evisa.gov.et).
      - Processing time is typically 24 to 72 hours.
      - Ensure your passport has at least 6 months validity from the planned date of entry.
      - **Visa on Arrival:** Available at Addis Ababa Bole International Airport (ADD) for citizens of African Union member states and designated nationalities.
    `
  },
  {
    id: 'currency',
    title: 'Currency, Cash & Banking',
    icon: 'Banknote',
    shortDesc: 'Ethiopian Birr (ETB), ATM usage, credit cards, and exchange tips.',
    content: `
      **Ethiopian Birr (ETB):**
      - The local currency is the Ethiopian Birr (ETB).
      - ATMs accepting Visa and MasterCard are widely available throughout Addis Ababa, regional airport hubs, and major hotels.
      - In regional towns and local markets (like Merkato or Harar alleyways), cash in Ethiopian Birr is essential.
      - Foreign currencies can be exchanged at official bank branches and airport counters. Carry clean, undamaged bank notes.
    `
  },
  {
    id: 'transport',
    title: 'Domestic Flights & Ground Transport',
    icon: 'Plane',
    shortDesc: 'Ethiopian Airlines domestic network, 4WD Land Cruisers & private drivers.',
    content: `
      **Getting Around Ethiopia:**
      - **Domestic Flights:** Ethiopian Airlines operates an efficient domestic flight network connecting Addis Ababa with Lalibela, Gondar, Bahir Dar, Axum, Dire Dawa, Semera, Jinka, Arba Minch, Hawassa, and Jimma.
      - **Private 4WD Land Cruisers:** Essential for mountainous regions (Simien, Bale Mountains) and remote landscapes (Danakil, Omo Valley).
      - **Bridge Ethiopia Chauffeured Services:** We provide verified, experienced drivers with comfortable 4WD vehicles and comprehensive insurance.
    `
  },
  {
    id: 'sim-card',
    title: 'SIM Cards & Connectivity',
    icon: 'Wifi',
    shortDesc: 'Ethio Telecom & Safaricom 4G/5G mobile data setup at Bole Airport.',
    content: `
      **Staying Connected:**
      - Tourist SIM cards can be purchased immediately upon landing at Bole International Airport (Arrivals Hall) or in city branches.
      - Providers: **Ethio Telecom** (broadest national rural coverage) and **Safaricom Ethiopia** (fast urban 4G/5G).
      - Requirements: Original passport copy.
      - Wi-Fi is standard in quality hotels and cafes across Addis Ababa and tourist centers.
    `
  },
  {
    id: 'calendar-clock',
    title: 'The Ethiopian Calendar & 12-Hour Clock',
    icon: 'Calendar',
    shortDesc: '13 months of sunshine & the traditional sunrise-to-sunset time system.',
    content: `
      **Fascinating Ethiopian Time:**
      - **13 Months of Sunshine:** The Ethiopian calendar (Ge’ez calendar) has 12 months plus a 13th month of 5 or 6 leap days (Pagumē). It is approximately 7 years and 8 months behind the Gregorian calendar!
      - **The 12-Hour Clock:** Traditional Ethiopian time counts hours starting from sunrise.
      - Don’t worry—Bridge Ethiopia always coordinates times in standard international 24-hour time to ensure complete clarity!
    `
  },
  {
    id: 'etiquette-gursha',
    title: 'Cultural Etiquette & The Gursha Tradition',
    icon: 'HeartHandshake',
    shortDesc: 'Hospitality, greeting customs, right-hand dining & the loving gesture of Gursha.',
    content: `
      **Warm Ethiopian Traditions:**
      - **Gursha (Feeding One Another):** When eating around a shared Mesob platter, your host or friend may roll a morsel of Injera and stew and gently place it directly into your mouth. This is called *Gursha*—the highest gesture of affection, respect, and hospitality. Always accept with a smile!
      - **Right Hand Rule:** Food is traditionally eaten using only the right hand.
      - **Warm Greetings:** A handshake accompanied by touching right shoulders (shoulder bump) is a warm, customary greeting among friends.
      - **Dress Code:** When visiting churches and mosques, modest clothing covering knees and shoulders is required. Women often wear a light white cotton scarf (Netela).
    `
  },
  {
    id: 'weather',
    title: 'Seasons & When to Visit',
    icon: 'Sun',
    shortDesc: 'Highland dry season (Bega) vs green rainy season (Kiremt).',
    content: `
      **Climate Overview:**
      - **Bega (Dry Season, Oct – May):** Bright sunny days, cool crisp highland nights. Optimal for trekking, historical routes, and festival attendance.
      - **Kiremt (Main Rainy Season, June – Sept):** Lush green landscapes and roaring waterfalls; rains typically arrive in brief heavy afternoon downpours.
      - **Addis Ababa:** Pleasant "eternal spring" temperatures year-round due to high altitude.
    `
  },
  {
    id: 'packing',
    title: 'What to Pack',
    icon: 'Briefcase',
    shortDesc: 'Essentials for highlands, safari, cultural sites, and photography.',
    content: `
      **Packing Checklist:**
      - Sturdy, comfortable walking shoes / trail sneakers.
      - Warm fleece or jacket for chilly highland evenings.
      - Breathable, modest cotton layers for daytime exploring.
      - Slip-on socks for easy shoe removal at historical churches and monasteries.
      - Polarized sunglasses, broad-brimmed sunhat, and reef-safe sunscreen.
      - Universal power adapter (Type C / F European plug; 220V, 50Hz).
    `
  }
];
