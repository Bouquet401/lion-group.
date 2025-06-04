import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LION GROUP | 那覇市松山を中心に7店舗を運営",
  description:
    "那覇市松山を中心にシーシャBAR、CONCEPT BAR、サパー、会員制BAR、ガールズバー、夜カフェなど7店舗を運営するリオングループの公式サイト",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
