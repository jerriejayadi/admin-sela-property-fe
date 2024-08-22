import apiClient from ".";
import { CurrencyListResponseProps } from "../types/currency/list";

export const getCurrencyList = (): Promise<CurrencyListResponseProps> => {
  return apiClient.get(`/apis/currency`);
};
