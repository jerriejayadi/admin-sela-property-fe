"use client";

import { getFile, uploadFile } from "@/firebase/uploadFile";
import { CloseCircle } from "iconsax-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface UploadImageProps {
  file?: any;
  onRemove?: (_url: string) => void;
  onFinishUpload?: (_url: string) => void;
  url?: string;
}

export default function UploadImage({
  file,
  onRemove,
  onFinishUpload,
  url,
}: UploadImageProps) {
  // const handleFiles = useCallback(async () => {
  //   const imagePath = await uploadFile(file);
  //   const imageUrl = await getFile(imagePath);
  //   setURL(imageUrl);
  //   onFinishUpload!(imageUrl);
  // }, []);

  return (
    <div>
      {url!.length > 0 ? (
        <div className={`relative`}>
          <Image
            onClick={() => {
              window.open(url, "_blank");
            }}
            className={` relative object-cover w-20 h-20`}
            loader={({ src }) => src}
            alt={``}
            src={url!}
            width={50}
            height={50}
          />
          <button
            onClick={() => {
              onRemove!(url!);
            }}
            className={` absolute -top-2 -right-2 bg-white rounded-[100%] text-red-500 font-bold hover:bg-red-100`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className={`p-4 bg-white`}>
          <div className={` animate-spin `}>
            <svg
              className="w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#000000"
              />
              <path
                d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                fill="#000000"
              />
            </svg>
          </div>
        </div>
        // <div
        //   className={`w-20 h-20 animate-pulse bg-gradient-to-r from-gray-400 to-gray-300`}
        // />
      )}
    </div>
  );
}
