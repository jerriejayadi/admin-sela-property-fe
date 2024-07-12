"use client";

import ActionModals from "@/components/Atoms/Modals/ActionModals";
import FeedbackModals from "@/components/Atoms/Modals/FeedbackModals";
import { Warning2, ChartSuccess } from "iconsax-react";
import { useEffect, useLayoutEffect, useState } from "react";
import Forms from "../../forms";
import { useRequest } from "ahooks";
import { getUserById, putUser } from "@/service/api/auth";
import {
  ERole,
  EUserStatus,
  PostUserProps,
} from "@/service/types/user/postUser";
import { useRouter } from "next/navigation";
import { GetUserDetailProps } from "@/service/types/user/getUser";

interface EditUserParams {
  params: {
    id: string;
  };
}
export default function EditUser({ params }: EditUserParams) {
  const router = useRouter();
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<PostUserProps>();
  const [initialValue, setInitialValue] = useState<PostUserProps>();

  const {
    data,
    run: fetchData,
    loading: fetchLoading,
  } = useRequest(getUserById, {
    manual: true,
  });
  const { runAsync, loading } = useRequest(putUser, { manual: true });

  const handleSubmit = (values: PostUserProps) => {
    setModalSubmit(false);
    console.log(values);
    runAsync(params.id, values).then((res) => {
      setModalSuccess(true);
    });
  };

  const manageInitialValue = () => {
    setInitialValue({
      email: data?.result.email!,
      password: data?.result.password!,
      name: data?.result.name!,
      roles: data?.result.roles as ERole[],
      status: data?.result.status as EUserStatus,
    });
  };

  useLayoutEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    manageInitialValue();
  }, [data]);

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Edit User
      </div>
      <Forms
        initialValue={initialValue}
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
    </div>
  );
}
