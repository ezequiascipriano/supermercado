import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Clientes from './pages/Clientes';
import Vendas from './pages/Vendas';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="fornecedores" element={<Fornecedores />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="vendas" element={<Vendas />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;