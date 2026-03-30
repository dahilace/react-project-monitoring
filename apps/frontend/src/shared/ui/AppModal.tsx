import { useEffect, type ReactNode } from 'react';
import { CloseButton } from './CloseButton';

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
      className="fixed inset-0 bg-black/50 flex z-1000 w-full"
      onClick={onClose}
    >
      <div className="relative m-auto max-w-120 w-full p-4" onClick={(e) => e.stopPropagation()}>
        <CloseButton className="absolute top-6 right-6" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};
