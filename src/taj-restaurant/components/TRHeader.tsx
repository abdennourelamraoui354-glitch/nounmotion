import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BUSINESS, GOLD, DARK_BG } from '../lib/business-data';

export function TRHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('مرحباً، أود حجز طاولة في مطعم تاج')}`;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-500"
      style={{
        height: scrolled ? 64 : 88,
        background: scrolled ? `${DARK_BG}EE` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${GOLD}22` : 'none',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" stroke={GOLD} strokeWidth="1" />
          {/* Crown / Taj motif */}
          <path d="M8 22 L8 17 L11.5 20 L16 12 L20.5 20 L24 17 L24 22 Z" fill={GOLD} opacity="0.85" />
          <rect x="8" y="22" width="16" height="2" rx="1" fill={GOLD} opacity="0.6" />
        </svg>
        <div className="flex flex-col leading-none">
          <span
            className="font-bold tracking-wider"
            style={{ fontFamily: 'Tajawal, sans-serif', color: GOLD, fontSize: 18 }}
          >
            {BUSINESS.nameAr}
          </span>
          <span
            className="tracking-widest uppercase"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: '#FAF7F2', fontSize: 10, letterSpacing: '0.3em', opacity: 0.6 }}
          >
            {BUSINESS.nameEn}
          </span>
        </div>
      </div>

      {/* Nav links – desktop */}
      <nav className="hidden md:flex items-center gap-8">
        {['Menu', 'Story', 'Gallery', 'Reserve'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#FAF7F299', letterSpacing: '0.15em' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = GOLD)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#FAF7F299')}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wider border transition-all duration-300 hover:scale-105"
        style={{
          borderColor: GOLD,
          color: GOLD,
          fontFamily: 'DM Sans, sans-serif',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = GOLD;
          (e.currentTarget as HTMLElement).style.color = DARK_BG;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
          (e.currentTarget as HTMLElement).style.color = GOLD;
        }}
      >
        احجز الآن
      </a>
    </motion.header>
  );
}
