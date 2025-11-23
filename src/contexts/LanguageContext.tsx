'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'

export type Language = 'en' | 'ar' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  isRTL: boolean
  formatCurrency: (amount: number, currency?: string) => string
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string
  formatNumber: (number: number) => string
  supportedLanguages: LanguageInfo[]
}

interface LanguageInfo {
  code: Language
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

const supportedLanguages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', rtl: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false },
]

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.destinations': 'Destinations',
    'nav.deals': 'Deals',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.register': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.bookings': 'My Bookings',
    'nav.favorites': 'Favorites',
    'nav.logout': 'Sign Out',
    'nav.admin': 'Admin Panel',
    
    // Home page
    'home.hero.title': 'Find Your Perfect Stay',
    'home.hero.subtitle': 'Discover amazing hotels and book your perfect accommodation worldwide',
    'home.hero.search': 'Search Hotels',
    'home.search.where': 'Where are you going?',
    'home.search.checkin': 'Check-in',
    'home.search.checkout': 'Check-out',
    'home.search.guests': 'Guests',
    'home.search.rooms': 'Rooms',
    'home.search.search': 'Search',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.reset': 'Reset',
    'common.sort': 'Sort',
    'common.sortby': 'Sort by',
    'common.more': 'More',
    'common.less': 'Less',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.unknown': 'Unknown',
    'common.optional': 'Optional',
    'common.required': 'Required',
    'common.nights': 'nights',
    'common.night': 'night',
    'common.rooms': 'rooms',
    'common.room': 'room',
    'common.guests': 'guests',
    'common.guest': 'guest',
    'common.adults': 'adults',
    'common.adult': 'adult',
    'common.children': 'children',
    'common.child': 'child',
    
    // Hotel
    'hotel.viewDetails': 'View Details',
    'hotel.bookNow': 'Book Now',
    'hotel.addToFavorites': 'Add to Favorites',
    'hotel.removeFromFavorites': 'Remove from Favorites',
    'hotel.share': 'Share',
    'hotel.photos': 'Photos',
    'hotel.amenities': 'Amenities',
    'hotel.location': 'Location',
    'hotel.reviews': 'Reviews',
    'hotel.policies': 'Policies',
    'hotel.description': 'Description',
    'hotel.availability': 'Availability',
    'hotel.checkin': 'Check-in',
    'hotel.checkout': 'Check-out',
    'hotel.rating': 'Rating',
    'hotel.reviewCount': '{count} reviews',
    'hotel.priceFrom': 'Price from',
    'hotel.perNight': 'per night',
    'hotel.freeCancellation': 'Free cancellation',
    'hotel.noCancellation': 'No cancellation',
    'hotel.breakfastIncluded': 'Breakfast included',
    'hotel.petFriendly': 'Pet friendly',
    'hotel.parking': 'Parking',
    'hotel.wifi': 'Free WiFi',
    'hotel.pool': 'Swimming pool',
    'hotel.spa': 'Spa',
    'hotel.gym': 'Fitness center',
    'hotel.restaurant': 'Restaurant',
    'hotel.bar': 'Bar',
    'hotel.airConditioning': 'Air conditioning',
    
    // Booking
    'booking.title': 'Complete Your Booking',
    'booking.guestInfo': 'Guest Information',
    'booking.paymentInfo': 'Payment Information',
    'booking.confirmation': 'Booking Confirmation',
    'booking.firstName': 'First Name',
    'booking.lastName': 'Last Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.specialRequests': 'Special Requests',
    'booking.paymentMethod': 'Payment Method',
    'booking.cardNumber': 'Card Number',
    'booking.expiryDate': 'Expiry Date',
    'booking.cvv': 'CVV',
    'booking.billingAddress': 'Billing Address',
    'booking.summary': 'Booking Summary',
    'booking.subtotal': 'Subtotal',
    'booking.taxes': 'Taxes',
    'booking.fees': 'Fees',
    'booking.total': 'Total',
    'booking.bookingReference': 'Booking Reference',
    'booking.status': 'Status',
    'booking.confirmed': 'Confirmed',
    'booking.pending': 'Pending',
    'booking.cancelled': 'Cancelled',
    'booking.checkin': 'Check-in',
    'booking.checkout': 'Check-out',
    
    // Forms
    'form.email': 'Email',
    'form.password': 'Password',
    'form.confirmPassword': 'Confirm Password',
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.city': 'City',
    'form.country': 'Country',
    'form.postalCode': 'Postal Code',
    'form.required': 'This field is required',
    'form.invalidEmail': 'Please enter a valid email',
    'form.passwordMismatch': 'Passwords do not match',
    'form.minLength': 'Must be at least {min} characters',
    'form.maxLength': 'Must be no more than {max} characters',
    
    // Search
    'search.results': 'Search Results',
    'search.filters': 'Filters',
    'search.sortBy': 'Sort by',
    'search.priceRange': 'Price range',
    'search.starRating': 'Star rating',
    'search.propertyType': 'Property type',
    'search.amenities': 'Amenities',
    'search.reviewScore': 'Review score',
    'search.distance': 'Distance from center',
    'search.freeCancellation': 'Free cancellation',
    'search.breakfastIncluded': 'Breakfast included',
    'search.petFriendly': 'Pet friendly',
    'search.hotelsFound': '{count} hotels found',
    'search.noResults': 'No hotels found for your search criteria',
    'search.tryAdjusting': 'Try adjusting your search criteria',
    
    // Currency
    'currency.usd': 'USD',
    'currency.eur': 'EUR',
    'currency.gbp': 'GBP',
    'currency.dzd': 'DZD',
    'currency.perNight': '/night',
    'currency.perStay': '/stay',
    
    // Date
    'date.today': 'Today',
    'date.tomorrow': 'Tomorrow',
    'date.yesterday': 'Yesterday',
    'date.thisWeek': 'This week',
    'date.lastWeek': 'Last week',
    'date.thisMonth': 'This month',
    'date.lastMonth': 'Last month',
    'date.format': 'MMM DD, YYYY',
    'date.formatShort': 'MM/DD/YYYY',
    'date.formatLong': 'MMMM DD, YYYY',
    
    // Error messages
    'error.network': 'Network error. Please try again.',
    'error.server': 'Server error. Please try again later.',
    'error.unauthorized': 'You are not authorized to perform this action.',
    'error.notFound': 'The requested resource was not found.',
    'error.validation': 'Please check your input and try again.',
    'error.unknown': 'An unknown error occurred.',
    
    // Success messages
    'success.login': 'Successfully logged in!',
    'success.logout': 'Successfully logged out!',
    'success.register': 'Account created successfully!',
    'success.booking': 'Booking confirmed successfully!',
    'success.update': 'Updated successfully!',
    'success.delete': 'Deleted successfully!',
    'success.save': 'Saved successfully!',
    
    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.help': 'Help Center',
    'footer.newsletter': 'Newsletter',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.search': 'البحث',
    'nav.destinations': 'الوجهات',
    'nav.deals': 'العروض',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.profile': 'الملف الشخصي',
    'nav.bookings': 'حجوزاتي',
    'nav.favorites': 'المفضلة',
    'nav.logout': 'تسجيل الخروج',
    'nav.admin': 'لوحة الإدارة',
    
    // Home page
    'home.hero.title': 'اعثر على الإقامة المثالية',
    'home.hero.subtitle': 'اكتشف الفنادق الرائعة واحجز إقامتك المثالية حول العالم',
    'home.hero.search': 'البحث عن الفنادق',
    'home.search.where': 'إلى أين تذهب؟',
    'home.search.checkin': 'تاريخ الوصول',
    'home.search.checkout': 'تاريخ المغادرة',
    'home.search.guests': 'الضيوف',
    'home.search.rooms': 'الغرف',
    'home.search.search': 'بحث',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.close': 'إغلاق',
    'common.confirm': 'تأكيد',
    'common.back': 'السابق',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.search': 'بحث',
    'common.filter': 'فلترة',
    'common.clear': 'مسح',
    'common.apply': 'تطبيق',
    'common.reset': 'إعادة تعيين',
    'common.sort': 'ترتيب',
    'common.sortby': 'ترتيب حسب',
    'common.more': 'المزيد',
    'common.less': 'أقل',
    'common.all': 'الكل',
    'common.none': 'لا يوجد',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.unknown': 'غير معروف',
    'common.optional': 'اختياري',
    'common.required': 'مطلوب',
    'common.nights': 'ليالي',
    'common.night': 'ليلة',
    'common.rooms': 'غرف',
    'common.room': 'غرفة',
    'common.guests': 'ضيوف',
    'common.guest': 'ضيف',
    'common.adults': 'بالغون',
    'common.adult': 'بالغ',
    'common.children': 'أطفال',
    'common.child': 'طفل',
    
    // Hotel
    'hotel.viewDetails': 'عرض التفاصيل',
    'hotel.bookNow': 'احجز الآن',
    'hotel.addToFavorites': 'إضافة للمفضلة',
    'hotel.removeFromFavorites': 'إزالة من المفضلة',
    'hotel.share': 'مشاركة',
    'hotel.photos': 'الصور',
    'hotel.amenities': 'المرافق',
    'hotel.location': 'الموقع',
    'hotel.reviews': 'التقييمات',
    'hotel.policies': 'السياسات',
    'hotel.description': 'الوصف',
    'hotel.availability': 'التوفر',
    'hotel.checkin': 'الوصول',
    'hotel.checkout': 'المغادرة',
    'hotel.rating': 'التقييم',
    'hotel.reviewCount': '{count} تقييم',
    'hotel.priceFrom': 'السعر يبدأ من',
    'hotel.perNight': 'في الليلة',
    'hotel.freeCancellation': 'إلغاء مجاني',
    'hotel.noCancellation': 'لا يمكن الإلغاء',
    'hotel.breakfastIncluded': 'شامل الإفطار',
    'hotel.petFriendly': 'مسموح باصطحاب الحيوانات',
    'hotel.parking': 'موقف سيارات',
    'hotel.wifi': 'واي فاي مجاني',
    'hotel.pool': 'مسبح',
    'hotel.spa': 'سبا',
    'hotel.gym': 'مركز لياقة',
    'hotel.restaurant': 'مطعم',
    'hotel.bar': 'بار',
    'hotel.airConditioning': 'تكييف الهواء',
    
    // Booking
    'booking.title': 'أكمل حجزك',
    'booking.guestInfo': 'معلومات الضيف',
    'booking.paymentInfo': 'معلومات الدفع',
    'booking.confirmation': 'تأكيد الحجز',
    'booking.firstName': 'الاسم الأول',
    'booking.lastName': 'اسم العائلة',
    'booking.email': 'البريد الإلكتروني',
    'booking.phone': 'رقم الهاتف',
    'booking.specialRequests': 'طلبات خاصة',
    'booking.paymentMethod': 'طريقة الدفع',
    'booking.cardNumber': 'رقم البطاقة',
    'booking.expiryDate': 'تاريخ الانتهاء',
    'booking.cvv': 'رمز الأمان',
    'booking.billingAddress': 'عنوان الفواتير',
    'booking.summary': 'ملخص الحجز',
    'booking.subtotal': 'المجموع الفرعي',
    'booking.taxes': 'الضرائب',
    'booking.fees': 'الرسوم',
    'booking.total': 'المجموع',
    'booking.bookingReference': 'مرجع الحجز',
    'booking.status': 'الحالة',
    'booking.confirmed': 'مؤكد',
    'booking.pending': 'في الانتظار',
    'booking.cancelled': 'ملغى',
    'booking.checkin': 'الوصول',
    'booking.checkout': 'المغادرة',
    
    // Forms
    'form.email': 'البريد الإلكتروني',
    'form.password': 'كلمة المرور',
    'form.confirmPassword': 'تأكيد كلمة المرور',
    'form.firstName': 'الاسم الأول',
    'form.lastName': 'اسم العائلة',
    'form.phone': 'رقم الهاتف',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.country': 'الدولة',
    'form.postalCode': 'الرمز البريدي',
    'form.required': 'هذا الحقل مطلوب',
    'form.invalidEmail': 'يرجى إدخال بريد إلكتروني صحيح',
    'form.passwordMismatch': 'كلمات المرور غير متطابقة',
    'form.minLength': 'يجب أن يكون على الأقل {min} أحرف',
    'form.maxLength': 'يجب أن يكون لا أكثر من {max} حرف',
    
    // Search
    'search.results': 'نتائج البحث',
    'search.filters': 'المرشحات',
    'search.sortBy': 'ترتيب حسب',
    'search.priceRange': 'نطاق السعر',
    'search.starRating': 'تقييم النجوم',
    'search.propertyType': 'نوع العقار',
    'search.amenities': 'المرافق',
    'search.reviewScore': 'تقييم المراجعات',
    'search.distance': 'المسافة من المركز',
    'search.freeCancellation': 'إلغاء مجاني',
    'search.breakfastIncluded': 'شامل الإفطار',
    'search.petFriendly': 'مسموح باصطحاب الحيوانات',
    'search.hotelsFound': 'تم العثور على {count} فندق',
    'search.noResults': 'لم يتم العثور على فنادق لبحثك',
    'search.tryAdjusting': 'جرب تعديل معايير البحث',
    
    // Currency
    'currency.usd': 'دولار أمريكي',
    'currency.eur': 'يورو',
    'currency.gbp': 'جنيه إسترليني',
    'currency.dzd': 'دينار جزائري',
    'currency.perNight': '/ليلة',
    'currency.perStay': '/إقامة',
    
    // Date
    'date.today': 'اليوم',
    'date.tomorrow': 'غداً',
    'date.yesterday': 'أمس',
    'date.thisWeek': 'هذا الأسبوع',
    'date.lastWeek': 'الأسبوع الماضي',
    'date.thisMonth': 'هذا الشهر',
    'date.lastMonth': 'الشهر الماضي',
    'date.format': 'DD MMM YYYY',
    'date.formatShort': 'DD/MM/YYYY',
    'date.formatLong': 'DD MMMM YYYY',
    
    // Error messages
    'error.network': 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
    'error.server': 'خطأ في الخادم. يرجى المحاولة لاحقاً.',
    'error.unauthorized': 'غير مخول لك تنفيذ هذا الإجراء.',
    'error.notFound': 'لم يتم العثور على المورد المطلوب.',
    'error.validation': 'يرجى التحقق من إدخالك والمحاولة مرة أخرى.',
    'error.unknown': 'حدث خطأ غير معروف.',
    
    // Success messages
    'success.login': 'تم تسجيل الدخول بنجاح!',
    'success.logout': 'تم تسجيل الخروج بنجاح!',
    'success.register': 'تم إنشاء الحساب بنجاح!',
    'success.booking': 'تم تأكيد الحجز بنجاح!',
    'success.update': 'تم التحديث بنجاح!',
    'success.delete': 'تم الحذف بنجاح!',
    'success.save': 'تم الحفظ بنجاح!',
    
    // Footer
    'footer.about': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.help': 'مركز المساعدة',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.followUs': 'تابعنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
  
  // Add other languages as needed...
  fr: {},
  es: {},
  de: {},
  it: {},
  pt: {},
  ru: {},
  zh: {},
  ja: {},
  ko: {},
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()

  // Load language preference
  useEffect(() => {
    // Try to get from localStorage first
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && supportedLanguages.find(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage)
      return
    }

    // Try to get from user preferences
    if (user?.preferences?.language) {
      const userLanguage = user.preferences.language as Language
      if (supportedLanguages.find(lang => lang.code === userLanguage)) {
        setLanguage(userLanguage)
        return
      }
    }

    // Try to detect from browser locale
    const browserLanguage = navigator.language.split('-')[0] as Language
    if (supportedLanguages.find(lang => lang.code === browserLanguage)) {
      setLanguage(browserLanguage)
      return
    }

    // Default to English
    setLanguage('en')
  }, [user])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    
    // Update user preferences if logged in
    if (user) {
      // Here you would typically update user preferences via API
      console.log('Updating language preference to:', lang)
    }

    // Update document direction for RTL languages
    const isRTL = getLanguageInfo(lang).rtl
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const getLanguageInfo = (lang: Language): LanguageInfo => {
    return supportedLanguages.find(l => l.code === lang) || supportedLanguages[0]
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language]?.[key] || translations.en[key] || key
    
    // Replace parameters in the translation
    if (params) {
      return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
        const value = params[paramKey]
        return value !== undefined ? String(value) : match
      })
    }
    
    return translation
  }

  const isRTL = getLanguageInfo(language).rtl

  const formatCurrency = (amount: number, currency = 'USD'): string => {
    const formatter = new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
    })
    return formatter.format(amount)
  }

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    
    const formatter = new Intl.DateTimeFormat(language, options || defaultOptions)
    return formatter.format(date)
  }

  const formatNumber = (number: number): string => {
    const formatter = new Intl.NumberFormat(language)
    return formatter.format(number)
  }

  const value: LanguageContextType = {
    language,
    setLanguage: changeLanguage,
    t,
    isRTL,
    formatCurrency,
    formatDate,
    formatNumber,
    supportedLanguages,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}