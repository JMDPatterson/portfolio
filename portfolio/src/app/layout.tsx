import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Inter } from 'next/font/google'

import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Ensure font doesn't block rendering
})

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "A modern portfolio with 3D elements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${inter.className}`}>
      <body>
        {children}
      </body>
    </html>
  );
}