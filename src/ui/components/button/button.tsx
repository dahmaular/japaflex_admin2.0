import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";
import styles from "./button.module.css";

type IconPosition = "left" | "right";
type Variant = "primary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconPosition?: IconPosition;
  className?: string;
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  asChild?: boolean;
  iconOnly?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = "left",
  className,
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  asChild = false,
  disabled,
  iconOnly = false,
  ...props
}) => {
  const Component = asChild ? Slot : "button";

  const baseClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.iconOnly]: iconOnly,
    },
    className
  );

  console.log("Button classes:", baseClass);

  return (
    <Component
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      className={baseClass}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className={styles.spinner}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className={styles.srOnly}>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && !iconOnly && <span>{icon}</span>}
          {!iconOnly && <span>{children}</span>}
          {icon && iconPosition === "right" && !iconOnly && <span>{icon}</span>}
          {iconOnly && icon}
        </>
      )}
    </Component>
  );
};

export default Button;
