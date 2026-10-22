import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AppCart } from "@/components/cart/AppCart";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Origin Store",
  description: "Performance supplement home page"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <AppCart>{children}</AppCart>
      </body>
    </html>
  );
}
