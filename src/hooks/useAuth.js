import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (_event === 'SIGNED_IN' && currentUser) {
        const { data } = await supabase
          .from('user_stats')
          .select('user_id')
          .eq('user_id', currentUser.id)
          .single()
        if (!data) {
          setIsNewUser(true)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, isNewUser }
}