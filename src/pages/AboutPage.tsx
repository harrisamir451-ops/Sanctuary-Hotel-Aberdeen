import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { ShieldCheck, Moon, Award, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const brandValues = [
    {
      index: '01',
      title: 'Architectural Dignity & Heritage',
      description:
        'Rooted in the timeless granite stonework of Aberdeen, our Caroline Place address blends classic Scottish nobility with deep royal purple velvet and brushed gold accents.',
      icon: ShieldCheck,
    },
    {
      index: '02',
      title: 'Restorative Quietude & Deep Sleep',
      description:
        'Every suite is acoustically calibrated with soundproof glazing, hypoallergenic Egyptian cotton linens, and customizable pillow menus to ensure unbroken, restorative rest.',
      icon: Moon,
    },
    {
      index: '03',
      title: 'Discreet, Bespoke Concierge Care',
      description:
        'No request is too nuanced. From arranging private Highland single-malt tastings to securing premier seats at His Majesty’s Theatre, our staff crafts bespoke itineraries.',
      icon: Compass,
    },
    {
      index: '04',
      title: 'Genuine Scottish Warmth',
      description:
        'We reject stiff, cold pretension. Our five-star ethos is grounded in authentic human attentiveness, ensuring every traveler feels safe, respected, and thoroughly at home.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="space-y-0">
      {/* Page Header / Hero Banner */}
      <section className="relative py-28 bg-[#160d2b] border-b border-[#32165c]/60 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/src/assets/images/hero_sanctuary_hotel_1791541219361.jpg"
            alt="Sanctuary Hotel Aberdeen Façade"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#140c29]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#d4af37] mb-4">
            <span>Identity & Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Aberdeen, Scotland</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6 text-balance">
            About Sanctuary Hotel
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Conceived as a tranquil haven within Aberdeen’s storied cityscape, Sanctuary Hotel delivers an intimate standard of five-star luxury defined by calm, craftsmanship, and sincere hospitality.
          </p>
        </div>
      </section>

      {/* Identity & Origin Story */}
      <section className="py-24 bg-[#180e30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                Our Story & Location
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                A True Sanctuary in the Silver City
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Aberdeen has long been celebrated worldwide as Scotland’s Silver City with the Golden Sands—famed for its gleaming granite masonry, maritime spirit, and proximity to the majestic Grampian highlands. Sanctuary Hotel on Caroline Place was conceived to serve as a calming refuge from the bustling energy of the modern city.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Here, guests find an atmosphere removed from generic corporate hotels: intimate salon lounges lit by warm amber chandeliers, suites dressed in royal purple velvet, and a team who knows your name and coffee preference from your very first morning.
              </p>

              <div className="p-4 bg-[#120a22] border-l-2 border-[#d4af37] rounded-r-lg space-y-1">
                <p className="font-serif italic text-sm text-gray-200">
                  &ldquo;A hotel should not merely be a place to sleep; it should be a sanctuary where one restores body, mind, and spirit.&rdquo;
                </p>
                <span className="text-[11px] text-[#d4af37] uppercase tracking-wider block font-medium">
                  The Sanctuary Philosophy
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-[#32165c] shadow-lg">
                  <img
                    src="/src/assets/images/suite_executive_bedroom_1791541232614.jpg"
                    alt="Sanctuary Executive Master Suite"
                    className="w-full h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-[#120a22] p-5 rounded-xl border border-[#32165c]">
                  <span className="font-serif text-2xl font-bold text-[#d4af37] block">
                    800 Thread
                  </span>
                  <span className="text-xs text-gray-300 mt-1 block">
                    Pure Egyptian cotton linens selected for deep, hypoallergenic comfort.
                  </span>
                </div>
              </div>

              <div className="space-y-4 sm:pt-8">
                <div className="bg-[#120a22] p-5 rounded-xl border border-[#32165c]">
                  <span className="font-serif text-2xl font-bold text-[#d4af37] block">
                    Caroline Pl
                  </span>
                  <span className="text-xs text-gray-300 mt-1 block">
                    Quiet, prestigious enclave with immediate access to Westburn Park and city center.
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-[#32165c] shadow-lg">
                  <img
                    src="/src/assets/images/suite_deluxe_lounge_1791541245047.jpg"
                    alt="Sanctuary Deluxe Suite Lounge"
                    className="w-full h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values (Editorial List) */}
      <section className="py-24 bg-[#140c29] border-t border-[#32165c]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              Our Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Four Sanctuary Values
            </h2>
            <p className="text-sm text-gray-300">
              Every decision we make, from our acoustic specifications to our breakfast ingredients, is governed by four core commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brandValues.map((val) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.index}
                  className="bg-[#1b1035] border border-[#32165c] hover:border-[#d4af37]/50 rounded-xl p-8 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-3xl font-bold text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors">
                        {val.index}
                      </span>
                      <div className="p-2.5 rounded-lg bg-[#251545] text-[#d4af37]">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white mb-3">
                      {val.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment to Guest Comfort */}
      <section className="py-24 bg-[#180e30] border-t border-[#32165c]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1b1035] border border-[#d4af37]/30 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                Uncompromising Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Our Commitment to Guest Comfort
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                We believe true five-star hospitality is measured in how effortlessly you rest. That is why our rooms feature multi-pane acoustic noise attenuation, whisper-quiet climate control, blackout velvet drapery, and discreet daily housekeeping attuned to your schedule.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
                <div className="space-y-1">
                  <span className="font-semibold text-white block">Acoustic Shielding</span>
                  <span className="text-gray-400">Total serenity shielding street and hallway ambience.</span>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-white block">Hypnos Sleep System</span>
                  <span className="text-gray-400">Handcrafted natural pocket spring mattresses.</span>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-white block">Concierge at Call</span>
                  <span className="text-gray-400">Direct instant line to our dedicated front desk team.</span>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="btn-gold px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase cursor-pointer"
                >
                  Reserve Your Stay
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase text-white bg-[#251545] hover:bg-[#32165c] border border-[#32165c] transition-colors cursor-pointer"
                >
                  Speak With Concierge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
