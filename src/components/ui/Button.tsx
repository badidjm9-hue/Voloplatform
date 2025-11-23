'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      fullWidth = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden',
    ]

    const variantClasses = {
      primary: [
        'bg-primary-500 text-white',
        'hover:bg-primary-600 active:bg-primary-700',
        'focus:ring-primary-500',
        'disabled:hover:bg-primary-500',
      ],
      secondary: [
        'bg-secondary-500 text-white',
        'hover:bg-secondary-600 active:bg-secondary-700',
        'focus:ring-secondary-500',
        'disabled:hover:bg-secondary-500',
      ],
      accent: [
        'bg-accent-500 text-white',
        'hover:bg-accent-600 active:bg-accent-700',
        'focus:ring-accent-500',
        'disabled:hover:bg-accent-500',
      ],
      outline: [
        'border-2 border-primary-500 text-primary-500',
        'hover:bg-primary-500 hover:text-white',
        'focus:ring-primary-500',
        'disabled:hover:border-primary-500 disabled:hover:text-primary-500',
      ],
      ghost: [
        'text-muted-600 hover:text-foreground',
        'hover:bg-muted-100 dark:hover:bg-primary-800',
        'focus:ring-muted-300 dark:focus:ring-primary-600',
        'disabled:hover:text-muted-600 disabled:hover:bg-transparent',
      ],
      danger: [
        'bg-error-500 text-white',
        'hover:bg-error-600 active:bg-error-700',
        'focus:ring-error-500',
        'disabled:hover:bg-error-500',
      ],
    }

    const sizeClasses = {
      sm: ['px-3 py-1.5 text-sm'],
      md: ['px-4 py-2 text-sm'],
      lg: ['px-6 py-3 text-base'],
      xl: ['px-8 py-4 text-lg'],
    }

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                'spinner border-2 border-current border-t-transparent',
                iconSizeClasses[size]
              )}
            />
          </div>
        )}
        
        <div className={cn('flex items-center gap-2', loading && 'invisible')}>
          {leftIcon && (
            <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
              {leftIcon}
            </span>
          )}
          {children && <span>{children}</span>}
          {rightIcon && (
            <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
              {rightIcon}
            </span>
          )}
        </div>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }