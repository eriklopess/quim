"use client"
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-base">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">Quim Bistrô</h3>
            <p className="text-base/80 mb-6 max-w-md">
              Cozinha autoral de temporada no coração de São Paulo. 
              Uma experiência gastronômica única com ingredientes frescos e técnicas refinadas.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/quim_restro/" 
                className="p-2 bg-base/10 rounded-lg hover:bg-base/20 transition-colors"
                aria-label="Seguir no Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/quimbistro" 
                className="p-2 bg-base/10 rounded-lg hover:bg-base/20 transition-colors"
                aria-label="Seguir no Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Rua dos Pinheiros, 123</p>
                  <p>Pinheiros, São Paulo - SP</p>
                  <p>CEP: 05422-001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+5511345678900" className="hover:text-base/80">
                  (11) 3456-7890
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contato@quimbistro.com.br" className="hover:text-base/80">
                  contato@quimbistro.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horário</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-base/60">Segunda: Fechado</p>
                  <p>Terça a Domingo</p>
                  <p>18h00 - 00h00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Links Rápidos</h5>
              <div className="space-y-2 text-sm">
                <Link href="/cardapio" className="block hover:text-base/80">
                  Cardápio
                </Link>
                <Link href="/reservas" className="block hover:text-base/80">
                  Reservas
                </Link>
                <Link href="/delivery" className="block hover:text-base/80">
                  Delivery
                </Link>
                <Link href="/sobre" className="block hover:text-base/80">
                  Sobre Nós
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-base/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-base/60">
              © 2024 Quim Bistrô. Todos os direitos reservados.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/termos" className="hover:text-base/80">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="hover:text-base/80">
                Política de Privacidade
              </Link>
              <Link href="/lgpd" className="hover:text-base/80">
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Banner - Simple implementation */}
      <div id="cookie-banner" className="hidden fixed bottom-4 left-4 right-4 bg-wine text-base p-4 rounded-lg shadow-lg z-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-sm">
            Utilizamos cookies para melhorar sua experiência. 
            <Link href="/cookies" className="underline ml-1">Saiba mais</Link>
          </p>
          <button 
            onClick={() => document.getElementById('cookie-banner')?.classList.add('hidden')}
            className="btn-secondary bg-base text-ink hover:bg-base/80 text-xs px-3 py-1"
          >
            Aceitar
          </button>
        </div>
      </div>
    </footer>
  )
}