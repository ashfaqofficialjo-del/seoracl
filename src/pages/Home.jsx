import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText, BookOpen, Sparkles, LogOut,
  ChevronRight, Clock, Star, Zap
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo2.png'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [stats, setStats] = useState({
    citations_fixed: 0,
    reports_generated: 0,
    pdfs_remaining: 3
  })

  useEffect(() => {
    if (!user) return
    const fetchStats = async () => {
      const { data } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (data) setStats(data)
      else {
        await supabase.from('user_stats').insert({
          user_id: user.id,
          citations_fixed: 0,
          reports_generated: 0,
          pdfs_remaining: 3
        })
      }
    }
    fetchStats()
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0]
    || user?.email?.split('@')[0]
    || 'Scholar'

  const features = [
    {
      id: 1,
      icon: FileText,
      title: 'Fix My Citations',
      description: 'Paste your essay and get a clean APA, MLA or Chicago reference list instantly.',
      badge: 'Most Popular',
      badgeColor: 'bg-indigo-100 text-indigo-600',
      action: () => navigate('/tool'),
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'AI Writing Report',
      description: 'Check your essay for AI-generated content and get a detailed score report.',
      badge: 'New',
      badgeColor: 'bg-emerald-100 text-emerald-600',
      action: () => navigate('/tool'),
    },
    {
      id: 3,
      icon: BookOpen,
      title: 'Reference Builder',
      description: 'Build your full reference list from scratch with our guided citation builder.',
      badge: 'Coming Soon',
      badgeColor: 'bg-amber-100 text-amber-600',
      action: () => {},
    },
  ]

  const statCards = [
    { icon: Zap, label: 'Citations Fixed', value: stats.citations_fixed },
    { icon: FileText, label: 'Reports Generated', value: stats.reports_generated },
    { icon: Star, label: 'Free PDFs Left', value: stats.pdfs_remaining },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Seoracl" className="w-8 h-8 object-contain" />
          <span className="font-bold text-slate-800 text-lg">seoracl</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm hidden sm:block">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-slate-400">What would you like to work on today?</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {statCards.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                  <Icon size={16} strokeWidth={1.5} className="text-indigo-400" />
                </div>
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <span className="text-slate-400 text-xs mt-0.5">{stat.label}</span>
              </div>
            )
          })}
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-slate-600 font-semibold text-sm uppercase tracking-wider">Tools</h2>
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.button
                key={feature.id}
                onClick={feature.action}
                onHoverStart={() => setHoveredCard(feature.id)}
                onHoverEnd={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 text-left hover:shadow-md hover:border-indigo-100 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} strokeWidth={1.5} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800">{feature.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
                <ChevronRight
                  size={18}
                  strokeWidth={1.5}
                  className={`text-slate-300 flex-shrink-0 transition-transform duration-200 ${hoveredCard === feature.id ? 'translate-x-1 text-indigo-400' : ''}`}
                />
              </motion.button>
            )
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <h2 className="text-slate-600 font-semibold text-sm uppercase tracking-wider mb-4">Recent Activity</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center text-center">
            <Clock size={32} strokeWidth={1} className="text-slate-200 mb-3" />
            <p className="text-slate-400 text-sm">No activity yet — fix your first citation to get started!</p>
            <button
              onClick={() => navigate('/tool')}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
            >
              Fix Citations Now
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}