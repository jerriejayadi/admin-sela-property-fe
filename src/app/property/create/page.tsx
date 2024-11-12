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
  ChartFail,
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
import {
  EStatusProperty,
  PostPropertyProps,
} from "@/service/types/property/postProperty";
import { useRequest } from "ahooks";
import { postProperty } from "@/service/api/property";
import { EPropertyType } from "@/service/types/property/EPropertyType";

interface IImage {
  file: string;
  url: string;
  type: "thumbnail" | "normal";
}

export default function CreateProperty() {
  const router = useRouter();
  const [payload, setPayload] = useState<PostPropertyProps>({
    title: "",
    propertyType: EPropertyType.HOUSE,
    price: "0",
    // description: [{ title: "", description: "Hello World" }],
    googleDriveUrl: "",
    descriptionId: "",
    descriptionEn: "",
    keyFeatureId: "",
    keyFeatureEn: "",
    status: EStatusProperty.DRAFT,
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
    owner: "",
    ownerPhone: "",
    currency: "",
    tags: [],
  });

  const [bannerImage, setBannerImage] = useState<IImage[]>([]);
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalDiscard, setModalDiscard] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<PostPropertyProps>();

  const { runAsync, loading, error } = useRequest(postProperty, {
    manual: true,
  });
  const handleSubmit = () => {
    setModalSubmit(false);

    runAsync(submittedData!)
      .then(() => {
        setModalSuccess(true);
      })
      .catch((err) => {
        setModalFailed(true);
      });
  };

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Create Property
      </div>
      <Forms
        submitLoading={loading}
        onSubmit={(res) => {
          setSubmittedData(res);
          setModalSubmit(true);
        }}
      />
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
      <FeedbackModals
        icons={<ChartFail className={`size-20`} />}
        title={"Failed to submit data"}
        open={modalFailed}
        onClose={function (): void {
          setModalFailed(false);
        }}
        actionText="Try Again"
        onAction={() => {
          setModalFailed(false);
        }}
      >
        {error?.message}
      </FeedbackModals>
    </div>
  );
}
