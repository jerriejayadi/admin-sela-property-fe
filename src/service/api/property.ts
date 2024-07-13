import apiClient from ".";
import { PostPropertyProps } from "../types/property/postProperty";
import { DetailPropertyProps } from "../types/property/propertyDetail";
import {
  RequestPropertyListParamsProps,
  ResponsePropertyProps,
} from "../types/property/propertyList";

export const getPropertyList = (
  params: RequestPropertyListParamsProps
): Promise<ResponsePropertyProps> => {
  return apiClient.get(`/apis/property`, {
    params: params,
  });
};

export const getPropertyDetail = (id: string): Promise<DetailPropertyProps> => {
  return apiClient.get(`/apis/property/${id}`);
};

export const postProperty = (payload: PostPropertyProps) => {
  return apiClient.post(`/apis/property`, payload);
};

export const putPublished = (id: string, payload: { published: boolean }) => {
  return apiClient.put(`/apis/property/published/${id}`, payload);
};

export const putPropertyApproval = (propertyId: string, payload: any) => {
  return apiClient.put(`/apis/property-approval/${propertyId}`, payload);
};

export const putPropertyDetail = (
  propertyId: string,
  payload: PostPropertyProps
) => {
  return apiClient.put(`/apis/property/${propertyId}`, payload);
};

export const deleteProperty = (id: string) => {
  return apiClient.delete(`/apis/property/${id}`);
};
