import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  duration: Math.random() * 12 + 6,
  delay: Math.random() * 5,
}))

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    setErro('')
    setLoading(true)
    try {
      await login({ email, senha })
      toast.success('Bem-vindo ao CidadãoDigital!')
      navigate('/')
    } catch {
      setErro('E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  function preencherCredencial(e: string, s: string) {
    setEmail(e)
    setSenha(s)
    setErro('')
  }

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* ── Painel Esquerdo ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1e1b4b 40%, #312e81 70%, #4338ca 100%)' }}
      >
        {/* Partículas animadas */}
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-30, 30, -30], opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Glow effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Logo topo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 flex items-center gap-3"
        >
          <motion.img
            src="/public-service-2.0.png"
            alt="Logo"
            className="w-12 h-12 drop-shadow-2xl"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div>
            <h1 className="text-white font-bold text-xl leading-none">CidadãoDigital</h1>
            <p className="text-indigo-300 text-xs mt-0.5">Gestão Pública Digital</p>
          </div>
        </motion.div>

        {/* Centro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative z-10 space-y-10"
        >
          {/* Logo grande flutuante */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-2xl scale-150" />
              <img
                src="/public-service-2.0.png"
                alt="Logo"
                className="relative w-44 h-44 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Gestão Pública<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #a5b4fc, #c4b5fd)' }}>
                ao alcance de todos
              </span>
            </h2>
            <p className="text-indigo-200 text-base leading-relaxed max-w-sm mx-auto">
              Conecte-se aos serviços públicos de forma simples, transparente e eficiente.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📋', text: 'Abertura de protocolos' },
              { icon: '🔍', text: 'Acompanhamento real' },
              { icon: '💬', text: 'Comunicação direta' },
              { icon: '📊', text: 'Relatórios completos' },
            ].map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-indigo-100 text-xs font-medium">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 text-indigo-400 text-xs"
        >
          © 2026 CidadãoDigital. Todos os direitos reservados.
        </motion.p>
      </motion.div>

      {/* ── Painel Direito ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 bg-white"
      >
        <div className="w-full max-w-md space-y-8">

          {/* Logo mobile */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex lg:hidden flex-col items-center gap-3"
          >
            <img src="/public-service-2.0.png" alt="Logo" className="w-16 h-16" />
            <h1 className="text-xl font-bold text-gray-900">CidadãoDigital</h1>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo! 👋</h2>
            <p className="text-gray-500 mt-2 text-sm">Faça login para acessar a plataforma.</p>
          </motion.div>

          {/* Credenciais de teste */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-indigo-100 p-4 space-y-3"
            style={{ background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)' }}
          >
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
              🔑 Acesso Rápido
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { role: '👤 Cidadão',   email: 'joao@email.com',  senha: '123456',   color: 'border-blue-200 bg-white hover:border-blue-400' },
                { role: '🛡️ Admin',     email: 'admin@email.com', senha: 'admin123', color: 'border-violet-200 bg-white hover:border-violet-400' },
              ].map(c => (
                <motion.button
                  key={c.role}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => preencherCredencial(c.email, c.senha)}
                  className={`text-left rounded-xl p-3 border-2 transition-all group ${c.color}`}
                >
                  <p className="font-bold text-gray-800 text-xs mb-1">{c.role}</p>
                  <p className="text-gray-500 text-xs">{c.email}</p>
                  <p className="text-gray-400 text-xs">{c.senha}</p>
                  <p className="text-indigo-500 text-xs mt-1.5 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 font-medium">
                    Clique para usar <ArrowRight size={10} />
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">E-mail</label>
              <motion.div
                animate={{ scale: focused === 'email' ? 1.01 : 1 }}
                className="relative"
              >
                <Mail
                  size={16}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                    focused === 'email' ? 'text-indigo-500' : 'text-gray-400'
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="seu@email.com"
                  className={`w-full pl-10 pr-4 h-11 rounded-xl border-2 text-sm outline-none transition-all ${
                    focused === 'email'
                      ? 'border-indigo-400 ring-4 ring-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </motion.div>
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Senha</label>
              <motion.div
                animate={{ scale: focused === 'senha' ? 1.01 : 1 }}
                className="relative"
              >
                <Lock
                  size={16}
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                    focused === 'senha' ? 'text-indigo-500' : 'text-gray-400'
                  }`}
                />
                <input
                  type={showSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  onFocus={() => setFocused('senha')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 h-11 rounded-xl border-2 text-sm outline-none transition-all ${
                    focused === 'senha'
                      ? 'border-indigo-400 ring-4 ring-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </motion.div>
            </div>

            {/* Erro */}
            <AnimatePresence>
              {erro && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"
                >
                  ❌ {erro}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-white font-bold text-base transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
              style={{ background: loading ? '#818cf8' : 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Entrar na plataforma
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-400"
          >
            © 2026 CidadãoDigital — Gestão Pública Digital
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}