"use client";
import { redirect, usePathname } from "next/navigation";
import Sidebar from "../Sidebar";
import { useEffect } from "react";
import { localStorageMixins } from "@/localStorage.mixins";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  useEffect(() => {
    const access_token = localStorageMixins.get(`access_token`);
    if (!access_token && !path.includes(`/login`)) {
      redirect("/login");
    }
  }, []);
  if (path !== "/login") {
    return <Sidebar>{children}</Sidebar>;
  } else {
    return children;
  }
}
