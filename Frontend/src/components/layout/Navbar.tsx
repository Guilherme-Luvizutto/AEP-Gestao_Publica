import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User, LogOut, Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { usuario, isAdmin, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  function handleLogout() {
    logout()
    toast.success('Até logo!')
    navigate('/login')
  }

  const navLinks = [
  { path: '/', label: 'HOME' },
  { path: '/protocolos', label: 'MEUS PROTOCOLOS' },
  { path: '/protocolos/novo', label: 'CRIAR PROTOCOLO' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/public-service-2.0.png"
            alt="CidadãoDigital"
            className="w-9 h-9 object-contain"
          />
          <span className="font-bold text-gray-900 hidden sm:block text-base">
            CidadãoDigital
          </span>
        </Link>

        <div className="h-5 w-px bg-gray-200 hidden sm:block" />

        {/* Nav links desktop */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-indigo-600 ${
                isActive(link.path) ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Admin badge */}
        {isAdmin && (
          <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
            <Shield size={12} /> Administrador
          </span>
        )}

        {/* Profile desktop */}
        <Link
          to="/perfil"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-700 text-xs font-bold">
              {usuario?.nome.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {usuario?.nome.split(' ')[0]}
          </span>
          <User size={14} className="text-gray-400" />
        </Link>

        {/* Logout desktop */}
        <button
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          Sair
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1"
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/perfil"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Meu Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}