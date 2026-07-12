# CLAUDE.md — Coding 4 Kids: KI im Griff

## Projektkontext

Dieses Repository enthält den vollständigen 5-Tage-Workshop "KI im Griff: Verstehen, Hinterfragen, Bauen"
für das Coding4Kids Programm. Zielgruppe: Jugendliche zwischen 12 und 16 Jahren, keine Vorkenntnisse nötig.

## Projektstruktur

```
.
├── SPEC.md                          ← Vollständiges Konzept (5 Tage + App-Spec)
├── README.md                        ← Quick Start + Übersicht
├── marketing/
│   └── kursbeschreibung.md          ← Marketing-Text für Website
├── curriculum/
│   ├── tag-1-ki-verstehen/          ← Was ist KI? LLMs, Tokens, Training
│   ├── tag-2-ki-hinterfragen/       ← Halluzinationen, Bias, kritisches Denken
│   ├── tag-3-mit-ki-bauen/          ← Prompting, Kontext, eigene App bauen
│   ├── tag-4-daten-und-apis/        ← Daten, APIs, wie Systeme kommunizieren
│   └── tag-5-finale/                ← Projektabschluss + Präsentation
├── workshop-app/                    ← "KI Lab" Lernplattform
│   ├── CLAUDE.md
│   ├── Dockerfile
│   ├── backend/                     ← Node.js + Express + SQLite
│   ├── frontend/                    ← React 19 + Vite + Tailwind
│   └── k8s/                         ← Optional: K8s Deployment
├── schuelerprojekt/                 ← Starter-Template für eigenes Schüler-Chatbot-Projekt
├── materialien/
│   ├── setup-guide.md
│   ├── trainer-handbuch.md
│   └── prompt-vorlagen/             ← Fertige Prompts pro Tag
└── tasks/
    ├── plan.md
    └── todo.md
```

## Verhalten & Regeln

- Die Nutzer der Workshop-App sind Jugendliche (12–16) — UI muss klar und fehlerverzeihend sein
- KI-Antworten immer auf Deutsch, kurz, mit Alltagsbeispielen
- API-Keys NIEMALS im Code — nur über Umgebungsvariablen
- Tailwind CSS 3.4 — kein Upgrade auf v4 ohne explizite Entscheidung
- Der Workshop fokussiert KI-Verständnis + kritisches Denken — keine reine Technik-Schleife

## Workshop-App Stack

- Frontend: React 19, Vite, Tailwind CSS 3.4
- Backend: Node.js (ESM), Express, `node:sqlite` (Built-in, kein native-Dep-Problem)
- KI: Google Gemini API (`gemini-2.5-flash`)
- Port Frontend: 5173 (dev), Port Backend: 3001

## Was Claude in diesem Projekt tut

- Workshop-App weiterentwickeln (neue Features, Bugfixes)
- Curriculum-Dateien aktualisieren
- Prompt-Vorlagen ergänzen
- Nie: API Keys hardcoden, Technik ohne Lernkontext bauen
