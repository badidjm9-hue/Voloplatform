'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { usePopularDestinations } from '@/contexts/SearchContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { SearchWidget } from '@/components/search/SearchWidget'

export function PopularDestinations() {
  const { t } = useLanguage()
  const { destinations } = usePopularDestinations()

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-600 dark:text-muted-300 max-w-3xl mx-auto"
          >
            Discover trending destinations and plan your next adventure
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={`${destination.city}-${destination.country}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl aspect-square">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-white font-semibold text-lg">{destination.city}</h3>
                  <p className="text-white/80 text-sm">{destination.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Destination */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Paris"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="max-w-2xl">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Featured Destination: Paris
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/90 mb-8"
              >
                Experience the City of Light with romantic atmosphere, world-class cuisine, and iconic landmarks.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-md"
              >
                <SearchWidget variant="compact" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}