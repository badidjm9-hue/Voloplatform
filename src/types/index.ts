// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  dateOfBirth?: Date
  gender?: string
  nationality?: string
  isVerified: boolean
  isActive: boolean
  role: UserRole
  createdAt: Date
  updatedAt: Date
  preferences?: UserPreference
  addresses?: UserAddress[]
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface UserPreference {
  id: string
  userId: string
  language: string
  currency: string
  timezone: string
  notifications: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  marketingEmails: boolean
}

export interface UserAddress {
  id: string
  userId: string
  type: AddressType
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

// Hotel Types
export interface Hotel {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  address: string
  city: string
  state?: string
  country: string
  postalCode?: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  website?: string
  starRating?: number
  propertyType: PropertyType
  isActive: boolean
  isFeatured: boolean
  checkInTime: string
  checkOutTime: string
  cancellationPolicy?: string
  rateHawkId?: string
  amadeusId?: string
  expediaId?: string
  bookingComId?: string
  hotelBedsId?: string
  agodaId?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  images: Image[]
  amenities: HotelAmenity[]
  rooms: Room[]
  reviews: Review[]
  policies: Policy[]
  availability: Availability[]
  bookings: Booking[]
  createdAt: Date
  updatedAt: Date
  averageRating?: number
  reviewCount?: number
  startingPrice?: number
  isFavorite?: boolean
}

export enum PropertyType {
  HOTEL = 'HOTEL',
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  RESORT = 'RESORT',
  HOSTEL = 'HOSTEL',
  BED_BREAKFAST = 'BED_BREAKFAST',
  BOUTIQUE = 'BOUTIQUE',
  BUSINESS = 'BUSINESS',
  LUXURY = 'LUXURY',
  BUDGET = 'BUDGET',
  CHAIN = 'CHAIN',
  INDEPENDENT = 'INDEPENDENT',
}

export interface Image {
  id: string
  hotelId: string
  roomId?: string
  url: string
  altText?: string
  caption?: string
  isPrimary: boolean
  sortOrder: number
}

export interface Amenity {
  id: string
  name: string
  description?: string
  icon?: string
  category: AmenityCategory
  isActive: boolean
}

export enum AmenityCategory {
  GENERAL = 'GENERAL',
  BUSINESS = 'BUSINESS',
  ENTERTAINMENT = 'ENTERTAINMENT',
  FAMILY = 'FAMILY',
  FITNESS = 'FITNESS',
  FOOD_DRINK = 'FOOD_DRINK',
  INTERNET = 'INTERNET',
  PARKING = 'PARKING',
  PETS = 'PETS',
  POOL = 'POOL',
  SERVICES = 'SERVICES',
  TRANSPORTATION = 'TRANSPORTATION',
}

export interface HotelAmenity {
  id: string
  hotelId: string
  amenityId: string
  hotel: Hotel
  amenity: Amenity
}

// Room Types
export interface Room {
  id: string
  hotelId: string
  name: string
  description?: string
  roomType: RoomType
  size?: number // in square meters
  maxOccupancy: number
  bedType?: string
  amenities: string[]
  isActive: boolean
  totalRooms: number
  availableRooms: number
  basePrice: number
  currency: string
  cleaningFee?: number
  serviceFee?: number
  hotel: Hotel
  images: Image[]
  availability: Availability[]
  bookings: Booking[]
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}

export enum RoomType {
  STANDARD = 'STANDARD',
  DELUXE = 'DELUXE',
  SUITE = 'SUITE',
  EXECUTIVE = 'EXECUTIVE',
  PRESIDENTIAL = 'PRESIDENTIAL',
  PENTHOUSE = 'PENTHOUSE',
  FAMILY = 'FAMILY',
  STUDIO = 'STUDIO',
  APARTMENT = 'APARTMENT',
}

export interface Availability {
  id: string
  hotelId: string
  roomId: string
  date: Date
  price: number
  availableRooms: number
  isAvailable: boolean
  rateHawkPrice?: number
  amadeusPrice?: number
  expediaPrice?: number
  bookingComPrice?: number
  hotelBedsPrice?: number
  agodaPrice?: number
  hotel: Hotel
  room: Room
}

// Booking Types
export interface Booking {
  id: string
  userId: string
  hotelId: string
  roomId?: string
  bookingReference: string
  guestFirstName: string
  guestLastName: string
  guestEmail: string
  guestPhone?: string
  guestAddress?: string
  checkInDate: Date
  checkOutDate: Date
  nights: number
  adults: number
  children?: number
  rooms: number
  roomTotal: number
  taxes: number
  fees: number
  totalAmount: number
  currency: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  paymentId?: string
  apiProvider?: string
  externalBookingId?: string
  specialRequests?: string
  cancellationReason?: string
  cancelledAt?: Date
  checkInTime?: string
  checkOutTime?: string
  user: User
  hotel: Hotel
  room?: Room
  payments: Payment[]
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  BANK_TRANSFER = 'BANK_TRANSFER',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
  PAY_AT_PROPERTY = 'PAY_AT_PROPERTY',
}

// Payment Types
export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  provider?: string
  providerId?: string
  transactionId?: string
  description?: string
  metadata?: Record<string, any>
  stripePaymentIntentId?: string
  stripeCustomerId?: string
  paypalOrderId?: string
  paypalPayerId?: string
  booking: Booking
  user: User
  createdAt: Date
  updatedAt: Date
}

