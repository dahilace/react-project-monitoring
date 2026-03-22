import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  children: React.ReactNode
}

export const AppInput = forwardRef<HTMLInputElement, Props>(
  ({  error, className, children, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-sm">{children}</span>
        <input
          ref={ref}
          className={`border p-2 rounded ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </label>
    )
  }
)