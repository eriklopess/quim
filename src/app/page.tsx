/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx (ou onde estiver sua Home)
import { Clock, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import { getMenu } from "./lib/menu";

// DS
import {
  Section,
  SectionHeader,
  GridAuto,
  Card,
  Button,
  Heading,
  Subheading,
  Text,
  TestimonialCard,
  CtaBlock,
} from "@/ui/design-system"; // ajuste o path conforme você salvou o arquivo do DS

export default async function HomePage() {
  const menu = await getMenu();
  const destaques = menu
    .filter((item: any) => item.badges?.includes("Chef"))
    .slice(0, 6);

  const depoimentos = [
    {
      nome: "Maria Silva",
      texto:
        "Uma experiência gastronômica única! O rigatoni ao ragu de cupim estava perfeito.",
      rating: 5,
    },
    {
      nome: "João Santos",
      texto:
        "Ambiente aconchegante e pratos incríveis. O atendimento é impecável!",
      rating: 5,
    },
    {
      nome: "Ana Costa",
      texto:
        "O melhor bistrô da cidade! Sempre volto para experimentar as novidades do chef.",
      rating: 5,
    },
  ];

  return (
    <>
      <Hero />

      {/* Destaques do Chef */}
      <Section tone="white">
        <SectionHeader
          title="Destaques do Chef"
          subtitle="Pratos especiais criados com ingredientes selecionados e técnicas refinadas"
        />

        <GridAuto>
          {destaques.map((produto: any) => (
            <Card key={produto.id} className="overflow-hidden">
              {/* Se seu ProductCard já renderiza imagem/preço, pode usá-lo direto aqui.
                  Caso queira usar o DS Media, descomente o bloco abaixo e adapte aos campos do seu produto.
              */}
              {/* <Media
                src={produto.imagem ?? `https://picsum.photos/600/400?random=${index + 1}`}
                alt={produto.nome ?? "Prato em destaque"}
              /> */}
              <ProductCard produto={produto} />
            </Card>
          ))}
        </GridAuto>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/cardapio">Ver Cardápio Completo</Link>
          </Button>
        </div>
      </Section>

      {/* Experiência Quim */}
      <Section tone="base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading className="mb-4">Experiência Quim</Heading>
            <Subheading className="mb-4">
              No Quim Bistrô, cada prato conta uma história. Nossa cozinha
              autoral celebra os sabores brasileiros com técnicas contemporâneas,
              criando experiências gastronômicas únicas que despertam todos os
              sentidos.
            </Subheading>
            <Text>
              Nosso chef trabalha exclusivamente com ingredientes de temporada,
              garantindo frescor e qualidade em cada criação. O ambiente
              acolhedor e o atendimento personalizado completam uma experiência
              inesquecível.
            </Text>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl group h-48">
                <Image
                  src="https://picsum.photos/600/400?random=11"
                  alt="Interior aconchegante do Quim Bistrô"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl group h-32">
                <Image
                  src="https://picsum.photos/600/400?random=12"
                  alt="Chef preparando prato especial"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="relative overflow-hidden rounded-2xl group h-64">
                <Image
                  src="https://picsum.photos/600/400?random=13"
                  alt="Prato especial do chef"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section tone="white">
        <SectionHeader title="O que dizem nossos clientes" />
        <GridAuto>
          {depoimentos.map((d, i) => (
            <TestimonialCard
              key={i}
              name={d.nome}
              text={d.texto}
              rating={d.rating}
            />
          ))}
        </GridAuto>
      </Section>

      {/* Reservas */}
      <Section tone="base">
        <CtaBlock
          title="Reserve sua mesa"
          text="Garanta seu lugar e viva uma experiência gastronômica inesquecível."
          primary={
            <Button asChild>
              <Link href="/reservas" className="flex items-center gap-2">
                Fazer Reserva <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          }
          secondary={
            <Button variant="outline" asChild>
              <Link href="/cardapio">Ver Cardápio</Link>
            </Button>
          }
        />
      </Section>

      {/* Localização e Horários */}
      <Section tone="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Heading className="mb-6">Visite-nos</Heading>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-black/70 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-black mb-1">Endereço</h3>
                  <Text className="text-black/70">
                    Rua dos Pinheiros, 123
                    <br />
                    Pinheiros, São Paulo - SP
                    <br />
                    CEP: 05422-001
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-black/70 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Horário de Funcionamento
                  </h3>
                  <div className="text-black/70 space-y-1">
                    <p>Segunda: Fechado</p>
                    <p>Terça a Domingo: 18h00 - 00h00</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-black/70 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-black mb-1">Contato</h3>
                  <Text className="text-black/70">(11) 3456-7890</Text>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild>
                  <Link
                    href="https://maps.google.com/?q=Rua dos Pinheiros, 123, São Paulo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir no Google Maps
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/reservas">Reservar agora</Link>
                </Button>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="h-96">
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
          </Card>
        </div>
      </Section>
    </>
  );
}
