"use client";
import React, { createContext, useContext, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
