import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ContactButton } from './ui/ContactButton'
import { MagneticButton } from './ui/MagneticButton'
import { useLang } from '../contexts/LangContext'
import { WA_LINK } from '../config'
import { CinematicWebsiteReel, reelConfigs } from './ui/CinematicWebsiteReel'

export function HeroSection() {
  const { t, isAr } = useLang()
  const glowRef1 = useRef<HTMLDivElement>(null)
  const glowRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!glowRef1.current || !glowRef2.current) return
    const ctx = gsap.context(() => {
      gsap.to(glowRef1.current, { x: 60, y: -40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(glowRef2.current, { x: -50, y: 60, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-clip grain-overlay"
      style={{ background: '#0C0C0C' }}>
      <div ref={glowRef1} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse, #7621B0 0%, transparent 70%)' }} />
      <div ref={glowRef2} className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-12"
        style={{ background: 'radial-gradient(ellipse, #00DBFB 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(ellipse, #B600A8 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-8 items-center ${isAr ? 'lg:grid-flow-col-dense' : ''}`}>

          {/* Copy */}
          <div className="flex flex-col gap-7">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.45)]">
              {t.hero.eyebrow}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <h1 className="font-black uppercase leading-none tracking-tight text-fluid-hero" style={{ letterSpacing: '-0.02em' }}>
                <span className="gradient-text block">{t.hero.headline1}</span>
                <span className="gradient-text block">{t.hero.headline2}</span>
                <span className="block" style={{ background: 'linear-gradient(135deg, #00DBFB 0%, #B600A8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t.hero.headline3}
                </span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2">
              {t.hero.pills.map((pill, i) => (
                <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(215,226,234,0.06)', border: '1px solid rgba(215,226,234,0.14)', color: 'rgba(215,226,234,0.7)' }}>
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[rgba(215,226,234,0.65)] text-lg leading-relaxed max-w-xl"
              style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
              {t.hero.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center">
              <ContactButton label={t.hero.cta} href={WA_LINK} size="lg" />
              <MagneticButton>
                <a href="#work"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA]/80 font-semibold uppercase tracking-widest text-sm px-7 py-4 hover:border-[#D7E2EA] hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/5 transition-all duration-200">
                  {t.hero.ctaSecondary}
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="flex flex-col gap-1">
              <p className="text-xs text-[rgba(215,226,234,0.35)] uppercase tracking-widest">{t.hero.micro}</p>
              <a href="mailto:contact@nounmotion.store"
                className="text-xs text-[rgba(215,226,234,0.4)] hover:text-[rgba(215,226,234,0.7)] transition-colors duration-200">
                contact@nounmotion.store
              </a>
            </motion.div>
          </div>

          {/* Cinematic Website Reel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative ${isAr ? 'lg:order-first' : ''}`}
          >
            <div className="absolute inset-0 -z-10 blur-[80px] opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, #E07820 0%, #7621B0 60%, transparent 100%)' }} />

            <CinematicWebsiteReel config={reelConfigs.restaurant} height={520} scrollSpeed={18} />

            {/* Floating proof cards */}
            <motion.div initial={{ opacity: 0, scale: 0.8, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-5 glass rounded-xl px-4 py-2.5 z-10"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,219,251,0.15)', border: '1px solid rgba(0,219,251,0.2)' }}>
              <p className="text-[10px] text-[rgba(215,226,234,0.45)] uppercase tracking-widest">Delivered in</p>
              <p className="text-sm font-black text-[#00DBFB]">24 hours</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -top-3 -right-3 glass rounded-xl px-4 py-2.5 z-10"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(182,0,168,0.15)', border: '1px solid rgba(182,0,168,0.2)' }}>
              <p className="text-[10px] text-[rgba(215,226,234,0.45)] uppercase tracking-widest">Free Preview</p>
              <p className="text-sm font-black text-[#B600A8]">$0</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, duration: 0.5 }}
              className="absolute top-1/2 -left-7 -translate-y-1/2 glass rounded-xl px-3 py-2 z-10"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <p className="text-[10px] text-[rgba(215,226,234,0.45)] uppercase tracking-widest">WhatsApp</p>
              <p className="text-sm font-black gradient-text-bright">First</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[rgba(215,226,234,0.35)] to-transparent" />
      </motion.div>
    </section>
  )
}
