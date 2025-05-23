import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ova & Nadun's Wedding Planner",
  description: "Plan your dream wedding with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="text-center py-6 px-4 sm:px-6 md:px-8 bg-white border-b border-gray-200">
            <h1 className="text-3xl sm:text-4xl font-serif tracking-wider">OVADANEE + NADUN</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-500 uppercase">July 23/24, 2025 • Colombo, SL</p>
          </header>

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-2 sm:space-y-0 py-4 px-4 sm:px-6 border-b border-gray-300 text-sm sm:text-base">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/guests" className="hover:underline">Guests</Link>
            <Link href="/budget" className="hover:underline">Budget</Link>
            <Link href="/vendors" className="hover:underline">Vendor List</Link>
            <Link href="/vendors/addVendors" className="hover:underline">Add Vendor</Link>
            <Link href="/floor-plan" className="hover:underline">Floor Plan</Link>
          </nav>

          {/* Main Content */}
          <main className="flex-1 container mx-auto w-full px-4 sm:px-6 md:px-8 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}