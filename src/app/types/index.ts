export type Badge = "Novo" | "Chef" | "Vegano" | "Sem glúten" | "Sem lactose" | "Picante" | "Vegetariano";

export type OptionItem = {
  label: string;
  deltaPreco: number;
};

export type OptionGroup = {
  nome: string;
  tipo: "single" | "multi";
  itens: OptionItem[];
  required?: boolean;
};

export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  descricaoCurta: string;
  descricao?: string;
  preco: number;
  precoPromocional?: number | null;
  badges?: Badge[];
  alergenicos?: string[];
  opcoes?: OptionGroup[];
  imagem: string;
  disponivelDelivery: boolean;
};

export type CartItem = {
  produtoId: string;
  nome: string;
  quantidade: number;
  precoBase: number;
  opcoesSelecionadas?: Record<string, string[]>;
  observacoes?: string;
  imagem?: string;
};

export type Cupom = {
  code: string;
  tipo: "percent" | "valor";
  valor: number;
  ativo: boolean;
};

export type OrderStatus = "recebido" | "preparo" | "rota" | "entregue";

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  taxaEntrega: number;
  desconto: number;
  total: number;
  cliente: {
    nome: string;
    telefone: string;
    email?: string;
  };
  entrega: {
    retirar: boolean;
    cep?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    instrucoes?: string;
  };
  pagamento: {
    metodo: "pix" | "cartao" | "entrega";
    status: "pendente" | "pago" | "falhou";
  };
  status: OrderStatus;
  createdAt: string;
};

export type DeliveryInfo = {
  taxa: number;
  etaMin: number;
  etaMax: number;
};

export type CartSummary = {
  subtotal: number;
  taxaEntrega: number;
  desconto: number;
  total: number;
};