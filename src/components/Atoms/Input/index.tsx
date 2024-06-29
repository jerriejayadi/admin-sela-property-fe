import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  prefix?: string;
  labelClassName?: string;
  className?: string;
  label: string;
  withPrefix?: boolean;
}

export default function Input({
  errorMessage,
  className,
  label,
  withPrefix = false,
  prefix,
  ...props
}: InputProps) {
  return (
    <div className={`${className} body2`}>
      <label className={`font-montserrat body1 mb-3 body2`} htmlFor={props.id}>
        {label}
      </label>
      <div
        className={`flex items-center divide-x divide-gray-300 mt-3 ${
          withPrefix && "border border-gray-300 rounded-lg "
        } `}
      >
        {withPrefix && (
          <div className={`px-3 py-3 text-gray-400 `}>{prefix}</div>
        )}
        <input
          {...props}
          className={`bg-[#fcfcfc] ${
            !withPrefix && "border border-gray-300 rounded-lg"
          }   focus:outline-none  px-5 py-3  w-full `}
        />
      </div>
      {errorMessage && <div className={`text-red-500 text-sm mt-2`}>{errorMessage}</div>}
    </div>
  );
}
