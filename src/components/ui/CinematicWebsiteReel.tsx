import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {
  Scissors, Palette, Sparkles, Gem, Stethoscope, Star, Shield,
  UtensilsCrossed, Flame, Leaf, Heart, Activity, Home, Building2,
  Globe, Smartphone, MessageCircle, Zap, Dumbbell, Trophy, Coffee,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  scissors: Scissors, palette: Palette, sparkles: Sparkles, gem: Gem,
  stethoscope: Stethoscope, star: Star, shield: Shield,
  utensils: UtensilsCrossed, flame: Flame, leaf: Leaf,
  heart: Heart, activity: Activity, home: Home, building: Building2,
  globe: Globe, smartphone: Smartphone, message: MessageCircle, zap: Zap,
  dumbbell: Dumbbell, trophy: Trophy, coffee: Coffee,
}

type StatItem = { value: string; label: string }
type ServiceItem = { icon: string; title: string; price: string }
type ListingItem = { name: string; price: string; sub: string }

type ReelSection =
  | { type: 'stats'; items: StatItem[] }
  | { type: 'services'; items: ServiceItem[] }
  | { type: 'strip'; gradient: string; height?: number; image?: string }
  | { type: 'cta'; text: string; btn: string }
  | { type: 'testimonial'; quote: string; author: string }
  | { type: 'listings'; items: ListingItem[] }
  | { type: 'form'; title: string }
  | { type: 'trust'; items: string[] }

export interface ReelConfig {
  url: string
  brand: string
  navLinks: string[]
  accent: string
  accent2?: string
  bg: string
  heroGradient: string
  heroImage?: string
  heroHeadline: string
  heroSub: string
  heroCta: string
  textColor: string
  sections: ReelSection[]
}

