export interface Room {
  id: string;
  name: string;
  category: 'suite' | 'deluxe' | 'classic';
  pricePerNight: number;
  currency: string;
  size: string;
  occupancy: string;
  bedType: string;
  view: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
}

export interface Amenity {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  image: string;
}

export interface Review {
  id: string;
  guestName: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  roomStayed: string;
}

export const HOTEL_INFO = {
  name: 'Sanctuary Hotel',
  tagline: 'Experience Luxury, Comfort & Exceptional Hospitality',
  phone: '+44 7530 322378',
  phoneClean: '+447530322378',
  email: 'reservations@sanctuaryhotelaberdeen.co.uk',
  address: 'Caroline Pl, Aberdeen AB25 2TH, United Kingdom',
  street: 'Caroline Pl',
  city: 'Aberdeen',
  postcode: 'AB25 2TH',
  country: 'United Kingdom',
  checkIn: '15:00',
  checkOut: '11:00',
  mapCoordinates: {
    lat: 57.1518,
    lng: -2.1124,
  },
  googleMapsEmbed: 'https://maps.google.com/maps?q=Caroline%20Pl,%20Aberdeen%20AB25%202TH,%20United%20Kingdom&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Caroline+Pl,+Aberdeen+AB25+2TH,+United+Kingdom',
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'royal-granite-suite',
    name: 'The Royal Granite Suite',
    category: 'suite',
    pricePerNight: 285,
    currency: '£',
    size: '58 m²',
    occupancy: 'Up to 2 Guests',
    bedType: 'Super King Bed with 800-thread Egyptian Cotton',
    view: 'Panoramic Aberdeen City & Skyline',
    image: '/src/assets/images/suite_executive_bedroom_1791541232614.jpg',
    description: 'Our crown jewel suite balances Scottish heritage with contemporary royal purple decadence. Features an expansive separate salon, bespoke brushed gold chandeliers, marble bathroom with a deep freestanding soaking tub, and evening turndown service.',
    amenities: [
      'High-Speed Wi-Fi',
      'Marble Soaking Tub & Rain Shower',
      'Espresso & Artisan Tea Bar',
      'Private Salon & Dining Nook',
      'Complimentary Evening Aperitif',
      'Molton Brown Bath Amenities'
    ],
    features: ['58 m² Living Space', 'Freestanding Soaking Tub', 'Dedicated Butler Service', 'Smart 4K Entertainment']
  },
  {
    id: 'executive-balcony-suite',
    name: 'Executive Sanctuary Suite',
    category: 'suite',
    pricePerNight: 235,
    currency: '£',
    size: '48 m²',
    occupancy: 'Up to 2 Guests',
    bedType: 'King Size Hypnos Bed',
    view: 'Private Terrace & Garden Aspect',
    image: '/src/assets/images/suite_deluxe_lounge_1791541245047.jpg',
    description: 'A serene haven designed for discerning business executives and romantic getaways. Boasts plush velvet lounging chairs, an executive walnut desk, walk-in rain shower, and quiet acoustic insulation ensuring peaceful rest.',
    amenities: [
      'High-Speed Wi-Fi',
      'Walk-In Monsoon Shower',
      'Bespoke Velvet Lounge Area',
      'Executive Workstation',
      'Bathrobes & Plush Slippers',
      'Mini Bar & Wine Cellar'
    ],
    features: ['48 m² Suite', 'Executive Desk', 'Velvet Lounge Section', 'Quiet Garden Aspect']
  },
  {
    id: 'deluxe-king-room',
    name: 'Deluxe King Room',
    category: 'deluxe',
    pricePerNight: 175,
    currency: '£',
    size: '36 m²',
    occupancy: 'Up to 2 Guests',
    bedType: 'King Bed with Luxury Pillow Menu',
    view: 'Caroline Place Historic Aspect',
    image: '/src/assets/images/dining_fine_restaurant_1791541256253.jpg',
    description: 'Impeccably appointed with warm golden sconces and deep royal purple drapery. Featuring a custom handcrafted bed, spacious marble en-suite, and tailored amenities for an effortless five-star stay.',
    amenities: [
      'High-Speed Wi-Fi',
      'Italian Marble Bathroom',
      'Smart Climate Control',
      'Pillow Selection Menu',
      'In-Room Safe & Mini Refrigerator',
      'Artisan Scottish Shortbread'
    ],
    features: ['36 m² Floor Plan', 'Italian Marble Bath', 'Smart Climate Control', 'Pillow Menu']
  },
  {
    id: 'classic-sanctuary-double',
    name: 'Classic Sanctuary Double',
    category: 'classic',
    pricePerNight: 139,
    currency: '£',
    size: '28 m²',
    occupancy: 'Up to 2 Guests',
    bedType: 'Double Bed with Memory Foam Mattress',
    view: 'Courtyard View',
    image: '/src/assets/images/hero_sanctuary_hotel_1791541219361.jpg',
    description: 'Intimate, quiet, and thoughtfully curated for restorative comfort. Enjoy plush bedding, premium bath amenities, tea-making facilities, and fast wireless connectivity in a classic Aberdeen setting.',
    amenities: [
      'High-Speed Wi-Fi',
      'En-Suite Rainfall Shower',
      'Fine Tea & Coffee Station',
      'Smart HD Television',
      'Soundproofed Glazing',
      'Daily Housekeeping Service'
    ],
    features: ['28 m² Cozy Layout', 'Rainfall Shower', 'Soundproof Glazing', 'Quiet Courtyard View']
  }
];

