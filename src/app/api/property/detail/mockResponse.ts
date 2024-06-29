import { DetailPropertyProps } from "@/service/types/property/propertyDetail";

export const responseSuccess: DetailPropertyProps = {
  status: true,
  statusCode: 200,
  result: {
    title: "Villa Luxury Ubud Sangat Indah dan Nyaman Sekali WOWWW",
    propertyType: "villa",
    price: "140,000,000,000",
    description: "<p>This is the description of the product</p>",
    keyFeature:
      "<p>Keyfeature of the product is very wow wow i like it so much hahahahahahaah</p>",
    status: false,
    published: true,
    availability: true,
    landSize: "300",
    landSizeMeasurement: "sqm",
    buildingSize: "125",
    buildingSizeMeasurement: "sqm",
    bedRoomsAmount: "1",
    bathRoomsAmount: "2",
    carParkAmount: "3",
    address: {
      id: "",
      locationMaps: "www.google.com",
      province: "Bali",
      regency: "Gianyar",
      subdistrict: "Ubud",
    },
    images: [
      {
        id: "456",
        url: "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/Z73GaQvW91FvQe6hvvocn.jpeg?alt=media&token=c6288349-b663-4f0a-a0e9-6a986ab3a4d3",
        type: "thumbnail",
      },
      {
        id: "789",
        url: "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/f0SIn2laEkW-GOYcBiSQ9.jpeg?alt=media&token=c28886f4-c497-4fb3-ae90-c954a079ae6c",
        type: "thumbnail",
      },
      {
        id: "101112",
        url: "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/w4Y2EtRnmTclESx9m5TjD.jpeg?alt=media&token=d427c05d-7380-43c9-bb97-26ff09769425",
        type: "thumbnail",
      },
      {
        id: "131415",
        url: "https://firebasestorage.googleapis.com/v0/b/learn-firebase-b3cf6.appspot.com/o/OH6oDRCQYOln2gVhJF5xJ.jpeg?alt=media&token=0bcd2112-c489-47ad-a697-79bed9c8b68a",
        type: "thumbnail",
      },
    ],
    id: "a1b2c3",
    tag: "",
    garageAmount: "1",
    electricity: "a",
    floorAmount: "3",
    furnished: false,
    buildingOrientation: "north",
  },
};

export const responseNotFound = {
  status: false,
  statusCode: 404,
  path: "/token",
  message: "Token not found",
  result: {},
};
