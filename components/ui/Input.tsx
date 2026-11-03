import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-2.5 rounded-lg border ${
          error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-brand-500'
        } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
