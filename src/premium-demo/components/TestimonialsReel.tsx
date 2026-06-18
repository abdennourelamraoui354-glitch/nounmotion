import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS, TEAL, BG, DARK, MUTED } from '../lib/business-data'

export function TestimonialsReel() {
  const [active, setActive] = useState(0)
  const items = BUSINESS.testimonials

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % items.length), 4500)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: TEAL }}>
            Patient Stories
          </p>
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight" style={{ color: DARK }}>
            Real Results,<br />
            <span style={{ color: TEAL }}>Real Smiles</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative" style={{ minHeight: '260px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 lg:p-12"
              style={{
                background: '#fff',
                border: `1px solid ${TEAL}12`,
                boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: items[active].rating }).map((_, i) => (
                  <span key={i} className="text-lg" style={{ color: '#F59E0B' }}>★</span>
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-6"
                style={{ color: DARK }}>
                "{items[active].textEn}"
              </blockquote>

              <p className="text-base text-right font-light leading-relaxed mb-6"
                style={{ color: `${TEAL}90`, fontFamily: 'Tajawal, sans-serif' }}>
                "{items[active].textAr}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm" style={{ color: DARK }}>{items[active].nameEn}</p>
                  <p className="text-[11px] tracking-wider uppercase mt-0.5" style={{ color: MUTED }}>
                    {items[active].service}
                  </p>
                </div>
                <div className="text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                  style={{ background: `${TEAL}10`, color: TEAL, border: `1px solid ${TEAL}25` }}>
                  {items[active].service}
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
                width: i === active ? '32px' : '8px',
                height: '8px',
                background: i === active ? TEAL : `${TEAL}30`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
