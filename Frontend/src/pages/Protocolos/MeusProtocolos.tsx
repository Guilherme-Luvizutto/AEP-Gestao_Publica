import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { protocoloService } from '@/services/protocoloService'
import { useAuth } from '@/contexts/AuthContext'
import type { Protocolo } from '@/types'
import { motion } from 'framer-motion'

const statusConfig = {
  ABERTO: { label: 'Aberto', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  EM_ANDAMENTO: { label: 'Em Andamento', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  CONCLUIDO: { label: 'Concluído', className: 'bg-green-100 text-green-700 border-green-200' },
  CANCELADO: { label: 'Cancelado', className: 'bg-red-100 text-red-700 border-red-200' },
}

const urgenciaConfig = {
  BAIXA: { label: 'Baixa', className: 'bg-gray-100 text-gray-600' },
  MEDIA: { label: 'Média', className: 'bg-yellow-100 text-yellow-700' },
  ALTA: { label: 'Alta', className: 'bg-orange-100 text-orange-700' },
  CRITICA: { label: 'Crítica', className: 'bg-red-100 text-red-700' },
}

export function MeusProtocolos() {
  const { usuario } = useAuth()
  const [protocolos, setProtocolos] = useState<Protocolo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    protocoloService
      .listarTodos()
      .then(setProtocolos)
      .catch(() => setProtocolos([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-indigo-500 animate-spin" />
      </div>
    )
  }

  if (protocolos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <ExternalLink size={24} className="text-gray-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-700">Nenhum protocolo encontrado</h3>
        <p className="text-xs text-gray-500 mt-1">Use a aba "Criar Protocolo" para registrar um.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        rounded-2xl
        border
        border-gray-200
        overflow-hidden
        bg-white
        shadow-sm
        "
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Meus Protocolos
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Acompanhe o andamento das suas solicitações.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
            <TableHead className="font-semibold text-gray-700">Protocolo</TableHead>
            <TableHead className="font-semibold text-gray-700">Código</TableHead>
            <TableHead className="font-semibold text-gray-700">Descrição</TableHead>
            <TableHead className="font-semibold text-gray-700">Urgência</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {protocolos.map((p, i) => (
            <TableRow key={p.id} className="hover:bg-indigo-50/50 transition-all duration-200">
              <TableCell className="font-semibold text-gray-800">Protocolo {i + 1}</TableCell>
              <TableCell>
                <span
                  className="
                    font-mono
                    text-xs
                    bg-gray-100
                    border
                    border-gray-200
                    px-3
                    py-1
                    rounded-md
                    "
                >            {p.codigo}</span>
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="text-xs text-gray-600 line-clamp-2">{p.descricao}</p>
                <p className="text-xs text-gray-400 mt-0.5">{p.localizacao}</p>
              </TableCell>
              <TableCell>
                <Badge className={urgenciaConfig[p.nivelUrgencia].className}>
                  {urgenciaConfig[p.nivelUrgencia].label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={statusConfig[p.status].className}>
                  {statusConfig[p.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                <a href="#" className="
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    font-semibold
                    text-indigo-600
                    hover:text-indigo-700
                    hover:gap-2
                    transition-all
                  ">Abrir <ExternalLink size={12} />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}