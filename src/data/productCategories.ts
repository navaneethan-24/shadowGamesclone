// src/data/productCategories.ts

export interface Category {
  id: number;
  name: string;
  image: string;
}

const productCategories: Category[] = [
  { id: 1, name: "CONSOLE", image: "images/console.png" },
  { id: 2, name: "GAME CDS", image: "/images/gamecds.png" },
  { id: 3, name: "ACCESSORIES", image: "/images/accessories.png" },
  { id: 4, name: "VR / AR", image: "/images/vrar.png" },
  { id: 5, name: "RETRO GAME", image: "/images/retrogame.jpg" },
  { id: 6, name: "GAMING POSTERS", image: "/images/gameposter.png" },
  { id: 7, name: "SELL", image: "/images/sell.png" },
  { id: 8, name: "ELECTRONICS", image: "/images/electronics.png" },
  { id: 9, name: "LIMITED TIME DEAL", image: "/images/deals.jpg" },
  { id: 10, name: "FASHION", image: "/images/fashion.png" },
];

export default productCategories;
