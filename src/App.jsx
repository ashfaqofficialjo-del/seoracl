import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import SplashScreen from './pages/SplashScreen'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import CitationTool from './pages/CitationTool'
import ForgotPassword from './pages/ForgotPassword'
import Pricing from './pages/Pricing'
import Profile from './pages/Profile'
import History from './pages/History'
import AIReport from './pages/AIReport'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
  return user ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return !user ? children : <Navigate to="/home" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/tool" element={<ProtectedRoute><CitationTool /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/ai-report" element={<ProtectedRoute><AIReport /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App