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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Forms from "../../forms";
import { PostPropertyProps } from "@/service/types/property/postProperty";
import { useRequest } from "ahooks";
import { getPropertyDetail, putPropertyDetail } from "@/service/api/property";
import { IResult } from "@/service/types/property/propertyDetail";

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

  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalDiscard, setModalDiscard] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<PostPropertyProps>();

  const { data, run, loading } = useRequest(getPropertyDetail);
  const { runAsync: editProperty, error } = useRequest(putPropertyDetail);

  const [managedInitialValue, setManagedInitialValue] = useState<
    PostPropertyProps | IResult
  >();

  const handleSubmit = () => {
    setModalSubmit(false);
    editProperty(params.id, submittedData!)
      .then(() => {
        setModalSuccess(true);
      })
      .catch((err) => {
        setModalFailed(true);
      });
  };

  useLayoutEffect(() => {
    run(params.id);
  }, []);

  const manageInitialValue = () => {
    let temp = {
      ...data?.result,
      bathRoomsAmount: data?.result.bathRoomsAmount.toString(),
      bedRoomsAmount: data?.result.bedRoomsAmount.toString(),
      carParkAmount: data?.result.carParkAmount.toString(),
      price: currencyFormat(data?.result.price ?? 0),
      googleDriveUrl: data?.result.googleDriveUrl,
    };
    setManagedInitialValue(temp as any);
  };

  useEffect(() => {
    if (data?.result) {
      manageInitialValue();
    }
  }, [data]);

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Edit Property
      </div>
      <div>
        <Forms
          onSubmit={(res) => {
            setModalSubmit(true);
            setSubmittedData(res);
          }}
          initialValue={managedInitialValue}
          fetchLoading={loading}
        />
      </div>
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
