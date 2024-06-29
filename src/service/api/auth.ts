import apiClient from ".";
import { RequestLoginProps, ResponseLoginProps } from "../types/auth";

export const postLogin = (
  request: RequestLoginProps
): Promise<ResponseLoginProps> => {
  return apiClient.post(`http://localhost:3002/api/login`, request);
};
