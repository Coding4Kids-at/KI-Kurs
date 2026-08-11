import { useState } from 'react'

// Farbpalette für Tokens
const COLORS = [
  'bg-red-100 text-red-800',
  'bg-orange-100 text-orange-800',
  'bg-yellow-100 text-yellow-800',
  'bg-green-100 text-green-800',
  'bg-teal-100 text-teal-800',
  'bg-blue-100 text-blue-800',
  'bg-indigo-100 text-indigo-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
]

// Einfache Client-seitige Tokenisierung (Annäherung an BPE).
// Gibt Objekte zurück: Teil-Tokens EINES Wortes teilen sich dieselbe group,
// damit man im UI sieht, wie ein Wort in mehrere Tokens zerfällt.
function tokenize(text) {
  if (!text) return []
  const out = []
  let i = 0
  let wordId = 0
  while (i < text.length) {
    const c = text[i]
    // Zahlen
    if (/\d/.test(c)) {
      let j = i
      while (j < text.length && /\d/.test(text[j])) j++
      out.push({ text: text.slice(i, j), kind: 'num', group: `n${i}` })
      i = j
      continue
    }
    // Buchstaben (inkl. Umlaute) — lange Wörter aufteilen (simuliert BPE)
    if (/\p{L}/u.test(c)) {
      let j = i
      while (j < text.length && /\p{L}/u.test(text[j])) j++
      const word = text.slice(i, j)
      const g = `w${wordId++}`
      if (word.length > 6) {
        const mid = Math.ceil(word.length / 2)
        out.push({ text: word.slice(0, mid), kind: 'word', group: g })
        out.push({ text: word.slice(mid), kind: 'word', group: g })
      } else {
        out.push({ text: word, kind: 'word', group: g })
      }
      i = j
      continue
    }
    // Whitespace
    if (/\s/.test(c)) {
      let j = i
      while (j < text.length && /\s/.test(text[j])) j++
      out.push({ text: text.slice(i, j), kind: 'space', group: `s${i}` })
      i = j
      continue
    }
    // Sonderzeichen einzeln
    out.push({ text: c, kind: 'sym', group: `y${i}` })
    i++
  }
  return out
}

// Aufeinanderfolgende Tokens derselben group zu einer Gruppe bündeln
// (ein Wort, das in mehrere Tokens zerfiel, wird EIN Pill mit Trennstrich).
function groupTokens(tokens) {
  const groups = []
  tokens.forEach((t, index) => {
    const last = groups[groups.length - 1]
    const tok = { ...t, index }
    if (last && last.group === t.group) last.tokens.push(tok)
    else groups.push({ group: t.group, kind: t.kind, tokens: [tok] })
  })
  return groups
}

const EXAMPLES = [
  'Hund',
  'Kindergarten',
  'KI ist toll',
  'The quick brown fox',
  'Donaudampfschiff',
]

export default function TokenViz() {
  const [text, setText] = useState('')

  const tokens = tokenize(text)
  const groups = groupTokens(tokens)
  const wordCount = groups.filter(g => g.kind === 'word').length
  const tokenCount = tokens.length

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Token-Visualizer</h1>
      <p className="text-gray-500 text-sm mb-2">
        KI liest keine Wörter — sie liest Tokens. Gib Text ein und sieh, wie er zerlegt wird.
      </p>
      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-6">
        Hinweis: Diese Darstellung ist eine vereinfachte Annäherung, keine exakte Tokenisierung. Der echte Tokenizer teilt etwas anders auf — der Effekt ist aber derselbe.
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        {EXAMPLES.map(e => (
          <button
            key={e}
            onClick={() => setText(e)}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          >
            {e}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Eigenen Text eingeben..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {tokenCount > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          {/* Wörter vs. Tokens — die Kernaussage */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
              <strong className="text-lg text-gray-900">{wordCount}</strong> {wordCount === 1 ? 'Wort' : 'Wörter'}
            </span>
            <span className="text-gray-300 text-xl">→</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-sm text-brand-700">
              <strong className="text-lg text-brand-700">{tokenCount}</strong> Tokens
            </span>
          </div>

          {/* Tokens: ein Wort = ein Pill; zerfällt es, zeigt der weiße Trennstrich die Token-Grenze */}
          <div className="flex flex-wrap items-start gap-x-2 gap-y-3 mb-5">
            {groups.map((g, gi) => {
              const split = g.kind === 'word' && g.tokens.length > 1
              return (
                <div key={gi} className="flex flex-col items-center gap-1">
                  {g.kind === 'space' ? (
                    <span className="inline-flex items-center rounded-md bg-gray-100 text-gray-400 border border-dashed border-gray-300 px-2 py-1 text-sm font-mono">
                      ␣
                    </span>
                  ) : (
                    <span className={`inline-flex rounded-lg ring-1 ring-black/10 overflow-hidden ${split ? 'shadow-sm' : ''}`}>
                      {g.tokens.map((t, ti) => (
                        <span
                          key={ti}
                          className={`px-2.5 py-1 text-sm font-mono ${COLORS[t.index % COLORS.length]} ${ti > 0 ? 'border-l-2 border-white' : ''}`}
                        >
                          {t.text}
                        </span>
                      ))}
                    </span>
                  )}
                  {split && (
                    <span className="text-[10px] text-gray-400 leading-none">1 Wort · {g.tokens.length} Tokens</span>
                  )}
                </div>
              )
            })}
          </div>

          <div className="border-t border-gray-100 pt-3 text-xs text-gray-500">
            <strong>Was bedeutet das?</strong> Die KI verarbeitet deinen Text nicht als Wörter oder Buchstaben,
            sondern als diese {tokenCount} Teile — jeder wird als Zahl gespeichert. Ein langes Wort wie
            „Donaudampfschiff" kann in mehrere Tokens zerfallen, und selbst das Leerzeichen (␣) ist ein eigenes Token.
            Längerer Text = mehr Tokens = mehr Kosten und mehr Kontext für die KI.
          </div>
        </div>
      )}
    </div>
  )
}