// Review Types
export interface Review {
  id: string
  userId: string
  hotelId: string
  roomId?: string
  bookingId: string
  overallRating: number
  cleanlinessRating?: number
  staffRating?: number
  facilitiesRating?: number
  valueRating?: number
  locationRating?: number
  comfortRating?: number
  title?: string
  comment?: string
  pros?: string[]
  cons?: string[]
  isVerified: boolean
  isPublished: boolean
  helpfulCount: number
  externalReviewId?: string
  user: User
  hotel: Hotel
  room?: Room
  booking: Booking
  createdAt: Date
  updatedAt: Date
}

// Search Types
export interface SearchFilters {
  location?: string
  checkInDate?: Date
  checkOutDate?: Date
  guests?: number
  rooms?: number
  priceRange?: [number, number]
  starRating?: number[]
  propertyType?: PropertyType[]
  amenities?: string[]
  reviewScore?: number
  distance?: number
  coordinates?: {
    lat: number
    lng: number
    radius: number
  }
  freeCancellation?: boolean
  breakfastIncluded?: boolean
  petFriendly?: boolean
}

export interface SearchResults {
  hotels: Hotel[]
  totalResults: number
  filters: SearchFilters
  sortBy: SearchSortOption
  page: number
  totalPages: number
}

export enum SearchSortOption {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
  DISTANCE = 'DISTANCE',
  POPULARITY = 'POPULARITY',
  NEWEST = 'NEWEST',
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface BookingForm {
  guestInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    specialRequests?: string
  }
  payment: {
    method: PaymentMethod
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    billingAddress?: UserAddress
  }
}

export interface NewsletterForm {
  email: string
  preferences: {
    deals: boolean
    travelTips: boolean
    newDestinations: boolean
  }
}

// Multi-API Integration Types
export interface ApiProvider {
  name: string
  isEnabled: boolean
  priority: number
  rateLimit: {
    requestsPerMinute: number
    requestsPerHour: number
    requestsPerDay: number
  }
  pricing: {
    commission: number
    markup?: number
  }
}

