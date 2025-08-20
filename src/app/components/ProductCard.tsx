"use client";

import { Eye, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "../lib/currency";
import { useCart } from "../store/useCart";
import { Produto } from "../types";

// DS
import {
  Card,
  CardContent,
  Heading,
  Subheading,
  Text,
  Badge,
  Button,
} from "@/ui/design-system";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = () => {
    if (produto.opcoes && produto.opcoes.length > 0) {
      setIsModalOpen(true);
    } else {
      addItem({
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: 1,
        precoBase: produto.precoPromocional || produto.preco,
        imagem: produto.imagem,
      });
    }
  };

  const precoFinal = produto.precoPromocional || produto.preco;

  // Mapeia badges para tons do DS (ajuste conforme sua taxonomia)
  const mapBadgeTone = (b: string) =>
    b.toLowerCase() === "chef"
      ? "brand"
      : b.toLowerCase() === "novo"
      ? "success"
      : b.toLowerCase() === "promo"
      ? "warning"
      : ("success" as const);

  return (
    <>
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-2px]">
        <div className="relative h-48">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover transition-transform duration-500 "
            loading="lazy"
          />

          {produto.badges && produto.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {produto.badges.map((badge) => (
                <Badge key={badge} tone={mapBadgeTone(badge)}>
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                aria-label={`Ver detalhes de ${produto.nome}`}
                className="backdrop-blur bg-white/90 hover:bg-white text-[#14151A] border-white/60"
                title="Ver detalhes"
              >
                <Eye className="w-4 h-4" />
              </Button>

              {produto.disponivelDelivery && (
                <Button
                  size="sm"
                  onClick={handleQuickAdd}
                  aria-label={`Adicionar ${produto.nome} ao carrinho`}
                  title="Adicionar ao carrinho"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <CardContent className="space-y-3 pt-4">
          <Heading as="h3" className="text-xl leading-snug line-clamp-2">
            {produto.nome}
          </Heading>

          {produto.descricaoCurta && (
            <Subheading className="text-sm text-[#707585] line-clamp-3">
              {produto.descricaoCurta}
            </Subheading>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {produto.precoPromocional ? (
                <>
                  <Text className="text-lg font-semibold text-emerald-600 m-0">
                    {formatCurrency(precoFinal)}
                  </Text>
                  <Text className="text-sm text-[#707585] line-through m-0">
                    {formatCurrency(produto.preco)}
                  </Text>
                </>
              ) : (
                <Text className="text-lg font-semibold m-0">
                  {formatCurrency(produto.preco)}
                </Text>
              )}
            </div>

            {!produto.disponivelDelivery && (
              <Badge tone="ink" className="text-xs py-1 px-2">
                Apenas no local
              </Badge>
            )}
          </div>

          {/* Alérgenos */}
          {produto.alergenicos && produto.alergenicos.length > 0 && (
            <Text className="text-xs text-[#707585] m-0">
              Contém: {produto.alergenicos.join(", ")}
            </Text>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <ProductModal
          produto={produto}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
