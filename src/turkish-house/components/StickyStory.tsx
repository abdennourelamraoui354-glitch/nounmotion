import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS, GOLD, DARK_BG, CREAM } from '../lib/business-data';

gsap.registerPlugin(ScrollTrigger);

export function StickyStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!panels.length) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const count = panels.length;
        const endDistance = `${count * 100}%`;

        panels.forEach((panel, i) => {
          gsap.set(panel, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
        });

        ScrollTrigger.create({
          trigger: container,
          pin: true,
          start: 'top top',
          end: `+=${endDistance}`,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setActivePanel(Math.min(count - 1, Math.floor(self.progress * count)));
          },
        });

        if (bgRef.current) {
          gsap.to(bgRef.current, {
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: `+=${endDistance}`,
              scrub: 1.5,
            },
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${endDistance}`,
            scrub: 1,
          },
        });

        for (let i = 1; i < panels.length; i++) {
          tl.to(panels[i - 1], { opacity: 0, y: -20, duration: 1 }, i - 0.5)
            .fromTo(panels[i], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, i - 0.5);
        }
      });

      mm.add('(max-width: 767px)', () => {
        panels.forEach((panel, i) => {
          gsap.set(panel, { opacity: 1, y: 0, clearProps: 'opacity,y' });
          gsap.fromTo(
            panel,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
              onEnter: () => setActivePanel(i),
            },
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={containerRef} className="relative overflow-hidden md:h-[100dvh]" style={{ background: DARK_BG }}>
      <div ref={bgRef} className="absolute inset-0 origin-center hidden md:block">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BUSINESS.storyBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,9,8,0.82)' }} />
      </div>

      <div className="relative z-10 md:h-full flex flex-col items-center justify-center px-6 py-20 md:py-0 text-center">
        <p className="text-sm tracking-[0.4em] uppercase mb-8 md:mb-6" style={{ color: GOLD, fontFamily: 'DM Sans, sans-serif' }}>
          Our Story · قصتنا
        </p>

        <div className="relative w-full max-w-2xl md:h-[300px] flex flex-col gap-16 md:block md:gap-0">
          {BUSINESS.story.map((chapter, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="md:absolute md:inset-0 flex flex-col items-center justify-center rounded-2xl px-4 py-10 md:rounded-none md:p-0"
              style={{
                opacity: i === 0 ? 1 : undefined,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${GOLD}18`,
              }}
            >
              <span
                className="text-6xl md:text-8xl font-bold mb-4 leading-none"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: `${GOLD}25`, fontStyle: 'italic' }}
              >
                {chapter.year}
              </span>
              <h3
                className="text-3xl md:text-5xl mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: CREAM, fontWeight: 300 }}
              >
                {chapter.titleEn}
              </h3>
              <p
                className="text-sm md:text-lg max-w-lg leading-relaxed"
                style={{ color: `${CREAM}80`, fontFamily: 'DM Sans, sans-serif' }}
              >
                {chapter.textEn}
              </p>
              <p
                className="mt-3 text-sm md:text-base"
                style={{ fontFamily: 'Tajawal, sans-serif', color: `${GOLD}99`, direction: 'rtl' }}
              >
                {chapter.textAr}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-10 md:mt-12">
          {BUSINESS.story.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activePanel ? 24 : 8,
                height: 8,
                background: i === activePanel ? GOLD : `${CREAM}30`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
