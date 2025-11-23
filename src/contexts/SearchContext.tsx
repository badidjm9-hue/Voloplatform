'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { SearchFilters, SearchSortOption, Hotel } from '@/types'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: SearchFilters
  setFilters: (filters: SearchFilters | ((prev: SearchFilters) => SearchFilters)) => void
  sortBy: SearchSortOption
  setSortBy: (sort: SearchSortOption) => void
  isSearching: boolean
  setIsSearching: (searching: boolean) => void
  searchResults: Hotel[]
  setSearchResults: (results: Hotel[]) => void
  totalResults: number
  setTotalResults: (total: number) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  hasMore: boolean
  setHasMore: (hasMore: boolean) => void
  clearSearch: () => void
  clearFilters: () => void
  applyFilters: (newFilters: Partial<SearchFilters>) => void
  removeFilter: (filterKey: keyof SearchFilters) => void
  getActiveFiltersCount: () => number
}

const defaultFilters: SearchFilters = {
  location: '',
  checkInDate: undefined,
  checkOutDate: undefined,
  guests: 2,
  rooms: 1,
  priceRange: undefined,
  starRating: [],
  propertyType: [],
  amenities: [],
  reviewScore: undefined,
  distance: undefined,
  coordinates: undefined,
  freeCancellation: undefined,
  breakfastIncluded: undefined,
  petFriendly: undefined,
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFiltersState] = useState<SearchFilters>(defaultFilters)
  const [sortBy, setSortByState] = useState<SearchSortOption>(SearchSortOption.POPULARITY)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Hotel[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const setFilters = (filtersUpdater: SearchFilters | ((prev: SearchFilters) => SearchFilters)) => {
    if (typeof filtersUpdater === 'function') {
      setFiltersState(filtersUpdater)
    } else {
      setFiltersState(filtersUpdater)
    }
  }

  const setSortBy = (sort: SearchSortOption) => {
    setSortByState(sort)
    // Reset pagination when sort changes
    setCurrentPage(1)
    setHasMore(true)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setFiltersState(defaultFilters)
    setSortByState(SearchSortOption.POPULARITY)
    setSearchResults([])
    setTotalResults(0)
    setCurrentPage(1)
    setHasMore(true)
  }

  const clearFilters = () => {
    setFiltersState(defaultFilters)
    setCurrentPage(1)
    setHasMore(true)
  }

  const applyFilters = (newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }))
    setCurrentPage(1)
    setHasMore(true)
  }

  const removeFilter = (filterKey: keyof SearchFilters) => {
    setFiltersState(prev => {
      const newFilters = { ...prev }
      delete newFilters[filterKey]
      return newFilters
    })
    setCurrentPage(1)
    setHasMore(true)
  }

  const getActiveFiltersCount = (): number => {
    let count = 0
    
    if (filters.location) count++
    if (filters.checkInDate && filters.checkOutDate) count++
    if (filters.guests && filters.guests !== 2) count++
    if (filters.rooms && filters.rooms !== 1) count++
    if (filters.priceRange) count++
    if (filters.starRating && filters.starRating.length > 0) count++
    if (filters.propertyType && filters.propertyType.length > 0) count++
    if (filters.amenities && filters.amenities.length > 0) count++
    if (filters.reviewScore) count++
    if (filters.distance) count++
    if (filters.freeCancellation) count++
    if (filters.breakfastIncluded) count++
    if (filters.petFriendly) count++
    
    return count
  }

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    isSearching,
    setIsSearching,
    searchResults,
    setSearchResults,
    totalResults,
    setTotalResults,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore,
    clearSearch,
    clearFilters,
    applyFilters,
    removeFilter,
    getActiveFiltersCount,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

