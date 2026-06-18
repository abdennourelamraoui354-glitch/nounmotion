type Variant = 'salon' | 'clinic' | 'restaurant' | 'realestate' | 'spa' | 'gym' | 'default'

interface WebsiteMockupProps {
  title: string
  variant?: Variant
  className?: string
}

const themes: Record<Variant, {
  bar: string; hero: string; accent: string; accent2: string; nav: string; rows: string[]
}> = {
  salon: {
    bar: '#0e0816', hero: 'linear-gradient(135deg,#2d0a42,#7621B0,#B600A8)', accent: '#B600A8', accent2: '#7621B0',
    nav: '#0b0614', rows: ['#7621B020','#B600A820','rgba(255,255,255,0.04)'],
  },
  clinic: {
    bar: '#060c1a', hero: 'linear-gradient(135deg,#061630,#264B9C,#00DBFB)', accent: '#00DBFB', accent2: '#264B9C',
    nav: '#050a14', rows: ['#00DBFB20','#264B9C20','rgba(255,255,255,0.04)'],
  },
  restaurant: {
    bar: '#0e0800', hero: 'linear-gradient(135deg,#1a0800,#BE4C00,#ff8a30)', accent: '#BE4C00', accent2: '#ff8a30',
    nav: '#0b0600', rows: ['#BE4C0025','rgba(255,255,255,0.05)','rgba(255,255,255,0.03)'],
  },
  realestate: {
    bar: '#08080e', hero: 'linear-gradient(135deg,#080824,#264B9C,#7621B0)', accent: '#264B9C', accent2: '#7621B0',
    nav: '#060616', rows: ['#264B9C25','#7621B020','rgba(255,255,255,0.04)'],
  },
  spa: {
    bar: '#060e0c', hero: 'linear-gradient(135deg,#041412,#0d6050,#00DBFB)', accent: '#00DBFB', accent2: '#0d6050',
    nav: '#040c0a', rows: ['#00DBFB18','#0d605025','rgba(255,255,255,0.04)'],
  },
  gym: {
    bar: '#0e0600', hero: 'linear-gradient(135deg,#1a0a00,#BE4C00,#B600A8)', accent: '#BE4C00', accent2: '#B600A8',
    nav: '#0c0500', rows: ['#BE4C0025','#B600A820','rgba(255,255,255,0.04)'],
  },
  default: {
    bar: '#080812', hero: 'linear-gradient(135deg,#0a0824,#7621B0,#00DBFB)', accent: '#7621B0', accent2: '#00DBFB',
    nav: '#060610', rows: ['#7621B020','#00DBFB18','rgba(255,255,255,0.04)'],
  },
}

export function WebsiteMockup({ title, variant = 'default', className = '' }: WebsiteMockupProps) {
  const th = themes[variant]
  return (
    <div className={`rounded-2xl overflow-hidden ${className}`}
      style={{ background: th.bar, border: '1px solid rgba(255,255,255,0.1)', boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${th.accent}18` }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ background: th.nav }}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-2 h-4 rounded bg-white/8 flex items-center px-2.5">
          <span className="text-[7px] text-white/35 font-mono truncate">nounmotion.com/preview</span>
        </div>
      </div>

      {/* Nav bar mockup */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: th.bar }}>
        <div className="h-2 w-14 rounded-full" style={{ background: th.accent + '80' }} />
        <div className="flex gap-1.5">
          {[0,1,2,3].map(i => <div key={i} className="h-1.5 w-7 rounded-full bg-white/15" />)}
        </div>
        <div className="h-5 w-12 rounded-full" style={{ background: th.accent + '40', border: `1px solid ${th.accent}60` }} />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: th.hero, height: '72px' }}>
        <div className="absolute inset-0 p-3 flex flex-col gap-1.5 justify-center">
          <div className="h-2.5 w-28 bg-white/80 rounded-full" />
          <div className="h-1.5 w-36 bg-white/45 rounded-full" />
          <div className="flex gap-2 mt-0.5">
            <div className="h-5 w-14 rounded-full bg-white/20 border border-white/35" />
            <div className="h-5 w-10 rounded-full" style={{ background: th.accent + '60', border: `1px solid ${th.accent}80` }} />
          </div>
        </div>
        <div className="absolute bottom-0 right-4 w-12 h-12 rounded-full blur-lg opacity-40" style={{ background: th.accent2 }} />
      </div>

      {/* Feature grid */}
      <div className="p-2.5 space-y-2" style={{ background: th.bar }}>
        <div className="grid grid-cols-3 gap-1.5">
          {th.rows.map((bg, i) => (
            <div key={i} className="h-7 rounded-xl flex items-center justify-center gap-1"
              style={{ background: bg, border: `1px solid ${i === 0 ? th.accent + '35' : 'rgba(255,255,255,0.07)'}` }}>
              <div className="h-1.5 w-5 rounded-full" style={{ background: i === 0 ? th.accent + '80' : 'rgba(255,255,255,0.25)' }} />
            </div>
          ))}
        </div>
        <div className="h-1.5 w-5/6 rounded-full bg-white/8" />
        <div className="h-1.5 w-3/4 rounded-full bg-white/6" />
        {/* WhatsApp row */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-lg" style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)' }}>
          <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: '#25D366' }} />
          <div className="h-1.5 w-16 rounded-full" style={{ background: 'rgba(37,211,102,0.4)' }} />
        </div>
      </div>

      <div className="px-3 pb-2.5 text-center">
        <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: th.accent + '80' }}>{title}</span>
      </div>
    </div>
  )
}
