// app/sobre/page.tsx — Server Component (usa o Design System)
import Image from "next/image";
import Link from "next/link";
import {
  Section,
  SectionHeader,
  Container,
  GridAuto,
  Card,
  CardHeader,
  CardContent,
  Heading,
  Subheading,
  Text,
  Button,
  Media,
  Divider,
} from "@/ui/design-system";

export const revalidate = 60;

export default function SobrePage() {
  return (
    <>
      {/* HERO */}
      <Section tone="white" className="pb-0" aria-labelledby="sobre-hero-title">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Heading as="h1" className="text-4xl md:text-5xl mb-3">
                Sobre o Quim Bistrô
              </Heading>
              <Subheading className="mb-6">
                Cozinha autoral de temporada no coração de São Paulo — técnica contemporânea,
                ingredientes brasileiros e hospitalidade calorosa.
              </Subheading>
              <Text>
                Desde a abertura, nosso compromisso é celebrar o produto de estação, trabalhar com
                pequenos produtores e transformar cada visita em uma experiência memorável. O
                cardápio muda com frequência, sempre respeitando a sazonalidade e a
                sustentabilidade.
              </Text>
              <div className="mt-6 flex gap-3">
                <Button asChild><Link href="/reservas">Reservar mesa</Link></Button>
                <Button asChild variant="outline"><Link href="/cardapio">Ver cardápio</Link></Button>
              </div>
            </div>

            {/* Galeria responsiva com foco em legibilidade */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <div className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
                  <Image
                    src="https://picsum.photos/1200/900?random=31"
                    alt="Sala do restaurante"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
              <div className="space-y-4">
                <Media src="https://picsum.photos/800/600?random=32" alt="Prato autoral" aspect="square" />
                <Media src="https://picsum.photos/800/600?random=33" alt="Detalhe da cozinha" aspect="square" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FILOSOFIA + CHEF */}
      <Section tone="base" aria-labelledby="filosofia-title">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-4">
              <Heading as="h2">Nossa filosofia</Heading>
              <Text>
                Trabalhamos com agricultores, pescadores e artesãos que compartilham de nossos
                valores. Cada prato é pensado para ressaltar o ingrediente em seu melhor momento,
                com técnicas que respeitam texturas e sabores.
              </Text>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { t: "Sazonalidade", d: "Menu vivo e rotativo, alinhado ao calendário de colheita." },
                  { t: "Sustentabilidade", d: "Aproveitamento integral e cadeia curta de suprimentos." },
                  { t: "Hospitalidade", d: "Serviço atento, acolhedor e personalizado." },
                ].map((c) => (
                  <Card key={c.t} className="p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <Heading as="h3" className="text-lg mb-4">{c.t}</Heading>
                    <Text className="m-0 text-[#707585]">{c.d}</Text>
                  </Card>
                ))}
              </div>
            </div>

            {/* Card do chef */}
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <Image
                  src="https://picsum.photos/800/600?random=34"
                  alt="Chef Quim"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <Heading as="h3" className="text-2xl">Chef Quim</Heading>
                <Subheading className="text-base">Pesquisa, técnica e memória afetiva</Subheading>
              </CardHeader>
              <CardContent>
                <Text>
                  À frente da cozinha, o chef conduz uma equipe jovem e curiosa, unindo referências
                  brasileiras a técnicas contemporâneas. Destaques: massas artesanais e fundos de
                  cozimento longos.
                </Text>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* LINHA DO TEMPO */}
      <Section tone="white" aria-labelledby="trajetoria-title">
        <SectionHeader title="Nossa trajetória" subtitle="Alguns marcos desde a inauguração" />
        <Container>
          {/* Coluna com linha vertical + marcadores */}
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-black/10" aria-hidden="true" />
            <div className="grid gap-6">
              {[
                { ano: "2021", titulo: "Abertura do Quim Bistrô", texto: "Início do projeto com menu compacto e foco em produtores locais." },
                { ano: "2022", titulo: "Carta de vinhos", texto: "Curadoria com ênfase em rótulos naturais e pequenos produtores." },
                { ano: "2023", titulo: "Ampliação da cozinha", texto: "Novas técnicas de fermentação e defumação a frio." },
                { ano: "2024", titulo: "Experiência do Chef", texto: "Menu degustação de 8 etapas disponível em dias selecionados." },
              ].map((item, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#F97316]" />
                  <Heading as="h4" className="text-xl">
                    {item.ano} — {item.titulo}
                  </Heading>
                  <Text className="text-[#707585]">{item.texto}</Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* PRÊMIOS / IMPRENSA */}
      <Section tone="base" aria-labelledby="reconhecimentos-title">
        <SectionHeader title="Reconhecimentos" subtitle="Prêmios e menções na imprensa" />
        <Container>
          <GridAuto>
            {[
              { logo: "https://picsum.photos/200/80?random=41", titulo: "Guia da Cidade", texto: "Top 10 novos bistrôs de SP" },
              { logo: "https://picsum.photos/200/80?random=42", titulo: "Revista Gourmet", texto: "Melhor rigatoni do ano" },
              { logo: "https://picsum.photos/200/80?random=43", titulo: "Blog de Gastronomia", texto: "Carta de vinhos imperdível" },
            ].map((p, i) => (
              <Card key={i} className="p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.titulo} className="h-8 w-auto object-contain" />
                <div>
                  <Heading as="h3" className="text-lg">{p.titulo}</Heading>
                  <Text className="text-[#707585] m-0">{p.texto}</Text>
                </div>
              </Card>
            ))}
          </GridAuto>
        </Container>
      </Section>

      {/* FAQ (colapsável nativo) */}
      <Section tone="white" aria-labelledby="faq-title">
        <SectionHeader title="Perguntas frequentes" />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Há opções vegetarianas/veganas?",
                a: "Sim — nosso cardápio de temporada sempre contempla ao menos 2 opções sem carne e 1 opção vegana.",
              },
              {
                q: "Tem estacionamento?",
                a: "Não possuímos estacionamento próprio, mas há estacionamentos parceiros a poucos minutos.",
              },
              {
                q: "Aceitam reservas para grupos grandes?",
                a: "Sim, para grupos de 9 a 16 pessoas recomendamos contato pelo WhatsApp para organizar mesas.",
              },
              {
                q: "Taxa de rolha?",
                a: "Permitimos 1 garrafa por mesa sem taxa de rolha. A partir da segunda, taxa de R$ 60.",
              },
            ].map((item, i) => (
              <Card key={i} className="p-0 overflow-hidden">
                <details>
                  <summary className="list-none cursor-pointer p-6">
                    <Heading as="h3" className="text-lg">{item.q}</Heading>
                  </summary>
                  <Divider />
                  <div className="p-6 pt-4">
                    <Text className="text-[#353843] m-0">{item.a}</Text>
                  </div>
                </details>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA FINAL */}
      <Section tone="base" aria-labelledby="cta-title">
        <Container>
          <Card className="p-8 md:p-10 bg-gradient-to-br from-white to-[#FFF7ED]">
            <Heading className="mb-2">Venha nos visitar</Heading>
            <Subheading className="mb-6">Rua dos Pinheiros, 123 — Pinheiros, São Paulo</Subheading>
            <div className="flex gap-3 flex-wrap">
              <Button asChild><Link href="/reservas">Reservar mesa</Link></Button>
              <Button asChild variant="outline"><Link href="/delivery">Pedir delivery</Link></Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* SEO estruturado (opcional) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Quim Bistrô",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua dos Pinheiros, 123",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              postalCode: "05422-001",
              addressCountry: "BR",
            },
            servesCuisine: ["Brasileira", "Contemporânea"],
            priceRange: "$$$",
            acceptsReservations: true,
            telephone: "+55-11-3456-7890",
          }),
        }}
      />
    </>
  );
}
