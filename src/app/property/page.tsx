"use client";

import { Add, ArrowLeft2, ArrowRight2, Check } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { DummyProps, dummy } from "./dummy";
import {
  currencyFormat,
  statusColorChip,
  translateStatusProperty,
} from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chip from "@/components/Atoms/Chip";
import { useRequest } from "ahooks";
import { getPropertyList } from "@/service/api/property";
import {
  IPropertyList,
  ResponsePropertyProps,
} from "@/service/types/property/propertyList";
import Image from "next/image";
import Alert from "@/components/Atoms/Alert";

export default function Property() {
  const router = useRouter();
  const [pagination, setPagination] = useState<number>(1);

  const [data, setData] = useState<IPropertyList[]>();

  const { data: resProperty, runAsync, loading } = useRequest(getPropertyList);

  const handlePublishedStatus = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const temp = [...data!];
    temp[index].published = e.target.checked;
    setData(temp);
  };

  useEffect(() => {
    runAsync({}).then((res) => {
      setData(res.result.items);
    });
  }, []);
  return (
    <div className={`text-black flex flex-col gap-6 pb-20`}>
      {/* Table */}
      <div
        className={`bg-white h-fit rounded-lg shadow-md flex flex-col gap-4  `}
      >
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 pt-5 pb-1 gap-2   `}
        >
          {/* header */}
          <div
            className={`flex w-full flex-col md:flex-row md:items-center gap-2`}
          >
            {/* Search Field */}
            <input
              className={`w-full px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary  focus:shadow-sm transition-colors duration-150 active:outline-none`}
              placeholder={`Search `}
              type="text"
            />

            {/* Filter */}
            <select
              className={`w-full px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:shadow-sm transition-colors duration-150 active:outline-none`}
            >
              <option>Filter</option>
            </select>
            <select
              className={`px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:shadow-sm transition-colors duration-150 active:outline-none`}
            >
              <option>Filter</option>
            </select>
          </div>

          {/* Button Property */}
          <Link
            href={`/property/create`}
            className={`w-full md:max-w-[300px] flex body2 items-center justify-center bg-primary hover:bg-orange-700 active:bg-orange-700 text-white rounded-lg px-3 gap-2 py-2`}
          >
            <Add /> Property
          </Link>
        </div>

        {/* table */}
        <div className={`relative md:w-full overflow-auto px-2`}>
          <table className={`table-auto text-left w-full rounded-t-lg text-sm`}>
            <thead
              className={` rounded-t-lg border-b border-black border-opacity-20`}
            >
              <tr className={`border-t body2`}>
                <td
                  className={`w-[150px] pl-4 md:pl-8 pr-4 py-1  rounded-tl-xl `}
                >
                  Name
                </td>
                <td className={`w-[100px] px-3 py-2 `}>Price</td>
                <td className={`w-[100px] px-3 py-2 `}>Availability</td>
                <td className={`w-[100px] px-3 py-2 `}>Status</td>
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Published
                </td>
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {data?.map((rows, index) => (
                <tr key={index} className={`border-b border-[#E5E5E5]`}>
                  <td
                    className={`pl-4 md:pl-8 pr-3 py-3 flex items-center gap-4`}
                  >
                    <Image
                      alt={""}
                      src={rows.image}
                      loader={({ src }) => src}
                      width={300}
                      height={300}
                      className={`w-10 h-10 md:w-20 md:h-20  object-cover shrink-0`}
                    />
                    <div className={`line-clamp-3`}>{rows.name}</div>
                  </td>

                  <td className={`px-3 py-2 `}>
                    Rp{currencyFormat(rows.price)}
                  </td>
                  <td className={`px-3 py-2 `}>{rows.availability}</td>
                  <td className={`px-3 py-2 `}>
                    <Chip color={statusColorChip(rows.status)}>
                      {translateStatusProperty(rows.status)}
                    </Chip>
                  </td>
                  <td className={`pl-3 pr-8 py-2 `}>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        onChange={(e) => {
                          handlePublishedStatus(e, index);
                        }}
                        type="checkbox"
                        checked={rows.published}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </td>
                  <td className={``}>
                    <button
                      onClick={() => {
                        router.push(`/property/detail/a1b2c3`);
                      }}
                      className={`flex items-center gap-2 hover:text-primary`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <div>Detail</div>
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/property/edit/a1b2c3`);
                      }}
                      className={`flex items-center gap-2 mt-2 hover:text-primary`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      <div>Edit</div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`px-8 pb-4 flex flex-col sm:flex-row items-center justify-between`}
        >
          <div className={`flex items-center`}>
            <button
              className={`disabled:text-gray-300 mr-2`}
              disabled={pagination === 1}
              onClick={() => {
                setPagination(pagination - 1);
              }}
            >
              <ArrowLeft2 className={`w-4 h-4 `} />
            </button>
            <div className={`flex items-center gap-1`}>
              {[1, 2, 3].map((rows, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 ${
                    rows === pagination ? "bg-primary text-white" : "text-black"
                  }  rounded-lg`}
                  onClick={() => {
                    setPagination(rows);
                  }}
                >
                  {rows}
                </button>
              ))}
            </div>
            <button
              className={`disabled:text-gray-300 ml-2`}
              disabled={pagination === 3}
              onClick={() => {
                setPagination(pagination + 1);
              }}
            >
              <ArrowRight2 className={`w-4 h-4 `} />
            </button>
          </div>
          <div className={`text-xs sm:text-base mt-3 md:mt-0`}>
            Showing 1 to {dummy.length} of {dummy.length} entries
          </div>
        </div>
      </div>
      {/* <Alert className={`fixed top-0 z-50 !max-w-[450px] `} /> */}
    </div>
  );
}
