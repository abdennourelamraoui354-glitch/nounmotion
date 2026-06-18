import { useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { FilmGrain } from './components/FilmGrain'
import { CinematicPreloader } from './components/CinematicPreloader'
import { HeroReel } from './components/HeroReel'
import { MarqueeStrip } from './components/MarqueeStrip'
import { ServicesBento } from './components/ServicesBento'
import { StoryPinned } from './components/StoryPinned'
import { GalleryHorizontal } from './components/GalleryHorizontal'
import { TestimonialsReel } from './components/TestimonialsReel'
import { PricingSection } from './components/PricingSection'
import { LocationMap } from './components/LocationMap'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { BUSINESS, TEAL, DARK, BG } from './lib/business-data'

function DemoFooter() {
  return (
    <footer className="py-12 px-8 lg:px-16 text-center" style={{ background: DARK, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <p className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-1" style={{ color: TEAL }}>
        {BUSINESS.nameEn}
      </p>
      <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {BUSINESS.address} · {BUSINESS.phone}
      </p>
      <p className="text-[10px] mt-4" style={{ color: 'rgba(255,255,255,0.1)' }}>
        Website by <span style={{ color: TEAL }}>Nounmotion</span> · contact@nounmotion.store
      </p>
    </footer>
  )
}

export function PremiumDemoApp() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ background: BG, minHeight: '100vh', overflowX: 'clip' }}>
      {/* Always-on overlays */}
      <FilmGrain />
      <WhatsAppFloat />

      {/* Preloader — shows first, then fades out */}
      {!loaded && <CinematicPreloader onComplete={() => setLoaded(true)} />}

      {/* Main site (renders behind preloader, becomes visible on complete) */}
      <SmoothScroll>
        <HeroReel />
        <MarqueeStrip />
        <ServicesBento />
        <StoryPinned />
        <GalleryHorizontal />
        <TestimonialsReel />
        <PricingSection />
        <LocationMap />
        <DemoFooter />
      </SmoothScroll>
    </div>
  )
}
