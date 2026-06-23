import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Sparkles, AlertCircle,
  Loader, CheckCircle, ShieldCheck, ShieldAlert
} from 'lucide-react'
import logo from '../assets/logo2.png'

function analyzeAIContent(text) {
  const aiPhrases = [
    'it is important to note', 'in conclusion', 'furthermore', 'moreover',
    'it is worth noting', 'in today\'s world', 'in the realm of',
    'delve into', 'it is crucial', 'plays a crucial role',
    'in summary', 'to summarize', 'as mentioned above',
    'it goes without saying', 'needless to say', 'first and foremost',
    'last but not least', 'in light of', 'with regard to'
  ]
  const words = text.split(/\s+/).length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  let aiScore = 0
  let foundPhrases = []

  aiPhrases.forEach(phrase => {
    if (text.toLowerCase().includes(phrase)) {
      aiScore += 8
      foundPhrases.push(phrase)
    }
  })

  const avgSentenceLength = words / sentences.length
  if (avgSentenceLength > 25) aiScore += 15
  if (avgSentenceLength > 35) aiScore += 10

  const uniqueWords = new Set(text.toLowerCase().split(/\s+/))
  const lexicalDiversity = uniqueWords.size / words
  if (lexicalDiversity < 0.4) aiScore += 15

  aiScore = Math.min(aiScore, 95)
  aiScore = Math.max(aiScore, 3)

  return {
    score: Math.round(aiScore),
    wordCount: words,
    sentenceCount: sentences.length,
    avgSentenceLength: Math.round(avgSentenceLength),
    foundPhrases: foundPhrases.slice(0, 5),
    lexicalDiversity: Math.round(lexicalDiversity * 100)
  }
}

export default function AIReport() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    if (!text.trim()) {
      setError('Please paste your essay text first.')
      return
    }
    if (text.split(/\s+/).length < 50) {
      setError('Please paste at least 50 words for accurate analysis.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const analysis = analyzeAIContent(text)
      setResult(analysis)
      setLoading(false)
    }, 2000)
  }

  const getScoreColor = (score) => {
    if (score < 30) return 'text-emerald-500'
    if (score < 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score < 30) return 'bg-emerald-50 border-emerald-100'
    if (score < 60) return 'bg-amber-50 border-amber-100'
    return 'bg-red-50 border-red-100'
  }

  const getScoreLabel = (score) => {
    if (score < 30) return 'Likely Human Written'
    if (score < 60) return 'Mixed Content Detected'
    return 'Likely AI Generated'
  }

  const getScoreIcon = (score) => {
    if (score < 30) return <ShieldCheck size={28} strokeWidth={1.5} className="text-emerald-500" />
    return <ShieldAlert size={28} strokeWidth={1.5} className={score < 60 ? 'text-amber-500' : 'text-red-500'} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <nav className="relative z-10 flex items-center px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100 gap-3">
        <button onClick={() => navigate('/home')} className="text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
        <span className="font-bold text-slate-800">AI Writing Report</span>
        <span className="ml-auto text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-medium">Free — No API Cost</span>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Writing Report</h1>
          <p className="text-slate-400">Paste your essay and we'll detect AI-generated patterns instantly — no API needed.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your essay here (minimum 50 words)..."
            rows={10}
            className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all resize-none shadow-sm"
          />
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-slate-400">{text.split(/\s+/).filter(w => w).length} words</span>
            {text && (
              <button onClick={() => { setText(''); setResult(null) }} className="text-xs text-red-400 hover:text-red-500">Clear</button>
            )}
          </div>
        </motion.div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-50 border border-red-100 rounded-xl p-3">
            <AlertCircle size={16} strokeWidth={1.5} />
            {error}
          </div>
        )}

        <motion.button
          onClick={handleAnalyze}
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-4 rounded-2xl transition-all duration-200 text-base flex items-center justify-center gap-2 shadow-md mb-8"
        >
          {loading ? (
            <><Loader size={18} strokeWidth={1.5} className="animate-spin" />Analyzing writing patterns...</>
          ) : (
            <><Sparkles size={18} strokeWidth={1.5} />Analyze My Essay</>
          )}
        </motion.button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">

            {/* Score Card */}
            <div className={`bg-white rounded-2xl border shadow-sm p-6 ${getScoreBg(result.score)}`}>
              <div className="flex items-center gap-4">
                {getScoreIcon(result.score)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800">{getScoreLabel(result.score)}</span>
                    <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-2 rounded-full ${result.score < 30 ? 'bg-emerald-400' : result.score < 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">AI probability score</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Word Count', value: result.wordCount },
                { label: 'Sentences', value: result.sentenceCount },
                { label: 'Avg Sentence Length', value: `${result.avgSentenceLength} words` },
                { label: 'Vocabulary Diversity', value: `${result.lexicalDiversity}%` },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                  <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                  <p className="text-slate-800 font-bold text-lg">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* AI Phrases Found */}
            {result.foundPhrases.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <AlertCircle size={15} strokeWidth={1.5} className="text-amber-400" />
                  AI Phrases Detected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.foundPhrases.map((phrase, i) => (
                    <span key={i} className="text-xs bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full">
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <CheckCircle size={15} strokeWidth={1.5} className="text-indigo-400" />
                Recommendation
              </h3>
              <p className="text-slate-500 text-sm">
                {result.score < 30
                  ? 'Your writing appears to be human-written. Great job maintaining an authentic voice!'
                  : result.score < 60
                  ? 'Your writing shows some AI patterns. Consider varying your sentence structure and replacing common AI phrases with more personal language.'
                  : 'Your writing shows strong AI patterns. We recommend rewriting sections in your own voice, using personal examples, and varying sentence length significantly.'
                }
              </p>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  )
}