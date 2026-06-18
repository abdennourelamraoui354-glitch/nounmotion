import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BUSINESS, TEAL, DARK } from '../lib/business-data'

gsap.registerPlugin(ScrollTrigger)

export function GalleryHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      // Calculate how far to scroll: from 8% to -60% (full track width minus viewport)
      const totalWidth = track.scrollWidth
      const viewWidth = window.innerWidth
      const distance = -(totalWidth - viewWidth * 0.92)

      gsap.fromTo(track,
        { x: '8%' },
        {
          x: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: `+=${totalWidth * 0.7}px`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="overflow-hidden"
      style={{ background: DARK }}
    >
      <div className="h-screen flex flex-col justify-center">
        {/* Label */}
        <div className="px-8 lg:px-16 mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-2" style={{ color: TEAL }}>
              Inside The Clinic
            </p>
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white">
              Gallery
            </h2>
          </div>
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Drag →
          </p>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex gap-5 pl-8 lg:pl-16" style={{ width: 'max-content' }}>
          {BUSINESS.galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex-shrink-0 group"
              style={{
                width: i === 0 ? '520px' : '360px',
                height: i === 0 ? '360px' : '280px',
                marginTop: i % 2 === 0 ? '0' : '40px',
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.78)' }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.7) 0%, transparent 50%)' }} />
              <div className="absolute bottom-4 left-4">
                <span className="text-[11px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {img.caption}
                </span>
              </div>
              {/* Hover teal border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: `1.5px solid ${TEAL}50` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
