import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { SIGN_IN } from '@/constants/routes'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { session, isLoading } = useSessionContext()
  const navigate = useNavigate()

  // If the user is not signed in and authenticated redirect them to the login page
  useEffect(() => {
    if (!isLoading && !session) {
      navigate(SIGN_IN, { replace: true })
    }
  }, [session, isLoading, navigate])

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // If no session and not loading, redirect is happening
  if (!session) {
    return null
  }

  // If the user is logged in and authenticated, render the children components
  return <>{children}</>
}
