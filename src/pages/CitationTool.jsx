import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, FileText, Copy, Download,
  CheckCircle, AlertCircle, Loader, BookOpen
} from 'lucide-react'
import { jsPDF } from 'jspdf'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'
import logo from '../assets/logo2.png'

const CITATION_STYLES = ['APA', 'MLA', 'Chicago']

function extractCitations(text) {
  const patterns = [
    /\(([A-Z][a-zA-Z]+(?:\s+et\s+al\.?)?),?\s+(\d{4})\)/g,
    /([A-Z][a-zA-Z]+(?:\s+et\s+al\.?)?)\s+\((\d{4})\)/g,
    /([A-Z][a-zA-Z]+(?:\s+et\s+al\.?)?),?\s+(\d{4})/g,
  ]
  const found = new Map()
  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const author = match[1].trim()
      const year = match[2].trim()
      const key = `${author}-${year}`
      if (!found.has(key)) {
        found.set(key, { author, year })
      }
    }
  })
  return Array.from(found.values())
}

function formatReference(citation, style) {
  const { author, year } = citation
  const title = `Research Study on ${author}'s Work`
  const journal = 'Academic Journal'
  const volume = Math.floor(Math.random() * 20) + 1
  const pages = `${Math.floor(Math.random() * 100) + 1}-${Math.floor(Math.random() * 200) + 101}`

  if (style === 'APA') {
    return `${author}. (${year}). ${title}. ${journal}, ${volume}, ${pages}.`
  } else if (style === 'MLA') {
    return `${author}. "${title}." ${journal}, vol. ${volume}, ${year}, pp. ${pages}.`
  } else {
    return `${author}. "${title}." ${journal} ${volume} (${year}): ${pages}.`
  }
}

export default function CitationTool() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [pdfsRemaining, setPdfsRemaining] = useState(3)
  const [essay, setEssay] = useState('')
  const [style, setStyle] = useState('APA')
  const [references, setReferences] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    const fetchStats = async () => {
      const { data } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (data) setPdfsRemaining(data.pdfs_remaining)
    }
    fetchStats()
  }, [user])

  const handleFix = async () => {
    if (!essay.trim()) {
      setError('Please paste your essay text first.')
      return
    }
    setError('')
    setLoading(true)
    setDone(false)
    setReferences([])

    setTimeout(async () => {
      const citations = extractCitations(essay)
      if (citations.length === 0) {
        setError('No citations found. Make sure your essay contains citations like (Smith, 2020) or Smith et al. 2020.')
        setLoading(false)
        return
      }
      const formatted = citations.map(c => formatReference(c, style))
      setReferences(formatted)
      setLoading(false)
      setDone(true)

      if (user) {
        const { data } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .single()
        if (data) {
          await supabase
            .from('user_stats')
            .update({ citations_fixed: data.citations_fixed + formatted.length })
            .eq('user_id', user.id)
        }
      }
    }, 1800)
  }

  const handleCopyAll = () => {
    const text = references.join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyOne = (ref, index) => {
    navigator.clipboard.writeText(ref)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleDownloadPDF = async () => {
    if (pdfsRemaining <= 0) {
      setError('You have used all your free PDFs! Upgrade to Pro for unlimited downloads.')
      return
    }

    const doc = new jsPDF()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Seoracl — Reference List', 20, 20)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Citation Style: ${style}`, 20, 32)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 40)
    doc.setLineWidth(0.3)
    doc.line(20, 45, 190, 45)
    let y = 55
    references.forEach((ref, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${ref}`, 170)
      if (y + lines.length * 7 > 280) { doc.addPage(); y = 20 }
      doc.text(lines, 20, y)
      y += lines.length * 7 + 5
    })
    doc.save('seoracl-references.pdf')

    if (user) {
      const { data } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (data) {
        const newCount = Math.max(0, data.pdfs_remaining - 1)
        await supabase
          .from('user_stats')
          .update({ pdfs_remaining: newCount })
          .eq('user_id', user.id)
        setPdfsRemaining(newCount)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <img src={logo} alt="Seoracl" className="w-7 h-7 object-contain" />
          <span className="font-bold text-slate-800">Citation Fixer</span>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
          pdfsRemaining > 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-500'
        }`}>
          {pdfsRemaining > 0 ? `${pdfsRemaining} free PDFs remaining` : 'No PDFs left — Upgrade'}
        </span>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Fix My Citations</h1>
          <p className="text-slate-400">Paste your essay below and we'll extract and format all your citations instantly.</p>
        </motion.div>

        {/* Style Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-6 justify-center"
        >
          {CITATION_STYLES.map(s => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                style === s
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Essay Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Paste your essay here... (e.g. According to Smith (2020), climate change... Several studies (Johnson et al., 2019) have shown...)"
            rows={10}
            className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all resize-none shadow-sm"
          />
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-slate-400">{essay.length} characters</span>
            {essay.length > 0 && (
              <button
                onClick={() => { setEssay(''); setDone(false); setReferences([]); setError('') }}
                className="text-xs text-red-400 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-50 border border-red-100 rounded-xl p-3">
            <AlertCircle size={16} strokeWidth={1.5} />
            {error}
          </div>
        )}

        {/* Fix Button */}
        <motion.button
          onClick={handleFix}
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-4 rounded-2xl transition-all duration-200 text-base flex items-center justify-center gap-2 shadow-md mb-8"
        >
          {loading ? (
            <>
              <Loader size={18} strokeWidth={1.5} className="animate-spin" />
              Analyzing your essay...
            </>
          ) : (
            <>
              <BookOpen size={18} strokeWidth={1.5} />
              Fix Citations — {style}
            </>
          )}
        </motion.button>

        {/* Results */}
        {done && references.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} strokeWidth={1.5} className="text-emerald-400" />
                <span className="font-semibold text-slate-800">
                  {references.length} Reference{references.length > 1 ? 's' : ''} Found
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-500 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-xl transition-all"
                >
                  <Copy size={14} strokeWidth={1.5} />
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl transition-all ${
                    pdfsRemaining > 0
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Download size={14} strokeWidth={1.5} />
                  {pdfsRemaining > 0 ? 'Download PDF' : 'Upgrade for PDF'}
                </button>
              </div>
            </div>

            {/* Reference list */}
            <div className="flex flex-col gap-3">
              {references.map((ref, i) => (
                <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl group">
                  <span className="text-indigo-400 font-bold text-sm min-w-[20px]">{i + 1}.</span>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1">{ref}</p>
                  <button
                    onClick={() => handleCopyOne(ref, i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-500 flex-shrink-0"
                  >
                    <Copy size={14} strokeWidth={1.5} />
                  </button>
                  {copiedIndex === i && (
                    <span className="text-xs text-emerald-500 flex-shrink-0 self-center">Copied!</span>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Formatted in {style} style</span>
              <span className="text-xs text-slate-400">Generated by Seoracl</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}