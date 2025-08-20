/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  produtoId: string;
  nome: string;
  quantidade: number;
  precoBase: number; // em R$
  imagem?: string;
  opcoesSelecionadas?: Record<string, string[]>;
  observacoes?: string;
};

type CartState = {
  isOpen: boolean;
  items: CartItem[];
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  updateItemQuantity: (key: string, quantidade: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
};

const itemKey = (it: CartItem) => it.produtoId + JSON.stringify(it.opcoesSelecionadas || {});

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],

      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) =>
        set((s) => {
          const key = itemKey(item);
          const idx = s.items.findIndex((x) => itemKey(x) === key);
          if (idx >= 0) {
            const copy = [...s.items];
            copy[idx] = { ...copy[idx], quantidade: (copy[idx].quantidade || 0) + (item.quantidade || 1) };
            return { items: copy, isOpen: true };
          }
          return { items: [...s.items, { ...item, quantidade: item.quantidade || 1 }], isOpen: true };
        }),

      updateItemQuantity: (key, quantidade) =>
        set((s) => {
          const copy = s.items.map((it) => (itemKey(it) === key ? { ...it, quantidade: Math.max(1, quantidade) } : it));
          return { items: copy };
        }),

      removeItem: (key) => set((s) => ({ items: s.items.filter((it) => itemKey(it) !== key) })),

      clearCart: () => set({ items: [] }),

      getItemCount: () => get().items.reduce((acc, it) => acc + (it.quantidade || 0), 0),
    }),
    {
      name: "quim-cart",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : undefined) as any),
      partialize: (s) => ({ items: s.items }), // não persiste isOpen
    }
  )
);