// Button.tsx
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import Icon from "./Icon"; // Assuming the path is correct

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: IconType; // Use IconType for dynamic icons
  loadingClass?: string;
  iconPosition?: "left" | "right";
  iconClass?: string;
  link?: string;
  onClick?: () => void;
  div?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  isLoading,
  disabled,
  className = "bg-primary-500 text-white",
  children,
  icon,
  loadingClass = "unset-classname",
  iconPosition = "left",
  iconClass = "text-[20px]",
  link,
  onClick,
  div,
}) => {
  const renderIcon = () => {
    if (icon) {
      return (
        <span
          className={`
            ${iconPosition === "right" ? "order-1 ml-2" : ""}
            ${text && iconPosition === "left" ? "mr-2" : ""}
            ${iconClass}
          `}
        >
          <Icon icon={icon} />
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {!link && !div && (
        <button
          type={type}
          onClick={onClick}
          className={`btn btn-primary inline-flex justify-center ${
            isLoading ? "pointer-events-none" : ""
          } ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
        >
          {children && !isLoading && children}

          {!children && !isLoading && (
            <span className="flex items-center">
              {renderIcon()}
              <span>{text}</span>
            </span>
          )}

          {isLoading && (
            <>
              <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading ...
            </>
          )}
        </button>
      )}
      {!link && div && (
        <div
          onClick={onClick}
          className={`btn btn inline-flex justify-center   ${
            isLoading ? " pointer-events-none" : ""
          }
        ${disabled ? " opacity-40 cursor-not-allowed" : ""}
        ${className}`}
        >
          {/* if has children and not loading*/}
          {children && !isLoading && children}

          {/* if no children and  loading*/}
          {!children && !isLoading && (
            <span className="flex items-center">
              {renderIcon()}
              <span>{text}</span>
            </span>
          )}

          {/* if loading*/}
          {isLoading && (
            <>
              <svg
                className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading ...
            </>
          )}
        </div>
      )}
      {link && !div && (
        <Link
          href={link}
          className={`btn btn-primary inline-flex justify-center   ${
            isLoading ? " pointer-events-none" : ""
          }
        ${disabled ? " opacity-40 cursor-not-allowed" : ""}
        ${className}`}
        >
          {/* if has children and not loading*/}
          {children && !isLoading && children}

          {/* if no children and  loading*/}
          {!children && !isLoading && (
            <span className="flex items-center">
              {renderIcon()}
              <span>{text}</span>
            </span>
          )}

          {/* if loading*/}
          {isLoading && (
            <>
              <svg
                className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading ...
            </>
          )}
        </Link>
      )}
    </>
  );
};

export default Button;
