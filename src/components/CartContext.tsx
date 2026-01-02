"use client";

import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import { CartItem, CartContextType } from "@/types";

const CartContext = createContext<CartContextType | undefined>(undefined);
type OrderData = {
  items: CartItem[]
  subtotal: number
  discount: number
  totalAmount: number
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false)
  const [order, setOrder] = useState<OrderData | null>(null)


  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
    setHydrated(true)
  }, []);


  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exist = prev.find(i =>
        i._id === item._id &&
        i.variantId === item.variantId &&
        i.optionSet1 === item.optionSet1 &&
        i.optionSet2 === item.optionSet2
      );
      if (exist) {
        return prev.map(i =>
          i._id === item._id &&
            i.variantId === item.variantId &&
            i.optionSet1 === item.optionSet1 &&
            i.optionSet2 === item.optionSet2
            ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart(prev => prev.filter(
      i => !(
        i._id === item._id &&
        i.variantId === item.variantId &&
        i.optionSet1 === item.optionSet1 &&
        i.optionSet2 === item.optionSet2
      )));

    setOrder(prev =>
      prev
        ? {
          ...prev,
          items: prev.items.filter(
            i =>
              !(
                i._id === item._id &&
                i.variantId === item.variantId &&
                i.optionSet1 === item.optionSet1 &&
                i.optionSet2 === item.optionSet2
              )
          ),
        }
        : prev
    );
  };

  const updateQty = (item: CartItem, qty: number) => {
    setCart(prev =>
      prev.map(i =>
        i._id === item._id && i.variantId === item.variantId ? { ...i, qty } : i
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, order, setOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
