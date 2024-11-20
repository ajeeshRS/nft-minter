import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalletAdapter from "@/components/WalletAdapter";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "100xDevs",
  description: "Mint your free 100xDevs NFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-bg bg-cover min-w-screen min-h-screen backdrop-blur-3xl`}
      >
        <WalletAdapter>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </WalletAdapter>
      </body>
    </html>
  );
}
