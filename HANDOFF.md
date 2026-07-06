# CodeBuddy Hero — Design Hand-off

A single-page, self-contained hero section. Open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge). No build step required.

## File Structure

```
codebuddy-hero/
├── index.html          Markup for the hero
├── css/
│   └── styles.css      Design system + all component styles
├── js/
│   └── main.js         Canvas modules, counters, parallax, particles
├── assets/
│   └── codebuddy-logo.svg
└── HANDOFF.md          This document
```

## Fonts

| Family | Weights | Usage |
| --- | --- | --- |
| **Inter** | 400 / 500 / 600 / 700 | Body, headings, UI. Loaded from Google Fonts. |

CDN link (already in `index.html`):
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

## Color Palette

| Token | Hex | Purpose |
| --- | --- | --- |
| `--bg` | `#0B1020` | Page background (deep navy) |
| `--bg-2` | `#10172E` | Secondary surface |
| `--card` | `#131A33` | Card / panel base |
| `--fg` | `#F6F7FB` | Primary text |
| `--muted` | `#9AA3B8` | Secondary text |
| `--border` | `rgba(255,255,255,0.08)` | Hairline borders |
| `--emerald` | `#00C386` | Primary brand (from CodeBuddy logo) |
| `--emerald-glow` | `#1FE5A5` | Primary highlight / gradient stop |
| `--violet` | `#A06BFF` | Accent — depth / rings |
| `--electric` | `#4EA8FF` | Accent — action / rings |

### Gradients

- **Aurora backdrop** — layered radial gradients using emerald / violet / electric at ~18–22% alpha.
- **Primary CTA** — `linear-gradient(135deg, #00C386, #1FE5A5)`.
- **"IDEA" text** — `linear-gradient(135deg, #FFFFFF, #FFFFFF, #58E0B0)` clipped to text.
- **"Barriers" headline accent** — `linear-gradient(135deg, #F6FFF5, #58E0B0)` clipped to text.

### Shadows / Glows

- Panel: `0 20px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)`
- Primary CTA: `0 14px 50px -12px rgba(0,195,134,0.8)`
- Orb: pulsing emerald + violet halos (see `@keyframes orb-pulse`).

## Type Scale

| Element | Size | Weight | Tracking |
| --- | --- | --- | --- |
| H1 headline | `clamp(2.5rem, 5.8vw, 4.75rem)` | 600 | `-0.035em` |
| Body lede | 17px | 400 | normal |
| Stat number | 36px | 600 | `-0.02em` |
| Chip / eyebrow | 12px | 500 | normal |
| Stat label | 11px | 500 | `0.22em` uppercase |

## Libraries & Plugins

| Library | Version | Delivery | Purpose |
| --- | --- | --- | --- |
| **Lucide Icons** | latest | CDN — `https://unpkg.com/lucide@latest` | All icons (calendar-check, sparkles, arrow-right, check, users, package, …). Rendered via `lucide.createIcons()`. |
| **Google Fonts — Inter** | — | CDN | Body + display typeface. |

No frameworks. No bundler. Pure HTML / CSS / vanilla JS. Framer Motion from the original React source has been replaced by CSS keyframes (`reveal`, `orb-pulse`, `pulse-ring`, `float`, `dash-flow`, `particle-float`, `spin`) and IntersectionObserver-driven counters.

## Interactions

- **Mouse parallax** on the module chips + central orb (14 px max travel, per-chip depth by ring index).
- **Animated counters** for the three stats — triggered when the block scrolls into view (IntersectionObserver, 40 % threshold, 1.6 s ease-out cubic).
- **Live-building indicator** — pinging emerald dot in the panel header.
- **Rotating outer ring** — 60 s linear infinite spin.
- **Ambient particles** — 26 emerald dots slowly drifting.

## Responsive Breakpoints

| Range | Behaviour |
| --- | --- |
| `< 640px` (mobile) | Single column, only inner ring of modules, CTAs stack, nav pill hidden. |
| `≥ 640px` | Sign-in + CTA in nav, stat separators, middle-ring modules appear. |
| `≥ 768px` | Nav links become visible, 4-up feature list. |
| `≥ 1024px` | Two-column grid, outer-ring modules appear. |

## Editing Guide

- Swap the logo at `assets/codebuddy-logo.svg`.
- Adjust brand colour by editing `--emerald` / `--emerald-glow` in `css/styles.css` (`:root` block). Gradients cascade automatically.
- Add / remove modules by editing the `MODULES` array at the top of `js/main.js`. Each entry sets `ring` (0/1/2), `angle` (degrees), `tint`, `icon` (any Lucide icon name), and `label`.
- Nav links live directly in `index.html` under `<nav class="nav__links">`.

---

Prepared for the CodeBuddy Freelancer contest hand-off. Everything is production-ready — drop the folder onto any static host (Netlify, Vercel, S3, GitHub Pages).
