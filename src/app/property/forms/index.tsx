import Button from "@/components/Atoms/Button";
import TipTap from "@/components/Atoms/TipTap";
import UploadFile from "@/components/Atoms/UploadFile";
import UploadImage from "@/components/Atoms/UploadImage";
import { currencyFormat, myProfile, numberFormat } from "@/utils";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { uploadFile, getFile, deleteFile } from "@/firebase/uploadFile";
import { localStorageMixins } from "@/localStorage.mixins";
import Input from "@/components/Atoms/Input";
import {
  EStatusProperty,
  PostPropertyProps,
} from "@/service/types/property/postProperty";
import {
  IDetailPropertyImage,
  IResult,
} from "@/service/types/property/propertyDetail";
import Image from "next/image";
import { ERole } from "@/service/types/user/postUser";
import { EPropertyType } from "@/service/types/property/EPropertyType";
import { PropertyType } from "@/utils/propertyType";
import { useRequest } from "ahooks";
import { getCurrencyList } from "@/service/api/currency";

interface IImage extends IDetailPropertyImage {
  file?: string;
}

interface FormsProps {
  initialValue?: PostPropertyProps | IResult;
  fetchLoading?: boolean;
  submitLoading?: boolean;
  onSubmit: (_args: PostPropertyProps) => void;
}

