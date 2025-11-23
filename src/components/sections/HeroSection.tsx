'use client'

import { motion } from 'framer-motion'
import { Star, Users, MapPin, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SearchWidget } from '@/components/search/SearchWidget'
import { Container } from '@/components/ui/Container'

export function HeroSection() {
  const { t } = useLanguage()

  const stats = [
    {
      icon: MapPin,
      value: '220+',
      label: 'Countries',
    },
    {
      icon: Users,
      value: '2.6M+',
      label: 'Hotels',
    },
    {
      icon: Star,
      value: '4.8',
      label: 'Average Rating',
    },
    {
      icon: TrendingUp,
      value: '99%',
      label: 'Satisfaction',
    },
  ]

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/70 to-primary-700/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury hotel"
          className="w-full h-full object-cover"
        />
      </div>

      <Container className="relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <SearchWidget variant="compact" />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-primary-200 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent-500/10 rounded-full blur-xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-secondary-500/10 rounded-full blur-xl animate-pulse-soft delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse-soft delay-500" />
      </div>
    </section>
  )
}