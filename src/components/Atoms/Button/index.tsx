interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  disabled,
  isLoading,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`${className} bg-primary text-white w-full py-3 active:bg-opacity-80 md:hover:bg-opacity-80 `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
