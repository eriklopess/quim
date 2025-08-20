/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Section,
  Chip,
  Input,
  Button,
  GridAuto,
  Card,
  Heading,
  Subheading,
  Text,
  Divider,
} from "@/ui/design-system";
import ProductCard from "@/app/components/ProductCard"; // ajuste caminho
import type { Produto } from "@/app/types"; // ajuste caminho

interface Props {
  produtos: Produto[];
}

// util de normalização
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export default function CardapioClient({ produtos }: Props) {
  // filtros de UI
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [marcas, setMarcas] = useState<string[]>([]); // ex.: ["Chef", "Promo", "Veg"]
  const [sort, setSort] = useState<"popular" | "preco_asc" | "preco_desc">(
    "popular"
  );
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);

  // categorias a partir dos dados
  const categorias = useMemo(() => {
    const set = new Set<string>();
    produtos.forEach((p) => p.categoria && set.add(p.categoria));
    return Array.from(set).sort();
  }, [produtos]);

  // marcas (badges) sugeridas
  const badgeUniverse = useMemo(() => {
    const set = new Set<string>();
    produtos.forEach((p) => p.badges?.forEach((b) => set.add(b)));
    return Array.from(set).sort();
  }, [produtos]);

  // debounce da busca
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q), 250);
    return () => clearTimeout(id);
  }, [q]);

  // dados filtrados
  const filtered = useMemo(() => {
    const nq = norm(debouncedQ);
    return produtos
      .filter((p) => {
        const matchQ = nq
          ? norm(p.nome).includes(nq) ||
            norm(p.descricao || p.descricaoCurta || "").includes(nq)
          : true;
        const matchCat = categoria ? p.categoria === categoria : true;
        const matchBadge =
          marcas.length > 0 ? marcas.every((m) => p.badges?.includes(m as any)) : true;
        const price = p.precoPromocional ?? p.preco;
        const matchMin = priceMin !== undefined ? price >= priceMin : true;
        const matchMax = priceMax !== undefined ? price <= priceMax : true;
        return matchQ && matchCat && matchBadge && matchMin && matchMax;
      })
      .sort((a, b) => {
        const pa = a.precoPromocional ?? a.preco;
        const pb = b.precoPromocional ?? b.preco;
        if (sort === "preco_asc") return pa - pb;
        if (sort === "preco_desc") return pb - pa;
        // popular (fallback): badge "Chef" primeiro, depois por preço asc
        const ac = a.badges?.includes("Chef") ? -1 : 0;
        const bc = b.badges?.includes("Chef") ? -1 : 0;
        if (ac !== bc) return ac - bc;
        return pa - pb;
      });
  }, [produtos, debouncedQ, categoria, marcas, sort, priceMin, priceMax]);

  // paginate simples (client-side)
  const PAGE = 12;
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE));
  const items = filtered.slice(0, page * PAGE);
  const canLoadMore = page < pageCount;

  // reset paginação quando filtros mudam
  useEffect(
    () => setPage(1),
    [debouncedQ, categoria, marcas, sort, priceMin, priceMax]
  );

  return (
    <Section tone="white" className="!pt-8">
      <Container>
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-y border-black/5 p-4">
          <div className="flex-1 w-full basis-full">
            <Input
              placeholder="Buscar prato ou ingrediente..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              <Chip selected={!categoria} onClick={() => setCategoria(null)}>
                Todas
              </Chip>
              {categorias.map((c) => (
                <Chip
                  key={c}
                  selected={categoria === c}
                  onClick={() => setCategoria(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Text className="m-0 text-sm">Ordenar:</Text>
              <select
                className="h-11 rounded-xl border border-black/10 bg-white px-4 text-[15px]"
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
              >
                <option value="popular">Mais populares</option>
                <option value="preco_asc">Preço: menor → maior</option>
                <option value="preco_desc">Preço: maior → menor</option>
              </select>
            </div>
          </div>

          {/* tags/badges + preço */}
          <div className="py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              {badgeUniverse.map((b) => {
                const on = marcas.includes(b);
                return (
                  <Chip
                    key={b}
                    selected={on}
                    onClick={() =>
                      setMarcas((prev) =>
                        on ? prev.filter((x) => x !== b) : [...prev, b]
                      )
                    }
                  >
                    {b}
                  </Chip>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Text className="m-0 text-sm">Preço:</Text>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="mín"
                className="w-24"
                value={priceMin ?? ""}
                onChange={(e) =>
                  setPriceMin(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                min={0}
              />
              <Divider className="w-2" />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="máx"
                className="w-24"
                value={priceMax ?? ""}
                onChange={(e) =>
                  setPriceMax(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="mt-8">
          {items.length === 0 ? (
            <Card className="p-8 text-center">
              <Heading as="h3" className="mb-2">
                Nada encontrado
              </Heading>
              <Subheading>
                Tente remover alguns filtros ou buscar por outro termo.
              </Subheading>
              <div className="mt-6">
                <Button
                  onClick={() => {
                    setQ("");
                    setCategoria(null);
                    setMarcas([]);
                    setPriceMin(undefined);
                    setPriceMax(undefined);
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </Card>
          ) : (
            <>
              <GridAuto>
                {items.map((p) => (
                  <ProductCard key={p.id} produto={p} />
                ))}
              </GridAuto>

              {canLoadMore && (
                <div className="mt-10 flex justify-center">
                  <Button onClick={() => setPage((v) => v + 1)}>
                    Carregar mais
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
