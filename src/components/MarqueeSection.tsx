import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useLang } from '../contexts/LangContext'

type ServiceRow = { label: string; price: string }
type TileConfig = {
  url: string; label: string; accent: string; bg: string
  heroGradient: string; img: string
  brand: string
  services: ServiceRow[]
}

const row1: TileConfig[] = [
  {
    url: 'luxurysalon.ae', label: 'Beauty & Salon', accent: '#C9A84C', bg: '#0d0a06', brand: 'LUMIÈRE',
    heroGradient: 'linear-gradient(145deg, rgba(26,14,5,0.82) 0%, rgba(106,58,8,0.72) 55%, rgba(201,168,76,0.55) 100%)',
    img: '/images/nounmotion/01-salon-luxury-hero.jpg',
    services: [{ label: 'Signature Cut', price: 'AED 150' }, { label: 'Color & Highlights', price: 'AED 350+' }],
  },
  {
    url: 'dentalpremium.ae', label: 'Dental Clinic', accent: '#00DBFB', bg: '#030c1a', brand: 'DENTAL+',
    heroGradient: 'linear-gradient(145deg, rgba(2,8,16,0.85) 0%, rgba(14,40,96,0.72) 55%, rgba(0,219,251,0.5) 100%)',
    img: '/images/nounmotion/02-dental-clinic-hero.jpg',
    services: [{ label: 'Teeth Whitening', price: 'AED 800' }, { label: 'Implants', price: 'AED 3,500' }],
  },
  {
    url: 'maison-dubai.com', label: 'Fine Restaurant', accent: '#E07820', bg: '#0a0400', brand: 'MAISON',
    heroGradient: 'linear-gradient(145deg, rgba(10,3,0,0.85) 0%, rgba(106,40,0,0.72) 55%, rgba(224,120,32,0.5) 100%)',
    img: '/images/nounmotion/03-restaurant-luxury-hero.jpg',
    services: [{ label: 'Premium Mains', price: 'From AED 120' }, { label: 'Chef Specials', price: 'From AED 95' }],
  },
  {
    url: 'primae.ae', label: 'Real Estate', accent: '#C9A84C', bg: '#020510', brand: 'PRIMAE',
    heroGradient: 'linear-gradient(145deg, rgba(2,3,8,0.88) 0%, rgba(15,31,78,0.75) 55%, rgba(201,168,76,0.5) 100%)',
    img: '/images/nounmotion/04-real-estate-villa-hero.jpg',
    services: [{ label: 'Waterfront Villa', price: 'AED 4.2M' }, { label: 'Sky Penthouse', price: 'AED 8.5M' }],
  },
  {
    url: 'thespa.ae', label: 'Spa & Wellness', accent: '#4a9e6e', bg: '#030a06', brand: 'THE SPA',
    heroGradient: 'linear-gradient(145deg, rgba(2,8,5,0.85) 0%, rgba(13,48,32,0.72) 55%, rgba(74,158,110,0.5) 100%)',
    img: '/images/nounmotion/05-spa-wellness-hero.jpg',
    services: [{ label: 'Deep Tissue', price: 'AED 380' }, { label: 'Hot Stone Ritual', price: 'AED 520' }],
  },
  {
    url: 'premiumgym.ae', label: 'Fitness & Gym', accent: '#BE4C00', bg: '#0a0400', brand: 'APEX GYM',
    heroGradient: 'linear-gradient(145deg, rgba(8,2,0,0.85) 0%, rgba(74,26,0,0.72) 55%, rgba(190,76,0,0.5) 100%)',
    img: '/images/nounmotion/06-gym-wellness-hero.jpg',
    services: [{ label: 'Personal Training', price: 'AED 250/session' }, { label: 'Membership', price: 'AED 299/mo' }],
  },
]

