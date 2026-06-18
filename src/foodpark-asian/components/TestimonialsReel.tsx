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
    <section className="py-24 lg:py-32 px-6 lg:px-16" style={{ background: DARK_BG }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase font-medium mb-3" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
            What Our Guests Say
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, serif' }}>
            Real Visits,{' '}
            <span style={{ color: GOLD }}>Real Flavors</span>
          </h2>
        </div>

        <div className="relative" style={{ minHeight: '240px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-8 lg:p-12"
              style={{
                background: `${CREAM}06`,
                border: `1px solid ${GOLD}20`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5 justify-center">
                {Array.from({ length: items[active].stars }).map((_, i) => (
                  <span key={i} style={{ color: GOLD, fontSize: 18 }}>★</span>
                ))}
              </div>

              <blockquote
                className="text-xl lg:text-2xl font-light leading-relaxed mb-6 text-center italic"
                style={{ color: CREAM, fontFamily: 'Cormorant Garamond, serif' }}
              >
                "{items[active].text}"
              </blockquote>

              <p
                className="text-sm text-center font-semibold tracking-widest uppercase"
                style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.2em' }}
              >
                — {items[active].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex gap-3 mt-8 justify-center">
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
  )
}
