import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import ActionModals from "@/components/Atoms/Modals/ActionModals";
import { GetUserDetailProps } from "@/service/types/user/getUser";
import {
  ERole,
  EUserStatus,
  PostUserProps,
} from "@/service/types/user/postUser";
import { toTitleCase } from "@/utils";
import { useFormik } from "formik";
import { Eye, EyeSlash, Warning2 } from "iconsax-react";
import { useEffect, useState } from "react";
import * as yup from "yup";

interface UserFormsProps {
  initialValue?: PostUserProps;
  isLoading?: boolean;
  onSubmit: (_args: PostUserProps) => void;
}

export default function UserForms({
  initialValue,
  isLoading,
  onSubmit,
}: UserFormsProps) {
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<PostUserProps>({
    email: "",
    password: "",
    name: "",
    roles: [],
    status: EUserStatus.active,
  });

  const handleSubmit = (values: any) => {
    setModalSubmit(false);
    onSubmit(values);
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().required("email is required"),
    roles: yup.array().min(1),
    status: yup.string().required("Status must be filled"),

    // Add more validation rules for other fields as needed
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      onSubmit(values);
    },
    validateOnChange: true,

    validateOnBlur: true,
    enableReinitialize: true,
  });

  const handleSelect = () => {};

  useEffect(() => {
    setInitialValues(initialValue ?? initialValues);
  }, [initialValue]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={` text-black w-full font-lato flex flex-col md:flex-row  gap-4  pb-20`}
    >
      <div className={`bg-white divide-y px-6 py-5 md:min-w-[500px] `}>
        <div className={` pb-3 font-montserrat`}>
          <div className={` font-medium body1`}>User Data</div>
          <div className={`body3 text-gray-400 mt-1`}>
            Fill in the user data
          </div>
        </div>
        <div className={`bg-white  pt-5 flex flex-col gap-4`}>
          <div className={`flex justify-center gap-4`}>
            <Input
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
              onChange={formik.handleChange}
              value={formik.values.password}
              name={`password`}
              id={`password`}
              errorMessage={formik.errors.password}
              type={isPasswordVisible ? "text" : "password"}
              className="w-full"
              label={`Password`}
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
              disabled={isLoading}
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
          <div className={`flex gap-3`}>
            <label
              htmlFor={`roles-listing`}
              className={`flex items-center gap-2`}
            >
              <input
                checked={formik.values.roles?.includes(ERole.LISTING_AGENT)}
                onChange={formik.handleChange}
                name={`roles`}
                value={ERole.LISTING_AGENT}
                id={`roles-listing`}
                className={`accent-primary w-5 h-5`}
                type={`checkbox`}
              />{" "}
              Listing
            </label>

            <label className={`flex items-center gap-2`}>
              <input
                checked={formik.values.roles?.includes(ERole.SELLING_AGENT)}
                onChange={formik.handleChange}
                name={`roles`}
                value={ERole.SELLING_AGENT}
                id={`roles-listing`}
                className={`accent-primary w-5 h-5`}
                type={`checkbox`}
              />{" "}
              Selling
            </label>
          </div>
          <div>
            {formik.errors.roles && (
              <div className={`text-red-500 text-sm`}>
                {formik.errors.roles}
              </div>
            )}
          </div>
          <div className={`font-montserrat`}>
            <div>Status</div>
            <div className={`mt-3`}>
              <label className="inline-flex items-center cursor-pointer gap-3">
                <input
                  name={`availability`}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "status",
                      e.target.checked ? "active" : "inactive"
                    );
                  }}
                  type="checkbox"
                  checked={formik.values.status === "active"}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                <span>{toTitleCase(formik.values.status ?? "")}</span>
              </label>
            </div>
          </div>

          <Button type={`submit`} isLoading={isLoading}>
            Submit{" "}
          </Button>
        </div>
      </div>
      {/* <ActionModals
        icons={<Warning2 className={`size-20`} />}
        open={modalSubmit}
        title={"Are you sure?"}
        onReject={function (): void {
          setModalSubmit(false);
        }}
        onSubmit={function (): void {
          setModalSubmit(false);
          handleSubmit(formik.values);
        }}
        onClose={function (): void {
          setModalSubmit(false);
        }}
      >
        Make sure to confirm all of the data you entered before submitting.
      </ActionModals> */}
    </form>
  );
}
