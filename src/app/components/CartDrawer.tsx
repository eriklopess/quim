// ================================
// app/components/CartDrawer.tsx
// ================================
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button, Heading, Text, Divider, IconButton } from "@/ui/design-system";
import { formatCurrency } from "@/app/lib/currency";
import { useCart } from "@/app/store/useCart";
import QuantitySelector from "@/app/components/QuantitySelector";

function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lock]);
}

export default function CartDrawer() {
  const {
    isOpen,
    toggleCart,
    closeCart,
    items,
    updateItemQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const panelRef = useRef<HTMLDivElement | null>(null);
  useLockBodyScroll(isOpen);

  const subtotal = items.reduce((acc, it) => acc + (it.precoBase || 0) * (it.quantidade || 0), 0);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeCart();
  };

  return (
    <div aria-hidden={!isOpen} className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onOverlayClick}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl
        transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <div className="inline-flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <Heading as="h2" className="text-xl">Seu carrinho</Heading>
          </div>
          <IconButton aria-label="Fechar carrinho" onClick={closeCart}>
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full grid place-content-center text-center">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-black/40" />
              <Heading as="h3" className="text-lg mb-1">Seu carrinho está vazio</Heading>
              <Text className="text-[#707585] m-0">Explore o cardápio e adicione seus favoritos.</Text>
              <div className="mt-6">
                <Button asChild onClick={closeCart}>
                  <Link href="/cardapio">Ver cardápio</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it, idx) => {
                const key = it.produtoId + JSON.stringify(it.opcoesSelecionadas || {});
                return (
                  <li key={key} className="flex items-start gap-3 border border-black/5 rounded-xl p-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-black/5">
                      {it.imagem ? (
                        <Image src={it.imagem} alt={it.nome} fill className="object-cover" />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Heading as="h4" className="text-base mb-1 line-clamp-2">{it.nome}</Heading>
                      {it.opcoesSelecionadas && (
                        <Text className="text-sm text-[#707585] m-0 line-clamp-2">
                          {Object.entries(it.opcoesSelecionadas)
                            .map(([g, vals]) => `${g}: ${(vals as string[]).join(", ")}`)
                            .join(" • ")}
                        </Text>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <QuantitySelector
                            value={it.quantidade}
                            min={1}
                            max={10}
                            onChange={(q) => updateItemQuantity(key, q)}
                          />
                          <Text className="m-0 text-[#707585]">x {formatCurrency(it.precoBase)}</Text>
                        </div>

                        <Text className="m-0 font-semibold">{formatCurrency((it.precoBase || 0) * (it.quantidade || 0))}</Text>
                      </div>
                    </div>

                    <IconButton aria-label="Remover item" onClick={() => removeItem(key)}>
                      <Trash2 className="w-4 h-4" />
                    </IconButton>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-black/10 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Text className="m-0 text-[#707585]">Subtotal</Text>
            <Heading as="p" className="text-lg">{formatCurrency(subtotal)}</Heading>
          </div>
          <Text className="text-sm text-[#707585] m-0">Taxas e entrega são calculadas no checkout.</Text>

          <div className="flex gap-2 pt-1">
            <Button asChild className="flex-1" onClick={closeCart}>
              <Link href="/delivery" className="inline-flex items-center justify-center gap-2">
                Finalizar pedido <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" onClick={clearCart}>Limpar</Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
