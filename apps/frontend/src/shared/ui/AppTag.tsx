import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  variant?: 'default' | 'danger' | 'attention' | 'success';
};

export const AppTag = ({
  variant = 'default',
  children,
  className,
  ...props
}: Props) => {
  const styles = {
    default: 'bg-gray-200',
    danger: 'bg-red-200',
    attention: 'bg-yellow-200',
    success: 'bg-green-200',
  };

  return (
    <span
      className={`px-2 py-1 rounded ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
