import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border max-w-sm"
          style={{
            background: type === 'success' ? '#f0fdf4' : '#fef2f2',
            borderColor: type === 'success' ? '#bbf7d0' : '#fecaca'
          }}
        >
          {type === 'success'
            ? <CheckCircle size={18} className="text-emerald-500" strokeWidth={1.5} />
            : <AlertCircle size={18} className="text-red-400" strokeWidth={1.5} />
          }
          <p className="text-sm font-medium text-slate-700 flex-1">{message}</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={14} strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}