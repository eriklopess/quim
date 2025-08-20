"use client";

import { useEffect, useMemo, useState } from "react";
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
  Chip,
  Badge,
} from "@/ui/design-system";


function todayLocalISO() {
  const d = new Date();
  const tzOffset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - tzOffset * 60000);
  return local.toISOString().slice(0, 10);
}

function generateSlots() {
  const slots: string[] = [];
  for (let h = 18; h <= 23; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

// Regras simples de disponibilidade (exemplo):
// - Máx 8 pessoas por mesa.
// - Bloqueia 20:00 e 21:00 para mostrar indisponibilidade.
// - Datas passadas indisponíveis.
function checkAvailability(date: string, time: string, people: number) {
  if (!date || !time || !people) return false;
  const maxParty = 8;
  if (people > maxParty) return false;
  if (["20:00", "21:00"].includes(time)) return false;
  const now = new Date();
  const chosen = new Date(`${date}T${time}:00`);
  if (chosen < now) return false;
  return true;
}

export default function ReservasClient() {
  // Form state
  const [quando, setQuando] = useState<string>(todayLocalISO());
  const [horario, setHorario] = useState<string>("");
  const [pessoas, setPessoas] = useState<number>(2);
  const [ambiente, setAmbiente] = useState<"salao" | "varanda">("salao");
  const [ocasião, setOcasião] = useState<"nenhuma" | "aniversario" | "romantico" | "negocios">("nenhuma");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [aceitePolitica, setAceitePolitica] = useState(false);

  const slots = useMemo(generateSlots, []);

  // Disponibilidade do slot atual
  const available = useMemo(() => checkAvailability(quando, horario, pessoas), [quando, horario, pessoas]);

  useEffect(() => {
    if (!horario) return;
    if (available) return;
    const idx = slots.indexOf(horario);
    for (let i = idx + 1; i < slots.length; i++) {
      if (checkAvailability(quando, slots[i], pessoas)) {
        setHorario(slots[i]);
        break;
      }
    }
  }, [available, horario, pessoas, quando, slots]);

  const canSubmit =
    nome.trim().length > 1 &&
    telefone.trim().length >= 8 &&
    quando && horario && pessoas > 0 &&
    aceitePolitica && available;

  const handleFindTable = () => {
    if (!quando) setQuando(todayLocalISO());
    if (!horario) setHorario(slots[0]);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    // const payload = {
    //   quando,
    //   horario,
    //   pessoas,
    //   ambiente,
    //   ocasiao: ocasião,
    //   cliente: { nome, telefone, email },
    //   observacoes,
    // };
    // Troque por sua API real
    // await fetch("/api/reservas", { method: "POST", body: JSON.stringify(payload) })
    alert("Reserva solicitada! Confira o console para ver o payload.");
  };

  return (
    <Section tone="white" className="!pt-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Buscar mesa */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-xl">Encontre uma mesa</Heading>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <Input type="date" min={todayLocalISO()} value={quando} onChange={(e) => setQuando(e.target.value)} />
                  </div>
                  <div className="md:col-span-1">
                    <Select value={horario} onChange={(e) => setHorario(e.target.value)}>
                      <option value="">Horário</option>
                      {slots.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="md:col-span-1">
                    <Select value={String(pessoas)} onChange={(e) => setPessoas(Number(e.target.value))}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} pessoa{i+1>1?"s":""}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Chip selected={ambiente === "salao"} onClick={() => setAmbiente("salao")}>Salão interno</Chip>
                  <Chip selected={ambiente === "varanda"} onClick={() => setAmbiente("varanda")}>Varanda externa</Chip>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Chip selected={ocasião === "nenhuma"} onClick={() => setOcasião("nenhuma")}>Sem ocasião</Chip>
                  <Chip selected={ocasião === "aniversario"} onClick={() => setOcasião("aniversario")}>Aniversário</Chip>
                  <Chip selected={ocasião === "romantico"} onClick={() => setOcasião("romantico")}>Jantar romântico</Chip>
                  <Chip selected={ocasião === "negocios"} onClick={() => setOcasião("negocios")}>Reunião de negócios</Chip>
                </div>

                <div className="flex items-center gap-3">
                  {available ? (
                    <Badge tone="success">Horário disponível</Badge>
                  ) : (
                    <Badge tone="warning">Selecione um horário disponível</Badge>
                  )}
                  <Button variant="outline" onClick={handleFindTable}>Sugerir horário</Button>
                </div>
              </CardContent>
            </Card>

            {/* Dados do cliente */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-xl">Seus dados</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                  <Input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                  <Input type="email" placeholder="E-mail (opcional)" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Textarea placeholder="Observações (alergias, preferências, cadeirão infantil...)" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={aceitePolitica} onChange={(e) => setAceitePolitica(e.target.checked)} />
                  Li e aceito a política de cancelamento (até 2h antes, sem custos).
                </label>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de confirmação */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Heading as="h3" className="text-lg">Resumo</Heading>
                <div className="space-y-1">
                  <div className="flex justify-between"><Text className="m-0 text-[#707585]">Data</Text><Text className="m-0">{quando || "—"}</Text></div>
                  <div className="flex justify-between"><Text className="m-0 text-[#707585]">Horário</Text><Text className="m-0">{horario || "—"}</Text></div>
                  <div className="flex justify-between"><Text className="m-0 text-[#707585]">Pessoas</Text><Text className="m-0">{pessoas}</Text></div>
                  <div className="flex justify-between"><Text className="m-0 text-[#707585]">Ambiente</Text><Text className="m-0">{ambiente === "salao" ? "Salão interno" : "Varanda externa"}</Text></div>
                  {ocasião !== "nenhuma" && (
                    <div className="flex justify-between"><Text className="m-0 text-[#707585]">Ocasião</Text><Text className="m-0">{ocasião}</Text></div>
                  )}
                </div>

                <Divider className="my-2" />
                <Subheading className="text-base">Sem taxa de reserva</Subheading>
                <Text className="text-sm text-[#707585] m-0">Chegue até 15 minutos após o horário reservado. Após esse período, a mesa poderá ser liberada.</Text>

                <Button className="w-full mt-2" onClick={handleSubmit} disabled={!canSubmit}>
                  Confirmar reserva
                </Button>
                {!available && (
                  <Text className="text-sm text-[#707585] m-0">O horário selecionado está indisponível. Tente outro.</Text>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
