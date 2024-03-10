import type { Metadata } from 'next'
import './globals.css'
import { Inter } from "next/font/google"

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import JotaiProviders from '@/providers/jotai'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Travel Scape',
  description: 'We provide all your travel needs'
}

const inter = Inter({subsets: ["latin"], weight: ["100", "200", "400", "500", "700"]})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
    <html lang="en" suppressHydrationWarning={true}>
      <JotaiProviders>
        <body  className={inter.className} >{children}</body>
      </JotaiProviders>
    </html>
  )
}
