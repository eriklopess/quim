'use client'


import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartSummary } from '../types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  cupom: string
  cep: string
  retirarNoLocal: boolean
  
  // Actions
  addItem: (item: CartItem) => void
  removeItem: (produtoId: string) => void
  updateQuantity: (produtoId: string, quantidade: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  applyCupom: (code: string) => void
  setCep: (cep: string) => void
  setRetirarNoLocal: (retirar: boolean) => void
  
  // Getters
  getItemCount: () => number
  getCartSummary: () => CartSummary
}

const calculateCartSummary = (
  items: CartItem[], 
  cupom: string, 
  cep: string, 
  retirarNoLocal: boolean
): CartSummary => {
  // Calcular subtotal
  const subtotal = items.reduce((total, item) => {
    let itemPrice = item.precoBase
    
    // Adicionar delta de opções selecionadas
    if (item.opcoesSelecionadas) {
      Object.values(item.opcoesSelecionadas).flat().forEach(opcao => {
        // Aqui você adicionaria a lógica para buscar o delta da opção
        // Por simplicidade, vamos assumir um delta padrão
        itemPrice += 0
      })
    }
    
    return total + (itemPrice * item.quantidade)
  }, 0)

  // Calcular taxa de entrega
  let taxaEntrega = 0
  if (!retirarNoLocal && cep) {
    // Lógica simplificada - em produção, isso viria da API
    const cepNum = parseInt(cep.replace(/\D/g, ''))
    if (cepNum >= 1000000 && cepNum <= 5999999) {
      taxaEntrega = 8.90 // SP Capital
    } else if (cepNum >= 6000000 && cepNum <= 9999999) {
      taxaEntrega = 12.90 // Grande SP
    } else {
      taxaEntrega = 15.90 // Outras regiões
    }
  }

  // Calcular desconto do cupom
  let desconto = 0
  if (cupom) {
    switch (cupom.toUpperCase()) {
      case 'QUIM10':
        desconto = subtotal * 0.1
        break
      case 'PRIMEIRA15':
        desconto = subtotal * 0.15
        break
      case 'FRETE5':
        desconto = Math.min(5, taxaEntrega)
        break
    }
  }

  const total = subtotal + taxaEntrega - desconto

  return {
    subtotal,
    taxaEntrega,
    desconto,
    total
  }
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      cupom: '',
      cep: '',
      retirarNoLocal: false,

      addItem: (item) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          existing => existing.produtoId === item.produtoId &&
          JSON.stringify(existing.opcoesSelecionadas) === JSON.stringify(item.opcoesSelecionadas) &&
          existing.observacoes === item.observacoes
        )

        if (existingItemIndex >= 0) {
          // Item já existe, aumentar quantidade
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantidade += item.quantidade
          set({ items: updatedItems })
        } else {
          // Novo item, adicionar ao carrinho
          set({ items: [...items, item] })
        }
      },

      removeItem: (produtoId) => {
        set({ items: get().items.filter(item => item.produtoId !== produtoId) })
      },

      updateQuantity: (produtoId, quantidade) => {
        if (quantidade <= 0) {
          get().removeItem(produtoId)
          return
        }

        const items = get().items.map(item => 
          item.produtoId === produtoId 
            ? { ...item, quantidade }
            : item
        )
        set({ items })
      },

      clearCart: () => {
        set({ items: [], cupom: '', cep: '' })
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      applyCupom: (code) => set({ cupom: code }),
      setCep: (cep) => set({ cep }),
      setRetirarNoLocal: (retirar) => set({ retirarNoLocal: retirar }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantidade, 0)
      },

      getCartSummary: () => {
        const { items, cupom, cep, retirarNoLocal } = get()
        return calculateCartSummary(items, cupom, cep, retirarNoLocal)
      },
    }),
    {
      name: 'quim-cart-storage',
      partialize: (state) => ({
        items: state.items,
        cupom: state.cupom,
        cep: state.cep,
        retirarNoLocal: state.retirarNoLocal,
      }),
    }
  )
)