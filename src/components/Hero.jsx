import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Img from './Img.jsx'
import Button from './Button.jsx'

const rise = (delay) => ({
  initial: { opacity: 0.85, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ocean-deep text-ivory">
      <Img name="hero" loading="eager" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/35 to-ocean-deep/30" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pb-32 lg:pb-40">
        <motion.p {...rise(0)} className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-sand">
          A fictional resort concept
        </motion.p>
        <motion.h1 {...rise(0.1)} id="hero-title" className="max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
          Find Your Own Kind of Paradise.
        </motion.h1>
        <motion.p {...rise(0.2)} className="mt-5 max-w-xl text-base text-ivory/90 sm:text-lg">
          Sun-warmed days, quiet evenings and a place that moves at your pace. Imagine arriving, exhaling and letting the rest of the world wait.
        </motion.p>
        <motion.div {...rise(0.3)} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#stay" variant="sand">Explore Our Stay</Button>
          <Button href="#enquire" variant="ghost">Plan Your Visit</Button>
        </motion.div>
      </div>

      <a href="#intro" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/90 hover:text-sand sm:flex">
        Scroll
        <ChevronDown className="h-5 w-5 motion-safe:animate-bounce" aria-hidden="true" />
        <span className="sr-only">to the resort introduction</span>
      </a>
    </section>
  )
}
