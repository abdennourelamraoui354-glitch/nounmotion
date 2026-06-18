import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'
import { useLang } from '../contexts/LangContext'

function FAQItem({ item, index, isAr }: {
  item: { q: string; a: string }
  index: number
  isAr: boolean
}) {
  const [open, setOpen] = useState(false)
  const fontStyle = isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: open ? 'rgba(118,33,176,0.06)' : 'rgba(255,255,255,0.025)',
        border: open ? '1px solid rgba(118,33,176,0.25)' : '1px solid rgba(215,226,234,0.08)',
        transition: 'background 0.3s, border 0.3s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-[#D7E2EA] text-base leading-snug" style={fontStyle}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: open ? 'rgba(182,0,168,0.15)' : 'rgba(215,226,234,0.06)',
            border: open ? '1px solid rgba(182,0,168,0.35)' : '1px solid rgba(215,226,234,0.1)',
          }}
        >
          <Plus className="w-3.5 h-3.5" style={{ color: open ? '#B600A8' : 'rgba(215,226,234,0.5)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-5">
              <p className="text-[rgba(215,226,234,0.6)] leading-relaxed" style={fontStyle}>
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const { t, isAr } = useLang()
  const fontStyle = isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}

  return (
    <section id="faq" className="py-24 lg:py-36 px-6" style={{ background: '#050505' }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn className="mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4" style={fontStyle}>
            {t.faq.eyebrow}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text" style={fontStyle}>
            {t.faq.heading}
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-3">
          {t.faq.items.map((item, i) => (
            <FAQItem key={i} item={item} index={i} isAr={isAr} />
          ))}
        </div>
      </div>
    </section>
  )
}
