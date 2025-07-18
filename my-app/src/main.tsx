import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorView from './views/ErrorView/ErrorView'
import RootView from './views/RootView/RootView'
import Home from './views/Home/Home'
import Profile from './views/Profile/Profile'
import MultiStepForm from './views/MultiStepForm/MultiStepForm'
import AuthGuard from './components/AuthGuard/AuthGuard'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './lib/supabase'
import SignIn from './views/Auth/SignIn'
import './index.css'
import SignUp from './views/Auth/Signup'
import ForgotPassword from './views/Auth/ForgotPassword'
import { FORGOT_PASSWORD, FORM, HOME, PROFILE, SIGN_IN, SIGN_UP } from './constants/routes'

const container = document.getElementById('root')
if (!container) throw new Error('Root container missing in index.html')

const router = createBrowserRouter([
  {
    path: `${HOME}`,
    // The AuthGuard component checks if the user is authenticated which will then grant access to the children routes.
    element: (
      <AuthGuard>
        <RootView />
      </AuthGuard>
    ),
    // This will be shown if any route inside this path throws an error
    errorElement: <ErrorView />,
    // Children routes will be rendered inside RootView's <Outlet /> That's in the RouteView.tsx
    children: [
      { index: true, element: <Home /> }, // Default route when user visits '/'
      { path: `${HOME}`, element: <Home /> },
      { path: `${PROFILE}`, element: <Profile /> },
      { path: `${FORM}`, element: <MultiStepForm /> },
    ],
  },
  /// These routes are for authentication and will not be protected by the AuthGuard
  {
    path: `${SIGN_IN}`,
    element: <SignIn />,
  },
  {
    path: `${SIGN_UP}`,
    element: <SignUp />,
  },
  {
    path: `${FORGOT_PASSWORD}`,
    element: <ForgotPassword />,
  },
  {
    path: '*',
    element: <h2>404 Not Found</h2>,
  },
])

createRoot(container).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </StrictMode>
)