const row2: TileConfig[] = [
  {
    url: 'beauty-clinic.ae', label: 'Aesthetic Clinic', accent: '#7621B0', bg: '#08030e', brand: 'AURA CLINIC',
    heroGradient: 'linear-gradient(145deg, rgba(6,2,12,0.85) 0%, rgba(46,10,88,0.72) 55%, rgba(118,33,176,0.5) 100%)',
    img: '/images/nounmotion/07-beauty-clinic-hero.jpg',
    services: [{ label: 'Laser Facial', price: 'AED 650' }, { label: 'PRP Treatment', price: 'AED 1,200' }],
  },
  {
    url: 'gcc-business.ae', label: 'GCC Business', accent: '#BE4C00', bg: '#080200', brand: 'GCC HUB',
    heroGradient: 'linear-gradient(145deg, rgba(7,1,0,0.85) 0%, rgba(74,21,0,0.72) 55%, rgba(190,76,0,0.5) 100%)',
    img: '/images/nounmotion/08-gcc-business-hero.jpg',
    services: [{ label: 'Corporate Site', price: 'From AED 2,999' }, { label: 'Arabic/English', price: 'Included' }],
  },
  {
    url: 'wellness-brand.ae', label: 'Wellness Brand', accent: '#00DBFB', bg: '#020a0e', brand: 'RENEW',
    heroGradient: 'linear-gradient(145deg, rgba(1,6,8,0.85) 0%, rgba(5,48,64,0.72) 55%, rgba(0,219,251,0.5) 100%)',
    img: '/images/nounmotion/05-spa-wellness-hero.jpg',
    services: [{ label: 'Signature Ritual', price: 'AED 480' }, { label: 'Membership', price: 'AED 299/mo' }],
  },
  {
    url: 'studio-agency.ae', label: 'Agency Studio', accent: '#B600A8', bg: '#0a0010', brand: 'STUDIO',
    heroGradient: 'linear-gradient(145deg, rgba(8,0,16,0.85) 0%, rgba(64,0,80,0.72) 55%, rgba(182,0,168,0.5) 100%)',
    img: '/images/nounmotion/09-agency-studio-hero.jpg',
    services: [{ label: 'Web Design', price: 'From AED 1,499' }, { label: 'Free Preview', price: '$0' }],
  },
  {
    url: 'medical-center.ae', label: 'Healthcare', accent: '#264B9C', bg: '#020510', brand: 'MEDIKA',
    heroGradient: 'linear-gradient(145deg, rgba(1,3,8,0.88) 0%, rgba(10,26,69,0.75) 55%, rgba(38,75,156,0.5) 100%)',
    img: '/images/nounmotion/02-dental-clinic-hero.jpg',
    services: [{ label: 'Consultation', price: 'Free First Visit' }, { label: 'Emergency Care', price: '24h Available' }],
  },
  {
    url: 'gym-studio.ae', label: 'Fitness Club', accent: '#BE4C00', bg: '#080200', brand: 'POWERFIT',
    heroGradient: 'linear-gradient(145deg, rgba(6,1,0,0.85) 0%, rgba(58,18,0,0.72) 55%, rgba(190,76,0,0.5) 100%)',
    img: '/images/nounmotion/06-gym-wellness-hero.jpg',
    services: [{ label: 'Group Classes', price: 'AED 149/mo' }, { label: 'Personal Trainer', price: 'AED 220/session' }],
  },
]

