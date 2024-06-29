import { ResponsePropertyProps } from "@/service/types/property/propertyList";

export const responseSuccess: ResponsePropertyProps = {
  status: true,
  statusCode: 200,
  result: {
    items: [
      {
        name: "Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool",
        price: 4000000000,
        availability: "Available",
        landSize: 300,
        buildSize: 300,
        status: "approved",
        published: false,
        image:
          "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/G0pmlEn1CkiRjDpoVoFD6.jpeg?alt=media&token=8d129852-bf8f-4bbe-a48b-9494d0bd438a",
      },
      {
        name: "Luxury Villa Ubud with Private Pool",
        price: 4000000000,
        availability: "Available",
        landSize: 300,
        buildSize: 300,
        status: "approved",
        published: true,
        image:
          "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/G0pmlEn1CkiRjDpoVoFD6.jpeg?alt=media&token=8d129852-bf8f-4bbe-a48b-9494d0bd438a",
      },
      {
        name: "Luxury Villa Ubud with Private Pool",
        price: 4000000000,
        availability: "Available",
        landSize: 300,
        buildSize: 300,
        status: "in_review",
        published: false,
        image:
          "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/G0pmlEn1CkiRjDpoVoFD6.jpeg?alt=media&token=8d129852-bf8f-4bbe-a48b-9494d0bd438a",
      },
      {
        name: "Luxury Villa Ubud with Private Pool",
        price: 4000000000,
        availability: "Available",
        landSize: 300,
        buildSize: 300,
        status: "rejected",
        published: true,
        image:
          "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/G0pmlEn1CkiRjDpoVoFD6.jpeg?alt=media&token=8d129852-bf8f-4bbe-a48b-9494d0bd438a",
      },
    ],
    meta: {
      totalItems: 1908,
      itemCount: 100,
      itemsPerPage: 100,
      totalPages: 1,
      currentPage: 1,
    },
  },
};

export const responseNotFound = {
  status: false,
  statusCode: 404,
  path: "/token",
  message: "Token not found",
  result: {},
};
