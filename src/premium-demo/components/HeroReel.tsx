import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { BUSINESS, TEAL, TEAL_LIGHT, DARK } from '../lib/business-data'
import { MagneticButton } from './MagneticButton'

// ── Particles ─────────────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 4,
    opacity: Math.random() * 0.5 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 4 === 0 ? TEAL_LIGHT : TEAL,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Light Beams ───────────────────────────────────────────────────────────────
function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { angle: -25, left: '20%', delay: 0 },
        { angle: -10, left: '40%', delay: 1.5 },
        { angle: 8,   left: '65%', delay: 0.8 },
        { angle: 20,  left: '80%', delay: 2.2 },
      ].map((beam, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{
            left: beam.left,
            width: '1px',
            height: '55%',
            background: `linear-gradient(to bottom, ${TEAL}35 0%, ${TEAL}08 60%, transparent 100%)`,
            transform: `rotate(${beam.angle}deg)`,
            transformOrigin: 'top center',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, delay: beam.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Central radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${TEAL}18 0%, transparent 65%)` }} />
    </div>
  )
}

// ── Orbit Object ─────────────────────────────────────────────────────────────
function OrbitObject3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = containerRef.current
    const inner = innerRef.current
    if (!el || !inner) return

    // Continuous Y rotation
    const ctx = gsap.context(() => {
      gsap.to(inner, {
        rotationY: 360,
        duration: 18,
        ease: 'none',
        repeat: -1,
      })
      gsap.to(el, {
        y: -14,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    // Mouse parallax
    const handleMouse = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX / rect.width) - 0.5) * 30
      mouseRef.current.y = ((e.clientY / rect.height) - 0.5) * 20
      gsap.to(el, {
        rotationX: -mouseRef.current.y * 0.5,
        rotationY: mouseRef.current.x * 0.5,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    window.addEventListener('mousemove', handleMouse)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  const labels = BUSINESS.orbitLabels
  const radius = 95

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: '260px', height: '260px', perspective: '800px' }}
    >
      {/* Central tooth icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${TEAL}18 0%, ${TEAL}30 100%)`,
            border: `1.5px solid ${TEAL}50`,
            boxShadow: `0 0 40px ${TEAL}20, inset 0 1px 0 ${TEAL}30`,
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            {/* Simplified tooth shape */}
            <path
              d="M19 4C15.5 4 12 6 11 9C9 8 7 9 6 11C5 13 5 16 6 18C7 22 8 28 9 31C10 33 11 34 12.5 34C14 34 15 33 15.5 32C16 31 17 30 19 30C21 30 22 31 22.5 32C23 33 24 34 25.5 34C27 34 28 33 29 31C30 28 31 22 32 18C33 16 33 13 32 11C31 9 29 8 27 9C26 6 22.5 4 19 4Z"
              fill={TEAL}
              opacity="0.85"
            />
          </svg>
        </motion.div>
      </div>

      {/* Orbit ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute rounded-full"
          style={{
            width: `${radius * 2}px`, height: `${radius * 2}px`,
            border: `1px dashed ${TEAL}22`,
          }} />
      </div>

      {/* Orbiting labels */}
      <div ref={innerRef} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {labels.map((label, i) => {
          const angle = (i / labels.length) * 2 * Math.PI
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius * 0.4  // flatten to ellipse
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
                style={{
                  background: `${TEAL}14`,
                  border: `1px solid ${TEAL}35`,
                  color: TEAL,
                  backdropFilter: 'blur(8px)',
                }}>
                {label.en}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Hero section ──────────────────────────────────────────────────────────────
export function HeroReel() {
  const bgRef = useRef<HTMLDivElement>(null)
  const slide = BUSINESS.heroSlides[0]
  const [ready, setReady] = useState(false)

  useEffect(() => { setReady(true) }, [])

  useEffect(() => {
    if (!bgRef.current) return
    const ctx = gsap.context(() => {
      // Ken Burns
      gsap.fromTo(bgRef.current,
        { scale: 1 },
        { scale: 1.12, duration: 14, ease: 'none', repeat: -1, yoyo: true }
      )
    })
    return () => ctx.revert()
  }, [])

  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello! I'd like a free consultation at Celestia Dental.")}`

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: DARK }}>

      {/* Ken Burns background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src={slide.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.22) saturate(0.9)' }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${DARK}f0 0%, ${DARK}cc 40%, ${DARK}60 70%, ${TEAL}08 100%)` }} />

      {/* Top teal gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)` }} />

      <LightBeams />
      <Particles />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 lg:px-16 py-6 z-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2, duration: 0.6 }}>
          <span className="text-sm font-light tracking-[0.35em] uppercase" style={{ color: TEAL }}>CELESTIA</span>
          <span className="text-sm font-light tracking-[0.35em] uppercase text-white ml-2">DENTAL</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.6 }}
          className="hidden md:flex items-center gap-8">
          {['Services', 'About', 'Gallery', 'Pricing', 'Location'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`}
              className="text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200 hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.45)' }}>
              {n}
            </a>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.4, duration: 0.6 }}>
          <MagneticButton>
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-all duration-200"
              style={{ background: `${TEAL}20`, border: `1px solid ${TEAL}60`, color: TEAL }}>
              Free Preview
            </a>
          </MagneticButton>
        </motion.div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-8 lg:px-16 pt-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center min-h-[calc(100vh-8rem)]">

          {/* Copy */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.7 }}
                className="flex items-center gap-3">
                <div className="w-8 h-px" style={{ background: TEAL }} />
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase" style={{ color: TEAL }}>
                  Kuwait City · Est. 2008
                </span>
              </motion.div>
            )}

            {/* Headline — word stagger */}
            <div className="overflow-hidden">
              {slide.headlineEn.split('\n').map((line, li) => (
                <div key={li} className="overflow-hidden">
                  {ready && line.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ delay: 2.4 + li * 0.12 + ci * 0.018, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block text-white font-black uppercase leading-none"
                      style={{
                        fontSize: 'clamp(52px, 8vw, 96px)',
                        letterSpacing: '-0.03em',
                        whiteSpace: char === ' ' ? 'pre' : undefined,
                      }}
                    >
                      {char === ' ' ? ' ' : char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>

            {ready && (
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.9, duration: 0.7 }}
                className="text-lg leading-relaxed max-w-lg"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
                {slide.subEn}
              </motion.p>
            )}

            {/* CTAs */}
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.1, duration: 0.6 }}
                className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a href={waHref} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full text-sm font-bold tracking-[0.12em] uppercase px-8 py-4 transition-all duration-300"
                    style={{
                      background: TEAL, color: '#fff',
                      boxShadow: `0 0 40px ${TEAL}40`,
                    }}>
                    <span className="w-2 h-2 rounded-full bg-white/50" />
                    Book Free Consultation
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="#services"
                    className="inline-flex items-center gap-2 rounded-full text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4 transition-all duration-200"
                    style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}>
                    View Services
                  </a>
                </MagneticButton>
              </motion.div>
            )}

            {/* Proof stats */}
            {ready && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 3.4, duration: 0.6 }}
                className="flex gap-10 pt-4">
                {[
                  { v: '8,000+', l: 'Patients' },
                  { v: '4.9★', l: 'Rating' },
                  { v: '2008', l: 'Founded' },
                ].map(stat => (
                  <div key={stat.l}>
                    <p className="text-2xl font-black" style={{ color: TEAL }}>{stat.v}</p>
                    <p className="text-[11px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.l}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* 3D Orbit Object */}
          {ready && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center relative">
              <div className="absolute inset-0 blur-[60px] pointer-events-none"
                style={{ background: `radial-gradient(ellipse, ${TEAL}20 0%, transparent 70%)` }} />
              <OrbitObject3D />
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {ready && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
        </motion.div>
      )}
    </section>
  )
}
