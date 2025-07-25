import React from 'react'

interface GuideCardProps {
  day: string
  title: string
  description: string
}

export default function GuideCard({
  day,
  title,
  description,
}: GuideCardProps) {
  return (
    <div className="guide-card">
      <div>
        <span className="guide-day">{day}</span>
        <h3 className="guide-title">{title}</h3>
      </div>
      <p className="guide-description">{description}</p>
      <button className="guide-btn">View Guide</button>
    </div>
  )
}
