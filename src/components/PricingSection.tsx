import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'
import { MagneticButton } from './ui/MagneticButton'
import { WA_LINK } from '../config'
import { useLang } from '../contexts/LangContext'

const EMAIL = 'contact@nounmotion.store'

const plans = [
  {
    key: 'starter',
    en: {
      name: 'Starter', price: '$399', period: 'one-time',
      desc: 'Perfect for local businesses that need a clean, fast, professional online presence.',
      features: ['Custom homepage design', 'Mobile-first build', 'WhatsApp CTA button', 'Contact form', 'Google Maps embed', '1 round of revisions', 'Fast loading & SEO basics'],
    },
    ar: {
      name: 'المبتدئ', price: '$399', period: 'دفعة واحدة',
      desc: 'مثالي للشركات المحلية التي تحتاج إلى حضور رقمي سريع واحترافي.',
      features: ['تصميم صفحة رئيسية مخصصة', 'بناء أولوية الموبايل', 'زر واتساب CTA', 'نموذج تواصل', 'خريطة Google', 'جولة تعديلات واحدة', 'تحميل سريع وأساسيات SEO'],
    },
    accent: '#7621B0',
    popular: false,
  },
  {
    key: 'pro',
    en: {
      name: 'Pro', price: '$799', period: 'one-time',
      desc: 'A complete website with all pages, copy, and WhatsApp booking flow. The most popular option.',
      features: ['Everything in Starter', '5+ page website', 'Bilingual Arabic / English', 'WhatsApp booking flow', 'Gallery or portfolio section', 'FAQ section', 'Premium copywriting', '3 rounds of revisions', 'Domain + hosting guidance'],
    },
    ar: {
      name: 'المحترف', price: '$799', period: 'دفعة واحدة',
      desc: 'موقع كامل مع جميع الصفحات والنصوص وتدفق حجز واتساب. الخيار الأكثر طلباً.',
      features: ['كل ما في المبتدئ', '٥+ صفحات موقع', 'عربي / إنجليزي ثنائي اللغة', 'تدفق حجز واتساب', 'قسم معرض أو محفظة', 'قسم FAQ', 'كتابة نصوص متميزة', '٣ جولات تعديلات', 'إرشادات الدومين والاستضافة'],
    },
    accent: '#B600A8',
    popular: true,
  },
  {
    key: 'custom',
    en: {
      name: 'Custom', price: null, period: null,
      desc: 'For businesses with unique requirements — e-commerce, booking systems, or multi-location brands.',
      features: ['Custom scope & timeline', 'E-commerce ready', 'Booking system integration', 'Multi-language support', 'Advanced animations', 'Priority delivery', 'Dedicated support'],
    },
    ar: {
      name: 'مخصص', price: null, period: null,
      desc: 'للشركات ذات المتطلبات الخاصة — التجارة الإلكترونية أو أنظمة الحجز أو العلامات متعددة المواقع.',
      features: ['نطاق وجدول زمني مخصص', 'جاهز للتجارة الإلكترونية', 'تكامل نظام الحجز', 'دعم متعدد اللغات', 'رسوم متحركة متقدمة', 'تسليم ذو أولوية', 'دعم مخصص'],
    },
    accent: '#264B9C',
    popular: false,
  },
]

export function PricingSection() {
  const { t, isAr } = useLang()
  const fontStyle = isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}

  return (
    <section id="pricing" className="py-24 lg:py-36 px-6 relative overflow-clip"
      style={{ background: '#0C0C0C' }}>
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] rounded-full blur-[160px] opacity-6 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #B600A8, transparent)' }} />

      <div className="max-w-5xl mx-auto relative">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4" style={fontStyle}>
            {t.pricing.eyebrow}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text" style={fontStyle}>
            {t.pricing.heading}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const copy = isAr ? plan.ar : plan.en
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl p-7 flex flex-col"
                style={{
                  background: plan.popular
                    ? `linear-gradient(160deg, ${plan.accent}15, rgba(0,0,0,0.6))`
                    : 'rgba(255,255,255,0.025)',
                  border: plan.popular
                    ? `2px solid ${plan.accent}50`
                    : '1px solid rgba(215,226,234,0.1)',
                  boxShadow: plan.popular
                    ? `0 0 0 1px rgba(215,226,234,0.04), 0 32px 64px rgba(0,0,0,0.6), 0 0 60px ${plan.accent}15`
                    : '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap"
                      style={{ background: `linear-gradient(90deg, ${plan.accent}, #7621B0)`, color: '#fff' }}>
                      {t.pricing.mostPopular}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: plan.accent, fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}>
                    {copy.name}
                  </p>
                  {copy.price ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#D7E2EA]">{copy.price}</span>
                      <span className="text-sm text-[rgba(215,226,234,0.45)]" style={fontStyle}>{copy.period}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-black text-[#D7E2EA]" style={fontStyle}>{t.pricing.customQuote}</span>
                  )}
                  <p className="text-sm text-[rgba(215,226,234,0.5)] mt-3 leading-relaxed" style={fontStyle}>{copy.desc}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {copy.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: plan.accent }} />
                      <span className="text-sm text-[rgba(215,226,234,0.65)]" style={fontStyle}>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton>
                  {copy.price ? (
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-200"
                      style={plan.popular ? {
                        background: `linear-gradient(90deg, ${plan.accent}, #7621B0)`,
                        color: '#fff',
                        boxShadow: `0 8px 32px ${plan.accent}35`,
                      } : {
                        background: 'rgba(215,226,234,0.06)',
                        color: 'rgba(215,226,234,0.7)',
                        border: '1px solid rgba(215,226,234,0.15)',
                      }}
                    >
                      {t.pricing.cta}
                    </a>
                  ) : (
                    <a href={`mailto:${EMAIL}`}
                      className="block w-full text-center py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-200"
                      style={{ background: 'rgba(38,75,156,0.15)', color: '#264B9C', border: '1px solid rgba(38,75,156,0.3)' }}
                    >
                      {t.pricing.letsTalk}
                    </a>
                  )}
                </MagneticButton>
              </motion.div>
            )
          })}
        </div>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <p className="text-sm text-[rgba(215,226,234,0.4)]" style={fontStyle}>{t.pricing.note}</p>
        </FadeIn>
      </div>
    </section>
  )
}
