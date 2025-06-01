import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="flex flex-wrap items-center justify-between border-b border-solid border-b-[#e7f3e7] px-4 sm:px-6 md:px-10 py-3 gap-4">
            {/* Left Side */}
            <div className="flex items-center gap-2 text-[#0e1b0e]">
              <div className="size-4">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6_319)">
                    <path
                      d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_319">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                O | N
              </h2>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex flex-1 justify-center gap-6 flex-wrap">
              <Link href="/" className="text-sm font-medium">
                Home
              </Link>
              <Link href="/guests" className="text-sm font-medium">
                Guests
              </Link>
              <Link href="/budget" className="text-sm font-medium">
                Budget
              </Link>
              <Link href="/vendors" className="text-sm font-medium">
                Vendor List
              </Link>
              <Link href="/vendors/addVendors" className="text-sm font-medium">
                Add Vendor
              </Link>
              <Link href="/floor-plan" className="text-sm font-medium">
                Floor Plan
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="flex h-10 items-center justify-center rounded-full bg-[#e7f3e7] text-[#0e1b0e] gap-2 text-sm font-bold px-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </button>
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAlq4O6Ir3uUoMi29EtiAkkiWxsy-lcrMnbDuqwh9E33nIZxM7bsmvIR-ezkoi-QqJZnrjcPbKMQiHXWzaDJ5D2h_HK1sxAUHqk2zdBmnJHK2ypIjG8nWehWmsuqsEUgHL6BjHvyVfXQe3scKQbolstrrIqsHGZ3d5s20tXsZqpwOoxC_uyb-SENyi-OB91I00BNWlE0zyUIRgZKJgbPvoVF6IOVU_TXWDAXVVnNte1b37C3hG5PSNv0oQQHhWMGiVSkfBjkKCcrg")',
                }}
              ></div>
            </div>

            {/* Mobile Navigation (optional) */}
            <nav className="flex md:hidden flex-wrap justify-center w-full gap-4 pt-2">
              <Link href="/" className="text-sm font-medium">
                Home
              </Link>
              <Link href="/guests" className="text-sm font-medium">
                Guests
              </Link>
              <Link href="/budget" className="text-sm font-medium">
                Budget
              </Link>
              <Link href="/vendors" className="text-sm font-medium">
                Vendor List
              </Link>
              <Link href="/vendors/addVendors" className="text-sm font-medium">
                Add Vendor
              </Link>
              <Link href="/floor-plan" className="text-sm font-medium">
                Floor Plan
              </Link>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto w-full px-4 sm:px-6 md:px-8 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
