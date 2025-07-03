// Remove 'use client' directive if present
// Remove useState import
// Remove hamburger button, overlay, and all mobile/hamburger logic
// Restore sidebar and main content to original format

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "White Template",
  description: "A plain white Next.js template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: 'white',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
