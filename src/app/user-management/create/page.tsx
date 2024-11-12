"use client";

import ActionModals from "@/components/Atoms/Modals/ActionModals";
import FeedbackModals from "@/components/Atoms/Modals/FeedbackModals";
import { Warning2, ChartSuccess, ChartFail } from "iconsax-react";
import { useEffect, useState } from "react";
import Forms from "../forms";
import { useRequest } from "ahooks";
import { postUser } from "@/service/api/auth";
import { PostUserProps } from "@/service/types/user/postUser";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<PostUserProps>();
  const { runAsync, loading, error } = useRequest(postUser, { manual: true });

  const handleSubmit = (values: PostUserProps) => {
    setModalSubmit(false);
    runAsync(values)
      .then((res) => {
        setModalSuccess(true);
      })
      .catch(() => {
        setModalFailed(true);
      });
  };

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Create User
      </div>
      <Forms
        isLoading={loading}
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
          handleSubmit(submittedData!);
        }}
        onClose={function (): void {
          setModalSubmit(false);
        }}
        rejectButtonText="Cancel"
        approveButtonText="Submit"
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
          router.push(`/user-management`);
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
