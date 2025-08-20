// app/cardapio/page.tsx — Server Component
import { Suspense } from "react";
import { Section, SectionHeader } from "@/ui/design-system";
import { getMenu } from "../lib/menu"; // ajuste o path se necessário
import CardapioClient from "./CardapioClient";

export const revalidate = 60; // revalidate ISR opcional

export default async function Page() {
  const menu = await getMenu();
  return (
    <>
      <Section tone="white" className="!pb-1">
        <SectionHeader
          title="Cardápio"
          subtitle="Escolha entre os pratos autorais do Quim Bistrô, com ingredientes de temporada."
          center
        />
      </Section>

      <Suspense>
        {/* Passa dados brutos para o client */}
        <CardapioClient produtos={menu} />
      </Suspense>
    </>
  );
}