import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { protocoloService } from '@/services/protocoloService'
import type { Protocolo } from '@/types'
import { motion } from 'framer-motion'

const statusConfig = {
  ABERTO:       { label: 'Aberto',       className: 'bg-blue-100 text-blue-700' },
  EM_ANDAMENTO: { label: 'Em Andamento', className: 'bg-amber-100 text-amber-700' },
  CONCLUIDO:    { label: 'Concluído',    className: 'bg-green-100 text-green-700' },
  CANCELADO:    { label: 'Cancelado',    className: 'bg-red-100 text-red-700' },
}

const urgenciaConfig = {
  BAIXA:   { label: 'Baixa',   className: 'bg-gray-100 text-gray-600' },
  MEDIA:   { label: 'Média',   className: 'bg-yellow-100 text-yellow-700' },
  ALTA:    { label: 'Alta',    className: 'bg-orange-100 text-orange-700' },
  CRITICA: { label: 'Crítica', className: 'bg-red-100 text-red-700' },
}

export function RelatorioProtocolos() {
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

  const stats = [
    { label: 'Total',        value: protocolos.length,                                          color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Abertos',      value: protocolos.filter(p => p.status === 'ABERTO').length,       color: 'text-blue-600',   bg: 'bg-blue-50' },
    { label: 'Em Andamento', value: protocolos.filter(p => p.status === 'EM_ANDAMENTO').length, color: 'text-amber-600',  bg: 'bg-amber-50' },
    { label: 'Concluídos',   value: protocolos.filter(p => p.status === 'CONCLUIDO').length,    color: 'text-green-600',  bg: 'bg-green-50' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className={`${s.bg} border-0`}>
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Protocolo</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Urgência</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protocolos.map((p, i) => (
              <TableRow key={p.id} className="hover:bg-indigo-50/30 transition-colors">
                <TableCell className="font-medium">Protocolo {i + 1}</TableCell>
                <TableCell>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{p.codigo}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                      {p.solicitante.charAt(0)}
                    </div>
                    {p.solicitante}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-xs text-gray-600 line-clamp-2">{p.descricao}</p>
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
                  <a href="#" className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    Abrir <ExternalLink size={12} />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}