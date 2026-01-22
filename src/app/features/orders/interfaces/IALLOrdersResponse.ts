export interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  Subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  Category: Category[];
  Brand: Brand[];
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface IALLOrdersResponse {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItem: CartItem[];
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
