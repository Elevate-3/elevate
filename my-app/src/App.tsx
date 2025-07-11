import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// 👇 Define the expected shape of your data from the "instruments" table
type Instrument = {
  id: number
  name: string
  // add more fields if your table has them there
}

// 👇 Create a Supabase client (type is inferred)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
)

function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([])

  useEffect(() => {
    getInstruments()
  }, [])

  async function getInstruments() {
    const { data, error } = await supabase.from('instruments').select()

    if (error) {
      console.error('Error fetching instruments:', error)
      return
    }

    setInstruments(data || [])
  }

  return (
    <ul className="max-w-md mx-auto mt-8 space-y-2">
      {instruments.map((instrument) => (
        <li
          key={instrument.id}
          className="bg-white shadow-md rounded-xl px-4 py-3 border border-gray-200 hover:bg-gray-50 transition"
        >
          {instrument.name}
        </li>
      ))}
    </ul>
  )
}

export default App
