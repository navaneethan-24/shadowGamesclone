export interface VariantItem {
  isDefault: boolean;
  unitPrice: number;
  mrPrice: number;
  optionSet1?: string;
}

export interface Product {
  _id: string;
  name: string;
  defaultImage?: {
    relativePath: string;
  };
  variants?: {
    items?: VariantItem[];
  };
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
  displayOrder?: string;
  parentId?: string | null;
  items?: Category[];
  defaultImage?: { relativePath: string };
  fullImageUrl?: string;
  href: string;
}


export type ProductCardType = {
  id: string;
  imgSrc: string;
  title: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  categoryIds?: string[];
  selectedCategoryId?: string;
  inStock?: boolean;
};


export interface FeaturedProduct {
  name: string;
  products: {
    productId: string;
  }[];
}

export interface FeaturedProductsResponse {
  items: FeaturedProduct[];
}

export type CartItem = {
  _id: string;
  title: string;
  image?: string;
  price: number;
  mrPrice?: number;
  variantId?: string;
  optionSet1?: string;
  optionSet2?: string;
  key: string;
  qty: number;
};



export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQty: (item: CartItem, qty: number) => void;
  order: OrderData | null
  setOrder: (order: OrderData | null) => void

}

export type OrderData = {
  items: CartItem[]
  subtotal: number
  discount: number
  totalAmount: number
}
