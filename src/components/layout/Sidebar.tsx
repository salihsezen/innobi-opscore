import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Building2,
  UserCheck,
  ShoppingCart,
  FileText,
  Menu,
  X
} from 'lucide-react'
import Logo from '../../img/Logo.png'
import Favicon from '../../img/Favicon.png'

const palettes: Record<string, { accent: string; gradient: string; glow: string }> = {
  dashboard: { accent: 'bg-indigo-400', gradient: 'from-[#4b5563] via-[#6b7280] to-[#4338ca]', glow: 'shadow-[0_0_16px_rgba(107,114,128,0.55)] text-indigo-100' },
  customers: { accent: 'bg-sky-400', gradient: 'from-[#1d4ed8] via-[#4fa4ff] to-[#1d4ed8]', glow: 'shadow-[0_0_16px_rgba(79,164,255,0.6)] text-blue-100' },
  projects: { accent: 'bg-emerald-400', gradient: 'from-[#16a34a] via-[#3bf0ad] to-[#0ea35c]', glow: 'shadow-[0_0_16px_rgba(59,240,173,0.6)] text-emerald-100' },
  vendors: { accent: 'bg-purple-400', gradient: 'from-[#6d28d9] via-[#a867ff] to-[#6d28d9]', glow: 'shadow-[0_0_16px_rgba(168,103,255,0.6)] text-purple-100' },
  employees: { accent: 'bg-amber-400', gradient: 'from-[#312e81] via-[#6366f1] to-[#312e81]', glow: 'shadow-[0_0_16px_rgba(99,102,241,0.6)] text-indigo-100' },
  'purchase-orders': { accent: 'bg-cyan-300', gradient: 'from-[#ea580c] via-[#f97316] to-[#ea580c]', glow: 'shadow-[0_0_16px_rgba(249,115,22,0.6)] text-orange-100' },
  invoices: { accent: 'bg-yellow-300', gradient: 'from-[#facc15] via-[#fbbf24] to-[#f59e0b]', glow: 'shadow-[0_0_16px_rgba(250,204,21,0.6)] text-amber-100' },
  default: { accent: 'bg-violet-400', gradient: 'from-white/15 to-white/5', glow: 'shadow-[0_0_12px_rgba(255,255,255,0.18)] text-white/90' }
}

const navigation = [
  { key: 'dashboard', name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { key: 'customers', name: 'Customers', href: '/customers', icon: Users },
  { key: 'projects', name: 'Projects', href: '/projects', icon: FolderOpen },
  { key: 'vendors', name: 'Vendors', href: '/vendors', icon: Building2 },
  { key: 'employees', name: 'Employees', href: '/employees', icon: UserCheck },
  { key: 'purchase-orders', name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart },
  { key: 'invoices', name: 'Invoices', href: '/invoices', icon: FileText },
]

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-slate-800 text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full
        border-r border-white/10
        bg-[#0b1220]/95
        transition-all duration-200
        ${collapsed ? 'w-[110px]' : 'w-[240px]'}
        z-40 text-white
        transform lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full px-4 py-4 space-y-2">
          <div className="relative flex items-center justify-center px-1 py-1 h-[56px] overflow-hidden">
            <img
              src={Logo}
              alt="Innobi OpsCore"
              className={`h-[5.5rem] w-auto object-contain transition-opacity transition-transform duration-150 ${collapsed ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
            />
            <img
              src={Favicon}
              alt="Innobi OpsCore favicon"
              className={`absolute h-[3.25rem] w-auto object-contain translate-x-[-5px] transition-opacity transition-transform duration-150 ${collapsed ? 'opacity-100 scale-105' : 'opacity-0 scale-90'}`}
              aria-hidden={!collapsed}
            />
          </div>

          <div className="border-t border-white/10" />

          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            const palette = palettes[item.key] ?? palettes.default
            const iconContainerClasses =
              `
  h-10 w-10 flex items-center justify-center
  rounded-xl
  bg-gradient-to-br ${palette.gradient}
  border border-white/10
  ${palette.glow}
  drop-shadow-lg
`
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                title={collapsed ? item.name : undefined}
                className="group block focus:outline-none"
              >
                <div className={`
                  bg-white/5
                  border border-white/10
                  shadow-[0_0_15px_rgba(255,255,255,0.25)]
                  relative rounded-xl
                  transition-all duration-200
                  ${isActive ? 'shadow-[0_0_18px_rgba(255,255,255,0.3)]' : 'hover:shadow-[0_0_18px_rgba(255,255,255,0.3)]'}
                `}>
                  <div
                    className={`absolute left-0 top-0 h-full w-[4px] bg-violet-400 rounded-r-md ${palette.accent}`}
                    style={{ opacity: isActive ? 1 : 0.15 }}
                  />
                  <div className="flex items-center gap-3 px-3 py-3">
                    <div className={iconContainerClasses}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`
                        text-sm font-semibold text-white/90
                        transition-all duration-200 origin-left
                        ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
                      `}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
