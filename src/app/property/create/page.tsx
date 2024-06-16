"use client";
import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import { currencyFormat } from "@/utils";
import { Add, Trash } from "iconsax-react";
import { useState } from "react";

interface PostPropertyProps {
  title: string;
  price: string;
  description: IDescription[];
  status: boolean;
  published: boolean;
  availability:boolean;
}

interface IDescription {
  title: string;
  description: string;
}

export default function CreateProperty() {
  const [payload, setPayload] = useState<PostPropertyProps>({
    title: "",
    price: "0",
    description: [{ title: "", description: "" }],
    status: false,
    published: false,
    availability:false
  });

  const addDescription = () => {
    let temp = { ...payload };
    temp.description.push({
      title: "",
      description: "",
    });
    setPayload(temp);
  };

  const removeDescription = (index: number) => {
    let temp = { ...payload };
    temp.description.splice(index, 1);
    setPayload(temp);
  };

  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Create Property
      </div>
      <div className={` text-black w-full font-lato flex flex-col gap-4`}>
        <div className={`bg-white divide-y px-6 py-5 `}>
          <div className={` pb-3 font-montserrat`}>
            <div className={` font-medium body1`}>Product Details</div>
            <div className={`body3 text-gray-400 mt-1`}>
              Property name, price, description
            </div>
          </div>
          <div className={`flex flex-col py-5 gap-5`}>
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

            <div className={`text-sm`}>
              <div className="font-montserrat body1 mb-3 body2">
                Property Type
              </div>
              <select
                className={`bg-[#fcfcfc]  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
              >
                <option>Hello</option>
              </select>
            </div>

            <div className={`flex items-center gap-3`}>
              <label className={`font-montserrat`}>Availability</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  onChange={() => {
                    setPayload({ ...payload, availability: !payload.availability });
                  }}
                  type="checkbox"
                  checked={payload.availability}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <label className={`font-montserrat`}>Status</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  onChange={() => {
                    setPayload({ ...payload, status: !payload.status });
                  }}
                  type="checkbox"
                  checked={payload.status}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
              <label className={`font-montserrat`}>Published</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  onChange={() => {
                    setPayload({ ...payload, published: !payload.published });
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
        <div className={`bg-white divide-y px-6 py-5`}>
          <div className={`pb-4 font-montserrat`}>
            <div className={` font-medium body1`}>Property Description</div>
            <div className={`body3 text-gray-400 mt-1`}>
              Description of the Property. You may input more than 1 description
              section
            </div>
          </div>
          <div className={`flex flex-col pt-4 gap-6`}>
            {payload.description.map((rows, index) => (
              <div key={index}>
                <div className={`font-montserrat body1 mb-4 `}>
                  Description {index + 1}
                </div>
                <Input
                  name={`payload.description.${index}`}
                  label={`Title`}
                  onChange={(e) => {
                    let temp = payload.description;
                    temp[index].title = e.target.value;
                    setPayload({ ...payload, description: temp });
                  }}
                  placeholder={`Enter your description title`}
                />
                <Input
                  className={`mt-3`}
                  id={"description"}
                  name={`payload.description.${index}`}
                  onChange={(e) => {
                    let temp = payload.description;
                    temp[index].description = e.target.value;
                    setPayload({ ...payload, description: temp });
                  }}
                  placeholder={`Enter your description title`}
                  label={"Description"}
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
        </div>
        <Button
          className={`mb-20`}
          onClick={() => {
            console.log(payload);
          }}
        >
          Create Data{" "}
        </Button>
      </div>
    </div>
  );
}
