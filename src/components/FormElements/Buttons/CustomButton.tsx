import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './CustomButton.css';

type CustomButtonProps = {
  children: ReactNode;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'text';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const CustomButton = ({
  children,
  to,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
}: CustomButtonProps) => {
  const classes = `
    custom-button
    custom-button--${variant}
    ${fullWidth ? 'custom-button--full-width' : ''}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;