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
import { AroosBaharApp } from './aroos-al-bahar/AroosBaharApp'
import { MiskRestaurantApp } from './misk-restaurant/MiskRestaurantApp'
import { AlJoodApp } from './al-jood-azaiba/AlJoodApp'
import { NabuCafeApp } from './nabu-cafe/NabuCafeApp'
import { FoodparkAsianApp } from './foodpark-asian/FoodparkAsianApp'
import { SukoonApp } from './sukoon-muscat/SukoonApp'
import { MarhabaRuwiApp } from './marhaba-ruwi/MarhabaRuwiApp'
import { AlMajdDentalApp } from './al-majd-dental/AlMajdDentalApp'

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

function isAroosHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'aroos.nounmotion.store' ||
    h.includes('nounmotion-aroos.') ||
    h.startsWith('nounmotion-aroos')
  );
}

function isMiskHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'misk.nounmotion.store' ||
    h.includes('nounmotion-misk.') ||
    h.startsWith('nounmotion-misk')
  );
}

function isNabuHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'nabu.nounmotion.store' ||
    h.includes('nounmotion-nabu.') ||
    h.startsWith('nounmotion-nabu')
  );
}

function isSukoonHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'sukoon.nounmotion.store' ||
    h.includes('nounmotion-sukoon.') ||
    h.startsWith('nounmotion-sukoon')
  );
}

function isFoodparkHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'foodpark.nounmotion.store' ||
    h.includes('nounmotion-foodpark.') ||
    h.startsWith('nounmotion-foodpark')
  );
}

function isAlJoodHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'aljood.nounmotion.store' ||
    h === 'al-jood.nounmotion.store' ||
    h.includes('nounmotion-aljood.') ||
    h.startsWith('nounmotion-aljood')
  );
}

function isMarhabaHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'marhaba.nounmotion.store' ||
    h.includes('nounmotion-marhaba.') ||
    h.startsWith('nounmotion-marhaba')
  );
}

function isAlMajdDentalHost() {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname.toLowerCase();
  return (
    h === 'almajd.nounmotion.store' ||
    h === 'al-majd.nounmotion.store' ||
    h.includes('nounmotion-almajd.') ||
    h.startsWith('nounmotion-almajd')
  );
}

function App() {
  if (PREVIEW === 'premium-demo') return <PremiumDemoApp />;
  if (PREVIEW === 'tawaheen-alhawa' || isTawaheenHost()) return <TawaheenApp />;
  if (PREVIEW === 'turkish-house' || isTurkishHouseHost()) return <TurkishHouseApp />;
  if (PREVIEW === 'taj-restaurant' || isTajRestaurantHost()) return <TajRestaurantApp />;
  if (PREVIEW === 'aroos-al-bahar' || isAroosHost()) return <AroosBaharApp />;
  if (PREVIEW === 'misk-restaurant' || isMiskHost()) return <MiskRestaurantApp />;
  if (PREVIEW === 'al-jood-azaiba' || isAlJoodHost()) return <AlJoodApp />;
  if (PREVIEW === 'foodpark-asian' || isFoodparkHost()) return <FoodparkAsianApp />;
  if (PREVIEW === 'nabu-cafe' || isNabuHost()) return <NabuCafeApp />;
  if (PREVIEW === 'sukoon-muscat' || isSukoonHost()) return <SukoonApp />;
  if (PREVIEW === 'marhaba-ruwi' || isMarhabaHost()) return <MarhabaRuwiApp />;
  if (PREVIEW === 'al-majd-dental' || isAlMajdDentalHost()) return <AlMajdDentalApp />;

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
