import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { HOME, PROFILE, SIGN_IN, GUIDE } from '@/constants/routes'
import NavBar from '@/components/NavBar/NavBar'


const RootView: React.FC = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      navigate(SIGN_IN) // redirect after signout
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main layout component which will render for all children components within the <Outlet /> */}
      <header className="bg-gray-800 text-white p-4 flex justify-end items-center gap-4">
        <nav className="flex gap-4">
          <Link to={HOME}>Home</Link>
          <Link to={PROFILE}>Profile</Link> 
          <Link to={GUIDE}>Guide</Link>
        </nav>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </header>
      <NavBar />

      {/* Main content area where nested routes will be rendered which are out children routes from main.tsx */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default RootView
