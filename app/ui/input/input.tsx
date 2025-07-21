"use client";
import {
  ForwardRefRenderFunction,
  useState,
  forwardRef,
  useEffect,
} from "react";
import clsx from "clsx";

type Props = {
  iconSerach?: boolean;
  width?: string;
  error?: string;
  name: string;
  isMessage?: string;
  type: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputContainer: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { className, error, iconSerach: actionUp, name, type, placeholder, ...props },
  ref
) => {
  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    if (actionUp) {
      setIsAction(actionUp);
    }
  }, [actionUp]);

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type}
        className={clsx(
          "w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0",
          {
            "border-red-300 focus:border-red-500 focus:ring-red-500/20": error,
            "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20":
              !error,
            "border-yellow-400": isAction && !error,
          },
          className
        )}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export const Input = forwardRef(InputContainer);
