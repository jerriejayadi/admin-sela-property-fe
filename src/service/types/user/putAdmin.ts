import { ERole } from "./postUser";

export interface PutAdminSelfRequestProps {
  name: string;
  email: string;
  password: string;
}

export interface PutAdminSelfResponseProps {
  status: boolean;
  statusCode: number;
  result: {
    id: "dd0df6c1-5768-486e-9b83-9f0f6747d50a";
    email: "string";
    name: "string";
    roles: ["ADMIN"];
    status: "active";
  };
}

export interface ResultPutAdminProps {
  id: string;
  email: string;
  name: string;
  roles: ERole[];
  status: string;
}
