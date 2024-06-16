import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  labelClassName?: string;
  className?: string;
  label: string;
  withPrefix?: boolean;
}

export default function Input({
  className,
  label,
  withPrefix = false,
  prefix,
  ...props
}: InputProps) {
  return (
    <div className={`${className} text-sm`}>
      <label className={`font-montserrat body1 mb-3 body2`} htmlFor={props.id}>
        {label}
      </label>
      <div
        className={`flex items-center divide-x divide-gray-300 mt-2 ${
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
    </div>
  );
}
