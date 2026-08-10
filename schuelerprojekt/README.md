# Mein KI-Bot — Starter-Template

Dieses Template ist der Ausgangspunkt für dein eigenes KI-Projekt.

## Was du hier baust

Einen spezialisierten Chatbot den du vollständig selbst konfigurierst.
Du entscheidest was dein Bot kann, wie er sich verhält und wie er aussieht.

## Mögliche Bot-Typen

- Film-Empfehler (fragt nach Stimmung und empfiehlt Filme)
- Rezept-Bot (gibt Rezepte basierend auf vorhandenen Zutaten)
- Quiz-Bot (erstellt Quizfragen zu beliebigen Themen)
- Fakten-Bot (erklärt beliebige Themen für Kinder)
- Witz-Bot
- Eigene Idee!

## Starten

```bash
# Abhängigkeiten installieren:
npm install

# API-Key eintragen in .env:
echo "GEMINI_API_KEY=AIzaSy-xxxxx" > .env

# Starten:
node server.js

# Browser öffnen:
open index.html
```

## Dateien

```
schuelerprojekt/
├── index.html    ← das Chat-Interface (hier kannst du alles anpassen)
├── server.js     ← das Backend das mit der Gemini API spricht
├── package.json
└── .env          ← API-Key (NICHT committen!)
```

## Anpassen

**System-Prompt ändern** (in `server.js`, Zeile ~10):
```js
const SYSTEM_PROMPT = `Du bist [DEINE ROLLE].
[DEINE REGELN].
Antworte immer auf Deutsch.`
```

**Aussehen ändern** (in `index.html`): Farben, Titel, Bilder — alles erlaubt.
