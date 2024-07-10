"use client";

import {
  ArrowCircleLeft,
  ArrowCircleLeft2,
  ArrowCircleRight,
  ArrowCircleRight2,
  ArrowLeft2,
  ArrowRight2,
  Location,
  TickCircle,
  Whatsapp,
} from "iconsax-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

import StackGrid from "react-stack-grid";

import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextRender from "@/components/Atoms/RichTextPreview";

import { DetailPropertyProps } from "@/service/types/property/propertyDetail";
import { useRequest } from "ahooks";
import { getPropertyDetail } from "@/service/api/property";
import { currencyFormat, myProfile } from "@/utils";
import { localStorageMixins } from "@/localStorage.mixins";
import { IProfile } from "@/service/types/auth";

const ImageList = [
  {
    url: "/images/detail-property-bg.jpeg",
    width: 2500,
    height: 1666,
  },
  {
    url: "/images/detail-property-image-1.jpeg",
    width: 840,
    height: 560,
  },
  {
    url: "/images/detail-property-image-2.jpeg",
    width: 2500,
    height: 1666,
  },
  {
    url: "/images/detail-property-image-3.jpeg",
    width: 2500,
    height: 1666,
  },
  {
    url: "/images/detail-property-image-3.jpeg",
    width: 2500,
    height: 1666,
  },
];

interface PropertyDetailCardProps {
  className?: string;
  props: string;
  iconURL: string;
  value: string | number;
  unitOfMeasurement?: string;
}

function PropertyDetailCard({
  className,
  props,
  iconURL,
  value,
  unitOfMeasurement,
}: PropertyDetailCardProps) {
  return (
    <div className={`${className ?? ""} flex items-center gap-1 md:pr-12 `}>
      <div className={`flex justify-center shrink-0 w-12 h-12 `}>
        <Image
          className={`object-contain `}
          alt={``}
          src={iconURL}
          width={28}
          height={28}
        />
      </div>
      <div className={`text-black tracking-widest`}>
        <div className={`md:text-2xl font-bold text-black `}>
          {value}
          {unitOfMeasurement && (
            <span className={`font-light `}>{unitOfMeasurement}</span>
          )}
        </div>
        <div className={`text-[10px]`}>{props}</div>
      </div>
    </div>
  );
}

