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
import { FloatingCartBar } from "@/components/layout/FloatingCartBar";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { HideOnStudio } from "@/components/layout/HideOnStudio";

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
        {/* Preload hero images — browser starts downloading immediately with page HTML to prevent dark flashes */}
        <link rel="preload" as="image" href="/images/hero-bg-poster.jpg" />
        <link rel="preload" as="image" href="/images/hero-poster.jpg" />
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
        {/* Raw splash cover — green background before JS loads, prevents hero flash on first visit. */}
        <div
          id="splash-cover"
          suppressHydrationWarning
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 9998,
            backgroundColor: "#0d2d20",
            pointerEvents: "none",
          }}
        />
        {/* Inline script: runs synchronously BEFORE any paint — ZERO dark-flash on returning visits.
            Hides the splash-cover div immediately if the user has already seen the splash this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var seen = sessionStorage.getItem('ovow_splash_seen');
                  var el = document.getElementById('splash-cover');
                  if (seen && el) { el.style.display = 'none'; }
                } catch(e) {}
              })();
            `,
          }}
        />
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
          <HideOnStudio>
            <SplashScreen />
          </HideOnStudio>
          <MotionProvider>
            <CartProvider>
              <HideOnStudio>
                <Navbar />
                <Breadcrumbs />
                <CartDrawer />
              </HideOnStudio>
              <ErrorBoundary>
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <HideOnStudio>
                  <Footer />
                </HideOnStudio>
              </ErrorBoundary>
              <HideOnStudio>
                <FloatingCartBar />
                <MobileBottomBar />
                <FloatingWhatsApp />
              </HideOnStudio>
            </CartProvider>
          </MotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
