import { motion } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { useLang } from '../contexts/LangContext'

const markets = [
  { emoji: '✂️', name: 'Salons & Spas', ar: 'صالونات ومنتجعات', color: '#B600A8' },
  { emoji: '🦷', name: 'Dental Clinics', ar: 'عيادات الأسنان', color: '#00DBFB' },
  { emoji: '🏥', name: 'Medical Clinics', ar: 'عيادات طبية', color: '#264B9C' },
  { emoji: '🍽️', name: 'Restaurants & Cafés', ar: 'مطاعم وكافيهات', color: '#BE4C00' },
  { emoji: '🏠', name: 'Real Estate', ar: 'العقارات', color: '#7621B0' },
  { emoji: '💪', name: 'Gyms & Wellness', ar: 'الصالات الرياضية', color: '#BE4C00' },
  { emoji: '🌿', name: 'Wellness Brands', ar: 'العلامات الصحية', color: '#0d6050' },
  { emoji: '🛠️', name: 'Local Services', ar: 'الخدمات المحلية', color: '#264B9C' },
]

const regions = [
  { flag: '🇦🇪', name: 'UAE', ar: 'الإمارات' },
  { flag: '🇸🇦', name: 'Saudi Arabia', ar: 'السعودية' },
  { flag: '🇴🇲', name: 'Oman', ar: 'عُمان' },
  { flag: '🇶🇦', name: 'Qatar', ar: 'قطر' },
  { flag: '🇦🇺', name: 'Australia', ar: 'أستراليا' },
  { flag: '🇨🇦', name: 'Canada', ar: 'كندا' },
]

export function MarketsSection() {
  const { t, isAr } = useLang()

  return (
    <section id="markets" className="py-24 lg:py-36 px-6 relative overflow-clip"
      style={{ background: '#0C0C0C' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[128px] opacity-8"
          style={{ background: 'radial-gradient(circle, #B600A8, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-8"
          style={{ background: 'radial-gradient(circle, #00DBFB, transparent)' }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif', letterSpacing: '0.1em' } : {}}>
            {t.markets.eyebrow}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
            {t.markets.heading}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {markets.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl p-5 flex flex-col gap-3 cursor-default"
              style={{
                border: `1px solid ${m.color}20`,
                boxShadow: `0 0 0 1px rgba(215,226,234,0.04), 0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${m.color}08`,
              }}
            >
              <span className="text-2xl">{m.emoji}</span>
              <p className="font-semibold text-sm text-[#D7E2EA] leading-tight"
                style={{ fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}>
                {isAr ? m.ar : m.name}
              </p>
              <div className="h-0.5 w-8 rounded-full" style={{ background: m.color + '60' }} />
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="text-xs uppercase tracking-[0.3em] text-[rgba(215,226,234,0.3)] mb-5"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif', letterSpacing: '0.08em' } : {}}>
            {isAr ? 'المناطق التي نخدمها' : 'Regions we serve'}
          </p>
          <div className="flex flex-wrap gap-3">
            {regions.map((r) => (
              <div key={r.name} className="flex items-center gap-2 glass rounded-full px-4 py-2"
                style={{ border: '1px solid rgba(215,226,234,0.1)' }}>
                <span className="text-base">{r.flag}</span>
                <span className="text-sm font-medium text-[rgba(215,226,234,0.7)]"
                  style={{ fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}>
                  {isAr ? r.ar : r.name}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
