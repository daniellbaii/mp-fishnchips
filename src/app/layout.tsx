import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mount Pleasant Fish & Chips - Perth's Premier Seafood Destination",
  description: "Perth's finest fish and chips since 1960. Fresh daily catch, 15-minute guarantee, and three generations of seafood excellence. Order online for pickup.",
  keywords: "fish and chips Perth, fresh seafood Perth, Mount Pleasant, online ordering, Perth restaurant",
  authors: [{ name: "Mount Pleasant Fish & Chips" }],
  openGraph: {
    title: "Mount Pleasant Fish & Chips - Perth's Premier Seafood Destination",
    description: "Perth's finest fish and chips since 1960. Fresh daily catch, 15-minute guarantee, and three generations of seafood excellence.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
