import { Container, Section, Skeleton } from "@/ui/design-system";

export default function LoadingReservas() {
  return (
    <Section tone="white" className="pt-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-black/10 p-6 space-y-3">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-11 w-full rounded-xl" />
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-xl" />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-black/10 p-6 space-y-3">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-11 w-full rounded-xl" />
                ))}
              </div>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-black/10 p-6 space-y-3">
              <Skeleton className="h-6 w-40" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
