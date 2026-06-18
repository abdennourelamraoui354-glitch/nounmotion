import { motion } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { MagneticButton } from './ui/MagneticButton'
import { WA_LINK } from '../config'
import { useLang } from '../contexts/LangContext'

const EMAIL = 'contact@nounmotion.store'

export function FinalCTASection() {
  const { t, isAr } = useLang()
  const fontStyle = isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}
  const c = t.cta

  return (
    <section className="relative py-32 lg:py-48 px-6 overflow-clip grain-overlay"
      style={{ background: '#0C0C0C' }}>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7621B0 0%, #B600A8 40%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #00DBFB 0%, transparent 60%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-8" style={fontStyle}>
            {c.eyebrow}
          </p>

          <h2 className="font-black uppercase leading-none tracking-tight mb-8"
            style={{ ...fontStyle, fontSize: 'clamp(3rem, 10vw, 9rem)' }}>
            <span className="block gradient-text">{c.heading1}</span>
            <span className="block" style={{
              background: 'linear-gradient(123deg, #B600A8 0%, #7621B0 40%, #00DBFB 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{c.heading2}</span>
            <span className="block gradient-text">{c.heading3}</span>
          </h2>

          <p className="text-lg text-[rgba(215,226,234,0.55)] max-w-xl mx-auto mb-12 leading-relaxed" style={fontStyle}>
            {c.sub}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-6 mb-14">
          {[
            { val: c.stat1, label: c.stat1L },
            { val: c.stat2, label: c.stat2L },
            { val: c.stat3, label: c.stat3L },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl px-7 py-4 text-center"
              style={{ border: '1px solid rgba(215,226,234,0.1)', minWidth: '130px' }}>
              <p className="text-3xl font-black" style={{
                background: 'linear-gradient(90deg, #00DBFB, #B600A8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{s.val}</p>
              <p className="text-[10px] uppercase tracking-widest text-[rgba(215,226,234,0.45)] mt-1" style={fontStyle}>{s.label}</p>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.25} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <MagneticButton>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-full text-white font-bold uppercase tracking-widest text-sm px-9 py-4"
              style={fontStyle}>
              <span className="text-base">💬</span>
              {c.btn}
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 glass rounded-full border border-[#D7E2EA]/20 text-[rgba(215,226,234,0.65)] font-semibold uppercase tracking-widest text-sm px-8 py-4 hover:border-[#D7E2EA]/45 hover:text-[#D7E2EA] transition-all duration-200"
              style={fontStyle}>
              <span className="text-base">✉️</span>
              {c.email} {EMAIL}
            </a>
          </MagneticButton>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="text-xs text-[rgba(215,226,234,0.3)] uppercase tracking-widest" style={fontStyle}>{c.note}</p>
        </FadeIn>
      </div>
    </section>
  )
}
