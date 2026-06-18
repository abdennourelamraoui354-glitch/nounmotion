import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BUSINESS, GOLD, CREAM } from '../lib/business-data';

export function LocationMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 px-6 md:px-12" style={{ background: '#0D0B0A' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="text-sm tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
              Find Us · موقعنا
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                color: CREAM,
                fontWeight: 300,
              }}
            >
              Visit Our Restaurant
            </h2>
            <p className="mb-6 text-base leading-relaxed" style={{ color: `${CREAM}70`, fontFamily: 'DM Sans, sans-serif' }}>
              Located in the heart of Muscat, Taj Restaurant welcomes you to a royal Indian dining experience — rich biryanis, tandoor-fired breads and Mughlai curries, every day of the week.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📍', label: 'Address', value: BUSINESS.address },
                { icon: '🕐', label: 'Hours', value: `Sun–Thu ${BUSINESS.hours.weekdays} · Fri–Sat ${BUSINESS.hours.weekends}` },
                { icon: '📞', label: 'Phone', value: BUSINESS.phone },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-xs tracking-wider uppercase mb-1" style={{ color: `${CREAM}50`, fontFamily: 'DM Sans, sans-serif' }}>
                      {label}
                    </p>
                    <p className="text-sm" style={{ color: CREAM, fontFamily: 'DM Sans, sans-serif' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-medium tracking-wider border transition-all duration-300 hover:scale-105"
              style={{ borderColor: GOLD, color: GOLD, fontFamily: 'DM Sans, sans-serif' }}
            >
              Open in Google Maps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ height: 380, border: `1px solid ${GOLD}25` }}
          >
            <iframe
              src={BUSINESS.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Taj Restaurant Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
