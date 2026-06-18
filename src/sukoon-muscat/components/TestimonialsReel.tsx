import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS, GOLD, CREAM } from '../lib/business-data';

export function TestimonialsReel() {
  const [active, setActive] = useState(0);
  const items = BUSINESS.testimonials;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section
      id="reviews"
      className="py-24 lg:py-32 px-6 lg:px-16"
      style={{ background: '#0D0C0B' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p
            className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3"
            style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}
          >
            Guest Stories
          </p>
          <h2
            className="text-3xl lg:text-5xl font-light"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: CREAM,
              letterSpacing: '-0.02em',
            }}
          >
            What They Say{' '}
            <span style={{ color: GOLD, fontStyle: 'italic' }}>About Sukoon</span>
          </h2>
        </div>

        <div className="relative" style={{ minHeight: '280px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 lg:p-12"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${GOLD}20`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: items[active].rating }).map((_, i) => (
                  <span key={i} style={{ color: GOLD, fontSize: 18 }}>★</span>
                ))}
              </div>

              <blockquote
                className="text-xl lg:text-2xl font-light leading-relaxed mb-5"
                style={{ color: CREAM, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
              >
                "{items[active].textEn}"
              </blockquote>

              <p
                className="text-base leading-relaxed mb-6 text-right"
                style={{ color: `${GOLD}80`, fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }}
              >
                "{items[active].textAr}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm" style={{ color: CREAM, fontFamily: 'DM Sans, sans-serif' }}>
                    {items[active].nameEn}
                  </p>
                  <p
                    className="text-[11px] tracking-widest uppercase mt-0.5"
                    style={{ color: `${CREAM}40`, fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Google Maps Review
                  </p>
                </div>
                <div
                  className="text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: `${GOLD}10`,
                    color: GOLD,
                    border: `1px solid ${GOLD}25`,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {items[active].tag}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex gap-3 mt-6 justify-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? 32 : 8,
                height: 8,
                background: i === active ? GOLD : `${GOLD}30`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
