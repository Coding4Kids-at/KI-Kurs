import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getDb } from './db.js'
import tasksRouter from './routes/tasks.js'
import chatRouter from './routes/chat.js'
import promptLabRouter from './routes/promptlab.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }))
app.use(express.json())

// init DB on startup
getDb()

app.use('/api/tasks', tasksRouter)
app.use('/api/chat', chatRouter)
app.use('/api/promptlab', promptLabRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.GEMINI_API_KEY })
})

// serve frontend in production (Docker): built frontend lives at /app/public,
// server.js at /app/src -> one level up.
const publicDir = path.join(__dirname, '..', 'public')
app.use(express.static(publicDir))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next()
  }
  res.sendFile(path.join(publicDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`KI Lab Backend läuft auf Port ${PORT}`)
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY nicht gesetzt — Chat zeigt Hinweis')
  }
})
