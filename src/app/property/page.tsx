"use client";

import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  Check,
  CloseCircle,
  DocumentDownload,
  TickCircle,
} from "iconsax-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DummyProps, dummy } from "./dummy";
import {
  currencyFormat,
  handleNumberInput,
  myProfile,
  statusColorChip,
  translateAvailabilityProperty,
  translateStatusProperty,
} from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chip from "@/components/Atoms/Chip";
import { useRequest } from "ahooks";
import {
  deleteProperty,
  getPropertyList,
  putPropertyApproval,
  putPublished,
} from "@/service/api/property";
import {
  IPropertyList,
  RequestPropertyListParamsProps,
  ResponsePropertyProps,
} from "@/service/types/property/propertyList";
import Image from "next/image";
import Alert from "@/components/Atoms/Alert";
import { IProfile } from "@/service/types/auth";
import { localStorageMixins } from "@/localStorage.mixins";
import { ERole } from "@/service/types/user/postUser";
import { EStatusProperty } from "@/service/types/property/postProperty";
import { GetUserParams } from "@/service/types/user/getUser";
import ActionModals from "@/components/Atoms/Modals/ActionModals";
import FeedbackModals from "@/components/Atoms/Modals/FeedbackModals";
import Button from "@/components/Atoms/Button";
import { CSVLink } from "react-csv";
import { PropertyType } from "@/utils/propertyType";
import moment from "moment";

