import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Script from "next/script";
import { GAListener } from "@/components/analytics";
import { Breadcrumb, CanonicalTag, Schema } from "@/components/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sleeply",
  description:
    "Track your sleep patterns, improve your sleep quality, and wake up refreshed with Sleeply – the modern sleep tracker app.",
  keywords: [
    "sleeply",
    "Sleeply",
    "sleeply website",
    "sleeply web app",
    "sleeply vercel app",
    "sleep tracker",
  ].join(", "),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || "",
  },
  openGraph: {
    title: "Sleeply – Smart Sleep Tracker & Wellness App",
    description:
      "Track and improve your sleep patterns with Sleeply. See insights, trends, and tips for better sleep.",
    url: "https://sleeply.vercel.app",
    siteName: "Sleeply",
    type: "website",
    images: [
      {
        url: "https://sleeply.vercel.app/sleeply.png",
        width: 1200,
        height: 630,
        alt: "Sleeply – Sleep Tracker App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleeply – Smart Sleep Tracker & Wellness App",
    description:
      "Monitor and improve your sleep with Sleeply. Insights, trends, and tips for better rest.",
    images: ["https://sleeply.vercel.app/sleeply.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/sleeply.ico",
    apple: "/sleeply.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/sleeply.ico" sizes="any" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/sleeply.ico" />

        <CanonicalTag />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="lazyOnload"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
            page_path: window.location.pathname,
          });
        `}
        </Script>
        <Schema />
        <Breadcrumb />
        <Analytics />
        <GAListener />
        <Toaster richColors position="top-center" />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
