# Plan — Coding 4 Kids: KI Lab App

**Ziel:** Workshop-App bauen die Kinder während des gesamten Workshops nutzen.  
**Stack:** React 19 + Vite + Tailwind | Node.js Express | SQLite | Claude API  
**Deployment:** Docker  

---

## Dependency-Graph

```
Phase 1: Foundation
  └── Backend API (Express + SQLite + node:sqlite)
  └── Frontend Shell (React + Vite + Tailwind)

Phase 2: Core Features
  └── [depends on Phase 1] Aufgaben-System (Tasks pro Tag)
  └── [depends on Phase 1] KI-Chat (Claude API Integration, SSE Streaming)

Phase 3: Workshop-spezifische Features
  └── [depends on Phase 1] Prompt Lab (Prompts testen + speichern)
  └── [depends on Phase 1] Token-Visualizer (Client-seitig)
  └── [depends on Phase 1] Fehler-Log (Halluzinationen dokumentieren)

Phase 4: Container & Deployment
  └── [depends on Phase 1-3] Dockerfile (Multi-stage Build)
  └── [depends on Phase 4.1] Optional: Kubernetes YAML

Phase 5: Schüler-Projekt
  └── [depends on Phase 1] Starter-Template (HTML + Backend)
  └── [depends on Phase 5.1] Dokumentation

Phase 6: Workshop-Materialien
  └── Prompt-Vorlagen pro Tag
  └── Trainer-Handbuch
  └── Setup-Guide
```

---

## Phase 1 — Foundation

### Task 1.1 — Backend Grundgerüst ✓
Express.js API mit SQLite aufsetzen.
- `GET /health` → `{ status: "ok", hasApiKey: bool }`
- `node:sqlite` (kein native-Dep-Problem)
- CORS für localhost:5173

### Task 1.2 — Frontend Shell ✓
React + Vite + Tailwind, Proxy-Konfiguration.
- Basis-Layout: Sidebar + Main Content
- Name-Prompt beim ersten Öffnen (localStorage)
- Navigation: Dashboard, Aufgaben (5 Tage), Prompt Lab, Token Viz, Fehler-Log

---

## Phase 2 — Core Features

### Task 2.1 — Aufgaben-System ✓
**Datenstruktur (SQLite):**
```
tasks: id, day, title, description, hint, solution, type, completed, answer
```
- 30 Aufgaben (5 Tage × 5 Pflicht + 1 Bonus) vorinstalliert
- PATCH /complete, PATCH /answer, GET /progress
- Konfetti bei Tag-Abschluss

### Task 2.2 — KI-Chat Integration ✓
- SSE Streaming
- System-Prompt kindgerecht, Workshop-Kontext
- 503 ohne API Key (klar erklärte Fehlermeldung)
- Model: `gemini-2.5-flash`

---

## Phase 3 — Workshop-spezifische Features

### Task 3.1 — Prompt Lab ✓
- POST /api/promptlab/run → Prompt auswerten
- GET/POST /api/promptlab/saves → Ergebnisse speichern
- Frontend: System-Prompt + User-Prompt + Ergebnis + Speichern

### Task 3.2 — Token-Visualizer ✓
- Client-seitig (naiver Tokenizer)
- Hinweis dass es eine Annäherung ist
- Beispiel-Buttons, eigene Eingabe

### Task 3.3 — Fehler-Log ✓
- SQLite-Tabelle: frage, ki_antwort, was_war_falsch, erkenntnis
- CRUD über API
- Frontend mit Formular + Liste

---

## Phase 4 — Container

### Task 4.1 — Dockerfile ✓
Multi-Stage Build, Node.js 22 Alpine, Port 3000.

### Task 4.2 — Kubernetes YAML (optional)
Für spätere Integration wenn Workshop mit K8s-Kurs kombiniert wird.

---

## Phase 5 — Schüler-Projekt

### Task 5.1 — Starter-Template ✓
- `index.html` mit Chat-Interface
- `server.js` mit Claude-Integration, anpassbarem System-Prompt
- README mit Anleitung

---

## Phase 6 — Materialien ✓

- `materialien/setup-guide.md`
- `materialien/trainer-handbuch.md`
- `materialien/prompt-vorlagen/tag1-5.md`

---

## Offene Punkte

- [ ] `package.json` im Root (für gemeinsamen Start beider Server) noch nicht erstellt
- [ ] Playwright-Tests noch nicht vorhanden
- [ ] Ollama-Integration als API-Key-Fallback (Backend-Branch)
- [ ] Docker-Image pushen und öffentlich machen (`coding4kids/ki-lab:latest`)
- [ ] K8s YAML für optionales Deployment
