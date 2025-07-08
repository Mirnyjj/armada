"use client";
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  ForwardRefRenderFunction,
  useState,
  forwardRef,
  useEffect,
  ChangeEventHandler,
} from "react";

type Props = {
  iconSerach?: boolean;
  width?: string;
  error?: string; // ошибка заполнения поля
  name: string;
  isMessage?: string; // сообщение, связанное с input
  type: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

//   const Container = styled.div`
//     position: relative;
//     display: inline-block;
//     max-height: 77px;
//     box-sizing: border-box;
//   `;
//   const IconContainer = styled.span`
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     right: 28px;
//   `;

//   const IconDownContainer = styled.span`
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     left: 28px;
//   `;
//   const ErrorMessage = styled.p`
//     display: flex;
//     color: red;
//     position: absolute;
//     top: -20%;
//     transform: translateX(-20%);
//     left: 62px;
//     max-width: 360px;
//     background: white;
//     padding: 0 4px;
//     font-size: 12px;
//     font-weight: 400;
//     line-height: 19.2px;
//     letter-spacing: 0.02em;
//     box-sizing: border-box;
//     word-wrap: break-word;
//     white-space: normal;
//     margin: 0 0 3px;
//   `;
const InputContainer: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { className, error, iconSerach: actionUp, name, type, placeholder },
  ref
) => {
  const [isAction, setIsAction] = useState(false);
  const [isActionValue, setIsActionValue] = useState(false); // состояние ввода текста
  useEffect(() => {
    if (actionUp) {
      setIsAction(actionUp);
    }
  }, [actionUp]);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setIsActionValue(target.value.length > 0);
  };

  return (
    <div className="relative max-h-8 max-w-64">
      <div
        className="flex text-red-600 absolute top-[100%] "
        style={{ display: error ? "block" : "none" }}
      >
        {error}
      </div>
      <input
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        id={name}
        name={name}
        type={type}
        className="box-border py-1 pl-1 pr-7"
        onChange={onChange}
        style={{
          borderColor: error ? "red" : isAction ? "#f5f834" : "#0101014d",
        }}
        ref={ref}
        placeholder={placeholder}
      />

      <div className="absolute top-1/2 -translate-y-1/2 right-1">
        {error ? (
          <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
        ) : (
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export const Input = forwardRef(InputContainer);
//   ComponentInput.displayName = "InputContainer";

//   export const Input = styled(ComponentInput)`
//     width: ${({ width = "300px" }) => width};
//     height: 48px;
//     border-radius: 12px;
//     border: 1px solid;
//     font-size: 16px;
//     box-sizing: border-box;
//     outline: none;
//     color: rgba(1, 1, 1, 0.3);
//   `;
