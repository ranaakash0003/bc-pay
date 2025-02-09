import React from "react";

type ButtonPropsTypes = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "link";
  className?: string;
};

const Button = ({
  onClick,
  type = "button",
  disabled = false,
  children,
  variant = "primary",
  className = "",
}: ButtonPropsTypes) => {
  const baseStyles = "px-3 py-2 rounded-md transition duration-300 text-sm";
  const variantStyles = {
    primary: disabled
      ? "primary-bg secondary-text"
      : "primary-bg secondary-text hover:bg-gray-700",
    secondary: "border border-black text-black hover:bg-gray-100",
    danger: "bg-red-500 hover:bg-red-700",
    link: disabled ? "text-gray-400" : "primary-clr hover:text-gray-500",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
