# Nounmotion Website — Session Log

## Project
`C:\Users\hp\OneDrive\Documents\Nouveau dossier\nounmotion`
React 18 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP

## Brand
- **Name:** Nounmotion
- **Email:** contact@nounmotion.store
- **WA:** wa.me/971501234567
- **Markets:** GCC, Australia, Canada, international local businesses
- **Offer:** Free homepage preview in 24h — no obligation

## What Was Built (All Sessions)

### Phase 1 — Full Website Structure
All 12+ components written and wired to bilingual `LangContext`:
- `Navbar` — glass, EN/AR toggle, hamburger mobile
- `HeroSection` — headline, pills, CTAs, animated mockup
- `MarketsSection` — 8 category cards, region flags
- `ProjectsSection` — 6 sticky stacking project cards
- `MarqueeSection` — GSAP dual-row marquee
- `ProcessSection` — 5-step animated process
- `PricingSection` — 3 plans with WhatsApp + email CTAs
- `FAQSection` — AnimatePresence accordion
- `FinalCTASection` — pulsing glow CTA
- `Footer` — 3-column with email
- `CinematicWebsiteReel` — animated GSAP auto-scroll mini website component

### Phase 2 — Real Images
6 JPEG photos downloaded to `public/images/`:
- `salon-luxury.jpg` — beauty salon interior
- `dental-clinic.jpg` — dental/medical space
- `restaurant-premium.jpg` — fine dining
- `real-estate-luxury.jpg` — luxury interior
- `spa-wellness.jpg` — spa treatment room
- `gym-wellness.jpg` — fitness gym

### Phase 3 — Cinematic Reel Upgrade
- `CinematicWebsiteReel` component with 6 niche configs (salon, dental, restaurant, realestate, spa, arabic)
- GSAP auto-scroll inside browser frame, speeds up on hover
- Hero updated to show animated reel instead of static card stack
- ProjectsSection right column uses CinematicWebsiteReel per project
- MarqueeSection rebuilt as CSS mini-website thumbnails (no flat photo cards)
- Navbar thinned

## Key Files
| File | Purpose |
|---|---|
| `src/components/ui/CinematicWebsiteReel.tsx` | Core animated mini-website component |
| `src/components/HeroSection.tsx` | Landing hero with reel |
| `src/components/ProjectsSection.tsx` | 6 sticky project cards with reels |
| `src/components/MarqueeSection.tsx` | Dual-direction GSAP marquee |
| `src/components/Navbar.tsx` | Fixed glass navbar |
| `src/i18n/translations.ts` | EN + AR full translation object |
| `src/contexts/LangContext.tsx` | RTL/LTR language context |
| `src/config.ts` | WA_LINK, email constants |

## TypeScript Quirks
- `verbatimModuleSyntax` enabled → use `import type` for type-only imports
- `AnyTranslation = typeof translations['en'] | typeof translations['ar']` — avoids `dir` literal mismatch in LangContext

## Tailwind v4
- `@import "tailwindcss"` + `@theme {}` block in `index.css`
- Plugin: `@tailwindcss/vite` (NOT postcss)
- Custom classes: `gradient-text`, `gradient-text-bright`, `glass`, `grain-overlay`, `text-fluid-hero`, `text-fluid-xl`

## Security Rule (from CLAUDE.md)
**Never POST to COD Network / `*-cod*.workers.dev` with test/fake data. Read-only only.**
