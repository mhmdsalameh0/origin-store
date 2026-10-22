"use client";

import { migrateSessionOrderAccessKeys } from "@/lib/orderAccess";
import { ReactNode, useEffect } from "react";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "./CartProvider";

export function AppCart({ children }: { children: ReactNode }) {
  useEffect(() => {
    migrateSessionOrderAccessKeys();
  }, []);

  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
