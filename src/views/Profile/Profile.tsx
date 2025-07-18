import { useSessionContext } from '@supabase/auth-helpers-react'

function Profile() {
  const { session } = useSessionContext()

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {session?.user?.email}
          </p>
          <p>
            <strong>User ID:</strong> {session?.user?.id}
          </p>
          <p>
            <strong>Created:</strong>{' '}
            {new Date(session?.user?.created_at || '').toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
