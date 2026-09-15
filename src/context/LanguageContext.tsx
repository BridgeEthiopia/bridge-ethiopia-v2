import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'om' | 'am' | 'fr' | 'de' | 'it' | 'es' | 'ar' | 'ko';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  shortLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    shortLabel: 'EN',
    flag: '🇬🇧',
  },
  {
    code: 'om',
    name: 'Afaan Oromoo',
    nativeName: 'Afaan Oromoo',
    shortLabel: 'OM',
    flag: '🌳',
  },
  {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    shortLabel: 'AM',
    flag: '🇪🇹',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    shortLabel: 'KO',
    flag: '🇰🇷',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    shortLabel: 'FR',
    flag: '🇫🇷',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    shortLabel: 'DE',
    flag: '🇩🇪',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    shortLabel: 'IT',
    flag: '🇮🇹',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    shortLabel: 'ES',
    flag: '🇪🇸',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    shortLabel: 'AR',
    flag: '🇸🇦',
  },
];

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_destinations: 'Explore Ethiopia',
    nav_tours: 'Tours & Expeditions',
    nav_hindek_kitchen: 'Hindek Kitchen',
    nav_coffee: 'Grandpa Coffee',
    nav_food: 'Food Gallery',
    nav_festivals: 'Festivals',
    nav_travel_assistance: 'Travel Concierge',
    nav_hotels: 'Eco-Lodges & Stays',
    nav_about: 'About Hindek',
    nav_reviews: 'Traveler Reviews',
    nav_how_to_book: 'How to Book',
    nav_contact: 'Contact Us',
    nav_experiences: 'Experiences',
    nav_more: 'More Guides',
    btn_book_experience: 'Book an Experience',
    btn_plan_my_trip: 'Plan My Trip',
    btn_ask_ai: 'Ask AI Concierge',
    btn_upload_photos: 'Upload Photos',
    btn_whatsapp_direct: 'WhatsApp Direct',
    official_badge: 'Official Platform of Hindek • Addis Ababa, Ethiopia',
    connecting_tagline: 'Connecting the World with the Heart of Ethiopia',
    lang_toggle_aria: 'Select language',

    // Hero
    hero_badge: 'Authentic Journeys Guided by Hindek',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'Cultural Journeys, Living Heritage & Culinary Immersion',
    hero_desc: 'Experience the authentic soul of Ethiopia through curated expeditions, private cultural cooking at Hindek Kitchen, traditional Grandpa coffee ceremonies, and breathtaking ancient landscapes.',
    hero_search_placeholder: 'Where do you want to explore? (e.g. Bale Mountains, Lalibela, Omo Valley, Addis Ababa)...',
    hero_search_btn: 'Discover',
    hero_all_regions: 'All Regions',
    hero_all_categories: 'All Categories',
    hero_cta_explore: 'Explore Destinations',
    hero_cta_plan: 'Plan Custom Trip',
    hero_cta_kitchen: 'Join Hindek Kitchen',
    hero_stat_exp: '10+ Yrs',
    hero_stat_exp_lbl: 'Local Guidance',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'Traveler Rating',
    hero_stat_dest: '20+ Sites',
    hero_stat_dest_lbl: 'Curated Itineraries',

    // Explore Section
    destinations_badge: 'AUTHENTIC REGIONS & SACRED SITES',
    destinations_title: 'Explore Ethiopia’s Majestic Destinations',
    destinations_desc: 'From ancient rock-hewn wonders and dramatic volcanic lakes to vibrant tribal cultures and mountain peaks.',
    explore_badge: 'DESTINATIONS & REGIONS',
    explore_title: 'Discover the Wonders of Ethiopia',
    explore_desc: 'From the alpine heights of Bale Mountains and rock-hewn marvels of Lalibela to the dramatic landscapes of the Danakil and Great Rift Valley lakes.',
    explore_all_tab: 'All Destinations',
    btn_request_booking: 'Request Booking',
    btn_view_details: 'Explore Itinerary',

    // Tours Section
    tours_badge: 'CURATED EXPEDITIONS',
    tours_title: 'Unforgettable Journeys & Multi-Day Tours',
    tours_desc: 'Hand-crafted cultural, historical, trekking, and photography itineraries with trusted private transportation and licensed guides.',
    tours_custom_btn: 'Request Tailor-Made Itinerary',

    // Hindek Kitchen
    kitchen_badge: 'SIGNATURE CULINARY IMMERSION',
    kitchen_title: 'Hindek Kitchen Experience',
    kitchen_desc: 'An intimate, hands-on cooking and dining journey in Addis Ababa. Learn authentic Teff Injera baking, rich Doro Wat, and fragrant vegan Shiro using generational clay cookware.',
    kitchen_book_class: 'Reserve Cooking Class',

    // Coffee
    coffee_badge: 'ANCIENT COFFEE CEREMONY',
    coffee_title: 'Hindek Grandpa Coffee Experience',
    coffee_desc: 'Immerse in the ancestral birthplace of Arabica coffee. Witness the sacred 3-cup roasting and clay jebena brewing ritual with frankincense blessings and traditional popcorn.',
    coffee_book_btn: 'Book Coffee Ceremony',

    // Food Gallery
    food_badge: 'ETHIOPIAN & OROMO CUISINE',
    food_title: 'Culinary Traditions & Signature Dishes',
    food_desc: 'Explore the vibrant flavors, rich spices, and ancient fasting traditions of Ethiopian gastronomy.',

    // Festivals
    festivals_badge: 'CULTURAL CALENDAR',
    festivals_title: 'Sacred Celebrations & National Festivals',
    festivals_desc: 'Experience Timkat Epiphany, Meskel Demera, and Irreecha Oromo Thanksgiving with authentic local host guidance.',

    // Travel Assistant
    assistant_badge: 'LOCAL EXPERTISE',
    assistant_title: 'Travel Assistance & Concierge Services',
    assistant_desc: 'From private 4x4 vehicles with experienced drivers to airport transfers, translators, and customized business logistics.',

    // Accommodations
    lodges_badge: 'CURATED LODGING',
    lodges_title: 'Eco-Lodges, Boutique Resorts & Heritage Stays',
    lodges_desc: 'Rest comfortably in scenic mountain eco-lodges, Rift Valley lake retreats, and trusted city boutique hotels.',

    // About
    about_badge: 'MEET YOUR HOST',
    about_title: 'Bridging Cultures Through Genuine Ethiopian Hospitality',
    about_desc: 'Founded by Hindek, Bridge Ethiopia is built on love for culture, deep regional connections, and sustainable community empowerment.',

    // Reviews
    reviews_badge: 'TRAVELER REVIEWS',
    reviews_title: 'Loved by Travelers Worldwide',
    reviews_desc: 'Read firsthand stories from travelers, families, researchers, and cultural enthusiasts who explored Ethiopia with Hindek.',

    // How to Book
    how_to_book_badge: 'SIMPLE & DIRECT',
    how_to_book_title: 'How to Book Your Experience',
    how_to_book_desc: 'Simple, transparent, and direct communication with Hindek from initial inquiry to your arrival in Ethiopia.',

    // Contact
    contact_badge: 'GET IN TOUCH',
    contact_title: 'Start Planning Your Ethiopian Journey',
    contact_desc: 'Reach Hindek directly via WhatsApp, email, or telephone for immediate custom guidance and bookings.',
    contact_whatsapp_btn: 'Chat on WhatsApp',
    contact_email_btn: 'Send Direct Email',
    btn_share: 'Share',
    btn_share_copied: 'Link Copied!',

    // Common Buttons & Labels
    btn_close: 'Close',
    btn_submit: 'Submit Request',
    lbl_language: 'Language',
    lbl_select_lang: 'Select Language',
    search_region_label: 'Destination Region',
    search_all_regions: 'All Regions of Ethiopia',
    search_experience_label: 'Experience Type',
    search_all_types: 'All Travel Experiences',
    search_btn: 'Find Experience',
  },

  om: {
    // Nav
    nav_home: 'Man\'ee',
    nav_destinations: 'Ityoophiyaa Daawwadhaa',
    nav_tours: 'Imala & Qorannoo',
    nav_hindek_kitchen: 'Kushiinaa Hindek',
    nav_coffee: 'Buna Akaakayyuu',
    nav_food: 'Nyaata Aadaa',
    nav_festivals: 'Ayyaanota Aadaa',
    nav_travel_assistance: 'Gargaarsa Imalaa',
    nav_hotels: 'Hotela & Iddoo Boqonnaa',
    nav_about: 'Waa\'ee Hindek',
    nav_reviews: 'Yaada Daawwattootaa',
    nav_how_to_book: 'Akkaataa Qabannaa',
    nav_contact: 'Nu Qunnamaa',
    nav_experiences: 'Muuxannoowwan',
    nav_more: 'Qajeelchawwan Dabalataa',
    btn_book_experience: 'Muuxannoo Qabadhaa',
    btn_plan_my_trip: 'Imala Koo Qopheessi',
    btn_ask_ai: 'Gargaaraa AI Gaafadhaa',
    btn_upload_photos: 'Suuraa Ol-fe\'aa',
    btn_whatsapp_direct: 'WhatsApp Kallattiin',
    official_badge: 'Platformii Dhugaa Hindek • Finfinnee, Ityoophiyaa',
    connecting_tagline: 'Addunyaa fi Onnee Ityoophiyaa Walitti Fiduu',
    lang_toggle_aria: 'Afaan filadhaa',

    // Hero
    hero_badge: 'Imala Dhugaa Hindekiin Geggeeffamu',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'Imala Aadaa, Dhaala Jireenyaa & Nyaata Qulqulluu',
    hero_desc: 'Onnee Ityoophiyaa muuxannoo addaan, kushiinaa aadaa Hindek, sirna bunaa akaakayyuu dhalootaa dhalootatti daddarbee fi bakkeewwan seenaa bareedoo keessatti daawwadhaa.',
    hero_search_placeholder: 'Eessa daawwachuu barbaaddu? (fakkeenyaaf Gaarreen Baalee, Laallibalaa, Omo, Finfinnee)...',
    hero_search_btn: 'Barbaadi',
    hero_all_regions: 'Naannoolee Hundumaa',
    hero_all_categories: 'Gosa Hundumaa',
    hero_cta_explore: 'Bakkeewwan Daawwadhaa',
    hero_cta_plan: 'Sagantaa Addaa Qopheessi',
    hero_cta_kitchen: 'Kushiinaa Hindekitti Makamaa',
    hero_stat_exp: 'Waggaa 10+',
    hero_stat_exp_lbl: 'Muuxannoo Bakkaa',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'Sadarkaa Daawwattootaa',
    hero_stat_dest: 'Bakkeewwan 20+',
    hero_stat_dest_lbl: 'Sagantaalee Qophaa\'an',

    // Explore Section
    destinations_badge: 'NAANNOOLEE DAAWWANNAA & SEENAA',
    destinations_title: 'Dinqisiisoo Ityoophiyaa Daawwadhaa',
    destinations_desc: 'Gaarreen Baalee irraa kaasee hanga manneen amantaa Laallibalaa fi Sulula Riwuftiitti kan jiran daawwadhaa.',
    explore_badge: 'BAKKEEWWAN DAAWWANNAA',
    explore_title: 'Dinqisiisoo Ityoophiyaa Daawwadhaa',
    explore_desc: 'Gaarreen Baalee irraa kaasee hanga manneen amantaa Laallibalaa fi Sulula Riwuftiitti kan jiran daawwadhaa.',
    explore_all_tab: 'Bakkeewwan Hundumaa',
    btn_request_booking: 'Qabannaa Gaafadhaa',
    btn_view_details: 'Sagantaa Ilaalaa',

    // Tours Section
    tours_badge: 'IMALA FILATAMAN',
    tours_title: 'Imala Dagatamuu Hin Dandeenye',
    tours_desc: 'Imala aadaa, seenaa, qorannoo bineensota bosonaa fi suuraa qajeelchitoota bakkaatin qophaa\'an.',
    tours_custom_btn: 'Sagantaa Addaa Gaafadhaa',

    // Hindek Kitchen
    kitchen_badge: 'MUUXANNOO NYAATA AADAA',
    kitchen_title: 'Muuxannoo Kushiinaa Hindek',
    kitchen_desc: 'Finfinneetti nyaata aadaa Ityoophiyaa fi Oromoo kan akka Buddeena Xaafii, Doro Wot, fi Shiroo meeshaalee supheen qopheessuu baraa.',
    kitchen_book_class: 'Barnoota Nyaataa Qabadhaa',

    // Coffee
    coffee_badge: 'SIRNA BUNAA DURII',
    coffee_title: 'Muuxannoo Buna Akaakayyuu',
    coffee_desc: 'Madda buna Arabica kan taate Ityoophiyaa keessatti sirna bunaa geebba sadii, aara ixaanaa fi akaayii waliin dhandhamaa.',
    coffee_book_btn: 'Sirna Bunaa Qabadhaa',

    // Food Gallery
    food_badge: 'NYAATA ITYOOPHIYAA & OROMOO',
    food_title: 'Aadaa Nyaata fi Dhandhama Addaa',
    food_desc: 'Dhandhama mi\'aawaa, urgooftuu qulqulluu fi nyaata soomaa aadaa Ityoophiyaa beekaa.',

    // Festivals
    festivals_badge: 'AYYAANOTA AADAA',
    festivals_title: 'Ayyaanota Qulqulluu & Kabajaa Aadaa',
    festivals_desc: 'Ayyaana Irreechaa, Timqata, fi Masqalaa qajeelchitoota bakkaatiin hordofaa.',

    // Travel Assistant
    assistant_badge: 'OGUMMAA BAKKAA',
    assistant_title: 'Gargaarsa Imalaa & Tajaajila Konkolaataa',
    assistant_desc: 'Konkolaattota 4x4 ammayyaa, konkolaachistoota beekamtii qaban, fi gargaarsa daldalaa qulqulluu.',

    // Accommodations
    lodges_badge: 'IDDOOWWAN BOQONNAA',
    lodges_title: 'Ekoo-Loojii & Hotelaalee Filataman',
    lodges_desc: 'Loojii gaarreenii, haroowwan sululaa fi hotelaalee mijatoo keessa boqodhaa.',

    // About
    about_badge: 'WAA\'EE HINDEK',
    about_title: 'Aadaa Addunyaa fi Ityoophiyaa Walitti Fiduu',
    about_desc: 'Hindekiin kan hundeeffame, jaalala aadaa fi walitti dhufeenya hawaasaa irratti kan ijaarame dha.',

    // Reviews
    reviews_badge: 'YAADA DAAWWATTOOTAA',
    reviews_title: 'Daawwattoota Addunyaa Irraa Kan Jaalatame',
    reviews_desc: 'Muuxannoo daawwattoonni Hindek waliin dabarsan seenaa isaanii dubbisaa.',

    // How to Book
    how_to_book_badge: 'SALPHAA & KALLATTIIN',
    how_to_book_title: 'Akkaataa Muuxannoo Qabatan',
    how_to_book_desc: 'Kallattiin Hindek waliin mari\'achuun imala keessan salphaatti qopheeffadhaa.',

    // Contact
    contact_badge: 'QUUNNAMTII',
    contact_title: 'Imala Keessan Har\'a Karoorsaa',
    contact_desc: 'Kallattiin WhatsApp, Imeelii yookiin bilbilaan Hindek qunnamaa.',
    contact_whatsapp_btn: 'WhatsApp irratti Nu Dubbisaa',
    contact_email_btn: 'Imeelii Kallattiin Ergaa',
    btn_share: 'Qoodaa',
    btn_share_copied: 'Liankiin Waraabameera!',

    // Common Buttons & Labels
    btn_close: 'Cufi',
    btn_submit: 'Ergi',
    lbl_language: 'Afaan',
    lbl_select_lang: 'Afaan Filadhaa',
    search_region_label: 'Naannoo Daawwannaa',
    search_all_regions: 'Naannoolee Ityoophiyaa Hundumaa',
    search_experience_label: 'Gosa Muuxannoo',
    search_all_types: 'Muuxannoowwan Imalaa Hundumaa',
    search_btn: 'Muuxannoo Barbaadi',
  },

  am: {
    // Nav
    nav_home: 'መነሻ',
    nav_destinations: 'ኢትዮጵያን ይጎብኙ',
    nav_tours: 'ጉዞዎች እና ጉብኝቶች',
    nav_hindek_kitchen: 'ሕንዴክ ማዕድ ቤት',
    nav_coffee: 'የአያት ቡና ስነ-ስርዓት',
    nav_food: 'የምግብ ጋለሪ',
    nav_festivals: 'ባህላዊ በዓላት',
    nav_travel_assistance: 'የጉዞ ድጋፍና አገልግሎት',
    nav_hotels: 'ሎጆች እና ማረፊያዎች',
    nav_about: 'ስለ ሕንዴክ',
    nav_reviews: 'የተጓዦች አስተያየት',
    nav_how_to_book: 'እንዴት መያዝ ይቻላል',
    nav_contact: 'ያግኙን',
    nav_experiences: 'ተሞክሮዎች',
    nav_more: 'ተጨማሪ መመሪያዎች',
    btn_book_experience: 'ቦታ ያስይዙ',
    btn_plan_my_trip: 'ጉዞዬን ያቅዱ',
    btn_ask_ai: 'የ AI ረዳትን ይጠይቁ',
    btn_upload_photos: 'ፎቶዎችን ይጫኑ',
    btn_whatsapp_direct: 'በዋትስአፕ በቀጥታ',
    official_badge: 'የሕንዴክ ይፋዊ ፕላትፎርም • አዲስ አበባ፣ ኢትዮጵያ',
    connecting_tagline: 'ዓለምን ከኢትዮጵያ ልብ ጋር ማገናኘት',
    lang_toggle_aria: 'ቋንቋ ይምረጡ',

    // Hero
    hero_badge: 'በሕንዴክ የሚመሩ እውነተኛ ጉዞዎች',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'ባህላዊ ጉዞዎች፣ እውነተኛ ቅርሶች እና ልዩ ጣዕሞች',
    hero_desc: 'እውነተኛዋን ኢትዮጵያን በልዩ ጉዞዎች፣ በሕንዴክ ማዕድ ቤት ባህላዊ የምግብ ዝግጅት፣ በባህላዊ የቡና ስነ-ስርዓት እና ማራኪ ጥንታዊ መስህቦች ያግኙ።',
    hero_search_placeholder: 'የት መጎብኘት ይፈልጋሉ? (ለምሳሌ ባሌ ተራሮች፣ ላሊበላ፣ ኦሞ ሸለቆ፣ አዲስ አበባ)...',
    hero_search_btn: 'ይፈልጉ',
    hero_all_regions: 'ሁሉም ክልሎች',
    hero_all_categories: 'ሁሉም አይነቶች',
    hero_cta_explore: 'መዳረሻዎችን ይመልከቱ',
    hero_cta_plan: 'ብጁ ጉዞ ያቅዱ',
    hero_cta_kitchen: 'ሕንዴክ ማዕድ ቤትን ይቀላቀሉ',
    hero_stat_exp: '10+ ዓመታት',
    hero_stat_exp_lbl: 'የአካባቢ ልምድ',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'የተጓዦች ደረጃ',
    hero_stat_dest: '20+ ቦታዎች',
    hero_stat_dest_lbl: 'የተዘጋጁ የጉዞ መርሃ ግብሮች',

    // Explore Section
    destinations_badge: 'መዳረሻዎች እና ክልሎች',
    destinations_title: 'የኢትዮጵያን ድንቅ መስህቦች ይጎብኙ',
    destinations_desc: 'ከጥንታዊ ውቅር አብያተ ክርስቲያናት እና አስደናቂ የስምጥ ሸለቆ ሀይቆች አንስቶ እስከ ደማቅ ባህሎችና የተራራ ጫፎች ድረስ።',
    explore_badge: 'መዳረሻዎች እና ክልሎች',
    explore_title: 'የኢትዮጵያን ድንቅ መስህቦች ይጎብኙ',
    explore_desc: 'ከባሌ ተራሮች ጫፍ አንስቶ እስከ ላሊበላ ውቅር አብያተ ክርስቲያናት እና የዳናኪል ስምጥ ሸለቆ ድረስ።',
    explore_all_tab: 'ሁሉም መዳረሻዎች',
    btn_request_booking: 'ቦታ ለመያዝ ይጠይቁ',
    btn_view_details: 'የጉዞ ዝርዝር ይመልከቱ',

    // Tours Section
    tours_badge: 'የተመረጡ ጉብኝቶች',
    tours_title: 'የማይረሱ ጉዞዎች እና ቆይታዎች',
    tours_desc: 'ባህልን፣ ታሪክን፣ የተፈጥሮ ጉዞዎችን እና የፎቶግራፍ ጉብኝቶችን በአስተማማኝ መመሪያዎች ያዘጋጁ።',
    tours_custom_btn: 'የተለየ ብጁ ጉዞ ይጠይቁ',

    // Hindek Kitchen
    kitchen_badge: 'ባህላዊ የምግብ ዝግጅት',
    kitchen_title: 'የሕንዴክ ማዕድ ቤት ተሞክሮ',
    kitchen_desc: 'በአዲስ አበባ በሚገኘው ቤት ውስጥ እውነተኛ የጤፍ እንጀራ፣ የዶሮ ወጥ እና የሽሮ ዝግጅትን በሸክላ ምጣድና ድስት አብረው ይማሩ።',
    kitchen_book_class: 'የምግብ ዝግጅት ቦታ ያስይዙ',

    // Coffee
    coffee_badge: 'የጥንታዊ ቡና ስነ-ስርዓት',
    coffee_title: 'የአያት ቡና ስነ-ስርዓት ተሞክሮ',
    coffee_desc: 'በቡና መገኛ ምድር ሶስቱን ዙር የቡና ጽዋዎች፣ የእጣን ጭስ እና ባህላዊ የፈንዲሻ በረከትን በአንድ ላይ ይቀምሱ።',
    coffee_book_btn: 'የቡና ስነ-ስርዓት ያስይዙ',

    // Food Gallery
    food_badge: 'የኢትዮጵያ እና የኦሮሞ ምግቦች',
    food_title: 'የባህላዊ ምግቦች እና ጣዕሞች ስብስብ',
    food_desc: 'የኢትዮጵያን ደማቅ ጣዕሞች፣ ቅመማ ቅመሞች እና ጥንታዊ የጾም ምግቦች ባህልን ይወቁ።',

    // Festivals
    festivals_badge: 'ባህላዊና ሃይማኖታዊ በዓላት',
    festivals_title: 'ቅዱሳን በዓላት እና ባህላዊ ክብረ በዓላት',
    festivals_desc: 'የጥምቀት፣ የመስቀል ደመራ እና የኢሬቻ በዓላትን በታማኝ የአካባቢ አስጎብኚዎች ታጅበው ያክብሩ።',

    // Travel Assistant
    assistant_badge: 'የአካባቢ አገልግሎቶች',
    assistant_title: 'የጉዞ ድጋፍ እና አስተማማኝ አገልግሎት',
    assistant_desc: 'ዘመናዊ 4x4 ተሽከርካሪዎች፣ የኤርፖርት ትራንስፈር፣ አስተርጓሚዎች እና ልዩ የንግድ ጉዞዎች ማስተባበሪያ።',

    // Accommodations
    lodges_badge: 'የተመረጡ ማረፊያዎች',
    lodges_title: 'ኢኮ-ሎጆች እና ምርጥ ማረፊያዎች',
    lodges_desc: 'በተራራማ ስፍራዎች፣ በስምጥ ሸለቆ ሀይቆች ዳርቻ እና በከተማ ውስጥ ባሉ ምርጥ ሎጆች ያርፉ።',

    // About
    about_badge: 'ስለ ሕንዴክ',
    about_title: 'ባህሎችን በእውነተኛ የኢትዮጵያ መስተንግዶ ማገናኘት',
    about_desc: 'በሕንዴክ የተመሰረተው ብሪጅ ኢትዮጵያ ለባህል ባለው ፍቅር እና ማህበረሰቡን ለማብቃት በተዘጋጀ እውነተኛ ግንኙነት ላይ የቆመ ነው።',

    // Reviews
    reviews_badge: 'የተጓዦች ምስክርነት',
    reviews_title: 'በዓለም ዙሪያ ባሉ ተጓዦች የተወደደ',
    reviews_desc: 'ከሕንዴክ ጋር ኢትዮጵያን የጎበኙ ተጓዦች እና ቤተሰቦች የተናገሩትን ያንብቡ።',

    // How to Book
    how_to_book_badge: 'ቀላል እና ግልጽ',
    how_to_book_title: 'የጉዞ ቦታ እንዴት መያዝ ይቻላል',
    how_to_book_desc: 'ከመጀመሪያው ጥያቄ ጀምሮ ኢትዮጵያ እስከሚደርሱ ድረስ ከሕንዴክ ጋር በቀጥታ ይገናኙ።',

    // Contact
    contact_badge: 'ያግኙን',
    contact_title: 'የኢትዮጵያ ጉዞዎን ዛሬውኑ ያቅዱ',
    contact_desc: 'በዋትስአፕ፣ በኢሜይል ወይም በስልክ ከሕንዴክ ጋር በቀጥታ ይገናኙ።',
    contact_whatsapp_btn: 'በዋትስአፕ ይጻፉልን',
    contact_email_btn: 'ኢሜይል ይላኩ',
    btn_share: 'አጋራ',
    btn_share_copied: 'ሊንኩ ተገልብጧል!',

    // Common Buttons & Labels
    btn_close: 'ዝጋ',
    btn_submit: 'ላክ',
    lbl_language: 'ቋንቋ',
    lbl_select_lang: 'ቋንቋ ይምረጡ',
    search_region_label: 'የመዳረሻ ክልል',
    search_all_regions: 'ሁሉም የኢትዮጵያ ክልሎች',
    search_experience_label: 'የተሞክሮ አይነት',
    search_all_types: 'ሁሉም የጉዞ ተሞክሮዎች',
    search_btn: 'ተሞክሮ ይፈልጉ',
  },

  fr: {
    nav_home: 'Accueil',
    nav_destinations: 'Explorer l’Éthiopie',
    nav_tours: 'Circuits & Expéditions',
    nav_hindek_kitchen: 'Hindek Kitchen',
    nav_coffee: 'Café de Grand-père',
    nav_food: 'Gastronomie',
    nav_festivals: 'Festivals',
    nav_travel_assistance: 'Conciergerie de Voyage',
    nav_hotels: 'Éco-Lodges & Séjours',
    nav_about: 'À propos de Hindek',
    nav_reviews: 'Avis des Voyageurs',
    nav_how_to_book: 'Comment Réserver',
    nav_contact: 'Contactez-nous',
    nav_experiences: 'Expériences',
    nav_more: 'Plus de Guides',
    btn_book_experience: 'Réserver une Expérience',
    btn_plan_my_trip: 'Planifier Mon Voyage',
    btn_ask_ai: 'Assistant IA',
    btn_upload_photos: 'Télécharger des Photos',
    btn_whatsapp_direct: 'WhatsApp Direct',
    official_badge: 'Plateforme Officielle de Hindek • Addis-Abeba, Éthiopie',
    connecting_tagline: 'Connecter le Monde avec le Cœur de l’Éthiopie',
    lang_toggle_aria: 'Choisir la langue',
    hero_badge: 'Voyages Authentiques Guidés par Hindek',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'Voyages Culturels & Immersion Culinaire',
    hero_desc: 'Vivez l’âme authentique de l’Éthiopie à travers des expéditions guidées privées, la cuisine traditionnelle à Hindek Kitchen et la cérémonie sacrée du café.',
    hero_search_placeholder: 'Où souhaitez-vous aller ? (ex. Monts Balé, Lalibela, Vallée de l’Omo)...',
    hero_search_btn: 'Découvrir',
    hero_all_regions: 'Toutes les Régions',
    hero_all_categories: 'Toutes Catégories',
    hero_cta_explore: 'Explorer les Destinations',
    hero_cta_plan: 'Voyage Sur Mesure',
    hero_cta_kitchen: 'Rejoindre Hindek Kitchen',
    hero_stat_exp: '10+ Ans',
    hero_stat_exp_lbl: 'Expertise Locale',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'Note Voyageurs',
    hero_stat_dest: '20+ Sites',
    hero_stat_dest_lbl: 'Itinéraires Créés',
    destinations_badge: 'RÉGIONS AUTHENTIQUES & SITES SACRÉS',
    destinations_title: 'Découvrez les Merveilles de l’Éthiopie',
    destinations_desc: 'Des églises rupestres de Lalibela aux sommets alpins des montagnes du Balé et lacs volcaniques de la Vallée du Rift.',
    explore_badge: 'DESTINATIONS & RÉGIONS',
    explore_title: 'Découvrez les Merveilles de l’Éthiopie',
    explore_desc: 'Des hauteurs alpines du Balé aux chefs-d’œuvre de Lalibela et paysages grandioses du Danakil.',
    explore_all_tab: 'Toutes les Destinations',
    btn_request_booking: 'Demander une Réservation',
    btn_view_details: 'Voir l’Itinéraire',
    tours_badge: 'EXPÉDITIONS PRIVÉES',
    tours_title: 'Voyages Inoubliables & Circuits',
    tours_desc: 'Itinéraires culturels, historiques et photographiques organisés par un guide local certifié.',
    tours_custom_btn: 'Demander un Voyage Sur Mesure',
    kitchen_badge: 'IMMERSION CULINAIRE',
    kitchen_title: 'Expérience Culinaire Hindek Kitchen',
    kitchen_desc: 'Apprenez à préparer la véritable Injera de Teff, le Doro Wat et le Shiro traditionnel dans des plats en argile à Addis-Abeba.',
    kitchen_book_class: 'Réserver un Atelier Cuisine',
    coffee_badge: 'CÉRÉMONIE DU CAFÉ ANCESTRAL',
    coffee_title: 'Cérémonie du Café du Grand-père',
    coffee_desc: 'Dégustez les 3 tasses rituelles de café arabica fraîchement torréfié au parfum d’encens avec Hindek.',
    coffee_book_btn: 'Réserver la Cérémonie',
    food_badge: 'GASTRONOMIE ÉTHIOPIENNE',
    food_title: 'Traditions Culinaires & Saveurs',
    food_desc: 'Explorez la richesse des épices et traditions culinaires éthiopiennes et oromo.',
    festivals_badge: 'CALENDRIER CULTUREL',
    festivals_title: 'Fêtes Sacrées & Célébrations',
    festivals_desc: 'Assistez aux grandes fêtes du Timkat, Meskel et Irreecha en immersion locale.',
    assistant_badge: 'SERVICES LOCAUX',
    assistant_title: 'Assistance & Logistique de Voyage',
    assistant_desc: 'Véhicules 4x4 avec chauffeur, transferts aéroport, interprétariat et accompagnement ONG/professionnel.',
    lodges_badge: 'HÉBERGEMENTS DE CHARME',
    lodges_title: 'Éco-Lodges & Séjours Authentiques',
    lodges_desc: 'Reposez-vous dans de magnifiques lodges en pleine nature et hôtels de charme.',
    about_badge: 'VOTRE HÔTE',
    about_title: 'Rapprocher les Cultures par l’Hospitalité Éthiopienne',
    about_desc: 'Fondé par Hindek, Bridge Ethiopia est né de la passion du patrimoine et du partage authentique.',
    reviews_badge: 'TÉMOIGNAGES',
    reviews_title: 'Recommandé par les Voyageurs du Monde',
    reviews_desc: 'Découvrez les histoires des voyageurs ayant exploré l’Éthiopie avec Hindek.',
    how_to_book_badge: 'SIMPLE & DIRECT',
    how_to_book_title: 'Comment Réserver Votre Séjour',
    how_to_book_desc: 'Un contact direct avec Hindek dès votre premier message jusqu’à votre arrivée.',
    contact_badge: 'CONTACTEZ-NOUS',
    contact_title: 'Commencez à Planifier Votre Voyage',
    contact_desc: 'Contactez Hindek par WhatsApp ou email pour un accompagnement immédiat.',
    contact_whatsapp_btn: 'Écrire sur WhatsApp',
    contact_email_btn: 'Envoyer un Email',
    btn_share: 'Partager',
    btn_share_copied: 'Lien copié !',
    btn_close: 'Fermer',
    btn_submit: 'Envoyer la Demande',
    lbl_language: 'Langue',
    lbl_select_lang: 'Choisir la Langue',
    search_region_label: 'Région de Destination',
    search_all_regions: 'Toutes les Régions',
    search_experience_label: 'Type d’Expérience',
    search_all_types: 'Toutes les Expériences',
    search_btn: 'Trouver une Expérience',
  },

  de: {
    nav_home: 'Startseite',
    nav_destinations: 'Äthiopien Entdecken',
    nav_tours: 'Touren & Expeditionen',
    nav_hindek_kitchen: 'Hindek Küche',
    nav_coffee: 'Großvater Kaffeezeremonie',
    nav_food: 'Kulinarik-Galerie',
    nav_festivals: 'Festivals',
    nav_travel_assistance: 'Reise-Concierge',
    nav_hotels: 'Öko-Lodges & Unterkünfte',
    nav_about: 'Über Hindek',
    nav_reviews: 'Reiseberichte',
    nav_how_to_book: 'Buchungsablauf',
    nav_contact: 'Kontakt',
    nav_experiences: 'Erlebnisse',
    nav_more: 'Weitere Guides',
    btn_book_experience: 'Erlebnis Buchen',
    btn_plan_my_trip: 'Reise Planen',
    btn_ask_ai: 'KI-Assistent',
    btn_upload_photos: 'Fotos Hochladen',
    btn_whatsapp_direct: 'Direkt per WhatsApp',
    official_badge: 'Offizielle Plattform von Hindek • Addis Abeba, Äthiopien',
    connecting_tagline: 'Die Welt mit dem Herzen Äthiopiens verbinden',
    lang_toggle_aria: 'Sprache wählen',
    hero_badge: 'Authentische Reisen mit Hindek',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'Kulturreisen & Kulinarische Erlebnisse',
    hero_desc: 'Erleben Sie die Seele Äthiopiens durch persönliche Touren, authentisches Kochen in der Hindek Küche und die uralte Kaffeezeremonie.',
    hero_search_placeholder: 'Wohin möchten Sie reisen? (z.B. Bale Berge, Lalibela, Omo-Tal)...',
    hero_search_btn: 'Entdecken',
    hero_all_regions: 'Alle Regionen',
    hero_all_categories: 'Alle Kategorien',
    hero_cta_explore: 'Ziele Erkunden',
    hero_cta_plan: 'Maßgeschneiderte Reise',
    hero_cta_kitchen: 'Hindek Küche Buchen',
    hero_stat_exp: '10+ Jahre',
    hero_stat_exp_lbl: 'Lokale Expertise',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'Gäste-Bewertung',
    hero_stat_dest: '20+ Orte',
    hero_stat_dest_lbl: 'Erstellte Routen',
    destinations_badge: 'REGIONEN & HEILIGE STÄTTEN',
    destinations_title: 'Entdecken Sie die Wunder Äthiopiens',
    destinations_desc: 'Von den Felsenkirchen in Lalibela bis zu den alpinen Höhen der Bale-Berge und den Seen des Rift Valley.',
    explore_badge: 'DESTINATIONEN & REGIONEN',
    explore_title: 'Entdecken Sie die Wunder Äthiopiens',
    explore_desc: 'Von den Höhenzügen bis zu den kulturellen Schätzen und Naturschauspielen.',
    explore_all_tab: 'Alle Reiseziele',
    btn_request_booking: 'Buchungsanfrage',
    btn_view_details: 'Reiseplan Anzeigen',
    tours_badge: 'PERSÖNLICHE TOUREN',
    tours_title: 'Unvergessliche Reisen & Expeditionen',
    tours_desc: 'Maßgeschneiderte Kultur-, Natur- und Fototouren mit erfahrenem Guide und sicherem Transport.',
    tours_custom_btn: 'Individuelle Tour Anfragen',
    kitchen_badge: 'KOCHKURS',
    kitchen_title: 'Hindek Kocherlebnis',
    kitchen_desc: 'Lernen Sie das traditionelle Backen von Teff-Injera und Kochen von Doro Wat in traditionellen Tongefäßen in Addis Abeba.',
    kitchen_book_class: 'Kochkurs Reservieren',
    coffee_badge: 'URALTER KAFFEE-KULT',
    coffee_title: 'Großvaters Kaffeezeremonie',
    coffee_desc: 'Erleben Sie das Rösten, Mahlen und Kochen von edlem Arabica-Kaffee in der traditionellen Jebena.',
    coffee_book_btn: 'Kaffeezeremonie Buchen',
    food_badge: 'ÄTHIOPISCHE KÜCHE',
    food_title: 'Kulinarische Traditionen & Spezialitäten',
    food_desc: 'Entdecken Sie die reiche Geschmackswelt und feinen Gewürze Äthiopiens.',
    festivals_badge: 'FESTIVAL-KALENDER',
    festivals_title: 'Heilige Feste & Feierlichkeiten',
    festivals_desc: 'Erleben Sie Timkat, Meskel und Irreecha hautnah mit lokaler Begleitung.',
    assistant_badge: 'REISE-SERVICES',
    assistant_title: 'Reiseservice & Concierge',
    assistant_desc: '4x4 Fahrzeuge, Flughafentransfers, Dolmetschen und professionelle Unterstützung vor Ort.',
    lodges_badge: 'UNTERKÜNFTE',
    lodges_title: 'Öko-Lodges & Besondere Hotels',
    lodges_desc: 'Erholen Sie sich in ausgewählten Lodges und Boutique-Hotels.',
    about_badge: 'IHRE GASTGEBERIN',
    about_title: 'Kulturen verbinden durch echte Gastfreundschaft',
    about_desc: 'Gegründet von Hindek, um Reisenden das echte Äthiopien mit Herz und Verlässlichkeit zu zeigen.',
    reviews_badge: 'BEWERTUNGEN',
    reviews_title: 'Beliebt bei Reisenden weltweit',
    reviews_desc: 'Lesen Sie Erfahrungsberichte von Gästen, die mit Hindek gereist sind.',
    how_to_book_badge: 'EINFACH & DIREKT',
    how_to_book_title: 'So einfach buchen Sie',
    how_to_book_desc: 'Direkte Absprache mit Hindek von der ersten Idee bis zur Ankunft.',
    contact_badge: 'KONTAKT',
    contact_title: 'Planen Sie Ihre Reise nach Äthiopien',
    contact_desc: 'Schreiben Sie Hindek direkt per WhatsApp oder E-Mail.',
    contact_whatsapp_btn: 'Auf WhatsApp Chatten',
    contact_email_btn: 'E-Mail Senden',
    btn_share: 'Teilen',
    btn_share_copied: 'Link kopiert!',
    btn_close: 'Schließen',
    btn_submit: 'Anfrage Absenden',
    lbl_language: 'Sprache',
    lbl_select_lang: 'Sprache Auswählen',
    search_region_label: 'Zielregion',
    search_all_regions: 'Alle Regionen',
    search_experience_label: 'Erlebnis-Typ',
    search_all_types: 'Alle Erlebnisse',
    search_btn: 'Erlebnis Suchen',
  },

  it: {
    nav_home: 'Home',
    nav_destinations: 'Esplora l’Etiopia',
    nav_tours: 'Tour & Spedizioni',
    nav_hindek_kitchen: 'Hindek Kitchen',
    nav_coffee: 'Caffè del Nonno',
    nav_food: 'Galleria Gastronomica',
    nav_festivals: 'Festival & Feste',
    nav_travel_assistance: 'Assistenza di Viaggio',
    nav_hotels: 'Eco-Lodge & Soggiorni',
    nav_about: 'Chi è Hindek',
    nav_reviews: 'Recensioni dei Viaggiatori',
    nav_how_to_book: 'Come Prenotare',
    nav_contact: 'Contattaci',
    nav_experiences: 'Esperienze',
    nav_more: 'Altre Guide',
    btn_book_experience: 'Prenota un’Esperienza',
    btn_plan_my_trip: 'Pianifica il Viaggio',
    btn_ask_ai: 'Assistente AI',
    btn_upload_photos: 'Carica Foto',
    btn_whatsapp_direct: 'WhatsApp Diretto',
    official_badge: 'Piattaforma Ufficiale di Hindek • Addis Abeba, Etiopia',
    connecting_tagline: 'Connettere il Mondo con il Cuore dell’Etiopia',
    lang_toggle_aria: 'Seleziona lingua',
    hero_badge: 'Viaggi Autentici Guidati da Hindek',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'Viaggi Culturali & Immersione Culinaria',
    hero_desc: 'Scopri l’anima dell’Etiopia attraverso spedizioni private, cucina tradizionale a Hindek Kitchen e la millenaria cerimonia del caffè.',
    hero_search_placeholder: 'Dove vuoi andare? (es. Monti Bale, Lalibela, Valle dell’Omo)...',
    hero_search_btn: 'Scopri',
    hero_all_regions: 'Tutte le Regioni',
    hero_all_categories: 'Tutte le Categorie',
    hero_cta_explore: 'Esplora Destinazioni',
    hero_cta_plan: 'Crea Viaggio Personalizzato',
    hero_cta_kitchen: 'Cucina con Hindek',
    hero_stat_exp: '10+ Anni',
    hero_stat_exp_lbl: 'Esperienza Locale',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'Valutazione Ospiti',
    hero_stat_dest: '20+ Luoghi',
    hero_stat_dest_lbl: 'Itinerari Curati',
    destinations_badge: 'REGIONI & LUOGHI SACRI',
    destinations_title: 'Scopri le Meraviglie dell’Etiopia',
    destinations_desc: 'Dalle chiese rupestri di Lalibela alle cime montuose dei Monti Bale e ai laghi vulcanici della Rift Valley.',
    explore_badge: 'DESTINAZIONI & REGIONI',
    explore_title: 'Scopri le Meraviglie dell’Etiopia',
    explore_desc: 'Dalle vette alpine ai capolavori storici e paesaggi mozzafiato.',
    explore_all_tab: 'Tutte le Destinazioni',
    btn_request_booking: 'Richiedi Prenotazione',
    btn_view_details: 'Visualizza Itinerario',
    tours_badge: 'TOUR PRIVATI',
    tours_title: 'Viaggi Indimenticabili in Etiopia',
    tours_desc: 'Itinerari culturali, naturalistici e fotografici guidati con trasporto privato affidabile.',
    tours_custom_btn: 'Richiedi Tour su Misura',
    kitchen_badge: 'CORSO DI CUCINA',
    kitchen_title: 'Esperienza Culinaria Hindek Kitchen',
    kitchen_desc: 'Impara a preparare la vera Injera di Teff, il Doro Wat e lo Shiro in stoviglie di terracotta tradizionali ad Addis Abeba.',
    kitchen_book_class: 'Prenota Corso di Cucina',
    coffee_badge: 'CERIMONIA DEL CAFFÈ',
    coffee_title: 'Cerimonia del Caffè del Nonno',
    coffee_desc: 'Gusta i tre giri rituali del caffè Arabica tostato al momento con incenso e popcorn.',
    coffee_book_btn: 'Prenota Cerimonia',
    food_badge: 'CUCINA ETIOPICA',
    food_title: 'Tradizioni & Sapori Unici',
    food_desc: 'Esplora i sapori autentici e le spezie della cucina etiope e oromo.',
    festivals_badge: 'CALENDARIO FESTE',
    festivals_title: 'Celebrazioni Sacre & Tradizioni',
    festivals_desc: 'Vivi il Timkat, Meskel e Irreecha con guida locale esperta.',
    assistant_badge: 'SERVIZI DI VIAGGIO',
    assistant_title: 'Assistenza & Logistica di Viaggio',
    assistant_desc: 'Fuoristrada 4x4, transfer aeroportuali, interpreti e supporto logistico.',
    lodges_badge: 'ALLOGGI SELEZIONATI',
    lodges_title: 'Eco-Lodge & Hotel di Charme',
    lodges_desc: 'Rilassati in lodge panoramici immersi nella natura incontaminata.',
    about_badge: 'LA TUA GUIDA',
    about_title: 'Unire le Culture con l’Ospitalità Etiope',
    about_desc: 'Fondata da Hindek per offrire ai viaggiatori un’esperienza autentica e sincera.',
    reviews_badge: 'RECENSIONI',
    reviews_title: 'Apprezzata dai Viaggiatori di Tutto il Mondo',
    reviews_desc: 'Leggi i racconti di chi ha visitato l’Etiopia con Hindek.',
    how_to_book_badge: 'FACILE & DIRETTO',
    how_to_book_title: 'Come Prenotare',
    how_to_book_desc: 'Contatto diretto con Hindek dal primo messaggio al tuo arrivo.',
    contact_badge: 'CONTATTI',
    contact_title: 'Pianifica il Tuo Viaggio in Etiopia',
    contact_desc: 'Contatta Hindek direttamente su WhatsApp o via email.',
    contact_whatsapp_btn: 'Scrivi su WhatsApp',
    contact_email_btn: 'Invia Email',
    btn_share: 'Condividi',
    btn_share_copied: 'Link copiato!',
    btn_close: 'Chiudi',
    btn_submit: 'Invia Richiesta',
    lbl_language: 'Lingua',
    lbl_select_lang: 'Seleziona Lingua',
    search_region_label: 'Regione',
    search_all_regions: 'Tutte le Regioni',
    search_experience_label: 'Tipo di Esperienza',
    search_all_types: 'Tutte le Esperienze',
    search_btn: 'Cerca Esperienza',
  },

  es: {
    nav_home: 'Inicio',
    nav_destinations: 'Explorar Etiopía',
    nav_tours: 'Tours y Expediciones',
    nav_hindek_kitchen: 'Cocina Hindek',
    nav_coffee: 'Café del Abuelo',
    nav_food: 'Gastronomía',
    nav_festivals: 'Festivales',
    nav_travel_assistance: 'Asistencia de Viaje',
    nav_hotels: 'Eco-Lodges y Hoteles',
    nav_about: 'Sobre Hindek',
    nav_reviews: 'Opiniones',
    nav_how_to_book: 'Cómo Reservar',
    nav_contact: 'Contacto',
    nav_experiences: 'Experiencias',
    nav_more: 'Más Guías',
    btn_book_experience: 'Reservar Experiencia',
    btn_plan_my_trip: 'Planificar Mi Viaje',
    btn_ask_ai: 'Asistente IA',
    btn_upload_photos: 'Subir Fotos',
    btn_whatsapp_direct: 'WhatsApp Directo',
    official_badge: 'Plataforma Oficial de Hindek • Addis Abeba, Etiopía',
    connecting_tagline: 'Conectando el Mundo con el Corazón de Etiopía',
    lang_toggle_aria: 'Seleccionar idioma',
    hero_badge: 'Viajes Auténticos Guiados por Hindek',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'Viajes Culturales e Inmersión Culinaria',
    hero_desc: 'Descubra el alma de Etiopía a través de expediciones privadas, cocina tradicional en Hindek Kitchen y la sagrada ceremonia del café.',
    hero_search_placeholder: '¿Dónde te gustaría viajar? (ej. Montañas Bale, Lalibela, Valle del Omo)...',
    hero_search_btn: 'Descubrir',
    hero_all_regions: 'Todas las Regiones',
    hero_all_categories: 'Todas las Categorías',
    hero_cta_explore: 'Explorar Destinos',
    hero_cta_plan: 'Viaje a Medida',
    hero_cta_kitchen: 'Cocinar con Hindek',
    hero_stat_exp: '10+ Años',
    hero_stat_exp_lbl: 'Experiencia Local',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'Calificación',
    hero_stat_dest: '20+ Lugares',
    hero_stat_dest_lbl: 'Itinerarios Creados',
    destinations_badge: 'REGIONES & LUGARES SAGRADOS',
    destinations_title: 'Descubra las Maravillas de Etiopía',
    destinations_desc: 'Desde las iglesias talladas en roca de Lalibela hasta las cumbres alpinas de Bale y los lagos del Rift.',
    explore_badge: 'DESTINOS Y REGIONES',
    explore_title: 'Descubra las Maravillas de Etiopía',
    explore_desc: 'Paisajes épicos, rica historia y tradiciones vivas.',
    explore_all_tab: 'Todos los Destinos',
    btn_request_booking: 'Solicitar Reserva',
    btn_view_details: 'Ver Itinerario',
    tours_badge: 'EXPEDICIONES PRIVADAS',
    tours_title: 'Viajes Inolvidables en Etiopía',
    tours_desc: 'Itinerarios culturales, históricos y de senderismo con transporte y guía de confianza.',
    tours_custom_btn: 'Solicitar Itinerario Personalizado',
    kitchen_badge: 'INMERSIÓN CULINARIA',
    kitchen_title: 'Experiencia en Hindek Kitchen',
    kitchen_desc: 'Aprenda a elaborar la auténtica Injera de Teff, Doro Wat y Shiro en cazuelas de barro tradicionales en Addis Abeba.',
    kitchen_book_class: 'Reservar Clase de Cocina',
    coffee_badge: 'CEREMONIA ANCESTRAL DEL CAFÉ',
    coffee_title: 'Ceremonia del Café del Abuelo',
    coffee_desc: 'Participe en el ritual de 3 tazas de café arábica recién tostado con incienso y palomitas de maíz.',
    coffee_book_btn: 'Reservar Ceremonia',
    food_badge: 'GASTRONOMÍA ETÍOPE',
    food_title: 'Tradiciones Culinarias y Sabores',
    food_desc: 'Conozca las especias y ricas recetas tradicionales de Etiopía.',
    festivals_badge: 'CALENDARIO FESTIVO',
    festivals_title: 'Celebraciones y Fiestas Sagradas',
    festivals_desc: 'Viva el Timkat, Meskel e Irreecha con anfitriones locales.',
    assistant_badge: 'SERVICIOS DE VIAJE',
    assistant_title: 'Asistencia y Logística Local',
    assistant_desc: 'Vehículos 4x4, traslados al aeropuerto, intérpretes y apoyo a ONG.',
    lodges_badge: 'HOSPEDAJE',
    lodges_title: 'Eco-Lodges y Hoteles con Encanto',
    lodges_desc: 'Descanse en alojamientos únicos en contacto con la naturaleza.',
    about_badge: 'SU ANFITRIONA',
    about_title: 'Uniendo Culturas con Auténtica Hospitalidad',
    about_desc: 'Fundada por Hindek para mostrar la verdadera Etiopía con cariño y profesionalismo.',
    reviews_badge: 'TESTIMONIOS',
    reviews_title: 'Recomendada por Viajeros de Todo el Mundo',
    reviews_desc: 'Lea las vivencias de quienes recorrieron Etiopía con Hindek.',
    how_to_book_badge: 'FÁCIL Y DIRECTO',
    how_to_book_title: 'Cómo Reservar Su Viaje',
    how_to_book_desc: 'Trato directo y personal con Hindek desde el inicio.',
    contact_badge: 'CONTACTO',
    contact_title: 'Comience a Planificar su Viaje',
    contact_desc: 'Escriba a Hindek por WhatsApp o correo electrónico.',
    contact_whatsapp_btn: 'Chatear en WhatsApp',
    contact_email_btn: 'Enviar Correo',
    btn_share: 'Compartir',
    btn_share_copied: '¡Enlace copiado!',
    btn_close: 'Cerrar',
    btn_submit: 'Enviar Solicitud',
    lbl_language: 'Idioma',
    lbl_select_lang: 'Seleccionar Idioma',
    search_region_label: 'Región de Destino',
    search_all_regions: 'Todas las Regiones',
    search_experience_label: 'Tipo de Experiencia',
    search_all_types: 'Todas las Experiencias',
    search_btn: 'Buscar Experiencia',
  },

  ar: {
    nav_home: 'الرئيسية',
    nav_destinations: 'استكشف إثيوبيا',
    nav_tours: 'الجولات والرحلات',
    nav_hindek_kitchen: 'مطبخ هيندك',
    nav_coffee: 'قهوة الجد التقليدية',
    nav_food: 'معرض الأطعمة',
    nav_festivals: 'المهرجانات',
    nav_travel_assistance: 'خدمات السفر',
    nav_hotels: 'النزل البيئية والإقامة',
    nav_about: 'عن هيندك',
    nav_reviews: 'آراء المسافرين',
    nav_how_to_book: 'طريقة الحجز',
    nav_contact: 'اتصل بنا',
    nav_experiences: 'التجارب',
    nav_more: 'دليل السفر',
    btn_book_experience: 'احجز تجربة',
    btn_plan_my_trip: 'خطط لرحلتي',
    btn_ask_ai: 'مساعد الذكاء الاصطناعي',
    btn_upload_photos: 'رفع الصور',
    btn_whatsapp_direct: 'واتساب مباشر',
    official_badge: 'المنصة الرسمية لـ هيندك • أديس أبابا، إثيوبيا',
    connecting_tagline: 'ربط العالم بقلب إثيوبيا الأصيل',
    lang_toggle_aria: 'اختر اللغة',
    hero_badge: 'رحلات أصيلة بقيادة هيندك',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: 'رحلات ثقافية وتجارب طهي أصيلة',
    hero_desc: 'عش روح إثيوبيا الحقيقية من خلال رحلات استكشافية خاصة، وتجربة الطهي في مطبخ هيندك، ومراسم القهوة الإثيوبية العريقة.',
    hero_search_placeholder: 'أين تريد أن تسافر؟ (مثل جبال بالي، لاليبيلا، وادي أومو)...',
    hero_search_btn: 'اكتشف',
    hero_all_regions: 'جميع المناطق',
    hero_all_categories: 'جميع الفئات',
    hero_cta_explore: 'استكشف الوجهات',
    hero_cta_plan: 'تخطيط رحلة خاصة',
    hero_cta_kitchen: 'انضم لمطبخ هيندك',
    hero_stat_exp: '10+ سنوات',
    hero_stat_exp_lbl: 'خبرة محلية',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: 'تقييم المسافرين',
    hero_stat_dest: '20+ موقع',
    hero_stat_dest_lbl: 'مسارات مخصصة',
    destinations_badge: 'وجهات تاريخية وأماكن مقدسة',
    destinations_title: 'اكتشف روائع إثيوبيا',
    destinations_desc: 'من كنائس لاليبيلا الصخرية إلى مرتفعات جبال بالي وبحيرات الوادي المتصدع الساحرة.',
    explore_badge: 'الوجهات والمناطق',
    explore_title: 'اكتشف روائع إثيوبيا',
    explore_desc: 'طبيعة ساحرة وثقافات أصيلة وتاريخ عريق.',
    explore_all_tab: 'جميع الوجهات',
    btn_request_booking: 'طلب حجز',
    btn_view_details: 'عرض المسار',
    tours_badge: 'جولات سياحية خاصة',
    tours_title: 'رحلات لا تُنسى في إثيوبيا',
    tours_desc: 'برامج ثقافية وسياحية مصممة خصيصاً مع مرشدين محليين معتمدين ونقل مريح.',
    tours_custom_btn: 'طلب برنامج مخصص',
    kitchen_badge: 'تجربة الطهي الثقافي',
    kitchen_title: 'تجربة مطبخ هيندك',
    kitchen_desc: 'تعلم صنع الإينجيرا الإثيوبية ووجبة دورو وات في أواني الفخار التقليدية في أديس أبابا.',
    kitchen_book_class: 'حجز درس الطهي',
    coffee_badge: 'مراسم القهوة التاريخية',
    coffee_title: 'مراسم قهوة الجد',
    coffee_desc: 'تذوق القهوة العربية الطازجة على ثلاث جولات تقليدية مع البخور وحبات الفشار.',
    coffee_book_btn: 'حجز مراسم القهوة',
    food_badge: 'المطبخ الإثيوبي',
    food_title: 'النكهات والتقاليد الغذائية',
    food_desc: 'تعرف على أشهى الأطباق والبهارات الإثيوبية التقليدية.',
    festivals_badge: 'المهرجانات والاحتفالات',
    festivals_title: 'الأعياد والاحتفالات الوطنية',
    festivals_desc: 'شاهد أعياد التيمقت والمسقل وإيريتشا بصحبة مرشد محلي.',
    assistant_badge: 'خدمات السفر واللوجستيات',
    assistant_title: 'خدمات المساعدة والاستقبال',
    assistant_desc: 'سيارات دفع رباعي 4x4، استقبال المطار، الترجمة ودعم المنظمات الدولية والباحثين.',
    lodges_badge: 'أماكن الإقامة المختارة',
    lodges_title: 'النزل البيئية والفنادق التراثية',
    lodges_desc: 'استمتع بإقامة مريحة وسط الطبيعة والبحيرات.',
    about_badge: 'عن مرشدتك',
    about_title: 'جسور التواصل من خلال كرم الضيافة الإثيوبية',
    about_desc: 'أسستها هيندك بهدف تعريف المسافرين بجمال وثقافة إثيوبيا الحقيقية.',
    reviews_badge: 'آراء الزوار',
    reviews_title: 'محبوبة من قبل المسافرين حول العالم',
    reviews_desc: 'اقرأ تجارب المسافرين الذين زاروا إثيوبيا مع هيندك.',
    how_to_book_badge: 'حجز مباشر وسهل',
    how_to_book_title: 'طريقة الحجز',
    how_to_book_desc: 'تواصل مباشر مع هيندك لتنظيم رحلتك من البداية حتى الوصول.',
    contact_badge: 'تواصل معنا',
    contact_title: 'ابدأ التخطيط لرحلتك اليوم',
    contact_desc: 'تواصل مباشرة عبر واتساب أو البريد الإلكتروني.',
    contact_whatsapp_btn: 'تحدث عبر واتساب',
    contact_email_btn: 'إرسال بريد إلكتروني',
    btn_share: 'مشاركة',
    btn_share_copied: 'تم نسخ الرابط!',
    btn_close: 'إغلاق',
    btn_submit: 'إرسال الطلب',
    lbl_language: 'اللغة',
    lbl_select_lang: 'اختر اللغة',
    search_region_label: 'المنطقة',
    search_all_regions: 'جميع المناطق',
    search_experience_label: 'نوع التجربة',
    search_all_types: 'جميع التجارب',
    search_btn: 'بحث عن تجربة',
  },

  ko: {
    // Nav
    nav_home: '홈',
    nav_destinations: '에티오피아 탐험',
    nav_tours: '투어 & 원정',
    nav_hindek_kitchen: '힌덱 키친',
    nav_coffee: '할아버지 커피',
    nav_food: '음식 갤러리',
    nav_festivals: '축제 & 문화행사',
    nav_travel_assistance: '여행 컨시어지',
    nav_hotels: '에코 롯지 & 숙소',
    nav_about: '힌덱 소개',
    nav_reviews: '여행자 후기',
    nav_how_to_book: '예약 안내',
    nav_contact: '문의하기',
    nav_experiences: '시그니처 체험',
    nav_more: '더보기',
    btn_book_experience: '체험 예약하기',
    btn_plan_my_trip: '맞춤 여행 계획하기',
    btn_ask_ai: 'AI 컨시어지 질문',
    btn_upload_photos: '사진 업로드',
    btn_whatsapp_direct: 'WhatsApp 바로 문의',
    official_badge: '힌덱 공식 플랫폼 • 에티오피아 아디스아바바',
    connecting_tagline: '세계와 에티오피아의 진정한 심장을 잇다',
    lang_toggle_aria: '언어 선택',

    // Hero
    hero_badge: '힌덱과 함께하는 진정한 에티오피아 여정',
    hero_title_main: 'BRIDGE ETHIOPIA',
    hero_tagline: '문화 여행, 살아 숨쉬는 유산 & 전통 요리 체험',
    hero_desc: '엄선된 프라이빗 원정, 힌덱 키친의 전통 쿠킹 클래스, 할아버지 대대로 전해지는 성스러운 커피 의식, 웅장한 대자연을 통해 에티오피아의 깊은 매력을 경험하세요.',
    hero_search_placeholder: '어디를 여행하고 싶으신가요? (예: 발레 산맥, 랄리벨라, 오모 밸리, 아디스아바바)...',
    hero_search_btn: '검색하기',
    hero_all_regions: '모든 지역',
    hero_all_categories: '모든 카테고리',
    hero_cta_explore: '여행지 둘러보기',
    hero_cta_plan: '맞춤 여행 신청',
    hero_cta_kitchen: '힌덱 키친 참여하기',
    hero_stat_exp: '10년 이상',
    hero_stat_exp_lbl: '현지 전문 가이드',
    hero_stat_rating: '5.0 ★',
    hero_stat_rating_lbl: '여행자 평점',
    hero_stat_dest: '20+ 명소',
    hero_stat_dest_lbl: '엄선된 일정',

    // Explore Section
    destinations_badge: '고유의 명소 & 성스러운 유적지',
    destinations_title: '에티오피아의 경이로운 여행지 탐험',
    destinations_desc: '고대 암굴 교회와 화산 분화구 호수부터 살아 숨쉬는 오모 부족 문화와 장엄한 고산 지대까지.',
    explore_badge: '추천 여행지 & 지역',
    explore_title: '에티오피아의 보석 같은 명소들',
    explore_desc: '발레 산맥의 고원 풍경부터 랄리벨라의 경이로운 바위 교회, 다나킬 저지대 및 대지구대 호수까지.',
    explore_all_tab: '전체 여행지',
    btn_request_booking: '예약 요청하기',
    btn_view_details: '일정 상세 보기',

    // Tours Section
    tours_badge: '맞춤형 원정 & 투어',
    tours_title: '잊지 못할 여정과 다일 투어',
    tours_desc: '공인 현지 가이드와 믿을 수 있는 전용 차량으로 떠나는 맞춤 문화, 역사, 트레킹, 사진 출사 투어.',
    tours_custom_btn: '맞춤 일정 문의하기',

    // Hindek Kitchen
    kitchen_badge: '시그니처 전통 요리 체험',
    kitchen_title: '힌덱 키친 쿠킹 클래스',
    kitchen_desc: '아디스아바바에서 직접 만드는 테프 인제라 굽기와 도로 왓, 전통 토기 냄비를 사용한 비건 시로 요리 체험.',
    kitchen_book_class: '쿠킹 클래스 예약하기',

    // Coffee
    coffee_badge: '고대 커피 세레모니',
    coffee_title: '힌덱 할아버지 커피 체험',
    coffee_desc: '아라비카 커피의 발원지에서 전통 토기 제베나로 우려내는 신성한 3잔의 커피와 유향, 팝콘의 향연.',
    coffee_book_btn: '커피 의식 예약하기',

    // Food Gallery
    food_badge: '에티오피아 & 오로모 전통 요리',
    food_title: '풍부한 맛과 전통 미식 갤러리',
    food_desc: '에티오피아 전통의 다채로운 향신료와 독특한 채식/단식 요리 문화를 발견하세요.',

    // Festivals
    festivals_badge: '문화 캘린더',
    festivals_title: '성스러운 전통 축제 & 국가 기념일',
    festivals_desc: '팀캇(주현절), 메스켈(십자가 발견 축제), 이레차(오로모 추수 감사제)를 현지 호스트와 함께 생생하게 체험하세요.',

    // Travel Assistant
    assistant_badge: '현지 전문 서비스',
    assistant_title: '여행 컨시어지 & 현지 지원 서비스',
    assistant_desc: '전문 기사가 동행하는 4륜구동(4x4) 차량, 공항 픽업, 통역, 비즈니스 및 NGO 지원 서비스.',

    // Accommodations
    lodges_badge: '엄선된 숙소',
    lodges_title: '에코 롯지, 부티크 리조트 & 헤리티지 스테이',
    lodges_desc: '대자연 속 고요한 산악 롯지와 리프트 밸리 호숫가 휴양지, 안락한 시내 부티크 호텔.',

    // About
    about_badge: '호스트 소개',
    about_title: '따뜻한 에티오피아의 환대로 세계를 잇다',
    about_desc: '힌덱이 설립한 브릿지 에티오피아는 문화에 대한 깊은 사랑과 지속 가능한 현지 커뮤니티 지원을 바탕으로 운영됩니다.',

    // Reviews
    reviews_badge: '여행자 생생 후기',
    reviews_title: '전 세계 여행자들이 사랑한 경험',
    reviews_desc: '힌덱과 함께 에티오피아를 여행한 여행자, 가족, 연구자들의 생생한 여행기를 확인하세요.',

    // How to Book
    how_to_book_badge: '쉽고 빠른 예약',
    how_to_book_title: '예약 진행 방법',
    how_to_book_desc: '첫 문의부터 현지 도착까지 힌덱과 직접 소통하며 투명하고 편안하게 준비하세요.',

    // Contact
    contact_badge: '문의 & 상담',
    contact_title: '나만의 에티오피아 여정을 시작하세요',
    contact_desc: 'WhatsApp, 이메일, 전화를 통해 힌덱에게 바로 문의하고 맞춤 상담을 받으실 수 있습니다.',
    contact_whatsapp_btn: 'WhatsApp으로 대화하기',
    contact_email_btn: '이메일 보내기',
    btn_share: '공유하기',
    btn_share_copied: '링크 복사됨!',

    // Common Buttons & Labels
    btn_close: '닫기',
    btn_submit: '요청 제출하기',
    lbl_language: '언어',
    lbl_select_lang: '언어 선택',
    search_region_label: '여행 지역',
    search_all_regions: '에티오피아 전 지역',
    search_experience_label: '체험 유형',
    search_all_types: '모든 여행 체험',
    search_btn: '체험 검색',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('bridge_ethiopia_language') as Language;
      if (
        saved &&
        (saved === 'en' ||
          saved === 'om' ||
          saved === 'am' ||
          saved === 'ko' ||
          saved === 'fr' ||
          saved === 'de' ||
          saved === 'it' ||
          saved === 'es' ||
          saved === 'ar')
      ) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('bridge_ethiopia_language', lang);
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch {
      // ignore
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
