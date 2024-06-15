import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center px-4 min-h-screen  md:p-24  ">
      <div
        className={`flex flex-col md:flex-row items-center justify-center  rounded-lg text-black h-full text-center text-5xl`}
      >
        WELCOME TO{" "}
        <div className={`flex-col items-center gap-1  z-50  flex md:flex p-5`}>
          <Image
            className={`w-12 h-12 text-black object-contain`}
            src={"/images/sela-logo-black.png"}
            alt={``}
            width={74}
            height={48}
          />

          <div className={`font-audrey  text-lg`}>
            {"Sela Property".toUpperCase()}
          </div>
        </div>
        ADMIN
      </div>
    </main>
  );
}
