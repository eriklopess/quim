import Image from "next/image";
import Link from "next/link";
import { Container, Button, Heading, Subheading, Text } from "@/ui/design-system";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/1600/900?random=1"
          alt="Ambiente do Quim Bistrô"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay com gradiente para legibilidade */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container className="text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Heading
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl mb-4 tracking-tight text-balance text-white"
            >
              Quim Bistrô
            </Heading>

            <Subheading className="text-xl md:text-2xl lg:text-3xl mb-6 text-balance text-white/90">
              Cozinha autoral de temporada
            </Subheading>

            <Text className="text-lg md:text-xl mb-10 text-white/85 max-w-2xl mx-auto leading-relaxed">
              Experimente pratos únicos criados com ingredientes frescos e técnicas
              refinadas em um ambiente acolhedor no coração de São Paulo.
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" variant="secondary" className="bg-white/90 text-[#14151A] hover:bg-white">
                <Link href="/cardapio">Ver Cardápio</Link>
              </Button>

              <Button asChild size="lg">
                <Link href="/delivery">Pedir Delivery</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center items-start">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
