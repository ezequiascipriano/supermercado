import React from 'react';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Truck, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data for demonstration
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const dailySalesData = [
  { name: '01/07', value: 1200 },
  { name: '02/07', value: 1400 },
  { name: '03/07', value: 1300 },
  { name: '04/07', value: 1800 },
  { name: '05/07', value: 2000 },
  { name: '06/07', value: 1500 },
  { name: '07/07', value: 1700 },
];

const lowStockProducts = [
  { id: 1, name: 'Arroz Integral', estoque: 5, minimo: 10 },
  { id: 2, name: 'Leite Desnatado', estoque: 8, minimo: 15 },
  { id: 3, name: 'Café Premium', estoque: 3, minimo: 10 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-400 bg-opacity-30">
              <ShoppingCart size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold">Vendas Hoje</h4>
              <p className="text-2xl font-bold">R$ 3.450,00</p>
              <p className="text-sm">+12% em relação a ontem</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-400 bg-opacity-30">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold">Clientes</h4>
              <p className="text-2xl font-bold">245</p>
              <p className="text-sm">+5 novos hoje</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-400 bg-opacity-30">
              <Package size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold">Produtos</h4>
              <p className="text-2xl font-bold">1.245</p>
              <p className="text-sm">32 com estoque baixo</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-400 bg-opacity-30">
              <Truck size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold">Fornecedores</h4>
              <p className="text-2xl font-bold">48</p>
              <p className="text-sm">2 entregas pendentes</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Vendas Mensais">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Vendas Diárias (Últimos 7 dias)">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Produtos com Estoque Baixo">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Mínimo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.estoque}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.minimo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <AlertTriangle size={14} className="mr-1" /> Baixo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Desempenho de Vendas">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Meta Mensal</span>
                <span className="text-sm font-medium text-gray-700">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Meta Trimestral</span>
                <span className="text-sm font-medium text-gray-700">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Meta Anual</span>
                <span className="text-sm font-medium text-gray-700">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Resumo Financeiro</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Faturamento Mensal</p>
                  <p className="text-lg font-semibold text-gray-800">R$ 125.450,00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ticket Médio</p>
                  <p className="text-lg font-semibold text-gray-800">R$ 87,35</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vendas no Mês</p>
                  <p className="text-lg font-semibold text-gray-800">1.436</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Crescimento</p>
                  <p className="text-lg font-semibold text-green-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" /> 8,2%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;