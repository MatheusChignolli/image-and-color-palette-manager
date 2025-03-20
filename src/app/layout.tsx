import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

import Header from '@/components/header'
import Footer from '@/components/footer'
import CreateGroupModal from '@/components/group-modal'
import CreateTagModal from '@/components/tag-modal'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Brand Zone - Organize Your Colors and Images',
  description: 'Application to generate and manage content in a simple way'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CreateGroupModal />
        <CreateTagModal />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            removeDelay: 1000
          }}
        />
      </body>
    </html>
  )
}
