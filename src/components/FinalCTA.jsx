import Img from './Img.jsx'
import Button from './Button.jsx'

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative isolate overflow-hidden bg-ocean-deep py-28 text-center text-ivory sm:py-36">
      <Img name="footer" className="absolute inset-0 -z-20 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-ocean-deep/70" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5">
        <h2 id="cta-title" className="text-5xl sm:text-6xl">Your next escape starts here.</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/90">Tell us when you would like to arrive and who is coming. This concept will walk you through a demo enquiry.</p>
        <Button href="#enquire" variant="sand" className="mt-8">Submit a Stay Enquiry</Button>
      </div>
    </section>
  )
}
