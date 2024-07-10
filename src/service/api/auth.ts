import apiClient from ".";
import { RequestLoginProps, ResponseLoginProps } from "../types/auth";
import {
  GetUserDetailProps,
  GetUserParams,
  GetUserProps,
} from "../types/user/getUser";
import { PostUserProps, PostUserResponseProps } from "../types/user/postUser";

export const postLogin = (
  request: RequestLoginProps
): Promise<ResponseLoginProps> => {
  return apiClient.post(`/apis/admin/login`, request);
};

export const postUser = (
  request: PostUserProps
): Promise<PostUserResponseProps> => {
  return apiClient.post(`/apis/admin`, request);
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
