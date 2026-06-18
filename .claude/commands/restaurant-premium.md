# 🍽️ RESTAURANT MASTER PROMPT — Google Maps → Cinematic Closing Demo

> **THE single source of truth** for building any restaurant demo in Nounmotion.
> Input = Google Maps link. Output = deployed reel-quality demo for client closing.
> **Clone Tawaheen. Never build from scratch.**

**Command:** `/restaurant-premium` or paste this entire file + Maps URL.

**Live gold standard:** https://nounmotion.store/tawaheen
**Code reference:** `src/tawaheen-alhawa/`

Read `CLAUDE.md`. You are a **senior frontend dev + premium motion designer**.

---

## MISSION

Abdennoure prospects restaurants via Google Maps → builds cinematic demo → sends link → closes Pro package ($799 / 7 days).

| This demo IS | This demo IS NOT |
|--------------|------------------|
| 80% of Pro deliverable | Final client site |
| Portfolio closing tool | Agency homepage |
| Real Maps data + photos | Lorem ipsum template |
| Motion on load (reel feel) | Scroll-only animations |
| Arabic + English | English only |

**Never put pricing on the demo site.**

---

## STACK (do not change)

```
React 19 + TypeScript + Vite
Tailwind CSS 4
Framer Motion — hero, stagger, hover, marquee
GSAP + ScrollTrigger — pin, scrub, crossfade
Lucide React — icons
```

---

## INPUT

```
GOOGLE_MAPS_URL: https://maps.google.com/...
TIER: PREMIUM          # PREMIUM ($20K reel) or PRO (faster demo)
WHATSAPP: (optional)
SUBDOMAIN: (optional)
```

Default TIER = PREMIUM. See premium-demo `.claude/commands/restaurant-premium.md` for full master.

---

## PHASE 1 — Maps research (STOP until data file exists)

Open Maps URL. Extract and write `src/[slug]/lib/business-data.ts`:

| Field | How |
|-------|-----|
| `nameEn` / `nameAr` | Business name + Arabic translation |
| `taglineEn` / `taglineAr` | 5–8 words from reviews/vibe |
| `descEn` / `descAr` | 2 sentences, sensory language |
| `cuisine` | Category (e.g. `Jordanian · Levantine`) |
| `city` | Full city + country |
| `address` | Full street address |
| `phone` / `whatsapp` | From listing (digits only for wa.me) |
| `rating` / `reviews` | From listing |
| `established` | Year founded if known, else estimate from reviews |
| `hours` | weekdays + weekends strings |
| `highlights` | 4 items `{ en, ar }` from review keywords |
| `marqueeItems` | 12–14 mix Arabic dish names + English (`FRESH · CRAFTED · SEASONAL`) |
| `orbitLabels` | 6 dishes `{ en, ar }` |
| `menu` | 6 items — see MENU SCHEMA below |
| `story` | 3 panels `{ year, titleEn, titleAr, textEn, textAr }` |
| `heroSlides` | 3 `{ img, headlineEn, headlineAr, subEn, subAr }` |
| `galleryImages` | 5 `{ src, caption }` |
| `mapsEmbedSrc` | Real Google embed URL for location |
| `dishOrbitImg` | Best signature dish photo |
| `storyBg` / `reservationBg` | Interior/terrace images |

**Slug rules:**
- `slug` = kebab-case: `tawaheen-alhawa`, `al-mashawi-kuwait`
- `subdomain` = short: `tawaheen`, `mashawi` → `[subdomain].nounmotion.store`

**Aesthetic pick:**
| Signal | Style |
|--------|-------|
| Grill/Levant/Arabic/casual | `dark-cinematic` — bg `#0A0908`, gold `#C9A96E` |
| Italian/French/fine dining/$$$$  | `cream-elegant` — bg `#F5F0E8`, accent `#8B2942` or `#2D5016` |

---

## MENU SCHEMA (6 items minimum)

