"use client";

import { ReactNode } from "react";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "./CartProvider";

export function AppCart({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
