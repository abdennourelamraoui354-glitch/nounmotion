import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GOLD, DARK_BG, BUSINESS } from '../lib/business-data';

interface Props {
  onComplete: () => void;
}

export function CinematicPreloader({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    gsap.set(logoRef.current, { scale: 0.85, opacity: 0, filter: 'blur(12px)' });
    gsap.set(tagRef.current, { opacity: 0, y: 12 });
    gsap.set(barRef.current, { opacity: 0 });

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
      .to(overlayRef.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, 2.1);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-[9999]"
      style={{ background: DARK_BG }}
    >
      <div ref={logoRef} className="flex flex-col items-center gap-3 mb-10">
        {/* Marina wave logo mark */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="28" cy="28" r="20" stroke={GOLD} strokeWidth="0.5" opacity="0.35" />
          {/* Wave mark */}
          <path
            d="M16 30 Q20 25 24 30 Q28 35 32 30 Q36 25 40 30"
            stroke={GOLD}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M16 35 Q20 30 24 35 Q28 40 32 35 Q36 30 40 35"
            stroke={GOLD}
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          <circle cx="28" cy="22" r="2.5" fill={GOLD} opacity="0.9" />
        </svg>
        <div className="text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase font-medium" style={{ color: GOLD }}>
            {BUSINESS.nameEn}
          </p>
          <p
            className="text-white text-[24px] font-light tracking-[0.08em] mt-1"
            style={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            {BUSINESS.nameAr}
          </p>
        </div>
      </div>

      <p
        ref={tagRef}
        className="text-[11px] tracking-[0.3em] uppercase mb-8"
        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}
      >
        Al Mouj Marina · Muscat, Oman
      </p>

      <div ref={barRef} className="w-48 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          ref={barFillRef}
          className="h-full"
          style={{ background: GOLD, transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
}
