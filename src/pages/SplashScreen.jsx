import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, FileText, CheckCircle } from 'lucide-react'
import logo from '../assets/logo2.png'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-sky-50 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-32 left-20 text-blue-200"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FileText size={32} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-24 text-indigo-200"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <Sparkles size={28} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-32 text-sky-200"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <CheckCircle size={24} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-20 text-blue-200"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <FileText size={30} strokeWidth={1} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
            {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Seoracl Logo"
            className="w-28 h-28 object-contain"
          />
        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="text-5xl font-bold text-slate-800 tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          seoracl
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-slate-400 text-lg font-light tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          cite smarter. write better.
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-indigo-300 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}