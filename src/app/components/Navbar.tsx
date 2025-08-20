"use client";

import clsx from "clsx";
import { Menu, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/logo-rmbg.png";
import { useCart } from "../store/useCart";

// Design System
import { Container, Button, IconButton } from "@/ui/design-system";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Cardápio", href: "/cardapio" },
  { name: "Sobre", href: "/sobre" },
  { name: "Reservas", href: "/reservas" },
  { name: "Delivery", href: "/delivery" },
  { name: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/10">
      <nav aria-label="Primária">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 group focus:outline-none"
              aria-label="Ir para a página inicial"
            >
              <Image src={logo} alt="Quim Bistrô" width={64} height={50} />
              <span className="sr-only">Quim Bistrô</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "text-sm font-medium px-1 py-2 transition-colors",
                      active
                        ? "text-[#14151A] border-b-2 border-[#14151A]"
                        : "text-[#353843] hover:text-[#14151A] hover:border-b-2 hover:border-black/20"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <IconButton
                  aria-label="Abrir carrinho de compras"
                  onClick={toggleCart}
                  className="bg-white/90 hover:bg-white border border-black/10 !p-3"
                  
                >
                  <ShoppingBag width={24} height={24} color="#14151A"  />
                </IconButton>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full
                               bg-[#14151A] text-white text-xs font-bold leading-5 text-center"
                    aria-label={`${itemCount} itens no carrinho`}
                  >
                    {itemCount}
                  </span>
                )}
              </div>

              <IconButton
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                className="md:hidden bg-white/90 hover:bg-white border border-black/10 !p-3"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" color="#14151A" /> : <Menu className="w-5 h-5" color="#14151A" />}
              </IconButton>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div
              id="mobile-nav"
              className="md:hidden py-4 border-t border-black/10 animate-slide-down"
            >
              <div className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        "px-3 py-2 rounded-xl text-base font-medium transition-colors",
                        active
                          ? "bg-[#14151A] text-white"
                          : "text-[#353843] hover:bg-black/[0.04]"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-2">
                  <Button asChild className="w-full">
                    <Link href="/reservas">Reservar agora</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}
