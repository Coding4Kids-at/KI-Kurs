import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const DAY_LABELS = ['', 'KI verstehen', 'KI hinterfragen', 'Mit KI bauen', 'Daten & APIs', 'Finale']

export default function Tasks() {
  const { day } = useParams()
  const [tasks, setTasks] = useState([])
  const [openHints, setOpenHints] = useState({})
  const [answers, setAnswers] = useState({})
  const [saved, setSaved] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    fetch(`/api/tasks/day/${day}`)
      .then(r => r.json())
      .then(data => {
        setTasks(data)
        const a = {}
        data.forEach(t => { a[t.id] = t.answer || '' })
        setAnswers(a)
      })
  }, [day])

  function toggleComplete(task) {
    const next = !task.completed
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: next ? 1 : 0 } : t))
    fetch(`/api/tasks/${task.id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: next }),
    })
    if (next) {
      const allRequired = tasks.filter(t => t.type === 'required')
      const allDone = allRequired.every(t => t.id === task.id ? true : t.completed)
      if (allDone) setShowConfetti(true)
    }
  }

  function saveAnswer(id) {
    fetch(`/api/tasks/${id}/answer`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: answers[id] }),
    })
    setSaved(prev => ({ ...prev, [id]: true }))
    setTimeout(() => setSaved(prev => ({ ...prev, [id]: false })), 2000)
  }

  const required = tasks.filter(t => t.type === 'required')
  const bonus = tasks.filter(t => t.type === 'bonus')

  return (
    <div className="max-w-2xl">
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50" onClick={() => setShowConfetti(false)}>
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-xl font-bold text-gray-800">Tag {day} geschafft!</div>
            <div className="text-gray-500 text-sm mt-1">Alle Pflichtaufgaben erledigt.</div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-1">Tag {day} — {DAY_LABELS[day]}</h1>
      <p className="text-gray-500 text-sm mb-6">{required.filter(t => t.completed).length} von {required.length} Pflichtaufgaben erledigt</p>

      <div className="space-y-3 mb-8">
        {required.map(task => <TaskCard key={task.id} task={task} openHints={openHints} setOpenHints={setOpenHints} answers={answers} setAnswers={setAnswers} saved={saved} onToggle={toggleComplete} onSaveAnswer={saveAnswer} />)}
      </div>

      {bonus.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Bonus-Aufgaben</h2>
          <div className="space-y-3">
            {bonus.map(task => <TaskCard key={task.id} task={task} openHints={openHints} setOpenHints={setOpenHints} answers={answers} setAnswers={setAnswers} saved={saved} onToggle={toggleComplete} onSaveAnswer={saveAnswer} />)}
          </div>
        </>
      )}
    </div>
  )
}

function TaskCard({ task, openHints, setOpenHints, answers, setAnswers, saved, onToggle, onSaveAnswer }) {
  const done = !!task.completed
  return (
    <div className={`bg-white rounded-xl border p-4 transition-all ${done ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task)}
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
            done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-brand-400'
          }`}
        >
          {done && <span className="text-xs leading-none">✓</span>}
        </button>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</div>
          <div className="text-gray-500 text-xs mt-0.5 whitespace-pre-line">{task.description}</div>

          {task.hint && (
            <div className="mt-2">
              <button
                onClick={() => setOpenHints(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                className="text-xs text-brand-600 hover:underline"
              >
                {openHints[task.id] ? 'Hinweis ausblenden' : 'Hinweis anzeigen'}
              </button>
              {openHints[task.id] && (
                <div className="mt-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 whitespace-pre-line">
                  {task.hint}
                </div>
              )}
            </div>
          )}

          <div className="mt-2">
            <textarea
              value={answers[task.id] || ''}
              onChange={e => setAnswers(prev => ({ ...prev, [task.id]: e.target.value }))}
              placeholder="Deine Beobachtung / Antwort..."
              rows={2}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
            />
            <button
              onClick={() => onSaveAnswer(task.id)}
              className="text-xs text-brand-600 hover:underline mt-1"
            >
              {saved[task.id] ? 'Gespeichert ✓' : 'Speichern'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
