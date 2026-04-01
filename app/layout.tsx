import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';

import 'tailwindcss/tailwind.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    default : "Rozgar Hub",
    template : "%s | Rozgar Hub"
  },
  description: "Find your dream developer job",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8679854690891861"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-w-[350px]`}>
        {children}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSXEVHWV2V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SSXEVHWV2V', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Hydro tracking */}
        <Script id="hydro_config" strategy="lazyOnload">
          {`window.Hydro_tagId = "8aa0f824-8d93-42a3-a8cc-726b792f940d";`}
        </Script>
        <Script src="https://track.hydro.online/" strategy="lazyOnload" />
      </body>
    </html>
  );
}
