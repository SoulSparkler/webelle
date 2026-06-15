import type { Metadata } from 'next'
import { Anton, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const anton = Anton({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-anton'
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://webelle.store'),
  title: {
    default: 'WebElle - Business Starter Kits for Women',
    template: '%s | WebElle',
  },
  description: 'Personalized Business Starter Kits for women 35+ who want to start a side hustle. Launch your dream business this weekend.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'WebElle - Business Starter Kits for Women',
    description: 'Personalized Business Starter Kits for women 35+ who want to start a side hustle. Launch your dream business this weekend.',
    url: 'https://webelle.store',
    siteName: 'WebElle',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebElle - Business Starter Kits for Women',
    description: 'Personalized Business Starter Kits for women 35+ who want to start a side hustle. Launch your dream business this weekend.',
  },
  alternates: {
    canonical: 'https://webelle.store',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
