import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";
import Navbar from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bred Commerce - Your Ultimate Shopping Destination",
  description:
    "Shop the best products at Bred Commerce. Fast shipping, quality guarantee, and 24/7 support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              {/* Navbar */}
              <Navbar />

              {/* Main Content */}
              <main>{children}</main>

              {/* Footer */}
              <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                  <p>&copy; 2025 Bred Commerce. All rights reserved.</p>
                </div>
              </footer>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}