import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import logo from '../assets/logo2.png'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center z-10"
      >
        <img src={logo} alt="Seoracl" className="w-16 h-16 object-contain mb-6" />
        <h1 className="text-8xl font-bold text-indigo-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page not found</h2>
        <p className="text-slate-400 mb-8">Looks like this citation doesn't exist!</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:border-indigo-200 transition-all text-sm"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white transition-all text-sm"
          >
            <Home size={16} strokeWidth={1.5} />
            Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}