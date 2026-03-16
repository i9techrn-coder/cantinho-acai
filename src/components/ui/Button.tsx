'use strict'

import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'chocolate'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
            outline: 'border-2 border-primary text-primary hover:bg-primary/10',
            ghost: 'hover:bg-primary/10 text-primary',
            chocolate: 'bg-chocolate text-white hover:bg-chocolate/90',
        }

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-6 py-3',
            lg: 'px-8 py-4 text-lg font-semibold',
        }

        return (
            <button
                ref={ref}
                className={`
          inline-flex items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none
          ${variants[variant]}
          ${sizes[size]}
          ${className || ''}
        `}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }
