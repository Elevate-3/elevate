import React, { useState, useEffect } from 'react'
import GuideCard from './components/GuideCard'
import './components/Guide.css'

interface GuideItem {
  id: string
  day: string
  title: string
  description: string
}

export default function Guides() {
  const [items, setItems] = useState<GuideItem[]>([])

  useEffect(() => {
    // 🚧 replace this stub with your AI fetch later!
    setItems([
      {
        id: 'intentions',
        day: 'DAY 1',
        title: 'Setting Your Intentions',
        description:
          'Learn how to set clear, achievable goals that align with your personal growth journey.',
      },
      {
        id: 'habits',
        day: 'DAY 2',
        title: 'Building Daily Habits',
        description:
          'Discover how small, consistent actions lead to significant transformation over time.',
      },
      {
        id: 'mind',
        day: 'DAY 3',
        title: 'Strengthening Mind',
        description:
          'What you do makes a difference, and you have to decide what kind of difference you want to make.',
      },
    ])
  }, [])

  return (
    <section className="guides-wrapper">
      <h2 className="guides-heading">Guide</h2>

      <div className="guides-grid">
        {items.map((e) => (
          <GuideCard key={e.id} day={e.day} title={e.title} description={e.description} />
        ))}
      </div>
    </section>
  )
}
