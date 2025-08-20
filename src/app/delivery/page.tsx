// app/delivery/page.tsx — Server Component
import { Suspense } from "react";
import { Section, SectionHeader } from "@/ui/design-system";
import DeliveryClient from "./DeliveryClient";

export const revalidate = 0;

export default async function Page() {
  return (
    <>
      <Section tone="white" className="!pb-6 !pt-14">
        <SectionHeader
          title="Delivery"
          subtitle="Peça seus pratos favoritos com entrega rápida na sua região."
          center
        />
      </Section>

      <Suspense>
        <DeliveryClient />
      </Suspense>
    </>
  );
}