export interface ApiHotel {
  id: string
  provider: string
  name: string
  location: {
    address: string
    city: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  images: string[]
  amenities: string[]
  rooms: ApiRoom[]
  starRating?: number
  reviewScore?: number
  reviewCount?: number
  price: number
  currency: string
  availability: ApiAvailability[]
  policies: {
    cancellation: string
    checkIn: string
    checkOut: string
  }
}

export interface ApiRoom {
  id: string
  name: string
  description?: string
  type: RoomType
  capacity: number
  size?: number
  bedType?: string
  amenities: string[]
  price: number
  currency: string
}

export interface ApiAvailability {
  date: string
  price: number
  available: boolean
  roomsLeft?: number
}

// UI Component Types
export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (value: any, item: T) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface PaginationOptions {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
}

// Map Types
export interface MapMarker {
  id: string
  position: {
    lat: number
    lng: number
  }
  title: string
  description?: string
  image?: string
  price?: number
  rating?: number
  slug: string
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

// Notification Types
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  data?: Record<string, any>
}

export enum NotificationType {
  BOOKING_CONFIRMATION = 'BOOKING_CONFIRMATION',
  BOOKING_CANCELLATION = 'BOOKING_CANCELLATION',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  CHECK_IN_REMINDER = 'CHECK_IN_REMINDER',
  CHECK_OUT_REMINDER = 'CHECK_OUT_REMINDER',
  REVIEW_REQUEST = 'REVIEW_REQUEST',
  PROMOTION = 'PROMOTION',
  SYSTEM = 'SYSTEM',
}

// Loyalty Program Types
export interface LoyaltyPoint {
  id: string
  userId: string
  bookingId?: string
  points: number
  type: LoyaltyPointType
  description?: string
  expiresAt?: Date
  isRedeemed: boolean
  redeemedAt?: Date
  user: User
  createdAt: Date
}

export enum LoyaltyPointType {
  EARNED = 'EARNED',
  BONUS = 'BONUS',
  REFERRAL = 'REFERRAL',
  REDEEMED = 'REDEEMED',
  EXPIRED = 'EXPIRED',
  ADJUSTED = 'ADJUSTED',
}

// Policy Types
export interface Policy {
  id: string
  hotelId: string
  type: PolicyType
  title: string
  description: string
  rules?: Record<string, any>
  hotel: Hotel
}

export enum PolicyType {
  CANCELLATION = 'CANCELLATION',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  PETS = 'PETS',
  SMOKING = 'SMOKING',
  PARTY = 'PARTY',
  CHILDREN = 'CHILDREN',
  ADDITIONAL_GUESTS = 'ADDITIONAL_GUESTS',
  DAMAGE = 'DAMAGE',
  REFUND = 'REFUND',
}

// Message Types
export interface Message {
  id: string
  senderId: string
  receiverId?: string
  subject?: string
  content: string
  isRead: boolean
  isSystem: boolean
  sender: User
  createdAt: Date
}

// Settings Types
export interface Settings {
  id: string
  key: string
  value: Record<string, any>
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  defaultCurrency: string
  supportedLanguages: string[]
  commissionRate: number
}

export interface ApiSettings {
  rateHawk: {
    enabled: boolean
    priority: number
  }
  amadeus: {
    enabled: boolean
    priority: number
  }
  expedia: {
    enabled: boolean
    priority: number
  }
  bookingCom: {
    enabled: boolean
    priority: number
  }
  hotelBeds: {
    enabled: boolean
    priority: number
  }
  agoda: {
    enabled: boolean
    priority: number
  }
}

// Analytics Types
export interface AnalyticsData {
  totalBookings: number
  totalRevenue: number
  averageRating: number
  popularDestinations: {
    city: string
    country: string
    bookings: number
  }[]
  monthlyRevenue: {
    month: string
    revenue: number
    bookings: number
  }[]
}

// Error Types
export interface AppError {
  message: string
  code: string
  statusCode?: number
  details?: Record<string, any>
}

export interface ValidationError {
  field: string
  message: string
}

// Cart Types
export interface CartItem {
  id: string
  hotel: Hotel
  room: Room
  checkInDate: Date
  checkOutDate: Date
  nights: number
  rooms: number
  guests: number
  totalPrice: number
  taxes: number
  fees: number
  grandTotal: number
  currency: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  taxes: number
  fees: number
  total: number
  currency: string
  updatedAt: Date
}