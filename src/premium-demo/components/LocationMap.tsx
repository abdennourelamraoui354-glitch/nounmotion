import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BUSINESS, TEAL, DARK, BG } from '../lib/business-data'

export function LocationMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello! I\'d like to book an appointment at Celestia Dental.')}`

  return (
    <section id="location" ref={ref} className="py-24 lg:py-32 px-6 lg:px-16" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: TEAL }}>
                Find Us
              </p>
              <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight leading-none" style={{ color: DARK }}>
                Visit<br />
                <span style={{ color: TEAL }}>Celestia</span>
              </h2>
            </div>

            {/* Details */}
            <div className="space-y-5">
              {[
                { label: 'Address', value: BUSINESS.address },
                { label: 'City', value: BUSINESS.city },
                { label: 'Weekdays', value: BUSINESS.hours.weekdays },
                { label: 'Friday', value: BUSINESS.hours.weekend },
                { label: 'Emergency', value: BUSINESS.hours.emergency },
                { label: 'Phone', value: BUSINESS.phone },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-semibold w-20 shrink-0 pt-0.5"
                    style={{ color: TEAL }}>
                    {item.label}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: DARK }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full text-sm font-bold tracking-[0.12em] uppercase px-8 py-4 self-start transition-all duration-300"
              style={{ background: TEAL, color: '#fff', boxShadow: `0 8px 30px ${TEAL}30` }}>
              <div className="w-2 h-2 rounded-full bg-white/60" />
              Book via WhatsApp
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{ height: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <iframe
              src={BUSINESS.mapsEmbedSrc}
              title="Clinic Location"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Top gradient mask */}
            <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
              style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
            {/* Bottom gradient mask */}
            <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
