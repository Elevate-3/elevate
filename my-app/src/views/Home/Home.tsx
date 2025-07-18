import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Instrument = {
  id: number
  name: string
}

function Home() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getInstruments()
  }, [])

  async function getInstruments() {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from('instruments').select('*')

      if (error) {
        console.error('Supabase error:', error)
        setError(`Database error: ${error.message}`)
        return
      }

      if (!data) {
        console.log('No data returned from Supabase')
        setError('No data returned from database')
        return
      }

      setInstruments(data || [])
    } catch (err) {
      console.error('Unexpected error:', err)
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log('Current session:', session) // Delete this later!
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={getInstruments}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Home Page!</h2>
        <p className="text-gray-600 mb-6">
          You are successfully authenticated and can access protected routes.
        </p>
        <p className="text-sm text-gray-500">
          Found {instruments.length} instruments in the database.
        </p>
      </div>

      {instruments.length === 0 ? (
        <div className="max-w-md mx-auto mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            No instruments found in the database.
            <br />
            Make sure your "instruments" table exists and has data.
          </p>
        </div>
      ) : (
        <ul className="max-w-md mx-auto mt-8 space-y-2">
          {instruments.map((instrument) => (
            <li
              key={instrument.id}
              className="bg-white shadow-md rounded-xl px-4 py-3 border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="font-medium">{instrument.name}</div>
              <div className="text-sm text-gray-500">ID: {instrument.id}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
