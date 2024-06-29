import apiClient from ".";
import { DetailPropertyProps } from "../types/property/propertyDetail";
import {
  RequestPropertyListParamsProps,
  ResponsePropertyProps,
} from "../types/property/propertyList";

export const getPropertyList = (
  params: RequestPropertyListParamsProps
): Promise<ResponsePropertyProps> => {
  return apiClient.get(`http://localhost:3002/api/property`, {
    params: params,
  });
};

export const getPropertyDetail = (id: string): Promise<DetailPropertyProps> => {
  return apiClient.get(`/api/property/detail`, { params: { id: id } });
};
