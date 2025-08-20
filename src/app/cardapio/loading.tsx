import { Container, Section, Skeleton } from "@/ui/design-system";
import { ProductCardSkeleton } from "@/app/components/skeletons/ProductCardSkeleton";

export default function LoadingCardapio() {
  return (
    <Section tone="white" className="pt-0">
      <Container>
        {/* header */}
        <div className="mb-6">
          <Skeleton className="h-9 w-56 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>

        {/* filtros */}
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur border-y border-black/5">
          <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
