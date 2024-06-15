"use client";

import { Add, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useState } from "react";
import { dummy } from "./dummy";
import { currencyFormat } from "@/utils";
import Link from "next/link";

export default function Property() {
  const [pagination, setPagination] = useState<number>(1);

  return (
    <div className={`text-black flex flex-col gap-6`}>
      {/* Table */}
      <div
        className={`bg-white h-fit rounded-lg shadow-md flex flex-col gap-4 w-full overflow-auto `}
      >
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 pt-5 pb-1 gap-2   `}
        >
          <div
            className={`flex w-full flex-col md:flex-row md:items-center gap-2`}
          >
            <input
              className={`w-full px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary  focus:shadow-sm transition-colors duration-150 active:outline-none`}
              placeholder={`Search `}
              type="text"
            />
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

          <Link
            href={`/property/create`}
            className={`w-full flex body2 items-center justify-center bg-primary hover:bg-orange-700 active:bg-orange-700 text-white rounded-lg px-3 gap-2 py-2`}
          >
            <Add /> Property
          </Link>
        </div>
        <div className={` w-full overflow-scroll`}>
          <table className={`table-auto text-left w-full rounded-t-lg text-sm`}>
            <thead
              className={` rounded-t-lg border-b border-black border-opacity-20`}
            >
              <tr className={`border-t body2`}>
                <td
                  className={`w-[200px] px-3 pr-4 py-1  rounded-tl-xl  col-span-2`}
                >
                  Name
                </td>
                <td className={`w-[100px] px-3 py-2 `}>Price</td>
                <td className={`w-[100px] px-3 py-2 `}>Availability</td>
                <td className={`w-[100px] px-3 py-2 `}>Status</td>
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Published
                </td>
              </tr>
            </thead>
            <tbody>
              {dummy.map((rows, index) => (
                <tr key={index} className={`border-b border-[#E5E5E5]`}>
                  <td className={`pl-8 pr-3`}>
                    <div className={`w-10 h-10  bg-gray-300 shrink-0`} />
                  </td>
                  <td className={`px-3 pr-3 py-1 line-clamp-3 `}>
                    {rows.name}
                  </td>
                  <td className={`px-3 py-2 `}>
                    Rp{currencyFormat(rows.price)}
                  </td>
                  <td className={`px-3 py-2 `}>{rows.availability}</td>
                  <td className={`px-3 py-2 `}>{rows.status}</td>
                  <td className={`pl-3 pr-8 py-2 `}>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rows.published}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`px-8 pb-4 flex items-center justify-between`}>
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
          <div>
            Showing 1 to {dummy.length} of {dummy.length} entries
          </div>
        </div>
      </div>
    </div>
  );
}
