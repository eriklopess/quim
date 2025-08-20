// app/contato/loading.tsx
import {
  Section,
  Container,
  Card,
  CardContent,
  Skeleton,
} from "@/ui/design-system";

export default function ContatoLoading() {
  return (
    <Section tone="white" className="pt-0">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Skeleton className="h-9 w-2/3 mx-auto mb-2" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna esquerda: formulário + canais diretos */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Skeleton className="h-11 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Skeleton className="h-11 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-11 w-40 rounded-xl" />
                  <Skeleton className="h-6 w-48 rounded-full" />
                </div>
              </CardContent>
            </Card>

            {/* Canais diretos */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Skeleton className="h-20 w-full rounded-xl" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita: endereço/horários/mapa */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <div className="my-2" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-48 rounded-xl" />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-64">
                <Skeleton className="h-full w-full" />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
