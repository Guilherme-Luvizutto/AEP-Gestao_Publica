import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useRef } from 'react'
import { Camera, X, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { protocoloService } from '@/services/protocoloService'
import type { NivelUrgencia } from '@/types'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  nomeCompleto: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  rg: z.string().min(1, 'RG é obrigatório'),
  celular: z.string().min(1, 'Celular é obrigatório'),
  descricao: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  nivelUrgencia: z.enum(['BAIXA', 'MEDIA', 'ALTA', 'CRITICA']),
  localizacao: z.string().min(1, 'Localização é obrigatória'),
})

type FormData = z.infer<typeof schema>

export default function CriarProtocolo() {
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nivelUrgencia: 'MEDIA' },
  })

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      await protocoloService.criar(data)
      toast.success('Protocolo criado com sucesso!')
      reset()
      setPreview(null)
      navigate('/protocolos')
    } catch {
      toast.error('Erro ao criar protocolo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Criar Protocolo
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Registre uma solicitação ou ocorrência.
          </p>
        </div>

        <div className="h-px bg-gray-200 my-6" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Campos */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Nome Completo *
              </Label>
              <Input {...register('nomeCompleto')} placeholder="Digite seu nome completo" className="mt-1" />
              {errors.nomeCompleto && <p className="text-xs text-red-500 mt-1">{errors.nomeCompleto.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">RG *</Label>
                <Input {...register('rg')} placeholder="00.000.000-0" className="mt-1" />
                {errors.rg && <p className="text-xs text-red-500 mt-1">{errors.rg.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Celular *</Label>
                <Input {...register('celular')} placeholder="(00) 00000-0000" className="mt-1" />
                {errors.celular && <p className="text-xs text-red-500 mt-1">{errors.celular.message}</p>}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Descrição do Problema *</Label>
              <Textarea {...register('descricao')} placeholder="Descreva o problema em detalhes..." rows={5} className="mt-1 resize-none" />
              {errors.descricao && <p className="text-xs text-red-500 mt-1">{errors.descricao.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block mb-2">
                  Nível de Urgência *
                </Label>
                <Select defaultValue="MEDIA" onValueChange={val => setValue('nivelUrgencia', val as NivelUrgencia)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={6}>
                    <SelectItem value="BAIXA">Baixa</SelectItem>
                    <SelectItem value="MEDIA">Média</SelectItem>
                    <SelectItem value="ALTA">Alta</SelectItem>
                    <SelectItem value="CRITICA">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">Localização *</Label>
                <Input {...register('localizacao')} placeholder="Rua, número, bairro" className="mt-1" />
                {errors.localizacao && <p className="text-xs text-red-500 mt-1">{errors.localizacao.message}</p>}
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="lg:col-span-2 flex flex-col">
            <Label className="text-sm font-semibold text-gray-700">Imagem (opcional)</Label>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative flex-1 min-h-[300px] mt-1 rounded-xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-white hover:border-indigo-400 hover:bg-indigo-50/20 transition-all cursor-pointer group"
            >
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); setPreview(null) }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow hover:bg-red-50"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 group-hover:text-indigo-500 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-gray-200 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                    <Camera size={28} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Insira uma Imagem</p>
                    <p className="text-xs text-gray-400 mt-0.5">Clique para selecionar</p>
                  </div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Enviando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Criar Protocolo
              </span>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

