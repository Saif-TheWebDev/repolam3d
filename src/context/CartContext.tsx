import React, { createContext, useContext, useState, useEffect } from 'react';
import { Model3D, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (model: Model3D, material?: string, materialPrice?: number) => void;
  removeFromCart: (modelId: string, material?: string) => void;
  updateQuantity: (modelId: string, quantity: number, material?: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lam3d_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lam3d_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (model: Model3D, material?: string, materialPrice?: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.model.id === model.id && item.selectedMaterial === material);
      if (existing) {
        return prev.map(item =>
          (item.model.id === model.id && item.selectedMaterial === material) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { model, quantity: 1, selectedMaterial: material, materialPrice }];
    });
  };

  const removeFromCart = (modelId: string, material?: string) => {
    setCart(prev => prev.filter(item => !(item.model.id === modelId && item.selectedMaterial === material)));
  };

  const updateQuantity = (modelId: string, quantity: number, material?: string) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item.model.id === modelId && item.selectedMaterial === material) ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const basePrice = item.model.price;
    const extra = item.materialPrice || 0;
    return sum + ((basePrice + extra) * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
