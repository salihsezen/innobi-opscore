import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Settings } from 'lucide-react'
import { useTheme } from '@/components/ui/ThemeProvider'
import LightArt from '../../img/Light.png'
import DarkArt from '../../img/Dark.png'
import SalihAvatar from '../../img/salih.png'

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/': return 'Dashboard'
    case '/customers': return 'Customer Management'
    case '/projects': return 'Project Management'
    case '/vendors': return 'Vendor Management'
    case '/employees': return 'Employee Management'
    case '/purchase-orders': return 'Purchase Order Management'
    case '/invoices': return 'Invoice Management'
    default: return 'Innobi OpsCore'
  }
}

export function Header() {
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)

  const { theme, setTheme } = useTheme()
  const isLight = theme === 'light'
  const toggleOn = isLight

  const [bulbStage, setBulbStage] = useState(0)
  // HATA DÜZELTİLDİ: Tipi 'number[]' olarak değiştirildi.
  const timers = useRef<number[]>([])
  const animating = bulbStage > 0

  const clearTimers = () => {
    timers.current.forEach(id => window.clearTimeout(id)) // window.clearTimeout kullanıldı
    timers.current = []
  }

  const handleToggle = () => {
    clearTimers()

    if (theme === 'dark') {
      if (animating) return

      setBulbStage(1)
      // HATA DÜZELTİLDİ: Açıkça window.setTimeout kullanıldı.
      timers.current.push(window.setTimeout(() => setBulbStage(2), 150))
      timers.current.push(window.setTimeout(() => setBulbStage(3), 300))

      timers.current.push(
        window.setTimeout(() => { // HATA DÜZELTİLDİ: Açıkça window.setTimeout kullanıldı.
          setTheme('light')
          setBulbStage(0)
        }, 500)
      )
    } else {
      setBulbStage(0)
      setTheme('dark')
    }
  }

  useEffect(() => clearTimers, [])

  const displayMode =
    bulbStage > 0 ? 'light' : isLight ? 'light' : 'dark'

  const bulbClasses = `
    transition-all duration-200
    ${bulbStage === 1 ? 'opacity-40' : ''}
    ${bulbStage === 2 ? 'opacity-70' : ''}
    ${bulbStage === 3 ? 'opacity-100 drop-shadow-[0_0_10px_#ffe17a]' : ''}
  `

  return (
    <header
      className="border-b px-6 py-4"
      style={{
        background: 'var(--bg-header)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--border-header)'
      }}
    >
      <div className="flex items-center justify-between">

        {/* LEFT — TITLE */}
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {pageTitle}
        </h2>

        {/* CENTER — ART + SMALLER NEUMORPHIC SWITCH */}
        <div className="flex items-center gap-4 relative z-10">

          {displayMode === 'light' && (
            <img
              src={LightArt}
              className={`h-10 object-contain -top-[1px] relative ${bulbClasses}`}
            />
          )}

          {displayMode === 'dark' && (
            <img
              src={DarkArt}
              className="h-10 object-contain -top-[1px] relative"
            />
          )}

          {/* 35% SMALLER TRUE-NEUMORPHIC SWITCH */}
          <button
            onClick={handleToggle}
            disabled={animating}
            aria-pressed={toggleOn}
            className={`
              relative inline-flex h-7 w-14 rounded-full transition-all duration-300
              ${toggleOn
                ? `
                  bg-[linear-gradient(145deg,#74e2b9,#9af4d1)]
                  shadow-[4px_4px_10px_rgba(0,0,0,0.15),-4px_-4px_10px_rgba(255,255,255,0.7),
                  inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]
                `
                : `
                  bg-[linear-gradient(145deg,#c5c9d3,#b4b9c4)]
                  shadow-[4px_4px_10px_rgba(0,0,0,0.12),-4px_-4px_10px_rgba(255,255,255,0.8),
                  inset_2px_2px_6px_rgba(0,0,0,0.08),inset_-2px_-2px_6px_rgba(255,255,255,0.9)]
                `
              }
            `}
          >
            {toggleOn && (
              <span className="absolute inset-0 rounded-full pointer-events-none 
                bg-[radial-gradient(circle_at_35%_50%,rgba(255,255,255,0.35),transparent_70%)]" />
            )}

            {/* KNOB */}
            <span
              className={`
                absolute top-[5px] h-5 w-5 rounded-full transition-all duration-300
                bg-[#fafafa]
                shadow-[inset_2px_2px_3px_rgba(0,0,0,0.1),-2px_-2px_3px_rgba(255,255,255,0.9)]
                ${toggleOn ? 'translate-x-7' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* RIGHT — ICONS + WELCOME BANNER */}
        <div className="flex items-center space-x-3">
          
          <button className="p-2 text-slate-600 dark:text-slate-200 hover:bg-muted rounded-lg transition">
            <Bell className="w-5 h-5" />
          </button>

          <button className="p-2 text-slate-600 dark:text-slate-200 hover:bg-muted rounded-lg transition">
            <Settings className="w-5 h-5" />
          </button>

          <div
            className={`
              flex items-center h-10 px-3 rounded-lg backdrop-blur-md
              shadow-[0_8px_20px_rgba(0,0,0,0.25)]
              border
              ${isLight ? 'border-black/5 bg-white/70' : 'border-white/10 bg-white/5'}
            `}
          >
            <div
              className={`
                h-10 w-10 rounded-full overflow-hidden
                ${isLight
                  ? 'border-black/5 shadow-[0_2px_6px_rgba(0,0,0,0.1)]'
                  : 'border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.25)]'
                }
              `}
            >
              <img src={SalihAvatar} className="h-full w-full object-cover" />
            </div>

            <span
              className={`ml-3 text-base font-medium whitespace-nowrap
                ${isLight ? 'text-slate-900/90' : 'text-white/90'}`}
            >
              Welcome back, Salih Sezen 👋
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}