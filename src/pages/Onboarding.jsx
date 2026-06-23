import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, BookOpen, FileText, ChevronRight, Sparkles } from 'lucide-react'
import logo from '../assets/logo2.png'

const steps = [
  {
    id: 1,
    question: "What best describes you?",
    subtitle: "Help us personalize your experience",
    options: [
      { label: "Undergraduate Student", icon: GraduationCap },
      { label: "Graduate / PhD Student", icon: BookOpen },
      { label: "Researcher", icon: FileText },
      { label: "Professional / Other", icon: Sparkles },
    ]
  },
  {
    id: 2,
    question: "Which citation style do you use most?",
    subtitle: "You can always change this later",
    options: [
      { label: "APA", icon: FileText },
      { label: "MLA", icon: BookOpen },
      { label: "Chicago", icon: GraduationCap },
      { label: "Not sure yet", icon: Sparkles },
    ]
  },
  {
    id: 3,
    question: "How often do you write academic papers?",
    subtitle: "We'll tailor your dashboard accordingly",
    options: [
      { label: "Every week", icon: Sparkles },
      { label: "A few times a month", icon: BookOpen },
      { label: "Once a semester", icon: GraduationCap },
      { label: "Just getting started", icon: FileText },
    ]
  }
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])

  const step = steps[currentStep]

  const handleSelect = (option) => {
    setSelected(option.label)
  }

  const handleNext = () => {
    if (!selected) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-40 blur-3xl" />
      </div>

      {/* Logo */}
      <motion.div
        className="flex items-center gap-2 mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img src={logo} alt="Seoracl" className="w-8 h-8 object-contain" />
        <span className="text-slate-700 font-semibold text-lg">seoracl</span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8 z-10">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full">
          <motion.div
            className="h-1.5 bg-indigo-400 rounded-full"
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 z-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-1">{step.question}</h2>
          <p className="text-slate-400 text-sm mb-6">{step.subtitle}</p>

          <div className="flex flex-col gap-3">
            {step.options.map((option) => {
              const Icon = option.icon
              const isSelected = selected === option.label
              return (
                <button
                  key={option.label}
                  onClick={() => handleSelect(option)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-indigo-100' : 'bg-slate-100'
                  }`}>
                    <Icon size={18} strokeWidth={1.5} className={isSelected ? 'text-indigo-500' : 'text-slate-400'} />
                  </div>
                  <span className="font-medium text-sm">{option.label}</span>
                </button>
              )
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={!selected}
            className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white font-semibold py-3 rounded-2xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            {currentStep < steps.length - 1 ? 'Continue' : 'Get Started'}
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}