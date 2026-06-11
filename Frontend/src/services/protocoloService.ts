import { api } from './api'
import type { Protocolo, ProtocoloRequest } from '@/types'

export const protocoloService = {
  criar: async (data: ProtocoloRequest): Promise<Protocolo> => {
    const response = await api.post('/api/protocolos', data)
    return response.data
  },

  listarTodos: async (): Promise<Protocolo[]> => {
    const response = await api.get('/api/protocolos')
    return response.data
  },

  listarMeus: async (solicitante: string): Promise<Protocolo[]> => {
    const response = await api.get(`/api/protocolos/meus?solicitante=${solicitante}`)
    return response.data
  },

  buscarPorId: async (id: number): Promise<Protocolo> => {
    const response = await api.get(`/api/protocolos/${id}`)
    return response.data
  },
}