// app/not-found.tsx — Next.js 13+ (App Router)
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Compass, UtensilsCrossed } from "lucide-react";
import {
  Section,
  Container,
  Card,
  CardContent,
  Heading,
  Subheading,
  Text,
  Button,
  GridAuto,
} from "@/ui/design-system";

export default function NotFound() {
  return (
    <Section tone="white" className="min-h-[70vh] flex items-center">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Message */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1 mb-4">
              <AlertTriangle className="w-4 h-4" />
              <Text className="text-sm m-0">Erro 404 • Página não encontrada</Text>
            </div>
            <Heading as="h1" className="text-4xl md:text-5xl mb-3">Ops… esta mesa não existe.</Heading>
            <Subheading className="mb-6">Mas temos outras ótimas opções — que tal conhecer o cardápio ou fazer uma reserva?</Subheading>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/cardapio">
                  <UtensilsCrossed className="w-4 h-4 mr-2" /> Ver cardápio
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/reservas">Reservar mesa</Link>
              </Button>
            </div>
          </div>

          {/* Right: Quick links */}
          <div>
            <Card className="p-0 overflow-hidden">
              <CardContent className="p-6">
                <Heading as="h3" className="text-xl mb-2">Talvez você esteja procurando:</Heading>
                <GridAuto className="mt-3 !grid-cols-1">
                  {[{
                    title: "Entradas e Principais",
                    href: "/cardapio",
                    desc: "Destaques do chef e pratos de temporada.",
                  }, {
                    title: "Delivery",
                    href: "/delivery",
                    desc: "Peça sem sair de casa.",
                  }, {
                    title: "Reservas",
                    href: "/reservas",
                    desc: "Garanta sua mesa para hoje à noite.",
                  }, {
                    title: "Contato",
                    href: "/contato",
                    desc: "Endereço, horário e telefone.",
                  }].map((l) => (
                    <Link
                      key={l.title}
                      href={l.href}
                      className="block rounded-xl border border-black/10 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <Heading as="h4" className="text-lg mb-1">{l.title}</Heading>
                      <Text className="text-[#707585] m-0">{l.desc}</Text>
                    </Link>
                  ))}
                </GridAuto>

                <div className="mt-6">
                  <Subheading className="text-base mb-1">Navegar por seções</Subheading>
                  <div className="flex flex-wrap gap-2">
                    {["Entradas", "Principais", "Massas", "Sobremesas", "Vinhos"].map((tag) => (
                      <Link
                        key={tag}
                        href={"/cardapio#" + tag.toLowerCase()}
                        className="rounded-full border border-black/10 px-3 py-1 text-sm hover:bg-black/[0.04]"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom helper */}
        <div className="mt-10 inline-flex items-center gap-2 text-[#707585]">
          <Compass className="w-4 h-4" />
          <Text className="m-0 text-sm">Se o problema persistir, confira a URL ou volte para a página inicial.</Text>
        </div>
      </Container>
    </Section>
  );
}

// Dica: para projetos antigos (Pages Router), crie também /pages/404.tsx com o mesmo conteúdo.
