// ── Auth ─────────────────────────────────────────────────────────────────────
export type Role = 'USUARIO' | 'ADMIN'

export interface Usuario {
  id: number
  nome: string
  email: string
  role: Role
}

export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
  nome: string
  email: string
  role: Role
}

// ── Protocolo ─────────────────────────────────────────────────────────────────
export type NivelUrgencia = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA'
export type StatusProtocolo = 'ABERTO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO'

export interface Protocolo {
  id: number
  codigo: string
  nomeCompleto: string
  celular: string
  descricao: string
  nivelUrgencia: NivelUrgencia
  localizacao: string
  imagemUrl?: string
  solicitante: string
  dataCriacao: string
  status: StatusProtocolo
}

export interface ProtocoloRequest {
  nomeCompleto: string
  rg: string
  celular: string
  descricao: string
  nivelUrgencia: NivelUrgencia
  localizacao: string
  imagemUrl?: string
}