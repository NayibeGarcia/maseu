import type { Metadata } from 'next'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import '../sass/globals.scss'
import { AuthContextProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MAS E.U',
  description: 'Mantenimientos Asesorias y servicios E.U',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header />
          <main className="layout_main_content">{children}</main>
          <Footer />
        </AuthContextProvider>
        <div id="modal"></div>
        <Toaster position="bottom-left" expand />
      </body>
    </html>
  )
}
