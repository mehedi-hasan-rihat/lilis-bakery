import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { FloatingContact } from "@/components/floating-contact";
import "./globals.css";
import { Marquee } from "@/components/marquee";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mimi's  Dream Cakes — Handcrafted Cakes & Sweet Treats",
  description:
    "Whimsical, handcrafted cakes for weddings, birthdays and every sweet moment. Order custom cakes, celebration cakes and petits fours from Mimi's  Dream Cakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <div className="sticky top-0 z-50 ">
            <Marquee />
            <Header />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingContact />
        </CartProvider>
      </body>
    </html>
  );
}
