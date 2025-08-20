'use client'


import { Eye, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { formatCurrency } from '../lib/currency'
import { useCart } from '../store/useCart'
import { Produto } from '../types'
import Badge from './Badge'
import ProductModal from './ProductModal'

interface ProductCardProps {
  produto: Produto
}

export default function ProductCard({ produto }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addItem } = useCart()

  const handleQuickAdd = () => {
    if (produto.opcoes && produto.opcoes.length > 0) {
      // Se tem opções, abrir modal
      setIsModalOpen(true)
    } else {
      // Adicionar diretamente ao carrinho
      addItem({
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: 1,
        precoBase: produto.precoPromocional || produto.preco,
        imagem: produto.imagem,
      })
    }
  }

  const precoFinal = produto.precoPromocional || produto.preco

  return (
    <>
      <div className="card group cursor-pointer transition-all duration-300 hover:scale-105">
        {/* Image */}
        <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges overlay */}
          {produto.badges && produto.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {produto.badges.map((badge) => (
                <Badge key={badge} variant={badge}>
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Action buttons overlay */}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-secondary bg-white/90 text-ink hover:bg-white"
                aria-label={`Ver detalhes de ${produto.nome}`}
              >
                <Eye className="w-4 h-4" />
              </button>
              {produto.disponivelDelivery && (
                <button
                  onClick={handleQuickAdd}
                  className="btn-primary bg-ink/90 text-base hover:bg-ink"
                  aria-label={`Adicionar ${produto.nome} ao carrinho`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-ink line-clamp-2">
            {produto.nome}
          </h3>
          
          <p className="text-ink/70 text-sm line-clamp-3">
            {produto.descricaoCurta}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {produto.precoPromocional ? (
                <>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(produto.precoPromocional)}
                  </span>
                  <span className="text-sm text-ink/50 line-through">
                    {formatCurrency(produto.preco)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-ink">
                  {formatCurrency(produto.preco)}
                </span>
              )}
            </div>

            {!produto.disponivelDelivery && (
              <span className="text-xs text-ink/50 bg-ink/10 px-2 py-1 rounded">
                Apenas no local
              </span>
            )}
          </div>

          {/* Allergens */}
          {produto.alergenicos && produto.alergenicos.length > 0 && (
            <p className="text-xs text-ink/50">
              Contém: {produto.alergenicos.join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          produto={produto}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}