import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Mail, Calendar, Edit2, Save } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo2.png'
import Toast from '../components/ui/Toast'

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const handleSave = async () => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })
    if (error) {
      setToast({ message: error.message, type: 'error' })
    } else {
      setToast({ message: 'Profile updated successfully!', type: 'success' })
      setEditing(false)
    }
    setLoading(false)
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000)
  }

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
          <span className="font-bold text-slate-800">Profile</span>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className="flex items-center gap-1.5 text-sm text-indigo-500 hover:text-indigo-600 font-medium"
        >
          {editing ? <Save size={15} strokeWidth={1.5} /> : <Edit2 size={15} strokeWidth={1.5} />}
          {editing ? (loading ? 'Saving...' : 'Save') : 'Edit'}
        </button>
      </nav>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-10">

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-24 h-24 bg-indigo-100 rounded-3xl flex items-center justify-center mb-4 shadow-sm">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-24 h-24 rounded-3xl object-cover" />
            ) : (
              <User size={40} strokeWidth={1} className="text-indigo-400" />
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-800">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</h2>
          <p className="text-slate-400 text-sm">{user?.email}</p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Full Name */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <User size={15} strokeWidth={1.5} className="text-slate-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Full Name</span>
            </div>
            {editing ? (
              <input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            ) : (
              <p className="text-slate-700 font-medium">{fullName || 'Not set'}</p>
            )}
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={15} strokeWidth={1.5} className="text-slate-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Email</span>
            </div>
            <p className="text-slate-700 font-medium">{user?.email}</p>
          </div>

          {/* Joined */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={15} strokeWidth={1.5} className="text-slate-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Member Since</span>
            </div>
            <p className="text-slate-700 font-medium">{joinedDate}</p>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 mt-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Danger Zone</h3>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate('/login') }}
              className="w-full py-2.5 border border-red-200 text-red-400 hover:bg-red-50 rounded-xl text-sm font-medium transition-all"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}