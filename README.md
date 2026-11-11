# 👑 Luhan's First Birthday — Fairytale Invitation

A premium, interactive first-birthday invitation website with a cute Disney-Princess-inspired
fairytale aesthetic and a pastel rainbow palette.

## Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) via the first-party `@tailwindcss/vite` plugin
- [GSAP](https://gsap.com/) for meaningful animations only
- [Lucide](https://lucide.dev/) icons via `@lucide/vue`
- No backend, no database, no authentication

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
```

## Personalize it

1. **All party information lives in [`src/data/birthday.js`](src/data/birthday.js)** — baby name,
   date, venue, party details, RSVP contact and photos. Edit that one file and the whole site updates.
2. **Photos** — replace the placeholder SVGs in `public/images/` (keep the same file names, or
   update the paths in `birthday.js`).
3. **Palette & fonts** — design tokens are defined once in the `@theme` block of
   [`src/style.css`](src/style.css).

**Mobile-first by design** — the invitation is built for 360–430px screens first: content lives in
a 480px column (`AppContainer`) centered on larger screens, all buttons are 48px+ touch targets,
and headings use fluid `clamp()` sizing.

**Fairytale loading splash** — `index.html` renders a pastel castle "Once upon a time…" veil
before the app bundle arrives; `App.vue` fades it out once fonts are ready and triggers the
hero entrance.

**Tap-to-view gallery** — gallery cards open a full-screen lightbox (`PhotoLightbox`) with
swipe, arrow-key, dot and button navigation.

## Project structure

```
├── index.html                  # fonts, meta, app mount point
├── vite.config.js              # Vue + Tailwind plugins, @ alias
├── public/
│   ├── favicon.svg              # pastel castle favicon
│   └── images/                  # placeholder photos (replaceable)
└── src/
    ├── main.js                  # app entry
    ├── style.css                # Tailwind 4 theme tokens + base styles
    ├── App.vue                  # thin app shell (navbar / hero / footer)
    ├── data/birthday.js         # ✏️ single source of truth for party info
    ├── composables/            # reusable composition functions
    │   ├── useCountdown.js
    │   ├── usePrefersReducedMotion.js
    │   └── useScrollReveal.js
    ├── assets/images/           # reserved for future imported assets
    └── components/
        ├── layout/              # AppFooter
        ├── sections/            # HeroSection, CountdownSection, GallerySection (more coming)        └── ui/                  # AppContainer, FairyButterfly, PhotoLightbox
```

## Planned sections

`StorySection` · `DetailsSection` · `RsvpSection`
— the gallery strip is swipeable via CSS scroll-snap, with dots and 48px+ prev/next buttons.
"# luhan-first-birthday" 
