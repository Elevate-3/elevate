import { SIGN_IN, SIGN_UP } from '@/constants/routes'
import AuthPage from './AuthPage'

function ForgotPassword() {
  return (
    <AuthPage
      view="forgotten_password"
      title="Reset your password"
      subtitle="Enter your email address."
      links={[
        { to: `${SIGN_IN}`, text: 'Back to Sign In ' },
        { to: `${SIGN_UP}`, text: "Don't have an account? Sign up" },
      ]}
    />
  )
}

export default ForgotPassword
