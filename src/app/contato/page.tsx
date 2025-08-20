import { Suspense } from "react";
import { Section, SectionHeader } from "@/ui/design-system";
import ContatoClient from "./ContatoClient";

export const revalidate = 0;

export default async function Page() {
  return (
    <>
      <Section tone="white" className="!pb-6 !pt-14">
        <SectionHeader
          title="Contato"
          subtitle="Fale com o Quim Bistrô — reservas para grupos, eventos, imprensa e dúvidas gerais."
          center
        />
      </Section>

      <Suspense>
        <ContatoClient />
      </Suspense>
    </>
  );
}