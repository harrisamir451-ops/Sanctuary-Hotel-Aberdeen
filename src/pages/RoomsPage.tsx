import React, { useState } from 'react';
import { ROOMS_DATA, AMENITIES_DATA, Room } from '../data/hotelData';
import {
  Users,
  Maximize2,
  BedDouble,
  Check,
  CalendarCheck,
  Sparkles,
  UtensilsCrossed,
  Wifi,
  Compass,
  Coffee,
  Car,
  Clock,
  ChevronRight
} from 'lucide-react';

interface RoomsPageProps {
  onOpenBooking: (roomId?: string) => void;
  onNavigate: (page: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'suite' | 'deluxe' | 'classic'>('all');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  const filteredRooms = filterCategory === 'all'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((r) => r.category === filterCategory);

  const toggleExpand = (id: string) => {
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <section className="relative py-28 bg-[#160d2b] border-b border-[#32165c]/60 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/src/assets/images/suite_executive_bedroom_1791541232614.jpg"
            alt="Sanctuary Hotel Suite Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#140c29]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#d4af37] mb-4">
            <span>Accommodations & Hospitality</span>
            <span aria-hidden="true">·</span>
            <span>Sanctuary Hotel</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6 text-balance">
            Rooms & Services
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Immerse yourself in understated opulence. Each room and suite at Sanctuary Hotel is curated with dark purple velvets, brushed gold detailing, and acoustic serenity.
          </p>
        </div>
      </section>

      {/* Filter Tabs (Interactive Filter Controls) */}
      <section className="bg-[#180e30] border-b border-[#32165c] py-6 sticky top-20 z-30 backdrop-blur-md bg-[#180e30]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-[#120a22] rounded-lg border border-[#32165c] overflow-x-auto max-w-full">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterCategory === 'all'
                  ? 'btn-gold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All Accommodations ({ROOMS_DATA.length})
            </button>
            <button
              onClick={() => setFilterCategory('suite')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterCategory === 'suite'
                  ? 'btn-gold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Suites
            </button>
            <button
              onClick={() => setFilterCategory('deluxe')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterCategory === 'deluxe'
                  ? 'btn-gold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Deluxe Rooms
            </button>
            <button
              onClick={() => setFilterCategory('classic')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterCategory === 'classic'
                  ? 'btn-gold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Classic Double
            </button>
          </div>

          <div className="text-xs text-gray-400 hidden md:block">
            Best rate guarantee when reserving directly with our concierge desk.
          </div>
        </div>
      </section>

      {/* Room Showcase Cards */}
      <section className="py-20 bg-[#140c29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredRooms.map((room) => {
            const isExpanded = expandedRoomId === room.id;
            return (
              <div
                key={room.id}
                className="bg-[#1b1035] border border-[#32165c] hover:border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Room Image Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1035] lg:from-transparent lg:bg-gradient-to-r lg:to-transparent" />
                  
                  {/* Floating Price Pill */}
                  <div className="absolute top-4 left-4 bg-[#120a22]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#d4af37]/40 shadow-lg">
                    <span className="text-[10px] uppercase text-gray-400 block tracking-wider">Direct Verified Rate</span>
                    <span className="font-serif text-xl font-bold text-[#d4af37] tabular-nums">
                      {room.currency}{room.pricePerNight}
                    </span>
                    <span className="text-xs text-gray-300"> / night</span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#32165c] pb-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block">
                          {room.category === 'suite' ? 'Signature Suite' : 'Luxury Room'}
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                          {room.name}
                        </h2>
                      </div>
                      <div className="text-xs text-gray-400">
                        {room.view}
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 bg-[#120a22]/80 rounded-xl p-4 border border-[#32165c]/60 text-xs">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Maximize2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span>{room.occupancy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 col-span-2 sm:col-span-1">
                        <BedDouble className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span className="truncate">{room.bedType.split('with')[0]}</span>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-2">
                        Included Suite Amenities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {room.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-300">
                            <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Extra details toggle */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-[#32165c] text-xs text-gray-300 space-y-2 animate-fadeIn">
                        <span className="font-semibold text-white block">Bedding & Bathroom Specifications:</span>
                        <p className="text-gray-400">
                          {room.bedType}. En-suite features heated towel rails, luxury magnifying mirrors, custom cotton bathrobes, and complimentary designer toiletries.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#32165c] flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="btn-gold px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Reserve This Suite</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(room.id)}
                      className="px-4 py-3 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-[#251545] hover:bg-[#32165c] transition-colors cursor-pointer"
                    >
                      {isExpanded ? 'Show Less' : 'Full Specifications'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hotel Facilities & Guest Services Directory */}
      <section className="py-24 bg-[#180e30] border-t border-[#32165c]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Guest Care Directory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Hotel Facilities & Guest Services
            </h2>
            <p className="text-sm text-gray-300">
              Every facility at Sanctuary Hotel operates to ensure flawless comfort and personalized ease throughout your stay in Aberdeen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/src/assets/images/dining_fine_restaurant_1791541256253.jpg"
                  alt="The Sanctuary Dining Salon"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">The Sanctuary Dining Salon</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Breakfast served daily 07:00 – 10:30. Seasonal Scottish à la carte dinner 18:00 – 22:00. Velvet cocktail salon open until midnight for resident guests.
                </p>
              </div>
            </div>

            <div className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/src/assets/images/amenity_wifi_business_1791542004985.jpg"
                  alt="High-Speed Fibre Wi-Fi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Wifi className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">High-Speed Fibre Wi-Fi</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Dedicated commercial-grade symmetric fibre connection provided complimentary across every room, suite, and salon with zero passwords or throttles.
                </p>
              </div>
            </div>

            <div className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/src/assets/images/amenity_concierge_desk_1791541956913.jpg"
                  alt="24/7 Concierge & Luggage Care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">24/7 Concierge & Luggage Care</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Private luggage storage, dry cleaning coordination, bespoke Aberdeen walking guides, and private transport bookings handled around the clock.
                </p>
              </div>
            </div>

            <div className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/src/assets/images/amenity_scottish_breakfast_1791541973975.jpg"
                  alt="In-Room Breakfast & Dining"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Coffee className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">In-Room Breakfast & Dining</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Curated morning trays with freshly baked butter croissants, artisan Scottish oats, free-range eggs, and loose-leaf teas delivered directly to your bedside.
                </p>
              </div>
            </div>

            <div className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/src/assets/images/amenity_chauffeur_limousine_1791541987911.jpg"
                  alt="Airport Chauffeur Coordination"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Car className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">Airport Chauffeur Coordination</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Effortless private transfers between Caroline Place and Aberdeen International Airport (ABZ) or Aberdeen Railway Station upon advance reservation.
                </p>
              </div>
            </div>

            <div className="bg-[#1e113a] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/src/assets/images/suite_deluxe_lounge_1791541245047.jpg"
                  alt="Restorative Comfort Amenities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e113a] to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#120a22]/90 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">Restorative Comfort Amenities</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Hypnos orthopaedic mattresses, custom duck down or synthetic pillow choices, Egyptian cotton robes, and tranquil sound insulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA strip */}
      <section className="py-16 bg-[#140c29] border-t border-[#32165c]">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl font-bold text-white">
            Ready to Experience Sanctuary Hotel?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Book online or speak with our reservations team for personalized room recommendations and special arrangements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gold px-8 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              Book Your Stay Online
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-white bg-[#251545] hover:bg-[#32165c] border border-[#32165c] transition-colors cursor-pointer"
            >
              Contact Front Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
