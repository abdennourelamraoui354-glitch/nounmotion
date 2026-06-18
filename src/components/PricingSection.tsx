import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'
import { MagneticButton } from './ui/MagneticButton'
import { useLang } from '../contexts/LangContext'

const plans = [
  {
    key: 'starter',
    en: {
      name: 'Starter',
      price: '4,500',
      currency: 'SAR',
      period: 'one-time',
      delivery: '10 days · 1 revision',
      desc: 'Clean, fast, professional website for local businesses ready to grow online.',
      features: [
        'Custom homepage design',
        'Mobile-first build',
        'WhatsApp CTA button',
        'Contact form',
        'Google Maps embed',
        '1 round of revisions',
        'Fast loading & SEO basics',
      ],
      missing: ['Cinematic animations', 'Bilingual AR/EN', '3D hero section'],
      waMsg: 'Hi! I\'m interested in the Starter website package (4,500 SAR). Can I get a free preview first?',
    },
    ar: {
      name: 'المبتدئ',
      price: '٤٬٥٠٠',
      currency: 'ريال',
      period: 'دفعة واحدة',
      delivery: '١٠ أيام · تعديل واحد',
      desc: 'موقع احترافي وسريع للشركات المحلية الجاهزة للنمو أونلاين.',
      features: [
        'تصميم صفحة رئيسية مخصصة',
        'بناء أولوية الموبايل',
        'زر واتساب CTA',
        'نموذج تواصل',
        'خريطة Google',
        'جولة تعديلات واحدة',
        'تحميل سريع وأساسيات SEO',
      ],
      missing: ['رسوم سينمائية', 'عربي / إنجليزي', 'هيرو ثلاثي الأبعاد'],
      waMsg: 'مرحبا! أريد الاستفسار عن باقة المبتدئ (٤٬٥٠٠ ريال). هل يمكنني الحصول على معاينة مجانية؟',
    },
    accent: '#7621B0',
    popular: false,
  },
  {
    key: 'pro',
    en: {
      name: 'Pro ⭐',
      price: '8,500',
      currency: 'SAR',
      period: 'one-time',
      delivery: '7 days · 3 revisions',
      desc: 'Cinematic animations, bilingual support, gallery & WhatsApp booking flow. Our most popular package.',
      features: [
        'Everything in Starter',
        'Cinematic scroll animations',
        'Bilingual Arabic / English',
        'WhatsApp booking flow',
        'Gallery or portfolio section',
        'FAQ section',
        'Premium copywriting',
        '3 rounds of revisions',
        'Domain + hosting guidance',
      ],
      missing: ['3D hero section', '30-day support'],
      waMsg: "Hi! I'm interested in the Pro website package (8,500 SAR). Can I get a free preview first?",
    },
    ar: {
      name: 'المحترف ⭐',
      price: '٨٬٥٠٠',
      currency: 'ريال',
      period: 'دفعة واحدة',
      delivery: '٧ أيام · ٣ تعديلات',
      desc: 'رسوم سينمائية، ثنائي اللغة، معرض وتدفق حجز واتساب. الباقة الأكثر طلباً.',
      features: [
        'كل ما في المبتدئ',
        'رسوم متحركة سينمائية',
        'عربي / إنجليزي ثنائي اللغة',
        'تدفق حجز واتساب',
        'قسم معرض أو محفظة',
        'قسم FAQ',
        'كتابة نصوص متميزة',
        '٣ جولات تعديلات',
        'إرشادات الدومين والاستضافة',
      ],
      missing: ['هيرو ثلاثي الأبعاد', 'دعم ٣٠ يوماً'],
      waMsg: 'مرحبا! أريد الاستفسار عن باقة المحترف (٨٬٥٠٠ ريال). هل يمكنني الحصول على معاينة مجانية؟',
    },
    accent: '#B600A8',
    popular: true,
  },
  {
    key: 'premium',
    en: {
      name: 'Premium',
      price: '14,000',
      currency: 'SAR',
      period: 'one-time',
      delivery: '5 days · 5 revisions',
      desc: 'Full cinematic experience with 3D hero, advanced SEO, and 30 days of dedicated post-launch support.',
      features: [
        'Everything in Pro',
        '3D hero section',
        'Advanced scroll animations',
        'Full SEO optimization',
        '5 rounds of revisions',
        '30-day post-launch support',
        'Priority delivery',
        'Dedicated project manager',
      ],
      missing: [],
      waMsg: "Hi! I'm interested in the Premium website package (14,000 SAR). Can I get a free preview first?",
    },
    ar: {
      name: 'بريميوم',
      price: '١٤٬٠٠٠',
      currency: 'ريال',
      period: 'دفعة واحدة',
      delivery: '٥ أيام · ٥ تعديلات',
      desc: 'تجربة سينمائية كاملة مع هيرو ثلاثي الأبعاد وتحسين SEO ودعم ٣٠ يوماً.',
      features: [
        'كل ما في المحترف',
        'هيرو ثلاثي الأبعاد',
        'رسوم تمرير متقدمة',
        'تحسين SEO كامل',
        '٥ جولات تعديلات',
        'دعم ٣٠ يوماً بعد الإطلاق',
        'تسليم ذو أولوية',
        'مدير مشروع مخصص',
      ],
      missing: [],
      waMsg: 'مرحبا! أريد الاستفسار عن باقة بريميوم (١٤٬٠٠٠ ريال). هل يمكنني الحصول على معاينة مجانية؟',
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
        <FadeIn className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4" style={fontStyle}>
            {t.pricing.eyebrow}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text mb-6" style={fontStyle}>
            {t.pricing.heading}
          </h2>
          {/* Free preview banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(182,0,168,0.12)', border: '1px solid rgba(182,0,168,0.3)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#B600A8' }} />
            <span className="text-sm font-semibold" style={{ color: '#B600A8', ...fontStyle }}>
              {isAr ? 'معاينة مجانية — ٠ ريال' : 'Free preview — 0 SAR'}
            </span>
          </motion.div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {plans.map((plan, i) => {
            const copy = isAr ? plan.ar : plan.en
            const waHref = `https://wa.me/966500000000?text=${encodeURIComponent(copy.waMsg)}`
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
                  transform: plan.popular ? 'scale(1.02)' : 'scale(1)',
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

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: plan.accent, fontFamily: isAr ? 'Tajawal, sans-serif' : undefined }}>
                    {copy.name}
                  </p>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-4xl font-black text-[#D7E2EA]">{copy.price}</span>
                    <span className="text-base font-semibold text-[rgba(215,226,234,0.55)]" style={fontStyle}>{copy.currency}</span>
                  </div>
                  <p className="text-[11px] mt-1 text-[rgba(215,226,234,0.35)] uppercase tracking-wider" style={fontStyle}>{copy.delivery}</p>
                  <p className="text-sm text-[rgba(215,226,234,0.5)] mt-3 leading-relaxed" style={fontStyle}>{copy.desc}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {copy.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: plan.accent }} />
                      <span className="text-sm text-[rgba(215,226,234,0.65)]" style={fontStyle}>{f}</span>
                    </li>
                  ))}
                  {copy.missing.map((f, fi) => (
                    <li key={`m-${fi}`} className="flex items-start gap-2.5 opacity-30">
                      <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[rgba(215,226,234,0.4)]" />
                      <span className="text-sm text-[rgba(215,226,234,0.4)]" style={fontStyle}>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton>
                  <a href={waHref} target="_blank" rel="noopener noreferrer"
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
