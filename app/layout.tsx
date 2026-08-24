import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

import { SplashScreen } from "@/components/organisms/SplashScreen";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ovowfoods.com"),
  title: {
    default: "OVOW FOODS | Taste the WOW. Experience OVOW.",
    template: "%s | OVOW FOODS",
  },
  description:
    "Premium 100% pure vegetarian food experience. Order Dum Matka Biryani, Paneer, Comfort Meals & more.",
  openGraph: {
    title: "OVOW FOODS | Premium Vegetarian Food",
    description: "Taste the WOW. Experience OVOW. Premium pure vegetarian cloud kitchen.",
    url: "https://ovowfoods.com",
    siteName: "OVOW FOODS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OVOW Foods Premium Vegetarian",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Preload hero video — browser starts downloading immediately with page HTML */}
        <link rel="preload" as="video" href="/videos/hero-bg.mp4" type="video/mp4" />
      </head>
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <SplashScreen />
          <MotionProvider>
            <CartProvider>
              <Navbar />
              <Breadcrumbs />
              <CartDrawer />
              <ErrorBoundary>
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <Footer />
              </ErrorBoundary>
              <MobileBottomBar />
              <FloatingWhatsApp />
            </CartProvider>
          </MotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
