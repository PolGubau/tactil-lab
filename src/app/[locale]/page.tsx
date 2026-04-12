import Hero from '@/features/sections/hero/Hero'
import Marquee from '@/features/sections/marquee/Marquee'
import Features from '@/features/sections/features/Features'
import Process from '@/features/sections/process/Process'
import Projects from '@/features/sections/projects/Projects'
import Stats from '@/features/sections/stats/Stats'
import Pricing from '@/features/sections/pricing/Pricing'
import FAQ from '@/features/sections/faq/FAQ'
import Contact from '@/features/sections/contact/Contact'
import Footer from '@/features/sections/footer/Footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Features />
      <Process />
      <Projects />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
