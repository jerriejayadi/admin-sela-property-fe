export interface RequestPropertyListParamsProps {
  keyword?: string;
  page?: number;
  limit?: number;
}

export interface ResponsePropertyProps {
  status: boolean;
  statusCode: number;
  result: IPropertyList[];
}

export interface IResult {
  items: IPropertyList[];
  meta: IMeta;
}

export interface IPropertyList {
  id: string;
  title: string;
  propertyType: string;
  images: IImages[];
  price: string | number;
  availability: string;
  landSize: string | number;
  buildSize: string | number;
  status: string;
  published: boolean;
}

export interface IImages {
  type: string;
  url: string;
}

export interface IMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}