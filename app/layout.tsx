import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import Cursor from '@/components/cursor/Cursor'

export const metadata: Metadata = {
  title: 'Tactil - Web Design & Development',
  description: 'Clean design, clear strategy and more clients for your business.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='grain antialiased'>
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
