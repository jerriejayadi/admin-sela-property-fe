"use client";
import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import Modals from "@/components/Atoms/Modals";
import ActionModals from "@/components/Atoms/Modals/ActionModals";
import FeedbackModals from "@/components/Atoms/Modals/FeedbackModals";
import RichTextRender from "@/components/Atoms/RichTextPreview";
import TipTap from "@/components/Atoms/TipTap";
import UploadFile from "@/components/Atoms/UploadFile";
import UploadImage from "@/components/Atoms/UploadImage";
import { deleteFile, getFile, uploadFile } from "@/firebase/uploadFile";
import { localStorageMixins } from "@/localStorage.mixins";
import { IAddress } from "@/service/types/property/propertyDetail";
import { currencyFormat } from "@/utils";
import {
  EditorContent,
  JSONContent,
  generateJSON,
  useEditor,
} from "@tiptap/react";
import {
  Add,
  ChartSuccess,
  CloseCircle,
  DocumentUpload,
  Trash,
  Warning2,
} from "iconsax-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Forms from "../../forms";
import { PostPropertyProps } from "@/service/types/property/postProperty";
import { useRequest } from "ahooks";
import { getPropertyDetail } from "@/service/api/property";

interface IDescription {
  title: string;
  description: string;
}

interface IImage {
  file: string;
  url: string;
  type: "thumbnail" | "normal";
}

interface EditPropertyParams {
  params: {
    id: string;
  };
}

export default function EditProperty({ params }: EditPropertyParams) {
  const router = useRouter();
  const path = usePathname();

  const { data, run, loading } = useRequest(getPropertyDetail);

  useLayoutEffect(() => {
    run(params.id);
  }, []);

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Edit Property
      </div>
      <div>
        <Forms initialValue={data?.result} fetchLoading={loading} />
      </div>
    </div>
  );
}
