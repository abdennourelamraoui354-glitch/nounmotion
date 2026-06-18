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
import { DARK_BG } from './lib/business-data';
import { useEffect } from 'react';

export function TawaheenApp() {
  useEffect(() => {
    document.title = 'Tawaheen Al Hawa | طواحين الهوا — Amman';
  }, []);
  return (
    <div style={{ background: DARK_BG, minHeight: '100vh', overflowX: 'clip' }}>
      <TAHHeader />
      <CinematicHero />
      <MarqueeStrip />
      <MenuBento />
      <StickyStory />
      <AtmosphereGallery />
      <ReservationCTA />
      <LocationMap />
      <TAHFooter />
      <WhatsAppFloat />
    </div>
  );
}
