import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, FileText, GraduationCap } from 'lucide-react'
import logo from '../assets/logo2.png'

const styles = [
  {
    name: 'APA',
    fullName: 'American Psychological Association',
    icon: BookOpen,
    color: 'bg-indigo-50 text-indigo-500 border-indigo-100',
    usedFor: 'Psychology, Education, Social Sciences',
    format: 'Author, A. A. (Year). Title of work. Publisher.',
    example: 'Smith, J. D. (2020). Climate change and society. Academic Press.',
    rules: [
      'Author last name first, then initials',
      'Year in parentheses after author',
      'Title in sentence case (only first word capitalized)',
      'Journal name in italics',
      'Volume number in italics, issue in parentheses',
    ]
  },
  {
    name: 'MLA',
    fullName: 'Modern Language Association',
    icon: FileText,
    color: 'bg-emerald-50 text-emerald-500 border-emerald-100',
    usedFor: 'Literature, Arts, Humanities',
    format: 'Author Last, First. "Title." Journal, vol. #, year, pp. #-#.',
    example: 'Smith, John. "Climate Change Impact." Nature Journal, vol. 12, 2020, pp. 45-67.',
    rules: [
      'Author last name first, then full first name',
      'Article titles in quotation marks',
      'Book and journal titles in italics',
      'Year at end of citation',
      'Use "pp." for page numbers',
    ]
  },
  {
    name: 'Chicago',
    fullName: 'Chicago Manual of Style',
    icon: GraduationCap,
    color: 'bg-amber-50 text-amber-500 border-amber-100',
    usedFor: 'History, Arts, Humanities',
    format: 'Author Last, First. "Title." Journal Volume (Year): Pages.',
    example: 'Smith, John. "Climate Change Impact." Nature Journal 12 (2020): 45-67.',
    rules: [
      'Author last name first',
      'Article titles in quotation marks',
      'No "pp." before page numbers',
      'Year in parentheses after volume',
      'Two styles: Notes-Bibliography and Author-Date',
    ]
  },
]

export default function StyleGuide() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <nav className="relative z-10 flex items-center px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100 gap-3">
        <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
        <span className="font-bold text-slate-800">Citation Style Guide</span>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Citation Style Guide</h1>
          <p className="text-slate-400">Everything you need to know about APA, MLA and Chicago formatting.</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {styles.map((style, i) => {
            const Icon = style.icon
            return (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${style.color}`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 text-lg">{style.name}</h2>
                    <p className="text-slate-400 text-xs">{style.fullName}</p>
                  </div>
                  <span className="ml-auto text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{style.usedFor}</span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                  <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Format</p>
                  <p className="text-slate-600 text-sm font-mono">{style.format}</p>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-4 mb-5">
                  <p className="text-xs text-indigo-400 mb-1 font-medium uppercase tracking-wider">Example</p>
                  <p className="text-slate-700 text-sm">{style.example}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">Key Rules</p>
                  <div className="flex flex-col gap-2">
                    {style.rules.map((rule, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 flex-shrink-0" />
                        <p className="text-slate-600 text-sm">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/tool')}
                  className="mt-5 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-2xl text-sm transition-all"
                >
                  Fix My {style.name} Citations →
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}