import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

// API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // 30 seconds timeout
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    // Request interceptor for adding auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = localStorage.getItem('refreshToken')
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken)
              if (response.success && response.data) {
                localStorage.setItem('accessToken', response.data.accessToken)
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
                return this.client(originalRequest)
              }
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            window.location.href = '/auth/login'
          }
        }

        // Handle other errors
        if (error.response?.status >= 500) {
          toast.error('Server error. Please try again later.')
        } else if (error.response?.status >= 400) {
          const errorMessage = error.response?.data?.message || 'An error occurred'
          toast.error(errorMessage)
        } else if (error.code === 'ECONNABORTED') {
          toast.error('Request timeout. Please check your connection.')
        }

        return Promise.reject(error)
      }
    )
  }

  // Generic request method
  async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.request(config)
  }

  // GET request
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(url, config)
  }

  // POST request
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config)
  }

  // PUT request
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config)
  }

  // PATCH request
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch(url, data, config)
  }

  // DELETE request
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config)
  }

  // File upload
  async upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<AxiosResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })
  }

  // Refresh token
  async refreshToken(refreshToken: string) {
    return this.client.post('/auth/refresh', { refreshToken })
  }

  // Health check
  async healthCheck() {
    return this.client.get('/health')
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

// API response wrapper
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

// Utility function to handle API responses
export function handleApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  const { data } = response
  
  if (!data.success && data.error) {
    throw new Error(data.error)
  }
  
  return data.data as T
}

// Utility function to handle form data submissions
export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData()
  
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    
    if (value instanceof File) {
      formData.append(key, value)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && !(item instanceof File)) {
          formData.append(`${key}[${index}]`, JSON.stringify(item))
        } else {
          formData.append(`${key}[${index}]`, String(item))
        }
      })
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, String(value))
    }
  })
  
  return formData
}

// Utility function to build query string
export function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    
    if (Array.isArray(value)) {
      value.forEach(item => query.append(key, String(item)))
    } else if (typeof value === 'object') {
      query.append(key, JSON.stringify(value))
    } else {
      query.append(key, String(value))
    }
  })
  
  return query.toString()
}

// Error handling utilities
export class ApiError extends Error {
  public statusCode?: number
  public code?: string

  constructor(message: string, statusCode?: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = code
  }
}

// Request retry utility
export async function withRetry<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries) {
        throw error
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)))
    }
  }
  
  throw lastError
}