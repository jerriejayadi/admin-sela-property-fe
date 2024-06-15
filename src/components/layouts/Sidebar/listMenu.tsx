

import { Category2, UserTick, Building, Profile2User, Home2 } from "iconsax-react";

export const listMenu: any[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: <Home2 />,
    sub: [],
    level: 1,
  },
  {
    id: 2,
    name: "Property",
    path: "/property",
    icon: <Building />,
    level: 1,
  },
  {
    id: 3,
    name: "Client",
    path: "/client",
    icon: <Profile2User  />,
    sub: [],
    level: 1,
  },
  {
    id: 6,
    name: "User Management",
    path: "/user-management",
    icon: <UserTick  />,
    sub: [],
    level: 2,
  },
  // {
  //   id: 7,
  //   name: "Vendor",
  //   path: "/vendor",
  //   icon: <Data style={{ marginRight: "8px" }} />,
  //   sub: [],
  //   level: 1,
  // },
  // {
  //   id: 8,
  //   name: "Settings",
  //   path: "/setting-general",
  //   icon: <Setting2 style={{ marginRight: "8px" }} />,
  //   sub: [],
  //   level: 2,
  // },
];
