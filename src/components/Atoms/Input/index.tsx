import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | false;
  prefixLabel?: React.ReactNode;
  labelClassName?: string;
  className?: string;
  label: string;
  withPrefix?: boolean;
  actionButton?: React.ReactNode;
}

export default function Input({
  errorMessage,
  className,
  label,
  withPrefix = false,
  prefixLabel,
  actionButton,
  ...props
}: InputProps) {
  return (
    <div className={`${className} body2`}>
      <label className={`font-montserrat body1 mb-3 body2`} htmlFor={props.id}>
        {label}
      </label>
      <div
        className={`flex items-center px-5  ${
          withPrefix && "divide-x divide-gray-300 "
        }  mt-3 border border-gray-300 rounded-lg  ${
          withPrefix && "border border-gray-300 rounded-lg "
        } `}
      >
        {withPrefix && (
          <div className={`pr-3 text-gray-400 `}>{prefixLabel}</div>
        )}
        <input
          {...props}
          className={`bg-[#fcfcfc] py-3 ${
            withPrefix && "pl-3 border-l border-gray-300"
          }   focus:outline-none   w-full `}
        />
        {actionButton}
      </div>
      {errorMessage && (
        <div className={`text-red-500 text-sm mt-2`}>{errorMessage}</div>
      )}
    </div>
  );
}
