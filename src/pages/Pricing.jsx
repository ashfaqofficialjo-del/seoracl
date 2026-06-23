import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Zap, Star, Crown } from 'lucide-react'
import logo from '../assets/logo2.png'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Seoracl',
    icon: Zap,
    color: 'bg-slate-100 text-slate-500',
    features: [
      '3 PDF exports',
      'APA, MLA, Chicago formats',
      'Citation parser',
      'Copy references',
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    name: 'Pro',
    price: '$5',
    period: 'per month',
    description: 'For students who write regularly',
    icon: Star,
    color: 'bg-indigo-100 text-indigo-500',
    popular: true,
    features: [
      'Unlimited PDF exports',
      'APA, MLA, Chicago formats',
      'Citation parser',
      'AI Writing Report',
      'Citation history',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    disabled: false,
  },
  {
    name: 'Team',
    price: '$12',
    period: 'per month',
    description: 'For study groups and departments',
    icon: Crown,
    color: 'bg-amber-100 text-amber-500',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Shared citation library',
      'Admin dashboard',
      'Custom branding',
    ],
    cta: 'Coming Soon',
    disabled: true,
  },
]

export default function Pricing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
          <span className="font-bold text-slate-800">Pricing</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Simple, honest pricing</h1>
          <p className="text-slate-400 text-lg">No hidden fees. Cancel anytime.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-3xl border shadow-sm p-7 flex flex-col ${
                  plan.popular ? 'border-indigo-300 shadow-indigo-100 shadow-lg' : 'border-slate-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${plan.color}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">{plan.name}</h2>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-slate-400 text-sm mb-1">/{plan.period}</span>
                </div>
                <div className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <Check size={15} strokeWidth={2} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  disabled={plan.disabled}
                  className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm">
            Questions? Email us at{' '}
            <a href="mailto:support@seoracl.com" className="text-indigo-500 hover:underline">
              support@seoracl.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}