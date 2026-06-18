import { useState, useEffect } from 'react';
import { AABPreloader } from './components/premium/AABPreloader';
import { FilmGrain } from './components/premium/FilmGrain';
import { SmoothScroll } from './components/premium/SmoothScroll';
import { TestimonialsReel } from './components/premium/TestimonialsReel';
import { TAHHeader } from './components/TAHHeader';
import { CinematicHero } from './components/CinematicHero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { MenuBento } from './components/MenuBento';
import { StickyStory } from './components/StickyStory';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationCTA } from './components/ReservationCTA';
import { LocationMap } from './components/LocationMap';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { TAHFooter } from './components/TAHFooter';
import { BUSINESS, DARK_BG } from './lib/business-data';

export function AroosBaharApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = `${BUSINESS.nameEn} | ${BUSINESS.nameAr} — ${BUSINESS.city}`;
    // OG meta
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', `${BUSINESS.nameEn} | ${BUSINESS.nameAr}`);
    document.head.appendChild(ogTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.setAttribute('content', BUSINESS.descEn);
    document.head.appendChild(ogDesc);
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', BUSINESS.descEn);
    document.head.appendChild(metaDesc);
  }, []);

  return (
    <div style={{ background: DARK_BG, minHeight: '100vh', overflowX: 'clip' }}>
      <FilmGrain />
      <WhatsAppFloat />
      {!loaded && <AABPreloader onComplete={() => setLoaded(true)} />}
      <SmoothScroll>
        <TAHHeader />
        <CinematicHero />
        <MarqueeStrip />
        <MenuBento />
        <TestimonialsReel />
        <StickyStory />
        <AtmosphereGallery />
        <ReservationCTA />
        <LocationMap />
        <TAHFooter />
      </SmoothScroll>
    </div>
  );
}
