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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OVOW FOODS",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Preload hero video — browser starts downloading immediately with page HTML */}
        <link rel="preload" as="video" href="/videos/hero-bg.mp4" type="video/mp4" />
        {/* Preload logo — ensures splash screen logo shows instantly, zero blank flash */}
        <link rel="preload" as="image" href="/logo/ovow-foods-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "OVOW FOODS",
              image: "https://ovowfoods.com/og-image.jpg",
              "@id": "https://ovowfoods.com",
              url: "https://ovowfoods.com",
              telephone: "+917567566214",
              address: {
                "@type": "PostalAddress",
                streetAddress: "13, Near, Ghatlodiya",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                postalCode: "382481",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 23.0525,
                longitude: 72.5337,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "11:00",
                closes: "04:00",
              },
              servesCuisine: "Vegetarian",
              priceRange: "₹₹",
            }),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        {/* Raw splash cover — shows LOGO immediately from raw HTML before any JS loads.
            This eliminates the blank green flash on slow networks entirely. */}
        <div
          id="splash-cover"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "#0d2d20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/ovow-foods-logo.png"
            alt="OVOW FOODS"
            width={160}
            height={160}
            style={{ borderRadius: "50%", objectFit: "contain" }}
          />
        </div>
        {/* Landing overlay — activated by SplashScreen on exit for smooth reveal */}
        <div
          id="landing-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9997,
            backgroundColor: "#fff",
            opacity: 0,
            pointerEvents: "none",
            display: "none",
          }}
        />
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
