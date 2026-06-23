import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Moon, Globe, Shield, ChevronRight, FileText } from 'lucide-react'
import logo from '../assets/logo2.png'
import Toast from '../components/ui/Toast'

export default function Settings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const showToast = (message) => {
    setToast({ message, type: 'success' })
    setTimeout(() => setToast({ message: '', type: 'success' }), 2500)
  }

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-all duration-300 relative ${value ? 'bg-indigo-500' : 'bg-slate-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${value ? 'left-6' : 'left-1'}`} />
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <nav className="relative z-10 flex items-center px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100 gap-3">
        <button onClick={() => navigate('/home')} className="text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
        <span className="font-bold text-slate-800">Settings</span>
      </nav>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-10 flex flex-col gap-6">

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-50">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Preferences</span>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Bell size={16} strokeWidth={1.5} className="text-slate-400" />
                <span className="text-sm text-slate-700">Notifications</span>
              </div>
              <Toggle value={notifications} onChange={(v) => { setNotifications(v); showToast(v ? 'Notifications enabled' : 'Notifications disabled') }} />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Moon size={16} strokeWidth={1.5} className="text-slate-400" />
                <span className="text-sm text-slate-700">Dark Mode</span>
              </div>
              <Toggle value={darkMode} onChange={(v) => { setDarkMode(v); showToast('Coming soon!') }} />
            </div>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-50">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Account</span>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { icon: Globe, label: 'Language', value: 'English', action: () => showToast('Coming soon!') },
              { icon: Shield, label: 'Privacy Policy', value: '', action: () => showToast('Opening...') },
              { icon: FileText, label: 'Terms of Service', value: '', action: () => showToast('Opening...') },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon size={16} strokeWidth={1.5} className="text-slate-400" />
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs text-slate-400">{item.value}</span>}
                    <ChevronRight size={14} strokeWidth={1.5} className="text-slate-300" />
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Version */}
        <p className="text-center text-xs text-slate-300">Seoracl v1.0.0</p>
      </div>
    </div>
  )
}