export const reelConfigs: Record<string, ReelConfig> = {
  salon: {
    url: 'salon-lumiere.ae',
    brand: 'SALON LUMIÈRE',
    navLinks: ['Services', 'Gallery', 'Prices', 'Book'],
    accent: '#C9A84C',
    accent2: '#9b4f96',
    bg: '#0d0a06',
    heroGradient: 'linear-gradient(160deg, #1a0e05 0%, #4a2a0a 40%, #9a6010 80%, #C9A84C 130%)',
    heroImage: '/images/nounmotion/01-salon-luxury-hero.jpg',
    heroHeadline: 'WHERE BEAUTY\nMEETS PERFECTION',
    heroSub: "Dubai's most-loved luxury beauty salon",
    heroCta: 'Book via WhatsApp',
    textColor: '#f5ece0',
    sections: [
      { type: 'stats', items: [{ value: '5★', label: 'Rating' }, { value: '2,000+', label: 'Clients' }, { value: '12 yrs', label: 'Est.' }] },
      { type: 'services', items: [
        { icon: 'scissors', title: 'Signature Cut & Style', price: 'AED 150' },
        { icon: 'palette', title: 'Color & Highlights', price: 'AED 350+' },
        { icon: 'sparkles', title: 'Keratin Treatment', price: 'AED 450+' },
        { icon: 'gem', title: 'Nail Art & Gel', price: 'AED 120' },
      ]},
      { type: 'strip', gradient: 'linear-gradient(135deg, #3d1a00, #C9A84C 50%, #9b4f96)', image: '/images/nounmotion/01-salon-luxury-hero.jpg' },
      { type: 'testimonial', quote: 'Best salon in Dubai. Stunning results every single visit.', author: 'Sarah K. — Dubai' },
      { type: 'cta', text: 'Book your complimentary consultation today', btn: 'Book via WhatsApp' },
    ],
  },

  dental: {
    url: 'dentalpremium.ae',
    brand: 'DENTAL PREMIUM',
    navLinks: ['Treatments', 'Doctors', 'Appointments', 'Contact'],
    accent: '#00DBFB',
    accent2: '#264B9C',
    bg: '#030c1a',
    heroGradient: 'linear-gradient(160deg, #020810 0%, #071535 40%, #0e2860 80%, #00DBFB 160%)',
    heroImage: '/images/nounmotion/02-dental-clinic-hero.jpg',
    heroHeadline: 'YOUR SMILE,\nOUR PRIORITY',
    heroSub: 'Advanced dental care across the GCC — trusted by 10,000+ patients',
    heroCta: 'Book Appointment',
    textColor: '#e8f4ff',
    sections: [
      { type: 'stats', items: [{ value: '15 yrs', label: 'Experience' }, { value: '10K+', label: 'Patients' }, { value: '98%', label: 'Satisfaction' }] },
      { type: 'services', items: [
        { icon: 'star', title: 'Teeth Whitening', price: 'AED 800' },
        { icon: 'activity', title: 'Dental Implants', price: 'AED 3,500' },
        { icon: 'stethoscope', title: 'Orthodontics', price: 'AED 6,000' },
        { icon: 'shield', title: 'Deep Cleaning', price: 'AED 300' },
      ]},
      { type: 'trust', items: ['ISO Certified', 'Free Consultation', '24h Emergency', '5-Star Rated'] },
      { type: 'testimonial', quote: 'Painless, professional, and incredibly thorough. Highly recommended.', author: 'Mohammed A. — Abu Dhabi' },
      { type: 'cta', text: 'New patient special — free first consultation', btn: 'Book Appointment' },
    ],
  },

  restaurant: {
    url: 'maison-dubai.com',
    brand: 'MAISON',
    navLinks: ['Menu', 'Reserve', 'Atmosphere', 'Location'],
    accent: '#E07820',
    accent2: '#C9A84C',
    bg: '#0a0400',
    heroGradient: 'linear-gradient(160deg, #0a0300 0%, #3d1200 40%, #8a3500 80%, #E07820 140%)',
    heroImage: '/images/nounmotion/03-restaurant-luxury-hero.jpg',
    heroHeadline: 'AN EXPERIENCE\nBEYOND DINING',
    heroSub: 'Fine dining in the heart of Dubai — reserve your table tonight',
    heroCta: 'Reserve a Table',
    textColor: '#f5e8d0',
    sections: [
      { type: 'services', items: [
        { icon: 'leaf', title: 'Cold Starters', price: 'From AED 45' },
        { icon: 'flame', title: 'Premium Mains', price: 'From AED 120' },
        { icon: 'coffee', title: 'French Desserts', price: 'From AED 65' },
        { icon: 'utensils', title: 'Chef Specials', price: 'From AED 95' },
      ]},
      { type: 'strip', gradient: 'linear-gradient(135deg, #3d1200 0%, #8a3500 50%, #E07820 100%)', height: 70, image: '/images/nounmotion/03-restaurant-luxury-hero.jpg' },
      { type: 'stats', items: [{ value: '7PM', label: 'Opens Daily' }, { value: 'DT', label: 'Location' }, { value: '5★', label: 'TripAdvisor' }] },
      { type: 'cta', text: 'Reserve your table — limited seats nightly', btn: 'Reserve via WhatsApp' },
      { type: 'testimonial', quote: 'The most stunning dining experience in Dubai. We return every month.', author: 'Emma L. — UK Guest' },
    ],
  },

  realestate: {
    url: 'primae-properties.ae',
    brand: 'PRIMAE',
    navLinks: ['Buy', 'Rent', 'Projects', 'Contact'],
    accent: '#C9A84C',
    accent2: '#264B9C',
    bg: '#020510',
    heroGradient: 'linear-gradient(160deg, #020308 0%, #07102a 40%, #0f1f4e 80%, #C9A84C 170%)',
    heroImage: '/images/nounmotion/04-real-estate-villa-hero.jpg',
    heroHeadline: 'LUXURY LIVING\nREDEFINED',
    heroSub: 'Premier properties across UAE — exclusive access to off-plan & ready units',
    heroCta: 'View Listings',
    textColor: '#e0e8f5',
    sections: [
      { type: 'listings', items: [
        { name: 'Waterfront Villa', price: 'AED 4.2M', sub: 'Palm Jumeirah · 5 BR · Pool' },
        { name: 'Sky Penthouse', price: 'AED 8.5M', sub: 'Downtown Dubai · 4 BR · Burj View' },
        { name: 'Garden Apartment', price: 'AED 1.8M', sub: 'Dubai Marina · 2 BR · Sea View' },
      ]},
      { type: 'stats', items: [{ value: '250+', label: 'Properties' }, { value: 'AED 1B+', label: 'Sold' }, { value: '10 yrs', label: 'Experience' }] },
      { type: 'cta', text: 'Schedule a private property viewing', btn: 'Contact Our Agent' },
      { type: 'form', title: 'Request a Property Inquiry' },
    ],
  },

  spa: {
    url: 'thespa.ae',
    brand: 'THE SPA',
    navLinks: ['Treatments', 'Book', 'Membership', 'Gift'],
    accent: '#4a9e6e',
    accent2: '#00DBFB',
    bg: '#030a06',
    heroGradient: 'linear-gradient(160deg, #020805 0%, #061a0d 40%, #0d3020 80%, #4a9e6e 150%)',
    heroImage: '/images/nounmotion/05-spa-wellness-hero.jpg',
    heroHeadline: 'RESTORE.\nRENEW. RELAX.',
    heroSub: 'Luxury spa experiences for body and mind — a sanctuary in the city',
    heroCta: 'Book Treatment',
    textColor: '#e8f5ee',
    sections: [
      { type: 'services', items: [
        { icon: 'heart', title: 'Deep Tissue Massage', price: 'AED 380 · 60min' },
        { icon: 'gem', title: 'Hot Stone Ritual', price: 'AED 520 · 90min' },
        { icon: 'sparkles', title: 'Signature Facial', price: 'AED 450 · 75min' },
        { icon: 'leaf', title: 'Aromatherapy', price: 'AED 340 · 60min' },
      ]},
      { type: 'strip', gradient: 'linear-gradient(135deg, #061a0d, #0d3020, #4a9e6e)', height: 55, image: '/images/nounmotion/05-spa-wellness-hero.jpg' },
      { type: 'cta', text: 'Join Wellness Club — from AED 299/month', btn: 'Book via WhatsApp' },
      { type: 'testimonial', quote: 'The most peaceful experience I have had. A true sanctuary.', author: 'Aisha M. — Riyadh' },
    ],
  },

  arabic: {
    url: 'business.ae/ar',
    brand: 'نور للأعمال',
    navLinks: ['الخدمات', 'أعمالنا', 'الأسعار', 'تواصل'],
    accent: '#B600A8',
    accent2: '#00DBFB',
    bg: '#060210',
    heroGradient: 'linear-gradient(160deg, #0a0218 0%, #250550 40%, #5c0a9e 80%, #B600A8 150%)',
    heroImage: '/images/nounmotion/08-gcc-business-hero.jpg',
    heroHeadline: 'موقع فاخر يحوّل\nزوارك إلى عملاء',
    heroSub: 'نصمم مواقع احترافية ثنائية اللغة للشركات في الخليج وأستراليا وكندا',
    heroCta: 'احصل على معاينة مجانية',
    textColor: '#ede8ff',
    sections: [
      { type: 'stats', items: [{ value: '٢٤ ساعة', label: 'تسليم المعاينة' }, { value: '١٠٠+', label: 'عميل راضٍ' }, { value: '٥★', label: 'تقييم' }] },
      { type: 'services', items: [
        { icon: 'globe', title: 'موقع عربي / إنجليزي', price: 'RTL + LTR كامل' },
        { icon: 'smartphone', title: 'موبايل أولاً', price: 'تصميم متجاوب' },
        { icon: 'message', title: 'واتساب CTA', price: 'تحويل مباشر' },
        { icon: 'zap', title: 'تحميل سريع', price: 'أداء عالي' },
      ]},
      { type: 'trust', items: ['ثنائي اللغة', 'RTL حقيقي', 'واتساب أولاً', 'تسليم ٢٤ساعة'] },
      { type: 'cta', text: 'احصل على معاينة مجانية خلال ٢٤ ساعة', btn: 'احجز عبر واتساب' },
      { type: 'testimonial', quote: 'أفضل وكالة في المنطقة. عمل احترافي وتسليم سريع جداً.', author: 'محمد أ. — دبي' },
    ],
  },
}

