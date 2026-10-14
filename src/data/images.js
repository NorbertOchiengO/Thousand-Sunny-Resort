// Image registry. Each image tries, in order:
//   1. /images/<file>           (drop your own copies into public/images)
//   2. the existing deployment  (REMOTE_BASE)
//   3. a designed fallback panel (see components/Img.jsx)
// Alt text is written from file names and should be checked against the real photos.
export const REMOTE_BASE = 'https://thousand-sunny-henna.vercel.app/images'

export const images = {
  hero: { file: 'hero-resort.png', alt: 'Aerial view of the resort and its coastline', tone: 'ocean' },
  footer: { file: 'footer-horizon.png', alt: 'The resort horizon at the end of the day', tone: 'dusk' },
  garden: { file: 'garden-suite.png', alt: 'Garden retreat room set among planting', tone: 'sage' },
  ocean: { file: 'suite-ocean.png', alt: 'Ocean view suite looking toward the sea', tone: 'ocean' },
  villa: { file: 'suite.png', alt: 'Private pool villa interior', tone: 'sand' },
  pool: { file: 'pool.png', alt: 'Resort pool area', tone: 'ocean' },
  spa: { file: 'spa.png', alt: 'Spa and wellness space', tone: 'sage' },
  wine: { file: 'wine.png', alt: 'Wine and dining setting', tone: 'dusk' },
  family: { file: 'kids.png', alt: 'Family play area in the grounds', tone: 'sage' },
  celebration: { file: 'wedding.png', alt: 'Celebration setting in the resort grounds', tone: 'sand' },
}
