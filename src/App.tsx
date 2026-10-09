import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RoomsPage } from './pages/RoomsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Parse initial route from path or default to home
  const getPageFromPath = (path: string): string => {
    const clean = path.replace(/\/$/, '');
    if (clean === '/about') return 'about';
    if (clean === '/rooms') return 'rooms';
    if (clean === '/contact') return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(() =>
    getPageFromPath(window.location.pathname)
  );

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedRoomId, setPreselectedRoomId] = useState<string | undefined>(undefined);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and state on navigation
  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    let targetPath = '/';
    if (pageId === 'about') targetPath = '/about';
    else if (pageId === 'rooms') targetPath = '/rooms';
    else if (pageId === 'contact') targetPath = '/contact';

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (roomId?: string) => {
    setPreselectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedRoomId(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#140c29] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-[#1b1035]">
      {/* Primary Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedRoomId={preselectedRoomId}
      />
    </div>
  );
}
