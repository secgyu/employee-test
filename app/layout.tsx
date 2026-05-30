import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { CartProvider } from "@/src/features/cart/CartContext";
import { NotificationProvider } from "@/src/features/notifications/NotificationContext";
import { SITE } from "@/src/constants/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <NotificationProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </NotificationProvider>
        </CartProvider>
      </body>
    </html>
  );
}
