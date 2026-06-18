import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS, GOLD, CREAM } from '../lib/business-data';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMG = BUSINESS.galleryImages[0]?.src ?? '';

function GalleryCard({ img, i, mobile }: { img: (typeof BUSINESS.galleryImages)[0]; i: number; mobile?: boolean }) {
  return (
    <div
      className={`relative flex-shrink-0 rounded-2xl overflow-hidden ${mobile ? 'snap-center' : ''}`}
      style={{
        width: mobile ? 'min(78vw, 300px)' : i % 2 === 0 ? 380 : 280,
        height: mobile ? 360 : i % 2 === 0 ? 480 : 360,
        border: `1px solid ${GOLD}20`,
      }}
    >
      <img
        src={img.src}
        alt={img.caption}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.7) 0%, transparent 60%)' }} />
      <div className="absolute bottom-4 left-4 right-4">
        <span className="text-sm tracking-widest uppercase" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
          {img.caption}
        </span>
      </div>
    </div>
  );
}

export function AtmosphereGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth * 0.88),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${Math.min(track.scrollWidth * 0.7, window.innerHeight * 2.5)}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={containerRef} className="relative overflow-hidden md:h-[100dvh]" style={{ background: '#060504' }}>
      <div className="pt-12 pb-6 md:absolute md:top-12 md:left-0 md:right-0 z-10 flex flex-col items-center pointer-events-none">
        <p className="text-sm tracking-[0.4em] uppercase mb-2" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
          Atmosphere · الأجواء
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: CREAM, fontWeight: 300 }}>
          Feel The Space
        </h2>
      </div>

      {/* Mobile scroll-snap */}
      <div
        className="md:hidden flex gap-4 overflow-x-auto px-5 pb-8 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: 20, WebkitOverflowScrolling: 'touch' }}
      >
        {BUSINESS.galleryImages.map((img, i) => (
          <GalleryCard key={i} img={img} i={i} mobile />
        ))}
      </div>

      {/* Desktop GSAP scrub */}
      <div
        ref={trackRef}
        className="hidden md:flex absolute top-0 left-0 h-full items-center gap-6 pl-[8vw] pr-[20vw]"
        style={{ paddingTop: 100 }}
      >
        {BUSINESS.galleryImages.map((img, i) => (
          <GalleryCard key={i} img={img} i={i} />
        ))}

        <div
          className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl px-12"
          style={{ width: 300, height: 400, border: `1px solid ${GOLD}30`, background: 'rgba(201,169,110,0.05)' }}
        >
          <span style={{ fontFamily: 'Cormorant Garamond, serif', color: GOLD, fontSize: 48, fontWeight: 300 }}>✦</span>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', color: CREAM, fontSize: 24, fontWeight: 300, textAlign: 'center', marginTop: 16 }}>
            Visit Us
          </p>
          <p style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}CC`, marginTop: 8, direction: 'rtl' }}>
            زورونا
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: `${CREAM}60`, fontSize: 12, marginTop: 8, textAlign: 'center' }}>
            {BUSINESS.address}
          </p>
        </div>
      </div>
    </section>
  );
}
