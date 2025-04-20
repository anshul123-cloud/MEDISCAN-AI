import type { Metadata } from 'next'
import './globals.css'

import SessionWrapper from '@/components/SessionWrapper'; // make sure the path is correct
export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">    <SessionWrapper>{children}</SessionWrapper></body>
    </html>
  )
}
