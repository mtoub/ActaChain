import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ActaChain - Revolutionizing Tokenized Bond Trading",
  description:
    "Streamline bilateral bond trades using DocuSign and blockchain technology. Reduce costs, eliminate legal bottlenecks, and enable secure, instant execution.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              ActaChain
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link href="/tracker" className="hover:text-gray-300">
                Tracker
              </Link>
              <Link href="/create-trade" className="hover:text-gray-300">
                Create Trade
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

