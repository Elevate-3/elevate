import { Link } from 'react-router-dom'
import AuthPage from './AuthPage'
import { FORGOT_PASSWORD, SIGN_IN } from '@/constants/routes'

function SignUp() {
  return (
    <AuthPage
      view="sign_up"
      title="Create your account"
      subtitle={
        <>
          Or {' '}
          <Link to={SIGN_IN} className="font-medium text-black hover:text-black">
          Sign in to your account.
          </Link>
        </>
      }
      links={[{ to: `${FORGOT_PASSWORD}`, text: 'Forgot your password?' }]}
    />
  )
}

export default SignUp
