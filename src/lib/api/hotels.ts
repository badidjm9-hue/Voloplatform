import { apiClient, ApiResponse } from './client'
import { Hotel, SearchFilters, SearchResults, ApiHotel, Availability } from '@/types'

interface SearchHotelsRequest {
  query?: string
  filters?: SearchFilters
  sortBy?: string
  page?: number
  limit?: number
}

interface GetHotelRequest {
  id?: string
  slug?: string
}

interface BookHotelRequest {
  hotelId: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  guests: number
  rooms: number
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  specialRequests?: string
  paymentMethod: string
}

interface BookingResponse {
  booking: any
  paymentUrl?: string
}

interface GetAvailabilityRequest {
  hotelId: string
  roomId?: string
  checkInDate: string
  checkOutDate: string
}

export class HotelApi {
  // Search hotels with multi-API integration
  async searchHotels(request: SearchHotelsRequest): Promise<ApiResponse<SearchResults>> {
    const params = {
      ...request.filters,
      query: request.query,
      sortBy: request.sortBy,
      page: request.page,
      limit: request.limit,
    }

    const response = await apiClient.get<ApiResponse<SearchResults>>('/hotels/search', {
      params,
    })
    return response.data
  }

  // Get single hotel details
  async getHotel(request: GetHotelRequest): Promise<ApiResponse<Hotel>> {
    const { id, slug } = request
    const endpoint = id ? `/hotels/${id}` : `/hotels/slug/${slug}`
    
    const response = await apiClient.get<ApiResponse<Hotel>>(endpoint)
    return response.data
  }

  // Get hotel availability
  async getAvailability(request: GetAvailabilityRequest): Promise<ApiResponse<Availability[]>> {
    const response = await apiClient.get<ApiResponse<Availability[]>>('/hotels/availability', {
      params: request,
    })
    return response.data
  }

  // Book hotel with multi-API integration
  async bookHotel(request: BookHotelRequest): Promise<ApiResponse<BookingResponse>> {
    const response = await apiClient.post<ApiResponse<BookingResponse>>('/hotels/book', request)
    return response.data
  }

  // Get featured hotels
  async getFeaturedHotels(limit: number = 6): Promise<ApiResponse<Hotel[]>> {
    const response = await apiClient.get<ApiResponse<Hotel[]>>('/hotels/featured', {
      params: { limit },
    })
    return response.data
  }

  // Get popular destinations
  async getPopularDestinations(limit: number = 8): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get<ApiResponse<any[]>>('/destinations/popular', {
      params: { limit },
    })
    return response.data
  }

  // Get hotel reviews
  async getHotelReviews(hotelId: string, page: number = 1, limit: number = 10): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>(`/hotels/${hotelId}/reviews`, {
      params: { page, limit },
    })
    return response.data
  }

  // Add hotel review
  async addReview(hotelId: string, review: any): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>(`/hotels/${hotelId}/reviews`, review)
    return response.data
  }

  // Add/remove hotel from favorites
  async toggleFavorite(hotelId: string): Promise<ApiResponse<{ isFavorite: boolean }>> {
    const response = await apiClient.post<ApiResponse<{ isFavorite: boolean }>>(`/hotels/${hotelId}/favorite`)
    return response.data
  }

  // Get user favorites
  async getFavorites(page: number = 1, limit: number = 10): Promise<ApiResponse<Hotel[]>> {
    const response = await apiClient.get<ApiResponse<Hotel[]>>('/hotels/favorites', {
      params: { page, limit },
    })
    return response.data
  }

  // Get similar hotels
  async getSimilarHotels(hotelId: string, limit: number = 4): Promise<ApiResponse<Hotel[]>> {
    const response = await apiClient.get<ApiResponse<Hotel[]>>(`/hotels/${hotelId}/similar`, {
      params: { limit },
    })
    return response.data
  }

  // Get hotels near location
  async getHotelsNearLocation(
    lat: number,
    lng: number,
    radius: number = 10,
    limit: number = 20
  ): Promise<ApiResponse<Hotel[]>> {
    const response = await apiClient.get<ApiResponse<Hotel[]>>('/hotels/nearby', {
      params: { lat, lng, radius, limit },
    })
    return response.data
  }

  // Price comparison across multiple APIs
  async getPriceComparison(
    hotelId: string,
    checkInDate: string,
    checkOutDate: string
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>(`/hotels/${hotelId}/price-comparison`, {
      params: { checkInDate, checkOutDate },
    })
    return response.data
  }

  // Get real-time availability
  async getRealTimeAvailability(
    hotelId: string,
    roomId?: string
  ): Promise<ApiResponse<any>> {
    const endpoint = roomId 
      ? `/hotels/${hotelId}/rooms/${roomId}/realtime-availability`
      : `/hotels/${hotelId}/realtime-availability`
    
    const response = await apiClient.get<ApiResponse<any>>(endpoint)
    return response.data
  }

  // Hotel suggestions (autocomplete)
  async getSuggestions(query: string, limit: number = 5): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get<ApiResponse<any[]>>('/hotels/suggestions', {
      params: { query, limit },
    })
    return response.data
  }

  // Get hotel images
  async getHotelImages(hotelId: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get<ApiResponse<any[]>>(`/hotels/${hotelId}/images`)
    return response.data
  }

  // Get hotel amenities
  async getHotelAmenities(hotelId: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get<ApiResponse<any[]>>(`/hotels/${hotelId}/amenities`)
    return response.data
  }

  // Get hotel policies
  async getHotelPolicies(hotelId: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get<ApiResponse<any[]>>(`/hotels/${hotelId}/policies`)
    return response.data
  }

  // Get available room types
  async getRoomTypes(hotelId: string, checkInDate?: string, checkOutDate?: string): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get<ApiResponse<any[]>>(`/hotels/${hotelId}/room-types`, {
      params: { checkInDate, checkOutDate },
    })
    return response.data
  }

  // Calculate booking total
  async calculateBookingTotal(
    hotelId: string,
    roomId: string,
    checkInDate: string,
    checkOutDate: string,
    rooms: number
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>('/hotels/calculate-total', {
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      rooms,
    })
    return response.data
  }

  // Validate booking
  async validateBooking(request: BookHotelRequest): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>('/hotels/validate-booking', request)
    return response.data
  }

  // Get booking confirmation
  async getBookingConfirmation(bookingId: string): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>(`/bookings/${bookingId}`)
    return response.data
  }

  // Cancel booking
  async cancelBooking(bookingId: string, reason?: string): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>(`/bookings/${bookingId}/cancel`, {
      reason,
    })
    return response.data
  }

  // Modify booking
  async modifyBooking(bookingId: string, modifications: any): Promise<ApiResponse<any>> {
    const response = await apiClient.patch<ApiResponse<any>>(`/bookings/${bookingId}`, modifications)
    return response.data
  }

  // Get user's bookings
  async getUserBookings(page: number = 1, limit: number = 10): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>('/bookings', {
      params: { page, limit },
    })
    return response.data
  }

  // Hotel analytics (for admin/hosts)
  async getHotelAnalytics(hotelId: string, period: string = '30d'): Promise<ApiResponse<any>> {
    const response = await apiClient.get<ApiResponse<any>>(`/hotels/${hotelId}/analytics`, {
      params: { period },
    })
    return response.data
  }

  // Export hotel data
  async exportHotels(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
    const response = await apiClient.get(`/hotels/export`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  }

  // Import hotel data
  async importHotels(file: File): Promise<ApiResponse<any>> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post<ApiResponse<any>>('/hotels/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export const hotelApi = new HotelApi()