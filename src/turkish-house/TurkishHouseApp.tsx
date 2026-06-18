import { useState, useEffect } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { FilmGrain } from './components/FilmGrain';
import { CinematicPreloader } from './components/CinematicPreloader';
import { THHeader } from './components/THHeader';
import { CinematicHero } from './components/CinematicHero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MenuBento } from './components/MenuBento';
import { TestimonialsReel } from './components/TestimonialsReel';
import { StickyStory } from './components/StickyStory';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationCTA } from './components/ReservationCTA';
import { LocationMap } from './components/LocationMap';
import { THFooter } from './components/THFooter';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { DARK_BG } from './lib/business-data';

export function TurkishHouseApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Turkish House Restaurant | مطعم البيت التركي — Muscat';
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
          <THHeader />
          <CinematicHero />
          <MarqueeStrip />
          <MenuBento />
          <TestimonialsReel />
          <StickyStory />
          <AtmosphereGallery />
          <ReservationCTA />
          <LocationMap />
          <THFooter />
          <WhatsAppFloat />
        </div>
      </SmoothScroll>
    </>
  );
}
