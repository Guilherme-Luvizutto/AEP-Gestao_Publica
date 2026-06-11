/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import type { Usuario, LoginRequest } from '@/types'
import { authService } from '@/services/authService'

interface AuthContextType {
  usuario: Usuario | null
  isAdmin: boolean
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(
    authService.getUsuario()
  )

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data)
    authService.salvarSessao(response)
    setUsuario({
      id: 0,
      nome: response.nome,
      email: response.email,
      role: response.role,
    })
  }

  const logout = () => {
    authService.logout()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{
      usuario,
      isAdmin: usuario?.role === 'ADMIN',
      isAuthenticated: !!usuario,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro do AuthProvider')
  return ctx
}