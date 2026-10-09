import React, { useState, useEffect } from 'react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData';
import { X, Calendar, Users, CheckCircle2, Copy, Check, Sparkles, Phone, MapPin } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomId?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomId,
}) => {
  // Dates default: tomorrow and 2 days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  const [roomId, setRoomId] = useState<string>(preselectedRoomId || ROOMS_DATA[0].id);
  const [checkIn, setCheckIn] = useState<string>(formatDateForInput(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDateForInput(dayAfter));
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<{
    reference: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    total: number;
    guestName: string;
  } | null>(null);

  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedRoomId) {
      setRoomId(preselectedRoomId);
    }
  }, [preselectedRoomId]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalCost = selectedRoom.pricePerNight * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const reference = `SANCT-${Math.floor(100000 + Math.random() * 900000)}`;
      const reservation = {
        reference,
        roomName: selectedRoom.name,
        checkIn,
        checkOut,
        nights,
        total: totalCost,
        guestName: guestName || 'Esteemed Guest',
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('sanctuary_bookings') || '[]');
        localStorage.setItem('sanctuary_bookings', JSON.stringify([reservation, ...existing]));
      } catch {
        // quiet ignore
      }

      setConfirmedReservation(reservation);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyRef = () => {
    if (confirmedReservation) {
      navigator.clipboard.writeText(confirmedReservation.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#1b1035] border border-[#d4af37]/40 rounded-xl shadow-2xl overflow-hidden my-8 animate-fadeIn">
        {/* Header bar */}
        <div className="bg-[#241344] px-6 py-4 border-b border-[#32165c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <h2 id="modal-title" className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              {confirmedReservation ? 'Reservation Confirmed' : 'Reserve Your Stay'}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Close reservation modal"
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#32165c] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedReservation ? (
          /* Confirmation Slip */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-[#d4af37]/15 rounded-full text-[#d4af37] mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="font-serif text-2xl text-white font-bold">
                Your Sanctuary Awaits
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Thank you, <span className="text-[#d4af37] font-medium">{confirmedReservation.guestName}</span>. Your reservation inquiry has been registered. Our concierge desk is preparing your reception.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="bg-[#120a22] border border-[#d4af37]/30 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#32165c] pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400">Booking Reference</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-lg font-bold text-[#d4af37]">
                      {confirmedReservation.reference}
                    </span>
                    <button
                      onClick={handleCopyRef}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      title="Copy Reference Code"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-gray-400">Status</span>
                  <div className="text-xs text-emerald-400 font-semibold mt-0.5">Confirmed Hold</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Selected Suite</span>
                  <p className="text-white font-medium text-sm mt-0.5">{confirmedReservation.roomName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Duration</span>
                  <p className="text-white font-medium text-sm mt-0.5">
                    {confirmedReservation.nights} {confirmedReservation.nights === 1 ? 'Night' : 'Nights'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Check-in</span>
                  <p className="text-white font-medium text-sm mt-0.5">{confirmedReservation.checkIn} (from 15:00)</p>
                </div>
                <div>
                  <span className="text-gray-400">Check-out</span>
                  <p className="text-white font-medium text-sm mt-0.5">{confirmedReservation.checkOut} (until 11:00)</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#32165c] flex items-center justify-between">
                <span className="text-xs text-gray-300">Estimated Total (Pay at Hotel)</span>
                <span className="font-serif text-xl font-bold text-[#d4af37] tabular-nums">
                  £{confirmedReservation.total}
                </span>
              </div>
            </div>

            <div className="bg-[#241344] p-4 rounded-lg flex items-start gap-3 text-xs text-gray-300 border border-[#32165c]">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">{HOTEL_INFO.name}</strong>
                <span>{HOTEL_INFO.address}</span>
                <span className="block text-gray-400 mt-1">Concierge Line: {HOTEL_INFO.phone}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="flex-1 py-3 bg-[#32165c] hover:bg-[#431d7c] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>Call Concierge</span>
              </a>
              <button
                onClick={handleResetAndClose}
                className="btn-gold flex-1 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase text-center"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Room selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Select Suite or Room
              </label>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
              >
                {ROOMS_DATA.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} — {room.currency}{room.pricePerNight} / night ({room.size})
                  </option>
                ))}
              </select>
            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Check-in Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37] absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Check-out Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37] absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                  <Users className="w-3.5 h-3.5 text-[#d4af37] absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Guest details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Primary Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alistair Campbell"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
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
                  placeholder="e.g. alistair@example.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +44 7530 000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Special Requests / Arrival Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Late check-in, high floor, airport chauffeur"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#120a22] border border-[#32165c] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Price calculation overview */}
            <div className="bg-[#120a22] rounded-lg p-4 border border-[#32165c] flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400">
                  {nights} {nights === 1 ? 'Night' : 'Nights'} × £{selectedRoom.pricePerNight}
                </span>
                <p className="text-gray-300 font-medium">Includes Scottish VAT & complimentary Wi-Fi</p>
              </div>
              <div className="text-right">
                <span className="text-gray-400 text-[10px] uppercase tracking-wider block">Estimated Total</span>
                <span className="font-serif text-2xl font-bold text-[#d4af37] tabular-nums">
                  £{totalCost}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? 'Confirming Reservation...' : 'Complete Reservation Inquiry'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
