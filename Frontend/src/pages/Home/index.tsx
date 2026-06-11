import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { useAuth } from '@/contexts/AuthContext'
import { MapaBrasil } from '@/components/MapaBrasil'
import {
  ArrowRight, FileText, Clock, CheckCircle2,
  Users, Shield, Zap, Globe, Bell, BarChart3,
  ChevronRight, Star
} from 'lucide-react'

const STATS = [
  { icon: <FileText size={22} />,      value: '12.4K', label: 'Protocolos Abertos',  color: 'text-indigo-600', bg: 'bg-indigo-50',  border: 'border-indigo-100' },
  { icon: <CheckCircle2 size={22} />,  value: '98%',   label: 'Taxa de Resolução',   color: 'text-green-600',  bg: 'bg-green-50',   border: 'border-green-100' },
  { icon: <Clock size={22} />,         value: '2.3h',  label: 'Tempo Médio',         color: 'text-amber-600',  bg: 'bg-amber-50',   border: 'border-amber-100' },
  { icon: <Users size={22} />,         value: '8.7K',  label: 'Cidadãos Ativos',     color: 'text-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-100' },
]

const FEATURES = [
  { icon: <Zap size={20} />,          title: 'Rápido e Ágil',       desc: 'Abra um protocolo em menos de 2 minutos pelo celular ou computador.',          color: 'from-indigo-500 to-indigo-600' },
  { icon: <Shield size={20} />,       title: 'Seguro e Confiável',  desc: 'Dados protegidos com código único de rastreamento para cada protocolo.',       color: 'from-violet-500 to-violet-600' },
  { icon: <Globe size={20} />,        title: 'Acesso Universal',    desc: 'Disponível 24h por dia, 7 dias por semana, de qualquer dispositivo.',          color: 'from-blue-500 to-blue-600' },
  { icon: <Bell size={20} />,         title: 'Notificações',        desc: 'Atualizações em tempo real sobre o andamento das suas solicitações.',          color: 'from-cyan-500 to-cyan-600' },
  { icon: <BarChart3 size={20} />,    title: 'Transparência',       desc: 'Acompanhe métricas públicas e veja como a gestão resolve os problemas.',       color: 'from-teal-500 to-teal-600' },
  { icon: <CheckCircle2 size={20} />, title: 'Resolução Garantida', desc: 'Todos os protocolos monitorados até resolução final com prazo estabelecido.',  color: 'from-green-500 to-green-600' },
]

const VALORES = [
  { emoji: '💡', titulo: 'Inovação',         desc: 'Soluções criativas e de ponta para o serviço público.' },
  { emoji: '🤝', titulo: 'Integridade',      desc: 'Agimos com honestidade e transparência em tudo.' },
  { emoji: '⭐', titulo: 'Excelência',       desc: 'Comprometimento com a qualidade em tudo que fazemos.' },
  { emoji: '👥', titulo: 'Colaboração',      desc: 'Trabalhamos juntos para alcançar objetivos comuns.' },
  { emoji: '❤️', titulo: 'Foco no Cidadão', desc: 'O cidadão é nossa prioridade absoluta.' },
]

const NOTICIAS = [
  { id: 1, tag: 'Novidade',   tagColor: 'bg-indigo-100 text-indigo-700', titulo: 'Nova funcionalidade de acompanhamento em tempo real', data: '22 Out 2023', resumo: 'A plataforma agora permite acompanhar o status dos protocolos em tempo real com notificações automáticas.' },
  { id: 2, tag: 'Integração', tagColor: 'bg-green-100 text-green-700',   titulo: 'Integração com órgãos municipais concluída',          data: '15 Out 2023', resumo: 'Os protocolos são encaminhados automaticamente para as secretarias, reduzindo o tempo de resposta em 60%.' },
  { id: 3, tag: 'Segurança',  tagColor: 'bg-amber-100 text-amber-700',   titulo: 'Melhorias de desempenho e segurança implementadas',    data: '10 Out 2023', resumo: 'Atualizações garantem maior velocidade e proteção dos dados dos cidadãos.' },
]

const CIDADES = [
  { nome: 'São Paulo',      protocolos: 1842, color: 'bg-indigo-100 text-indigo-700' },
  { nome: 'Rio de Janeiro', protocolos: 1203, color: 'bg-indigo-100 text-indigo-700' },
  { nome: 'Belo Horizonte', protocolos: 876,  color: 'bg-green-100 text-green-700' },
  { nome: 'Brasília',       protocolos: 567,  color: 'bg-green-100 text-green-700' },
  { nome: 'Salvador',       protocolos: 654,  color: 'bg-green-100 text-green-700' },
  { nome: 'Curitiba',       protocolos: 543,  color: 'bg-green-100 text-green-700' },
  { nome: 'Recife',         protocolos: 412,  color: 'bg-green-100 text-green-700' },
  { nome: 'Porto Alegre',   protocolos: 389,  color: 'bg-amber-100 text-amber-700' },
  { nome: 'Fortaleza',      protocolos: 498,  color: 'bg-green-100 text-green-700' },
  { nome: 'Manaus',         protocolos: 321,  color: 'bg-amber-100 text-amber-700' },
]

