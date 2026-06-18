import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BUSINESS, TEAL, BG, DARK, MUTED } from '../lib/business-data'

export function ServicesBento() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const services = BUSINESS.services
  // Layout: [large, small, small] [small, small, small]
  const large = services.filter(s => s.size === 'large')
  const small = services.filter(s => s.size === 'small')

  return (
    <section id="services" ref={ref} className="py-24 lg:py-36 px-6 lg:px-16" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14">
          <p className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: TEAL }}>
            Our Specialties
          </p>
          <h2 className="text-4xl lg:text-6xl font-black uppercase leading-none tracking-tight" style={{ color: DARK }}>
            Services That<br />
            <span style={{ color: TEAL }}>Transform</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large card */}
          {large.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="col-span-2 lg:col-span-1 row-span-2 relative rounded-3xl p-8 overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, rotateX: 15, y: 40 }}
              animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: DARK,
                border: `1px solid ${svc.color}20`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.12)`,
                minHeight: '280px',
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                style={{ background: `${svc.color}18`, transform: 'translate(25%, -25%)' }} />

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}35` }}>
                  <span className="text-xl" style={{ color: svc.color }}>{svc.icon}</span>
                </div>
                <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: `${svc.color}90` }}>
                  #{String(svc.id).padStart(2, '0')}
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 leading-tight">
                  {svc.nameEn}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {svc.descEn}
                </p>
                <div className="mt-auto pt-6">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase"
                    style={{ color: svc.color }}>
                    Learn More
                    <span>→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Small cards */}
          {small.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="relative rounded-3xl p-6 overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, rotateX: 12, y: 30 }}
              animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                background: '#fff',
                border: `1px solid ${svc.color}15`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.06)`,
              }}
            >
              <div className="absolute top-0 right-0 w-28 h-28 rounded-full blur-[50px] pointer-events-none"
                style={{ background: `${svc.color}12`, transform: 'translate(25%, -25%)' }} />

              <div className="relative z-10">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}25` }}>
                  <span style={{ color: svc.color, fontSize: '14px' }}>{svc.icon}</span>
                </div>
                <h3 className="text-base font-black uppercase tracking-tight mb-2" style={{ color: DARK }}>
                  {svc.nameEn}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: MUTED }}>
                  {svc.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
