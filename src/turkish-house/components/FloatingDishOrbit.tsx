import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { BUSINESS, GOLD, DARK_BG } from '../lib/business-data';

const ORBIT_DURATION = 18000;

function useCompactOrbit() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompact(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return compact;
}

export function FloatingDishOrbit({ mouseX, mouseY }: { mouseX: ReturnType<typeof useMotionValue<number>>; mouseY: ReturnType<typeof useMotionValue<number>> }) {
  const compact = useCompactOrbit();
  const orbitRadius = compact ? 88 : 155;
  const dishSize = compact ? 108 : 170;
  const containerSize = compact ? 'min(92vw, 300px)' : 420;
  const trackW = orbitRadius * 2 + (compact ? 36 : 60);
  const trackH = trackW * 0.7;

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const radiusRef = useRef(orbitRadius);

  const dishX = useTransform(mouseX, [-1, 1], compact ? [-6, 6] : [-12, 12]);
  const dishY = useTransform(mouseY, [-1, 1], compact ? [-4, 4] : [-8, 8]);

  useEffect(() => { radiusRef.current = orbitRadius; }, [orbitRadius]);

  useEffect(() => {
    const labels = BUSINESS.orbitLabels;
    let start: number | null = null;
    function tick(ts: number) {
      if (!start) start = ts;
      const elapsed = (ts - start) % ORBIT_DURATION;
      const progress = elapsed / ORBIT_DURATION;
      const r = radiusRef.current;
      labels.forEach((_, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const baseAngle = (i / labels.length) * 2 * Math.PI;
        const angle = baseAngle + progress * 2 * Math.PI;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r * 0.7;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const rippleFrom = compact ? 100 : 160;
  const rippleTo = compact ? 200 : 320;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center mx-auto"
      style={{ width: containerSize, height: containerSize, maxWidth: compact ? 300 : 420 }}
    >
      <div
        className="absolute rounded-full border"
        style={{ width: trackW, height: trackH, borderColor: `${GOLD}30`, borderStyle: 'dashed' }}
      />

      {[0, 0.6, 1.2].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: `${GOLD}40` }}
          animate={{ width: [rippleFrom, rippleTo], height: [rippleFrom, rippleTo], opacity: [0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}

      <div
        className="absolute rounded-full"
        style={{
          width: dishSize + 50,
          height: dishSize + 50,
          background: `radial-gradient(circle, ${GOLD}35 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <motion.div
        style={{ x: dishX, y: dishY }}
        animate={{ y: [0, compact ? -8 : -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <div
          className="rounded-full overflow-hidden border-2 shadow-2xl"
          style={{
            width: dishSize,
            height: dishSize,
            borderColor: GOLD,
            boxShadow: `0 0 40px ${GOLD}60, 0 0 80px ${GOLD}20`,
          }}
        >
          <img
            src={BUSINESS.dishOrbitImg}
            alt="Signature dish"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/turkish-house/hero1.jpg'; }}
          />
        </div>

        <style>{`
          @keyframes thsteam1 { 0%,100%{transform:translateY(0) scaleX(1);opacity:0.6} 50%{transform:translateY(-18px) scaleX(1.4);opacity:0} }
          @keyframes thsteam2 { 0%,100%{transform:translateY(0) scaleX(1);opacity:0.4} 50%{transform:translateY(-22px) scaleX(0.8);opacity:0} }
        `}</style>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
          {[0, 0.3, 0.6].map((d, i) => (
            <div
              key={i}
              style={{
                width: compact ? 3 : 4,
                height: compact ? 12 : 16,
                borderRadius: 4,
                background: `${GOLD}80`,
                animation: `thsteam${i % 2 === 0 ? 1 : 2} ${2.2 + i * 0.3}s ${d}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {BUSINESS.orbitLabels.map((label, i) => (
        <div
          key={i}
          ref={(el) => { labelRefs.current[i] = el; }}
          className="absolute top-1/2 left-1/2 z-20"
          style={{ willChange: 'transform' }}
        >
          <div
            className="rounded-full font-semibold tracking-wider whitespace-nowrap"
            style={{
              padding: compact ? '4px 10px' : '4px 12px',
              fontSize: compact ? 10 : 12,
              background: `${DARK_BG}CC`,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${GOLD}50`,
              color: GOLD,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {label.ar}
          </div>
        </div>
      ))}
    </div>
  );
}
