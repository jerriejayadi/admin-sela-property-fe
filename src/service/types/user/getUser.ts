export interface GetUserParams {
  keyword?: string;
  role?: string;
  limit?: number;
  page?: number;
}

export interface GetUserProps {
  name: string;
  status: boolean;
  statusCode: number;
  result: Result;
}

export interface Result {
  items: Item[];
  meta: Meta;
}

export interface Item {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUserDetailProps {
  status: boolean;
  statusCode: number;
  result: {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    status: string;
  };
}
