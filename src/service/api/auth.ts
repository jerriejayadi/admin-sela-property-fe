import apiClient from ".";
import { IResult, RequestLoginProps, ResponseLoginProps } from "../types/auth";
import {
  GetUserDetailProps,
  GetUserParams,
  GetUserProps,
} from "../types/user/getUser";
import { PostUserProps, PostUserResponseProps } from "../types/user/postUser";
import {
  PutAdminSelfRequestProps,
  PutAdminSelfResponseProps,
} from "../types/user/putAdmin";

export const postLogin = (
  request: RequestLoginProps
): Promise<ResponseLoginProps> => {
  return apiClient.post(`/apis/admin/login`, request);
};

export const postUser = (
  request: PostUserProps
): Promise<PostUserResponseProps> => {
  return apiClient.post(`/apis/admin/register`, request);
};

export const putUser = (
  id: string,
  request: PostUserProps
): Promise<PostUserResponseProps> => {
  return apiClient.put(`/apis/admin/${id}`, request);
};

export const getUser = (params: GetUserParams): Promise<GetUserProps> => {
  return apiClient.get(`/apis/admin`, { params: params });
};

export const getUserById = (id: string): Promise<GetUserDetailProps> => {
  return apiClient.get(`/apis/admin/${id}`);
};

export const putAdminSelf = (
  payload: PutAdminSelfRequestProps
): Promise<PutAdminSelfResponseProps> => {
  return apiClient.put(`/apis/admin/self`, payload);
};
