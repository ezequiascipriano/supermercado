import React, { useState } from 'react';
import { Plus, Search, Eye, Trash2, Filter, ShoppingCart } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { InputField, SelectField } from '../components/FormField';
import { Venda, Cliente, Produto, ItemVenda, FormaPagamento } from '../types';
import { format } from 'date-fns';

// Mock data for demonstration
const mockClientes: Cliente[] = [
  {
    id_cliente: 1,
    nome: 'Ana Silva',
    telefone: '(11) 98765-4321',
    email: 'ana.silva@email.com',
    endereco: 'Rua das Flores, 123, São Paulo - SP',
    dt_inclusao: '2023-01-15T14:30:00',
    dt_alteracao: null,
  },
  {
    id_cliente: 2,
    nome: 'Pedro Santos',
    telefone: '(11) 91234-5678',
    email: 'pedro.santos@email.com',
    endereco: 'Av. Paulista, 1500, São Paulo - SP',
    dt_inclusao: '2023-01-16T10:15:00',
    dt_alteracao: null,
  },
];

const mockProdutos: Produto[] = [
  {
    id_produto: 1,
    nome: 'Arroz Integral',
    descricao: 'Arroz integral tipo 1, pacote de 1kg',
    preco: 7.99,
    quantidade_estoque: 50,
    id_fornecedor: 1,
    dt_inclusao: '2023-01-15T10:30:00',
    dt_alteracao: null,
  },
  {
    id_produto: 2,
    nome: 'Feijão Carioca',
    descricao: 'Feijão carioca tipo 1, pacote de 1kg',
    preco: 8.49,
    quantidade_estoque: 45,
    id_fornecedor: 1,
    dt_inclusao: '2023-01-15T10:35:00',
    dt_alteracao: null,
  },
  {
    id_produto: 3,
    nome: 'Açúcar Refinado',
    descricao: 'Açúcar refinado, pacote de 1kg',
    preco: 4.99,
    quantidade_estoque: 60,
    id_fornecedor: 2,
    dt_inclusao: '2023-01-16T09:20:00',
    dt_alteracao: null,
  },
];

const mockVendas: Venda[] = [
  {
    id_venda: 1,
    id_cliente: 1,
    data_venda: '2023-07-01T10:30:00',
    total: 45.97,
    forma_pagamento: 'Cartão',
    dt_inclusao: '2023-07-01T10:30:00',
    dt_alteracao: null,
    itens: [
      {
        id_item: 1,
        id_venda: 1,
        id_produto: 1,
        quantidade: 2,
        preco_unitario: 7.99,
        subtotal: 15.98,
        dt_inclusao: '2023-07-01T10:30:00',
        dt_alteracao: null,
      },
      {
        id_item: 2,
        id_venda: 1,
        id_produto: 2,
        quantidade: 3,
        preco_unitario: 8.49,
        subtotal: 25.47,
        dt_inclusao: '2023-07-01T10:30:00',
        dt_alteracao: null,
      },
      {
        id_item: 3,
        id_venda: 1,
        id_produto: 3,
        quantidade: 1,
        preco_unitario: 4.99,
        subtotal: 4.99,
        dt_inclusao: '2023-07-01T10:30:00',
        dt_alteracao: null,
      },
    ],
  },
  {
    id_venda: 2,
    id_cliente: 2,
    data_venda: '2023-07-02T14:45:00',
    total: 33.96,
    forma_pagamento: 'Dinheiro',
    dt_inclusao: '2023-07-02T14:45:00',
    dt_alteracao: null,
    itens: [
      {
        id_item: 4,
        id_venda: 2,
        id_produto: 1,
        quantidade: 3,
        preco_unitario: 7.99,
        subtotal: 23.97,
        dt_inclusao: '2023-07-02T14:45:00',
        dt_alteracao: null,
      },
      {
        id_item: 5,
        id_venda: 2,
        id_produto: 3,
        quantidade: 2,
        preco_unitario: 4.99,
        subtotal: 9.98,
        dt_inclusao: '2023-07-02T14:45:00',
        dt_alteracao: null,
      },
    ],
  },
];

const formasPagamento: FormaPagamento[] = ['Dinheiro', 'Cartão', 'PIX', 'Boleto'];