export const AMENITIES_DATA: Amenity[] = [
  {
    id: 'dining',
    title: 'Fine Dining & Cocktail Salon',
    category: 'Gastronomy',
    description: 'Savour seasonal Scottish cuisine prepared with local North East produce, complemented by rare single malt whiskies and signature cocktails in our velvet-seated salon.',
    icon: 'UtensilsCrossed',
    image: '/src/assets/images/dining_fine_restaurant_1791541256253.jpg'
  },
  {
    id: 'wifi',
    title: 'Complimentary High-Speed Wi-Fi',
    category: 'Connectivity',
    description: 'Dedicated high-speed wireless connectivity throughout all guest rooms, suites, and public lounges for seamless streaming and remote business productivity.',
    icon: 'Wifi',
    image: '/src/assets/images/amenity_wifi_business_1791542004985.jpg'
  },
  {
    id: 'concierge',
    title: '24-Hour Personalized Concierge',
    category: 'Guest Service',
    description: 'Our knowledgeable concierge team assists with private Highland distillery tours, Royal Deeside itineraries, dinner reservations, and luggage care.',
    icon: 'Compass',
    image: '/src/assets/images/amenity_concierge_desk_1791541956913.jpg'
  },
  {
    id: 'breakfast',
    title: 'Curated Scottish Breakfast',
    category: 'Hospitality',
    description: 'Enjoy a cooked-to-order Scottish breakfast or fresh continental selections served in our dining hall or delivered directly to your suite.',
    icon: 'Coffee',
    image: '/src/assets/images/amenity_scottish_breakfast_1791541973975.jpg'
  },
  {
    id: 'valet',
    title: 'Chauffeur & Travel Transfers',
    category: 'Transport',
    description: 'Convenient transfer coordination to Aberdeen International Airport (Dyce), Aberdeen Railway Station, and local golf links upon request.',
    icon: 'Car',
    image: '/src/assets/images/amenity_chauffeur_limousine_1791541987911.jpg'
  },
  {
    id: 'wellness',
    title: 'Sanctuary Quiet & Restorative Comfort',
    category: 'Rest & Sleep',
    description: 'Designed around quiet restfulness: acoustic sound insulation, blackout velvet drapery, hypoallergenic bedding, and restorative evening ambience.',
    icon: 'Sparkles',
    image: '/src/assets/images/suite_deluxe_lounge_1791541245047.jpg'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Eleanor Vance',
    location: 'Edinburgh, UK',
    rating: 5,
    date: 'February 2026',
    title: 'An exquisite gem on Caroline Place',
    comment: 'Sanctuary Hotel is by far the most refined stay in Aberdeen. The dark purple and gold interior styling felt warm and truly five-star. The bed was divine and the concierge arranged our theatre tickets flawlessly.',
    roomStayed: 'The Royal Granite Suite'
  },
  {
    id: 'rev-2',
    guestName: 'David & Fiona MacLeod',
    location: 'London, UK',
    rating: 5,
    date: 'January 2026',
    title: 'Unmatched comfort and hospitality',
    comment: 'From the moment we arrived, the warmth of the staff made us feel at home. The suite was immaculate, peaceful, and the dining room breakfast was cooked to perfection. Highly recommended.',
    roomStayed: 'Executive Sanctuary Suite'
  },
  {
    id: 'rev-3',
    guestName: 'Dr. Alistair Grant',
    location: 'St Andrews, Scotland',
    rating: 5,
    date: 'March 2026',
    title: 'Quiet luxury in Aberdeen city center',
    comment: 'Visiting Aberdeen for an academic symposium, Sanctuary Hotel provided the exact peaceful sanctuary I needed. Exceptional high-speed Wi-Fi, sublime espresso bar, and spotless rooms.',
    roomStayed: 'Deluxe King Room'
  }
];
