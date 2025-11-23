'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Search, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSearch } from '@/contexts/SearchContext'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

interface SearchWidgetProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function SearchWidget({ variant = 'default', className }: SearchWidgetProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { searchQuery, filters, setSearchQuery, applyFilters } = useSearch()
  
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const [localCheckIn, setLocalCheckIn] = useState('')
  const [localCheckOut, setLocalCheckOut] = useState('')
  const [localGuests, setLocalGuests] = useState(filters.guests || 2)
  const [showGuestPicker, setShowGuestPicker] = useState(false)

  // Set default dates
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    setLocalCheckIn(today.toISOString().split('T')[0])
    setLocalCheckOut(tomorrow.toISOString().split('T')[0])
  }, [])

  const handleSearch = () => {
    if (!localQuery.trim()) {
      return
    }

    // Update search context
    setSearchQuery(localQuery)
    
    const newFilters = {
      location: localQuery,
      checkInDate: localCheckIn ? new Date(localCheckIn) : undefined,
      checkOutDate: localCheckOut ? new Date(localCheckOut) : undefined,
      guests: localGuests,
      rooms: 1,
    }
    
    applyFilters(newFilters)
    
    // Navigate to search results
    router.push(`/search?location=${encodeURIComponent(localQuery)}&checkin=${localCheckIn}&checkout=${localCheckOut}&guests=${localGuests}`)
  }

  const adjustGuests = (type: 'adults' | 'children', operation: 'increment' | 'decrement') => {
    const minGuests = 1
    const maxGuests = 10
    
    if (type === 'adults') {
      let newAdults = operation === 'increment' ? localGuests + 1 : Math.max(minGuests, localGuests - 1)
      setLocalGuests(Math.min(newAdults, maxGuests))
    }
  }

  const isCompact = variant === 'compact'

  return (
    <div className={cn(
      'bg-white dark:bg-primary-800 rounded-2xl shadow-hard border border-muted-200 dark:border-primary-700',
      isCompact ? 'p-4' : 'p-6',
      className
    )}>
      <div className={cn(
        'grid gap-4',
        isCompact ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
      )}>
        {/* Destination */}
        <div className={cn(
          'relative',
          isCompact ? 'md:col-span-2' : 'lg:col-span-2'
        )}>
          <label className="block text-sm font-medium text-muted-700 dark:text-muted-300 mb-2">
            {t('home.search.where')}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="City, hotel name, or landmark"
              className="w-full pl-10 pr-4 py-3 border border-muted-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-foreground placeholder-muted-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-muted-700 dark:text-muted-300 mb-2">
            {t('home.search.checkin')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-400" />
            <input
              type="date"
              value={localCheckIn}
              onChange={(e) => setLocalCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-muted-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-muted-700 dark:text-muted-300 mb-2">
            {t('home.search.checkout')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-400" />
            <input
              type="date"
              value={localCheckOut}
              onChange={(e) => setLocalCheckOut(e.target.value)}
              min={localCheckIn || new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-muted-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-700 dark:text-muted-300 mb-2">
            {t('home.search.guests')}
          </label>
          <div className="relative">
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full pl-4 pr-4 py-3 border border-muted-300 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-foreground text-left focus:ring-2 focus:ring-primary-500 focus:border-transparent flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-muted-400" />
                <span>
                  {localGuests} {localGuests === 1 ? t('common.guest') : t('common.guests')}
                </span>
              </div>
            </button>

            {/* Guest Picker Dropdown */}
            {showGuestPicker && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-primary-800 border border-muted-200 dark:border-primary-700 rounded-lg shadow-lg p-4 z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Adults</div>
                      <div className="text-sm text-muted-500">Age 18+</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => adjustGuests('adults', 'decrement')}
                        disabled={localGuests <= 1}
                        className="w-8 h-8 rounded-full border border-muted-300 dark:border-primary-600 flex items-center justify-center hover:bg-muted-100 dark:hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{localGuests}</span>
                      <button
                        onClick={() => adjustGuests('adults', 'increment')}
                        disabled={localGuests >= 10}
                        className="w-8 h-8 rounded-full border border-muted-300 dark:border-primary-600 flex items-center justify-center hover:bg-muted-100 dark:hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-muted-200 dark:border-primary-700">
                  <Button
                    onClick={() => setShowGuestPicker(false)}
                    variant="primary"
                    size="sm"
                    fullWidth
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className={cn(
        'mt-6',
        isCompact ? 'mt-4' : 'mt-6'
      )}>
        <Button
          onClick={handleSearch}
          size={isCompact ? 'lg' : 'xl'}
          fullWidth
          className="bg-primary-500 hover:bg-primary-600 text-white"
          leftIcon={<Search className="w-5 h-5" />}
        >
          {t('home.search.search')}
        </Button>
      </div>
    </div>
  )
}