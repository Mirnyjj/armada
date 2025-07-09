import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// transition-colors hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 active:bg-yellow-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50
