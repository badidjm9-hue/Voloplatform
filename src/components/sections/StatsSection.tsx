'use client'

import { TrendingUp, Users, MapPin, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

export function StatsSection() {
  const stats = [
    {
      icon: MapPin,
      value: '220+',
      label: 'Countries',
      description: 'Book hotels worldwide',
      color: 'text-blue-500',
    },
    {
      icon: Users,
      value: '2.6M+',
      label: 'Hotels',
      description: 'Largest hotel inventory',
      color: 'text-green-500',
    },
    {
      icon: Star,
      value: '4.8',
      label: 'Rating',
      description: 'Customer satisfaction',
      color: 'text-yellow-500',
    },
    {
      icon: TrendingUp,
      value: '99%',
      label: 'Uptime',
      description: 'Reliable service',
      color: 'text-purple-500',
    },
  ]

  return (
    <section className="py-12 bg-primary-500 text-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-white/90 font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-white/70">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}