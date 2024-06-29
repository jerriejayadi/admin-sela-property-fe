import { TickCircle } from "iconsax-react";

interface AlertProps {
  icons?: React.ReactNode;
  className?: string;
  color?: "success" | "warning" | "error";
}

export default function Alert({
  icons,
  className,
  color = "success",
}: AlertProps) {
  let colorProps;
  switch (color) {
    case "warning":
      colorProps = "bg-yellow-200 text-yellow-600";
      break;
    case "success":
      colorProps = "bg-green-200 text-green-600";
      break;
    case "error":
      colorProps = "bg-red-200 text-red-600";
      break;
    default:
      colorProps = "bg-green-200 text-green-600";
      break;
  }
  return (
    <div
      className={`${colorProps} px-5 py-3 rounded-lg w-full flex items-center gap-2 ${
        className ?? ""
      }`}
    >
      <div>
        <TickCircle className={`size-6`} />
      </div>
      <div>Hello World</div>
    </div>
  );
}
