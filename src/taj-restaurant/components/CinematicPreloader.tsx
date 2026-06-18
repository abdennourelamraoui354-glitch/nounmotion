import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GOLD, DARK_BG } from '../lib/business-data'

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
      .fromTo(barFillRef.current,
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
        {/* Crown / Taj motif */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="28" cy="28" r="20" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
          <path d="M14 38 L14 29 L20 34 L28 18 L36 34 L42 29 L42 38 Z" fill={GOLD} opacity="0.9" />
          <rect x="14" y="38" width="28" height="3" rx="1.5" fill={GOLD} opacity="0.6" />
        </svg>
        <div className="text-center">
          <p className="text-[10px] tracking-[0.45em] uppercase font-medium" style={{ color: GOLD }}>
            TAJ RESTAURANT
          </p>
          <p className="font-bold tracking-wider mt-0.5" style={{ fontFamily: 'Tajawal, sans-serif', color: GOLD, fontSize: 18 }}>
            مطعم تاج
          </p>
        </div>
      </div>

      <p ref={tagRef} className="text-[11px] tracking-[0.3em] uppercase mb-8"
        style={{ color: 'rgba(255,255,255,0.35)' }}>
        Muscat, Oman · Est. 2005
      </p>

      <div ref={barRef} className="w-48 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div ref={barFillRef} className="h-full" style={{ background: GOLD, transformOrigin: 'left' }} />
      </div>
    </div>
  )
}
