import type { Metadata } from 'next'
import { DM_Sans, Caveat, Fredoka, Shantell_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '600'],
})

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['300', '400', '500', '600', '700'],
})

const shantellSans = Shantell_Sans({
  subsets: ['latin'],
  variable: '--font-shantell',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Enya Song Portfolio',
  description:
    'Portfolio of Enya Song, a product designer.',
  generator: 'v0.app',
  icons: {
    icon: '/portfoliofavicon.png',
    shortcut: '/portfoliofavicon.png',
    apple: '/portfoliofavicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${caveat.variable} ${fredoka.variable} ${shantellSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
