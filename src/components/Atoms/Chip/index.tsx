interface ChipProps {
  color?: "success" | "warning" | "error" | "disabled";
  children: string;
}

export default function Chip({ children, color = "success" }: ChipProps) {
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
    case "disabled":
      colorProps = "bg-gray-200 text-gray-500";
      break;
    default:
      colorProps = "bg-green-200 text-green-600";
      break;
  }
  return (
    <div className={`w-fit px-3 py-1 rounded-3xl ${colorProps} `}>
      {children}
    </div>
  );
}
