import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { BUSINESS, TEAL } from '../lib/business-data'

interface Props {
  inverted?: boolean
  className?: string
}

export function MarqueeStrip({ inverted = false, className = '' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const totalWidth = el.scrollWidth / 3
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: inverted ? -totalWidth : 0 },
        { x: inverted ? 0 : -totalWidth, duration: 28, ease: 'none', repeat: -1 }
      )
    })
    return () => ctx.revert()
  }, [inverted])

  const items = [...BUSINESS.marqueeItems, ...BUSINESS.marqueeItems, ...BUSINESS.marqueeItems]

  return (
    <div className={`overflow-hidden select-none py-3 ${className}`}
      style={{ background: inverted ? 'rgba(14,165,169,0.06)' : 'transparent', borderTop: `1px solid ${TEAL}15`, borderBottom: `1px solid ${TEAL}15` }}>
      <div ref={trackRef} className="flex items-center gap-0 shrink-0 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: i % 3 === 0 ? TEAL : 'rgba(13,17,23,0.38)' }}>
            {item}
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: TEAL, opacity: 0.4 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
