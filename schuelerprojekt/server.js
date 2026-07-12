import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'

const app = express()
app.use(cors())
app.use(express.json())

// =============================================================
// HIER DEINEN SYSTEM-PROMPT EINTRAGEN!
// Beschreibe wer dein Bot ist und was er tun soll.
// =============================================================
const SYSTEM_PROMPT = `Du bist ein hilfreicher Assistent.
Antworte immer auf Deutsch.
Wenn du etwas nicht weißt, sag das ehrlich.`
// =============================================================

app.post('/api/chat', async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: 'Kein API-Key. Schreib GEMINI_API_KEY in die .env Datei.' })
  }

  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'Nachricht fehlt.' })

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { maxOutputTokens: 500 },
  })
  const result = await model.generateContent(message)

  res.json({ antwort: result.response.text() })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Mein KI-Bot läuft auf http://localhost:${PORT}`)
})
