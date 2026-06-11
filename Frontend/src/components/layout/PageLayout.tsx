import { Navbar } from './Navbar'

interface PageLayoutProps {
  children: React.ReactNode
  fullWidth?: boolean
}

export function PageLayout({ children, fullWidth = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className={`flex-1 ${fullWidth ? '' : 'max-w-7xl mx-auto w-full px-4 sm:px-6 py-8'}`}>
        {children}
      </main>
    </div>
  )
}