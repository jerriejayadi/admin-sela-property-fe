export interface PostUserProps {
  name: string;
  email: string;
  roles: ERole[];
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
  roles: ERole;
  status: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export enum ERole {
  ADMIN = "ADMIN",
  SELLING_AGENT = "SELLING_AGENT",
  LISTING_AGENT = "LISTING_AGENT",
}
