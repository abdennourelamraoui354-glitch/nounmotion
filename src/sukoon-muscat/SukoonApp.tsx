import { useState, useEffect } from 'react';
import { SKNHeader } from './components/SKNHeader';
import { CinematicHero } from './components/CinematicHero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MenuBento } from './components/MenuBento';
import { StickyStory } from './components/StickyStory';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationCTA } from './components/ReservationCTA';
import { LocationMap } from './components/LocationMap';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { SKNFooter } from './components/SKNFooter';
import { TestimonialsReel } from './components/TestimonialsReel';
import { CinematicPreloader } from './components/CinematicPreloader';
import { FilmGrain } from './components/FilmGrain';
import { SmoothScroll } from './components/SmoothScroll';
import { DARK_BG, BUSINESS } from './lib/business-data';

export function SukoonApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = `${BUSINESS.nameEn} | ${BUSINESS.nameAr} — Muscat`;
  }, []);

  return (
    <>
      {!loaded && <CinematicPreloader onComplete={() => setLoaded(true)} />}
      <FilmGrain />
      <SmoothScroll>
        <div
          style={{
            background: DARK_BG,
            minHeight: '100vh',
            overflowX: 'clip',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <SKNHeader />
          <CinematicHero />
          <MarqueeStrip />
          <MenuBento />
          <TestimonialsReel />
          <StickyStory />
          <AtmosphereGallery />
          <ReservationCTA />
          <LocationMap />
          <SKNFooter />
          <WhatsAppFloat />
        </div>
      </SmoothScroll>
    </>
  );
}
