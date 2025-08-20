'use client'


import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../lib/currency'
import { useCart } from '../store/useCart'
import { Produto } from '../types'
import Badge from './Badge'
import QuantitySelector from './QuantitySelector'

interface ProductModalProps {
  produto: Produto
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ produto, isOpen, onClose }: ProductModalProps) {
  const [quantidade, setQuantidade] = useState(1)
  const [opcoesSelecionadas, setOpcoesSelecionadas] = useState<Record<string, string[]>>({})
  const [observacoes, setObservacoes] = useState('')
  const [precoTotal, setPrecoTotal] = useState(produto.precoPromocional || produto.preco)
  const { addItem } = useCart()

  // Reset quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setQuantidade(1)
      setOpcoesSelecionadas({})
      setObservacoes('')
      setPrecoTotal(produto.precoPromocional || produto.preco)
    }
  }, [isOpen, produto])

  // Calcular preço total quando opções ou quantidade mudam
  useEffect(() => {
    let preco = produto.precoPromocional || produto.preco
    
    // Adicionar deltas das opções selecionadas
    Object.values(opcoesSelecionadas).flat().forEach(opcaoLabel => {
      produto.opcoes?.forEach(grupo => {
        const opcao = grupo.itens.find(item => item.label === opcaoLabel)
        if (opcao) {
          preco += opcao.deltaPreco
        }
      })
    })
    
    setPrecoTotal(preco * quantidade)
  }, [opcoesSelecionadas, quantidade, produto])

  const handleOpcaoChange = (nomeGrupo: string, opcaoLabel: string, isMulti: boolean) => {
    setOpcoesSelecionadas(prev => {
      const newState = { ...prev }
      
      if (isMulti) {
        // Multi-select: toggle
        if (!newState[nomeGrupo]) {
          newState[nomeGrupo] = []
        }
        
        const currentOptions = newState[nomeGrupo]
        if (currentOptions.includes(opcaoLabel)) {
          newState[nomeGrupo] = currentOptions.filter(opt => opt !== opcaoLabel)
        } else {
          newState[nomeGrupo] = [...currentOptions, opcaoLabel]
        }
      } else {
        // Single-select: replace
        newState[nomeGrupo] = [opcaoLabel]
      }
      
      return newState
    })
  }

  const handleAddToCart = () => {
    // Validar opções obrigatórias
    const missingRequired = produto.opcoes?.filter(grupo => 
      grupo.required && (!opcoesSelecionadas[grupo.nome] || opcoesSelecionadas[grupo.nome].length === 0)
    )

    if (missingRequired && missingRequired.length > 0) {
      alert(`Por favor, selecione: ${missingRequired.map(g => g.nome).join(', ')}`)
      return
    }

    addItem({
      produtoId: produto.id,
      nome: produto.nome,
      quantidade,
      precoBase: produto.precoPromocional || produto.preco,
      opcoesSelecionadas: Object.keys(opcoesSelecionadas).length > 0 ? opcoesSelecionadas : undefined,
      observacoes: observacoes.trim() || undefined,
      imagem: produto.imagem,
    })

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-ink/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="relative">
            <div className="relative h-64 rounded-t-2xl overflow-hidden">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                className="object-cover"
              />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 text-ink rounded-full hover:bg-white transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges */}
              {produto.badges && produto.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {produto.badges.map((badge) => (
                    <Badge key={badge} variant={badge}>
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title and description */}
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-ink mb-2">
                {produto.nome}
              </h2>
              <p className="text-ink/70 mb-4">
                {produto.descricao || produto.descricaoCurta}
              </p>
              
              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                {produto.precoPromocional ? (
                  <>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(produto.precoPromocional)}
                    </span>
                    <span className="text-lg text-ink/50 line-through">
                      {formatCurrency(produto.preco)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-ink">
                    {formatCurrency(produto.preco)}
                  </span>
                )}
              </div>

              {/* Allergens */}
              {produto.alergenicos && produto.alergenicos.length > 0 && (
                <p className="text-sm text-ink/60 bg-yellow-50 p-3 rounded-lg">
                  <strong>Contém alérgenos:</strong> {produto.alergenicos.join(', ')}
                </p>
              )}
            </div>

            {/* Options */}
            {produto.opcoes && produto.opcoes.length > 0 && (
              <div className="mb-6 space-y-4">
                {produto.opcoes.map((grupo) => (
                  <div key={grupo.nome} className="border border-ink/10 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-3">
                      {grupo.nome}
                      {grupo.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                    <div className="space-y-2">
                      {grupo.itens.map((opcao) => {
                        const isSelected = opcoesSelecionadas[grupo.nome]?.includes(opcao.label) || false
                        
                        return (
                          <label
                            key={opcao.label}
                            className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-base/50 transition-colors"
                          >
                            <div className="flex items-center">
                              <input
                                type={grupo.tipo === 'multi' ? 'checkbox' : 'radio'}
                                name={grupo.nome}
                                checked={isSelected}
                                onChange={() => handleOpcaoChange(grupo.nome, opcao.label, grupo.tipo === 'multi')}
                                className="mr-3 text-ink focus:ring-ink"
                              />
                              <span className="text-ink">{opcao.label}</span>
                            </div>
                            {opcao.deltaPreco !== 0 && (
                              <span className="text-sm text-ink/60">
                                {opcao.deltaPreco > 0 ? '+' : ''}{formatCurrency(opcao.deltaPreco)}
                              </span>
                            )}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Observações */}
            <div className="mb-6">
              <label htmlFor="observacoes" className="block text-sm font-medium text-ink mb-2">
                Observações (opcional)
              </label>
              <textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex: sem cebola, ponto da carne, etc."
                rows={3}
                className="w-full px-3 py-2 border border-ink/20 rounded-lg focus:border-ink focus:ring-1 focus:ring-ink resize-none"
              />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-ink">Quantidade:</span>
                <QuantitySelector
                  value={quantidade}
                  onChange={setQuantidade}
                  min={1}
                  max={10}
                />
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-ink">
                  Total: {formatCurrency(precoTotal)}
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!produto.disponivelDelivery}
                  className="btn-primary mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {produto.disponivelDelivery ? 'Adicionar ao Carrinho' : 'Apenas no Local'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}