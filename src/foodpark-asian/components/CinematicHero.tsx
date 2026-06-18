import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { BUSINESS, GOLD, DARK_BG, CREAM } from '../lib/business-data';
import { FloatingDishOrbit } from './FloatingDishOrbit';

const SLIDE_DURATION = 6000;

export function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const [, setPrev] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-1, 1], ['-2%', '2%']);
  const bgY = useTransform(mouseY, [-1, 1], ['-2%', '2%']);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const advance = (idx: number) => {
    const next = (idx + 1) % BUSINESS.heroSlides.length;
    setPrev(idx);
    setCurrent(next);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => advance(current), SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const slide = BUSINESS.heroSlides[current];
  const words = slide.headlineEn.split(' ');
  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('أود حجز طاولة في فودبارك')}`;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden lg:h-[100dvh] lg:min-h-[640px]"
      style={{ minHeight: '100dvh', background: DARK_BG }}
      onMouseMove={onMouseMove}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (!t) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((t.clientX - rect.left) / rect.width * 2 - 1);
        mouseY.set((t.clientY - rect.top) / rect.height * 2 - 1);
      }}
    >
      {/* ── Ken Burns BG carousel ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              x: bgX,
              y: bgY,
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,9,8,0.82) 0%, rgba(10,9,8,0.55) 60%, rgba(10,9,8,0.75) 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gold progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-30" style={{ background: `${DARK_BG}80` }}>
        <motion.div
          key={`bar-${current}`}
          className="h-full"
          style={{ background: GOLD }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 lg:h-full flex items-center py-24 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center pt-16 lg:pt-20">

          {/* Copy + mobile orbit */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full">
            {/* Slide indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-10" style={{ background: GOLD }} />
              <span
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}
              >
                Since {BUSINESS.established} · {BUSINESS.cuisine}
              </span>
            </motion.div>

            {/* Arabic subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`ar-${current}`}
                className="text-lg md:text-xl"
                style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}CC`, direction: 'rtl', textAlign: 'right' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {slide.headlineAr}
              </motion.p>
            </AnimatePresence>

            {/* EN Headline — word stagger */}
            <h1 className="leading-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <AnimatePresence mode="wait">
                <motion.span key={`h-${current}`} className="flex flex-wrap gap-x-4">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="block"
                      style={{
                        color: CREAM,
                        fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        lineHeight: 0.95,
                      }}
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                className="text-base md:text-lg max-w-md"
                style={{ color: `${CREAM}99`, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.6 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {slide.subEn}
              </motion.p>
            </AnimatePresence>

            {/* Orbit — mobile & tablet (cinematic) */}
            <motion.div
              className="flex lg:hidden items-center justify-center py-2"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <FloatingDishOrbit mouseX={mouseX} mouseY={mouseY} />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase"
                style={{ background: GOLD, color: DARK_BG, fontFamily: 'DM Sans, sans-serif' }}
              >
                {/* Shimmer */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
                احجز طاولة · Reserve
              </a>

              <a
                href="#menu"
                className="px-8 py-4 rounded-full text-sm tracking-widest uppercase border transition-colors duration-300 hover:border-current"
                style={{ borderColor: `${CREAM}40`, color: CREAM, fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = GOLD)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${CREAM}40`)}
              >
                View Menu
              </a>
            </motion.div>

            {/* Slide dots */}
            <div className="flex gap-2 mt-2">
              {BUSINESS.heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPrev(current); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    background: i === current ? GOLD : `${CREAM}40`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Orbit — desktop */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <FloatingDishOrbit mouseX={mouseX} mouseY={mouseY} />
          </motion.div>
        </div>
      </div>

      {/* Glass reservation card bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-6 px-8 py-4 rounded-2xl"
        style={{
          background: 'rgba(10,9,8,0.6)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${GOLD}30`,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {[
          { label: 'Rating', value: `${BUSINESS.rating}★` },
          { label: 'Reviews', value: `${BUSINESS.reviews}+` },
          { label: 'Since', value: String(BUSINESS.established) },
          { label: 'Cuisine', value: 'Levantine' },
        ].map(({ label, value }, i) => (
          <div key={i} className="flex flex-col items-center px-4 border-r last:border-0" style={{ borderColor: `${GOLD}20` }}>
            <span style={{ color: GOLD, fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600 }}>{value}</span>
            <span style={{ color: `${CREAM}60`, fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 md:hidden"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