// Hook for search URL synchronization
export function useSearchSync() {
  const { searchQuery, filters, sortBy, setFilters, setSortBy, setSearchQuery } = useSearch()

  // Sync search state with URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    
    // Read from URL
    const query = urlParams.get('q') || ''
    const location = urlParams.get('location') || ''
    const checkIn = urlParams.get('checkin')
    const checkOut = urlParams.get('checkout')
    const guests = urlParams.get('guests')
    const rooms = urlParams.get('rooms')
    const minPrice = urlParams.get('minPrice')
    const maxPrice = urlParams.get('maxPrice')
    const starRating = urlParams.get('starRating')
    const propertyType = urlParams.get('propertyType')
    const sort = urlParams.get('sort')

    // Update state from URL
    if (query !== searchQuery) setSearchQuery(query)
    
    const newFilters: SearchFilters = {
      ...filters,
      location,
      checkInDate: checkIn ? new Date(checkIn) : undefined,
      checkOutDate: checkOut ? new Date(checkOut) : undefined,
      guests: guests ? parseInt(guests) : 2,
      rooms: rooms ? parseInt(rooms) : 1,
      priceRange: minPrice && maxPrice ? [parseInt(minPrice), parseInt(maxPrice)] : undefined,
      starRating: starRating ? starRating.split(',').map(Number) : [],
      propertyType: propertyType ? propertyType.split(',') : [],
    }

    // Only update if URL params are different from current state
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters)
    }

    if (sort && sort !== sortBy) {
      setSortBy(sort as SearchSortOption)
    }
  }, [])

  // Update URL when state changes
  React.useEffect(() => {
    const urlParams = new URLSearchParams()
    
    if (searchQuery) urlParams.set('q', searchQuery)
    if (filters.location) urlParams.set('location', filters.location)
    if (filters.checkInDate) urlParams.set('checkin', filters.checkInDate.toISOString().split('T')[0])
    if (filters.checkOutDate) urlParams.set('checkout', filters.checkOutDate.toISOString().split('T')[0])
    if (filters.guests && filters.guests !== 2) urlParams.set('guests', filters.guests.toString())
    if (filters.rooms && filters.rooms !== 1) urlParams.set('rooms', filters.rooms.toString())
    if (filters.priceRange) {
      urlParams.set('minPrice', filters.priceRange[0].toString())
      urlParams.set('maxPrice', filters.priceRange[1].toString())
    }
    if (filters.starRating && filters.starRating.length > 0) {
      urlParams.set('starRating', filters.starRating.join(','))
    }
    if (filters.propertyType && filters.propertyType.length > 0) {
      urlParams.set('propertyType', filters.propertyType.join(','))
    }
    if (sortBy !== SearchSortOption.POPULARITY) {
      urlParams.set('sort', sortBy)
    }

    const newUrl = urlParams.toString() ? `?${urlParams.toString()}` : ''
    window.history.replaceState(null, '', newUrl)
  }, [searchQuery, filters, sortBy])
}

// Hook for recent searches
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  React.useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (error) {
        console.error('Error parsing recent searches:', error)
      }
    }
  }, [])

  const addSearch = (location: string) => {
    if (!location.trim()) return
    
    const newSearches = [location, ...recentSearches.filter(s => s !== location)].slice(0, 5)
    setRecentSearches(newSearches)
    localStorage.setItem('recentSearches', JSON.stringify(newSearches))
  }

  const clearSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return {
    recentSearches,
    addSearch,
    clearSearches,
  }
}

// Hook for popular destinations
export function usePopularDestinations() {
  const [destinations] = useState([
    { city: 'New York', country: 'USA', image: '/images/destinations/new-york.jpg' },
    { city: 'Paris', country: 'France', image: '/images/destinations/paris.jpg' },
    { city: 'Tokyo', country: 'Japan', image: '/images/destinations/tokyo.jpg' },
    { city: 'London', country: 'UK', image: '/images/destinations/london.jpg' },
    { city: 'Dubai', country: 'UAE', image: '/images/destinations/dubai.jpg' },
    { city: 'Barcelona', country: 'Spain', image: '/images/destinations/barcelona.jpg' },
    { city: 'Rome', country: 'Italy', image: '/images/destinations/rome.jpg' },
    { city: 'Sydney', country: 'Australia', image: '/images/destinations/sydney.jpg' },
  ])

  return { destinations }
}