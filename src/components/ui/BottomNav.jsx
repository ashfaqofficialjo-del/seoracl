import { useNavigate, useLocation } from 'react-router-dom'
import { Home, FileText, Clock, Sparkles, User } from 'lucide-react'

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/tool', icon: FileText, label: 'Cite' },
  { path: '/ai-report', icon: Sparkles, label: 'AI Report' },
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const protectedPaths = ['/home', '/tool', '/ai-report', '/history', '/profile', '/settings', '/pricing']
  if (!protectedPaths.includes(location.pathname)) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-slate-100 sm:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-indigo-500' : 'text-slate-400'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && <div className="w-1 h-1 bg-indigo-500 rounded-full" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}