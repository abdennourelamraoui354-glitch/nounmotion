import { useRef } from 'react'
import { WA_LINK } from '../config'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { MagneticButton } from './ui/MagneticButton'
import { useLang } from '../contexts/LangContext'
import { CinematicWebsiteReel, reelConfigs } from './ui/CinematicWebsiteReel'

const projects = [
  {
    num: '01', category: 'GCC Salon', title: 'Luxury Salon Website',
    desc: 'A premium website built to turn Instagram visitors into WhatsApp bookings. Visual-first, mobile-first, conversion-focused.',
    accent1: '#C9A84C', accent2: '#9b4f96', reelKey: 'salon' as const,
    tags: ['WhatsApp CTA', 'Mobile-first', 'Arabic/English'],
    metric: '3x more bookings', result: 'Instagram traffic → WhatsApp bookings',
  },
  {
    num: '02', category: 'Dental / Medical', title: 'Dental Clinic Website',
    desc: 'A trust-focused clinic page built to help patients book consultations faster. Clean, credible, conversion-ready.',
    accent1: '#00DBFB', accent2: '#264B9C', reelKey: 'dental' as const,
    tags: ['Trust design', 'Booking flow', 'GCC market'],
    metric: '5x more consultations', result: 'Trust-first patient booking',
  },
  {
    num: '03', category: 'Restaurant / Café', title: 'Restaurant Booking Website',
    desc: 'A modern restaurant site with menu preview, atmosphere, and direct WhatsApp reservation CTA. Makes diners want to show up.',
    accent1: '#E07820', accent2: '#C9A84C', reelKey: 'restaurant' as const,
    tags: ['Menu preview', 'Reservations', 'Atmosphere'],
    metric: '2x reservation rate', result: 'Menu views → reservations',
  },
  {
    num: '04', category: 'Real Estate', title: 'Real Estate Lead Website',
    desc: 'A property-focused website to showcase listings and collect serious buyer inquiries. Looks premium, converts like a sales machine.',
    accent1: '#C9A84C', accent2: '#264B9C', reelKey: 'realestate' as const,
    tags: ['Lead capture', 'Listings', 'WhatsApp flow'],
    metric: '4x qualified leads', result: 'Premium listings → buyer leads',
  },
  {
    num: '05', category: 'Spa & Wellness', title: 'Spa & Wellness Website',
    desc: 'A calming, atmospheric website for a luxury spa — built to make clients feel relaxed before they even book.',
    accent1: '#4a9e6e', accent2: '#00DBFB', reelKey: 'spa' as const,
    tags: ['Atmosphere', 'Booking CTA', 'Luxury feel'],
    metric: 'Premium brand presence', result: 'Luxury feel → booking confidence',
  },
  {
    num: '06', category: 'Arabic / English', title: 'Bilingual GCC Website',
    desc: 'A fully bilingual Arabic/English website — proper RTL, Arabic typography, WhatsApp CTA, and mobile-first across both languages.',
    accent1: '#B600A8', accent2: '#00DBFB', reelKey: 'arabic' as const,
    tags: ['Arabic RTL', 'Bilingual', 'GCC market'],
    metric: '2 markets, 1 website', result: 'Bilingual website for GCC market',
  },
]

function StickyProjectCard({ project, index, total }: { project: typeof projects[0]; index: number; total: number }) {
  const ref = useRef(null)
  const { t } = useLang()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index - 1) * 0.03])
  const yOffset = index * 18

  return (
    <div ref={ref} className="sticky" style={{ top: `${80 + yOffset}px` }}>
      <motion.div style={{ scale }} className="rounded-[36px] lg:rounded-[48px] overflow-hidden">
        <div className="p-8 sm:p-10 lg:p-12"
          style={{
            background: '#0C0C0C',
            border: '2px solid rgba(215,226,234,0.1)',
            borderRadius: 'inherit',
            boxShadow: `0 0 0 1px rgba(215,226,234,0.04), 0 40px 80px rgba(0,0,0,0.85), 0 0 80px ${project.accent1}10`,
          }}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center">
            {/* Left: content */}
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <span className="text-7xl lg:text-8xl font-black leading-none select-none"
                  style={{ color: `${project.accent1}18` }}>{project.num}</span>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: `${project.accent1}15`, color: project.accent1, border: `1px solid ${project.accent1}30` }}>
                    {project.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(37,211,102,0.08)', color: 'rgba(37,211,102,0.8)', border: '1px solid rgba(37,211,102,0.2)' }}>
                    ↑ {project.metric}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-[#D7E2EA] mb-3">{project.title}</h3>
                <p className="text-[rgba(215,226,234,0.55)] leading-relaxed text-base">{project.desc}</p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full self-start"
                style={{ background: `${project.accent1}10`, border: `1px solid ${project.accent1}25` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent1 }} />
                <span className="text-xs font-semibold" style={{ color: project.accent1 + 'cc' }}>{project.result}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: 'rgba(215,226,234,0.05)', border: '1px solid rgba(215,226,234,0.09)', color: 'rgba(215,226,234,0.5)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <MagneticButton>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/20 text-[#D7E2EA]/60 font-semibold uppercase tracking-widest text-sm px-7 py-3.5 hover:border-[#D7E2EA]/55 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/5 transition-all duration-200">
                  {t.projects.viewBtn}
                </a>
              </MagneticButton>
            </div>

            {/* Right: cinematic reel */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl blur-[50px] pointer-events-none opacity-20"
                style={{ background: `radial-gradient(ellipse, ${project.accent1} 0%, transparent 70%)` }} />
              <CinematicWebsiteReel config={reelConfigs[project.reelKey]} height={440} scrollSpeed={20} className="relative z-10" />
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-5 py-3 z-20"
                style={{ border: `1px solid ${project.accent1}30`, boxShadow: `0 16px 40px rgba(0,0,0,0.7), 0 0 30px ${project.accent1}15` }}>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: project.accent1 + '80' }}>Result</p>
                <p className="text-base font-black" style={{ color: project.accent1 }}>↑ {project.metric}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  const { t, isAr } = useLang()

  return (
    <section id="work" className="py-24 lg:py-36 px-6" style={{ background: '#050505' }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(215,226,234,0.38)] mb-4"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif', letterSpacing: '0.1em' } : {}}>
            {t.projects.eyebrow}
          </p>
          <h2 className="text-fluid-xl font-black uppercase leading-none tracking-tight gradient-text whitespace-pre-line"
            style={isAr ? { fontFamily: 'Tajawal, sans-serif' } : {}}>
            {t.projects.heading}
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-6" style={{ paddingBottom: '15vh' }}>
          {projects.map((p, i) => (
            <StickyProjectCard key={p.num} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
