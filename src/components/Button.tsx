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
    primary: "primary-bg secondary-text",
    secondary: "border border-black text-black hover:bg-gray-100",
    danger: "bg-red-500 hover:bg-red-700",
    link: "hover:text-gray-600",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled
          ? variant === "link"
            ? "text-gray-400 hover:text-gray-400"
            : "bg-gray-500 hover:bg-gray-500"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
