import { Link } from 'react-router-dom'
import AuthPage from './AuthPage'
import { FORGOT_PASSWORD, SIGN_UP } from '@/constants/routes'

function SignIn() {
  return (
    <AuthPage
      view="sign_in"
      title="Sign in to your account"
      subtitle={
        <>
          Or{' '}
          <Link to={SIGN_UP} className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </>
      }
      links={[{ to: `${FORGOT_PASSWORD}`, text: 'Forgot your password?' }]}
    />
  )
}

export default SignIn
