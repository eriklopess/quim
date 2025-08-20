/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
  Container,
  Section,
  Card,
  CardContent,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Divider,
  Badge,
} from "@/ui/design-system";
import { useCart } from "@/app/store/useCart";
import { formatCurrency } from "@/app/lib/currency";

// Helpers
const onlyDigits = (s: string) => s.replace(/\D/g, "");
const maskCEP = (s: string) => {
  const d = onlyDigits(s).slice(0, 8);
  if (d.length <= 5) return d;
  return d.slice(0, 5) + "-" + d.slice(5);
};
const isValidCEP = (s: string) => /^\d{5}-?\d{3}$/.test(s);

// Simples precificação por zona (exemplo)
function getDeliveryFee(cep: string, subtotal: number) {
  if (subtotal >= 15000) return 0; // frete grátis acima de R$150,00 (centavos)
  const digits = onlyDigits(cep);
  const prefix = digits.slice(0, 3);
  if (["054", "055"].includes(prefix)) return 790;  // Zona A (Pinheiros)
  if (["050", "051", "052", "053", "056", "057"].includes(prefix)) return 1290; // Zona B
  return 1990; // demais
}

export default function DeliveryClient() {
  const { items } = useCart();

  // Subtotal (centavos)
  const subtotal = useMemo(() => {
    return items?.reduce((acc: number, it: any) => acc + Math.round((it.precoBase || 0) * 100) * (it.quantidade || 1), 0) ?? 0;
  }, [items]);

  // Estado do formulário
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
//   const [referencia, setReferencia] = useState("");

  const [entregaQuando, setEntregaQuando] = useState<"agora" | "agendar">("agora");
  const [agendarData, setAgendarData] = useState("");
  const [agendarHora, setAgendarHora] = useState("");

  const [pagamento, setPagamento] = useState<"pix" | "dinheiro" | "cartao_online">("pix");
  const [trocoPara, setTrocoPara] = useState<string>("");
  const [observacoes, setObservacoes] = useState("");
  const [cupom, setCupom] = useState("");

  // Regras de cupom simples (exemplo)
  const desconto = useMemo(() => {
    const c = cupom.trim().toUpperCase();
    if (!c) return 0;
    if (c === "BEMVINDO10") return Math.floor(subtotal * 0.1); // 10%
    if (c === "FRETEGRATIS") return getDeliveryFee(cep, subtotal); // zera frete
    return 0; // inválido ou sem efeito
  }, [cupom, subtotal, cep]);

  // Frete
  const deliveryFee = useMemo(() => getDeliveryFee(cep, subtotal), [cep, subtotal]);

  // Total
  const total = Math.max(0, subtotal + deliveryFee - desconto);

  const cartEmpty = (items?.length ?? 0) === 0;
  const addressValid =
    nome.trim().length > 1 &&
    isValidCEP(cep) &&
    endereco.trim().length > 2 &&
    numero.trim().length > 0 &&
    bairro.trim().length > 1 &&
    telefone.trim().length >= 8;

  const canSubmit = !cartEmpty && addressValid && (entregaQuando === "agora" || (agendarData && agendarHora));

  const handleSubmit = () => {
    if (!canSubmit) return;
    // Aqui você pode integrar com checkout/ordem (API própria, WhatsApp, etc)
    // const payload = {
    //   cliente: { nome, telefone },
    //   endereco: { cep, endereco, numero, complemento, bairro, referencia },
    //   entrega: entregaQuando === "agora" ? { tipo: "agora" } : { tipo: "agendar", data: agendarData, hora: agendarHora },
    //   pagamento: pagamento === "dinheiro" ? { tipo: pagamento, trocoPara } : { tipo: pagamento },
    //   observacoes,
    //   cupom,
    //   itens: items,
    //   valores: { subtotal, deliveryFee, desconto, total },
    // };
    alert("Pedido criado! Confira o console para ver o payload.");
  };

  return (
    <Section tone="white" className="!pt-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna esquerda: dados de entrega */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-xl">Endereço de entrega</Heading>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <div className="md:col-span-3">
                    <Input placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                  </div>
                  <div className="md:col-span-3">
                    <Input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                  </div>

                  <div className="md:col-span-2">
                    <Input placeholder="CEP" value={maskCEP(cep)} onChange={(e) => setCep(e.target.value)} />
                  </div>
                  <div className="md:col-span-4">
                    <Input placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                  </div>

                  <div>
                    <Input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Input placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                  </div>
                  <div className="md:col-span-3">
                    <Input placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                  </div>
                </div>

                {/* Feedback de CEP/zona */}
                {cep && (
                  <div className="pt-1">
                    {isValidCEP(cep) ? (
                      <Badge tone={deliveryFee === 0 ? "success" : "ink"}>
                        {deliveryFee === 0 ? "Frete grátis acima de R$150" : `Frete estimado: ${formatCurrency(deliveryFee/100)}`}
                      </Badge>
                    ) : (
                      <Text className="text-sm text-red-600 m-0">CEP inválido</Text>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-xl">Quando entregar?</Heading>
                <div className="flex gap-2 flex-wrap">
                  <Button variant={entregaQuando === "agora" ? "primary" : "outline"} onClick={() => setEntregaQuando("agora")}>Agora (45–60 min)</Button>
                  <Button variant={entregaQuando === "agendar" ? "primary" : "outline"} onClick={() => setEntregaQuando("agendar")}>Agendar</Button>
                </div>
                {entregaQuando === "agendar" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input type="date" value={agendarData} onChange={(e) => setAgendarData(e.target.value)} />
                    <Input type="time" value={agendarHora} onChange={(e) => setAgendarHora(e.target.value)} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-xl">Pagamento</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button onClick={() => setPagamento("pix")} className={`h-11 rounded-xl border ${pagamento === "pix" ? "border-black/80" : "border-black/10"}`}>PIX</button>
                  <button onClick={() => setPagamento("cartao_online")} className={`h-11 rounded-xl border ${pagamento === "cartao_online" ? "border-black/80" : "border-black/10"}`}>Cartão online</button>
                  <button onClick={() => setPagamento("dinheiro")} className={`h-11 rounded-xl border ${pagamento === "dinheiro" ? "border-black/80" : "border-black/10"}`}>Dinheiro</button>
                </div>
                {pagamento === "dinheiro" && (
                  <Input placeholder="Troco para quanto? (R$)" value={trocoPara} onChange={(e) => setTrocoPara(e.target.value)} />
                )}
                <Textarea placeholder="Observações para o entregador (opcional)" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita: resumo do pedido */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <Heading as="h3" className="text-lg mb-4">Resumo do pedido</Heading>
                <div className="space-y-2">
                  {(items ?? []).map((it: any) => (
                    <div key={it.produtoId + JSON.stringify(it.opcoesSelecionadas)} className="flex items-start justify-between gap-3">
                      <div>
                        <Text className="m-0 font-medium">{it.nome} × {it.quantidade}</Text>
                        {it.opcoesSelecionadas && (
                          <Text className="m-0 text-sm text-[#707585]">
                            {Object.entries(it.opcoesSelecionadas).map(([g, vals]) => `${g}: ${(vals as string[]).join(", ")}`).join(" • ")}
                          </Text>
                        )}
                      </div>
                      <Text className="m-0">{formatCurrency((it.precoBase || 0) * it.quantidade)}</Text>
                    </div>
                  ))}
                </div>

                <Divider className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between"><Text className="m-0 text-[#707585]">Subtotal</Text><Text className="m-0">{formatCurrency(subtotal/100)}</Text></div>
                  <div className="flex justify-between"><Text className="m-0 text-[#707585]">Entrega</Text><Text className="m-0">{deliveryFee === 0 ? "Grátis" : formatCurrency(deliveryFee/100)}</Text></div>
                  {desconto > 0 && (
                    <div className="flex justify-between"><Text className="m-0 text-[#707585]">Desconto</Text><Text className="m-0">- {formatCurrency(desconto/100)}</Text></div>
                  )}
                </div>

                <div className="mt-4">
                  <Input placeholder="Cupom" value={cupom} onChange={(e) => setCupom(e.target.value)} />
                </div>

                <Divider className="my-4" />

                <div className="flex items-center justify-between">
                  <Heading as="h4" className="text-xl">Total</Heading>
                  <Heading as="h4" className="text-xl">{formatCurrency(total/100)}</Heading>
                </div>

                <Button className="w-full mt-4" onClick={handleSubmit} disabled={!canSubmit}>
                  Finalizar pedido
                </Button>
                {!addressValid && (
                  <Text className="text-sm text-[#707585] mt-2">Preencha nome, telefone, CEP, endereço, número e bairro para continuar.</Text>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
