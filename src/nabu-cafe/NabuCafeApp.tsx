import { useState, useEffect } from 'react';
import { DARK_BG } from './lib/business-data';
import { SmoothScroll } from './components/SmoothScroll';
import { FilmGrain } from './components/FilmGrain';
import { CinematicPreloader } from './components/CinematicPreloader';
import { NCHeader } from './components/NCHeader';
import { CinematicHero } from './components/CinematicHero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MenuBento } from './components/MenuBento';
import { TestimonialsReel } from './components/TestimonialsReel';
import { StickyStory } from './components/StickyStory';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationCTA } from './components/ReservationCTA';
import { LocationMap } from './components/LocationMap';
import { NCFooter } from './components/NCFooter';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export function NabuCafeApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Nabu Cafe | مقهى نابو — Muscat, Oman';
  }, []);

  return (
    <>
      {!loaded && <CinematicPreloader onComplete={() => setLoaded(true)} />}
      <FilmGrain />
      <SmoothScroll>
        <div style={{ background: DARK_BG, minHeight: '100vh', overflowX: 'clip', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
          <NCHeader />
          <CinematicHero />
          <MarqueeStrip />
          <MenuBento />
          <TestimonialsReel />
          <StickyStory />
          <AtmosphereGallery />
          <ReservationCTA />
          <LocationMap />
          <NCFooter />
          <WhatsAppFloat />
        </div>
      </SmoothScroll>
    </>
  );
}
