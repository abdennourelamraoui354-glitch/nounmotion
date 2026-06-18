import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { useLang } from '../contexts/LangContext'
import { WA_LINK } from '../config'

const DEMOS = [
  {
    id: 'tawaheen',
    nameEn: 'Tawaheen Al-Hawa',
    nameAr: 'طواحين الهوا',
    nicheEn: 'Restaurant · Arabic RTL',
    nicheAr: 'مطعم · عربي',
    tags: ['Live Demo', 'Arabic RTL', 'Jordanian Cuisine'],
    isLive: true,
    previewUrl: '/?preview=tawaheen-alhawa',
    accent: '#C9A96E',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
    url: 'tawaheen-alhawa.ae',
  },
  {
    id: 'celestia',
    nameEn: 'Celestia Dental',
    nameAr: 'سيليستيا للأسنان',
    nicheEn: 'Dental Clinic · Kuwait',
    nicheAr: 'عيادة أسنان · الكويت',
    tags: ['Live Demo', 'Cinematic', 'Preloader'],
    isLive: true,
    previewUrl: '/?preview=premium-demo',
    accent: '#0EA5A9',
    img: '/images/nounmotion/02-dental-clinic-hero.jpg',
    url: 'celestia-dental.kw',
  },
  {
    id: 'salon',
    nameEn: 'Salon Lumière',
    nameAr: 'صالون لوميير',
    nicheEn: 'Luxury Beauty · Dubai',
    nicheAr: 'صالون فاخر · دبي',
    tags: ['Gold', 'Luxury', 'Booking Flow'],
    isLive: false,
    previewUrl: null,
    accent: '#C9A84C',
    img: '/images/nounmotion/01-salon-luxury-hero.jpg',
    url: 'salon-lumiere.ae',
  },
  {
    id: 'spa',
    nameEn: 'The Spa',
    nameAr: 'ذا سبا',
    nicheEn: 'Spa & Wellness',
    nicheAr: 'سبا وعافية',
    tags: ['Calm', 'Premium', 'Arabic/English'],
    isLive: false,
    previewUrl: null,
    accent: '#4a9e6e',
    img: '/images/nounmotion/05-spa-wellness-hero.jpg',
    url: 'thespa.ae',
  },
  {
    id: 'realestate',
    nameEn: 'Primae Properties',
    nameAr: 'برايمي العقارية',
    nicheEn: 'Real Estate · UAE',
    nicheAr: 'عقارات · الإمارات',
    tags: ['Listings', 'Lead Capture', 'Dark Navy'],
    isLive: false,
    previewUrl: null,
    accent: '#C9A84C',
    img: '/images/nounmotion/04-real-estate-villa-hero.jpg',
    url: 'primae-properties.ae',
  },
  {
    id: 'restaurant',
    nameEn: 'Maison',
    nameAr: 'ميزون',
    nicheEn: 'Fine Dining · Dubai',
    nicheAr: 'مطعم فاخر · دبي',
    tags: ['Orange Gold', 'Atmosphere', 'Reserve'],
    isLive: false,
    previewUrl: null,
    accent: '#E07820',
    img: '/images/nounmotion/03-restaurant-luxury-hero.jpg',
    url: 'maison-dubai.com',
  },
]

function BrowserChrome({ url, accent }: { url: string; accent: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 shrink-0"
      style={{ background: 'rgba(0,0,0,0.92)', borderBottom: `1px solid ${accent}22` }}>
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
      <div className="flex-1 mx-3 h-5 rounded-md flex items-center px-2.5 gap-2"
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={accent} opacity="0.7"/></svg>
        <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{url}</span>
      </div>
    </div>
  )
}

