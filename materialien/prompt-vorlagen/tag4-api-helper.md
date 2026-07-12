# Prompt-Vorlagen — Tag 4: APIs und Backend

---

## Mini-API bauen

```
Du bist ein erfahrener Node.js Entwickler.
Erstelle mir eine einfache Express.js API.
Die API soll:
- Auf Port 3001 laufen
- GET /api/witze → gibt einen zufälligen Witz aus einer Liste zurück (JSON: {"witz": "..."})
- GET /api/witze/alle → gibt alle Witze zurück (JSON: [{"id": 1, "text": "..."}, ...])
- POST /api/witze → nimmt einen neuen Witz entgegen (Body: {"text": "..."})
- 5 Beispiel-Witze vorinstalliert als Array im Code
- CORS aktiviert damit ein Browser darauf zugreifen kann

Liefere mir:
1. Den vollständigen server.js Code
2. Den npm install Befehl
3. Den Start-Befehl
```

---

## Datenbank hinzufügen

```
Ich habe eine Node.js Express API die Witze in einem Array speichert.
Passe sie an: Statt dem Array soll eine SQLite Datenbank verwendet werden.
Nutze das eingebaute node:sqlite Modul (Node.js 22+, kein npm install nötig).
Beim ersten Start soll die DB erstellt und mit 3 Beispiel-Witzen befüllt werden.
POST /api/witze soll den neuen Witz in der DB speichern.
GET /api/witze/alle soll alle Witze aus der DB laden.
```

---

## Gemini API einbinden

```
Erstelle eine einfache Node.js Express API.
POST /api/chat nimmt eine Nachricht entgegen (Body: {"message": "..."}).
Die Nachricht wird mit diesem System-Prompt an Gemini geschickt:
"Du bist ein hilfreicher Assistent. Antworte auf Deutsch."
Die Antwort wird als JSON zurückgegeben: {"antwort": "..."}
Gemini-Modell: gemini-2.5-flash
API-Key aus process.env.GEMINI_API_KEY
npm-Paket: @google/generative-ai
```

---

## Frontend mit Backend verbinden

```
Ich habe eine HTML-Seite mit einem Chat-Interface.
Wenn der Nutzer einen Text eingibt und auf den Button klickt, soll:
1. Ein POST-Request an http://localhost:3002/api/chat geschickt werden
   Body: {"message": "der eingegebene Text"}
2. Die Antwort (JSON: {"antwort": "..."}) in der Seite angezeigt werden
3. Während des Ladens soll "..." angezeigt werden

Zeig mir wie ich das mit fetch() umsetze.
Gib mir nur den JavaScript-Code den ich in meine HTML-Seite einfügen kann.
```
