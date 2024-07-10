"use client";
import Chip from "@/components/Atoms/Chip";
import {
  currencyFormat,
  statusColorChip,
  toTitleCase,
  translateRoleUser,
  translateStatusProperty,
} from "@/utils";
import Link from "next/link";
import { Add, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { dummy } from "../property/dummy";
import { useRequest } from "ahooks";
import { getUser } from "@/service/api/auth";
import { EUserStatus } from "@/service/types/user/postUser";
import { useRouter } from "next/navigation";

export default function UserManagement() {
  const router = useRouter();
  const { data, run } = useRequest(getUser);
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
          <Link
            href={`/user-management/create`}
            className={`w-full md:max-w-[150px] flex grow-0 body2 items-center justify-center bg-primary hover:bg-orange-700 active:bg-orange-700 text-white rounded-lg px-3 gap-2 py-2`}
          >
            <Add /> Create User
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
                <td className={`w-[100px] px-3 py-2 `}>Role</td>
                {/* <td className={`w-[100px] px-3 py-2 `}>Created At</td> */}
                <td className={`w-[100px] px-3 py-2 `}>Status</td>
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {data?.result.items.map((rows, index) => (
                <tr key={index} className="border-b border-[#E5E5E5]">
                  <td className={`pl-4 md:pl-8 pr-3 py-3 `}>{rows.name}</td>
                  <td className={`px-3 py-2 `}>
                    {translateRoleUser(rows.role)}
                  </td>
                  {/* <td className={`px-3 py-2 `}>{rows.createdAt}</td> */}
                  <td className={`px-3 py-2 `}>
                    {
                      <Chip
                        color={
                          rows.status === EUserStatus.active
                            ? "success"
                            : "error"
                        }
                      >
                        {toTitleCase(rows.status)}
                      </Chip>
                    }
                  </td>
                  <td className={`px-3 py-2 `}>
                    <button
                      onClick={() => {
                        router.push(`/user-management/edit/${rows.id}`);
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
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div
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
        </div> */}
      </div>
      {/* <Alert className={`fixed top-0 z-50 !max-w-[450px] `} /> */}
    </div>
  );
}
