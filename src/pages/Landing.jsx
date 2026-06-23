import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, FileText, Sparkles, CheckCircle, Star, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import logo from '../assets/logo2.png'

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    { icon: FileText, title: 'Instant Citation Fixing', desc: 'Paste your essay and get a perfect APA, MLA or Chicago reference list in seconds.' },
    { icon: Sparkles, title: 'AI Writing Report', desc: 'Detect AI-generated content in your essay before your professor does.' },
    { icon: Zap, title: 'PDF Export', desc: 'Download a professional reference list PDF ready to submit.' },
    { icon: Shield, title: 'Privacy First', desc: 'Your essays are never stored. We only extract citations, nothing else.' },
    { icon: Clock, title: 'Save Hours', desc: 'What takes 2 hours manually takes 5 seconds with Seoracl.' },
    { icon: BookOpen, title: 'APA, MLA & Chicago', desc: 'All major citation formats supported with perfect formatting.' },
  ]

  const testimonials = [
    { name: 'Sarah K.', role: 'Harvard Student', text: 'Seoracl saved my thesis. I had 40 citations to format in APA and it did it in seconds!', stars: 5 },
    { name: 'James M.', role: 'PhD Researcher', text: 'The AI detection feature is incredible. Caught 3 AI phrases in my draft before submission.', stars: 5 },
    { name: 'Aisha R.', role: 'Undergraduate', text: 'Way easier than Zotero. I just paste and click. Done. My professor was impressed.', stars: 5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-sky-100 rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Seoracl" className="w-9 h-9 object-contain" />
          <span className="font-bold text-slate-800 text-xl">seoracl</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/style-guide')} className="text-slate-500 hover:text-slate-700 text-sm hidden sm:block transition-colors">Style Guide</button>
          <button onClick={() => navigate('/login')} className="text-slate-500 hover:text-slate-700 text-sm transition-colors">Sign In</button>
          <button onClick={() => navigate('/signup')} className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={13} className="text-indigo-500" strokeWidth={1.5} />
            <span className="text-indigo-600 text-xs font-semibold">AI-Powered Citation Tool</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Fix your citations<br />
            <span className="text-indigo-500">in 5 seconds.</span>
          </h1>
          <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Paste your essay → Select APA, MLA or Chicago → Get a perfect reference list instantly. No more failing grades for bad citations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 text-base"
            >
              Start for Free
              <ArrowRight size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-2xl transition-all border border-slate-200 text-base"
            >
              Sign In
            </button>
          </div>
          <p className="text-slate-400 text-sm mt-4">Free forever · No credit card required · 3 free PDFs</p>
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 max-w-2xl mx-auto text-left"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-300" />
            <div className="w-3 h-3 rounded-full bg-amber-300" />
            <div className="w-3 h-3 rounded-full bg-emerald-300" />
            <span className="text-slate-400 text-xs ml-2">seoracl.vercel.app/tool</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 mb-4 text-slate-500 text-sm">
            According to Smith (2020), climate change is accelerating. Several studies (Johnson et al., 2019) have shown significant impact...
          </div>
          <div className="flex gap-2 mb-4">
            {['APA', 'MLA', 'Chicago'].map(s => (
              <span key={s} className={`px-3 py-1 rounded-lg text-xs font-semibold ${s === 'APA' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{s}</span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {['Smith. (2020). Research Study. Academic Journal, 12, 45-67.', 'Johnson et al. (2019). Climate Impact Study. Nature, 8, 23-45.'].map((ref, i) => (
              <div key={i} className="flex gap-2 bg-indigo-50 rounded-lg p-3">
                <span className="text-indigo-400 font-bold text-xs">{i + 1}.</span>
                <span className="text-slate-600 text-xs">{ref}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 bg-white/60 backdrop-blur-md border-y border-slate-100 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: '10,000+', label: 'Citations Fixed' },
            { value: '2,500+', label: 'Students Helped' },
            { value: '4.9/5', label: 'Average Rating' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-bold text-indigo-500 mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Everything you need to cite perfectly</h2>
          <p className="text-slate-400">Built for students who want results, not complexity.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-indigo-100 transition-all"
              >
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={18} strokeWidth={1.5} className="text-indigo-500" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 bg-white/60 backdrop-blur-md border-y border-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Students love Seoracl</h2>
            <p className="text-slate-400">Join thousands of students citing smarter</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <img src={logo} alt="Seoracl" className="w-16 h-16 object-contain mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Ready to cite smarter?</h2>
          <p className="text-slate-400 mb-8">Join 2,500+ students who stopped worrying about citations.</p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 text-base"
          >
            Get Started — It's Free
          </button>
          <p className="text-slate-400 text-xs mt-4">No credit card · No signup hassle · Just paste and go</p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-100 bg-white/60 backdrop-blur-md py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Seoracl" className="w-6 h-6 object-contain" />
            <span className="font-semibold text-slate-600 text-sm">seoracl</span>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Support'].map(link => (
              <button key={link} className="text-slate-400 hover:text-slate-600 text-xs transition-colors">{link}</button>
            ))}
          </div>
          <p className="text-slate-400 text-xs">© 2026 Seoracl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}