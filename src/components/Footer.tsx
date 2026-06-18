import { motion } from 'framer-motion'
import { WA_LINK } from '../config'
import { useLang } from '../contexts/LangContext'

const EMAIL = 'contact@nounmotion.store'
const navIds = ['services', 'work', 'markets', 'pricing', 'contact']

export function Footer() {
  const { t, isAr } = useLang()
  const fontStyle = isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}

  return (
    <footer className="relative overflow-clip" style={{ background: '#050505', borderTop: '1px solid rgba(215,226,234,0.07)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 blur-[80px] opacity-15 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #7621B0, transparent)' }} />

      <div className="max-w-5xl mx-auto px-6 py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-black uppercase tracking-tight"
                style={{
                  background: 'linear-gradient(90deg, #D7E2EA, rgba(215,226,234,0.55))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                Nounmotion
              </span>
            </div>
            <p className="text-sm text-[rgba(215,226,234,0.45)] leading-relaxed mb-6 max-w-xs" style={fontStyle}>
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-[rgba(215,226,234,0.45)] hover:text-[#D7E2EA] transition-colors">
                <span className="text-xs">✉</span>
                <span className="font-mono text-xs">{EMAIL}</span>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-[rgba(37,211,102,0.9)] transition-colors"
                style={{ color: 'rgba(37,211,102,0.6)' }}>
                <span className="text-xs">💬</span>
                <span style={fontStyle}>{t.footer.waLabel}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[rgba(215,226,234,0.3)] mb-5" style={fontStyle}>
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </p>
            <ul className="space-y-3">
              {t.footer.links.map((link, i) => (
                <li key={i}>
                  <a href={`#${navIds[i]}`}
                    className="text-sm text-[rgba(215,226,234,0.45)] hover:text-[#D7E2EA] transition-colors"
                    style={fontStyle}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[rgba(215,226,234,0.3)] mb-5" style={fontStyle}>
              {isAr ? 'نخدم' : 'We Serve'}
            </p>
            <ul className="space-y-2">
              {(isAr
                ? ['صالونات ومنتجعات', 'عيادات أسنان', 'عيادات طبية', 'مطاعم', 'عقارات', 'صالات رياضية']
                : ['Salons & Spas', 'Dental Clinics', 'Medical Clinics', 'Restaurants', 'Real Estate', 'Gyms']
              ).map((item) => (
                <li key={item}>
                  <span className="text-sm text-[rgba(215,226,234,0.35)]" style={fontStyle}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px w-full mb-8" style={{ background: 'rgba(215,226,234,0.07)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(215,226,234,0.25)]" style={fontStyle}>{t.footer.copy}</p>
          <div className="flex items-center gap-1 text-xs text-[rgba(215,226,234,0.2)]">
            <span style={fontStyle}>{isAr ? 'مصنوع بـ' : 'Made with'}</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-red-400/50 mx-0.5"
            >
              ♥
            </motion.span>
            <span style={fontStyle}>{isAr ? 'لعملائنا في الخليج والعالم' : 'for GCC & beyond'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
