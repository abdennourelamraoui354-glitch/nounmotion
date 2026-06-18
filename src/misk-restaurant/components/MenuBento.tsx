import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BUSINESS, GOLD, DARK_BG, CREAM } from '../lib/business-data';

const FALLBACK = BUSINESS.heroSlides[0].img;

export function MenuBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('أود الاستفسار عن قائمة مطعم مسك')}`;

  return (
    <section id="menu" ref={ref} className="py-24 px-6 md:px-12" style={{ background: '#0D0B0A' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
            Our Menu · قائمتنا
          </p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: CREAM,
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            Crafted for the Soul
          </h2>
          <p className="mt-3 text-lg" style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}CC`, direction: 'rtl' }}>
            مُعَدٌّ بأصالة وشغف
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {BUSINESS.menu.map((item, i) => {
            const isLarge = item.size === 'large';
            return (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${isLarge ? 'col-span-2 md:col-span-1 row-span-2' : ''}`}
                style={{
                  minHeight: isLarge ? 420 : 200,
                  background: '#111',
                  border: `1px solid ${GOLD}18`,
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, rotateY: 1.5, scale: 1.02 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.nameEn}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.95) 0%, rgba(10,9,8,0.3) 60%, transparent 100%)' }}
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs tracking-wider"
                    style={{
                      background: `${DARK_BG}CC`,
                      backdropFilter: 'blur(12px)',
                      color: GOLD,
                      fontFamily: 'Tajawal, sans-serif',
                      border: `1px solid ${GOLD}40`,
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1">
                      <p
                        className="text-lg font-semibold leading-tight mb-1"
                        style={{ fontFamily: 'Tajawal, sans-serif', color: CREAM, direction: 'rtl' }}
                      >
                        {item.nameAr}
                      </p>
                      <p
                        className="text-sm mb-2"
                        style={{ fontFamily: 'Cormorant Garamond, serif', color: `${GOLD}CC`, fontStyle: 'italic' }}
                      >
                        {item.nameEn}
                      </p>
                      {isLarge && (
                        <p
                          className="text-xs leading-relaxed mb-3 hidden md:block"
                          style={{ color: `${CREAM}70`, fontFamily: 'DM Sans, sans-serif', direction: 'rtl', textAlign: 'right' }}
                        >
                          {item.descAr}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span
                        className="font-bold text-lg"
                        style={{ fontFamily: 'Cormorant Garamond, serif', color: GOLD }}
                      >
                        {item.price}
                      </span>
                      {isLarge && (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider"
                          style={{ background: GOLD, color: DARK_BG, fontFamily: 'DM Sans, sans-serif' }}
                        >
                          اطلب الآن
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{ borderColor: GOLD, color: GOLD, fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = DARK_BG; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = GOLD; }}
          >
            <span>View Full Menu · القائمة الكاملة</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