```ts
{
  id: 1,
  nameAr: 'المنسف الملكي',
  nameEn: 'Royal Mansaf',
  descAr: '...',
  descEn: '...',
  price: '18 JD',
  category: 'مطبق رئيسي',
  img: `${BASE}/menu-mansaf.jpg`,
  featured: true,
  size: 'large',
}
// 5 more: size 'small', featured false
```

---

## PHASE 2 — Images (CRITICAL — #1 failure = grey boxes)

Download **15 images** into `public/[slug]/`:

| File | What |
|------|------|
| `hero1.jpg` `hero2.jpg` `hero3.jpg` | Wide cinematic |
| `dish-orbit.jpg` | Square signature dish |
| `menu-*.jpg` × 6 | Plated dishes |
| `gallery1.jpg` … `gallery5.jpg` | Ambiance |

Sources: Maps → reviews → Unsplash/Pexels. **Verify files exist before dev.**
Every `<img>` needs `onError` fallback.

---

## PHASE 3 — Clone Tawaheen (mandatory)

```bash
cp -r src/tawaheen-alhawa src/[slug]
cp -r public/tawaheen-alhawa public/[slug]
```

Rename App, Header, Footer. Replace all paths. Wire `src/App.tsx` hostname + `?preview=[slug]`.

---

## PHASE 4 — Section order

Header → CinematicHero → MarqueeStrip → MenuBento → StickyStory → AtmosphereGallery → ReservationCTA → LocationMap → Footer → WhatsAppFloat

---

## PHASE 5 — MOTION (non-negotiable)

**Motion visible in 500ms WITHOUT scrolling or FAILED.**

1. Ken Burns bg 12s loop
2. 3-slide carousel 6s clip-path wipe
3. Gold progress bar per slide
4. Headline word stagger
5. FloatingDishOrbit + parallax
6. Glow + ripple rings
7. Cursor parallax
8. CTA shimmer
9. Infinite marquee
10. WhatsApp pulse

**Scroll (GSAP matchMedia):**
- StickyStory: pin desktop | vertical cards mobile
- AtmosphereGallery: scrub desktop | scroll-snap mobile
- MenuBento: stagger reveal

**Never remove motion to fix bugs.**

---

## PHASE 6 — Mobile rules

- Orbit visible on phone (scaled, not hidden)
- No GSAP pin on mobile without fallback
- No `filter: invert()` on map
- `minHeight: 100dvh` hero
- Test 375px

---

## PHASE 7 — Deploy

Copy Dockerfile/nginx/worker/wrangler from tawaheen → `[slug]`.
`npm run build` → git push → `node scripts/deploy-[slug].mjs` → wrangler deploy.
Worker: `resolveOverride: 'tenspa.nounmotion.store'`
Backup: `nounmotion.store/[slug]`

---

## QA — all must pass

Load 10s no-scroll: Ken Burns ✓ carousel ✓ orbit ✓ marquee ✓ pulse ✓
Scroll: story ✓ gallery ✓ no grey images ✓ map ✓
Mobile 375px: no overlap ✓ no black void ✓ orbit ✓
`npm run build` ✓

---

## SALES message

```
صممت معاينة live مخصصة لـ [اسم]:
👉 https://nounmotion.store/[slug]
افتحوها من الكمبيوتر — دقيقتين وقلّولي رأيكم 🙏
```

Close: واش هاد المستوى يناسب العلامة ديالكم؟
Price only if asked: Pro $799 / 7 days.

---

## DO NOT

Build from scratch · static hero · skip orbit/marquee/Ken Burns · lorem ipsum · pricing on demo · invert map · remove motion to fix bugs · fake leads · empty public folder

---

## REFERENCE

Read ALL files in `src/tawaheen-alhawa/` before coding.

**Example:**
```
/restaurant-premium
GOOGLE_MAPS_URL: https://maps.app.goo.gl/xxxx
```

**This is the master. Follow it exactly.**
