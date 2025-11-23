'use client'

import { useState, useEffect } from 'react'
import { Star, Users, MapPin, Wifi, Car, Coffee, Dumbbell } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { hotelApi } from '@/lib/api/hotels'
import { Hotel } from '@/types'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

export function FeaturedHotels() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedHotels()
  }, [])

  const loadFeaturedHotels = async () => {
    try {
      setLoading(true)
      const response = await hotelApi.getFeaturedHotels(6)
      if (response.success && response.data) {
        setHotels(response.data)
      }
    } catch (error) {
      console.error('Error loading featured hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAmenityIcon = (amenityName: string) => {
    const iconMap: Record<string, any> = {
      'Free WiFi': Wifi,
      'Parking': Car,
      'Restaurant': Coffee,
      'Fitness Center': Dumbbell,
      'Swimming Pool': Users,
      'Business Center': Star,
    }
    return iconMap[amenityName] || MapPin
  }

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
            Featured Hotels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-600 dark:text-muted-300 max-w-3xl mx-auto"
          >
            Discover our handpicked selection of exceptional hotels offering unforgettable experiences
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="w-full h-48 bg-muted-200 dark:bg-primary-700 rounded-lg mb-4" />
                <div className="h-6 bg-muted-200 dark:bg-primary-700 rounded mb-2" />
                <div className="h-4 bg-muted-200 dark:bg-primary-700 rounded mb-4" />
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-muted-200 dark:bg-primary-700 rounded w-20" />
                  <div className="h-4 bg-muted-200 dark:bg-primary-700 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card card-hover"
              >
                <div className="relative">
                  <Image
                    src={hotel.images[0]?.url || '/images/placeholder-hotel.jpg'}
                    alt={hotel.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge-primary">Featured</span>
                  </div>
                  {hotel.isFavorite && (
                    <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </button>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      {[...Array(hotel.starRating || 0)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-muted-600 dark:text-muted-400 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{hotel.city}, {hotel.country}</span>
                  </div>

                  <p className="text-muted-600 dark:text-muted-400 text-sm mb-4 line-clamp-2">
                    {hotel.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((hotelAmenity) => (
                      <div key={hotelAmenity.id} className="flex items-center space-x-1 text-xs text-muted-500">
                        {(() => {
                          const IconComponent = getAmenityIcon(hotelAmenity.amenity.name)
                          return <IconComponent className="w-3 h-3" />
                        })()}
                        <span>{hotelAmenity.amenity.name}</span>
                      </div>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs text-muted-500">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">
                        {hotel.startingPrice ? `$${hotel.startingPrice}` : 'From $150'}
                      </div>
                      <div className="text-sm text-muted-500">
                        {t('hotel.perNight')}
                      </div>
                    </div>
                    <div className="text-right">
                      {hotel.averageRating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{hotel.averageRating.toFixed(1)}</span>
                        </div>
                      )}
                      {hotel.reviewCount && (
                        <div className="text-sm text-muted-500">
                          {hotel.reviewCount} reviews
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button 
                      asChild 
                      variant="primary" 
                      fullWidth
                      leftIcon={<MapPin className="w-4 h-4" />}
                    >
                      <Link href={`/hotels/${hotel.slug}`}>
                        {t('hotel.viewDetails')}
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      fullWidth
                    >
                      <Link href={`/booking/${hotel.id}`}>
                        {t('hotel.bookNow')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/search">
              View All Hotels
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}