import { useEffect, type ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const AppModal = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded w-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-3 right-4 p-2" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
