import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIERS, CURRENCY } from '../lib/pricing'
import { BUSINESS, TEAL, DARK, MUTED } from '../lib/business-data'

export function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="pricing" ref={ref} className="py-24 lg:py-36 px-6 lg:px-16"
      style={{ background: DARK }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6">
          <p className="text-[11px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: TEAL }}>
            Transparent Pricing
          </p>
          <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Your Website,<br />
            <span style={{ color: TEAL }}>Your Budget</span>
          </h2>
          {/* Free preview banner */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full mt-4"
            style={{ background: `${TEAL}14`, border: `1px solid ${TEAL}35` }}>
            <div className="w-2 h-2 rounded-full" style={{ background: TEAL }} />
            <span className="text-sm font-semibold" style={{ color: TEAL }}>
              Free homepage preview — 0 {CURRENCY}
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-5 mt-14">
          {TIERS.map((tier, i) => {
            const waMsg = tier.waMessage(BUSINESS.nameEn)
            const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: tier.highlighted ? TEAL : 'rgba(255,255,255,0.04)',
                  border: tier.highlighted ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  transform: tier.highlighted ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: tier.highlighted ? `0 0 80px ${TEAL}30, 0 30px 60px rgba(0,0,0,0.5)` : 'none',
                }}
              >
                {tier.badge && (
                  <div className="px-4 py-2 text-center"
                    style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: tier.highlighted ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)' }}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1 gap-5">
                  {/* Tier name & price */}
                  <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-2"
                      style={{ color: tier.highlighted ? 'rgba(255,255,255,0.7)' : `${TEAL}90` }}>
                      {tier.nameEn}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black"
                        style={{ color: tier.highlighted ? '#fff' : 'rgba(255,255,255,0.9)' }}>
                        {tier.price.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium"
                        style={{ color: tier.highlighted ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}>
                        {CURRENCY}
                      </span>
                    </div>
                    {tier.originalPrice && (
                      <p className="text-sm mt-1 line-through"
                        style={{ color: tier.highlighted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }}>
                        {tier.originalPrice.toLocaleString()} {CURRENCY}
                      </p>
                    )}
                    <p className="text-[11px] mt-1.5"
                      style={{ color: tier.highlighted ? 'rgba(255,255,255,0.6)' : MUTED }}>
                      Delivered in {tier.deliveryDays} days · {tier.revisions} revision{tier.revisions > 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                          style={{ background: tier.highlighted ? 'rgba(255,255,255,0.2)' : `${TEAL}20`, color: tier.highlighted ? '#fff' : TEAL }}>
                          ✓
                        </span>
                        <span style={{ color: tier.highlighted ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)' }}>
                          {f.en}
                        </span>
                      </li>
                    ))}
                    {tier.missing.map((f, fi) => (
                      <li key={`m-${fi}`} className="flex items-start gap-2.5 text-sm opacity-35">
                        <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                          —
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>{f.en}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-bold tracking-[0.1em] uppercase transition-all duration-200"
                    style={{
                      background: tier.highlighted ? '#fff' : `${TEAL}18`,
                      color: tier.highlighted ? TEAL : 'rgba(255,255,255,0.8)',
                      border: tier.highlighted ? 'none' : `1px solid ${TEAL}35`,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Get Started on WhatsApp
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-[12px] mt-8"
          style={{ color: 'rgba(255,255,255,0.25)' }}>
          All prices include VAT. Free preview available before commitment. Payments in {CURRENCY}.
        </motion.p>
      </div>
    </section>
  )
}
