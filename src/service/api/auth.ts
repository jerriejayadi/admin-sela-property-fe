import apiClient from ".";
import { RequestLoginProps, ResponseLoginProps } from "../types/auth";

export const postLogin = (
  request: RequestLoginProps
): Promise<ResponseLoginProps> => {
  return apiClient.post(`/api/login`, request);
};
