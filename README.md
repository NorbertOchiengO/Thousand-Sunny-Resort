# Thousand Sunny Resort

Fictional boutique-resort website concept by **ARCLUME LABS — Where Ideas Become Infrastructure.**
Concept only: rooms, prices, menus, policies and contact details are placeholders.

Stack: React (JSX) · Vite · Tailwind CSS v4 · Motion (`motion/react`) · Lucide React

```bash
npm install
npm run dev      # development
npm run build    # production build to dist/
npm test         # vitest + Testing Library
```

## Images
Each image tries, in order: `public/images/<file>` → the existing deployment
(`https://thousand-sunny-henna.vercel.app/images/<file>`) → a designed fallback panel.
For a self-contained deploy, copy the 12 originals into `public/images/`
(hero-resort, footer-horizon, garden-suite, suite-ocean, suite, pool, spa, wine, kids, wedding .png).
Mapping and alt text live in `src/data/images.js`. Alt text was written from file names; check it against the real photos.

## Content
`src/data/` holds rooms, experiences, dining menu (illustrative), gallery, FAQs and navigation.
Form logic: `src/utils/bookingValidation.js` (rules) and `src/utils/submitEnquiry.js` (demo handler to replace with a secure backend).

## Deploy to Vercel
Import the repo, framework preset **Vite**, build `npm run build`, output `dist`. No environment variables needed.
