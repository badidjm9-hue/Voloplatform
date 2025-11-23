'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, User, Heart, Calendar, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useThemeToggle, useThemeStyles } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils/cn'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()
  const themeStyles = useThemeStyles()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.search'), href: '/search' },
    { name: t('nav.destinations'), href: '/destinations' },
    { name: t('nav.deals'), href: '/deals' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-lg dark:bg-primary-900/80 dark:border-primary-700">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl text-primary-900 dark:text-white">
                HotelBooking
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-primary-500',
                  isActive(item.href)
                    ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                    : 'text-muted-600 dark:text-muted-300'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted-100 dark:hover:bg-primary-800 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-muted-700 dark:text-muted-300">
                    {user.firstName}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-primary-800 rounded-lg shadow-lg border border-muted-200 dark:border-primary-700 py-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-700 dark:text-muted-300 hover:bg-muted-100 dark:hover:bg-primary-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <Link
                      href="/dashboard/bookings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-700 dark:text-muted-300 hover:bg-muted-100 dark:hover:bg-primary-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('nav.bookings')}</span>
                    </Link>
                    <Link
                      href="/dashboard/favorites"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-700 dark:text-muted-300 hover:bg-muted-100 dark:hover:bg-primary-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4" />
                      <span>{t('nav.favorites')}</span>
                    </Link>
                    {user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? (
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-700 dark:text-muted-300 hover:bg-muted-100 dark:hover:bg-primary-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>{t('nav.admin')}</span>
                      </Link>
                    ) : null}
                    <hr className="my-2 border-muted-200 dark:border-primary-700" />
                    <button
                      onClick={() => {
                        logout()
                        setIsUserMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-muted-100 dark:hover:bg-primary-700 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted-100 dark:hover:bg-primary-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-primary-900 border-t border-muted-200 dark:border-primary-700">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-800'
                      : 'text-muted-700 dark:text-muted-300 hover:text-primary-500 hover:bg-muted-100 dark:hover:bg-primary-800'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Menu */}
              <div className="border-t border-muted-200 dark:border-primary-700 pt-4 mt-4">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="text-base font-medium text-muted-700 dark:text-muted-300">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-700 dark:text-muted-300 hover:text-primary-500 hover:bg-muted-100 dark:hover:bg-primary-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{t('nav.profile')}</span>
                    </Link>
                    <Link
                      href="/dashboard/bookings"
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-700 dark:text-muted-300 hover:text-primary-500 hover:bg-muted-100 dark:hover:bg-primary-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('nav.bookings')}</span>
                    </Link>
                    <Link
                      href="/dashboard/favorites"
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-700 dark:text-muted-300 hover:text-primary-500 hover:bg-muted-100 dark:hover:bg-primary-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4" />
                      <span>{t('nav.favorites')}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-error-600 dark:text-error-400 hover:bg-muted-100 dark:hover:bg-primary-800 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 text-base font-medium text-muted-700 dark:text-muted-300 hover:text-primary-500 hover:bg-muted-100 dark:hover:bg-primary-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-3 py-2 text-base font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}