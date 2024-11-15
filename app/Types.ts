export type OrderType = {
  id: number;
  name: string;
  tel: string;
  receive: string;
  address: string;
  floor: number;
  intercom: string;
  products: Products[];
};
type Products = {
  id: number;
  volume: number;
};
export type ProductFormData = {
  title: string;
  description: string;
  weight: number;
  calories: number;
  price: number;
  structure: string;
  category: string;
  img: string;
};
export type ProductType = {
  id: number;
  title: string;
  img: string;
  category: string;
  price: number;
  weight: number;
  calories: number;
  descriptions: string;
  structure: string;
  blocking: boolean;
};
