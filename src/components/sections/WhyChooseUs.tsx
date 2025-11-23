'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Clock, 
  Heart, 
  HeadphonesIcon, 
  Star, 
  Award,
  Globe,
  Users,
  CreditCard,
  Search
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useLanguage } from '@/contexts/LanguageContext'

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your personal and payment information is protected with bank-level security',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Clock,
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We\'ll match it and give you an extra 5% off',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to help you',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Heart,
    title: 'Trusted by Millions',
    description: 'Over 10 million happy customers trust us for their travel needs',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find the perfect hotel with our AI-powered search and recommendations',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Pay securely with multiple payment options including PayPal and Apple Pay',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
]

const stats = [
  { value: '2.6M+', label: 'Hotels Worldwide', icon: Globe },
  { value: '220+', label: 'Countries', icon: Globe },
  { value: '10M+', label: 'Happy Customers', icon: Users },
  { value: '4.8', label: 'Average Rating', icon: Star },
]

export function WhyChooseUs() {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-24 bg-muted-50 dark:bg-primary-900/50">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Why Choose HotelBooking?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-600 dark:text-muted-300 max-w-3xl mx-auto"
          >
            We're committed to providing you with the best hotel booking experience possible
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card card-hover p-6 text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-600 dark:text-muted-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-primary-800 rounded-2xl p-8 md:p-12 shadow-hard"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Trusted Worldwide
            </h3>
            <p className="text-muted-600 dark:text-muted-400">
              Join millions of travelers who choose us for their accommodation needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-700 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-600 dark:text-muted-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <Award className="w-16 h-16 mx-auto mb-4 text-white/90" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of travelers who trust us to find their perfect stay. 
              Start exploring today with our smart search and competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Start Searching
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}