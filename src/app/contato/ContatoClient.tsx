/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Container,
  Section,
  Card,
  CardContent,
  Heading,
  Subheading,
  Text,
  Input,
  Select,
  Textarea,
  Button,
  Divider,
  Badge,
} from "@/ui/design-system";

const EMAIL_RE = /.+@.+\..+/;
const PHONE_RE = /[0-9]{8,}/;

export default function ContatoClient() {
  // Form state
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState<
    "duvida" | "reserva_grupo" | "evento" | "imprensa" | "parceria" | "outro"
  >("duvida");
  const [mensagem, setMensagem] = useState("");
  const [preferContato, setPreferContato] = useState<"email" | "telefone" | "whatsapp">("whatsapp");
  const [aceite, setAceite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | { protocolo: string }>(null);

  const isValid =
    nome.trim().length > 1 &&
    EMAIL_RE.test(email) &&
    PHONE_RE.test(telefone) &&
    mensagem.trim().length >= 10 &&
    aceite;

  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    try {
      // Troque por sua API real
      const payload = {
        nome,
        email,
        telefone,
        assunto,
        preferContato,
        mensagem,
      };
      // await fetch("/api/contato", { method: "POST", body: JSON.stringify(payload) });
      console.log("contato:", payload);
      setOk({ protocolo: "QB-" + Math.random().toString(36).slice(2, 8).toUpperCase() });
    } catch {
      alert("Falha ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section tone="white" className="!pt-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna esquerda: Formulário */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-xl">Envie uma mensagem</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                  <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                  <Select value={assunto} onChange={(e) => setAssunto(e.target.value as any)}>
                    <option value="duvida">Dúvida geral</option>
                    <option value="reserva_grupo">Reserva para grupo (9–16)</option>
                    <option value="evento">Evento / Buyout</option>
                    <option value="imprensa">Imprensa</option>
                    <option value="parceria">Parceria</option>
                    <option value="outro">Outro</option>
                  </Select>
                </div>

                <Textarea
                  placeholder="Como podemos ajudar? Dê detalhes (data/horário, nº de pessoas, necessidades especiais...)"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={6}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button onClick={() => setPreferContato("whatsapp")} className={`h-11 rounded-xl border ${preferContato === "whatsapp" ? "border-black/80" : "border-black/10"}`}>WhatsApp</button>
                  <button onClick={() => setPreferContato("telefone")} className={`h-11 rounded-xl border ${preferContato === "telefone" ? "border-black/80" : "border-black/10"}`}>Telefone</button>
                  <button onClick={() => setPreferContato("email")} className={`h-11 rounded-xl border ${preferContato === "email" ? "border-black/80" : "border-black/10"}`}>E-mail</button>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} />
                  Concordo em ser contatado(a) sobre minha solicitação.
                </label>

                <div className="flex items-center gap-3">
                  <Button onClick={handleSubmit} disabled={!isValid || loading}>
                    {loading ? "Enviando…" : "Enviar mensagem"}
                  </Button>
                  {ok && (
                    <Badge tone="success">Enviado! Protocolo {ok.protocolo}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Canais diretos */}
            <Card>
              <CardContent className="p-6">
                <Heading as="h3" className="text-xl mb-3">Canais diretos</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Link href="https://wa.me/551134567890" target="_blank" className="rounded-xl border border-black/10 p-4 hover:shadow-md transition-all">
                    <Subheading className="text-base mb-1">WhatsApp</Subheading>
                    <Text className="m-0 text-[#707585]">(11) 3456-7890</Text>
                  </Link>
                  <Link href="tel:+551134567890" className="rounded-xl border border-black/10 p-4 hover:shadow-md transition-all">
                    <Subheading className="text-base mb-1">Telefone</Subheading>
                    <Text className="m-0 text-[#707585]">Ligar agora</Text>
                  </Link>
                  <Link href="mailto:contato@quimbistro.com.br" className="rounded-xl border border-black/10 p-4 hover:shadow-md transition-all">
                    <Subheading className="text-base mb-1">E-mail</Subheading>
                    <Text className="m-0 text-[#707585]">contato@quimbistro.com.br</Text>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita: endereço/horários/mapa */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Heading as="h3" className="text-lg">Endereço</Heading>
                <Text className="m-0">Rua dos Pinheiros, 123<br/>Pinheiros, São Paulo - SP<br/>CEP: 05422-001</Text>
                <Divider className="my-2" />
                <Heading as="h4" className="text-base">Horário de funcionamento</Heading>
                <Text className="m-0 text-[#707585]">Segunda: Fechado</Text>
                <Text className="m-0 text-[#707585]">Terça a Domingo: 18h00 - 00h00</Text>
                <div className="pt-3">
                  <Button asChild variant="outline"><Link href="https://maps.google.com/?q=Rua dos Pinheiros, 123, São Paulo" target="_blank">Abrir no Google Maps</Link></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden p-0">
              <div className="h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2!2d-46.6911!3d-23.5629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ2LjQiUyA0NsKwNDEnMjgiVw!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Quim Bistrô"
                />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
