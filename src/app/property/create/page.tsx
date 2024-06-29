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
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Forms from "../forms";
import { PostPropertyProps } from "@/service/types/property/postProperty";


interface IImage {
  file: string;
  url: string;
  type: "thumbnail" | "normal";
}

export default function CreateProperty() {
  const router = useRouter();
  const [payload, setPayload] = useState<PostPropertyProps>({
    title: "",
    propertyType: "",
    price: "0",
    // description: [{ title: "", description: "Hello World" }],
    description: "",
    keyFeature: "",
    status: false,
    published: false,
    availability: false,
    landSize: "",
    landSizeMeasurement: "",
    buildingSize: "",
    buildingSizeMeasurement: "",
    bedRoomsAmount: "",
    bathRoomsAmount: "",
    carParkAmount: "",
    address: {
      id: "",
      locationMaps: "",
      province: "",
      regency: "",
      subdistrict: "",
    },
  });

  const [bannerImage, setBannerImage] = useState<IImage[]>([]);
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalDiscard, setModalDiscard] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleBannerFiles = async (
    files: string[],
    type: "thumbnail" | "normal"
  ) => {
    let filesInArray = Array.from(files);
    let listImages = [...bannerImage];
    filesInArray
      .filter(
        (rows: any) => rows.type === "image/jpeg" || rows.type === "image/png"
      )
      .map(async (rows) => {
        listImages.push({ file: rows, url: "", type: type });
      });
    setBannerImage(listImages);
    let uploadFormat = filesInArray.map((rows) => ({
      file: rows,
      url: "",
      type: type,
    }));
    uploadFiles(uploadFormat);
  };

  const uploadFiles = async (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      let imagePath = await uploadFile(arr[i].file);
      let imageUrl = await getFile(imagePath);
      arr[i].url = imageUrl;
    }
    setBannerImage(bannerImage.concat(arr));
  };

  const handleBannerRemove = (url: string, index: number) => {
    deleteFile(url);
    let listImages = [...bannerImage];
    listImages.splice(index, 1);
    setBannerImage(listImages);
  };

  const handleBannerURL = (url: string, index: number) => {
    let listImages = [...bannerImage];
    listImages[index].url = url;
    setBannerImage(listImages);
  };

  const handleSubmit = () => {
    setModalSubmit(false);
    setLoading(true);
    const submittedPayload = { ...payload, image: bannerImage };
    setTimeout(() => {
      localStorageMixins.set(
        "submitted_property",
        JSON.stringify(submittedPayload)
      );
      setLoading(false);
      setModalSuccess(true);
    }, 3000);
  };

  useEffect(() => {
    console.log(bannerImage);
  }, [bannerImage]);
  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Create Property
      </div>
      <Forms />
      <ActionModals
        icons={<Warning2 className={`size-20`} />}
        open={modalSubmit}
        title={"Are you sure?"}
        onReject={function (): void {
          setModalSubmit(false);
        }}
        onSubmit={function (): void {
          handleSubmit();
        }}
        onClose={function (): void {
          setModalSubmit(false);
        }}
      >
        Make sure to confirm all of the data you entered before submitting.
      </ActionModals>
      <FeedbackModals
        icons={<ChartSuccess className={`size-20`} />}
        title={"Data submitted successfully"}
        open={modalSuccess}
        onClose={function (): void {
          setModalSuccess(false);
        }}
        actionText="Return to homepage"
        onAction={() => {
          router.push(`/property`);
        }}
      >
        Property has been submitted successfully.
      </FeedbackModals>
    </div>
  );
}
