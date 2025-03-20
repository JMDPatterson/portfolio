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
  title: "James Patterson",
  description: "Creative technologist and software developer specializing in emerging technologies, 3D experiences, and innovative digital solutions. Explore my portfolio of immersive web experiences.",
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