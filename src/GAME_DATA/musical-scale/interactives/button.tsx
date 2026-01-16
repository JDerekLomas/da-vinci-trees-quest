import React from 'react';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  tabIndex? : string
}
const Button: React.FC<ButtonProps> = ({ className, onClick, children, disabled, ariaLabel }) => {
  const baseClasses = 'px-6 py-3 rounded-md w-64';
  return (
    <button
      className={`${baseClasses} ${className || ''} ${disabled ? 'disabled:bg-[#757575] disabled:cursor-not-allowed text-white border-[#757575]' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </button>
  );
};

export default Button;