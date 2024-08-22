export interface CurrencyListResponseProps {
  status: boolean;
  statusCode: number;
  result: Result[];
}

export interface Result {
  id: string;
  symbolNative: string;
  currencyRate: string;
}
