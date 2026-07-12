import { Router } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getDb } from '../db.js'

const router = Router()

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

// Einen Prompt auswerten
router.post('/run', async (req, res) => {
  if (!genAI) {
    return res.status(503).json({ error: 'Kein API-Key konfiguriert.' })
  }

  const { systemPrompt, userPrompt } = req.body
  if (!userPrompt) return res.status(400).json({ error: 'userPrompt fehlt.' })

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt || undefined,
      generationConfig: { maxOutputTokens: 800 },
    })
    const result = await model.generateContent(userPrompt)
    res.json({ antwort: result.response.text() })
  } catch (error) {
    console.error('Gemini API Fehler:', error.message)
    res.status(502).json({ error: 'KI konnte nicht antworten. Bitte nochmal versuchen.' })
  }
})

// Gespeicherte Prompts laden
router.get('/saves', (req, res) => {
  const db = getDb()
  const saves = db.prepare('SELECT * FROM prompt_lab_saves ORDER BY erstellt_am DESC LIMIT 50').all()
  res.json(saves)
})

// Prompt speichern
router.post('/saves', (req, res) => {
  const db = getDb()
  const { name, prompt, antwort } = req.body
  if (!name || !prompt || !antwort) return res.status(400).json({ error: 'name, prompt, antwort erforderlich.' })
  const result = db.prepare(
    'INSERT INTO prompt_lab_saves (name, prompt, antwort) VALUES (?, ?, ?)'
  ).run(name, prompt, antwort)
  res.json({ id: result.lastInsertRowid })
})

// Fehler-Log Einträge
router.get('/fehlerlog', (req, res) => {
  const db = getDb()
  const entries = db.prepare('SELECT * FROM fehler_log ORDER BY erstellt_am DESC').all()
  res.json(entries)
})

router.post('/fehlerlog', (req, res) => {
  const db = getDb()
  const { frage, ki_antwort, was_war_falsch, erkenntnis } = req.body
  if (!frage || !ki_antwort || !was_war_falsch || !erkenntnis) {
    return res.status(400).json({ error: 'Alle 4 Felder sind erforderlich.' })
  }
  const result = db.prepare(
    'INSERT INTO fehler_log (frage, ki_antwort, was_war_falsch, erkenntnis) VALUES (?, ?, ?, ?)'
  ).run(frage, ki_antwort, was_war_falsch, erkenntnis)
  res.json({ id: result.lastInsertRowid })
})

router.delete('/fehlerlog/:id', (req, res) => {
  const db = getDb()
  db.prepare('DELETE FROM fehler_log WHERE id = ?').run(Number(req.params.id))
  res.json({ ok: true })
})

export default router
