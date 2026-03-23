import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

export const AppSelect = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1">
        {label && <span className="text-sm font-medium">{label}</span>}

        <select
          ref={ref}
          className={`border p-2 rounded ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value.toLowerCase()}
              value={opt.value.toLowerCase()}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {error && <span className="text-red-500 text-sm">{error}</span>}
      </label>
    );
  },
);
