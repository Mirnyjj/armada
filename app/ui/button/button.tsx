import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  disabled,
  variant = "primary",
  size = "md",
  ...rest
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 focus:ring-yellow-500/50 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500/50",
    outline: "border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500/50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      {...rest}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        "transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

