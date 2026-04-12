import Hero from '@/components/hero/Hero'
import Marquee from '@/components/marquee/Marquee'
import Features from '@/components/features/Features'
import Stats from '@/components/stats/Stats'
import Pricing from '@/components/pricing/Pricing'
import FAQ from '@/components/faq/FAQ'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Features />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
