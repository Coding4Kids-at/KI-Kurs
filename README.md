# Coding 4 Kids — "KI im Griff: Verstehen, Hinterfragen, Bauen"

5-Tage Workshop für Jugendliche (12–16 Jahre).  
Von den Grundlagen moderner KI bis zum eigenen KI-gestützten Projekt.

---

## Ordnerstruktur

```
.
├── SPEC.md                          ← Vollständiges Konzept (5 Tage + App-Spec)
├── marketing/
│   └── kursbeschreibung.md          ← Marketing-Text für Website
├── curriculum/
│   ├── tag-1-ki-verstehen/
│   │   ├── whiteboard.md            ← Tafel-Skript für Trainer
│   │   ├── aktivitaet.md            ← Raum-Aktivität Anleitung
│   │   └── technik.md               ← Technik-Block Schritt für Schritt
│   ├── tag-2-ki-hinterfragen/       ← Halluzinationen, Bias, Fehler
│   ├── tag-3-mit-ki-bauen/          ← Prompting, System-Prompts, erster Code
│   ├── tag-4-daten-und-apis/        ← Daten, APIs, Backend
│   └── tag-5-finale/                ← Projektabschluss + Präsentation
├── workshop-app/                    ← "KI Lab" Lernplattform
│   ├── CLAUDE.md                    ← KI-Kontext für die App
│   ├── Dockerfile                   ← Multi-Stage Build
│   ├── backend/                     ← Node.js + Express + SQLite
│   ├── frontend/                    ← React 19 + Vite + Tailwind
│   └── k8s/                         ← Kubernetes YAML (optional)
├── schuelerprojekt/                 ← Starter-Template für eigene Chatbots
├── materialien/
│   ├── setup-guide.md               ← Laptop-Setup für Teilnehmer
│   ├── trainer-handbuch.md          ← Trainer-Leitfaden
│   └── prompt-vorlagen/             ← Fertige Prompts pro Tag
└── tasks/
    ├── plan.md                      ← Implementierungsplan (Phasen)
    └── todo.md                      ← Aufgaben-Checkliste
```

---

## Quick Start — Workshop-App lokal starten

```bash
# Dependencies installieren:
cd workshop-app
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Dev-Mode starten (2 Terminals):
# Terminal 1 (Backend):
cd backend && node src/server.js

# Terminal 2 (Frontend):
cd frontend && npm run dev

# Browser: http://localhost:5173
```

## Mit Docker starten

```bash
cd workshop-app

# Build:
docker build -t coding4kids/ki-lab:latest .

# Starten (ohne API Key — Chat zeigt Hinweis):
docker run -p 3000:3000 coding4kids/ki-lab:latest

# Starten (mit API Key):
docker run -p 3000:3000 -e GEMINI_API_KEY=AIzaSy-xxxxx coding4kids/ki-lab:latest

# Browser: http://localhost:3000
```

---

## Die 5 Tage auf einen Blick

| Tag | Thema | Raum-Aktivität | Technik | Endergebnis |
|-----|-------|---------------|---------|-------------|
| 1 | KI verstehen | Ich bin ein LLM! | Token-Visualizer + Kontext-Experimente | Eigene erste KI-Konversation |
| 2 | KI hinterfragen | Echt oder Erfunden? | Halluzinationen provozieren + Fehler-Log | Persönlicher KI-Fehler-Log |
| 3 | Mit KI bauen | Stille Post mit Prompts | Prompt Lab + erster Mini-Bot | Eigener spezialisierter Assistent |
| 4 | Daten & APIs | Ich bin eine API! | Mini-API + Datenbankanbindung | Projekt mit Backend |
| 5 | Finale | Projekt-Galerie | Finalisierung + Präsentation | Fertiges Projekt zum Mitnehmen |

---

## API Key einrichten

Die Workshop-App nutzt `gemini-2.5-flash` (schnelles, günstiges Gemini-Modell).
**Ein API-Key des Trainers** reicht für alle Kinder. Kostenlos unter https://aistudio.google.com/apikey.

```bash
# Lokal (Entwicklung):
echo "GEMINI_API_KEY=AIzaSy-xxxxx" > workshop-app/backend/.env

# Docker:
docker run -e GEMINI_API_KEY=AIzaSy-xxxxx ...

# Ohne Key: App startet, Chat zeigt "Trainer fragen"
```

Geschätzte Kosten für 5 Tage mit 15 Kindern: **$3-8 gesamt**.

---

## Lizenz

Dieses Material ist für den internen Einsatz im Coding4Kids Workshop erstellt.
