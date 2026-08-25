import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'Elle - Your WebElle Launch Partner',
  description: 'Your personalized launch partner for WebElle kits.',
  robots: 'noindex, nofollow', // Keep search engines from indexing this
}

export default function ElleLab({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; }
          body { font-family: ${dmSans.variable}; }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
