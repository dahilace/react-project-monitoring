import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
  children: React.ReactNode;
};

export const AppInput = forwardRef<HTMLInputElement, Props>(
  ({ error, className, children, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">{children}</span>
        <input
          ref={ref}
          className={`px-3 py-2 rounded-lg border border-gray-300 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
             transition
             disabled:text-gray-400 disabled:bg-gray-100 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </label>
    );
  },
);
