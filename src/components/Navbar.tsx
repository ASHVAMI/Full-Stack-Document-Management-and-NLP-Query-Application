import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Upload, MessageSquare, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">DocRAG</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;