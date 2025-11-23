'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/contexts/ThemeContext'

export function Footer() {
  const { t } = useLanguage()

  const footerSections = [
    {
      title: t('footer.about'),
      links: [
        { name: t('footer.about'), href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Investor Relations', href: '/investors' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: t('footer.help'), href: '/help' },
        { name: t('footer.contact'), href: '/contact' },
        { name: 'Safety', href: '/safety' },
        { name: 'Accessibility', href: '/accessibility' },
        { name: 'Trust & Safety', href: '/trust' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: t('footer.privacy'), href: '/privacy' },
        { name: t('footer.terms'), href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Sitemap', href: '/sitemap' },
      ],
    },
    {
      title: 'Partners',
      links: [
        { name: 'Hotel Partners', href: '/partners/hotels' },
        { name: 'Travel Agents', href: '/partners/agents' },
        { name: 'Affiliate Program', href: '/partners/affiliates' },
        { name: 'Developer API', href: '/developers' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ]

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'support@hotelbooking.com',
      href: 'mailto:support@hotelbooking.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Travel Street, Hotel City, HC 12345',
      href: null,
    },
  ]

  return (
    <footer className="bg-primary-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary-900 font-bold text-lg">H</span>
                </div>
                <span className="font-bold text-xl">HotelBooking</span>
              </Link>
              
              <p className="text-primary-200 mb-6 max-w-sm">
                Discover and book amazing hotels worldwide. Your perfect stay is just a click away with our comprehensive booking platform.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4 text-primary-300 flex-shrink-0" />
                    {item.href ? (
                      <Link 
                        href={item.href} 
                        className="text-primary-200 hover:text-white transition-colors text-sm"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <span className="text-primary-200 text-sm">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-primary-200 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-primary-200 text-sm">
                © {new Date().getFullYear()} HotelBooking. {t('footer.rights')}
              </p>
              <div className="flex items-center space-x-1 text-primary-200 text-sm">
                <span>Made with</span>
                <span className="text-red-400">♥</span>
                <span>by MiniMax Agent</span>
              </div>
            </div>

            {/* Language & Theme Controls */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Language Selector */}
              <div className="relative">
                <select className="bg-primary-800 border border-primary-600 rounded px-3 py-1 text-sm text-white">
                  <option value="en">🇺🇸 English</option>
                  <option value="ar">🇸🇦 العربية</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="es">🇪🇸 Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 pt-6 border-t border-primary-700">
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-primary-300 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-6 text-center">
            <h4 className="font-semibold mb-2">{t('footer.newsletter')}</h4>
            <p className="text-primary-200 text-sm mb-4">
              Subscribe to get the latest deals and travel tips
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-primary-800 border border-primary-600 rounded text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="px-6 py-2 bg-white text-primary-900 rounded font-medium hover:bg-primary-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}