"use client";

import { Add, ArrowLeft2, ArrowRight2, Check } from "iconsax-react";
import { ChangeEvent, useEffect, useState } from "react";
import { DummyProps, dummy } from "./dummy";
import {
  currencyFormat,
  myProfile,
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
import { IProfile } from "@/service/types/auth";
import { localStorageMixins } from "@/localStorage.mixins";
import { ERole } from "@/service/types/user/postUser";

export default function Property() {
  const profile = myProfile();
  const router = useRouter();
  const [pagination, setPagination] = useState<number>(1);

  const [data, setData] = useState<any>();

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
      setData(res.result);
    });
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);
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
            <div></div>
            {/* Search Field */}
            <input
              className={`w-full md:max-w-[300px] px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary  focus:shadow-sm transition-colors duration-150 active:outline-none`}
              placeholder={`Search `}
              type="text"
            />

            {/* Filter */}
            <select
              className={` px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:shadow-sm transition-colors duration-150 active:outline-none`}
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
          {(profile?.role === "ADMIN" || profile?.role === "listing_agent") && (
            <Link
              href={`/property/create`}
              className={`w-full md:max-w-[250px] flex grow-0 body2 items-center justify-center bg-primary hover:bg-orange-700 active:bg-orange-700 text-white rounded-lg px-3 gap-2 py-2`}
            >
              <Add /> Create Property
            </Link>
          )}
        </div>

        {/* table */}
        <div className={`relative md:w-full overflow-auto`}>
          <table
            className={`table-fixed text-left w-full rounded-t-lg text-sm`}
          >
            <thead
              className={` rounded-t-lg border-b border-black border-opacity-20`}
            >
              <tr className={`border-t body2 bg-white`}>
                <td
                  className={`w-[150px] md:w-[300px] pl-4 md:pl-8 pr-4 py-1  rounded-tl-xl sticky left-0 bg-inherit border-gray-300 shadow-md`}
                >
                  Name
                </td>
                <td className={`w-[100px] px-3 py-2 `}>Type</td>
                <td className={`w-[200px] px-3 py-2 `}>Price</td>
                <td className={`w-[100px] px-3 py-2 `}>Availability</td>
                <td className={`w-[100px] px-3 py-2 `}>Status</td>
                <td className={`w-[150px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Published
                </td>
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {data?.map((rows: any, index: number) => (
                <tr
                  onClick={() => {
                    router.push(`/property/detail/${rows.id}`);
                  }}
                  key={index}
                  className={`border-b border-[#E5E5E5] hover:bg-gray-100 bg-white`}
                >
                  <td
                    className={`pl-4 md:pl-8 pr-3 py-3 flex items-center gap-4 sticky left-0 bg-inherit z-40`}
                  >
                    <Image
                      alt={""}
                      src={rows.images[0]?.url ?? ""}
                      loader={({ src }) => src}
                      width={300}
                      height={300}
                      className={`w-10 h-10 md:w-20 md:h-20  object-cover shrink-0`}
                    />
                    <div className={`line-clamp-3`}>{rows.title}</div>
                  </td>
                  <td className={`px-3 py-2 `}>{rows.propertyType}</td>

                  <td className={`px-3 py-2  truncate`}>
                    Rp{currencyFormat(rows.price)}
                  </td>
                  <td className={`px-3 py-2  `}>{rows.availability}</td>
                  <td className={`px-3 py-2 `}>
                    <Chip color={statusColorChip(rows.status)}>
                      {translateStatusProperty(rows.status)}
                    </Chip>
                  </td>
                  <td className={`pl-3 pr-8 py-2 `}>
                    {profile?.role === ERole.ADMIN ? (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          onChange={(e) => {
                            handlePublishedStatus(e, index);
                          }}
                          type="checkbox"
                          checked={rows.published}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary "></div>
                      </label>
                    ) : (
                      <Chip color={rows.published ? "success" : "disabled"}>
                        {translateStatusProperty(
                          rows.published ? "published" : "unpublished"
                        )}
                      </Chip>
                    )}
                  </td>
                  <td className={` pl-3 `}>
                    <button
                      onClick={() => {
                        router.push(`/property/detail/${rows.id}`);
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
                    {profile?.role! === "ADMIN" && (
                      <>
                        <button
                          onClick={() => {
                            router.push(`/property/edit/${rows.id}`);
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
                        <button
                          onClick={() => {
                            router.push(`/property/edit/${rows.id}`);
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>

                          <div>Delete</div>
                        </button>
                      </>
                    )}
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
