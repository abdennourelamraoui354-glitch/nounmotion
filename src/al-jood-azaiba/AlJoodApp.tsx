import { useState, useEffect } from 'react';
import { DARK_BG } from './lib/business-data';
import { SmoothScroll } from './components/SmoothScroll';
import { FilmGrain } from './components/FilmGrain';
import { CinematicPreloader } from './components/CinematicPreloader';
import { AJHeader } from './components/AJHeader';
import { CinematicHero } from './components/CinematicHero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MenuBento } from './components/MenuBento';
import { TestimonialsReel } from './components/TestimonialsReel';
import { StickyStory } from './components/StickyStory';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationCTA } from './components/ReservationCTA';
import { LocationMap } from './components/LocationMap';
import { AJFooter } from './components/AJFooter';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export function AlJoodApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Al Jood Lebanese Restaurant | مطعم الجود اللبناني — Muscat';
  }, []);

  return (
    <>
      {!loaded && <CinematicPreloader onComplete={() => setLoaded(true)} />}
      <FilmGrain />
      <SmoothScroll>
        <div style={{ background: DARK_BG, minHeight: '100vh', overflowX: 'clip', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
          <AJHeader />
          <CinematicHero />
          <MarqueeStrip />
          <MenuBento />
          <TestimonialsReel />
          <StickyStory />
          <AtmosphereGallery />
          <ReservationCTA />
          <LocationMap />
          <AJFooter />
          <WhatsAppFloat />
        </div>
      </SmoothScroll>
    </>
  );
}