export default function Forms({
  initialValue,
  onSubmit,
  submitLoading,
}: FormsProps) {
  const [initialValues, setInitialValues] = useState<PostPropertyProps>({
    title: "",
    propertyType: EPropertyType.HOUSE,
    price: "",
    // description: [{ title: "", description: "Hello World" }],
    currency: "IDR",
    googleDriveUrl: "",
    descriptionEn: "",
    keyFeatureEn: "",
    descriptionId: "",
    keyFeatureId: "",
    status: EStatusProperty.DRAFT,
    published: false,
    availability: true,
    landSize: "",
    landSizeMeasurement: "sqm",
    buildingSize: "",
    buildingSizeMeasurement: "sqm",
    bedRoomsAmount: "",
    bathRoomsAmount: "",
    carParkAmount: "",
    address: {
      locationMaps: "",
      province: "",
      regency: "",
      subdistrict: "",
    },
    owner: "",
    ownerPhone: "",
    tags: [],
  });
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    propertyType: yup.string().required("Type is required"),
    price: yup.string().required("Price must be greater than 0"),
    googleDriveUrl: yup.string().required("Google Drive URL must be included"),
    descriptionId: yup.string().required("Description is Required"),
    keyFeatureId: yup.string().required("Key Feature must be filled"),
    landSize: yup.string().required("Land size must be filled"),
    buildingSize: yup.string().required("Building Size must be filled"),
    bedRoomsAmount: yup.string().required("Bedrooms amount must be filled"),
    bathRoomsAmount: yup.string().required("Bathrooms amount must be filled"),
    carParkAmount: yup.string().required("Car Park amount must be filled"),
    address: yup.object({
      locationMaps: yup.string().required("Link must be filled"),
      province: yup.string().required("Province must be filled"),
      regency: yup.string().required("Regency must be filled"),
      subdistrict: yup.string().required("Subdistrict must be filled"),
    }),
    sellingType: yup.string().required("Must choose at least 1 selling type!"),
    owner: yup.string().required("must include owner's name"),
    ownerPhone: yup.string().required("must include Owner's Phone Number  "),
    // Add more validation rules for other fields as needed
  });
  const [modalSubmit, setModalSubmit] = useState<boolean>(false);
  const [modalDiscard, setModalDiscard] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalFailed, setModalFailed] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const profile = myProfile();

  const handleBannerFiles = async (
    files: string[],
    type: "thumbnail" | "normal"
  ) => {
    let filesInArray = Array.from(files);
    let listImages = [...image];
    filesInArray
      .filter(
        (rows: any) => rows.type === "image/jpeg" || rows.type === "image/png"
      )
      .map(async (rows) => {
        listImages.push({
          file: rows,
          url: "",
          id: "",
          type: "",
        });
      });
    setBannerImage(listImages);
    let uploadFormat = filesInArray.map((rows) => ({
      file: rows,
      url: "",
      type: type,
    }));
    uploadFiles(uploadFormat);
  };

  useEffect(() => {
    if (initialValue) {
      setInitialValues(initialValue as PostPropertyProps);
      let imagesTemp = initialValue?.images?.map((rows) => ({
        ...rows,
        file: "",
      }));
      setBannerImage(initialValue?.images!);
    }
  }, [initialValue]);

  const uploadFiles = async (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      let imagePath = await uploadFile(arr[i].file);
      let imageUrl = await getFile(imagePath);
      arr[i].url = imageUrl;
    }
    setBannerImage(image.concat(arr));
  };

  const handleBannerRemove = (url: string, index: number) => {
    let listImages = [...image];
    listImages.splice(index, 1);
    setBannerImage(listImages);
  };

  const handleBannerURL = (url: string, index: number) => {
    let listImages = [...image];
    listImages[index].url = url;
    setBannerImage(listImages);
  };

  const handleSubmitData = (
    values: PostPropertyProps,
    method: "submit" | "save"
  ) => {};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      const submit = {
        ...values,
        price: values.price.replaceAll(",", ""),
        bedRoomsAmount: values.bedRoomsAmount.replaceAll(",", ""),
        bathRoomsAmount: values.bathRoomsAmount.replaceAll(",", ""),
        buildingSize: values.buildingSize.replaceAll(",", ""),
        landSize: values.landSize.replaceAll(",", ""),
        carParkAmount: values.carParkAmount.replaceAll(",", ""),
        images: image,
        facilities: [],

        ownerPhone: values.ownerPhone,
      };
      onSubmit(submit);
    },
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
  });
  const [image, setBannerImage] = useState<IImage[]>([]);

  const { run: getCurrency, data: currencyList } = useRequest(getCurrencyList);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={` text-black w-full font-lato flex flex-col md:flex-row  gap-4`}
    >
      {/* Left side */}
      <div className={`w-full md:w-[50%]`}>
        {/* Status */}

        <div className={`bg-white divide-y px-6 py-5 mb-4 `}>
          <div className={` pb-3 font-montserrat`}>
            <div className={` font-medium body1`}>Status</div>
            <div className={`body3 text-gray-400 mt-1`}>Data Status</div>
          </div>
          <div className={`flex flex-col py-5 gap-5`}>
            {profile?.roles.some((rows: string) => rows === ERole.ADMIN) &&
              formik.values.status === EStatusProperty.APPROVED && (
                <>
                  <div className={`flex items-center justify-between`}>
                    <div>Availability</div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          name={`availability`}
                          onChange={formik.handleChange}
                          type="checkbox"
                          checked={formik.values.availability}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between`}>
                    <div>Published</div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          name={`published`}
                          onChange={formik.handleChange}
                          type="checkbox"
                          checked={formik.values.published}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  {profile?.roles.some((rows: any) => rows === "ADMIN") && (
                    <div className={`flex items-center justify-between`}>
                      <div>Hot Listing</div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            name={`tags`}
                            onChange={() => {
                              const isSelected = formik.values.tags!.some(
                                (item) => item.name === "hot_listing"
                              );
                              if (isSelected) {
                                formik.setFieldValue(
                                  "tags",
                                  formik.values.tags!.filter(
                                    (item) => item.name !== "hot_listing"
                                  )
                                );
                              } else {
                                formik.setFieldValue("tags", [
                                  ...formik.values.tags!,
                                  { name: "hot_listing" },
                                ]);
                              }
                            }}
                            type="checkbox"
                            checked={formik.values.tags!.some(
                              (item) => item.name === "hot_listing"
                            )}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  )}
                </>
              )}
            <div className={`flex items-start justify-between`}>
              <div>Selling Type</div>
              <div className={`flex items-center gap-4 `}>
                <div className={`flex items-center gap-2`}>
                  <input
                    onChange={formik.handleChange}
                    className={`w-5 h-5 accent-primary`}
                    name={`sellingType`}
                    type={`radio`}
                    value={`SELL`}
                    checked={formik.values.sellingType === "SELL"}
                  />{" "}
                  SELL
                </div>
                <div className={`flex items-center gap-2`}>
                  <input
                    onChange={formik.handleChange}
                    className={`w-5 h-5 accent-primary`}
                    name={`sellingType`}
                    type={`radio`}
                    value={`RENT`}
                    checked={formik.values.sellingType === "RENT"}
                  />{" "}
                  RENT
                </div>
              </div>
            </div>
            {formik.errors.sellingType && (
              <div className={`text-red-500 text-sm`}>
                {formik.errors.sellingType}
              </div>
            )}
          </div>
        </div>

        {/* Attachment */}
        <div className={`bg-white divide-y px-6 py-5 `}>
          <div className={` pb-3 font-montserrat`}>
            <div className={` font-medium body1`}>Images</div>
            <div className={`body3 text-gray-400 mt-1`}>
              Upload your Image here. First 3 Image on the list will be the
              thumbnail
            </div>
          </div>
          <div className={`flex flex-col py-5 gap-5`}>
            <UploadFile
              id={"banner-image"}
              onChange={(e) => {
                handleBannerFiles(e, "thumbnail");
              }}
            />
            <div className={`flex gap-5 flex-wrap`}>
              {image.length > 0 &&
                image.map((rows, index) => (
                  <>
                    <UploadImage
                      onRemove={(url) => {
                        handleBannerRemove(url, index);
                      }}
                      key={index}
                      file={rows.file}
                      onFinishUpload={(url) => {
                        handleBannerURL(url, index);
                      }}
                      url={rows.url}
                    />
                    {/* <CloseCircle className={`absolute top-0 right-0`} /> */}
                  </>
                ))}
            </div>
            {image.length === 0 && (
              <div className={`text-red-500 text-sm`}>
                Must upload at least 1 image
              </div>
            )}
            <Input
              errorMessage={
                formik.touched.googleDriveUrl && formik.errors.googleDriveUrl
              }
              value={formik.values.googleDriveUrl}
              id={"googleDriveUrl"}
              name={"googleDriveUrl"}
              placeholder={"https://drive.google.com/..."}
              label={"Google Drive Link"}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className={`bg-white divide-y px-6 py-5 mt-4 `}>
          <div className={` pb-3 font-montserrat`}>
            <div className={` font-medium body1`}>Product Details</div>
            <div className={`body3 text-gray-400 mt-1`}>
              Property name, price, description
            </div>
          </div>
          <div className={`flex flex-col py-5 gap-5`}>
            <div className={`grid md:grid-cols-2 gap-5`}>
              <Input
                errorMessage={formik.touched.title && formik.errors.title}
                value={formik.values.title}
                id={"title"}
                name={"title"}
                placeholder={"Spacious Apartment with Modern Amenities"}
                label={"Property Title"}
                onChange={formik.handleChange}
              />

              <div className={`text-sm`}>
                <div className="font-montserrat body1 mb-3 body2">
                  Property Type
                </div>
                <select
                  name="propertyType"
                  onChange={formik.handleChange}
                  defaultValue={`villa`}
                  className={`bg-[#fcfcfc]  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
                >
                  {PropertyType.map((rows, index) => (
                    <option key={index} value={rows.value}>
                      {rows.name}
                    </option>
                  ))}
                </select>
                {formik.errors.propertyType && (
                  <div className={`text-red-500 text-sm`}>
                    {formik.errors.propertyType}
                  </div>
                )}
              </div>
            </div>

            <Input
              errorMessage={formik.touched.price && formik.errors.price}
              value={formik.values.price}
              withPrefix
              prefixLabel={
                <select
                  value={formik.values.currency}
                  onChange={(e) => {
                    formik.setFieldValue("currency", e.target.value);
                  }}
                >
                  {currencyList?.result
                    .sort((a, b) => a.id.localeCompare(b.id))
                    .map((rows, index) => (
                      <option key={`currency-${index}`} value={rows.id}>
                        {rows.id}
                      </option>
                    ))}
                </select>
              }
              id={"price"}
              name={"price"}
              placeholder={"0"}
              label={"Price"}
              onChange={(e) => {
                formik.setFieldValue("price", currencyFormat(e.target.value));
              }}
            />

            {/* <div className={`text-sm`}>
                <div className="font-montserrat body1 mb-3 body2">
                  Property Type
                </div>
                <select
                  className={`bg-[#fcfcfc]  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
                >
                  <option>Hello</option>
                </select>
              </div> */}
            <div className={`grid md:grid-cols-2 gap-5`}>
              <Input
                errorMessage={
                  formik.touched.buildingSize && formik.errors.buildingSize
                }
                value={formik.values.buildingSize}
                id={"buildingSize"}
                name={"buildingSize"}
                placeholder={"0"}
                label={"Build size (in sqm)"}
                onChange={(e) => {
                  formik.setFieldValue(
                    "buildingSize",
                    currencyFormat(e.target.value)
                  );
                }}
              />
              <Input
                errorMessage={formik.touched.landSize && formik.errors.landSize}
                value={formik.values.landSize}
                id={"landSize"}
                name={"landSize"}
                placeholder={"0"}
                label={"Land size (in sqm)"}
                onChange={(e) => {
                  formik.setFieldValue(
                    "landSize",
                    currencyFormat(e.target.value)
                  );
                }}
              />
            </div>
            <div className={`grid md:grid-cols-3 gap-5`}>
              <Input
                errorMessage={
                  formik.touched.bedRoomsAmount && formik.errors.bedRoomsAmount
                }
                value={formik.values.bedRoomsAmount}
                id={"bedRoomsAmount"}
                name={"bedRoomsAmount"}
                placeholder={"0"}
                label={"Bedroom"}
                onChange={(e) => {
                  formik.setFieldValue(
                    "bedRoomsAmount",
                    currencyFormat(e.target.value)
                  );
                }}
              />
              <Input
                errorMessage={
                  formik.touched.bathRoomsAmount &&
                  formik.errors.bathRoomsAmount
                }
                value={formik.values.bathRoomsAmount}
                id={"bathRoomsAmount"}
                name={"bathRoomsAmount"}
                placeholder={"0"}
                label={"Bathroom"}
                onChange={(e) => {
                  formik.setFieldValue(
                    "bathRoomsAmount",
                    currencyFormat(e.target.value)
                  );
                }}
              />
              <Input
                errorMessage={
                  formik.touched.carParkAmount && formik.errors.carParkAmount
                }
                value={formik.values.carParkAmount}
                id={"carParkAmount"}
                name={"carParkAmount"}
                placeholder={"0"}
                label={"Car Park"}
                onChange={(e) => {
                  formik.setFieldValue(
                    "carParkAmount",
                    currencyFormat(e.target.value)
                  );
                }}
              />
            </div>
            <div className={`divide-y-2`}>
              <div className={`body1 pb-3`}>Location</div>
              <div className={`pt-3`}>
                <div className={`grid md:grid-cols-3 gap-4`}>
                  <Input
                    errorMessage={
                      formik.touched.address?.subdistrict &&
                      formik.errors.address?.subdistrict
                    }
                    value={formik.values.address.subdistrict}
                    id={"title"}
                    name={"address.subdistrict"}
                    placeholder={`Canggu`}
                    label={"Subdistrict"}
                    onChange={formik.handleChange}
                  />
                  <Input
                    errorMessage={
                      formik.touched.address?.regency &&
                      formik.errors.address?.regency
                    }
                    value={formik.values.address.regency}
                    id={"regency"}
                    name={"address.regency"}
                    placeholder={`Badung`}
                    label={"Regency"}
                    onChange={formik.handleChange}
                  />
                  <Input
                    errorMessage={
                      formik.touched.address?.province &&
                      formik.errors.address?.province
                    }
                    value={formik.values.address.province}
                    id={"province"}
                    name={"address.province"}
                    placeholder={`Bali`}
                    label={"Province"}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={`mt-3`}>
                  <Input
                    errorMessage={
                      formik.touched.address?.locationMaps &&
                      formik.errors.address?.locationMaps
                    }
                    value={formik.values.address.locationMaps}
                    id={"locationMaps"}
                    name={"address.locationMaps"}
                    placeholder={`https://maps.app.goo.gl/F7UYqCeGAaE3hSZ27`}
                    label={"Google Maps URL"}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={`divide-y-2`}>
              <div className={`body1 pb-3`}>Owner Data</div>
              <div className={`pt-3`}>
                <div className={`grid md:grid-cols-2 gap-4`}>
                  <Input
                    errorMessage={formik.touched.owner && formik.errors.owner}
                    value={formik.values.owner}
                    id={"owner"}
                    name={"owner"}
                    placeholder={`John Doe`}
                    label={"Name"}
                    onChange={formik.handleChange}
                  />
                  <Input
                    errorMessage={
                      formik.touched.ownerPhone && formik.errors.ownerPhone
                    }
                    value={formik.values.ownerPhone}
                    id={"ownerPhone"}
                    name={"ownerPhone"}
                    placeholder={`6281234567890`}
                    label={"Phone Number"}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "ownerPhone",
                        numberFormat(e.target.value)
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full md:w-[50%]`}>
        {/* <div className={`bg-white divide-y px-6 py-5`}>
            <div className={`pb-4 font-montserrat`}>
              <div className={` font-medium body1`}>Property Description</div>
              <div className={`body3 text-gray-400 mt-1`}>
                Description of the Property. You may input more than 1
                description section
              </div>
            </div>
            <div className={`flex flex-col pt-4 gap-6`}>
              {payload.description.map((rows, index) => (
                <div key={index}>
                  <div className={`font-montserrat body1 mb-4 `}>
                    Description {index + 1}
                  </div>
                  <Input
                    value={rows.title}
                    name={`payload.description.${index}`}
                    label={`Title`}
                    onChange={(e) => {
                      let temp = payload.description;
                      temp[index].title = e.target.value;
                      setPayload({ ...payload, description: temp });
                    }}
                    placeholder={`Enter your description title`}
                  />

                  <TipTap
                    // value={rows.description}
                    className={`mt-3`}
                    onChange={(e) => {
                      let temp = payload.description;
                      temp[index].description = e;
                      setPayload({ ...payload, description: temp });
                    }}
                  />
                  {payload.description.length > 1 && (
                    <button
                      onClick={() => {
                        if (payload.description.length > 1) {
                          removeDescription(index);
                        }
                      }}
                      className={`flex items-center gap-2 body3 justify-end w-full mt-3 text-red-500`}
                    >
                      <Trash className={`w-5 h-5`} /> Delete Description
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  addDescription();
                }}
                className={`text-primary flex items-center w-full justify-center active:bg-primary active:bg-opacity-20 rounded-lg px-5 py-3`}
              >
                <Add /> Add another description
              </button>
            </div>
          </div> */}
        <div className={`bg-white divide-y px-6 py-5`}>
          <div className={`pb-4 font-montserrat`}>
            <div
              className={` font-medium body1 flex justify-between items-center`}
            >
              <div>Property Description</div>
              <div>
                <Image
                  className={`w-10 h-10 rounded-[100%]`}
                  alt={``}
                  src={`/icons/indonesia-flag.png`}
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div className={`body3 text-gray-400 mt-1`}>
              Description of the Property. You may input more than 1 description
              section
            </div>
          </div>
          <div className={`flex flex-col pt-4 gap-6`}>
            <div>
              <div className={`font-montserrat body1 mb-4 `}>Description</div>

              <TipTap
                value={formik.values.descriptionId}
                className={`mt-3`}
                onChange={(e) => {
                  formik.setFieldValue("descriptionId", e);
                }}
              />

              {formik.touched.descriptionId && formik.errors.descriptionId && (
                <div className={`text-red-500 text-sm mt-2`}>
                  {formik.errors.descriptionId}
                </div>
              )}
            </div>
          </div>
          <div className={`flex flex-col pt-4 gap-6`}>
            <div>
              <div className={`font-montserrat body1 mb-4 `}>Key Feature</div>

              <TipTap
                value={formik.values.keyFeatureId}
                className={`mt-3`}
                onChange={(e) => {
                  formik.setFieldValue("keyFeatureId", e);
                }}
              />

              {formik.touched.keyFeatureId && formik.errors.keyFeatureId && (
                <div className={`text-red-500 text-sm mt-2`}>
                  {formik.errors.keyFeatureId}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Property Description EN */}

        <div className={`bg-white divide-y px-6 py-5 mt-10`}>
          <div className={`pb-4 font-montserrat`}>
            <div
              className={` font-medium body1 flex justify-between items-center`}
            >
              <div>Property Description</div>
              <div>
                <Image
                  className={`w-10 h-10`}
                  alt={``}
                  src={`/icons/United-states_flag_icon_round.svg.png`}
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div className={`body3 text-gray-400 mt-1`}>
              Description of the Property. You may input more than 1 description
              section
            </div>
          </div>
          <div className={`flex flex-col pt-4 gap-6`}>
            <div>
              <div className={`font-montserrat body1 mb-4 `}>Description</div>

              <TipTap
                value={formik.values.descriptionEn}
                className={`mt-3`}
                onChange={(e) => {
                  formik.setFieldValue("descriptionEn", e);
                }}
              />

              {formik.touched.descriptionEn && formik.errors.descriptionEn && (
                <div className={`text-red-500 text-sm mt-2`}>
                  {formik.errors.descriptionEn}
                </div>
              )}
            </div>
          </div>
          <div className={`flex flex-col pt-4 gap-6`}>
            <div>
              <div className={`font-montserrat body1 mb-4 `}>Key Feature</div>

              <TipTap
                value={formik.values.keyFeatureEn}
                className={`mt-3`}
                onChange={(e) => {
                  formik.setFieldValue("keyFeatureEn", e);
                }}
              />

              {formik.touched.keyFeatureEn && formik.errors.keyFeatureEn && (
                <div className={`text-red-500 text-sm mt-2`}>
                  {formik.errors.keyFeatureEn}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`w-full flex flex-col md:flex-row items-center justify-end mt-10 gap-5 pb-20 md:pb-0`}
        >
          <Button
            type="submit"
            onClick={() => {
              formik.setFieldValue("status", EStatusProperty.DRAFT);
            }}
            className={`border-2 border-red-500 bg-transparent !text-red-500 md:max-w-32`}
          >
            Save as Draft
          </Button>
          <Button
            type={"submit"}
            isLoading={submitLoading}
            onClick={() => {
              formik.setFieldValue("status", EStatusProperty.IN_REVIEW);
            }}
            disabled={!formik.isValid || image.length === 0}
            className={`md:max-w-32`}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
