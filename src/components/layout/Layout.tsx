import { ReactNode, useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const sidebarWidth = sidebarCollapsed ? '110px' : '240px'

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="relative flex-shrink-0" style={{ width: sidebarWidth }}>
        <Sidebar collapsed={sidebarCollapsed} />
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute bg-white border border-slate-200 rounded-r-lg shadow-md hover:shadow-lg transition-all duration-300 p-2 text-slate-600 hover:text-[var(--text-primary)]"
          style={{
            top: '50%',
            right: '-20px',
            transform: 'translateY(-50%)',
            zIndex: 60
          }}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        <footer className="mt-1 px-6 py-0.5 text-center text-xs text-slate-600 dark:text-slate-500 bg-background">
          {'\u00a9 2025 Innobi \u2022 Data Engineering \u2022 BI \u2022 Cloud Architecture'}
        </footer>
      </div>
    </div>
  )
}
