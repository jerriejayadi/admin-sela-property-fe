"use client";

import Link from "next/link";
import Sidebar from "@/components/layouts/Sidebar";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen text-black gap-3`}
    >
      <div className={`font-bold text-5xl`}>404</div>
      <div className={`text-2xl text-center`}>Page not found</div>
      <div className={`text-center`}>
        Sorry, the page you are looking for is not available
      </div>
      <div className={``}>
        <button
          onClick={() => {
            router.push(`/`);
          }}
          className={`bg-primary text-white px-5 py-2 rounded-lg active:bg-orange-700 hover:bg-orange-700 `}
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}
