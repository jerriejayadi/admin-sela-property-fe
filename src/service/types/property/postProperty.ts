import { IAddress, IDetailPropertyImage } from "./propertyDetail";

export interface PostPropertyProps {
  title: string;
  propertyType: string;
  price: string;
  googleDriveUrl:string;
  descriptionEn: string;
  keyFeatureEn: string;
  descriptionId: string;
  keyFeatureId: string;
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
  address: IAddress;
  images?: IDetailPropertyImage[];
}
