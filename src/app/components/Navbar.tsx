'use client'

import clsx from 'clsx'
import { Menu, ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import logo from '../../../public/logo-rmbg.png'
import { useCart } from '../store/useCart'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Cardápio', href: '/cardapio' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Reservas', href: '/reservas' },
  { name: 'Delivery', href: '/delivery' },
  { name: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { toggleCart, getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 bg-base/90 backdrop-blur-md border-b border-ink/10">
      <nav className="container-custom">
        <div className="flex items-center justify-around h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold font-serif text-ink hover:text-wine transition-colors duration-200"
          >
            <Image
              src={logo}
              alt="Quim Restro"
              width={64}
              height={50}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'text-sm font-medium transition-colors duration-200',
                  pathname === item.href
                    ? 'text-ink border-b-2 border-ink pb-1'
                    : 'text-ink/70 hover:text-ink hover:border-b-2 hover:border-ink/50 hover:pb-1'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-ink hover:text-wine transition-colors duration-200"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-ink text-base text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-ink hover:text-wine transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ink/10 animate-slide-down">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200',
                    pathname === item.href
                      ? 'bg-ink text-base'
                      : 'text-ink hover:bg-ink/10'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}