'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  // Update resolved theme based on theme setting and system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      let newResolvedTheme: 'light' | 'dark'
      
      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        newResolvedTheme = theme
      }
      
      setResolvedTheme(newResolvedTheme)
      
      // Update DOM
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newResolvedTheme)
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content', 
          newResolvedTheme === 'dark' ? '#0b0e12' : '#ECF0F1'
        )
      }
    }

    updateResolvedTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme: changeTheme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Hook for theme-aware styling
export function useThemeStyles() {
  const { isDark } = useTheme()
  
  return {
    // Background colors
    bgPrimary: isDark ? 'bg-primary-800' : 'bg-white',
    bgSecondary: isDark ? 'bg-primary-700' : 'bg-muted-50',
    bgAccent: isDark ? 'bg-primary-900' : 'bg-background',
    
    // Text colors
    textPrimary: isDark ? 'text-white' : 'text-primary-900',
    textSecondary: isDark ? 'text-muted-200' : 'text-muted-600',
    textMuted: isDark ? 'text-muted-400' : 'text-muted-500',
    
    // Border colors
    borderPrimary: isDark ? 'border-primary-600' : 'border-muted-200',
    borderSecondary: isDark ? 'border-primary-700' : 'border-muted-300',
    
    // Shadow styles
    shadowSoft: isDark ? 'shadow-black/20' : 'shadow-muted-900/10',
    shadowMedium: isDark ? 'shadow-black/30' : 'shadow-muted-900/15',
    shadowHard: isDark ? 'shadow-black/40' : 'shadow-muted-900/20',
    
    // Gradient styles
    gradientFrom: isDark ? 'from-primary-800' : 'from-primary-50',
    gradientTo: isDark ? 'to-primary-600' : 'to-primary-100',
    
    // Glass effect
    glass: isDark 
      ? 'bg-black/20 backdrop-blur-md border-white/10' 
      : 'bg-white/70 backdrop-blur-md border-white/20',
    
    // Card styles
    card: isDark 
      ? 'bg-primary-800 border-primary-700' 
      : 'bg-white border-muted-200',
    
    cardHover: isDark 
      ? 'hover:bg-primary-700 hover:border-primary-600' 
      : 'hover:bg-muted-50 hover:border-muted-300',
    
    // Button styles
    buttonPrimary: isDark
      ? 'bg-primary-600 hover:bg-primary-500 text-white border-primary-500'
      : 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500',
    
    buttonOutline: isDark
      ? 'border-primary-600 text-primary-300 hover:bg-primary-600 hover:text-white'
      : 'border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white',
    
    buttonGhost: isDark
      ? 'text-muted-300 hover:bg-primary-800 hover:text-white'
      : 'text-muted-600 hover:bg-muted-100 hover:text-primary-600',
  }
}

// Component for theme toggle button
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { isDark } = useTheme()
  
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-muted-100 hover:bg-muted-200 dark:bg-primary-800 dark:hover:bg-primary-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      {theme === 'light' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
      {theme === 'dark' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
      {theme === 'system' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}