export interface DummyProps {
  name: string;
  price: string | number;
  availability: string;
  landSize: string | number;
  buildSize: string | number;
  status: string;
  published: boolean;
}

export const dummy: DummyProps[] = [
  {
    name: "Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool Luxury Villa Ubud with Private Pool",
    price: 4000000000,
    availability: "Available",
    landSize: 300,
    buildSize: 300,
    status: "approved",
    published: false,
  },
  {
    name: "Luxury Villa Ubud with Private Pool",
    price: 4000000000,
    availability: "Available",
    landSize: 300,
    buildSize: 300,
    status: "approved",
    published: true,
  },
  {
    name: "Luxury Villa Ubud with Private Pool",
    price: 4000000000,
    availability: "Available",
    landSize: 300,
    buildSize: 300,
    status: "in_review",
    published: false,
  },
  {
    name: "Luxury Villa Ubud with Private Pool",
    price: 4000000000,
    availability: "Available",
    landSize: 300,
    buildSize: 300,
    status: "rejected",
    published: true,
  },
];
