import { Suspense } from "react";
import { Section, SectionHeader } from "@/ui/design-system";
import ReservasClient from "./ReservasClient";

export const revalidate = 0;

export default async function Page() {
  return (
    <>
      <Section tone="white" className="!pb-6 !pt-14">
        <SectionHeader
          title="Reservas"
          subtitle="Garanta sua mesa no Quim Bistrô. Escolha data, horário e número de pessoas."
          center
        />
      </Section>

      <Suspense>
        <ReservasClient />
      </Suspense>
    </>
  );
}
