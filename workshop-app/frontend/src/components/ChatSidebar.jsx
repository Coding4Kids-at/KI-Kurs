import { useState, useRef, useEffect } from 'react'

export default function ChatSidebar({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hallo! Ich bin dein KI-Assistent für diese Woche. Frag mich alles was du über KI wissen möchtest!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    const assistantMsg = { role: 'assistant', content: '' }
    setMessages([...history, assistantMsg])

    const apiMessages = history
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role, content: m.content }))

    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      setMessages(prev => {
        const next = [...prev]
        next[next.length - 1] = { role: 'assistant', content: err.error || 'Fehler beim Laden der Antwort.' }
        return next
      })
      setLoading(false)
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]') break
        const parsed = JSON.parse(data)
        if (parsed.text) {
          setMessages(prev => {
            const next = [...prev]
            next[next.length - 1] = {
              ...next[next.length - 1],
              content: next[next.length - 1].content + parsed.text,
            }
            return next
          })
        }
      }
    }

    setLoading(false)
  }

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-semibold text-sm text-gray-700">KI-Chat</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm rounded-xl px-3 py-2 max-w-[90%] whitespace-pre-wrap ${
            m.role === 'user'
              ? 'ml-auto bg-brand-600 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {m.content || <span className="opacity-50">...</span>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-gray-100 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Frage stellen..."
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-lg px-3 py-1.5 text-sm transition-colors"
        >
          &rarr;
        </button>
      </div>
    </aside>
  )
}
