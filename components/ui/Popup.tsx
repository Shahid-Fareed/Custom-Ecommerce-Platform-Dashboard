// Popup.tsx
import { useState } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white rounded shadow-lg z-10 relative">
          {children}
          <button
            className="absolute top-2 right-2 text-white"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill=""
              className="text-white fill-white"
            >
              <path
                d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4L14.6 16L8 22.6L9.4 24L16 17.4L22.6 24L24 22.6L17.4 16L24 9.4Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
