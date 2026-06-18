import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FadeIn } from './ui/FadeIn'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../contexts/LangContext'

function ServiceRow({ item, index }: { item: { num: string; title: string; desc: string }; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-[#0C0C0C]/12 last:border-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center gap-4 py-8 lg:py-10 transition-all duration-300 -mx-4 px-4 rounded-2xl ${hovered ? 'bg-[#0C0C0C]/6' : ''}`}>
        <motion.span
          animate={{ color: hovered ? '#7621B0' : 'rgba(12,12,12,0.12)' }}
          transition={{ duration: 0.25 }}
          className="text-5xl lg:text-7xl font-black leading-none shrink-0 w-24 transition-colors"
        >
          {item.num}
        </motion.span>
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-[#0C0C0C] mb-2">{item.title}</h3>
          <p className="text-[#0C0C0C]/55 leading-relaxed">{item.desc}</p>
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.2 }}
          className="sm:ml-4 shrink-0"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(118,33,176,0.1)', border: '1px solid rgba(118,33,176,0.3)' }}>
            <ArrowUpRight className="w-4 h-4" style={{ color: '#7621B0' }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const { t, isAr } = useLang()

  return (
    <section id="services" className="relative z-10">
      <div className="rounded-t-[40px] lg:rounded-t-[60px] py-24 lg:py-36 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-[#0C0C0C]/35 mb-4"
              style={isAr ? { fontFamily: 'Tajawal, sans-serif', letterSpacing: '0.1em' } : {}}>
              {t.services.eyebrow}
            </p>
            <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
              style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
              {t.services.heading}
            </h2>
          </FadeIn>

          <div style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
            {t.services.items.map((item, i) => (
              <ServiceRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