export function PortfolioShowcase() {
  const { isAr } = useLang()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fontStyle = isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}

  const demo = DEMOS[active]

  useEffect(() => {
    if (paused) { if (intervalRef.current) clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => setActive(i => (i + 1) % DEMOS.length), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused])

  return (
    <section id="work" className="py-24 lg:py-36 px-6 relative overflow-clip"
      style={{ background: '#050505' }}>
      {/* Ambient glow behind active demo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[130px] pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(ellipse, ${demo.accent}12 0%, transparent 70%)` }} />

      <div className="max-w-6xl mx-auto relative">
        <FadeIn className="mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4" style={fontStyle}>
            {isAr ? 'أعمالنا الحية' : 'Live Portfolio'}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text" style={fontStyle}>
            {isAr ? 'مواقع نبنيها\nافتح عروضاً حية' : 'Sites we build\nOpen live demos'}
          </h2>
        </FadeIn>

        {/* Main showcase */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: `1.5px solid ${demo.accent}35`,
            boxShadow: `0 0 80px ${demo.accent}18, 0 40px 80px rgba(0,0,0,0.7)`,
            transition: 'border-color 0.6s, box-shadow 0.6s',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <BrowserChrome url={demo.url} accent={demo.accent} />

          {/* Image area */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 40vw, 520px)' }}>
            <AnimatePresence mode="sync">
              <motion.img
                key={active}
                src={demo.img}
                alt={demo.nameEn}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: 'brightness(0.62) saturate(1.1)' }}
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div key={`copy-${active}`}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {demo.tags.map(tag => (
                      <span key={tag}
                        className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: tag.includes('Live') ? `${demo.accent}30` : 'rgba(255,255,255,0.08)',
                          color: tag.includes('Live') ? demo.accent : 'rgba(255,255,255,0.6)',
                          border: tag.includes('Live') ? `1px solid ${demo.accent}50` : '1px solid rgba(255,255,255,0.12)',
                        }}>
                        {tag.includes('Live') ? '● ' : ''}{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black uppercase text-white tracking-tight leading-tight" style={fontStyle}>
                    {isAr ? demo.nameAr : demo.nameEn}
                  </h3>
                  <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.5)', ...fontStyle }}>
                    {isAr ? demo.nicheAr : demo.nicheEn}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA buttons */}
              <AnimatePresence mode="wait">
                <motion.div key={`cta-${active}`}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                  {demo.isLive && demo.previewUrl && (
                    <a href={demo.previewUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
                      style={{
                        background: demo.accent,
                        color: '#fff',
                        boxShadow: `0 4px 20px ${demo.accent}40`,
                      }}>
                      {isAr ? 'افتح العرض الحي' : 'Open Live Demo'}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </a>
                  )}
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.8)',
                    }}>
                    {isAr ? 'احصل على هذا الأسلوب' : 'Get This Style'}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress bar */}
          {!paused && (
            <motion.div
              key={`bar-${active}`}
              className="absolute bottom-0 left-0 h-0.5"
              style={{ background: demo.accent }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {DEMOS.map((d, i) => (
            <motion.button
              key={d.id}
              onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 8000) }}
              whileHover={{ scale: 1.04 }}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{
                height: '72px',
                border: i === active ? `1.5px solid ${d.accent}80` : '1px solid rgba(255,255,255,0.08)',
                boxShadow: i === active ? `0 0 20px ${d.accent}25` : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              <img src={d.img} alt={d.nameEn} className="w-full h-full object-cover"
                style={{ filter: i === active ? 'brightness(0.65)' : 'brightness(0.35)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1.5">
                {d.isLive && (
                  <span className="text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full mb-0.5"
                    style={{ background: `${d.accent}30`, color: d.accent, border: `1px solid ${d.accent}50` }}>
                    Live
                  </span>
                )}
                <span className="text-[8px] font-semibold text-white/70 text-center px-1 leading-tight" style={fontStyle}>
                  {isAr ? d.nicheAr.split('·')[0].trim() : d.nicheEn.split('·')[0].trim()}
                </span>
              </div>
              {/* Active indicator dot */}
              {i === active && (
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: d.accent }} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tagline */}
        <FadeIn delay={0.4} className="mt-10 text-center">
          <p className="text-sm text-[rgba(215,226,234,0.35)]" style={fontStyle}>
            {isAr
              ? 'كل هذه المواقع يمكن بناؤها لعملك — مع معاينة مجانية قبل الالتزام'
              : 'Every one of these can be built for your business — free preview before any commitment'}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
