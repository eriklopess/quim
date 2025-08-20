import { Cupom } from "../types"


// Mock de cupons - em produção viria de uma API
const mockCoupons: Cupom[] = [
  {
    code: 'QUIM10',
    tipo: 'percent',
    valor: 10,
    ativo: true
  },
  {
    code: 'PRIMEIRA15',
    tipo: 'percent',
    valor: 15,
    ativo: true
  },
  {
    code: 'FRETE5',
    tipo: 'valor',
    valor: 5,
    ativo: true
  },
  {
    code: 'BEMVINDO20',
    tipo: 'percent',
    valor: 20,
    ativo: true
  },
  {
    code: 'DESCONTO25',
    tipo: 'valor',
    valor: 25,
    ativo: true
  },
  {
    code: 'WEEKEND10',
    tipo: 'percent',
    valor: 10,
    ativo: false // Inativo como exemplo
  }
]

export function validateCoupon(code: string): Cupom | null {
  const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.toUpperCase())
  
  if (!coupon || !coupon.ativo) {
    return null
  }
  
  return coupon
}

export function calculateDiscount(coupon: Cupom, subtotal: number, taxaEntrega: number = 0): number {
  if (!coupon.ativo) {
    return 0
  }
  
  if (coupon.tipo === 'percent') {
    // Porcentagem sobre o subtotal
    return Math.round((subtotal * coupon.valor / 100) * 100) / 100
  } else {
    // Valor fixo - pode ser aplicado no frete ou no total
    if (coupon.code === 'FRETE5') {
      // Cupom específico para frete
      return Math.min(coupon.valor, taxaEntrega)
    }
    return coupon.valor
  }
}

export function formatCouponDescription(coupon: Cupom): string {
  if (coupon.tipo === 'percent') {
    return `${coupon.valor}% de desconto`
  } else {
    return `R$ ${coupon.valor.toFixed(2)} de desconto`
  }
}

// Função para listar cupons disponíveis (para admin ou testes)
export function getAvailableCoupons(): Cupom[] {
  return mockCoupons.filter(c => c.ativo)
}

// Função para verificar se um cupom pode ser aplicado em uma data específica
export function isCouponValidForDate(coupon: Cupom, date: Date = new Date()): boolean {
  // Exemplo: WEEKEND10 só funciona aos fins de semana
  if (coupon.code === 'WEEKEND10') {
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // Domingo ou Sábado
  }
  
  return true
}

// Função para aplicar regras de negócio específicas
export function canApplyCoupon(code: string, subtotal: number, isFirstOrder: boolean = false): {
  valid: boolean
  message?: string
  coupon?: Cupom
} {
  const coupon = validateCoupon(code)
  
  if (!coupon) {
    return {
      valid: false,
      message: 'Cupom inválido ou expirado'
    }
  }
  
  // Regra: PRIMEIRA15 só para primeira compra
  if (coupon.code === 'PRIMEIRA15' && !isFirstOrder) {
    return {
      valid: false,
      message: 'Este cupom é válido apenas para primeira compra'
    }
  }
  
  // Regra: valor mínimo do pedido
  const minOrder = getMinOrderForCoupon(coupon)
  if (subtotal < minOrder) {
    return {
      valid: false,
      message: `Pedido mínimo de R$ ${minOrder.toFixed(2)} para usar este cupom`
    }
  }
  
  // Verificar se é válido para a data atual
  if (!isCouponValidForDate(coupon)) {
    return {
      valid: false,
      message: 'Cupom não válido para esta data'
    }
  }
  
  return {
    valid: true,
    coupon
  }
}

function getMinOrderForCoupon(coupon: Cupom): number {
  // Definir valores mínimos por cupom
  const minOrders: Record<string, number> = {
    'QUIM10': 50,
    'PRIMEIRA15': 30,
    'FRETE5': 0,
    'BEMVINDO20': 80,
    'DESCONTO25': 60,
    'WEEKEND10': 40
  }
  
  return minOrders[coupon.code] || 0
}