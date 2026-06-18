import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BUSINESS, TEAL, DARK } from '../lib/business-data'

gsap.registerPlugin(ScrollTrigger)

export function StoryPinned() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const panels = panelsRef.current.filter(Boolean)
    const ctx = gsap.context(() => {
      // Pin the section for 300vh
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${300 * (panels.length - 1)}vh`,
        pin: true,
        pinSpacing: true,
      })

      // Crossfade panels on scroll
      panels.forEach((panel, i) => {
        if (i === 0) return
        gsap.set(panel, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: container,
          start: `top+=${300 * i}vh top`,
          end: `top+=${300 * (i + 0.8)}vh top`,
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress
            gsap.set(panel, { opacity: p, y: 30 * (1 - p) })
            if (i > 0) gsap.set(panels[i - 1], { opacity: 1 - p })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', background: DARK }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `linear-gradient(${TEAL} 1px, transparent 1px), linear-gradient(90deg, ${TEAL} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {BUSINESS.story.map((panel, i) => (
        <div
          key={i}
          ref={el => { if (el) panelsRef.current[i] = el }}
          className="absolute inset-0 flex items-center justify-center px-8 lg:px-24"
        >
          <div className="max-w-4xl w-full grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 items-center">

            {/* Year pillar */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="text-[80px] lg:text-[120px] font-black leading-none"
                style={{ color: `${TEAL}18`, fontVariantNumeric: 'tabular-nums' }}>
                {panel.year}
              </div>
              <div className="w-12 h-px" style={{ background: TEAL }} />
              <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: `${TEAL}80` }}>
                Chapter {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-col gap-5">
              <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {panel.titleEn}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {panel.textEn}
              </p>
              <p className="text-base leading-relaxed text-right font-light" style={{ color: `${TEAL}70`, fontFamily: 'Tajawal, sans-serif' }}>
                {panel.textAr}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Progress dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {BUSINESS.story.map((_, i) => (
          <div key={i} className="w-1 h-6 rounded-full transition-all duration-300"
            style={{ background: i === 0 ? TEAL : `${TEAL}25` }} />
        ))}
      </div>
    </section>
  )
}
