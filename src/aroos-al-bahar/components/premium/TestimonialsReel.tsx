import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS, GOLD, DARK_BG, CREAM } from '../../lib/business-data'

export function TestimonialsReel() {
  const [active, setActive] = useState(0)
  const items = BUSINESS.testimonials

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % items.length), 4500)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16" style={{ background: DARK_BG }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: GOLD }}>
            ما يقوله زبائننا
          </p>
          <h2
            className="text-3xl lg:text-5xl font-black uppercase tracking-tight"
            style={{ color: CREAM, fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
          >
            Real Reviews,<br />
            <span style={{ color: GOLD }}>Real Flavours</span>
          </h2>
        </div>

        <div className="relative" style={{ minHeight: '280px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 lg:p-12"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${GOLD}20`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: items[active].rating }).map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: GOLD }}>★</span>
                ))}
              </div>

              <blockquote
                className="text-xl lg:text-2xl font-light leading-relaxed mb-4"
                style={{ color: CREAM, fontFamily: 'Cormorant Garamond, serif' }}
              >
                "{items[active].textEn}"
              </blockquote>

              <p
                className="text-base text-right font-light leading-relaxed mb-6"
                style={{ color: `${GOLD}90`, fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }}
              >
                "{items[active].textAr}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm" style={{ color: CREAM }}>{items[active].nameEn}</p>
                  <p className="text-[11px] tracking-wider uppercase mt-0.5" style={{ color: `${CREAM}50` }}>
                    Google Review
                  </p>
                </div>
                <div
                  className="text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                  style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}25` }}
                >
                  {items[active].service}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3 mt-6 justify-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? '32px' : '8px',
                height: '8px',
                background: i === active ? GOLD : `${GOLD}30`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
