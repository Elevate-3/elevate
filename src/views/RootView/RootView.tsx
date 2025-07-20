import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { HOME, PROFILE, SIGN_IN, GUIDE } from '@/constants/routes'
import NavBar from '@/components/NavBar/NavBar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

  const profilePage = async () => {
    navigate(PROFILE) // redirect to profile page
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main layout component which will render for all children components within the <Outlet /> */}
      <header className="bg-gray-800 text-white p-4 flex justify-end items-center gap-4">
        <nav className="flex gap-4">
          <Link to={HOME}>Home</Link>
          <Link to={GUIDE}>Guide</Link>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={profilePage}>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
