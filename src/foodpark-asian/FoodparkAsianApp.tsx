import { FPAHeader } from './components/FPAHeader';
import { CinematicHero } from './components/CinematicHero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MenuBento } from './components/MenuBento';
import { TestimonialsReel } from './components/TestimonialsReel';
import { StickyStory } from './components/StickyStory';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationCTA } from './components/ReservationCTA';
import { LocationMap } from './components/LocationMap';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { FPAFooter } from './components/FPAFooter';
import { CinematicPreloader } from './components/CinematicPreloader';
import { FilmGrain } from './components/FilmGrain';
import { SmoothScroll } from './components/SmoothScroll';
import { DARK_BG, BUSINESS } from './lib/business-data';
import { useEffect, useState } from 'react';

export function FoodparkAsianApp() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    document.title = `${BUSINESS.nameEn} | ${BUSINESS.nameAr} — Muscat`;
  }, []);

  return (
    <SmoothScroll>
      <FilmGrain />
      <CinematicPreloader onComplete={() => setPreloaderDone(true)} />
      <div
        style={{
          background: DARK_BG,
          minHeight: '100vh',
          overflowX: 'clip',
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <FPAHeader />
        <CinematicHero />
        <MarqueeStrip />
        <MenuBento />
        <TestimonialsReel />
        <StickyStory />
        <AtmosphereGallery />
        <ReservationCTA />
        <LocationMap />
        <FPAFooter />
        <WhatsAppFloat />
      </div>
    </SmoothScroll>
  );
}
