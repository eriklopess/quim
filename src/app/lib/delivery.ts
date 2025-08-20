import { DeliveryInfo } from "../types"


// Faixas de CEP para cálculo de frete
const deliveryZones = [
  {
    name: 'Centro Expandido',
    cepRanges: [
      { start: 1000000, end: 5999999 }, // SP Capital centro
      { start: 8000000, end: 8499999 }, // Zona Oeste
    ],
    taxa: 8.90,
    etaMin: 25,
    etaMax: 40
  },
  {
    name: 'Grande São Paulo',
    cepRanges: [
      { start: 6000000, end: 6999999 }, // Osasco, Carapicuíba
      { start: 7000000, end: 7999999 }, // Guarulhos, Mogi
      { start: 9000000, end: 9999999 }, // ABC
    ],
    taxa: 12.90,
    etaMin: 35,
    etaMax: 55
  },
  {
    name: 'Região Metropolitana',
    cepRanges: [
      { start: 10000000, end: 19999999 }, // Interior próximo
    ],
    taxa: 15.90,
    etaMin: 45,
    etaMax: 70
  }
]

export function calculateDeliveryInfo(cep: string): DeliveryInfo | null {
  // Remove caracteres não numéricos
  const cleanCep = cep.replace(/\D/g, '')
  
  if (cleanCep.length !== 8) {
    return null
  }
  
  const cepNumber = parseInt(cleanCep)
  
  // Encontrar zona de entrega
  for (const zone of deliveryZones) {
    for (const range of zone.cepRanges) {
      if (cepNumber >= range.start && cepNumber <= range.end) {
        return {
          taxa: zone.taxa,
          etaMin: zone.etaMin,
          etaMax: zone.etaMax
        }
      }
    }
  }
  
  // CEP não atendido
  return null
}

export function formatCep(cep: string): string {
  const cleanCep = cep.replace(/\D/g, '')
  if (cleanCep.length === 8) {
    return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`
  }
  return cep
}

export function isValidCep(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, '')
  return cleanCep.length === 8 && /^\d{8}$/.test(cleanCep)
}

export function formatDeliveryTime(etaMin: number, etaMax: number): string {
  if (etaMin === etaMax) {
    return `${etaMin} min`
  }
  return `${etaMin}-${etaMax} min`
}

// Função para buscar CEP via API (mock)
export async function fetchAddressByCep(cep: string): Promise<{
  logradouro: string
  bairro: string
  cidade: string
  uf: string
} | null> {
  const cleanCep = cep.replace(/\D/g, '')
  
  if (!isValidCep(cleanCep)) {
    return null
  }
  
  try {
    // Em produção, usaria ViaCEP ou similar
    // const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    // const data = await response.json()
    
    // Mock de resposta
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      logradouro: 'Rua Exemplo',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      uf: 'SP'
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}