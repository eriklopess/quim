import { Produto } from "../types"


// Mock data - em produção viria de uma API
const mockMenu: Produto[] = [
  {
    id: 'rigatoni-ragu-cupim',
    nome: 'Rigatoni ao Ragu de Cupim',
    categoria: 'Principais',
    descricaoCurta: 'Massa artesanal com ragu cozido por 12h.',
    descricao: 'Massa fresca preparada na casa, servida com nosso ragu de cupim cozido lentamente por 12 horas, finalizado com demiglace da casa e grana padano envelhecido.',
    preco: 69.0,
    precoPromocional: null,
    badges: ['Chef'],
    alergenicos: ['glúten', 'lácteos'],
    opcoes: [
      {
        nome: 'Porção',
        tipo: 'single',
        itens: [
          { label: 'Individual', deltaPreco: 0 },
          { label: 'Para 2', deltaPreco: 35 }
        ],
        required: true
      }
    ],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'salmao-grelhado-quinoa',
    nome: 'Salmão Grelhado com Quinoa',
    categoria: 'Principais',
    descricaoCurta: 'Salmão fresco grelhado na brasa com quinoa tricolor.',
    descricao: 'Filé de salmão fresco grelhado na brasa, servido sobre quinoa tricolor com legumes da estação e molho de ervas finas.',
    preco: 78.0,
    precoPromocional: null,
    badges: ['Sem glúten'],
    alergenicos: ['peixe'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'risotto-cogumelos-trufa',
    nome: 'Risotto de Cogumelos com Trufa',
    categoria: 'Massas & Risotos',
    descricaoCurta: 'Risotto cremoso com mix de cogumelos e óleo de trufa.',
    descricao: 'Arroz arbóreo cozido no ponto perfeito com mix de cogumelos frescos, finalizado com óleo de trufa negra e parmesão 24 meses.',
    preco: 65.0,
    precoPromocional: 58.0,
    badges: ['Vegetariano', 'Chef'],
    alergenicos: ['lácteos'],
    opcoes: [
      {
        nome: 'Extras',
        tipo: 'multi',
        itens: [
          { label: 'Cogumelos extras', deltaPreco: 12 },
          { label: 'Trufa fresca', deltaPreco: 25 }
        ]
      }
    ],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'salada-burrata-tomate',
    nome: 'Salada de Burrata com Tomate Confit',
    categoria: 'Entradas',
    descricaoCurta: 'Burrata cremosa com tomates confitados e rúcula.',
    descricao: 'Burrata italiana cremosa servida com tomates cerejas confitados, rúcula selvagem, pesto de manjericão e redução balsâmica.',
    preco: 42.0,
    precoPromocional: null,
    badges: ['Vegetariano', 'Novo'],
    alergenicos: ['lácteos'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'polvo-grelhado-batata',
    nome: 'Polvo Grelhado com Batata Confitada',
    categoria: 'Principais',
    descricaoCurta: 'Polvo macio grelhado com batatas confitadas no azeite.',
    descricao: 'Tentáculos de polvo cozidos até a maciez perfeita, grelhados na brasa e servidos com batatas confitadas no azeite de ervas.',
    preco: 85.0,
    precoPromocional: null,
    badges: ['Chef', 'Sem glúten'],
    alergenicos: ['frutos do mar'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: false
  },
  {
    id: 'gnocchi-ragu-cordeiro',
    nome: 'Gnocchi ao Ragu de Cordeiro',
    categoria: 'Massas & Risotos',
    descricaoCurta: 'Gnocchi artesanal com ragu de cordeiro e tomilho.',
    descricao: 'Gnocchi de batata feito na casa, servido com ragu de cordeiro cozido lentamente com tomilho fresco e vinho tinto.',
    preco: 72.0,
    precoPromocional: null,
    badges: ['Chef'],
    alergenicos: ['glúten', 'lácteos', 'ovos'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'tartare-atum-abacate',
    nome: 'Tartare de Atum com Abacate',
    categoria: 'Entradas',
    descricaoCurta: 'Atum fresco em cubos com abacate e molho ponzu.',
    descricao: 'Cubos de atum fresco temperados com gengibre, servidos com abacate cremoso, molho ponzu e chips de batata doce.',
    preco: 48.0,
    precoPromocional: null,
    badges: ['Sem glúten', 'Novo'],
    alergenicos: ['peixe'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: false
  },
  {
    id: 'brownie-sorvete-baunilha',
    nome: 'Brownie com Sorvete de Baunilha',
    categoria: 'Sobremesas',
    descricaoCurta: 'Brownie quentinho com sorvete artesanal e calda.',
    descricao: 'Brownie de chocolate belga servido quente, acompanhado de sorvete artesanal de baunilha e calda de chocolate amargo.',
    preco: 28.0,
    precoPromocional: null,
    badges: ['Vegetariano'],
    alergenicos: ['glúten', 'lácteos', 'ovos', 'nozes'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'vinho-tinto-reserva',
    nome: 'Vinho Tinto Reserva',
    categoria: 'Bebidas',
    descricaoCurta: 'Vinho tinto encorpado da nossa seleção especial.',
    descricao: 'Vinho tinto encorpado da nossa seleção especial, perfeito para harmonizar com carnes vermelhas.',
    preco: 120.0,
    precoPromocional: null,
    badges: [],
    alergenicos: ['sulfitos'],
    opcoes: [
      {
        nome: 'Tamanho',
        tipo: 'single',
        itens: [
          { label: 'Taça (150ml)', deltaPreco: -90 },
          { label: 'Garrafa (750ml)', deltaPreco: 0 }
        ],
        required: true
      }
    ],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'mousse-chocolate-frutas',
    nome: 'Mousse de Chocolate com Frutas Vermelhas',
    categoria: 'Sobremesas',
    descricaoCurta: 'Mousse cremoso de chocolate 70% com frutas da estação.',
    descricao: 'Mousse aerado de chocolate 70% cacau, servido com mix de frutas vermelhas da estação e crumble de amêndoas.',
    preco: 32.0,
    precoPromocional: null,
    badges: ['Vegetariano'],
    alergenicos: ['lácteos', 'ovos', 'nozes'],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'hamburguer-angus-artesanal',
    nome: 'Hambúrguer Angus Artesanal',
    categoria: 'Principais',
    descricaoCurta: 'Hambúrguer de angus 180g com queijo gruyère e bacon.',
    descricao: 'Hambúrguer artesanal de carne angus 180g, queijo gruyère derretido, bacon crocante, alface orgânica e tomate, servido em pão brioche com batatas rústicas.',
    preco: 52.0,
    precoPromocional: null,
    badges: [],
    alergenicos: ['glúten', 'lácteos', 'ovos'],
    opcoes: [
      {
        nome: 'Ponto da Carne',
        tipo: 'single',
        itens: [
          { label: 'Mal passada', deltaPreco: 0 },
          { label: 'Ao ponto', deltaPreco: 0 },
          { label: 'Bem passada', deltaPreco: 0 }
        ],
        required: true
      },
      {
        nome: 'Extras',
        tipo: 'multi',
        itens: [
          { label: 'Bacon extra', deltaPreco: 8 },
          { label: 'Cebola caramelizada', deltaPreco: 5 },
          { label: 'Cogumelos salteados', deltaPreco: 10 }
        ]
      }
    ],
    imagem: 'https://picsum.photos/1200/630?seed=quim',
    disponivelDelivery: true
  },
  {
    id: 'bowl-acai-granola',
    nome: 'Bowl de Açaí com Granola',
    categoria: 'Sobremesas',
    descricaoCurta: 'Açaí cremoso com granola artesanal e frutas frescas.',
    descricao: 'Bowl de açaí cremoso coberto com granola artesanal, banana, morango, mirtilos e mel orgânico.',
    preco: 24.0,
    precoPromocional: null,
    badges: ['Vegano', 'Sem glúten'],
    alergenicos: ['nozes'],
    imagem: '/imgs/bowl-acai.jpg',
    disponivelDelivery: true
  }
]

export async function getMenu(): Promise<Produto[]> {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockMenu
}

export async function getMenuByCategory(categoria?: string): Promise<Produto[]> {
  const menu = await getMenu()
  if (!categoria) return menu
  return menu.filter(item => item.categoria.toLowerCase() === categoria.toLowerCase())
}

export async function getProductById(id: string): Promise<Produto | null> {
  const menu = await getMenu()
  return menu.find(item => item.id === id) || null
}

export async function searchMenu(query: string): Promise<Produto[]> {
  const menu = await getMenu()
  const searchTerm = query.toLowerCase()
  
  return menu.filter(item => 
    item.nome.toLowerCase().includes(searchTerm) ||
    item.descricaoCurta.toLowerCase().includes(searchTerm) ||
    item.descricao?.toLowerCase().includes(searchTerm) ||
    item.categoria.toLowerCase().includes(searchTerm)
  )
}

export const categories = [
  'Entradas',
  'Principais', 
  'Massas & Risotos',
  'Sobremesas',
  'Bebidas'
]