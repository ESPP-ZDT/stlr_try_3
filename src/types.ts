export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    discountPercentage?: number;
    thumbnail?: string;
    images?: string[];
  }
  