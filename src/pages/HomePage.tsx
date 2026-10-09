import React, { useState } from 'react';
import { HOTEL_INFO, ROOMS_DATA, AMENITIES_DATA, REVIEWS_DATA } from '../data/hotelData';
import {
  CalendarCheck,
  Compass,
  Phone,
  MapPin,
  UtensilsCrossed,
  Wifi,
  Coffee,
  Car,
  Sparkles,
  ChevronRight,
  Send,
  Star,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  // Quick bar state
  const [quickCheckIn, setQuickCheckIn] = useState('');
  const [quickCheckOut, setQuickCheckOut] = useState('');
  const [quickGuests, setQuickGuests] = useState('2');

  // Contact form in Section 6
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking();
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
      setTimeout(() => setContactSuccess(false), 5000);
    }, 600);
  };

  // Icon mapping
  const renderAmenityIcon = (icon: string) => {
    switch (icon) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#d4af37]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#d4af37]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#d4af37]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#d4af37]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#d4af37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <div className="space-y-0">
      {/* =========================================================================
          SECTION 1: LUXURY HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-width Luxury Hotel Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_sanctuary_hotel_1791541219361.jpg"
            alt="Sanctuary Hotel Aberdeen Exterior and Grand Entrance"
            className="w-full h-full object-cover object-center filter brightness-90"
            referrerPolicy="no-referrer"
          />
          {/* Measured Dark Purple & Midnight Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c29] via-[#1b1035]/75 to-[#120a22]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1b1035]/40 to-[#120a22]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Unboxed editorial kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#d4af37] mb-6">
            <span>Caroline Place, Aberdeen</span>
            <span aria-hidden="true">·</span>
            <span>Five-Star Scottish Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance leading-tight drop-shadow-md">
            Welcome to Sanctuary Hotel
          </h1>

          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-balance">
            Experience Luxury, Comfort & Exceptional Hospitality.
          </p>

          {/* Gold Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-8 py-3.5 rounded-lg text-xs tracking-widest uppercase font-semibold w-full sm:w-auto shadow-lg cursor-pointer"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-3.5 rounded-lg text-xs tracking-widest uppercase font-semibold text-white bg-[#32165c]/80 hover:bg-[#431d7c] border border-[#d4af37]/40 transition-all w-full sm:w-auto cursor-pointer"
            >
              Explore Our Hotel
            </button>
          </div>

          {/* Integrated Quick Reservation Strip */}
          <form
            onSubmit={handleQuickSearch}
            className="bg-[#1b1035]/90 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-3 sm:p-4 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-3 text-left shadow-2xl"
          >
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full bg-[#120a22] border border-[#32165c] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={quickCheckOut}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="w-full bg-[#120a22] border border-[#32165c] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Guests
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="w-full bg-[#120a22] border border-[#32165c] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="btn-gold w-full py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase text-center"
              >
                Check Availability
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WELCOME TO SANCTUARY HOTEL
          ========================================================================= */}
      <section className="py-24 bg-[#180e30] border-t border-[#32165c]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story & Philosophy */}
            <div className="space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                A Five-Star Aberdeen Legacy
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                An Intimate Haven in Scotland&apos;s Granite City
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Tucked peacefully on Caroline Place, Sanctuary Hotel presents a timeless blend of classic Scottish architectural grace and sumptuous five-star indulgence. From our hand-carved millwork and bespoke velvet furnishings to ambient golden lighting, every detail is crafted to provide absolute tranquility.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Whether visiting for high-level business in Aberdeen, cultural evenings at His Majesty&apos;s Theatre, or leisure journeys across the Scottish Highlands, our discreet and personalized hospitality ensures your stay is unforgettable.
              </p>

              {/* Verified Trust Markers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#32165c]">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#d4af37] block">
                    Caroline Pl
                  </span>
                  <span className="text-xs text-gray-400">Prime Aberdeen Address</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#d4af37] block">
                    24 / 7
                  </span>
                  <span className="text-xs text-gray-400">Concierge Attention</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#d4af37] block">
                    100%
                  </span>
                  <span className="text-xs text-gray-400">Guest Serenity</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#f3e5ab] transition-colors group cursor-pointer"
                >
                  <span>Learn more about our heritage & values</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* High-end Photography Layout */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
                <img
                  src="/src/assets/images/dining_fine_restaurant_1791541256253.jpg"
                  alt="Sanctuary Hotel Dining Room and Cocktail Salon"
                  className="w-full h-[460px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1035]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    The Sanctuary Salon
                  </span>
                  <p className="text-sm font-serif text-white font-medium mt-1">
                    Exquisite fine dining, artisanal Scottish breakfasts, and rare single malts.
                  </p>
                </div>
              </div>

              {/* Decorative accent frame */}
              <div className="hidden sm:block absolute -top-3 -right-3 w-32 h-32 border-t-2 border-r-2 border-[#d4af37]/40 pointer-events-none rounded-tr-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ROOMS & SUITES
          ========================================================================= */}
      <section className="py-24 bg-[#140c29] border-t border-[#32165c]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Rooms & Suites
            </h2>
            <p className="text-sm text-gray-300">
              Each room is designed with deep royal purple accents, acoustic soundproofing, and custom beds to guarantee deep, restorative rest.
            </p>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS_DATA.slice(0, 3).map((room) => (
              <div
                key={room.id}
                className="group bg-[#1e113a] rounded-xl overflow-hidden border border-[#32165c] hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col shadow-xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] via-transparent to-transparent" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-[#120a22]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-right">
                    <span className="text-[10px] uppercase text-gray-400 block tracking-wider">From</span>
                    <span className="font-serif text-base font-bold text-[#d4af37] tabular-nums">
                      {room.currency}{room.pricePerNight}
                    </span>
                    <span className="text-[10px] text-gray-400"> / night</span>
                  </div>

                  {/* Room Size Unboxed Metadata */}
                  <div className="absolute bottom-3 left-4 text-xs text-gray-200 flex items-center gap-2">
                    <span>{room.size}</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.occupancy}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Verified Amenities preview */}
                    <div className="mt-4 pt-3 border-t border-[#32165c]/60 space-y-1.5">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Buttons */}
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="btn-gold flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-center cursor-pointer shadow"
                    >
                      Book Suite
                    </button>
                    <button
                      onClick={() => onNavigate('rooms')}
                      className="px-3 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-[#251545] hover:bg-[#32165c] transition-colors cursor-pointer"
                      title="View room details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('rooms')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#d4af37]/60 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#32165c] transition-colors cursor-pointer"
            >
              <span>View All Rooms & Suite Categories</span>
              <ChevronRight className="w-4 h-4 text-[#d4af37]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOTEL AMENITIES & SERVICES
          ========================================================================= */}
      <section className="py-24 bg-[#180e30] border-t border-[#32165c]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Guest Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Hotel Amenities & Services
            </h2>
            <p className="text-sm text-gray-300">
              Thoughtfully curated services tailored to make every hour at Sanctuary Hotel an effortless delight.
            </p>
          </div>

          {/* Elegant Cards with High-Res Luxury Photography & Gold Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES_DATA.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col group"
              >
                {/* Amenity Photography */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] via-[#1e113a]/25 to-transparent" />
                  
                  {/* Floating Gold Icon Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center shadow-lg">
                    {renderAmenityIcon(amenity.icon)}
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute bottom-2.5 left-4 text-[11px] font-semibold uppercase tracking-widest text-[#d4af37] drop-shadow">
                    {amenity.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2">
                      {amenity.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: GUEST EXPERIENCE
          ========================================================================= */}
      <section className="py-24 bg-[#140c29] border-t border-[#32165c]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Authentic Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Guest Experience
            </h2>
            <p className="text-sm text-gray-300">
              The true testament of Sanctuary Hotel lies in the memories of our residents and travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#1b1035] border border-[#32165c] rounded-xl p-6 flex flex-col justify-between shadow-lg relative"
              >
                <div className="space-y-4">
                  {/* Star rating */}
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-serif text-base font-bold text-white">
                    &ldquo;{rev.title}&rdquo;
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    {rev.comment}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#32165c] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{rev.guestName}</span>
                    <span className="text-gray-400">{rev.location}</span>
                  </div>
                  <span className="text-[11px] text-[#d4af37] font-medium">{rev.roomStayed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CONTACT & BOOK YOUR STAY
          ========================================================================= */}
      <section className="py-24 bg-[#180e30] border-t border-[#32165c]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Information & Reserve Button */}
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                Plan Your Visit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Contact & Book Your Stay
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Our reservations team is delighted to arrange your arrival in Aberdeen, prepare custom suite amenities, or coordinate private airport transfers.
              </p>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#1b1035] border border-[#32165c] hover:border-[#d4af37] transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#251545] text-[#d4af37] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                      Direct Telephone Reservation
                    </span>
                    <span className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors tabular-nums">
                      {HOTEL_INFO.phone}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">Click to call anytime (24/7 Concierge)</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1b1035] border border-[#32165c]">
                  <div className="p-2.5 rounded-lg bg-[#251545] text-[#d4af37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                      Hotel Address
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {HOTEL_INFO.address}
                    </span>
                    <a
                      href={HOTEL_INFO.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#d4af37] hover:underline block mt-1"
                    >
                      Open in Google Maps Directions →
                    </a>
                  </div>
                </div>
              </div>

              {/* Prominent Gold Button */}
              <div className="pt-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reserve Your Room</span>
                </button>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="bg-[#1b1035] border border-[#32165c] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Receive prompt concierge replies regarding rates, private hire, and seasonal availability.
              </p>

              {contactSuccess ? (
                <div className="p-6 bg-[#251545] border border-[#d4af37]/40 rounded-xl text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-[#d4af37] mx-auto" />
                  <h4 className="font-serif text-lg text-white font-bold">Inquiry Received</h4>
                  <p className="text-xs text-gray-300">
                    Thank you. Our front desk team will contact you promptly at the phone or email provided.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fiona Anderson"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="fiona@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+44 7530 000000"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Message & Requirements *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please let us know your planned stay dates, questions, or specific suite preferences..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="btn-gold w-full py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{contactLoading ? 'Sending...' : 'Submit Concierge Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