interface DetailPropertyParams {
  params: {
    id: string;
  };
}
export default function PropertyDetail({ params }: DetailPropertyParams) {
  const profile = myProfile();
  const router = useRouter();

  const [seeMorePhotos, setSeeMorePhotos] = useState<boolean>(false);
  const { data, run, loading } = useRequest(getPropertyDetail);
  // const [data, setData] = useState<DetailPropertyProps>();
  const [selectedImage, setSelectedImage] = useState<string>(
    data?.result?.images[0]?.url!
  );
  const [current, setCurrent] = useState<number>(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(data?.result.images.length! - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === data?.result.images.length! - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  const handleCTA = () => {
    window.open(`https://wa.me/+6281234567890`, "_blank");
  };

  useLayoutEffect(() => {
    run(params.id);
  }, []);

  return (
    <div className={` max-w-[1150px] pb-20`}>
      <div className={`mb-4 w-full flex justify-between`}>
        <div className={`font-montserrat font-semibold text-3xl`}>Preview</div>
        {(profile.role === "admin" || profile.role === "listing_agent") && (
          <Link
            className={`py-3 bg-primary rounded-lg px-5 text-white`}
            href={`/property/edit/${params.id}`}
          >
            Edit Data
          </Link>
        )}
      </div>
      {/* Photo */}
      <div className={`relative`}>
        <div
          className={`relative bg-gradient-to-b from-transparent to-black flex flex-col md:flex-row items-start md:items-end md:justify-between p-5 md:px-20 md:py-16 h-[529px] md:h-screen object-cover bg-cover transition-all duration-500`}
          style={{
            backgroundImage: `url(${data?.result.images[current].url})`,
          }}
        >
          <div
            className={`h-full absolute top-0 left-0 bg-gradient-to-b from-black/0 to-black/80 w-full`}
          />
          <div className={`absolute top-0 bottom-0 h-fit my-auto  left-4 z-40`}>
            <button
              onClick={() => {
                previousSlide();
              }}
            >
              <ArrowLeft2
                className={` active:opacity-80 flex shrink-0 w-10 h-10 p-2 shadow-2xl rounded-[100%] bg-white bg-opacity-50 text-white `}
              />
            </button>
          </div>
          <div className={`absolute my-auto h-fit top-0 bottom-0 right-4 z-40`}>
            <button
              onClick={() => {
                nextSlide();
              }}
            >
              <ArrowRight2
                className={`active:opacity-80 flex shrink-0 w-10 h-10 p-2 shadow-2xl rounded-[100%] bg-white bg-opacity-50 text-white`}
              />
            </button>
          </div>

          {/* property detail */}
          <div
            className={`flex flex-col justify-end h-full w-full z-30 text-white `}
          >
            <div
              className={`bg-primary text-white rounded-md p-2 w-fit text-xs md:text-sm`}
            >
              Best Deal
            </div>
            <div
              className={`font-montserrat font-bold text-xl md:text-4xl mt-1 md:mt-7`}
            >
              IDR {currencyFormat(data?.result.price ?? 0)}
            </div>
            <div
              className={`font-montserrat font-semibold text-4xl md:text-6xl md:mt-2`}
            >
              {data?.result.title}
            </div>
            <div className={`flex items-center justify-between`}>
              <div className={`flex items-center md:mt-2`}>
                <Location
                  className={`w-4 h-4 shrink-0 flex md:w-6 md:h-6`}
                  variant={`Bold`}
                />
                <div className={`font-lato font-light text-sm md:text-xl`}>
                  {data?.result.address.subdistrict},{" "}
                  {data?.result.address.province}
                </div>
              </div>
            </div>
            <div className={`flex justify-center w-full `}>
              <div className={`flex gap-2 mt-4 justify-center `}>
                {data?.result.images.slice(0, 3).map((rows, index) => (
                  <div
                    onClick={() => {
                      setCurrent(index);
                    }}
                    key={index}
                    className={`h-3 ${
                      current === index
                        ? "w-12 rounded-lg opacity-100"
                        : "w-3 rounded-[100%] opacity-50"
                    } bg-white  transition-all duration-500 cursor-pointer `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`w-full fixed bottom-0 md:static flex items-center justify-between bg-[#FFFFFF] text-black  drop-shadow-md z-40 `}
      >
        <div
          className={`md:w-[70%] text-xs md:text-2xl font-bold font-lato pl-2  md:pl-20 h-full `}
        >
          Get the Help you Need, Contact Us!
        </div>
        <div className="md:w-[30%] bg-primary ">
          <div
            onClick={() => {
              handleCTA();
            }}
            className={`w-full  bg-primary hover:bg-opacity-80 hover:cursor-pointer text-white  flex items-center justify-between transition-all duration-150 `}
          >
            <div
              className={`flex items-center text-xs md:text-xl gap-5 pl-2 md:pl-10 `}
            >
              <Whatsapp
                className={`w-5 h-5 md:w-10 md:h-10`}
                variant={`Bold`}
              />
              <span className={`text-xs  md:block`}>Chat 081234567890</span>
            </div>

            <div className={`h-full px-4 py-6 md:p-8 text-white`}>
              <ArrowRight2 className={`w-3 h-3 md:w-5 md:h-5 font-bold`} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`px-4 md:px-20 md:py-10 flex flex-col bg-[#FCFCFC] `}>
        {/*  */}
        <div
          className={`grid grid-cols-2 xs:grid-cols-3 mt-5 md:flex items-center lg:justify-between md:divide-x `}
        >
          <PropertyDetailCard
            props={"Buildsize"}
            iconURL={"/icons/buildsize.png"}
            value={data?.result.buildingSize ?? 0}
            unitOfMeasurement={"cm"}
          />
          <PropertyDetailCard
            className={`md:pl-12`}
            props={"Landsize"}
            iconURL={"/icons/landsize.png"}
            value={data?.result.landSize ?? 0}
            unitOfMeasurement={"cm"}
          />
          <PropertyDetailCard
            className={`md:pl-12`}
            props={"Bedroom"}
            iconURL={"/icons/bedroom.png"}
            value={3 ?? 0}
          />
          <PropertyDetailCard
            className={`md:pl-12`}
            props={"Bathroom"}
            iconURL={"/icons/bathroom.png"}
            value={data?.result.bathRoomsAmount ?? 0}
          />
          <PropertyDetailCard
            className={`md:pl-12`}
            props={"Carpark"}
            iconURL={"/icons/carpark.png"}
            value={data?.result.bedRoomsAmount ?? 0}
          />
        </div>

        {/* About Us */}
        {data?.result.descriptionEn && (
          <div className={`my-2 md:my-10`}>
            <div
              className={` md:text-2xl font-montserrat font-semibold text-black`}
            >
              Description
            </div>
            <div className="font-lato font-light text-sm md:text-base mt-3 md:mt-6 text-secondary leading-6">
              <RichTextRender value={data?.result.descriptionEn as any} />
            </div>
          </div>
        )}

        {data?.result.keyFeatureEn && (
          <div className={`my-2 md:my-10`}>
            <div
              className={` md:text-2xl font-montserrat font-semibold text-black`}
            >
              Key Feature
            </div>
            <div className="font-lato font-light text-sm md:text-base mt-3 md:mt-6 text-secondary leading-6">
              <RichTextRender value={data?.result.keyFeatureEn as any} />
            </div>
          </div>
        )}

        {/* Property Gallery */}
        <div
          className={`mt-5 md:mt-10 text-black relative overflow-x-hidden ${
            seeMorePhotos
              ? "h-full "
              : "max-h-[350px] md:max-h-[1000px] overflow-y-hidden "
          }`}
        >
          {!seeMorePhotos && (
            <div
              className={`absolute w-full top-0 bg-gradient-to-b from-transparent from-60% h-[350px] md:h-[1000px] to-white z-30`}
            />
          )}

          <div
            className={` md:text-2xl font-montserrat font-semibold text-black`}
          >
            Property Gallery
          </div>
          {!loading && (
            <StackGrid
              className="mt-4"
              columnWidth={"50%"}
              gutterHeight={10}
              gutterWidth={10}
              duration={0}
            >
              {data?.result.images.map((rows, index) => (
                <div
                  key={index}
                  // onClick={() => {
                  //   setSelectedImage(rows.url);
                  // }}
                >
                  <Image
                    className={`object-fill h-fit  ${
                      selectedImage === rows.url && "border-2 border-orange-300"
                    }`}
                    alt={``}
                    loader={({ src }) => {
                      return src;
                    }}
                    src={rows.url}
                    width={900}
                    height={900}
                  />
                </div>
              ))}
            </StackGrid>
          )}
          <div className={`grid  gap-4 mt-4`}>
            {/* {data?.result.images.map((rows, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedImage(rows.url);
                }}
              >
                <Image
                  className={`object-cover md:w-[622px] md:h-[427px] ${
                    selectedImage === rows.url && "border-2 border-orange-300"
                  }`}
                  alt={``}
                  loader={({ src }) => {
                    return src;
                  }}
                  src={rows.url}
                  width={1920}
                  height={1080}
                />
              </div>
            ))} */}
          </div>
        </div>
        {!seeMorePhotos && data?.result.images.length! > 2 && (
          <div
            onClick={() => {
              setSeeMorePhotos(true);
            }}
            className={`text-black w-full text-center hover:underline active:underline`}
          >
            See More Photos
          </div>
        )}

        {/* Suggested */}
      </div>
    </div>
  );
}
