import type { Metadata } from 'next'
import { DM_Sans, Caveat } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Enya Song — Product Designer',
  description:
    'Portfolio of Enya Song, a product designer who designs clarity in complexity. Specializing in product design, systems thinking, and UX strategy.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
