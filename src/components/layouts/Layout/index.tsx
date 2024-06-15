"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  if (path !== "/login") {
    return <Sidebar>{children}</Sidebar>;
  } else {
    return children;
  }
}
