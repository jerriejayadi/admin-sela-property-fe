export interface RequestPropertyListParamsProps {
  keyword?: string;
  page?: number;
  limit?: number;
}

export interface ResponsePropertyProps {
  status: boolean;
  statusCode: number;
  result: IResult;
}

export interface IResult {
  items: IPropertyList[];
  meta: IMeta;
}

export interface IPropertyList {
  name: string;
  image: string;
  price: string | number;
  availability: string;
  landSize: string | number;
  buildSize: string | number;
  status: string;
  published: boolean;
}


export interface IMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
