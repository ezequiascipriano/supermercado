import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { InputField, TextareaField } from '../components/FormField';
import { Fornecedor } from '../types';

// Mock data for demonstration
const mockFornecedores: Fornecedor[] = [
  {
    id_fornecedor: 1,
    nome: 'Distribuidora Alimentos ABC',
    contato: 'João Silva',
    telefone: '(11) 98765-4321',
    email: 'joao.silva@alimentosabc.com',
    endereco: 'Av. Paulista, 1000, São Paulo - SP',
    dt_inclusao: '2023-01-10T08:30:00',
    dt_alteracao: null,
  },
  {
    id_fornecedor: 2,
    nome: 'Fornecedora Nacional de Grãos',
    contato: 'Maria Oliveira',
    telefone: '(11) 91234-5678',
    email: 'maria@fng.com.br',
    endereco: 'Rua Augusta, 500, São Paulo - SP',
    dt_inclusao: '2023-01-11T09:15:00',
    dt_alteracao: null,
  },
  {
    id_fornecedor: 3,
    nome: 'Indústria de Alimentos XYZ',
    contato: 'Carlos Santos',
    telefone: '(21) 99876-5432',
    email: 'carlos@alimentosxyz.com.br',
    endereco: 'Av. Brasil, 2000, Rio de Janeiro - RJ',
    dt_inclusao: '2023-01-12T10:45:00',
    dt_alteracao: null,
  },
];

const Fornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(mockFornecedores);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFornecedor, setCurrentFornecedor] = useState<Partial<Fornecedor>>({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (fornecedor?: Fornecedor) => {
    if (fornecedor) {
      setCurrentFornecedor(fornecedor);
      setIsEditing(true);
    } else {
      setCurrentFornecedor({});
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFornecedor({});
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentFornecedor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setFornecedores(prev =>
        prev.map(f => (f.id_fornecedor === currentFornecedor.id_fornecedor ? { ...f, ...currentFornecedor } as Fornecedor : f))
      );
    } else {
      const newFornecedor: Fornecedor = {
        ...currentFornecedor as Fornecedor,
        id_fornecedor: Math.max(0, ...fornecedores.map(f => f.id_fornecedor)) + 1,
        dt_inclusao: new Date().toISOString(),
        dt_alteracao: null
      };
      setFornecedores(prev => [...prev, newFornecedor]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      setFornecedores(prev => prev.filter(f => f.id_fornecedor !== id));
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id_fornecedor' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Contato', accessor: 'contato' },
    { header: 'Telefone', accessor: 'telefone' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Ações',
      accessor: (fornecedor: Fornecedor) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Edit size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(fornecedor);
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
              handleDelete(fornecedor.id_fornecedor);
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
            placeholder="Buscar fornecedores..."
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
            Novo Fornecedor
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredFornecedores}
          keyExtractor={(item) => item.id_fornecedor}
          onRowClick={(fornecedor) => handleOpenModal(fornecedor)}
          emptyMessage="Nenhum fornecedor encontrado"
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? 'Editar Fornecedor' : 'Novo Fornecedor'}
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
            value={currentFornecedor.nome || ''}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Contato"
            name="contato"
            value={currentFornecedor.contato || ''}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Telefone"
              name="telefone"
              value={currentFornecedor.telefone || ''}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={currentFornecedor.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <TextareaField
            label="Endereço"
            name="endereco"
            value={currentFornecedor.endereco || ''}
            onChange={handleInputChange}
            rows={3}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Fornecedores;