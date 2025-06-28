import './index.css'
import { useState, useEffect } from 'react'
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// Create Supabase client with explicit typing
const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  // Type session state as Session | null
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Get current session and set state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  } else {
    return <div>Logged in!</div>
  }
}
