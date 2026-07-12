import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

router.get('/day/:day', (req, res) => {
  const db = getDb()
  const tasks = db.prepare('SELECT * FROM tasks WHERE day = ? ORDER BY id').all(Number(req.params.day))
  res.json(tasks)
})

router.get('/progress', (req, res) => {
  const db = getDb()
  const rows = db.prepare(`
    SELECT day,
           COUNT(*) as total,
           SUM(completed) as done
    FROM tasks
    GROUP BY day
    ORDER BY day
  `).all()
  res.json(rows)
})

router.patch('/:id/complete', (req, res) => {
  const db = getDb()
  const { completed } = req.body
  db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(completed ? 1 : 0, req.params.id)
  res.json({ ok: true })
})

router.patch('/:id/answer', (req, res) => {
  const db = getDb()
  const { answer } = req.body
  db.prepare('UPDATE tasks SET answer = ? WHERE id = ?').run(answer ?? '', req.params.id)
  res.json({ ok: true })
})

export default router
