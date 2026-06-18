import { BUSINESS, GOLD, DARK_BG } from '../lib/business-data';

export function MarqueeStrip() {
  const items = [...BUSINESS.marqueeItems, ...BUSINESS.marqueeItems];

  return (
    <div
      className="relative overflow-hidden py-4 flex items-center"
      style={{ background: GOLD, borderTop: `1px solid ${GOLD}`, borderBottom: `1px solid #A8843A` }}
    >
      <style>{`
        @keyframes mr-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .mr-marquee-track {
          display: flex;
          width: max-content;
          animation: mr-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mr-marquee-track { animation: none; }
        }
      `}</style>
      <div className="mr-marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="text-sm font-bold tracking-[0.25em] uppercase px-6"
              style={{ fontFamily: 'DM Sans, sans-serif', color: DARK_BG }}
            >
              {item}
            </span>
            <span style={{ color: DARK_BG, opacity: 0.5, fontSize: 18 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
