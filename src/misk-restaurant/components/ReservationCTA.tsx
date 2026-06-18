import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BUSINESS, GOLD, DARK_BG, CREAM } from '../lib/business-data';
import { MagneticButton } from './MagneticButton';

export function ReservationCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('مرحباً، أود حجز طاولة في مطعم مسك')}`;

  return (
    <section id="reserve" ref={ref} className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ background: DARK_BG }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BUSINESS.reservationBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.65) 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{
            background: 'rgba(10,9,8,0.55)',
            backdropFilter: 'blur(28px)',
            border: `1px solid ${GOLD}30`,
            boxShadow: `0 0 80px ${GOLD}10`,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{ width: 72, height: 72, background: `${GOLD}15`, border: `1px solid ${GOLD}40` }}
            animate={inView ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ delay: 0.6, duration: 1, ease: 'easeInOut' }}
          >
            <span style={{ fontSize: 32 }}>🌿</span>
          </motion.div>

          <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
            احجز طاولتك · Reserve Your Table
          </p>

          <h2
            className="mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: CREAM,
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            An Evening in Beirut
          </h2>

          <p className="mb-2 text-lg" style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}CC`, direction: 'rtl' }}>
            {BUSINESS.taglineAr}
          </p>

          <p className="mb-8 text-sm leading-relaxed" style={{ color: `${CREAM}70`, fontFamily: 'DM Sans, sans-serif' }}>
            {BUSINESS.descEn}
          </p>

          <div
            className="flex justify-center gap-8 mb-8 py-5 rounded-xl"
            style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}20` }}
          >
            {[
              { label: 'Sun – Thu', value: BUSINESS.hours.weekdays },
              { label: 'Fri – Sat', value: BUSINESS.hours.weekends },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: `${CREAM}50`, fontFamily: 'DM Sans, sans-serif' }}>
                  {label}
                </p>
                <p className="font-medium" style={{ color: CREAM, fontFamily: 'DM Sans, sans-serif', fontSize: 14 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <MagneticButton>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base tracking-wider"
              style={{ background: GOLD, color: DARK_BG, fontFamily: 'DM Sans, sans-serif' }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill={DARK_BG}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              احجز عبر واتساب · Book via WhatsApp
            </a>
          </MagneticButton>

          <p className="mt-4 text-xs" style={{ color: `${CREAM}40`, fontFamily: 'DM Sans, sans-serif' }}>
            {BUSINESS.address} · {BUSINESS.hours.weekdays}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
