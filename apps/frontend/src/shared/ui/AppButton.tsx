import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  shape?: 'square' | 'default';
  isActive: boolean;
};

export const AppButton = ({
  variant = 'primary',
  shape = 'default',
  isActive = false,
  className,
  ...props
}: Props) => {
  const baseStyles = 'px-4 py-2 font-medium transition';

  const styles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    default: 'rounded-full',
    square: '',
  };

  return (
    <button
      disabled={isActive}
      className={`${baseStyles} ${styles[variant]} ${styles[shape]} ${className} ${isActive ? 'disabled:bg-blue-800' : 'disabled:bg-gray-500'}`}
      {...props}
    />
  );
};
