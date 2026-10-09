import React, { useState } from 'react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Calendar,
  Users,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Navigation,
  Car,
  Plane,
  Train
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  // General Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Reservation Inquiry Form State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [resRoomId, setResRoomId] = useState(ROOMS_DATA[0].id);
  const [resCheckIn, setResCheckIn] = useState(formatDate(tomorrow));
  const [resCheckOut, setResCheckOut] = useState(formatDate(dayAfter));
  const [resGuests, setResGuests] = useState(2);
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resNotes, setResNotes] = useState('');
  const [resLoading, setResLoading] = useState(false);
  const [resConfirmed, setResConfirmed] = useState<{
    reference: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    total: number;
  } | null>(null);

  const [copiedPhone, setCopiedPhone] = useState(false);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === resRoomId) || ROOMS_DATA[0];
  const dIn = new Date(resCheckIn);
  const dOut = new Date(resCheckOut);
  const diffTime = Math.max(1, dOut.getTime() - dIn.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalCost = selectedRoom.pricePerNight * nights;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
      setTimeout(() => setContactSubmitted(false), 5000);
    }, 500);
  };

  const handleResSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResLoading(true);
    setTimeout(() => {
      const refCode = `SANCT-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingData = {
        reference: refCode,
        roomName: selectedRoom.name,
        checkIn: resCheckIn,
        checkOut: resCheckOut,
        nights,
        total: totalCost,
      };

      try {
        const stored = JSON.parse(localStorage.getItem('sanctuary_bookings') || '[]');
        localStorage.setItem('sanctuary_bookings', JSON.stringify([bookingData, ...stored]));
      } catch {
        // ignore
      }

      setResConfirmed(bookingData);
      setResLoading(false);
    }, 600);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(HOTEL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <section className="relative py-28 bg-[#160d2b] border-b border-[#32165c]/60 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/src/assets/images/hero_sanctuary_hotel_1791541219361.jpg"
            alt="Sanctuary Hotel Aberdeen Caroline Place"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#140c29]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#d4af37] mb-4">
            <span>Caroline Place, Aberdeen</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Front Desk & Reservations</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6 text-balance">
            Contact & Reservations
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Connect with our team to arrange your visit to Aberdeen. Whether reserving a signature suite or making a special inquiry, we are at your service.
          </p>
        </div>
      </section>

      {/* Main Contact & Quick Reach Strip */}
      <section className="py-12 bg-[#180e30] border-b border-[#32165c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card with Click-to-Call */}
            <div className="bg-[#1b1035] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl p-6 transition-all shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-[#251545] text-[#d4af37]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                    Direct Telephone
                  </span>
                  <a
                    href={`tel:${HOTEL_INFO.phoneClean}`}
                    className="font-serif text-xl sm:text-2xl font-bold text-white hover:text-[#d4af37] transition-colors tabular-nums block mt-1"
                  >
                    {HOTEL_INFO.phone}
                  </a>
                </div>
                <p className="text-xs text-gray-400">
                  Click to call directly from your device. Open 24 hours daily.
                </p>
              </div>

              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="btn-gold mt-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-center block"
              >
                Call Front Desk Now
              </a>
            </div>

            {/* Address Card */}
            <div className="bg-[#1b1035] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl p-6 transition-all shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-[#251545] text-[#d4af37] w-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                    Hotel Location
                  </span>
                  <p className="font-serif text-lg font-bold text-white mt-1">
                    {HOTEL_INFO.address}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Caroline Pl, Aberdeen AB25 2TH, Scotland, United Kingdom.
                </p>
              </div>

              <a
                href={HOTEL_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-center block text-white bg-[#251545] hover:bg-[#32165c] border border-[#32165c] transition-colors mt-4"
              >
                Get Directions →
              </a>
            </div>

            {/* Hours & Hospitality Card */}
            <div className="bg-[#1b1035] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl p-6 transition-all shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-[#251545] text-[#d4af37] w-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">
                    Arrival & Reception
                  </span>
                  <div className="text-sm font-semibold text-white mt-1 space-y-1">
                    <div>Check-in from 15:00</div>
                    <div>Check-out until 11:00</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Early check-in and late departures coordinated upon request.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#d4af37] mt-4 font-medium">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">{HOTEL_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section: 2 Columns (Reservation Inquiry & General Contact) */}
      <section className="py-20 bg-[#140c29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form 1: Reservation Inquiry Form */}
            <div className="bg-[#1b1035] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                  Instant Availability Check
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Reservation Inquiry
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Select your dates and preferred room to lock in your reservation rate.
                </p>
              </div>

              {resConfirmed ? (
                <div className="p-6 bg-[#251545] border border-[#d4af37]/50 rounded-xl space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-[#d4af37] shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">Inquiry Received</h3>
                      <span className="text-xs text-emerald-400 font-medium">Hold Requested</span>
                    </div>
                  </div>

                  <div className="bg-[#120a22] p-4 rounded-lg space-y-2 text-xs border border-[#32165c]">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reference:</span>
                      <span className="font-mono text-[#d4af37] font-bold">{resConfirmed.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Suite:</span>
                      <span className="text-white font-medium">{resConfirmed.roomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dates:</span>
                      <span className="text-white">{resConfirmed.checkIn} to {resConfirmed.checkOut}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#32165c] pt-2">
                      <span className="text-gray-300">Total ({resConfirmed.nights} Nights):</span>
                      <span className="font-serif text-base font-bold text-[#d4af37]">£{resConfirmed.total}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300">
                    Our concierge desk at Caroline Place has registered your request. You will receive an official confirmation call or message shortly.
                  </p>

                  <button
                    onClick={() => setResConfirmed(null)}
                    className="btn-gold w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-center"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Select Suite / Room *
                    </label>
                    <select
                      value={resRoomId}
                      onChange={(e) => setResRoomId(e.target.value)}
                      className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      {ROOMS_DATA.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} — £{room.pricePerNight} / night ({room.size})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Check-in Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={resCheckIn}
                          onChange={(e) => setResCheckIn(e.target.value)}
                          className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37] absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Check-out Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={resCheckOut}
                          onChange={(e) => setResCheckOut(e.target.value)}
                          className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37] absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Number of Guests *
                      </label>
                      <div className="relative">
                        <select
                          value={resGuests}
                          onChange={(e) => setResGuests(Number(e.target.value))}
                          className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        >
                          <option value={1}>1 Guest</option>
                          <option value={2}>2 Guests</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4 Guests</option>
                        </select>
                        <Users className="w-3.5 h-3.5 text-[#d4af37] absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Lead Guest Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Macpherson"
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@macpherson.co.uk"
                        value={resEmail}
                        onChange={(e) => setResEmail(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7530 000000"
                        value={resPhone}
                        onChange={(e) => setResPhone(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Arrival Details / Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Flight arrival, quiet floor"
                        value={resNotes}
                        onChange={(e) => setResNotes(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="bg-[#120a22] p-3.5 rounded-lg border border-[#32165c] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400">{nights} {nights === 1 ? 'Night' : 'Nights'} stay</span>
                      <p className="text-white font-medium">Includes Scottish hospitality VAT</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Total Rate</span>
                      <span className="font-serif text-xl font-bold text-[#d4af37] tabular-nums">
                        £{totalCost}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resLoading}
                    className="btn-gold w-full py-3 rounded-lg text-xs font-semibold tracking-wider uppercase cursor-pointer"
                  >
                    {resLoading ? 'Processing Request...' : 'Send Reservation Inquiry'}
                  </button>
                </form>
              )}
            </div>

            {/* Form 2: General Contact Form */}
            <div className="bg-[#1b1035] border border-[#32165c] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                  Concierge Inquiries
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Contact Our Desk
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Inquire about event hire, chauffeur booking, local touring, or bespoke requests.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 bg-[#251545] border border-[#d4af37]/40 rounded-xl space-y-2 text-center animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-[#d4af37] mx-auto" />
                  <h3 className="font-serif text-lg text-white font-bold">Message Sent</h3>
                  <p className="text-xs text-gray-300">
                    Thank you. We have received your inquiry and our Caroline Place reception team will contact you promptly.
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
                      placeholder="e.g. Lady Catherine Boyd"
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
                        placeholder="catherine@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7530 000000"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How can our concierge team assist your journey to Aberdeen?..."
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
                    <span>{contactLoading ? 'Sending...' : 'Send Concierge Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-[#180e30] border-t border-[#32165c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Interactive Map & Navigation
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Location in Aberdeen
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Sanctuary Hotel is situated at Caroline Pl, Aberdeen AB25 2TH, United Kingdom — offering convenient access to city highlights while preserving quiet residential tranquility.
            </p>
          </div>

          {/* Map Frame */}
          <div className="rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl relative bg-[#120a22]">
            <iframe
              title="Sanctuary Hotel Aberdeen Location"
              src={HOTEL_INFO.googleMapsEmbed}
              width="100%"
              height="450"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] sm:h-[480px]"
            />

            {/* Custom Overlay Card */}
            <div className="absolute top-4 left-4 max-w-xs bg-[#1b1035]/95 backdrop-blur-md p-4 rounded-xl border border-[#d4af37]/50 shadow-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <MapPin className="w-4 h-4 shrink-0" />
                <strong className="text-white text-sm font-serif">Sanctuary Hotel</strong>
              </div>
              <p className="text-gray-300 leading-snug">
                {HOTEL_INFO.address}
              </p>
              <div className="pt-2 border-t border-[#32165c] flex items-center justify-between">
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="text-[#d4af37] font-semibold hover:underline"
                >
                  {HOTEL_INFO.phone}
                </a>
                <a
                  href={HOTEL_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-[#32165c] px-2.5 py-1 rounded text-[11px] hover:bg-[#431d7c] transition-colors"
                >
                  Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Transit & Arrival Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="bg-[#1b1035] p-5 rounded-xl border border-[#32165c] space-y-2">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Plane className="w-4 h-4" />
                <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Aberdeen Airport (ABZ)
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Approx. 15-20 minutes by taxi or private executive chauffeur transfer arranged directly via hotel concierge.
              </p>
            </div>

            <div className="bg-[#1b1035] p-5 rounded-xl border border-[#32165c] space-y-2">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Train className="w-4 h-4" />
                <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Aberdeen Train Station
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Direct connections to Edinburgh, Glasgow, and London Kings Cross. Just 7 minutes drive to Caroline Place.
              </p>
            </div>

            <div className="bg-[#1b1035] p-5 rounded-xl border border-[#32165c] space-y-2">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Car className="w-4 h-4" />
                <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Parking & Valet
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                On-site guest parking and street parking coordination provided on Caroline Place upon arrival.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
