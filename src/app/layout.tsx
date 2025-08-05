import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Design Studio - Build Anything with Words',
  description: 'Transform your ideas into stunning applications and games using the power of AI. Generate designs and code from natural language descriptions.',
  keywords: 'AI, design, code generation, app builder, web development, artificial intelligence',
  authors: [{ name: 'AI Design Studio' }],
  openGraph: {
    title: 'AI Design Studio - Build Anything with Words',
    description: 'Transform your ideas into stunning applications and games using the power of AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
