import { ERole } from "./user/postUser";

export interface RequestLoginProps {
  email: string;
  password: string;
}

export interface ResponseLoginProps {
  status: boolean;
  statusCode: number;
  result: IResult;
}

export interface LoginGoogleProps {
  token: string;
}

export interface IResult {
  profile: IProfile;
  access_token: string;
}

export interface IProfile {
  id: string;
  name: string;
  email: string;
  roles: ERole[];
  image: string;
}
