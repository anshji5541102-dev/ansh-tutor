import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
    secondary: 'bg-white text-brand-600 border border-brand-600 hover:bg-brand-50 focus:ring-brand-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  }

  const sizes = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-5 py-2.5 gap-2',
    lg: 'text-lg px-7 py-3 gap-2.5',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
