import { apiClient, ApiResponse } from './client'
import { User } from '@/types'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

interface RefreshTokenRequest {
  refreshToken: string
}

interface RefreshTokenResponse {
  accessToken: string
}

interface PasswordResetRequest {
  email: string
}

interface PasswordResetConfirmRequest {
  token: string
  password: string
  confirmPassword: string
}

export class AuthApi {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data)
    return response.data
  }

  async register(data: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/register', data)
    return response.data
  }

  async logout(): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/logout')
    return response.data
  }

  async getProfile(): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/auth/profile')
      return response.data.data || null
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.patch<ApiResponse<User>>('/auth/profile', data)
    return response.data
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/change-password', {
      currentPassword,
      newPassword,
    })
    return response.data
  }

  async requestPasswordReset(data: PasswordResetRequest): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/forgot-password', data)
    return response.data
  }

  async confirmPasswordReset(data: PasswordResetConfirmRequest): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/reset-password', data)
    return response.data
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', {
      refreshToken,
    })
    return response.data
  }

  async verifyEmail(token: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/verify-email', { token })
    return response.data
  }

  async resendVerificationEmail(): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/resend-verification')
    return response.data
  }

  async enableTwoFactor(): Promise<ApiResponse<{ qrCode: string; secret: string }>> {
    const response = await apiClient.post<ApiResponse<{ qrCode: string; secret: string }>>('/auth/2fa/enable')
    return response.data
  }

  async confirmTwoFactor(code: string): Promise<ApiResponse<{ backupCodes: string[] }>> {
    const response = await apiClient.post<ApiResponse<{ backupCodes: string[] }>>('/auth/2fa/confirm', { code })
    return response.data
  }

  async disableTwoFactor(code: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/2fa/disable', { code })
    return response.data
  }

  async loginWithGoogle(): Promise<ApiResponse<LoginResponse>> {
    // Redirect to Google OAuth
    window.location.href = '/api/auth/google'
    return { success: false, message: 'Redirecting to Google...' }
  }

  async loginWithFacebook(): Promise<ApiResponse<LoginResponse>> {
    // Redirect to Facebook OAuth
    window.location.href = '/api/auth/facebook'
    return { success: false, message: 'Redirecting to Facebook...' }
  }

  async loginWithApple(): Promise<ApiResponse<LoginResponse>> {
    // Redirect to Apple OAuth
    window.location.href = '/api/auth/apple'
    return { success: false, message: 'Redirecting to Apple...' }
  }
}

export const authApi = new AuthApi()