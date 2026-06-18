import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TEAL, DARK } from '../lib/business-data'

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
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    // Initial state
    gsap.set(logoRef.current, { scale: 0.85, opacity: 0, filter: 'blur(12px)' })
    gsap.set(tagRef.current, { opacity: 0, y: 12 })
    gsap.set(barRef.current, { opacity: 0 })

    tl
      // Logo reveal
      .to(logoRef.current, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, 0.2)
      .to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.7)
      .to(barRef.current, { opacity: 1, duration: 0.3 }, 0.9)
      // Loading bar fill
      .fromTo(barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut', transformOrigin: 'left center' },
        1.0
      )
      // Wipe exit upward
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
      }, 2.1)
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{ background: DARK }}
    >
      {/* Logo */}
      <div ref={logoRef} className="flex flex-col items-center gap-3 mb-10">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="25" stroke={TEAL} strokeWidth="1.5" />
          <circle cx="26" cy="26" r="18" stroke={TEAL} strokeWidth="0.5" opacity="0.4" />
          <path d="M26 14 L32 22 L26 38 L20 22 Z" fill={TEAL} opacity="0.9" />
          <circle cx="26" cy="26" r="3" fill={TEAL} />
        </svg>
        <div className="text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: TEAL }}>
            CELESTIA
          </p>
          <p className="text-white text-[22px] font-light tracking-[0.15em] uppercase mt-0.5">
            DENTAL
          </p>
        </div>
      </div>

      <p ref={tagRef} className="text-[11px] tracking-[0.3em] uppercase mb-8"
        style={{ color: 'rgba(255,255,255,0.35)' }}>
        Kuwait City · Est. 2008
      </p>

      {/* Loading bar */}
      <div ref={barRef} className="w-48 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div ref={barFillRef} className="h-full" style={{ background: TEAL, transformOrigin: 'left' }} />
      </div>
    </div>
  )
}
