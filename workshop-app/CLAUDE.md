# CLAUDE.md — KI Lab Workshop-App

## Projektkontext
Das ist die "KI Lab" Workshop-App für das Coding4Kids Programm "KI im Griff".
Eine React + Node.js + SQLite Anwendung die im Workshop als Lernplattform dient.

## Tech Stack
- Frontend: React 19, Vite, Tailwind CSS 3.4 (kein Upgrade auf v4)
- Backend: Node.js (ESM), Express, `node:sqlite` (built-in, kein native-Dep)
- KI: Google Gemini API (`gemini-2.5-flash` — schnell + günstig)
- Port Backend: 3001, Port Frontend: 5173 (dev), Port Prod: 3000

## Wichtige Regeln
- API-Key NIEMALS im Code — immer aus `process.env.GEMINI_API_KEY`
- Tailwind CSS 3.4 — kein Upgrade auf v4 ohne explizite Entscheidung
- SQLite-Datei: `data/kilab.db` (Pfad via `DB_PATH` Env)
- Kinder sind die Nutzer (12-16 Jahre) — UI muss klar und fehlerverzeihend sein
- KI-Antworten immer auf Deutsch, kurz, mit Alltagsbeispielen

## Dateistruktur
```
workshop-app/
├── backend/src/
│   ├── server.js         (Express App, Einstiegspunkt)
│   ├── db.js             (SQLite Init + Seed)
│   └── routes/
│       ├── tasks.js      (Aufgaben CRUD)
│       ├── chat.js       (Claude API Streaming)
│       └── promptlab.js  (Prompt-Vergleiche speichern/laden)
├── frontend/src/
│   ├── App.jsx           (Router)
│   ├── components/
│   │   ├── Layout.jsx    (Nav + Chat Sidebar Toggle)
│   │   └── ChatSidebar.jsx (KI-Chat mit Streaming)
│   └── pages/
│       ├── Dashboard.jsx   (Fortschritts-Übersicht)
│       ├── Tasks.jsx       (Aufgaben pro Tag)
│       ├── PromptLab.jsx   (Prompt-Experimentierfeld)
│       ├── TokenViz.jsx    (Token-Visualizer)
│       └── FehlerLog.jsx   (KI-Fehler dokumentieren)
└── k8s/
    └── deployment.yaml   (optional — nicht K8s-Fokus dieses Kurses)
```

## Features der App
- **Aufgaben-Tracker** — Aufgaben pro Tag, abhaken, Fortschritt, Konfetti
- **KI-Chat** — SSE Streaming, System-Prompt kindgerecht, 503 ohne API Key
- **Prompt Lab** — Prompts eingeben, vergleichen, speichern (localStorage)
- **Token-Visualizer** — Text → Tokens farbig hervorheben (Claude Tokenizer API)
- **Fehler-Log** — KI-Fehler dokumentieren (Tabelle in SQLite)
- **Dashboard** — Gesamt-Fortschritt + 5 Tag-Karten

## Was Claude in diesem Projekt tut
- Frontend-Komponenten in React/Tailwind erweitern
- Backend-Routes hinzufügen
- Aufgaben-Seed in db.js ergänzen
- Nie: API Keys hardcoden, Tailwind v4 nutzen, Sicherheitsregeln brechen
