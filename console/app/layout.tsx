import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ActaChain - Revolutionizing Tokenized Bond Trading",
  description:
    "Streamline bilateral bond trades using DocuSign and blockchain technology. Reduce costs, eliminate legal bottlenecks, and enable secure, instant execution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-[100px]">
              <div className="flex items-center">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <Image
                    src="/logo.jpeg"
                    alt="ActaChain Logo"
                    width={50}
                    height={50}
                  />
                  {/* <span className="ml-2 text-xl font-bold text-blue-600">
                  ActaChain
                </span> */}
                </Link>
              </div>
              {/* Desktop Menu */}
              <div className="hidden sm:flex sm:items-center">
                <Link
                  href="/"
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Home
                </Link>
                <Link
                  href="/tracker"
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Tracker
                </Link>
                <Link
                  href="/create-trade"
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Create Trade
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
