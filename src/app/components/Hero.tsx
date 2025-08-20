import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="https://picsum.photos/600/400?random=1"
          alt="Hero" fill className="object-contain" />
        <div className="absolute inset-0 bg-ink/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 text-balance">
            Quim Bistrô
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-balance font-light">
            Cozinha autoral de temporada
          </p>
          <p className="text-lg md:text-xl mb-12 text-base/90 max-w-2xl mx-auto leading-relaxed">
            Experimente pratos únicos criados com ingredientes frescos e técnicas refinadas
            em um ambiente acolhedor no coração de São Paulo
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/cardapio"
              className="btn bg-base text-ink hover:bg-white transition-all duration-300 text-lg px-8 py-4 min-w-[200px]"
            >
              Ver Cardápio
            </Link>
            <Link
              href="/delivery"
              className="btn border-2 border-base text-base hover:bg-base hover:text-ink transition-all duration-300 text-lg px-8 py-4 min-w-[200px]"
            >
              Pedir Delivery
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-base rounded-full flex justify-center">
          <div className="w-1 h-3 bg-base rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}