import { EStatusProperty } from "./postProperty";

export interface DetailPropertyProps {
  status: boolean;
  statusCode: number;
  result: IResult;
}

export interface IResult {
  id: string;
  title: string;
  descriptionId: string;
  descriptionEn: string;
  keyFeatureId: string;
  keyFeatureEn: string;
  price: string;
  status: EStatusProperty;
  published: boolean;
  tag: string;
  availability: boolean;
  propertyType: string;
  landSize: string;
  landSizeMeasurement: "sqm";
  buildingSize: string;
  buildingSizeMeasurement: "sqm";
  bedRoomsAmount: string;
  bathRoomsAmount: string;
  carParkAmount: string;
  garageAmount: string;
  floorAmount: string;
  buildingOrientation: "north";
  electricity: string;
  furnished: boolean;
  address: IAddress;
  images: IDetailPropertyImage[];
  googleDriveUrl: string;
  owner:string;
  ownerPhone:string;
}

export interface IDetailPropertyImage {
  id: string;
  type: string;
  url: string;
}

export interface IAddress {
  id?: string;
  subdistrict: string;
  regency: string;
  province: string;
  locationMaps: string;
}
