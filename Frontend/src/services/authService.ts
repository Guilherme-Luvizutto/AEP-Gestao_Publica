import { api } from './api'
import type { LoginRequest, LoginResponse } from '@/types'

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/api/auth/login', {
      email: data.email,
      senha: data.senha,
    })
    return response.data
  },

  salvarSessao: (data: LoginResponse) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('usuario', JSON.stringify({
      nome: data.nome,
      email: data.email,
      role: data.role,
    }))
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  },

  getUsuario: () => {
    const raw = localStorage.getItem('usuario')
    if (!raw) return null
    return JSON.parse(raw)
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  },
}