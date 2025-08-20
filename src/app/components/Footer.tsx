"use client";

import { useEffect, useState } from "react";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

// Design System
import { Container, Button, Text, Heading, Divider } from "@/ui/design-system";

function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = typeof window !== "undefined" && localStorage.getItem("cookie-consent");
    if (!consent) setOpen(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 z-50"
    >
      <div className="mx-auto max-w-4xl rounded-2xl bg-white text-[#14151A] shadow-xl border border-black/10 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Text className="text-sm sm:text-[15px] m-0">
            Utilizamos cookies para melhorar sua experiência.
            <Link href="/cookies" className="underline ml-1">Saiba mais</Link>
          </Text>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/cookies">Preferências</Link>
            </Button>
            <Button size="sm" onClick={accept} className="px-3">
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#14151A] text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Heading as="h3" className="text-white mb-3">Quim Bistrô</Heading>
            <Text className="text-white/70 max-w-md mb-6">
              Cozinha autoral de temporada no coração de São Paulo.
              Uma experiência gastronômica única com ingredientes frescos e técnicas refinadas.
            </Text>
            <div className="flex gap-3">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/15 text-white border-white/10"
                aria-label="Seguir no Instagram"
                title="Seguir no Instagram"
              >
                <a href="https://www.instagram.com/quim_restro/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/15 text-white border-white/10"
                aria-label="Seguir no Facebook"
                title="Seguir no Facebook"
              >
                <a href="https://facebook.com/quimbistro" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-semibold mb-4">Contato</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/80" />
                <div className="text-white/80">
                  <p>Rua dos Pinheiros, 123</p>
                  <p>Pinheiros, São Paulo - SP</p>
                  <p>CEP: 05422-001</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-white/80" />
                <a href="tel:+551134567890" className="hover:text-white/80 text-white/90">
                  (11) 3456-7890
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-white/80" />
                <a href="mailto:contato@quimbistro.com.br" className="hover:text-white/80 text-white/90">
                  contato@quimbistro.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Hours + Quick Links */}
          <div>
            <p className="font-semibold mb-4">Horário</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 flex-shrink-0 text-white/80" />
                <div className="text-white/80">
                  <p className="text-white/60">Segunda: Fechado</p>
                  <p>Terça a Domingo</p>
                  <p>18h00 - 00h00</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium mb-3">Links Rápidos</p>
              <nav className="space-y-2 text-sm">
                <Link href="/cardapio" className="block hover:text-white/80">Cardápio</Link>
                <Link href="/reservas" className="block hover:text-white/80">Reservas</Link>
                <Link href="/delivery" className="block hover:text-white/80">Delivery</Link>
                <Link href="/sobre" className="block hover:text-white/80">Sobre Nós</Link>
              </nav>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                  <Link href="/reservas" className="flex items-center gap-2">
                    Reservar agora <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <Divider className="mt-12 bg-white/10" />
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Quim Bistrô. Todos os direitos reservados.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link href="/termos" className="hover:text-white/80">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-white/80">Política de Privacidade</Link>
            <Link href="/lgpd" className="hover:text-white/80">LGPD</Link>
          </nav>
        </div>
      </Container>

      {/* Cookie Banner */}
      <CookieBanner />
    </footer>
  );
}
