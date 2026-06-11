import { useState } from 'react'
import { ArrowLeft, Edit2, Lock, LogOut, Sun, Moon, Mail, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { PageLayout } from '@/components/layout/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'

export default function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [tema, setTema] = useState<'claro' | 'escuro'>('claro')
  const [emailMarketing, setEmailMarketing] = useState(true)
  const [notificacoes, setNotificacoes] = useState(true)

  const [form, setForm] = useState({
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
    dataNascimento: '',
    cpf: usuario.cpf,
    cep: '01000-000',
    rua: 'Rua da Amostra',
    numero: '123',
    complemento: 'Apto 45',
    cidade: 'São Paulo',
    estado: 'SP',
  })

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleSave() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setSaving(false)
    setEditing(false)
    toast.success('Perfil atualizado com sucesso!')
  }

  const inputClass = (editable = true) =>
    `mt-1 ${!editing || !editable ? 'bg-gray-50 text-gray-500 cursor-default' : ''}`

  const ESTADOS = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
    'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >

        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-indigo-200">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl font-bold">
                    {usuario.nome.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{usuario.nome}</h1>
                  <p className="text-sm text-gray-500">{usuario.cargo}</p>
                  <Badge className="mt-1.5 bg-green-100 text-green-700 border-green-200">
                    ● {usuario.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant={editing ? 'outline' : 'default'}
                onClick={() => setEditing(e => !e)}
                className={editing ? '' : 'bg-indigo-600 hover:bg-indigo-700'}
              >
                <Edit2 size={14} className="mr-2" />
                {editing ? 'Cancelar' : 'Editar Perfil'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Dados Básicos</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome completo</Label>
                      <Input className={inputClass()} value={form.nome} onChange={e => set('nome', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>E-mail</Label>
                      <Input className={inputClass()} value={form.email} onChange={e => set('email', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <Input className={inputClass()} value={form.telefone} onChange={e => set('telefone', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Data de nascimento</Label>
                      <Input className={inputClass()} value={form.dataNascimento} onChange={e => set('dataNascimento', e.target.value)} readOnly={!editing} placeholder="dd/mm/aaaa" />
                    </div>
                    <div className="col-span-2">
                      <Label>CPF</Label>
                      <Input className={inputClass(false)} value={form.cpf} readOnly />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Endereço</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>CEP</Label>
                      <Input className={inputClass()} value={form.cep} onChange={e => set('cep', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Rua</Label>
                      <Input className={inputClass()} value={form.rua} onChange={e => set('rua', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Número</Label>
                      <Input className={inputClass()} value={form.numero} onChange={e => set('numero', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Complemento</Label>
                      <Input className={inputClass()} value={form.complemento} onChange={e => set('complemento', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Cidade</Label>
                      <Input className={inputClass()} value={form.cidade} onChange={e => set('cidade', e.target.value)} readOnly={!editing} />
                    </div>
                    <div>
                      <Label>Estado</Label>
                      <Select value={form.estado} onValueChange={val => set('estado', val)} disabled={!editing}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ESTADOS.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Conta */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Usuário/Login</Label>
                    <Input className={inputClass(false)} value={usuario.login} readOnly />
                  </div>
                  <div>
                    <Label>Perfil de acesso</Label>
                    <Input className={inputClass(false)} value={usuario.role} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Segurança */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Lock size={14} className="text-gray-400" />
                  Alterar Senha
                </Button>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Autenticação em dois fatores</p>
                    <p className="text-xs text-gray-500 mt-0.5">Maior segurança na conta</p>
                  </div>
                  <button
                    onClick={() => setTwoFactor(t => !t)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${twoFactor ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${twoFactor ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>

                <Separator />

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sessões Ativas</p>
                  <div className="space-y-2">
                    {[
                      { device: 'Desktop - Chrome', local: 'São Paulo, BR', hora: '20/10/2023 10:30' },
                      { device: 'Mobile - Safari',  local: 'Rio de Janeiro, BR', hora: '19/10/2023 18:00' },
                    ].map(s => (
                      <div key={s.device} className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <div>
                          <p className="text-xs font-medium text-gray-800">{s.device}</p>
                          <p className="text-xs text-gray-500">{s.local} – {s.hora}</p>
                        </div>
                        <button className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium shrink-0">
                          <LogOut size={11} /> Sair
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferências */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preferências</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tema</Label>
                  <div className="flex items-center gap-3 mt-2">
                    {[
                      { val: 'claro', icon: <Sun size={14} />, label: 'Claro' },
                      { val: 'escuro', icon: <Moon size={14} />, label: 'Escuro' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setTema(opt.val as 'claro' | 'escuro')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                          tema === opt.val
                            ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {opt.icon} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Notificações</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      { key: 'email', icon: <Mail size={12} />, label: 'Receber e-mails de marketing', value: emailMarketing, set: setEmailMarketing },
                      { key: 'notif', icon: <Bell size={12} />, label: 'Receber notificações de sistema', value: notificacoes, set: setNotificacoes },
                    ].map(item => (
                      <label key={item.key} className="flex items-center gap-2.5 cursor-pointer">
                        <div
                          onClick={() => item.set(v => !v)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.value ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}
                        >
                          {item.value && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm flex items-center gap-1.5 text-gray-700">
                          <span className="text-gray-400">{item.icon}</span>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between pb-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft size={14} /> Voltar
          </Button>
          {editing && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                {saving && <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          )}
        </div>

      </motion.div>
    </PageLayout>
  )
}