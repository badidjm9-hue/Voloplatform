'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useLanguage } from '@/contexts/LanguageContext'

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'Absolutely amazing experience! The hotel booking platform made it so easy to find and book the perfect accommodation. Great prices and excellent customer service.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Marco Rossi',
    location: 'Rome, Italy',
    rating: 5,
    comment: 'I\'ve been using this platform for all my business trips. The search filters are fantastic and the booking process is seamless. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Emma Chen',
    location: 'Tokyo, Japan',
    rating: 5,
    comment: 'The best hotel booking site I\'ve ever used. Great selection, competitive prices, and the mobile app is super convenient for last-minute bookings.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'David Smith',
    location: 'London, UK',
    rating: 5,
    comment: 'Outstanding service! The customer support team helped me when I had a booking issue. They went above and beyond to resolve it quickly.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Isabella Garcia',
    location: 'Barcelona, Spain',
    rating: 5,
    comment: 'Perfect for family trips! The filter options helped me find family-friendly hotels with great amenities. My kids loved the pool and the location was perfect.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Alex Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    comment: 'The price comparison feature is brilliant! I saved hundreds of dollars by finding the best rates across multiple providers. Will definitely use again.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
]

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-24 bg-muted-50 dark:bg-primary-900/50">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            What Our Guests Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-600 dark:text-muted-300 max-w-3xl mx-auto"
          >
            Don't just take our word for it - hear from real guests who have experienced our service
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 relative"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary-200 dark:text-primary-700" />
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-muted-600 dark:text-muted-400 leading-relaxed">
                "{testimonial.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-primary-800 rounded-full px-6 py-3 shadow-medium">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-foreground ml-2">
              4.8/5 from 50,000+ reviews
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}