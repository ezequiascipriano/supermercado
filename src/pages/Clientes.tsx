import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { InputField, TextareaField } from '../components/FormField';
import { Cliente } from '../types';

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
  {
    id_cliente: 3,
    nome: 'Mariana Oliveira',
    telefone: '(21) 99876-5432',
    email: 'mariana.oliveira@email.com',
    endereco: 'Rua Copacabana, 500, Rio de Janeiro - RJ',
    dt_inclusao: '2023-01-17T16:45:00',
    dt_alteracao: null,
  },
];

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState<Partial<Cliente>>({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  const handleOpenModal = (cliente?: Cliente) => {
    if (cliente) {
      setCurrentCliente(cliente);
      setIsEditing(true);
    } else {
      setCurrentCliente({});
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCliente({});
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setClientes(prev =>
        prev.map(c => (c.id_cliente === currentCliente.id_cliente ? { ...c, ...currentCliente } as Cliente : c))
      );
    } else {
      const newCliente: Cliente = {
        ...currentCliente as Cliente,
        id_cliente: Math.max(0, ...clientes.map(c => c.id_cliente)) + 1,
        dt_inclusao: new Date().toISOString(),
        dt_alteracao: null
      };
      setClientes(prev => [...prev, newCliente]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(prev => prev.filter(c => c.id_cliente !== id));
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id_cliente' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Telefone', accessor: 'telefone' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Ações',
      accessor: (cliente: Cliente) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Edit size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(cliente);
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
              handleDelete(cliente.id_cliente);
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
            placeholder="Buscar clientes..."
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
            Novo Cliente
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={filteredClientes}
          keyExtractor={(item) => item.id_cliente}
          onRowClick={(cliente) => handleOpenModal(cliente)}
          emptyMessage="Nenhum cliente encontrado"
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? 'Editar Cliente' : 'Novo Cliente'}
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
            value={currentCliente.nome || ''}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Telefone"
              name="telefone"
              value={currentCliente.telefone || ''}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={currentCliente.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <TextareaField
            label="Endereço"
            name="endereco"
            value={currentCliente.endereco || ''}
            onChange={handleInputChange}
            rows={3}
          />
        </form>
      </Modal>
    </div>
  );
};

export default Clientes;