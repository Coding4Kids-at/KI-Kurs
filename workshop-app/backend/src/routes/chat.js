import { Router } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = Router()

const SYSTEM_PROMPT = `Du bist ein freundlicher KI-Assistent für den Coding4Kids Workshop "KI im Griff".
Die Teilnehmer:innen sind 12-16 Jahre alt und lernen diese Woche wie KI funktioniert.

Wichtig:
- Antworte immer auf Deutsch
- Erkläre Begriffe mit Alltagsbeispielen (kein Fachjargon ohne Erklärung)
- Wenn du etwas nicht mit Sicherheit weißt, sag das ehrlich und weise darauf hin
- Hilf beim Verstehen, gib keine fertigen Lösungen — stelle Gegenfragen wenn sinnvoll
- Wenn du auf Fehler in deinen eigenen Antworten hingewiesen wirst, erkenne das an
- Halte Antworten kurz: maximal 5-6 Sätze außer es wird mehr verlangt`

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

router.post('/stream', async (req, res) => {
  if (!genAI) {
    return res.status(503).json({
      error: 'Kein API-Key konfiguriert. Bitte den Trainer fragen.'
    })
  }

  const { messages } = req.body
  if (!messages?.length) {
    return res.status(400).json({ error: 'Keine Nachrichten angegeben.' })
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // Anthropic-Rollen (user/assistant) auf Gemini-Rollen (user/model) mappen
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const result = await model.generateContentStream({
      contents,
      generationConfig: { maxOutputTokens: 600 },
    })

    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    console.error('Gemini API Fehler:', error.message)
    res.write(`data: ${JSON.stringify({ error: 'KI konnte nicht antworten. Bitte nochmal versuchen.' })}\n\n`)
    res.end()
  }
})

export default router