export default function Property() {
  const router = useRouter();

  const [pagination, setPagination] = useState<number>(1);
  const [profile, setProfile] = useState<IProfile>();
  const [data, setData] = useState<any>();
  const [csv, setCSV] = useState<any>();
  const [selected, setSelected] = useState<string>();
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalApprove, setModalApprove] = useState<boolean>(false);
  const [modalReject, setModalReject] = useState<boolean>(false);

  const {
    data: resProperty,
    runAsync: fetchList,
    loading,
    error,
  } = useRequest(getPropertyList);

  const { runAsync: updatePublished, loading: updatePublishedLoading } =
    useRequest(putPublished, { manual: true });

  const handlePublishedStatus = (id: string, status: boolean) => {
    updatePublished(id, { published: !status }).then(() => {
      fetchList({}).then((res) => setData(res.result));
    });
  };

  const { runAsync: putApproval, loading: approvalLoading } = useRequest(
    putPropertyApproval,
    {
      manual: true,
    }
  );

  const handleApprove = () => {
    setModalApprove(false);
    putApproval(selected!, { status: "approved", note: "-" }).then(() => {
      fetchList({}).then((res) => {
        setData(res.result);
      });
    });
  };

  const handleReject = () => {
    setModalReject(false);
    putApproval(selected!, { status: "rejected", note: "-" }).then(() => {
      fetchList({}).then((res) => {
        setData(res.result);
      });
    });
  };
  const handleAskRevision = () => {
    setModalReject(false);
    putApproval(selected!, { status: "ask_revision", note: "-" }).then(() => {
      fetchList({}).then((res) => {
        setData(res.result);
      });
    });
  };

  const handleDelete = () => {
    setModalDelete(false);
    deleteProperty(selected!).then(() => {
      fetchList({}).then((res) => {
        setData(res.result);
      });
    });
  };

  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<RequestPropertyListParamsProps>({
    keyword: "",
    propertyType: "",
    limit: 10,
    page: 1,
    availability: "",
  });

  const handlePrevious = () => {
    if ((filter.page! as number) < 0) {
      setFilter((prev) => ({ ...prev, page: 0 }));
      setPage(page - 1);
    } else {
      setFilter((prev) => ({ ...prev, page: page - 1 }));
      setPage(page);
    }
  };

  const handleNext = () => {
    if ((filter.page! as number) >= 100!) {
      setFilter((prev) => ({ ...prev, page: page }));
      setPage(page);
    } else {
      setFilter((prev) => ({ ...prev, page: page + 1 }));
      setPage(page + 1);
    }
  };

  const handleFetch = () => {
    fetchList(filter).then((res) => {
      setData(res.result);
      fetchList({ ...filter, limit: 9999, page: 1 }).then((res) => {
        manageCSVData(res.result.items);
      });
    });
  };

  const manageCSVData = (data: any) => {
    let temp = data.map((rows: any) => ({
      propertyNumber: rows.propertyNumber,
      propertyTitle: rows.title,
      propertyType: rows.propertyType,
      price: rows.price,
      availability: rows.availability
        ? "Available"
        : rows.sellingType === "RENT"
        ? "Rent"
        : "Sold",
      owner: rows.owner,
      ownerPhone: rows.ownerPhone,
      mapsUrl: rows.address.locationMaps,
      subdistrict: rows.address.subdistrict,
      regency: rows.address.regency,
      province: rows.address.province,
      driveUrl: rows.googleDriveUrl,
    }));
    setCSV(temp);
  };

  useEffect(() => {
    handleFetch();
  }, [filter]);

  // CSV

  const csvRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >();
  const getTransactionData = async () => {
    csvRef?.current?.link?.click();
  };

  useEffect(() => {
    setProfile(myProfile());
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
            <div></div>
            {/* Search Field */}
            <input
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  setFilter((prev) => ({ ...prev, keyword: e.target.value }));
                }
              }}
              className={`w-full md:max-w-[300px] px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary  focus:shadow-sm transition-colors duration-150 active:outline-none`}
              placeholder={`Search `}
              type="text"
            />

            {/* Filter */}
            <select
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  propertyType: e.target.value,
                }));
              }}
              className={` px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:shadow-sm transition-colors duration-150 active:outline-none`}
            >
              <option value={``}>All</option>
              {PropertyType.map((rows, index) => (
                <option key={index} value={rows.value}>
                  {rows.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  availability: e.target.value,
                }));
              }}
              className={`px-3 py-2 border rounded-lg border-opacity-20 border-black focus:outline-none focus:border-primary focus:shadow-sm transition-colors duration-150 active:outline-none`}
            >
              <option value={`a`}>All</option>
              <option value={"true"}>Available</option>
              <option value={"false"}>Sold/Rented</option>
            </select>
          </div>

          {/* Export CSV */}

          {/* Button Property */}
          <div className="flex items-center w-full gap-2 justify-end">
            {profile?.roles.some(
              (rows: string) =>
                rows === ERole.LISTING_AGENT || rows === ERole.ADMIN
            ) && (
              <Link
                href={`/property/create`}
                className={`w-fit flex grow-0 body2 items-center justify-center bg-primary hover:bg-orange-700 active:bg-orange-700 text-white rounded-lg px-3 gap-2 py-2`}
              >
                <Add className={`shrink-0`} /> <p>Create Property</p>
              </Link>
            )}
            {/* {profile?.roles.some((rows: string) => rows === ERole.ADMIN) && (
            <>
              <Button
                disabled={loading}
                className={`md:!w-[450px] !rounded-lg flex justify-center items-center !px-5 gap-3`}
                onClick={() => {
                  getTransactionData();
                }}
              >
                <DocumentDownload className={`size-6`} />
                Export as CSV
              </Button>
              <CSVLink
                style={{ height: "100%" }}
                data={csv ?? []}
                filename={`${moment(new Date()).format(
                  "YYYY-MM-DD"
                )}_property-list.csv`}
                ref={csvRef as any}
              />
            </>
          )} */}
            {profile?.roles.some((rows: string) => rows === ERole.ADMIN) && (
              <>
                <button
                  disabled={loading}
                  className={`text-primary hover:text-opacity-50`}
                  onClick={() => {
                    getTransactionData();
                  }}
                >
                  <DocumentDownload className={`size-8`} />
                </button>
                <CSVLink
                  style={{ height: "100%" }}
                  data={csv ?? []}
                  filename={`${moment(new Date()).format(
                    "YYYY-MM-DD"
                  )}_property-list.csv`}
                  ref={csvRef as any}
                />
              </>
            )}
          </div>
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
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Published
                </td>
                <td className={`w-[100px] pl-3 pr-8 py-2  rounded-tr-xl`}>
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [0, 1, 2].map((rows) => (
                  <tr key={`skeleton-${rows}`}>
                    <td className={` pl-4 md:pl-8 pr-4 py-1`}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                    <td className={`w-[100px] px-3 py-2 `}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                    <td className={`w-[100px] px-3 py-2 `}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                    <td className={`w-[100px] px-3 py-2 `}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                    <td className={`w-[100px] px-3 py-2 `}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                    <td className={`w-[100px] px-3 py-2 `}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                    <td className={`w-[100px] px-3 py-2 `}>
                      <div
                        className={`rounded-lg w-full md:w-[50%] h-[30px] bg-gradient-to-r from-gray-200 to-gray-500 animate-pulse`}
                      />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <></>
              ) : (
                data?.items?.map((rows: any, index: number) => (
                  <tr
                    onClick={() => {
                      router.push(`/property/detail/${rows.id}`);
                    }}
                    key={`property-${index}`}
                    className={`border-b border-[#E5E5E5] hover:bg-gray-100 bg-white`}
                  >
                    <td
                      className={`pl-4 md:pl-8 pr-3 py-3 flex items-center gap-4 sticky left-0 bg-inherit z-30`}
                    >
                      <Image
                        alt={""}
                        src={rows.images[0]?.url ?? "/"}
                        width={300}
                        height={300}
                        className={`w-10 h-10 md:w-20 md:h-20  object-cover shrink-0`}
                      />
                      <div className={`flex flex-col line-clamp-3 gap-1`}>
                        <div>{rows.title}</div>
                        <div className={`text-gray-500 text-xs`}>
                          {rows.propertyNumber ?? "-"}
                        </div>
                      </div>
                    </td>
                    <td className={`px-3 py-2 `}>{rows.propertyType}</td>

                    <td className={`px-3 py-2  truncate`}>
                      {rows?.currency?.symbolNative ?? "Rp"}
                      {currencyFormat(rows.price)}
                    </td>
                    <td className={`px-3 py-2  `}>
                      {translateAvailabilityProperty(rows)}
                    </td>
                    <td className={`px-3 py-2 `}>
                      <Chip color={statusColorChip(rows.status)}>
                        {translateStatusProperty(rows.status)}
                      </Chip>
                    </td>
                    <td className={`pl-3 pr-8 py-2 `}>
                      {profile?.roles.some(
                        (rows: string) => rows === ERole.ADMIN
                      ) ? (
                        <label
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="inline-flex items-center cursor-pointer"
                        >
                          <input
                            onChange={() => {
                              handlePublishedStatus(rows.id, rows.published);
                            }}
                            type="checkbox"
                            checked={rows.published}
                            className="sr-only peer"
                            disabled={rows.status !== EStatusProperty.APPROVED}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-disabled:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary peer-disabled:cursor-default "></div>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
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
                        <p>Detail</p>
                      </button>
                      {profile?.roles.some(
                        (rows: string) =>
                          rows === ERole.LISTING_AGENT || rows === ERole.ADMIN
                      ) &&
                        (rows.status === EStatusProperty.ASK_REVISION ||
                          rows.status === EStatusProperty.DRAFT ||
                          rows.status === EStatusProperty.APPROVED) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
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
                            <p>Edit</p>
                          </button>
                        )}
                      {profile?.roles.some(
                        (rows: string) => rows === ERole.ADMIN
                      ) &&
                        rows.status === EStatusProperty.REJECTED && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(rows.id);
                              setModalDelete(true);
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

                            <p>Delete</p>
                          </button>
                        )}

                      {profile?.roles.some(
                        (rows: string) => rows === ERole.ADMIN
                      ) &&
                        rows.status === EStatusProperty.IN_REVIEW && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSelected(rows.id);
                                setModalApprove(true);
                              }}
                              className={`flex items-center gap-2 mt-2 hover:text-primary`}
                            >
                              <TickCircle className="size-6" />
                              <p>Approve</p>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSelected(rows.id);
                                setModalReject(true);
                              }}
                              className={`flex items-center gap-2 mt-2 hover:text-primary`}
                            >
                              <CloseCircle className="size-6" />

                              <p>Reject</p>
                            </button>
                          </>
                        )}
                    </td>
                  </tr>
                ))
              )}
              {}
            </tbody>
          </table>
        </div>
        {error && (
          <div className={`flex items-center justify-center text-xl font-bold`}>
            DATA NOT FOUND
          </div>
        )}

        <div className={`flex w-full justify-end items-center py-3 gap-4 px-5`}>
          <button
            disabled={filter.page === 1}
            onClick={() => {
              setFilter((prev) => ({ ...prev, page: Number(prev.page)! - 1 }));
            }}
            className={`disabled:text-gray-300 text-primaryText`}
          >
            <ArrowLeft2 className={` size-6 shrink-0 `} />
          </button>
          <input
            onChange={(e) => {
              if (e.target.value === "") {
                setFilter((prev) => ({
                  ...prev,
                  page: "",
                }));
              } else if (Number(e.target.value) > data?.meta.totalPages!) {
                setFilter((prev) => ({
                  ...prev,
                  page: data?.meta.totalPages!,
                }));
              } else {
                setFilter((prev) => ({
                  ...prev,
                  page: Number(handleNumberInput(e.target.value)),
                }));
              }
            }}
            onBlur={(e) => {
              setFilter((prev) => ({ ...prev, page: Number(e.target.value) }));
            }}
            value={filter.page}
            className={`w-[40px] border border-secondaryText text-center focus:outline-none focus:border-accents focus:border-2 rounded-sm`}
            type={`text`}
          />
          <p>of</p>
          <p>{data?.meta.totalPages}</p>
          <button
            disabled={filter.page === data?.meta.totalPages}
            onClick={() => {
              setFilter((prev) => ({ ...prev, page: Number(prev.page) + 1 }));
            }}
            className={`disabled:text-gray-300 text-primaryText`}
          >
            <ArrowRight2 className={`text-inherit size-6 shrink-0 `} />
          </button>
        </div>
      </div>

      <ActionModals
        title={"Approve this Property?"}
        onReject={function (): void {
          setModalApprove(false);
        }}
        onSubmit={function (): void {
          handleApprove();
        }}
        rejectButtonText="Cancel"
        open={modalApprove}
        onClose={function (): void {
          setModalApprove(false);
        }}
      >
        Before approving this property request, please review the details
        carefully. Once approved, the requester will be notified, and the
        property will be added to our system.
      </ActionModals>
      <ActionModals
        title={"Reject this Property?"}
        onReject={function (): void {
          handleAskRevision();
        }}
        onSubmit={function (): void {
          handleReject();
        }}
        rejectButtonText="Ask for Revision"
        open={modalReject}
        onClose={function (): void {
          setModalReject(false);
        }}
        approveButtonText="Reject"
      >
        Before rejecting this property request, please review the details
        carefully. Once rejected, the requester will be notified, and the
        property will be added to our system.
      </ActionModals>
      <ActionModals
        title={"Delete this Property?"}
        onReject={function (): void {
          setModalDelete(false);
        }}
        onSubmit={function (): void {
          handleDelete();
        }}
        rejectButtonText="Cancel"
        open={modalDelete}
        onClose={function (): void {
          setModalDelete(false);
        }}
        approveButtonText="Delete"
      >
        Please make sure before deleting this property. Once deleted, the data
        will be deleted forever.
      </ActionModals>

      {/* <Alert className={`fixed top-0 z-50 !max-w-[450px] `} /> */}
    </div>
  );
}
