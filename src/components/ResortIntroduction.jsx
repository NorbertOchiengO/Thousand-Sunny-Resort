import Img from './Img.jsx'
import Reveal from './Reveal.jsx'

export default function ResortIntroduction() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="pb-20 pt-24 sm:pb-28 lg:pt-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <Img name="footer" className="aspect-[4/5] w-full" />
          <Img name="spa" className="absolute -bottom-8 -right-2 hidden aspect-square w-2/5 border-8 border-ivory sm:block lg:-right-8" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sand-deep">The Resort</p>
          <h2 id="intro-title" className="text-4xl text-ocean sm:text-5xl">Where the day slows down.</h2>
          <p className="mt-6 text-lg text-muted">
            Thousand Sunny is imagined as a small, personal resort between sea and garden. Mornings begin with light across the water. Afternoons belong to the pool, the shade and a good book. Evenings end at a table set just for you.
          </p>
          <p className="mt-4 text-muted">
            Every detail is meant to feel considered rather than showy: natural materials, generous space and hosts who remember how you take your coffee.
          </p>
          <blockquote className="mt-8 border-l-2 border-sand-deep pl-5 font-serif text-2xl italic text-ocean">
            Not a place you visit. A place you exhale.
          </blockquote>
          <a href="#stay" className="mt-8 inline-flex min-h-12 items-center border-b-2 border-ocean text-sm font-semibold uppercase tracking-[0.14em] text-ocean hover:text-sand-deep">
            Discover the resort
          </a>
        </Reveal>
      </div>
    </section>
  )
}