const Vendas: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>(mockVendas);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentVenda, setCurrentVenda] = useState<Partial<Venda>>({});
  const [currentItens, setCurrentItens] = useState<ItemVenda[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<number | ''>('');
  const [quantidade, setQuantidade] = useState<number>(1);

  const filteredVendas = vendas.filter(venda => {
    const cliente = mockClientes.find(c => c.id_cliente === venda.id_cliente);
    const clienteNome = cliente ? cliente.nome.toLowerCase() : '';
    const vendaId = venda.id_venda.toString();
    const searchTermLower = searchTerm.toLowerCase();
    
    return vendaId.includes(searchTerm) || 
           clienteNome.includes(searchTermLower) || 
           venda.forma_pagamento.toLowerCase().includes(searchTermLower);
  });

  const handleOpenModal = () => {
    setCurrentVenda({
      id_cliente: '',
      forma_pagamento: 'Dinheiro',
      total: 0,
    });
    setCurrentItens([]);
    setIsModalOpen(true);
  };

  const handleViewVenda = (venda: Venda) => {
    setCurrentVenda(venda);
    setCurrentItens(venda.itens || []);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setCurrentVenda({});
    setCurrentItens([]);
    setSelectedProduto('');
    setQuantidade(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentVenda(prev => ({
      ...prev,
      [name]: name === 'id_cliente' ? Number(value) : value
    }));
  };

  const handleAddItem = () => {
    if (!selectedProduto || quantidade <= 0) return;
    
    const produto = mockProdutos.find(p => p.id_produto === Number(selectedProduto));
    if (!produto) return;
    
    const subtotal = produto.preco * quantidade;
    
    const newItem: ItemVenda = {
      id_item: Math.max(0, ...currentItens.map(i => i.id_item), 0) + 1,
      id_venda: 0, // Temporary, will be set when the sale is created
      id_produto: produto.id_produto,
      produto: produto,
      quantidade: quantidade,
      preco_unitario: produto.preco,
      subtotal: subtotal,
      dt_inclusao: new Date().toISOString(),
      dt_alteracao: null,
    };
    
    setCurrentItens(prev => [...prev, newItem]);
    setSelectedProduto('');
    setQuantidade(1);
    
    // Update total
    setCurrentVenda(prev => ({
      ...prev,
      total: (prev.total || 0) + subtotal
    }));
  };

  const handleRemoveItem = (id_item: number) => {
    const item = currentItens.find(i => i.id_item === id_item);
    if (!item) return;
    
    setCurrentItens(prev => prev.filter(i => i.id_item !== id_item));
    
    // Update total
    setCurrentVenda(prev => ({
      ...prev,
      total: (prev.total || 0) - item.subtotal
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentVenda.id_cliente || currentItens.length === 0) {
      alert('Por favor, selecione um cliente e adicione pelo menos um item.');
      return;
    }
    
    const newVenda: Venda = {
      ...currentVenda as Venda,
      id_venda: Math.max(0, ...vendas.map(v => v.id_venda)) + 1,
      data_venda: new Date().toISOString(),
      dt_inclusao: new Date().toISOString(),
      dt_alteracao: null,
      itens: currentItens.map(item => ({
        ...item,
        id_venda: Math.max(0, ...vendas.map(v => v.id_venda)) + 1,
      })),
    };
    
    setVendas(prev => [...prev, newVenda]);
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
      setVendas(prev => prev.filter(v => v.id_venda !== id));
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id_venda' },
    { 
      header: 'Cliente', 
      accessor: (venda: Venda) => {
        const cliente = mockClientes.find(c => c.id_cliente === venda.id_cliente);
        return cliente ? cliente.nome : 'Desconhecido';
      }
    },
    { 
      header: 'Data', 
      accessor: (venda: Venda) => format(new Date(venda.data_venda), 'dd/MM/yyyy HH:mm')
    },
    { 
      header: 'Total', 
      accessor: (venda: Venda) => `R$ ${venda.total.toFixed(2)}`
    },
    { header: 'Pagamento', accessor: 'forma_pagamento' },
    {
      header: 'Ações',
      accessor: (venda: Venda) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Eye size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleViewVenda(venda);
            }}
          >
            Ver
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(venda.id_venda);
            }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  const itemColumns = [
    { header: 'Produto', accessor: (item: ItemVenda) => {
      const produto = mockProdutos.find(p => p.id_produto === item.id_produto);
      return produto ? produto.nome : 'Desconhecido';
    }},
    { header: 'Quantidade', accessor: 'quantidade' },
    { header: 'Preço Unit.', accessor: (item: ItemVenda) => `R$ ${item.preco_unitario.toFixed(2)}` },
    { header: 'Subtotal', accessor: (item: ItemVenda) => `R$ ${item.subtotal.toFixed(2)}` },
    {
      header: 'Ações',
      accessor: (item: ItemVenda) => !isViewModalOpen && (
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 size={16} />}
          onClick={() => handleRemoveItem(item.id_item)}
        >
          Remover
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar vendas..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            icon={<Filter size={18} />}
          >
            Filtrar
          </Button>
          <Button
            variant="primary"
            icon={<Plus size={18} />}
            onClick={handleOpenModal}
          >
            Nova Venda
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredVendas}
          keyExtractor={(item) => item.id_venda}
          onRowClick={handleViewVenda}
          emptyMessage="Nenhuma venda encontrada"
        />
      </Card>

      {/* Nova Venda Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Venda"
        size="lg"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={!currentVenda.id_cliente || currentItens.length === 0}
            >
              Finalizar Venda
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SelectField
              label="Cliente"
              name="id_cliente"
              value={currentVenda.id_cliente || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um cliente</option>
              {mockClientes.map(cliente => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nome}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Forma de Pagamento"
              name="forma_pagamento"
              value={currentVenda.forma_pagamento || 'Dinheiro'}
              onChange={handleInputChange}
              required
            >
              {formasPagamento.map(forma => (
                <option key={forma} value={forma}>
                  {forma}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="font-medium text-gray-700 mb-4">Adicionar Itens</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField
                label="Produto"
                name="produto"
                value={selectedProduto}
                onChange={(e) => setSelectedProduto(e.target.value ? Number(e.target.value) : '')}
              >
                <option value="">Selecione um produto</option>
                {mockProdutos.map(produto => (
                  <option key={produto.id_produto} value={produto.id_produto}>
                    {produto.nome} - R$ {produto.preco.toFixed(2)}
                  </option>
                ))}
              </SelectField>
              <InputField
                label="Quantidade"
                name="quantidade"
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
              <div className="flex items-end">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleAddItem}
                  disabled={!selectedProduto || quantidade <= 0}
                  icon={<Plus size={18} />}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-700 mb-4">Itens da Venda</h4>
            <Table
              columns={itemColumns}
              data={currentItens}
              keyExtractor={(item) => item.id_item}
              emptyMessage="Nenhum item adicionado"
            />
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Total: R$ {(currentVenda.total || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </form>
      </Modal>

      {/* Ver Venda Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        title={`Detalhes da Venda #${currentVenda.id_venda}`}
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Informações da Venda</h4>
              <p><span className="font-medium">Data:</span> {currentVenda.data_venda && format(new Date(currentVenda.data_venda), 'dd/MM/yyyy HH:mm')}</p>
              <p><span className="font-medium">Forma de Pagamento:</span> {currentVenda.forma_pagamento}</p>
              <p><span className="font-medium">Total:</span> R$ {(currentVenda.total || 0).toFixed(2)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Informações do Cliente</h4>
              {currentVenda.id_cliente && (() => {
                const cliente = mockClientes.find(c => c.id_cliente === currentVenda.id_cliente);
                return cliente ? (
                  <>
                    <p><span className="font-medium">Nome:</span> {cliente.nome}</p>
                    <p><span className="font-medium">Telefone:</span> {cliente.telefone}</p>
                    <p><span className="font-medium">Email:</span> {cliente.email}</p>
                  </>
                ) : <p>Cliente não encontrado</p>;
              })()}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Itens da Venda</h4>
            <Table
              columns={itemColumns.filter(col => col.header !== 'Ações')}
              data={currentItens}
              keyExtractor={(item) => item.id_item}
              emptyMessage="Nenhum item encontrado"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Vendas;