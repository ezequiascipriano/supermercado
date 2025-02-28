import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { InputField, TextareaField, SelectField } from '../components/FormField';
import { Produto } from '../types';

// Mock data for demonstration
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
  {
    id_produto: 4,
    nome: 'Café Torrado',
    descricao: 'Café torrado e moído, pacote de 500g',
    preco: 12.99,
    quantidade_estoque: 30,
    id_fornecedor: 2,
    dt_inclusao: '2023-01-16T09:25:00',
    dt_alteracao: null,
  },
  {
    id_produto: 5,
    nome: 'Óleo de Soja',
    descricao: 'Óleo de soja refinado, garrafa de 900ml',
    preco: 9.99,
    quantidade_estoque: 40,
    id_fornecedor: 3,
    dt_inclusao: '2023-01-17T11:10:00',
    dt_alteracao: null,
  },
];

// Mock fornecedores for the form
const mockFornecedores = [
  { id_fornecedor: 1, nome: 'Distribuidora Alimentos ABC' },
  { id_fornecedor: 2, nome: 'Fornecedora Nacional de Grãos' },
  { id_fornecedor: 3, nome: 'Indústria de Alimentos XYZ' },
];

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduto, setCurrentProduto] = useState<Partial<Produto>>({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (produto?: Produto) => {
    if (produto) {
      setCurrentProduto(produto);
      setIsEditing(true);
    } else {
      setCurrentProduto({});
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduto({});
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduto(prev => ({
      ...prev,
      [name]: name === 'preco' || name === 'quantidade_estoque' || name === 'id_fornecedor'
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setProdutos(prev =>
        prev.map(p => (p.id_produto === currentProduto.id_produto ? { ...p, ...currentProduto } as Produto : p))
      );
    } else {
      const newProduto: Produto = {
        ...currentProduto as Produto,
        id_produto: Math.max(0, ...produtos.map(p => p.id_produto)) + 1,
        dt_inclusao: new Date().toISOString(),
        dt_alteracao: null
      };
      setProdutos(prev => [...prev, newProduto]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => prev.filter(p => p.id_produto !== id));
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id_produto' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Preço', accessor: (produto: Produto) => `R$ ${produto.preco.toFixed(2)}` },
    { header: 'Estoque', accessor: 'quantidade_estoque' },
    { header: 'Fornecedor', accessor: (produto: Produto) => {
      const fornecedor = mockFornecedores.find(f => f.id_fornecedor === produto.id_fornecedor);
      return fornecedor ? fornecedor.nome : 'Desconhecido';
    }},
    {
      header: 'Ações',
      accessor: (produto: Produto) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Edit size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(produto);
            }}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(produto.id_produto);
            }}
          >
            Excluir
          </Button>
        </div>
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
            placeholder="Buscar produtos..."
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
            onClick={() => handleOpenModal()}
          >
            Novo Produto
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredProdutos}
          keyExtractor={(item) => item.id_produto}
          onRowClick={(produto) => handleOpenModal(produto)}
          emptyMessage="Nenhum produto encontrado"
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? 'Editar Produto' : 'Novo Produto'}
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Nome"
            name="nome"
            value={currentProduto.nome || ''}
            onChange={handleInputChange}
            required
          />
          <TextareaField
            label="Descrição"
            name="descricao"
            value={currentProduto.descricao || ''}
            onChange={handleInputChange}
            rows={3}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Preço"
              name="preco"
              type="number"
              step="0.01"
              min="0"
              value={currentProduto.preco || ''}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Quantidade em Estoque"
              name="quantidade_estoque"
              type="number"
              min="0"
              value={currentProduto.quantidade_estoque || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <SelectField
            label="Fornecedor"
            name="id_fornecedor"
            value={currentProduto.id_fornecedor || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um fornecedor</option>
            {mockFornecedores.map(fornecedor => (
              <option key={fornecedor.id_fornecedor} value={fornecedor.id_fornecedor}>
                {fornecedor.nome}
              </option>
            ))}
          </SelectField>
        </form>
      </Modal>
    </div>
  );
};

export default Produtos;