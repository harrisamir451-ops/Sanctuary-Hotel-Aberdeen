import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: (preselectedRoomId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'rooms', label: 'Rooms & Services', path: '/rooms' },
    { id: 'contact', label: 'Contact & Reservations', path: '/contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#160d2b]/95 backdrop-blur-md border-b border-[#32165c]/60 shadow-lg">
      {/* Top Bar Contract: 3 zones, gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer shrink-0 focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white group-hover:text-[#d4af37] transition-colors whitespace-nowrap">
            Sanctuary Hotel
          </span>
        </button>

        {/* Zone 2: 4 nav links, single-line text links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer text-sm ${
                  isActive
                    ? 'text-[#d4af37] font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${HOTEL_INFO.phoneClean}`}
            className="hidden xl:flex items-center gap-2 text-xs text-gray-300 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-lg border border-transparent hover:border-[#32165c]"
            title="Call Sanctuary Hotel"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="tabular-nums font-medium">{HOTEL_INFO.phone}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="btn-gold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-semibold cursor-pointer shadow-md flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Your Stay</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="btn-gold px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1b1035] border-b border-[#32165c] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#32165c] text-[#d4af37] font-semibold'
                      : 'text-gray-200 hover:bg-[#251545] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#32165c]/60 flex flex-col gap-2">
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs text-gray-200 bg-[#251545] rounded-lg border border-[#32165c]"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span className="tabular-nums font-semibold">{HOTEL_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-gold w-full py-2.5 rounded-lg text-xs tracking-wider uppercase font-semibold text-center"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
