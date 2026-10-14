import { useCallback, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import BookingEnquiry from './components/BookingEnquiry.jsx'
import ResortIntroduction from './components/ResortIntroduction.jsx'
import AccommodationSection from './components/AccommodationSection.jsx'
import ExperiencesSection from './components/ExperiencesSection.jsx'
import DiningSection from './components/DiningSection.jsx'
import GallerySection from './components/GallerySection.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import FAQSection from './components/FAQSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [prefill, setPrefill] = useState(null)

  // Room, experience and dining actions pre-fill the enquiry panel, then bring it into view.
  const onEnquire = useCallback((selection) => {
    setPrefill({ ...selection, nonce: Date.now() })
    setTimeout(() => {
      document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      document.getElementById('checkIn')?.focus({ preventScroll: true })
    }, 60)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-3 focus:font-semibold focus:text-ocean">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <BookingEnquiry prefill={prefill} onClearTopic={() => setPrefill(null)} />
        <ResortIntroduction />
        <AccommodationSection onEnquire={onEnquire} />
        <ExperiencesSection onEnquire={onEnquire} />
        <DiningSection onEnquire={onEnquire} />
        <GallerySection />
        <WhyChooseUs />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
