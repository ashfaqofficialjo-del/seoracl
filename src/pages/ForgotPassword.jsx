import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import logo from '../assets/logo2.png'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Seoracl" className="w-16 h-16 object-contain mb-3" />
          <h1 className="text-2xl font-bold text-slate-800">Reset your password</h1>
          <p className="text-slate-400 text-sm mt-1">We'll send you a reset link instantly</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

          {!sent ? (
            <form onSubmit={handleReset} className="flex flex-col gap-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
                />
              </div>

              {error && <p className="text-red-400 text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-2xl transition-all duration-200 text-sm disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-4"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle size={32} strokeWidth={1.5} className="text-emerald-400" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Check your inbox!</h3>
              <p className="text-slate-400 text-sm">
                We sent a password reset link to <span className="text-indigo-500 font-medium">{email}</span>
              </p>
            </motion.div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 text-slate-400 hover:text-indigo-500 text-sm transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}