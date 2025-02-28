import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Truck, 
  BarChart3, 
  Home,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/vendas', label: 'Vendas', icon: <ShoppingCart size={20} /> },
    { path: '/clientes', label: 'Clientes', icon: <Users size={20} /> },
    { path: '/produtos', label: 'Produtos', icon: <Package size={20} /> },
    { path: '/fornecedores', label: 'Fornecedores', icon: <Truck size={20} /> },
    { path: '/relatorios', label: 'Relatórios', icon: <BarChart3 size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white">
        <div className="p-5">
          <h1 className="text-2xl font-bold">SuperMercado</h1>
          <p className="text-blue-200 text-sm">Sistema de Gestão</p>
        </div>
        <nav className="flex-1">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-5 py-3 transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-5 text-sm text-blue-200">
          <p>© 2025 SuperMercado</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-600 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="ml-3 text-xl font-semibold text-gray-800">SuperMercado</h1>
            </div>
            <div className="hidden md:block">
              <h2 className="text-xl font-semibold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    A
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-900 text-white absolute z-20 w-full">
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-5 py-3 transition-colors ${
                        location.pathname === item.path
                          ? 'bg-blue-700 text-white'
                          : 'text-blue-100 hover:bg-blue-700'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;