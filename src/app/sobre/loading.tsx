import { Container, Section, Skeleton } from "@/ui/design-system";

export default function LoadingSobre() {
  return (
    <Section tone="white" className="pt-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <Skeleton className="h-10 w-72 mb-3" />
            <Skeleton className="h-5 w-96 mb-2" />
            <Skeleton className="h-5 w-80 mb-6" />
            <Skeleton className="h-10 w-64 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <Skeleton className="aspect-square w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
