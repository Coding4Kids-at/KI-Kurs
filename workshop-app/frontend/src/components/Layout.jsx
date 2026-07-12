import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import ChatSidebar from './ChatSidebar.jsx'

const NAV_DAYS = [
  { day: 1, label: 'Tag 1 — KI verstehen' },
  { day: 2, label: 'Tag 2 — KI hinterfragen' },
  { day: 3, label: 'Tag 3 — Mit KI bauen' },
  { day: 4, label: 'Tag 4 — Daten & APIs' },
  { day: 5, label: 'Tag 5 — Finale' },
]

export default function Layout() {
  const [name, setName] = useState(() => localStorage.getItem('workshopName') || '')
  const [showNamePrompt, setShowNamePrompt] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!name) setShowNamePrompt(true)
  }, [])

  function saveName(n) {
    const trimmed = n.trim()
    if (!trimmed) return
    localStorage.setItem('workshopName', trimmed)
    setName(trimmed)
    setShowNamePrompt(false)
  }

  if (showNamePrompt) {
    return <NamePrompt onSave={saveName} />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <div className="text-xs text-gray-400 uppercase tracking-wide">KI Lab</div>
          <div className="font-semibold text-gray-800 mt-0.5">{name}</div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
          <div className="pt-2 pb-1 px-2 text-xs text-gray-400 uppercase tracking-wide">Tage</div>
          {NAV_DAYS.map(({ day, label }) => (
            <NavLink key={day} to={`/aufgaben/${day}`} className={navClass}>
              {label}
            </NavLink>
          ))}
          <div className="pt-2 pb-1 px-2 text-xs text-gray-400 uppercase tracking-wide">Tools</div>
          <NavLink to="/prompt-lab" className={navClass}>Prompt Lab</NavLink>
          <NavLink to="/token-viz" className={navClass}>Token-Visualizer</NavLink>
          <NavLink to="/fehler-log" className={navClass}>Fehler-Log</NavLink>
        </nav>

        <div className="p-2 border-t border-gray-100">
          <button
            onClick={() => setChatOpen(o => !o)}
            className="w-full text-sm bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2 px-3 transition-colors"
          >
            {chatOpen ? 'Chat schliessen' : 'KI fragen'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>

      {/* Chat Sidebar */}
      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}
    </div>
  )
}

function navClass({ isActive }) {
  return `block px-3 py-1.5 rounded-lg text-sm transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
  }`
}

function NamePrompt({ onSave }) {
  const [value, setValue] = useState('')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Willkommen im KI Lab!</h1>
        <p className="text-gray-500 text-sm mb-6">Wie heißt du?</p>
        <input
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSave(value)}
          placeholder="Dein Name"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 mb-4"
        />
        <button
          onClick={() => onSave(value)}
          disabled={!value.trim()}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-lg py-2 text-sm font-medium transition-colors"
        >
          Los geht's
        </button>
      </div>
    </div>
  )
}
