import { useState, useEffect } from 'react'

export default function PromptLab() {
  const [systemPrompt, setSystemPrompt] = useState('')
  const [userPrompt, setUserPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [saves, setSaves] = useState([])
  const [activeTab, setActiveTab] = useState('lab')

  useEffect(() => {
    if (activeTab === 'saves') loadSaves()
  }, [activeTab])

  async function run() {
    if (!userPrompt.trim()) return
    setLoading(true)
    setResult('')
    const res = await fetch('/api/promptlab/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, userPrompt }),
    })
    const data = await res.json()
    setResult(data.antwort || data.error || 'Fehler')
    setLoading(false)
  }

  async function save() {
    if (!saveName.trim() || !result) return
    await fetch('/api/promptlab/saves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: saveName, prompt: userPrompt, antwort: result }),
    })
    setSaveName('')
    loadSaves()
  }

  async function loadSaves() {
    const res = await fetch('/api/promptlab/saves')
    setSaves(await res.json())
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Prompt Lab</h1>
      <p className="text-gray-500 text-sm mb-6">Probiere verschiedene Prompts aus und vergleiche die Ergebnisse.</p>

      <div className="flex gap-2 mb-4">
        {['lab', 'saves'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t === 'lab' ? 'Prompt testen' : 'Gespeicherte'}
          </button>
        ))}
      </div>

      {activeTab === 'lab' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">System-Prompt (optional)</label>
            <textarea
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              placeholder='z.B. "Du bist ein freundlicher Koch der nur über Pasta spricht."'
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Dein Prompt</label>
            <textarea
              value={userPrompt}
              onChange={e => setUserPrompt(e.target.value)}
              placeholder="Was möchtest du die KI fragen?"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <button
            onClick={run}
            disabled={loading || !userPrompt.trim()}
            className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl px-5 py-2 text-sm font-medium transition-colors"
          >
            {loading ? 'Lädt...' : 'Prompt ausführen'}
          </button>

          {result && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="text-xs text-gray-400 mb-2 font-medium">KI-Antwort</div>
              <div className="text-sm text-gray-800 whitespace-pre-wrap">{result}</div>
              <div className="mt-3 flex gap-2 items-center">
                <input
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  placeholder='Name zum Speichern (z.B. "Version A")'
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-400"
                />
                <button
                  onClick={save}
                  disabled={!saveName.trim()}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-lg px-3 py-1.5 text-xs transition-colors"
                >
                  Speichern
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'saves' && (
        <div className="space-y-3">
          {saves.length === 0 && (
            <p className="text-gray-400 text-sm">Noch keine gespeicherten Prompts.</p>
          )}
          {saves.map(s => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm text-gray-800">{s.name}</span>
                <span className="text-xs text-gray-400">{s.erstellt_am?.slice(0, 16)}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2 bg-gray-50 rounded-lg px-3 py-2 font-mono">{s.prompt}</div>
              <div className="text-xs text-gray-700 whitespace-pre-wrap">{s.antwort}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
