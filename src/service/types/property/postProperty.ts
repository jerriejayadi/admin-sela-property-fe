import { EPropertyType } from "./EPropertyType";
import { IAddress, IDetailPropertyImage } from "./propertyDetail";

export interface PostPropertyProps {
  title: string;
  propertyType: EPropertyType;
  price: string;
  googleDriveUrl: string;
  descriptionEn: string;
  keyFeatureEn: string;
  descriptionId: string;
  keyFeatureId: string;
  status: EStatusProperty;
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
  sellingType?: string;
  owner: string;
  ownerPhone: string;
}

export enum EStatusProperty {
  DRAFT = "draft",
  IN_REVIEW = "in_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  ASK_REVISION = "ask_revision",
}