interface Props {
  config: ReelConfig
  height?: number
  className?: string
  scrollSpeed?: number
}

export function CinematicWebsiteReel({ config, height = 460, className = '', scrollSpeed = 22 }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const viewH = height - 32
    const contentH = el.offsetHeight
    const scrollDist = Math.max(0, contentH - viewH)
    if (scrollDist <= 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
      tl.fromTo(el,
        { y: 0 },
        { y: -scrollDist, duration: scrollDist / scrollSpeed, ease: 'none' }
      )
      tlRef.current = tl
    })
    return () => ctx.revert()
  }, [height, scrollSpeed])

  const isArabic = config.url.includes('/ar') || config.brand.includes('نور')

  return (
    <div
      className={`relative rounded-2xl overflow-hidden select-none ${className}`}
      style={{
        height: `${height}px`,
        background: config.bg,
        border: `1px solid ${config.accent}28`,
        boxShadow: `0 0 60px ${config.accent}12, 0 40px 80px rgba(0,0,0,0.7)`,
      }}
      onMouseEnter={() => tlRef.current?.timeScale(3)}
      onMouseLeave={() => tlRef.current?.timeScale(1)}
    >
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3 py-2"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${config.accent}18` }}>
        <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
        <div className="flex-1 mx-2 h-4 rounded-md flex items-center px-2 gap-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <svg width="7" height="7" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={config.accent} opacity="0.6"/></svg>
          <span className="text-[8px] text-white/30 font-mono">{config.url}</span>
        </div>
        <span className="text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
          style={{ color: config.accent, background: config.accent + '18' }}>LIVE</span>
      </div>

      {/* Scrollable viewport */}
      <div className="absolute left-0 right-0 overflow-hidden" style={{ top: '32px', bottom: 0 }}>
        <div ref={contentRef} dir={isArabic ? 'rtl' : 'ltr'}>

          {/* Nav */}
          <div className="flex items-center justify-between px-4 py-2.5"
            style={{ background: config.bg, borderBottom: `1px solid ${config.accent}12` }}>
            <div className="text-[9px] font-black tracking-tight" style={{ color: config.accent }}>{config.brand}</div>
            <div className="flex gap-3">
              {config.navLinks.map(n => (
                <span key={n} className="text-[7.5px] font-medium" style={{ color: config.textColor + '60' }}>{n}</span>
              ))}
            </div>
            <div className="text-[7.5px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: config.accent, color: '#fff', fontSize: '7px' }}>
              {config.heroCta.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>

          {/* Hero — real image behind gradient */}
          <div className="relative overflow-hidden" style={{ height: '165px' }}>
            {config.heroImage && (
              <img
                src={config.heroImage}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.45) saturate(1.15)' }}
              />
            )}
            <div className="absolute inset-0" style={{ background: config.heroGradient, opacity: config.heroImage ? 0.65 : 1 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 65%, transparent 100%)' }} />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="font-black uppercase leading-tight text-[10px] mb-1.5 whitespace-pre-line"
                style={{ color: config.textColor, letterSpacing: '-0.01em' }}>
                {config.heroHeadline}
              </div>
              <div className="text-[8px] leading-relaxed mb-3" style={{ color: config.textColor + '80' }}>
                {config.heroSub}
              </div>
              <div className="flex gap-2">
                <div className="text-[7.5px] font-bold px-3 py-1.5 rounded-full" style={{ background: config.accent, color: '#fff' }}>
                  {config.heroCta}
                </div>
                <div className="text-[7.5px] px-3 py-1.5 rounded-full" style={{ border: `1px solid ${config.textColor}25`, color: config.textColor + '60' }}>
                  Learn More
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full blur-2xl opacity-40"
              style={{ background: config.accent2 || config.accent }} />
          </div>

          {/* Sections */}
          {config.sections.map((s, i) => <Section key={i} section={s} accent={config.accent} textColor={config.textColor} bg={config.bg} />)}

          {/* WhatsApp footer */}
          <div className="flex items-center justify-between px-4 py-4"
            style={{ background: 'rgba(0,0,0,0.5)', borderTop: `1px solid ${config.accent}10` }}>
            <span className="text-[8px] font-black" style={{ color: config.textColor + '35' }}>{config.brand}</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#25D366' }} />
              <span className="text-[7.5px] font-semibold" style={{ color: 'rgba(37,211,102,0.9)' }}>WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${config.bg}, transparent)` }} />

      {/* Scroll pulse indicator */}
      <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-0.5 h-1 rounded-full animate-bounce"
              style={{ background: config.accent + '60', animationDelay: `${i * 0.2}s`, animationDuration: '1.2s' }} />
          ))}
        </div>
      </div>

      {/* Accent glow edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${config.accent}60, transparent)` }} />
    </div>
  )
}