function CinematicTile({ tile }: { tile: TileConfig }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5, zIndex: 10 }}
      transition={{ duration: 0.22 }}
      className="relative shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: '220px', background: tile.bg, border: `1px solid ${tile.accent}28`, boxShadow: `0 20px 60px rgba(0,0,0,0.65), 0 0 30px ${tile.accent}10` }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ background: 'rgba(0,0,0,0.85)', borderBottom: `1px solid ${tile.accent}15` }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#28c840' }} />
        <div className="flex-1 mx-1.5 h-3.5 rounded flex items-center px-1.5 gap-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <svg width="6" height="6" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={tile.accent} opacity="0.7"/></svg>
          <span className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{tile.url}</span>
        </div>
        <span className="text-[6px] font-bold px-1 py-0.5 rounded" style={{ color: tile.accent, background: tile.accent + '18' }}>LIVE</span>
      </div>

      {/* Mini website */}
      <div className="flex flex-col" style={{ height: 'calc(100% - 26px)' }}>
        {/* Fake nav strip */}
        <div className="flex items-center justify-between px-3 py-1.5 shrink-0" style={{ background: tile.bg, borderBottom: `1px solid ${tile.accent}10` }}>
          <div className="text-[8px] font-black" style={{ color: tile.accent }}>{tile.brand}</div>
          <div className="flex gap-2">
            {['Home', 'Services', 'Book'].map((n) => (
              <span key={n} className="text-[6.5px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{n}</span>
            ))}
          </div>
          <div className="h-4 w-10 rounded-full text-[6px] font-bold flex items-center justify-center"
            style={{ background: tile.accent + '30', color: tile.accent, border: `1px solid ${tile.accent}40` }}>Book</div>
        </div>

        {/* Hero with real photo */}
        <div className="relative overflow-hidden shrink-0" style={{ height: '90px' }}>
          <img src={tile.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(1.1)' }} />
          <div className="absolute inset-0" style={{ background: tile.heroGradient }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
          <div className="absolute inset-0 p-2.5 flex flex-col justify-end gap-1">
            <div className="h-2 rounded-full" style={{ width: '62%', background: 'rgba(255,255,255,0.88)' }} />
            <div className="h-1.5 rounded-full" style={{ width: '45%', background: 'rgba(255,255,255,0.4)' }} />
            <div className="flex gap-1.5 mt-1">
              <div className="h-4 w-16 rounded-full flex items-center justify-center text-[6px] font-bold"
                style={{ background: tile.accent, color: '#fff' }}>Book Now</div>
              <div className="h-4 w-11 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.25)' }} />
            </div>
          </div>
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full blur-xl opacity-45" style={{ background: tile.accent }} />
        </div>

        {/* Services section */}
        <div className="flex-1 px-2.5 py-2 flex flex-col gap-1.5" style={{ background: tile.bg }}>
          <div className="text-[6.5px] font-bold uppercase tracking-wider mb-0.5" style={{ color: tile.accent + '70' }}>Services</div>
          {tile.services.map((svc, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-lg"
              style={{ background: i === 0 ? tile.accent + '12' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? tile.accent + '28' : 'rgba(255,255,255,0.06)'}` }}>
              <span className="text-[7px] font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>{svc.label}</span>
              <span className="text-[7px] font-bold" style={{ color: tile.accent }}>{svc.price}</span>
            </div>
          ))}

          {/* WhatsApp CTA strip */}
          <div className="flex items-center gap-1.5 mt-auto px-2 py-1.5 rounded-xl"
            style={{ background: 'rgba(37,211,102,0.09)', border: '1px solid rgba(37,211,102,0.22)' }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#25D366' }} />
            <span className="text-[6.5px] font-semibold" style={{ color: 'rgba(37,211,102,0.85)' }}>Chat on WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Niche label */}
      <div className="absolute top-8 left-2.5">
        <span className="text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: tile.accent + '22', color: tile.accent, border: `1px solid ${tile.accent}35` }}>
          {tile.label}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${tile.accent}70, transparent)` }} />
    </motion.div>
  )
}

function GSAPMarqueeRow({ items, direction = 1, speed = 45 }: { items: TileConfig[]; direction?: 1 | -1; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const totalWidth = el.scrollWidth / 3
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: direction === 1 ? 0 : -totalWidth },
        { x: direction === 1 ? -totalWidth : 0, duration: speed, ease: 'none', repeat: -1 }
      )
    })
    return () => ctx.revert()
  }, [direction, speed])

  const tripled = [...items, ...items, ...items]

  return (
    <div className="flex overflow-hidden select-none">
      <div ref={trackRef} className="flex gap-4 shrink-0">
        {tripled.map((tile, i) => <CinematicTile key={i} tile={tile} />)}
      </div>
    </div>
  )
}

export function MarqueeSection() {
  const { t } = useLang()

  return (
    <section className="py-24 lg:py-32 overflow-clip" style={{ background: '#0C0C0C' }}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-3">{t.marquee.eyebrow}</p>
          <h2 className="text-xl font-bold text-[rgba(215,226,234,0.22)] uppercase tracking-widest">{t.marquee.heading}</h2>
        </motion.div>
      </div>
      <div className="flex flex-col gap-4">
        <GSAPMarqueeRow items={row1} direction={1} speed={52} />
        <GSAPMarqueeRow items={row2} direction={-1} speed={44} />
      </div>
    </section>
  )
}
