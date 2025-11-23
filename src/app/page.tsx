import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedHotels } from '@/components/sections/FeaturedHotels'
import { SearchWidget } from '@/components/search/SearchWidget'
import { PopularDestinations } from '@/components/sections/PopularDestinations'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { Container } from '@/components/ui/Container'

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Search */}
      <HeroSection />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Search Widget - Floating above content */}
        <section className="relative -mt-20 z-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <SearchWidget variant="compact" />
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Featured Hotels */}
        <FeaturedHotels />

        {/* Popular Destinations */}
        <PopularDestinations />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Newsletter Signup */}
        <NewsletterSection />
      </main>
    </>
  )
}