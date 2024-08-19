import { Warning2 } from "iconsax-react";
import Button from "../Button";

export interface ModalsFrameProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalsFrame({
  open,
  onClose,
  children,
}: ModalsFrameProps) {
  return (
    <div
      onClick={onClose}
      className={`${
        open ? "visible opacity-100 " : "invisible opacity-50"
      }  transition-all duration-300 fixed w-screen h-screen top-0 left-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm z-50 flex  items-center justify-center`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          open ? "opacity-100  " : "opacity-0 "
        }   bg-white rounded-md flex flex-col items-center justify-center px-4 py-8 md:p-20 gap-8 md:min-w-[650px] md:max-w-[850px]`}
      >
        {children}
      </div>
    </div>
  );
}
