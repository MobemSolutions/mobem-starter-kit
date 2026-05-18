import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* TODO: Ajouter les sections selon le brief client :
            <Services />
            <Testimonials />
            <Portfolio />
            <Pricing />
        */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
