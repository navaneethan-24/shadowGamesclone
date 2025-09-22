export interface ProductCategoryType {
  id: number;
  name: string;
  price: number;
  platform: string;
  image: string;
}
export type ProductCondition = "new" | "used" | "new-open-box";

export interface ProductCardType {
  id: number;
  imgSrc: string;
  title: string;
  price: number;
  oldPrice?: number;
  tag: ProductCondition;
}
