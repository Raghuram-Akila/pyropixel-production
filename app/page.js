import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Projects from '../components/Projects'
import FAQ from '../components/FAQ'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ClientExtras from '../components/ClientExtras'

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Projects />
        <About />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ClientExtras />
    </>
  )
}