function Section({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionTitle({ badge, title, subtitle }: { badge: string, title: string, subtitle?: string }) {
  return (
    <div className="text-center space-y-3 mb-10">
      <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 rounded-full px-4 py-1.5 text-xs font-semibold">
        {badge}
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 max-w-xl mx-auto text-sm">{subtitle}</p>}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { usuario, isAdmin } = useAuth()

  return (
    <PageLayout>
      <div className="space-y-20">

        {/* ── HERO ─────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl text-white min-h-[380px] flex items-center"
          style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1e1b4b 40%, #312e81 70%, #4f46e5 100%)' }}
        >
          {/* Decorações */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
          </div>

          <div className="relative z-10 px-8 sm:px-16 py-16 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-200 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Plataforma de Cidadania Digital
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
              >
                Bem-vindo,{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #a5b4fc, #c4b5fd)' }}>
                  {usuario?.nome.split(' ')[0]}
                </span>!
                <br />
                <span className="text-3xl sm:text-4xl font-semibold text-white/90">
                  Gestão pública ao alcance de todos.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-indigo-100 text-base leading-relaxed mb-8"
              >
                Abra protocolos, acompanhe solicitações e conecte-se com os serviços públicos de forma simples, transparente e eficiente.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/protocolos')}
                  className="flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 h-11 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors"
                >
                  {isAdmin ? 'Ver Relatórios' : 'Abrir Protocolo'}
                  <ArrowRight size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/protocolos')}
                  className="flex items-center gap-2 bg-white/10 text-white font-semibold px-6 h-11 rounded-xl border border-white/30 hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Meus Protocolos
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── STATS ────────────────────────────────────────── */}
        <Section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white rounded-2xl border ${s.border} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-11 h-11 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center mb-4`}>
                  {s.icon}
                </div>
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── MISSÃO ───────────────────────────────────────── */}
        <Section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 rounded-full px-4 py-1.5 text-xs font-semibold">
              <Zap size={12} /> Nossa Missão
            </div>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Transformando a relação entre cidadão e gestão pública
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              Facilitar o acesso do cidadão aos serviços públicos por meio de uma plataforma digital eficiente, transparente e acessível, permitindo a abertura, o acompanhamento e a resolução de protocolos de forma ágil.
            </p>
            <div className="space-y-3">
              {[
                'Processo 100% digital e sem burocracia',
                'Acompanhamento transparente em tempo real',
                'Integração direta com os órgãos municipais',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-indigo-600" />
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {VALORES.map((v, i) => (
              <motion.div
                key={v.titulo}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all group cursor-default"
              >
                <span className="text-2xl">{v.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm group-hover:text-indigo-700 transition-colors">{v.titulo}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── FEATURES ─────────────────────────────────────── */}
        <Section>
          <SectionTitle
            badge={`✨ Por que usar o CidadãoDigital?`}
            title="Tudo que você precisa em um só lugar"
            subtitle="Uma plataforma completa para conectar cidadãos e gestores públicos de forma eficiente."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── MAPA ─────────────────────────────────────────── */}
        <Section>
          <SectionTitle
            badge="🗺️ Cobertura Nacional"
            title="Atuando em todo o Brasil"
            subtitle="Veja as cidades onde estamos ativos e acompanhe os protocolos em andamento."
          />
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              {[
                { label: 'Cidades Ativas',     value: '10+',  color: 'text-indigo-600' },
                { label: 'Protocolos Abertos', value: '7.3K', color: 'text-green-600' },
                { label: 'Estados Atendidos',  value: '10',   color: 'text-amber-600' },
              ].map(s => (
                <div key={s.label} className="px-6 py-5 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="h-[580px] p-4" style={{ background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)' }}>
              <MapaBrasil />
            </div>
            <div className="border-t border-gray-100 p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Cidades com maior atividade</p>
              <div className="flex flex-wrap gap-2">
                {CIDADES.map(c => (
                  <span key={c.nome} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${c.color}`}>
                    {c.nome} · {c.protocolos.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── NOTÍCIAS ─────────────────────────────────────── */}
        <Section>
          <SectionTitle
            badge="📰 Últimas Notícias"
            title="Fique por dentro das novidades"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NOTICIAS.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${n.tagColor}`}>{n.tag}</span>
                    <span className="text-xs text-gray-400">{n.data}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 leading-snug group-hover:text-indigo-700 transition-colors text-sm">{n.titulo}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{n.resumo}</p>
                  <div className="flex items-center gap-1 text-indigo-600 text-xs font-bold pt-1">
                    Ler mais <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <Section>
          <div
            className="relative overflow-hidden rounded-3xl p-12 sm:p-16 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)' }}
          >
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />
            <div className="relative z-10 space-y-6 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-xs font-semibold">
                <Star size={12} /> Comece agora
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Pronto para começar?</h2>
              <p className="text-indigo-200">Abra seu primeiro protocolo agora mesmo e experimente a gestão pública digital.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/protocolos')}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 h-12 rounded-xl shadow-2xl hover:bg-indigo-50 transition-colors text-base"
              >
                Começar agora <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </Section>

      </div>

      {/* Footer */}
      <footer className="mt-20 py-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/public-service-2.0.png" alt="Logo" className="w-6 h-6" />
            <span className="text-sm font-bold text-gray-700">CidadãoDigital</span>
          </div>
          <p className="text-xs text-gray-400">© 2024 CidadãoDigital — Gestão Pública Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </PageLayout>
  )
}