'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/types'
import { authApi } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  refreshToken: () => Promise<boolean>
  isAuthenticated: boolean
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    initAuth()
  }, [])

  const initAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const userData = await authApi.getProfile()
        if (userData) {
          setUser(userData)
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await authApi.login({ email, password })
      
      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data
        
        // Store tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        
        // Update user state
        setUser(userData)
        
        toast.success('Successfully logged in!')
        return true
      } else {
        toast.error(response.message || 'Login failed')
        return false
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'Login failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await authApi.register(userData)
      
      if (response.success && response.data) {
        const { user: newUser, accessToken, refreshToken } = response.data
        
        // Store tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        
        // Update user state
        setUser(newUser)
        
        toast.success('Account created successfully!')
        return true
      } else {
        toast.error(response.message || 'Registration failed')
        return false
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Clear tokens
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    
    // Clear user state
    setUser(null)
    
    // Redirect to home
    router.push('/')
    toast.success('Successfully logged out!')
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken')
      if (!refreshTokenValue) {
        return false
      }

      const response = await authApi.refreshToken(refreshTokenValue)
      
      if (response.success && response.data) {
        const { accessToken } = response.data
        localStorage.setItem('accessToken', accessToken)
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
      return false
    }
  }

  // Auto-refresh token before it expires
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token && user) {
      // Refresh token every 45 minutes (assuming 1-hour expiry)
      const refreshInterval = setInterval(() => {
        refreshToken()
      }, 45 * 60 * 1000)

      return () => clearInterval(refreshInterval)
    }
  }, [user])

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname))
      }
    }, [user, loading, router])

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner w-8 h-8" />
        </div>
      )
    }

    if (!user) {
      return null // Will redirect in useEffect
    }

    return <Component {...props} />
  }
}

// Hook for admin-only routes
export function useAdmin() {
  const { user, loading } = useAuth()
  
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
  
  return {
    user,
    loading,
    isAdmin,
    isSuperAdmin: user?.role === 'SUPER_ADMIN',
    hasPermission: (permission: string) => {
      // Add permission logic here based on user role
      if (user?.role === 'SUPER_ADMIN') return true
      if (user?.role === 'ADMIN') return permission !== 'SUPER_ADMIN_ONLY'
      return false
    },
  }
}

// Hook for checking user permissions
export function usePermissions() {
  const { user } = useAuth()
  
  return {
    canManageHotels: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    canManageUsers: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    canViewAnalytics: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    canManageSettings: user?.role === 'SUPER_ADMIN',
    canHandleBookings: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    isHost: user?.role === 'HOST',
    isCustomer: user?.role === 'CUSTOMER',
  }
}