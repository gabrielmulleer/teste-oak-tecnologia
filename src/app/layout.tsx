import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import './globals.css'
import Link from 'next/link'

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Gabriel Müller | Teste Oak Tecnologia',
  description: 'Teste tecnico da Oak Tecnologia para vaga de Dev Jr.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <div className="flex flex-col min-h-screen">
          <nav className="bg-gray-800 text-white h-20 flex items-center justify-between px-8">
            <h1 className="text-2xl">Gabriel Müller</h1>

            <div className="flex space-x-4">
              <Link href="/" className="hover:text-gray-400">
                Cadastrar Produto
              </Link>
              <Link href="/products" className="hover:text-gray-400">
                Lista de Produtos
              </Link>
            </div>
          </nav>
          <main className="flex items-center justify-center flex-1 p-8 bg-gray-100">
            {children}
          </main>
          <footer className="bg-gray-800 text-white h-16 flex flex-col items-center justify-center py-4">
            <p>Copyright© 2024 | Gabriel Müller</p>
            <div className="flex flex-row items-center justify-center space-x-2">
              <Link
                href="https://www.linkedin.com/in/gabrielmulleer/"
                className="hover:text-gray-400"
              >
                Linkedin
              </Link>
              <Link
                href="https://github.com/gabrielmulleer/"
                className="hover:text-gray-400"
              >
                Github
              </Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
