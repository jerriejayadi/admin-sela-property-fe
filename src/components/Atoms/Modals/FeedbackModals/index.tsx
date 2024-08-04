import { icons } from "@tiptap/pm/menu";
import { title } from "process";
import ModalsFrame, { ModalsFrameProps } from "..";
import Button from "../../Button";

interface FeedbackModalsProps extends ModalsFrameProps {
  title: string;
  icons?: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
}

export default function FeedbackModals({
  title,
  open,
  onClose,
  children,
  icons,
  onAction,
  actionText = "action",
}: FeedbackModalsProps) {
  return (
    <ModalsFrame open={open} onClose={onClose}>
      {icons && <div>{icons}</div>}
      <div className={`items-center flex justify-center flex-col`}>
        <div className={`h2 font-medium font-montserrat text-center`}>
          {title}
        </div>
        <div className={`body1 mt-3 text-center`}>{children}</div>
      </div>
      {actionText && (
        <div className="w-full ">
          <Button onClick={onAction}>{actionText}</Button>
        </div>
      )}
    </ModalsFrame>
  );
}
