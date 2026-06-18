import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GOLD, DARK_BG, BUSINESS } from '../lib/business-data'

interface Props {
  onComplete: () => void
}

export function CinematicPreloader({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete })

    gsap.set(logoRef.current, { scale: 0.85, opacity: 0, filter: 'blur(12px)' })
    gsap.set(tagRef.current, { opacity: 0, y: 12 })
    gsap.set(barRef.current, { opacity: 0 })

    tl
      .to(logoRef.current, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, 0.2)
      .to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.7)
      .to(barRef.current, { opacity: 1, duration: 0.3 }, 0.9)
      .fromTo(
        barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut', transformOrigin: 'left center' },
        1.0
      )
      .to(overlayRef.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, 2.1)
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{ background: DARK_BG }}
    >
      <div ref={logoRef} className="flex flex-col items-center gap-4 mb-10">
        {/* Asian-inspired logo mark */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="28" cy="28" r="19" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
          {/* Chopsticks cross motif */}
          <line x1="18" y1="16" x2="34" y2="42" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="16" x2="38" y2="42" stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <circle cx="28" cy="28" r="3" fill={GOLD} />
        </svg>
        <div className="text-center">
          <p className="text-[10px] tracking-[0.45em] uppercase font-medium" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
            {BUSINESS.cuisine.split('·')[0].trim()}
          </p>
          <p className="text-white text-[22px] font-light tracking-[0.12em] uppercase mt-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            FOODPARK
          </p>
        </div>
      </div>

      <p
        ref={tagRef}
        className="text-[11px] tracking-[0.3em] uppercase mb-8"
        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}
      >
        {BUSINESS.city} · Est. {BUSINESS.established}
      </p>

      <div ref={barRef} className="w-48 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div ref={barFillRef} className="h-full" style={{ background: GOLD, transformOrigin: 'left' }} />
      </div>
    </div>
  )
}
