"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  dosage: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  hydrated: boolean;
  isDrawerOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  addItem: (item: CartLine) => void;
  removeItem: (productId: string, dosage: string) => void;
  updateQuantity: (productId: string, dosage: string, quantity: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "origin-peptides-cart";

function lineKey(item: Pick<CartLine, "productId" | "dosage">) {
  return `${item.productId}::${item.dosage}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(storageKey);

      if (savedCart) {
        const parsed = JSON.parse(savedCart) as CartLine[];
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((item) => item.quantity > 0));
        }
      }
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((item: CartLine) => {
    setItems((currentItems) => {
      const nextItems = [...currentItems];
      const existingIndex = nextItems.findIndex((cartItem) => lineKey(cartItem) === lineKey(item));

      if (existingIndex >= 0) {
        nextItems[existingIndex] = {
          ...nextItems[existingIndex],
          quantity: nextItems[existingIndex].quantity + item.quantity
        };
        return nextItems;
      }

      return [...nextItems, { ...item, quantity: Math.max(1, item.quantity) }];
    });
  }, []);

  const removeItem = useCallback((productId: string, dosage: string) => {
    setItems((currentItems) => currentItems.filter((item) => lineKey(item) !== lineKey({ productId, dosage })));
  }, []);

  const updateQuantity = useCallback((productId: string, dosage: string, quantity: number) => {
    const safeQuantity = Math.max(0, Math.floor(quantity || 0));

    setItems((currentItems) =>
      currentItems
        .map((item) => (lineKey(item) === lineKey({ productId, dosage }) ? { ...item, quantity: safeQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      hydrated,
      isDrawerOpen,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      clearCart: () => setItems([])
    };
  }, [addItem, hydrated, isDrawerOpen, items, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
