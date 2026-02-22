# Design System — Enterprise AI Support Platform

Design language for the product: **developer-first, calm, confident, quietly powerful.** “Invisible infrastructure” rather than flashy.

---

## Typography

### Characteristics
- **Humanist sans-serif** — Very high legibility at all sizes.
- **Soft curves + precise geometry** → feels technical but friendly.
- Designed to work equally well for **marketing headlines** and **dense dashboards**.

### Usage
| Role | Style | Notes |
|------|--------|------|
| **Headlines** | Large, bold, confident; often **sentence-case** | |
| **Body text** | Regular/light weights, **generous line height** | |
| **UI & numbers** | Clear, neutral, optimized for **data readability** | |

**Overall vibe:** *“We’re serious, but not intimidating.”*

### Implementation notes
- Choose a humanist sans (e.g. **Source Sans 3**, **Nunito Sans**, **DM Sans**, **Outfit**) for both marketing and product.
- Headlines: `font-weight: 600–700`, sentence-case where appropriate.
- Body: `line-height: 1.5–1.65`, regular/light weight.
- Data/UI: monospace or tabular figures where numbers align in tables/dashboards.

---

## Colour

### Core palette (minimal + expressive)
- **Black / near-black** → primary text
- **White** → dominant background
- **Cool greys** → UI structure, dividers, secondary text

### Accent & gradients
- **Signature multi-colour gradient**: purples, blues, pinks, oranges.
- Used **sparingly**: hero sections, illustrations, highlights.
- **Accents never overwhelm content** — they guide attention.

### Effect
- **Trustworthy and clean** (finance).
- **Modern and creative** (tech/startups).
- **Instantly recognizable** even without a logo.

### Implementation notes
- Base: `#0a0a0a` / `#111` (near-black), `#ffffff` (white), grey scale from cool neutrals (e.g. `#f4f4f5`, `#e4e4e7`, `#a1a1aa`, `#71717a`, `#52525b`).
- Gradient accent: e.g. purple → blue → pink → orange; use for CTAs, hero backgrounds, or small highlights only.

---

## Branding & design language

### Brand personality
- **Developer-first**
- **Calm, confident, quietly powerful**
- **“Invisible infrastructure”** rather than flashy

### Visual system
- **Lots of white space**
- **Strong typographic hierarchy**
- **Rounded UI components**
- **Subtle motion and depth**
- **Realistic product mockups** instead of abstract hype

### Logos & imagery
- **Neutral partner logos** (monochrome)
- **Illustrations**: technical, modular, abstract
- **Product UIs** showcased as the hero

---

## Summary

| Area | Principle |
|------|-----------|
| **Typography** | Humanist sans; headlines bold/sentence-case, body generous line height, UI/data clear and neutral. Serious but not intimidating. |
| **Colour** | Black/white/cool greys dominate; signature gradient (purple/blue/pink/orange) used sparingly for focus. Trustworthy + modern. |
| **Brand** | Developer-first, calm, confident; white space, hierarchy, rounded UI, subtle motion; real product as hero. |

Use this doc as the single source of truth for UI and styling when implementing the platform.

---

## Implementation (Tailwind / CSS)

When you add the app, wire the system like this:

- **Font:** One humanist sans for everything (e.g. `font-family: 'Source Sans 3'` or `'DM Sans'`); set in `tailwind.config` and/or global CSS.
- **Colours:** Extend Tailwind theme with `black`/`white`, a `gray` scale (cool, e.g. zinc/slate), and an `accent` gradient (e.g. `from-purple-500 via-blue-500 to-pink-500` or similar) for hero/CTAs only.
- **Headlines:** `text-2xl`/`text-3xl` and up, `font-bold` or `font-semibold`, sentence-case in copy.
- **Body:** `leading-relaxed` or `leading-loose`, `font-normal` or `font-light`.
- **UI/data:** `tabular-nums` where numbers align; neutral gray text for secondary.
- **Components:** `rounded-lg` or `rounded-xl` for cards/buttons; subtle `shadow-sm` for depth; minimal transitions (e.g. `transition-colors`).
- **Spacing:** Prefer generous padding and margins; avoid cramped layouts.
