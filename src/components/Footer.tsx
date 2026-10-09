import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, MapPin, Mail, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#120a22] text-gray-300 border-t border-[#32165c]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
              Sanctuary Hotel
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              A five-star boutique haven of calm, comfort, and Scottish hospitality nestled on Caroline Place in Aberdeen. Designed for timeless serenity.
            </p>
            <div className="pt-2 text-xs text-[#d4af37] flex items-center gap-1.5 font-medium">
              <span>Aberdeen, Scotland</span>
              <span aria-hidden="true">·</span>
              <span>United Kingdom</span>
            </div>
          </div>

          {/* Column 2: Navigation (4 Separate Pages) */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Rooms & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Contact & Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="flex items-start gap-2.5 hover:text-[#d4af37] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="tabular-nums font-medium text-gray-200 group-hover:text-[#d4af37]">
                  {HOTEL_INFO.phone}
                </span>
              </a>

              <a
                href={HOTEL_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#d4af37] transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-300 group-hover:text-white">
                  {HOTEL_INFO.address}
                </span>
              </a>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="text-gray-300">{HOTEL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Details & Quick Reservation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Guest Services
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Check-in: 15:00 · Check-out: 11:00</span>
              </div>
              <p className="text-gray-400">
                24-Hour Concierge & Luggage Assistance. Valet and airport transfers available upon inquiry.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="btn-gold w-full py-2.5 rounded-lg text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow cursor-pointer mt-3"
            >
              <span>Reserve Your Room</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#32165c]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Sanctuary Hotel Aberdeen. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span>Caroline Pl, Aberdeen AB25 2TH</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#d4af37]">United Kingdom</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
