import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DAY_LABELS = ['', 'KI verstehen', 'KI hinterfragen', 'Mit KI bauen', 'Daten & APIs', 'Finale']

export default function Dashboard() {
  const [progress, setProgress] = useState([])
  const name = localStorage.getItem('workshopName') || 'Du'

  useEffect(() => {
    fetch('/api/tasks/progress')
      .then(r => r.json())
      .then(setProgress)
      .catch(() => {})
  }, [])

  const total = progress.reduce((s, d) => s + d.total, 0)
  const done = progress.reduce((s, d) => s + d.done, 0)
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Hallo, {name}!</h1>
      <p className="text-gray-500 text-sm mb-6">Willkommen im KI Lab. Diese Woche lernst du KI zu verstehen, zu hinterfragen und damit zu bauen.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Gesamtfortschritt</span>
          <span className="text-sm text-gray-500">{done} / {total} Aufgaben</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">{pct}%</div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3, 4, 5].map(day => {
          const d = progress.find(p => p.day === day) || { total: 0, done: 0 }
          const dayPct = d.total ? Math.round((d.done / d.total) * 100) : 0
          const complete = d.total > 0 && d.done === d.total
          return (
            <Link
              key={day}
              to={`/aufgaben/${day}`}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-brand-400 hover:shadow-sm transition-all flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                complete ? 'bg-green-100 text-green-700' : 'bg-brand-50 text-brand-700'
              }`}>
                {complete ? '✓' : day}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 text-sm">Tag {day} — {DAY_LABELS[day]}</div>
                <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${complete ? 'bg-green-400' : 'bg-brand-400'}`}
                    style={{ width: `${dayPct}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-400">{d.done}/{d.total}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
