import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { FloatingCartBar } from "@/components/layout/FloatingCartBar";
import { RouteErrorBoundary } from "@/components/layout/ErrorBoundary";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { HideOnStudio } from "@/components/layout/HideOnStudio";

import { SplashScreen } from "@/components/organisms/SplashScreen";
import { SITE_URL } from "@/lib/config";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, jsonLd, restaurantJsonLd, websiteJsonLd } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OVOW FOODS | Taste the WOW. Experience OVOW.",
    template: "%s | OVOW FOODS",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "OVOW FOODS",
    "pure vegetarian food Ahmedabad",
    "veg cloud kitchen Ahmedabad",
    "dum matka biryani",
    "paneer delivery Ahmedabad",
    "Swaminarayan food",
    "party catering Ahmedabad",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: "OVOW FOODS | Premium Pure Vegetarian Food, Ahmedabad",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "OVOW FOODS | Premium Pure Vegetarian Food, Ahmedabad",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2118",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([restaurantJsonLd(), websiteJsonLd()])} />
      </head>
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans flex min-h-screen flex-col overflow-x-hidden`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
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
                  var el = document.getElementById('splash-cover');
                  // The splash never runs on /studio, so nothing else would remove the cover there
                  var isStudio = location.pathname.indexOf('/studio') === 0;
                  if (el && (isStudio || sessionStorage.getItem('ovow_splash_seen'))) { el.style.display = 'none'; }
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
              <RouteErrorBoundary>
                <main id="main-content" tabIndex={-1} className="flex-1 pb-16 md:pb-0">{children}</main>
                <HideOnStudio>
                  <Footer />
                </HideOnStudio>
              </RouteErrorBoundary>
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
