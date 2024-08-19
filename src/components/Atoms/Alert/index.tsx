'use client'
import { useEffect } from "react";
import { CloseCircle } from "iconsax-react";

interface AlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const Alert: React.FC<AlertProps> = ({
  message,
  isVisible,
  onClose,
  showCloseButton = true,
  autoClose = true,
  autoCloseTime = 3000,
}) => {
  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="max-w-[280px] fixed left-4 bottom-20 md:bottom-4 md:left-4 bg-green-200 text-green-700  p-4 rounded shadow-lg flex items-center justify-between z-50">
      <span>{message}</span>
      {showCloseButton && (
        <button onClick={onClose} className="ml-4">
          <CloseCircle className={`size-6`} />
        </button>
      )}
    </div>
  );
};

export default Alert;
