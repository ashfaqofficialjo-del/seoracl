import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, FileText, Star, TrendingUp } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo2.png'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState({ totalUsers: 0, totalCitations: 0, totalPDFs: 0 })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: userStats } = await supabase
        .from('user_stats')
        .select('*')

      if (userStats) {
        const totalCitations = userStats.reduce((sum, u) => sum + (u.citations_fixed || 0), 0)
        const totalPDFs = userStats.reduce((sum, u) => sum + (3 - (u.pdfs_remaining || 0)), 0)
        setStats({
          totalUsers: userStats.length,
          totalCitations,
          totalPDFs,
        })
        setUsers(userStats.slice(0, 10))
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'bg-indigo-50 text-indigo-500' },
    { icon: FileText, label: 'Citations Fixed', value: stats.totalCitations, color: 'bg-emerald-50 text-emerald-500' },
    { icon: Star, label: 'PDFs Downloaded', value: stats.totalPDFs, color: 'bg-amber-50 text-amber-500' },
    { icon: TrendingUp, label: 'Avg Citations/User', value: stats.totalUsers ? Math.round(stats.totalCitations / stats.totalUsers) : 0, color: 'bg-blue-50 text-blue-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <nav className="relative z-10 flex items-center px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100 gap-3">
        <button onClick={() => navigate('/home')} className="text-slate-500 hover:text-slate-700">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
        <span className="font-bold text-slate-800">Admin Dashboard</span>
        <span className="ml-auto text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full font-medium">Admin Only</span>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <span className="text-slate-400 text-xs mt-1">{stat.label}</span>
              </div>
            )
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Recent Users</span>
            <span className="text-xs text-slate-400">{users.length} shown</span>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {users.map((u, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Users size={14} strokeWidth={1.5} className="text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-600 font-mono">{u.user_id?.slice(0, 12)}...</span>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <span className="text-slate-400">{u.citations_fixed || 0} citations</span>
                    <span className="text-slate-400">{3 - (u.pdfs_remaining || 0)} PDFs</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}