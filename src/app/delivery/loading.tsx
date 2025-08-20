import { Container, Section, Skeleton } from "@/ui/design-system";

export default function LoadingDelivery() {
  return (
    <Section tone="white" className="pt-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-8 w-64" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/10 p-6 space-y-3"
              >
                <Skeleton className="h-5 w-40" />
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  {Array.from({ length: 6 }).map((__, j) => (
                    <Skeleton key={j} className="h-11 w-full rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1 space-y-4">
            <Skeleton className="h-8 w-40" />
            <div className="rounded-xl border border-black/10 p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
              <div className="pt-2">
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
