"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatCurrency } from "../lib/currency";
import { useCart } from "../store/useCart";
import { Produto } from "../types";
import QuantitySelector from "./QuantitySelector";

// Design System
import {
  Card,
  CardContent,
  CardHeader,
  Badge,
  Button,
  Heading,
  Subheading,
  Text,
  Label,
  Textarea,
  Divider,
} from "@/ui/design-system";

interface ProductModalProps {
  produto: Produto;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  produto,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [opcoesSelecionadas, setOpcoesSelecionadas] = useState<
    Record<string, string[]>
  >({});
  const [observacoes, setObservacoes] = useState("");
  const [precoTotal, setPrecoTotal] = useState(
    produto.precoPromocional || produto.preco
  );
  const { addItem } = useCart();

  // Reset quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setQuantidade(1);
      setOpcoesSelecionadas({});
      setObservacoes("");
      setPrecoTotal(produto.precoPromocional || produto.preco);
    }
  }, [isOpen, produto]);

  // Calcular preço total quando opções ou quantidade mudam
  useEffect(() => {
    let preco = produto.precoPromocional || produto.preco;

    Object.values(opcoesSelecionadas)
      .flat()
      .forEach((opcaoLabel) => {
        produto.opcoes?.forEach((grupo) => {
          const opcao = grupo.itens.find((item) => item.label === opcaoLabel);
          if (opcao) preco += opcao.deltaPreco;
        });
      });

    setPrecoTotal(preco * quantidade);
  }, [opcoesSelecionadas, quantidade, produto]);

  const handleOpcaoChange = (
    nomeGrupo: string,
    opcaoLabel: string,
    isMulti: boolean
  ) => {
    setOpcoesSelecionadas((prev) => {
      const next = { ...prev };
      if (isMulti) {
        const list = new Set(next[nomeGrupo] ?? []);
        if (list.has(opcaoLabel)) {
          list.delete(opcaoLabel);
        } else {
          list.add(opcaoLabel);
        }
        next[nomeGrupo] = Array.from(list);
      } else {
        next[nomeGrupo] = [opcaoLabel];
      }
      return next;
    });
  };

  const handleAddToCart = () => {
    const missingRequired = produto.opcoes?.filter(
      (g) =>
        g.required &&
        (!opcoesSelecionadas[g.nome] || opcoesSelecionadas[g.nome].length === 0)
    );

    if (missingRequired && missingRequired.length > 0) {
      alert(
        `Por favor, selecione: ${missingRequired.map((g) => g.nome).join(", ")}`
      );
      return;
    }

    addItem({
      produtoId: produto.id,
      nome: produto.nome,
      quantidade,
      precoBase: produto.precoPromocional || produto.preco,
      opcoesSelecionadas:
        Object.keys(opcoesSelecionadas).length > 0
          ? opcoesSelecionadas
          : undefined,
      observacoes: observacoes.trim() || undefined,
      imagem: produto.imagem,
    });

    onClose();
  };

  if (!isOpen) return null;

  // (Opcional) mapear badges para tons do DS
  const mapBadgeTone = (b: string) =>
    b.toLowerCase() === "chef"
      ? "brand"
      : b.toLowerCase() === "novo"
      ? "success"
      : b.toLowerCase() === "promo"
      ? "warning"
      : ("ink" as const);

  return (
    <div
      className="fixed z-50 min-h-screen flex items-center justify-center p-4"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex max-h-8/12 items-center justify-center p-4 m-auto">
        <Card className="relative w-full max-w-2xl overflow-hidden p-0">
          {/* Header visual com imagem */}
          <div className="relative h-64">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              fill
              className="object-cover"
              priority
            />

            {/* Botão fechar */}
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 rounded-full bg-white/90 text-[#14151A] border-white/60 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Badges */}
            {produto.badges && produto.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {produto.badges.map((badge) => (
                  <Badge key={badge} tone={mapBadgeTone(badge)}>
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <CardHeader className="px-6 pt-6 pb-2">
            <Heading as="h2" className="text-2xl mb-1">
              {produto.nome}
            </Heading>
            {(produto.descricao || produto.descricaoCurta) && (
              <Subheading className="text-[#707585]">
                {produto.descricao || produto.descricaoCurta}
              </Subheading>
            )}
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {/* Preço + alérgenos */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                {produto.precoPromocional ? (
                  <>
                    <Text className="text-2xl font-semibold text-emerald-600 m-0">
                      {formatCurrency(produto.precoPromocional)}
                    </Text>
                    <Text className="text-lg text-[#707585] line-through m-0">
                      {formatCurrency(produto.preco)}
                    </Text>
                  </>
                ) : (
                  <Text className="text-2xl font-semibold m-0">
                    {formatCurrency(produto.preco)}
                  </Text>
                )}
              </div>

              {produto.alergenicos && produto.alergenicos.length > 0 && (
                <Text className="text-sm text-[#7a6a16] bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 mt-3">
                  <strong>Contém alérgenos:</strong>{" "}
                  {produto.alergenicos.join(", ")}
                </Text>
              )}
            </div>

            {/* Opções */}
            {produto.opcoes && produto.opcoes.length > 0 && (
              <div className="mb-6 space-y-4">
                {produto.opcoes.map((grupo) => (
                  <div
                    key={grupo.nome}
                    className="border border-black/10 rounded-xl p-4"
                  >
                    <Text className="font-semibold text-[#14151A] mb-3">
                      {grupo.nome}
                      {grupo.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Text>
                    <div className="space-y-2">
                      {grupo.itens.map((opcao) => {
                        const isSelected =
                          opcoesSelecionadas[grupo.nome]?.includes(
                            opcao.label
                          ) || false;

                        return (
                          <label
                            key={opcao.label}
                            className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-black/[0.04] transition-colors"
                          >
                            <div className="flex items-center">
                              <input
                                type={
                                  grupo.tipo === "multi" ? "checkbox" : "radio"
                                }
                                name={grupo.nome}
                                checked={isSelected}
                                onChange={() =>
                                  handleOpcaoChange(
                                    grupo.nome,
                                    opcao.label,
                                    grupo.tipo === "multi"
                                  )
                                }
                                className="mr-3 accent-[#14151A]"
                              />
                              <span className="text-[#14151A]">
                                {opcao.label}
                              </span>
                            </div>
                            {opcao.deltaPreco !== 0 && (
                              <span className="text-sm text-[#707585]">
                                {opcao.deltaPreco > 0 ? "+" : ""}
                                {formatCurrency(opcao.deltaPreco)}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Observações */}
            <div className="mb-6">
              <Label htmlFor="observacoes">Observações (opcional)</Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex: sem cebola, ponto da carne, etc."
                rows={3}
              />
            </div>

            <Divider className="my-4" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Text className="text-sm font-medium m-0">Quantidade:</Text>
                <QuantitySelector
                  value={quantidade}
                  onChange={setQuantidade}
                  min={1}
                  max={10}
                />
              </div>

              <div className="w-full sm:w-auto text-right">
                <Text className="text-lg font-bold m-0">
                  Total: {formatCurrency(precoTotal)}
                </Text>
                <div className="mt-2 flex gap-2 justify-end">
                  <Button variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!produto.disponivelDelivery}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    title={
                      produto.disponivelDelivery
                        ? "Adicionar ao carrinho"
                        : "Indisponível para delivery"
                    }
                    aria-disabled={!produto.disponivelDelivery}
                  >
                    {produto.disponivelDelivery
                      ? "Adicionar ao Carrinho"
                      : "Apenas no Local"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
