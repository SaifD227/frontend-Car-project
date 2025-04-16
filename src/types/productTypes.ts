export interface Car {
  _id: number;
  name: string;
  brand: string;
  carModel: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  images: string[];
  features: string[];
  engineCapacity: string;
  ratings: number;
}

export interface ProductData {
  name: string;
  brand: string;
  carModel: string;
  year: number;
  price: number;
  condition: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engineCapacity: string;
  color: string[];
  bodyType: string;
  registrationStatus: string;
  features: string[];
  stock: string;
  images: string[];
  ratings: number;
  seller: {
    name: string;
    contact: string;
    location: string;
  };
  [key: string]: any;
}
