export interface PostUserProps {
  name: string;
  email: string;
  role: ERole | "";
  password: string;
  status: EUserStatus;
}

export enum EUserStatus {
  active = "active",
  inactive = "inactive",
}

export interface PostUserResponseProps {
  status: true;
  statusCode: number;
  result: IPostUserResponseResult;
}

export interface IPostUserResponseResult {
  email: string;
  name: string;
  role: ERole;
  status: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export enum ERole {
  ADMIN = "admin",
  SELLING_AGENT = "selling_agent",
  LISTING_AGENT = "listing_agent",
}
