import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { ContactButton } from './ui/ContactButton'
import { useLang } from '../contexts/LangContext'
import { WA_LINK } from '../config'

export function AboutSection() {
  const { t, isAr } = useLang()
  const textRef = useRef(null)
  const inView = useInView(textRef, { once: true, margin: '-15%' })
  const words = t.about.body.split(' ')

  return (
    <section className="relative min-h-screen flex items-center py-24 lg:py-36 px-6 overflow-clip"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative floating elements */}

      {/* Glowing cyan ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[15%] right-[8%] w-36 h-36 pointer-events-none"
        style={{ border: '2px solid rgba(0,219,251,0.25)', borderRadius: '50%', boxShadow: '0 0 40px rgba(0,219,251,0.1), inset 0 0 40px rgba(0,219,251,0.05)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[15%] right-[8%] w-24 h-24 pointer-events-none"
        style={{ border: '1px solid rgba(0,219,251,0.15)', borderRadius: '50%', margin: '24px' }}
      />

      {/* Purple gradient cube */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] left-[6%] w-20 h-20 rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #7621B0, #B600A8)', opacity: 0.35, filter: 'blur(1px)' }}
      />

      {/* Glass website card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[35%] right-[4%] w-28 h-18 rounded-xl pointer-events-none glass"
        style={{ border: '1px solid rgba(215,226,234,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
      >
        <div className="p-2.5">
          <div className="h-2 w-12 rounded-full bg-white/20 mb-2" />
          <div className="h-1.5 w-10 rounded-full bg-white/12 mb-1" />
          <div className="h-1.5 w-14 rounded-full bg-white/12 mb-1" />
          <div className="h-4 w-full rounded-lg mt-2" style={{ background: 'linear-gradient(90deg,rgba(182,0,168,0.3),rgba(118,33,176,0.2))' }} />
        </div>
      </motion.div>

      {/* Abstract sphere */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[30%] right-[20%] w-32 h-32 rounded-full pointer-events-none blur-sm"
        style={{ background: 'radial-gradient(circle at 35% 35%, #00DBFB, #7621B0, #050505)' }}
      />

      {/* WhatsApp bubble */}
      <motion.div
        animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[25%] left-[12%] glass rounded-xl px-3 py-2 pointer-events-none"
        style={{ border: '1px solid rgba(37,211,102,0.25)', boxShadow: '0 4px 20px rgba(37,211,102,0.1)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#25D366' }} />
          <div className="text-[9px] font-medium" style={{ color: 'rgba(37,211,102,0.8)' }}>WhatsApp reply</div>
        </div>
        <div className="mt-1 h-1 w-16 rounded-full" style={{ background: 'rgba(37,211,102,0.25)' }} />
      </motion.div>

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.4)] mb-6">{t.about.eyebrow}</p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text mb-14 whitespace-pre-line"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
            {t.about.heading}
          </h2>
        </FadeIn>

        <div ref={textRef}
          className="flex flex-wrap gap-x-2 gap-y-1 justify-center mb-14"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: 1.7, fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.12, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.12, y: 8 }}
              transition={{ delay: i * 0.035, duration: 0.4, ease: 'easeOut' }}
              className="text-[#D7E2EA] font-medium"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <ContactButton label={t.about.cta} href={WA_LINK} size="lg" />
            <div className="glass rounded-xl px-6 py-3 text-center" style={{ border: '1px solid rgba(0,219,251,0.2)' }}>
              <p className="text-2xl font-black text-[#00DBFB]">{t.about.stat1Value}</p>
              <p className="text-xs text-[rgba(215,226,234,0.5)] uppercase tracking-wider">{t.about.stat1Label}</p>
            </div>
            <div className="glass rounded-xl px-6 py-3 text-center" style={{ border: '1px solid rgba(182,0,168,0.2)' }}>
              <p className="text-2xl font-black text-[#B600A8]">{t.about.stat2Value}</p>
              <p className="text-xs text-[rgba(215,226,234,0.5)] uppercase tracking-wider">{t.about.stat2Label}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
