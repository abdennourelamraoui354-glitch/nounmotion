import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { useLang } from '../contexts/LangContext'

function ProcessStep({ step, index, isAr }: { step: { num: string; title: string; desc: string }; index: number; isAr: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isAr ? 24 : -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-6 sm:gap-8 items-start group"
    >
      <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center relative"
        style={{
          background: 'linear-gradient(135deg, rgba(118,33,176,0.2), rgba(182,0,168,0.15))',
          border: '1px solid rgba(118,33,176,0.35)',
          boxShadow: '0 0 24px rgba(118,33,176,0.15)',
        }}>
        <span className="text-base font-black" style={{ color: '#B600A8' }}>{step.num}</span>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(118,33,176,0.35), rgba(182,0,168,0.25))' }} />
      </div>

      <div className="flex-1 pb-1">
        <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-[#D7E2EA] mb-2"
          style={{ fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}>
          {step.title}
        </h3>
        <p className="text-[rgba(215,226,234,0.55)] leading-relaxed"
          style={{ fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

export function ProcessSection() {
  const { t, isAr } = useLang()

  return (
    <section id="process" className="py-24 lg:py-36 px-6 relative overflow-clip"
      style={{ background: '#050505' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[160px] opacity-6 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7621B0, transparent)' }} />

      <div className="max-w-5xl mx-auto relative">
        <FadeIn className="mb-20">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif', letterSpacing: '0.1em' } : {}}>
            {t.process.eyebrow}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
            {t.process.heading}
          </h2>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[27px] top-8 bottom-8 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(118,33,176,0.4) 20%, rgba(182,0,168,0.4) 80%, transparent)' }} />
          <div className="flex flex-col gap-10">
            {t.process.steps.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} isAr={isAr} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
