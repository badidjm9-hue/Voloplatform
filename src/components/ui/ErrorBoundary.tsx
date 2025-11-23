'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Container } from './Container'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })

    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <Container>
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <AlertTriangle className="w-16 h-16 text-error-500 mx-auto" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Something went wrong
              </h1>
              
              <p className="text-muted-600 mb-6">
                We apologize for the inconvenience. An unexpected error occurred while processing your request.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-muted-100 dark:bg-primary-800 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-error-600 dark:text-error-400 mb-2">
                    Error Details (Development)
                  </h3>
                  <pre className="text-xs text-muted-700 dark:text-muted-300 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-muted-200 dark:border-primary-700">
                <p className="text-sm text-muted-500">
                  If this problem persists, please contact our{' '}
                  <a 
                    href="/contact" 
                    className="text-primary-500 hover:text-primary-600 underline"
                  >
                    support team
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      )
    }

    return this.props.children
  }
}