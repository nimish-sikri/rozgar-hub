import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "react-hot-toast";
import 'tailwindcss/tailwind.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getCurrentUser } from "@/lib/auth";
import { ModalProvider } from "@/providers/modal-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    default : "Rozgar Hub",
    template : "%s | Rozgar Hub"
  },
  description: "Find your dream developer job",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();

  return (
    <html lang="en">
       <body className={`${inter.className} min-w-[350px]`}>
        <Toaster/>
        <ModalProvider 
            //@ts-ignore
            currentUser={user!}
        />
        <Navbar 
          //@ts-ignore
          currentUser={user}
        />
        
        {children}
        <Footer/>
        <Analytics />
        <SpeedInsights />
        </body>
    </html>
  );
}
