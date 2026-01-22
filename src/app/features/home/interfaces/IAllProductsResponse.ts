export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  prevPage: number;
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
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface allProducts {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  Quantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  availableColors: any[];
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IAllProductsResponse {
  results: number;
  metadata: Metadata;
  data: allProducts[];
}
