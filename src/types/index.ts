export interface Fornecedor {
  id_fornecedor: number;
  nome: string;
  contato: string;
  telefone: string;
  email: string;
  endereco: string;
  dt_inclusao: string;
  dt_alteracao: string | null;
}

export interface Produto {
  id_produto: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  id_fornecedor: number;
  fornecedor?: Fornecedor;
  dt_inclusao: string;
  dt_alteracao: string | null;
}

export interface Cliente {
  id_cliente: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  dt_inclusao: string;
  dt_alteracao: string | null;
}

export type FormaPagamento = 'Dinheiro' | 'Cartão' | 'PIX' | 'Boleto';

export interface Venda {
  id_venda: number;
  id_cliente: number;
  cliente?: Cliente;
  data_venda: string;
  total: number;
  forma_pagamento: FormaPagamento;
  itens?: ItemVenda[];
  dt_inclusao: string;
  dt_alteracao: string | null;
}

export interface ItemVenda {
  id_item: number;
  id_venda: number;
  id_produto: number;
  produto?: Produto;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
  dt_inclusao: string;
  dt_alteracao: string | null;
}

export interface Faturamento {
  id_faturamento: number;
  data: string;
  total_vendas: number;
  total_recebido: number;
  dt_inclusao: string;
  dt_alteracao: string | null;
}