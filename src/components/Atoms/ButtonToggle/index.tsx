import { useState } from "react";

interface ButtonToggleProps {
  active: boolean;
  children: React.ReactNode;
}

export default function ButtonToggle({ children }: ButtonToggleProps) {
  const [active, setActive] = useState<boolean>(false);
  return (
    <button
      className={``}
      onClick={() => {
        setActive(!active);
      }}
    >
      {children}
    </button>
  );
}
