"use client";

import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import ActionModals from "@/components/Atoms/Modals/ActionModals";
import FeedbackModals from "@/components/Atoms/Modals/FeedbackModals";
import { localStorageMixins } from "@/localStorage.mixins";
import { putAdminSelf } from "@/service/api/auth";
import { ERole } from "@/service/types/user/postUser";
import { PutAdminSelfRequestProps } from "@/service/types/user/putAdmin";
import { myProfile, toTitleCase } from "@/utils";
import { useRequest } from "ahooks";
import { error } from "console";
import { useFormik } from "formik";
import {
  ChartFail,
  ChartSuccess,
  Eye,
  EyeSlash,
  Warning2,
} from "iconsax-react";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import * as yup from "yup";

export default function Profile() {
  const router = useRouter();
  const profile = myProfile();
  const [initialValues, setInitialValues] = useState<PutAdminSelfRequestProps>({
    name: profile?.name,
    email: profile?.email,
    password: "",
  });
  const [submittedData, setSubmittedData] =
    useState<PutAdminSelfRequestProps>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().required("email is required"),
    // Add more validation rules for other fields as needed
  });

  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const { runAsync, error, loading } = useRequest(putAdminSelf, {
    manual: true,
  });

  const handleSendData = () => {
    setModalSubmit(false);
    runAsync(submittedData!)
      .then((res) => {
        localStorageMixins.set(`profile`, {
          email: res.result.email,
          roles: res.result.roles,
          id: res.result.id,
          name: res.result.name,
          status: res.result.status,
        });
        setModalSuccess(true);
      })
      .catch(() => {
        setModalFailed(true);
      });
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      setModalSubmit(true);
      setSubmittedData(values);
    },
    validateOnChange: true,

    validateOnBlur: true,
    enableReinitialize: true,
  });
  return (
    <main>
      <div className={`bg-white divide-y px-6 py-5 md:min-w-[500px] `}>
        <div className={` pb-3 font-montserrat`}>
          <div className={` font-medium body1`}>Profile</div>
          <div className={`body3 text-gray-400 mt-1`}>Update your Profile</div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className={`bg-white  pt-5 flex flex-col gap-4`}
        >
          <div className={`flex justify-center gap-4`}>
            <Input
              disabled={loading}
              onChange={formik.handleChange}
              value={formik.values.name}
              errorMessage={formik.errors.name}
              name={`name`}
              id={`name`}
              className="w-full"
              label={`Name`}
            />
          </div>
          <div className={`flex items-center justify-center`}>
            <Input
              disabled={loading}
              value={formik.values.email}
              onChange={formik.handleChange}
              errorMessage={formik.errors.email}
              name={`email`}
              id={`email`}
              className="w-full"
              label={`Email`}
            />
          </div>

          <div className={`flex items-center justify-center`}>
            <Input
              disabled={loading}
              onChange={formik.handleChange}
              value={formik.values.password}
              name={`password`}
              id={`password`}
              errorMessage={formik.errors.password}
              type={isPasswordVisible ? "text" : "password"}
              className="w-full"
              label={`New Password`}
              actionButton={
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                >
                  {isPasswordVisible ? <Eye /> : <EyeSlash />}
                </button>
              }
            />
          </div>

          {/* <div className={`text-sm`}>
            <div className="font-montserrat body1 mb-3 body2">Role</div>
            <select
              disabled={false}
              value={formik.values.role}
              name="role"
              onChange={formik.handleChange}
              className={`bg-[#fcfcfc] font-montserrat  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
            >
              <option value={``} selected hidden>
                Select Role
              </option>
              <option value={ERole.LISTING_AGENT}>Agen Listing</option>
              <option value={ERole.SELLING_AGENT}>Agen Selling</option>
            </select>
            {formik.errors.role && (
              <div className={`text-red-500 text-sm`}>{formik.errors.role}</div>
            )}
          </div> */}

          <Button type={`submit`} isLoading={loading}>
            Submit{" "}
          </Button>
        </form>
      </div>

      <ActionModals
        icons={<Warning2 className={`size-20`} />}
        open={modalSubmit}
        title={"Are you sure?"}
        onReject={function (): void {
          setModalSubmit(false);
        }}
        onSubmit={function (): void {
          handleSendData();
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
    </main>
  );
}
