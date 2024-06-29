import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  disabled,
  isLoading,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type}
      disabled={disabled || isLoading}
      className={`${className} bg-primary text-white w-full py-3 active:bg-opacity-80 md:hover:bg-opacity-80 disabled:!bg-gray-300 disabled:!border-gray-300 disabled:!text-gray-500 `}
      onClick={onClick}
    >
      {isLoading}
      {children}
    </button>
  );
}
