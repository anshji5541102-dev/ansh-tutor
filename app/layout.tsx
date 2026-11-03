import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import LoginModal from '@/components/auth/LoginModal'

export const redditSans = localFont({
  src: [
    {
      path: '../public/fonts/reddit-sans/RedditSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/reddit-sans/RedditSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/reddit-sans/RedditSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/reddit-sans/RedditSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/reddit-sans/RedditSans-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-reddit-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Ansh Tutor — Bharat's Trusted & Affordable Educational Platform",
  description:
    'Unlock your potential with Ansh Tutor. Daily Live interactive classes, 24x7 doubt solving, offline Vidyapeeth centres, and top-tier test series across India.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${redditSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-gray-900 selection:bg-[#5a4bda] selection:text-white">
        <AuthProvider>
          {children}
          <LoginModal />
        </AuthProvider>
      </body>
    </html>
  )
}
