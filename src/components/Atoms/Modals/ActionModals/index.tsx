import { ReactNode } from "react";
import ModalsFrame, { ModalsFrameProps } from "..";
import { Warning2 } from "iconsax-react";
import Button from "../../Button";

interface ActionModalsProps extends ModalsFrameProps {
  isLoading?: boolean;
  icons?: React.ReactNode;
  title?: string;
  rejectButtonText?: string;
  onReject: () => void;
  onSubmit: () => void;
  approveButtonText?: string;
}

export default function ActionModals({
  isLoading = false,
  open,
  icons,
  title,
  rejectButtonText = "Reject",
  onReject,
  onSubmit,
  approveButtonText = "Approve",
  children,
  onClose,
}: ActionModalsProps) {
  return (
    <ModalsFrame open={open} onClose={onClose}>
      {icons && <div>{icons}</div>}
      <div className={`items-center flex justify-center flex-col`}>
        <div className={`h2 font-medium font-montserrat text-center`}>{title}</div>
        <div className={`body1 mt-3 text-center`}>{children}</div>
      </div>

      <div className={`flex items-center justify-center gap-4 w-full`}>
        <Button
          isLoading={isLoading}
          onClick={onReject}
          className={`!bg-gray-200 !text-black w-full md:max-w-[200px] hover:!bg-gray-300 `}
        >
          {rejectButtonText}
        </Button>
        <Button onClick={onSubmit} className={`w-full md:max-w-[200px]`}>
          {approveButtonText}
        </Button>
      </div>
    </ModalsFrame>
  );
}
