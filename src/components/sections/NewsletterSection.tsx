'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export function NewsletterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubscribing(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubscribed(true)
      setEmail('')
      toast.success('Successfully subscribed to our newsletter!')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white dark:bg-primary-800 rounded-2xl p-8 md:p-12 shadow-hard">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Welcome to our community!
              </h3>
              <p className="text-muted-600 dark:text-muted-400 mb-6">
                Thank you for subscribing. You'll receive our latest deals and travel tips in your inbox.
              </p>
              <Button 
                onClick={() => setIsSubscribed(false)}
                variant="outline"
              >
                Subscribe another email
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <div className="mb-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-white/90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss a Great Deal
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive hotel deals, 
              travel tips, and destination guides.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 text-foreground placeholder-muted-400 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  disabled={isSubscribing}
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                loading={isSubscribing}
                disabled={isSubscribing}
                className="sm:w-auto w-full"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-white/70 mt-6"
          >
            By subscribing, you agree to receive marketing emails from us. 
            You can unsubscribe at any time.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Exclusive Deals</h4>
              <p className="text-sm text-white/80">
                Get access to special rates and package deals
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Travel Tips</h4>
              <p className="text-sm text-white/80">
                Expert advice to make your trips memorable
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Destination Guides</h4>
              <p className="text-sm text-white/80">
                Discover new places and hidden gems
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}