import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  onClick: () => void;
  fit?: boolean;
};

export const CloseButton = ({ className, onClick, ...props }: Props) => {
  return (
    <button
      {...props}
      onClick={onClick}
      title="Закрыть"
      className={`${className}
      `}
    >
      <div className="relative hover:text-red-700 transition p-4">
        <div className="absolute top-1/2 left-1/2 transform rotate-45 -translate-x-1/2 -translate-y-1/2 w-5 h-0.5 bg-current"></div>
        <div className="absolute top-1/2 left-1/2 transform rotate-45 -translate-x-1/2 -translate-y-1/2 w-0.5 h-5 bg-current"></div>
      </div>
    </button>
  );
};
