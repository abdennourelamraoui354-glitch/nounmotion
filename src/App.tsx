import { LangProvider } from './contexts/LangContext'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { MarqueeSection } from './components/MarqueeSection'
import { AboutSection } from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection'
import { MarketsSection } from './components/MarketsSection'
import { PortfolioShowcase } from './components/PortfolioShowcase'
import { ProcessSection } from './components/ProcessSection'
import { PricingSection } from './components/PricingSection'
import { FAQSection } from './components/FAQSection'
import { FinalCTASection } from './components/FinalCTASection'
import { Footer } from './components/Footer'
import { PremiumDemoApp } from './premium-demo/PremiumDemoApp'
import { TawaheenApp } from './tawaheen-alhawa/TawaheenApp'
import { TurkishHouseApp } from './turkish-house/TurkishHouseApp'
import { TajRestaurantApp } from './taj-restaurant/TajRestaurantApp'

const PREVIEW = new URLSearchParams(window.location.search).get('preview');

function isTawaheenHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'tawaheen.nounmotion.store' ||
    h === 'tah.nounmotion.store' ||
    h.includes('nounmotion-tawaheen.') ||
    h.startsWith('nounmotion-tawaheen')
  );
}

function isTurkishHouseHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'turkishhouse.nounmotion.store' ||
    h.includes('nounmotion-turkishhouse.') ||
    h.startsWith('nounmotion-turkishhouse')
  );
}

function isTajRestaurantHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'taj.nounmotion.store' ||
    h.includes('nounmotion-taj.') ||
    h.startsWith('nounmotion-taj')
  );
}

function App() {
  if (PREVIEW === 'premium-demo') return <PremiumDemoApp />;
  if (PREVIEW === 'tawaheen-alhawa' || isTawaheenHost()) return <TawaheenApp />;
  if (PREVIEW === 'turkish-house' || isTurkishHouseHost()) return <TurkishHouseApp />;
  if (PREVIEW === 'taj-restaurant' || isTajRestaurantHost()) return <TajRestaurantApp />;

  return (
    <LangProvider>
    <div style={{ background: '#0C0C0C', minHeight: '100vh', overflowX: 'clip' }}>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <PortfolioShowcase />
      <AboutSection />
      <ServicesSection />
      <MarketsSection />
      <ProcessSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
    </LangProvider>
  )
}

export default App
