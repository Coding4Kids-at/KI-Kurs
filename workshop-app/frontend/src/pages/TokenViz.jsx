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

// Einfache Client-seitige Tokenisierung (Annäherung an BPE)
// Keine echte Tokenizer-API nötig — für den pädagogischen Effekt ausreichend
function naiveTokenize(text) {
  if (!text) return []
  // Split auf Whitespace und Sonderzeichen, ähnlich wie GPT-Tokenizer
  const tokens = []
  let i = 0
  while (i < text.length) {
    // Zahlen
    if (/\d/.test(text[i])) {
      let j = i
      while (j < text.length && /\d/.test(text[j])) j++
      tokens.push(text.slice(i, j))
      i = j
      continue
    }
    // Buchstaben (inkl. Umlaute)
    if (/\p{L}/u.test(text[i])) {
      let j = i
      while (j < text.length && /\p{L}/u.test(text[j])) j++
      // Lange Wörter aufteilen (simuliert BPE)
      const word = text.slice(i, j)
      if (word.length > 6) {
        const mid = Math.ceil(word.length / 2)
        tokens.push(word.slice(0, mid))
        tokens.push(word.slice(mid))
      } else {
        tokens.push(word)
      }
      i = j
      continue
    }
    // Whitespace
    if (/\s/.test(text[i])) {
      let j = i
      while (j < text.length && /\s/.test(text[j])) j++
      tokens.push(text.slice(i, j))
      i = j
      continue
    }
    // Sonderzeichen einzeln
    tokens.push(text[i])
    i++
  }
  return tokens
}

const EXAMPLES = [
  'Hund',
  'Kindergarten',
  'KI ist toll',
  'The quick brown fox',
  'machine learning',
]

export default function TokenViz() {
  const [text, setText] = useState('')
  const [tokens, setTokens] = useState([])

  function visualize(input) {
    setText(input)
    setTokens(naiveTokenize(input))
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Token-Visualizer</h1>
      <p className="text-gray-500 text-sm mb-2">
        KI liest keine Wörter — sie liest Tokens. Gib Text ein und sieh wie er aufgeteilt wird.
      </p>
      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-6">
        Hinweis: Diese Darstellung ist eine vereinfachte Annäherung, keine exakte Tokenisierung. Der echte Tokenizer von Claude teilt etwas anders auf — der Effekt ist aber derselbe.
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        {EXAMPLES.map(e => (
          <button
            key={e}
            onClick={() => visualize(e)}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          >
            {e}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={e => visualize(e.target.value)}
          placeholder="Eigenen Text eingeben..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {tokens.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-3 font-medium">
            {tokens.length} Tokens
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {tokens.map((token, i) => (
              <span
                key={i}
                className={`inline-block rounded px-2 py-0.5 text-sm font-mono ${COLORS[i % COLORS.length]}`}
              >
                {token === ' ' ? '·' : token.replace(/ /g, '·')}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 text-xs text-gray-500">
            <strong>Was bedeutet das?</strong> Die KI verarbeitet deinen Text nicht als Wörter oder Buchstaben,
            sondern als diese {tokens.length} Teile. Jeder Teil wird als Zahl gespeichert.
            Längere Texte = mehr Tokens = mehr Kosten und mehr Kontext den die KI verarbeiten muss.
          </div>
        </div>
      )}
    </div>
  )
}
