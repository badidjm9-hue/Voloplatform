import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Hotel Booking Platform - Find & Book Hotels Worldwide',
    template: '%s | Hotel Booking Platform'
  },
  description: 'Discover and book hotels worldwide with our comprehensive booking platform. Compare prices, read reviews, and find the perfect accommodation for your trip.',
  keywords: 'hotel, booking, travel, accommodation, hotels, vacation, stay, lodging',
  authors: [{ name: 'MiniMax Agent' }],
  creator: 'MiniMax Agent',
  publisher: 'Hotel Booking Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-SA': '/ar-SA',
      'fr-FR': '/fr-FR',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    title: 'Hotel Booking Platform - Find & Book Hotels Worldwide',
    description: 'Discover and book hotels worldwide with our comprehensive booking platform.',
    url: '/',
    siteName: 'Hotel Booking Platform',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hotel Booking Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Booking Platform - Find & Book Hotels Worldwide',
    description: 'Discover and book hotels worldwide with our comprehensive booking platform.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'msapplication-TileColor': '#2C3E50',
    'theme-color': '#2C3E50',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.stripe.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        
        {/* DNS prefetch for external APIs */}
        <link rel="dns-prefetch" href="https://api.ratehawk.com" />
        <link rel="dns-prefetch" href="https://test.api.amadeus.com" />
        <link rel="dns-prefetch" href="https://api.expedia.com" />
        
        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Hotel Booking Platform",
              "description": "Find and book hotels worldwide",
              "url": process.env.NEXT_PUBLIC_APP_URL,
              "logo": `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
              "sameAs": [
                "https://twitter.com/hotelbooking",
                "https://facebook.com/hotelbooking",
                "https://instagram.com/hotelbooking"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-0123",
                "contactType": "Customer Service"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ErrorBoundary>
          <Providers>
            <div className="flex flex-col min-h-screen">
              {/* Navigation Header */}
              <Navigation />
              
              {/* Main Content */}
              <main className="flex-1" role="main">
                {children}
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
            
            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#2C3E50',
                  color: '#fff',
                  borderRadius: '0.75rem',
                  padding: '12px 16px',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </Providers>
        </ErrorBoundary>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}