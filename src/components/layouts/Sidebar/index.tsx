"use client";

import Image from "next/image";
import Link from "next/link";
import { listMenu } from "./listMenu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowDown2, ArrowUp2, HambergerMenu } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { titleFilter, toTitleCase } from "@/utils";

interface SideBarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SideBarProps) {
  const router = useRouter();
  const path = usePathname();

  const ref = useRef<any>(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target)) {
        setMenu(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const getTitle = () => {
    const title = titleFilter(path.split(`/`)[1]);

    setTitle(toTitleCase(title));
  };

  useEffect(() => {
    getTitle();
  }, [path]);
  const [menu, setMenu] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(toTitleCase(path.split(`/`)[1]));
  return (
    <div className={``}>
      <div className={`flex `}>
        {/* Sidebar */}
        <div
          className={`sticky left-0 md:mx-0 bottom-0 w md:left-0 md:top-0 md:w-[300px] bg-gray-900  text-white md:h-screen hidden md:flex flex-col items-start justify-between gap-5 z-50`}
        >
          <div className={` mx-auto max-w-[350px] md:mx-0 overflow-auto`}>
            {/* icon */}
            <Link
              href={`/`}
              className={` items-center gap-2  z-50 hidden md:flex px-6 py-5`}
            >
              <Image
                className={`w-8 h-8 text-black object-contain`}
                src={"/images/sela-logo-black.png"}
                alt={``}
                width={74}
                height={48}
              />

              <div className={`font-audrey md:text-xl text-base`}>
                {"Sela Property".toUpperCase()}
              </div>
            </Link>

            {/* Menu */}
            <div
              className={`flex items-center md:items-start justify-around md:flex-col py-2 gap-2 md:mt-5 overflow-auto overflow px-4`}
            >
              {listMenu?.map((rows, index) => (
                <Link
                  className={`flex items-center gap-2 justify-center md:justify-start px-3 py-3 md:rounded-lg w-full ${
                    path === rows.path
                      ? "md:bg-white md:bg-opacity-10 text-white"
                      : "text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  } `}
                  key={index}
                  href={rows.path ?? ""}
                >
                  {rows.icon}
                  <span
                    className={`hidden md:block font-montserrat font-normal`}
                  >
                    {rows.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {/* <button
            onClick={() => {
              router.push(`/login`);
            }}
            className={`hidden md:block p-6 hover:text-primary`}
          >
            Logout
          </button> */}
        </div>

        {/* Bottom sidebar */}

        <div className={` flex flex-col w-full`}>
          <div
            className={`sticky top-0 w-full bg-white text-black flex items-center justify-between px-6 py-4 shadow-lg`}
          >
            <div
              className={`flex items-center gap-3 text-2xl font-montserrat font-semibold`}
            >
              {/* <div
                className={`md:hidden active:outline active:outline-black p-1 rounded-md`}
              >
                <HambergerMenu />
              </div> */}
              {title}
            </div>
            <div
              ref={ref}
              onClick={() => {
                setMenu(!menu);
              }}
              className={` relative flex items-center justify-end gap-2 cursor-pointer`}
            >
              <div className={`font-montserrat text-end hidden md:block`}>
                <div className={`font-medium text-sm`}>Jerrie Jayadi</div>
                <div className={`text-xs text-gray-500`}>Admin</div>
              </div>
              <div className={`w-11 h-11 rounded-[100%] bg-gray-300`} />
              <div>{menu ? <ArrowUp2 /> : <ArrowDown2 />}</div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`${
                  menu ? "flex" : "hidden"
                } absolute top-[65px] divide-y-2 flex flex-col bg-white border border-gray-700 border-opacity-20 shadow-lg drop-shadow-lg px-6 py-3 w-60 cursor-default`}
              >
                <div className={`py-4 flex flex-col gap-2`}>
                  <div
                    className={`w-full active:text-primary md:hover:text-primary`}
                  >
                    Profile
                  </div>
                  <div
                    className={`w-full active:text-primary md:hover:text-primary`}
                  >
                    Settings
                  </div>
                </div>
                <div
                  className={`w-full active:text-primary md:hover:text-primary py-4`}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <main className={`p-4 md:p-8 mx-auto overflow-auto w-full`}>{children}</main>
        </div>
      </div>
      <div>
        <div
          className={`fixed bottom-0 left-0 md:mx-0 w-full md:left-0 md:top-0 md:w-[300px] bg-gray-900  text-white md:h-screen  md:hidden  gap-5 z-50`}
        >
          <div className={`w-full mx-auto max-w-[350px] md:mx-0 overflow-auto`}>
            {/* icon */}
            <Link
              href={`/`}
              className={` items-center gap-2  z-50 hidden md:flex px-6 py-5`}
            >
              <Image
                className={`w-8 h-8 text-black object-contain`}
                src={"/images/sela-logo-black.png"}
                alt={``}
                width={74}
                height={48}
              />

              <div className={`font-audrey md:text-xl text-base`}>
                {"Sela Property".toUpperCase()}
              </div>
            </Link>

            {/* Menu */}
            <div
              className={`flex items-center md:items-start justify-around  md:flex-col py-2 gap-2 md:mt-5 overflow-auto overflow px-4`}
            >
              {listMenu?.map((rows, index) => (
                <Link
                  className={`flex items-center gap-2 justify-center md:justify-start px-3 py-3 md:rounded-lg w-full ${
                    path === rows.path
                      ? "md:bg-white md:bg-opacity-10 text-white"
                      : "text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  } `}
                  key={index}
                  href={rows.path ?? ""}
                >
                  {rows.icon}
                  <span
                    className={`hidden md:block font-montserrat font-normal`}
                  >
                    {rows.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
