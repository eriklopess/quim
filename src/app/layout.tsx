
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Toast } from './components/Toast'
import './globals.css'
import CartDrawer from './components/CartDrawer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const og = 'https://picsum.photos/1200/630?seed=quim';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Quim Bistrô | Cozinha Autoral de Temporada',
    template: '%s | Quim Bistrô'
  },
  description: 'Experimente a cozinha autoral de temporada do Quim Bistrô. Pratos únicos, ingredientes frescos e uma experiência gastronômica inesquecível.',
  keywords: ['bistrô', 'restaurante', 'cozinha autoral', 'delivery', 'São Paulo', 'gastronomia'],
  authors: [{ name: 'Quim Bistrô' }],
  creator: 'Quim Bistrô',
  publisher: 'Quim Bistrô',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://quimbistro.com.br',
    title: 'Quim Bistrô | Cozinha Autoral de Temporada',
    description: 'Experimente a cozinha autoral de temporada do Quim Bistrô. Pratos únicos, ingredientes frescos e uma experiência gastronômica inesquecível.',
    siteName: 'Quim Bistrô',
    images: [{ url: og, width: 1200, height: 630, alt: 'Quim Bistrô' }] 
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quim Bistrô | Cozinha Autoral de Temporada',
    description: 'Experimente a cozinha autoral de temporada do Quim Bistrô. Pratos únicos, ingredientes frescos e uma experiência gastronômica inesquecível.',
    images: [og],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Quim Bistrô',
  description: 'Bistrô de cozinha autoral com ingredientes frescos e pratos de temporada',
  url: 'https://quimrestro.com.br',
  telephone: '+55 11 3456-7890',
  email: 'contato@quimbistro.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua dos Pinheiros, 123',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '05422-001',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '18:00',
      closes: '00:00',
    },
  ],
  priceRange: '$$$$',
  servesCuisine: 'Cozinha Autoral Brasileira',
  acceptsReservations: true,
  hasMenu: 'https://drive.google.com/file/d/1JQdj6zdJSfh5m1raiJ3jCcZ3o7C0grtF/view',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E7DBC6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <CartDrawer />
        <Footer />
        <Toast />
      </body>
    </html>
  )
}