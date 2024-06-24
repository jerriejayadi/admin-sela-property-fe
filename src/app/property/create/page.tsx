"use client";
import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import RichTextRender from "@/components/Atoms/RichTextPreview";
import TipTap from "@/components/Atoms/TipTap";
import UploadFile from "@/components/Atoms/UploadFile";
import UploadImage from "@/components/Atoms/UploadImage";
import { deleteFile, getFile, uploadFile } from "@/firebase/uploadFile";
import { currencyFormat } from "@/utils";
import {
  EditorContent,
  JSONContent,
  generateJSON,
  useEditor,
} from "@tiptap/react";
import { Add, CloseCircle, DocumentUpload, Trash } from "iconsax-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export interface PostPropertyProps {
  title: string;
  type: string;
  price: string;
  description: string;
  keyFeature: string;
  status: boolean;
  published: boolean;
  availability: boolean;
  landSize: string;
  landSizeMeasurement: string;
  buildingSize: string;
  buildingSizeMeasurement: string;
  bedRoomsAmount: string;
  bathRoomsAmount: string;
  carParkAmount: string;
}

interface IDescription {
  title: string;
  description: string;
}

interface IImage {
  file: string;
  url: string;
}

export default function CreateProperty() {
  const [payload, setPayload] = useState<PostPropertyProps>({
    title: "",
    type: "",
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
  });

  const [bannerImage, setBannerImage] = useState<IImage[]>([]);
  const [bannerImageUploaded, setBannerImageUploaded] = useState<IImage[]>([]);
  const [galleryImage, setGalleryImage] = useState<IImage[]>([]);

  // const addDescription = () => {
  //   let temp = { ...payload };
  //   temp.description.push({
  //     title: "",
  //     description: "",
  //   });
  //   setPayload(temp);
  // };

  // const removeDescription = (index: number) => {
  //   let temp = { ...payload };
  //   temp.description.splice(index, 1);
  //   setPayload(temp);
  // };

  const handleBannerFiles = async (files: string[]) => {
    let filesInArray = Array.from(files);
    let listImages = [...bannerImage];
    filesInArray
      .filter(
        (rows: any) => rows.type === "image/jpeg" || rows.type === "image/png"
      )
      .map(async (rows) => {
        listImages.push({ file: rows, url: "" });
      });
    setBannerImage(listImages);
    let uploadFormat = filesInArray.map((rows) => ({ file: rows, url: "" }));
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

  const handleGalleryFiles = async (files: string[]) => {
    let filesInArray = Array.from(files);
    let listImages = [...galleryImage];
    filesInArray
      .filter(
        (rows: any) => rows.type === "image/jpeg" || rows.type === "image/png"
      )
      .map(async (rows) => {
        listImages.push({ file: rows, url: "" });
      });
    setBannerImage(listImages);
    let uploadFormat = filesInArray.map((rows) => ({ file: rows, url: "" }));
    uploadFiles2(uploadFormat);
  };

  const uploadFiles2 = async (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      let imagePath = await uploadFile(arr[i].file);
      let imageUrl = await getFile(imagePath);
      arr[i].url = imageUrl;
    }
    setGalleryImage(galleryImage.concat(arr));
  };

  const handleGalleryRemove = (url: string, index: number) => {
    deleteFile(url);
    let listImages = [...galleryImage];
    listImages.splice(index, 1);
    setGalleryImage(listImages);
  };

  const handleBannerURL = (url: string, index: number) => {
    let listImages = [...bannerImage];
    listImages[index].url = url;
    setBannerImage(listImages);
  };
  const handleGalleryURL = (url: string, index: number) => {
    let listImages = [...galleryImage];
    listImages[index].url = url;
    setGalleryImage(listImages);
  };

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Create Property
      </div>
      <div
        className={` text-black w-full font-lato flex flex-col md:flex-row  gap-4`}
      >
        {/* Left side */}
        <div className={`w-full md:w-[50%]`}>
          {/* Status */}
          <div className={`bg-white divide-y px-6 py-5 `}>
            <div className={` pb-3 font-montserrat`}>
              <div className={` font-medium body1`}>Status</div>
              <div className={`body3 text-gray-400 mt-1`}>
                Picture for the main banner
              </div>
            </div>
            <div className={`flex flex-col py-5 gap-5`}>
              <div className={`flex items-center justify-between`}>
                <div>Availability</div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      onChange={() => {
                        setPayload({
                          ...payload,
                          availability: !payload.availability,
                        });
                      }}
                      type="checkbox"
                      checked={payload.availability}
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
                      onChange={() => {
                        setPayload({
                          ...payload,
                          published: !payload.published,
                        });
                      }}
                      type="checkbox"
                      checked={payload.published}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Attachment */}
          <div className={`bg-white divide-y px-6 py-5 mt-4 `}>
            <div className={` pb-3 font-montserrat`}>
              <div className={` font-medium body1`}>Banner</div>
              <div className={`body3 text-gray-400 mt-1`}>
                Picture for the main banner
              </div>
            </div>
            <div className={`flex flex-col py-5 gap-5`}>
              <UploadFile id={"banner-image"} onChange={handleBannerFiles} />
              <div className={`flex gap-5 flex-wrap`}>
                {bannerImage.length > 0 &&
                  bannerImage.map((rows, index) => (
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
                  value={payload.title}
                  id={"title"}
                  name={"title"}
                  placeholder={"Enter your Property Title"}
                  label={"Property Title"}
                  onChange={(e) => {
                    setPayload({ ...payload, title: e.target.value });
                  }}
                />

                <div className={`text-sm`}>
                  <div className="font-montserrat body1 mb-3 body2">
                    Property Type
                  </div>
                  <select
                    onChange={(e) => {
                      setPayload({ ...payload, type: e.target.value });
                    }}
                    defaultValue={`house`}
                    className={`bg-[#fcfcfc]  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
                  >
                    <option value={"house"}>House</option>
                    <option value={"villa"}>Villa</option>
                  </select>
                </div>
              </div>
              <Input
                value={payload.title}
                id={"title"}
                name={"title"}
                placeholder={"Enter your Property Title"}
                label={"Property Title"}
                onChange={(e) => {
                  setPayload({ ...payload, title: e.target.value });
                }}
              />
              <Input
                value={payload.price}
                withPrefix
                prefix={"Rp"}
                id={"price"}
                name={"price"}
                placeholder={"Enter your Property Price"}
                label={"Price"}
                onChange={(e) => {
                  setPayload({
                    ...payload,
                    price: currencyFormat(e.target.value),
                  });
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
                  value={payload.buildingSize}
                  id={"buildingSize"}
                  name={"title"}
                  placeholder={"Enter buildsize"}
                  label={"Build Size"}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      buildingSize: currencyFormat(e.target.value),
                    });
                  }}
                />
                <Input
                  value={payload.landSize}
                  id={"title"}
                  name={"title"}
                  placeholder={"Enter Landsize"}
                  label={"Landsize"}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      landSize: currencyFormat(e.target.value),
                    });
                  }}
                />
              </div>
              <div className={`grid md:grid-cols-3 gap-5`}>
                <Input
                  value={payload.bedRoomsAmount}
                  id={"title"}
                  name={"bedRoomsAmount"}
                  placeholder={"Enter Bedroom amount"}
                  label={"Bedroom"}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      bedRoomsAmount: currencyFormat(e.target.value),
                    });
                  }}
                />
                <Input
                  value={payload.bathRoomsAmount}
                  id={"title"}
                  name={"bathRoomsAmount"}
                  placeholder={"Enter Bathroom amount"}
                  label={"Bathroom"}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      bathRoomsAmount: currencyFormat(e.target.value),
                    });
                  }}
                />
                <Input
                  value={payload.carParkAmount}
                  id={"title"}
                  name={"carParkAmount"}
                  placeholder={"Enter Car Park Amount"}
                  label={"Car Park"}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      carParkAmount: currencyFormat(e.target.value),
                    });
                  }}
                />
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
              <div className={` font-medium body1`}>Property Description</div>
              <div className={`body3 text-gray-400 mt-1`}>
                Description of the Property. You may input more than 1
                description section
              </div>
            </div>
            <div className={`flex flex-col pt-4 gap-6`}>
              <div>
                <div className={`font-montserrat body1 mb-4 `}>Description</div>
                <TipTap
                  // value={rows.description}
                  className={`mt-3`}
                  onChange={(e) => {
                    setPayload({ ...payload, description: e });
                  }}
                />
              </div>
            </div>
            <div className={`flex flex-col pt-4 gap-6`}>
              <div>
                <div className={`font-montserrat body1 mb-4 `}>Description</div>
                <TipTap
                  // value={rows.description}
                  className={`mt-3`}
                  onChange={(e) => {
                    setPayload({ ...payload, keyFeature: e });
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`bg-white divide-y px-6 py-5 mt-4 `}>
            <div className={` pb-3 font-montserrat`}>
              <div className={` font-medium body1`}>Property Gallery</div>
              <div className={`body3 text-gray-400 mt-1`}>
                Picture for Gallery
              </div>
            </div>
            <div className={`flex flex-col py-5 gap-5`}>
              <UploadFile id={"gallery-image"} onChange={handleGalleryFiles} />
              <div className={`flex gap-2 flex-wrap`}>
                {galleryImage.length > 0 &&
                  galleryImage.map((rows, index) => (
                    <>
                      <UploadImage
                        onRemove={(url) => handleGalleryRemove(url, index)}
                        key={index}
                        file={rows.file}
                        onFinishUpload={(url) => handleGalleryURL(url, index)}
                        url={rows.url}
                      />
                      {/* <CloseCircle className={`absolute top-0 right-0`} /> */}
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div className={`bg-white divide-y px-6 py-5 mt-4 `}>
            <div className={` pb-3 font-montserrat`}>
              <div className={` font-medium body1`}>Property Gallery</div>
              <div className={`body3 text-gray-400 mt-1`}>
                Picture for Gallery
              </div>
            </div>
            <div className={`flex flex-col py-5 gap-5`}>
              <input
                type={`file`}
                onChange={(e) => {
                  handleBannerFiles(e.target.files as any);
                }}
              />
              <input
                type={`file`}
                onChange={(e) => {
                  handleGalleryFiles(e.target.files as any);
                }}
              />
            </div>
          </div>
        </div>

        {/* <Button
          className={``}
          onClick={() => {
            console.log(payload);
            localStorage.setItem("data", JSON.stringify(payload));
            window.open("/property/preview", "_blank");
          }}
        >
          Preview Data{" "}
        </Button>
        <Button
          className={`mb-20`}
          onClick={() => {
            console.log(payload);
          }}
        >
          Create Data{" "}
        </Button> */}
      </div>
      <div className={`w-full flex items-center justify-end mt-10 gap-5`}>
        <Button
          className={`border-2 border-red-500 bg-transparent !text-red-500 md:max-w-32`}
        >
          Discard
        </Button>
        <Button className={`md: max-w-32`}>Save</Button>
      </div>
    </div>
  );
}
