
import { Clock, MapPin, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import Section from './components/Section'
import { getMenu } from './lib/menu'

export default async function HomePage() {
  const menu = await getMenu()
  const destaques = menu.filter(item => item.badges?.includes('Chef')).slice(0, 6)

  const depoimentos = [
    {
      nome: "Maria Silva",
      texto: "Uma experiência gastronômica única! O rigatoni ao ragu de cupim estava perfeito.",
      rating: 5
    },
    {
      nome: "João Santos",
      texto: "Ambiente aconchegante e pratos incríveis. O atendimento é impecável!",
      rating: 5
    },
    {
      nome: "Ana Costa",
      texto: "O melhor bistrô da cidade! Sempre volto para experimentar as novidades do chef.",
      rating: 5
    }
  ]

  return (
    <>
      <Hero />
      
      {/* Destaques do Chef */}
      <Section className="bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-4">
              Destaques do Chef
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Pratos especiais criados com ingredientes selecionados e técnicas refinadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destaques.map((produto, index) => (
              <div key={produto.id} className={`animate-fade-in animation-delay-${index * 200}`}>
                <ProductCard produto={produto} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/cardapio" className="btn-primary">
              Ver Cardápio Completo
            </Link>
          </div>
        </div>
      </Section>

      {/* Experiência Quim */}
      <Section className="bg-base">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-ink">
                Experiência Quim
              </h2>
              <p className="text-lg text-ink/80 leading-relaxed">
                No Quim Bistrô, cada prato conta uma história. Nossa cozinha autoral celebra 
                os sabores brasileiros com técnicas contemporâneas, criando experiências 
                gastronômicas únicas que despertam todos os sentidos.
              </p>
              <p className="text-lg text-ink/80 leading-relaxed">
                Nosso chef trabalha exclusivamente com ingredientes de temporada, 
                garantindo frescor e qualidade em cada criação. O ambiente acolhedor 
                e o atendimento personalizado completam uma experiência inesquecível.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/600/400?random=1"
                    alt="Interior aconchegante do Quim Bistrô"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-2xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/600/400?random=1"
                    alt="Chef preparando prato especial"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/600/400?random=1"
                    alt="Prato especial do chef"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section className="bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-4">
              O que dizem nossos clientes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <div 
                key={index}
                className={`card animate-slide-up animation-delay-${index * 200}`}
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: depoimento.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-ink/80 mb-4 italic">
                  {depoimento.texto}
                </blockquote>
                <cite className="text-ink font-medium not-italic">
                  — {depoimento.nome}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Reservas */}
      <Section className="bg-base">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">
                Reserve sua mesa
              </h2>
              <p className="text-lg text-ink/80 mb-8 leading-relaxed">
                Garante seu lugar em nossa mesa e desfrute de uma experiência 
                gastronômica única. Recomendamos reserva prévia, especialmente 
                aos fins de semana.
              </p>
              <Link href="/reservas" className="btn-primary">
                Fazer Reserva
              </Link>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/600/400?random=1"
                alt="Mesa preparada para jantar romântico"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Localização e Horários */}
      <Section className="bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-ink mb-8">
                Visite-nos
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-ink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Endereço</h3>
                    <p className="text-ink/70">
                      Rua dos Pinheiros, 123<br />
                      Pinheiros, São Paulo - SP<br />
                      CEP: 05422-001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-ink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Horário de Funcionamento</h3>
                    <div className="text-ink/70 space-y-1">
                      <p>Segunda: Fechado</p>
                      <p>Terça a Domingo: 18h00 - 00h00</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-ink mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-ink mb-1">Contato</h3>
                    <p className="text-ink/70">(11) 3456-7890</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-96 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2!2d-46.6911!3d-23.5629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ2LjQiUyA0NsKwNDEnMjgiVw!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Quim Bistrô"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}