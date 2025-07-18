import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'

interface AuthPageProps {
  view: 'sign_in' | 'sign_up' | 'forgotten_password'
  title: string
  subtitle?: string | React.ReactNode
  links?: { text: string; to: string }[]
}

// Generic Auth component that can be used for signin, signup, and forgot password
function AuthPage({ view, title, subtitle, links }: AuthPageProps) {
  const { session, isLoading } = useSessionContext()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (session && !isLoading) {
      navigate('/', { replace: true })
    }
  }, [session, isLoading, navigate])

  // If user is already authenticated, don't show the auth form
  if (session) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="mt-8 space-y-6">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={['google', 'github']}
            view={view}
            showLinks={false}
            redirectTo={`${window.location.origin}/`}
          />
          {links && (
            <div className="text-center space-y-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="font-medium text-indigo-600 hover:text-indigo-500 block"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
