import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContactButton } from './ui/ContactButton'
import { useLang } from '../contexts/LangContext'
import { WA_LINK } from '../config'

export function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.markets, href: '#markets' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
    >
      <div
        className="mx-auto max-w-7xl px-5 glass rounded-full mx-4 flex items-center justify-between transition-all duration-300"
        style={{ padding: scrolled ? '8px 20px' : '10px 22px' }}
      >
        <a href="#" className="text-[#D7E2EA] font-black text-xl uppercase tracking-widest shrink-0">
          Noun<span className="gradient-text-bright">motion</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider hover:opacity-60 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200"
            style={{ border: '1px solid rgba(215,226,234,0.2)', color: 'rgba(215,226,234,0.7)' }}
          >
            <span style={{ color: lang === 'en' ? '#00DBFB' : 'rgba(215,226,234,0.4)' }}>EN</span>
            <span className="opacity-30 mx-0.5">/</span>
            <span style={{ color: lang === 'ar' ? '#00DBFB' : 'rgba(215,226,234,0.4)' }}>AR</span>
          </button>
          <ContactButton label={t.nav.preview} href={WA_LINK} size="sm" />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-xs font-bold tracking-widest"
            style={{ color: '#00DBFB' }}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#D7E2EA] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#D7E2EA] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#D7E2EA] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass mx-4 mt-2 rounded-2xl px-6 py-6 flex flex-col gap-5 overflow-hidden"
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:contact@nounmotion.store"
              className="text-xs text-[rgba(215,226,234,0.5)] hover:text-[rgba(215,226,234,0.8)] transition-colors"
            >
              contact@nounmotion.store
            </a>
            <ContactButton label={t.nav.preview} href={WA_LINK} size="sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
