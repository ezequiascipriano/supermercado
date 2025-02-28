import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import { InputField, SelectField } from '../components/FormField';
import { Download, Filter } from 'lucide-react';

// Mock data for demonstration
const vendasMensais = [
  { name: 'Jan', value: 45000 },
  { name: 'Fev', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Abr', value: 61000 },
  { name: 'Mai', value: 55000 },
  { name: 'Jun', value: 67000 },
  { name: 'Jul', value: 72000 },
];

const produtosMaisVendidos = [
  { name: 'Arroz', value: 120 },
  { name: 'Feijão', value: 110 },
  { name: 'Açúcar', value: 85 },
  { name: 'Café', value: 75 },
  { name: 'Óleo', value: 60 },
];

const vendasPorFormaPagamento = [
  { name: 'Cartão', value: 45 },
  { name: 'Dinheiro', value: 25 },
  { name: 'PIX', value: 20 },
  { name: 'Boleto', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Relatorios: React.FC = () => {
  const [periodoInicio, setPeriodoInicio] = useState('2023-01-01');
  const [periodoFim, setPeriodoFim] = useState('2023-07-31');
  const [tipoRelatorio, setTipoRelatorio] = useState('vendas');

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputField
            label="Data Inicial"
            type="date"
            value={periodoInicio}
            onChange={(e) => setPeriodoInicio(e.target.value)}
          />
          <InputField
            label="Data Final"
            type="date"
            value={periodoFim}
            onChange={(e) => setPeriodoFim(e.target.value)}
          />
          <SelectField
            label="Tipo de Relatório"
            value={tipoRelatorio}
            onChange={(e) => setTipoRelatorio(e.target.value)}
          >
            <option value="vendas">Vendas</option>
            <option value="produtos">Produtos</option>
            <option value="clientes">Clientes</option>
            <option value="fornecedores">Fornecedores</option>
          </SelectField>
          <div className="flex items-end space-x-2">
            <Button
              variant="primary"
              className="w-full"
              icon={<Filter size={18} />}
            >
              Filtrar
            </Button>
            <Button
              variant="secondary"
              icon={<Download size={18} />}
            >
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Vendas Mensais">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendasMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Vendas']} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Produtos Mais Vendidos">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={produtosMaisVendidos}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => [`${value} unidades`, 'Quantidade']} />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Vendas por Forma de Pagamento">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vendasPorFormaPagamento}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {vendasPorFormaPagamento.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Evolução de Vendas">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vendasMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Vendas']} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Resumo Financeiro">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-blue-700 font-medium mb-2">Faturamento Total</h4>
            <p className="text-2xl font-bold text-blue-800">R$ 400.000,00</p>
            <p className="text-sm text-blue-600">Período selecionado</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-green-700 font-medium mb-2">Ticket Médio</h4>
            <p className="text-2xl font-bold text-green-800">R$ 87,35</p>
            <p className="text-sm text-green-600">Por venda</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-purple-700 font-medium mb-2">Total de Vendas</h4>
            <p className="text-2xl font-bold text-purple-800">4.580</p>
            <p className="text-sm text-purple-600">Transações</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-orange-700 font-medium mb-2">Crescimento</h4>
            <p className="text-2xl font-bold text-orange-800">+12,5%</p>
            <p className="text-sm text-orange-600">Em relação ao período anterior</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Relatorios;