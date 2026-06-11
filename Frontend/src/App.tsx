import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { Toaster } from 'sonner'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Protocolos from '@/pages/Protocolos'
import Perfil from '@/pages/Perfil'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/protocolos" element={
            <ProtectedRoute><Protocolos /></ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute><Perfil /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  )
}