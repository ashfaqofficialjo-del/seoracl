import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, FileText, Trash2, Copy } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo2.png'
import Toast from '../components/ui/Toast'

export default function History() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  useEffect(() => {
    if (!user) return
    const fetchHistory = async () => {
      const { data } = await supabase
        .from('citation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)
      setHistory(data || [])
      setLoading(false)
    }
    fetchHistory()
  }, [user])

  const handleDelete = async (id) => {
    await supabase.from('citation_history').delete().eq('id', id)
    setHistory(history.filter(h => h.id !== id))
    setToast({ message: 'Deleted successfully', type: 'success' })
    setTimeout(() => setToast({ message: '', type: 'success' }), 2000)
  }

    const handleCopy = (ref_text) => {
    navigator.clipboard.writeText(ref_text)
    setToast({ message: 'Copied to clipboard!', type: 'success' })
    setTimeout(() => setToast({ message: '', type: 'success' }), 2000)
  }

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
        <span className="font-bold text-slate-800">Citation History</span>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20">
            <Clock size={48} strokeWidth={1} className="text-slate-200 mb-4" />
            <h3 className="text-slate-600 font-semibold mb-2">No history yet</h3>
            <p className="text-slate-400 text-sm mb-6">Your citation fixes will appear here</p>
            <button
              onClick={() => navigate('/tool')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              Fix Citations Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-slate-400 text-sm">{history.length} saved session{history.length > 1 ? 's' : ''}</p>
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText size={15} strokeWidth={1.5} className="text-indigo-400" />
                    <span className="text-sm font-semibold text-slate-700">{item.style} — {item.count} reference{item.count > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{new Date(item.created_at).toLocaleDateString()}</span>
                    <button onClick={() => handleCopy(item.ref_text)} className="text-slate-400 hover:text-indigo-500 transition-colors">
                      <Copy size={14} strokeWidth={1.5} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-400 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-400 text-xs line-clamp-2">{item.ref_text}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}