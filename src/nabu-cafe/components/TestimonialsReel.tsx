import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS, GOLD, DARK_BG, CREAM } from '../lib/business-data'

export function TestimonialsReel() {
  const [active, setActive] = useState(0)
  const items = BUSINESS.testimonials

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % items.length), 4500)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16" style={{ background: '#0D0B0A' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
            Guest Reviews · آراء ضيوفنا
          </p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              color: CREAM,
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            What Our Guests Say
          </h2>
          <p className="mt-2 text-base" style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}AA`, direction: 'rtl' }}>
            ما يقوله ضيوفنا
          </p>
        </div>

        <div className="relative" style={{ minHeight: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 lg:p-12"
              style={{
                background: 'rgba(201,169,110,0.04)',
                border: `1px solid ${GOLD}22`,
                boxShadow: `0 8px 60px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: items[active].rating }).map((_, i) => (
                  <span key={i} className="text-xl" style={{ color: GOLD }}>★</span>
                ))}
              </div>

              <blockquote
                className="text-xl lg:text-2xl font-light leading-relaxed mb-4"
                style={{ color: CREAM, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
              >
                "{items[active].textEn}"
              </blockquote>

              <p
                className="text-base text-right leading-relaxed mb-6"
                style={{ color: `${GOLD}90`, fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }}
              >
                "{items[active].textAr}"
              </p>

              <div className="flex items-center justify-between border-t pt-5" style={{ borderColor: `${GOLD}18` }}>
                <div>
                  <p className="font-semibold text-sm" style={{ color: CREAM, fontFamily: 'DM Sans, sans-serif' }}>
                    {items[active].nameEn}
                  </p>
                  <p className="text-xs mt-1" style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}80`, direction: 'rtl' }}>
                    {items[active].nameAr}
                  </p>
                </div>
                <div
                  className="text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                  style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}28`, fontFamily: 'DM Sans, sans-serif' }}
                >
                  {items[active].service}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-3 mt-6 justify-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? '32px' : '8px',
                height: '8px',
                background: i === active ? GOLD : `${DARK_BG}`,
                border: `1px solid ${GOLD}50`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
