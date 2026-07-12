import { useState, useEffect } from 'react'

export default function FehlerLog() {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({ frage: '', ki_antwort: '', was_war_falsch: '', erkenntnis: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch('/api/promptlab/fehlerlog')
    setEntries(await res.json())
  }

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function submit() {
    if (!form.frage || !form.ki_antwort || !form.was_war_falsch || !form.erkenntnis) return
    await fetch('/api/promptlab/fehlerlog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ frage: '', ki_antwort: '', was_war_falsch: '', erkenntnis: '' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    load()
  }

  async function deleteEntry(id) {
    await fetch(`/api/promptlab/fehlerlog/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Fehler-Log</h1>
      <p className="text-gray-500 text-sm mb-6">
        Dokumentiere KI-Fehler die du entdeckt hast. Das schärft deinen kritischen Blick.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 space-y-3">
        <h2 className="font-semibold text-sm text-gray-700">Neuer Eintrag</h2>
        {[
          { key: 'frage', label: 'Was hast du gefragt?', placeholder: 'Deine Frage an die KI' },
          { key: 'ki_antwort', label: 'Was hat die KI geantwortet?', placeholder: 'Die KI-Antwort' },
          { key: 'was_war_falsch', label: 'Was war falsch?', placeholder: 'Der konkrete Fehler' },
          { key: 'erkenntnis', label: 'Wie hätte man es merken können?', placeholder: 'Deine Erkenntnis' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <textarea
              value={form[key]}
              onChange={e => setField(key, e.target.value)}
              placeholder={placeholder}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand-400"
            />
          </div>
        ))}
        <button
          onClick={submit}
          disabled={!form.frage || !form.ki_antwort || !form.was_war_falsch || !form.erkenntnis}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          {saved ? 'Gespeichert ✓' : 'Eintrag hinzufügen'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{entries.length} Einträge</div>
        {entries.length === 0 && (
          <p className="text-gray-400 text-sm">Noch keine Einträge. Fang an KI-Fehler zu provozieren!</p>
        )}
        {entries.map(e => (
          <div key={e.id} className="bg-white border border-red-100 rounded-xl p-4 relative">
            <button
              onClick={() => deleteEntry(e.id)}
              className="absolute top-3 right-3 text-gray-300 hover:text-red-400 text-sm leading-none"
            >
              &times;
            </button>
            <div className="text-xs text-gray-400 mb-2">{e.erstellt_am?.slice(0, 16)}</div>
            <div className="space-y-2">
              <Row label="Frage" value={e.frage} />
              <Row label="KI-Antwort" value={e.ki_antwort} color="text-red-700" />
              <Row label="Was war falsch" value={e.was_war_falsch} />
              <Row label="Erkenntnis" value={e.erkenntnis} color="text-green-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Row({ label, value, color = 'text-gray-700' }) {
  return (
    <div>
      <span className="text-xs text-gray-400 font-medium">{label}: </span>
      <span className={`text-xs ${color}`}>{value}</span>
    </div>
  )
}