function Section({ section, accent, textColor }: { section: ReelSection; accent: string; textColor: string; bg?: string }) {
  switch (section.type) {
    case 'stats':
      return (
        <div className="flex" style={{ borderTop: `1px solid ${accent}10`, borderBottom: `1px solid ${accent}10` }}>
          {section.items.map((s, i) => (
            <div key={i} className="flex-1 text-center py-3"
              style={{ borderRight: i < section.items.length - 1 ? `1px solid ${accent}12` : undefined }}>
              <div className="text-[11px] font-black" style={{ color: accent }}>{s.value}</div>
              <div className="text-[7.5px] mt-0.5 uppercase tracking-wider" style={{ color: textColor + '50' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )

    case 'services': {
      return (
        <div className="px-3 py-4">
          <div className="text-[8px] font-bold uppercase tracking-wider mb-2.5" style={{ color: textColor + '45' }}>Our Services</div>
          <div className="grid grid-cols-2 gap-2">
            {section.items.map((item, i) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={i} className="rounded-xl p-2.5"
                  style={{ background: i % 2 === 0 ? accent + '12' : 'rgba(255,255,255,0.03)', border: `1px solid ${i % 2 === 0 ? accent + '25' : 'rgba(255,255,255,0.06)'}` }}>
                  {Icon && <Icon size={9} color={accent} style={{ marginBottom: '4px', opacity: 0.85 }} />}
                  <div className="text-[8.5px] font-bold leading-tight mb-1" style={{ color: textColor }}>{item.title}</div>
                  <div className="text-[7.5px] font-medium" style={{ color: accent + 'cc' }}>{item.price}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    case 'strip':
      return (
        <div className="mx-3 my-2 rounded-xl overflow-hidden relative" style={{ height: `${section.height || 58}px` }}>
          {section.image && (
            <img src={section.image} alt="" className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.38) saturate(1.1)' }} />
          )}
          <div className="absolute inset-0" style={{ background: section.gradient, opacity: section.image ? 0.7 : 1 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
          <div className="absolute inset-0 flex items-center px-3 gap-1">
            {[40, 60, 35, 55, 45].map((w, i) => (
              <div key={i} className="h-full flex-shrink-0 rounded-lg opacity-15"
                style={{ width: `${w}px`, background: 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        </div>
      )

    case 'cta':
      return (
        <div className="mx-3 my-4 rounded-2xl p-4 text-center"
          style={{ background: `linear-gradient(135deg, ${accent}18 0%, rgba(0,0,0,0.2) 100%)`, border: `1px solid ${accent}28` }}>
          <div className="text-[8.5px] font-bold mb-2.5 leading-relaxed" style={{ color: textColor + 'cc' }}>{section.text}</div>
          <div className="inline-flex items-center gap-1.5 text-[7.5px] font-bold px-4 py-2 rounded-full"
            style={{ background: accent, color: '#fff' }}>
            <div className="w-2 h-2 rounded-full bg-white/30" />
            {section.btn}
          </div>
        </div>
      )

    case 'testimonial':
      return (
        <div className="mx-3 my-3 rounded-xl p-3"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex gap-0.5 mb-2">
            {[0,1,2,3,4].map(i => <span key={i} className="text-[9px]" style={{ color: '#F5A623' }}>★</span>)}
          </div>
          <p className="text-[8.5px] italic leading-relaxed mb-2" style={{ color: textColor + '80' }}>"{section.quote}"</p>
          <p className="text-[7.5px] font-semibold" style={{ color: accent }}>{section.author}</p>
        </div>
      )

    case 'listings':
      return (
        <div className="px-3 py-3">
          <div className="text-[8px] font-bold uppercase tracking-wider mb-2.5" style={{ color: textColor + '45' }}>Featured Properties</div>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}14` }}>
                <div>
                  <div className="text-[8.5px] font-bold" style={{ color: textColor }}>{item.name}</div>
                  <div className="text-[7.5px] mt-0.5" style={{ color: textColor + '50' }}>{item.sub}</div>
                </div>
                <div className="text-[8.5px] font-black" style={{ color: accent }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'form':
      return (
        <div className="mx-3 my-3 rounded-xl p-4"
          style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}14` }}>
          <div className="text-[8.5px] font-bold mb-3" style={{ color: textColor + 'cc' }}>{section.title}</div>
          <div className="space-y-1.5">
            {['Your Name', 'Phone / WhatsApp', 'Budget Range'].map(p => (
              <div key={p} className="h-6 rounded-lg px-2 flex items-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-[7.5px]" style={{ color: textColor + '30' }}>{p}</span>
              </div>
            ))}
            <div className="h-7 rounded-lg flex items-center justify-center text-[7.5px] font-bold mt-1"
              style={{ background: accent, color: '#fff' }}>Submit Inquiry</div>
          </div>
        </div>
      )

    case 'trust':
      return (
        <div className="px-3 py-3 flex flex-wrap gap-1.5">
          {section.items.map(item => (
            <div key={item} className="flex items-center gap-1 text-[7.5px] font-medium px-2 py-1 rounded-full"
              style={{ background: accent + '12', color: accent + 'cc', border: `1px solid ${accent}25` }}>
              <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
              {item}
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}
