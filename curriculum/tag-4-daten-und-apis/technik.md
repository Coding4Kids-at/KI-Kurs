# Tag 4 — Technik-Block: "Mini-API + Projekt-Backend"

**Dauer:** ~3.5 Stunden (inkl. Pausen)  

---

## Schritt 1 — Öffentliche APIs erkunden (20 min)

Browser öffnen. Direkt in die URL-Zeile eingeben:

**Wetter-API (kein API-Key nötig):**
```
https://api.open-meteo.com/v1/forecast?latitude=47.8&longitude=12.2&current=temperature_2m,wind_speed_10m
```
→ Wetterdaten für Langkampfen/Kufstein live sehen.

**Was in der Antwort steht:**
JSON im Browser lesen. Wo ist die Temperatur? Wo ist der Wind?

**Weitere Test-APIs:**
```
https://catfact.ninja/fact        ← zufälliger Katzen-Fakt
https://api.quotable.io/random    ← zufälliges Zitat
```

Aufgabe: Aus der Wetter-API die aktuelle Temperatur ablesen und aufschreiben.

---

## Schritt 2 — Eigene Mini-API mit Node.js (60 min)

**KI als Coding-Partner einsetzen.**

Im KI-Chat:
```
Du bist ein erfahrener Node.js Entwickler.
Erstelle mir eine einfache Express.js API.
Die API soll:
- Auf Port 3001 laufen
- GET /api/witze → gibt zufälligen Witz aus einer Liste zurück
- GET /api/witze/alle → gibt alle Witze zurück
- POST /api/witze → nimmt einen neuen Witz entgegen (JSON body: {"text": "..."})
- Die Witze als Array im Code speichern (kein externe Datenbank nötig)
Installationsbefehl und Startbefehl mitliefern.
```

Code speichern als `witz-api/server.js`.

**Ausführen:**
```bash
npm init -y
npm install express
node server.js
```

**Testen im Browser:**
- `http://localhost:3001/api/witze` → funktioniert?
- `http://localhost:3001/api/witze/alle` → alle Witze sehen

---

## Schritt 3 — Datenbank hinzufügen (40 min)

Problem: API-Neustart → alle neuen Witze weg.

Im KI-Chat:
```
Passe die API an: Statt dem Array in-memory soll eine SQLite Datenbank
verwendet werden. Nutze das eingebaute node:sqlite Modul (Node.js 22+).
Beim ersten Start soll die DB erstellt und mit 3 Beispiel-Witzen befüllt werden.
POST /api/witze soll den neuen Witz in der DB speichern.
```

Erweiterung einbauen, testen:
1. Neuen Witz per POST hinzufügen
2. Server neu starten
3. GET /api/witze/alle → Witz ist noch da!

---

## Schritt 4 — Gemini API einbinden (40 min)

Das Schüler-Projekt bekommt ein Backend das die Gemini API nutzt.

Im `schuelerprojekt/` Ordner: Backend-Datei anlegen.

KI hilft beim Schreiben:
```
Erstelle eine einfache Node.js Express API.
POST /api/chat nimmt eine Nachricht entgegen.
Die Nachricht wird zusammen mit diesem System-Prompt an Gemini geschickt:
[SYSTEM-PROMPT VON GESTERN HIER EINFÜGEN]
Die Antwort wird als JSON zurückgegeben: {"antwort": "..."}
Gemini-Modell: gemini-2.5-flash
API-Key aus process.env.GEMINI_API_KEY
```

`.env` Datei erstellen:
```
GEMINI_API_KEY=AIzaSy-xxxxx
```
*(Trainer gibt Key aus)*

Testen: Nachricht an Backend schicken → KI-Antwort kommt zurück?

---

## Schritt 5 — Frontend + Backend verbinden (30 min)

Die HTML-Seite von Tag 3 mit dem neuen Backend verbinden.

Aufgabe für KI:
```
Passe meine HTML-Seite an: Statt Witze aus einem Array anzuzeigen,
soll die Seite beim Button-Klick einen Fetch-Request an
http://localhost:3001/api/chat schicken und die Antwort anzeigen.
Body des Requests: {"message": "Gib mir einen Witz"}
```

Testen: Button klicken → KI-Antwort erscheint auf der Seite.

---

## Ende des Tages

Jede:r hat:
- Eine eigene API die läuft
- Daten die nach Neustart erhalten bleiben
- Frontend das mit Backend kommuniziert

Ausblick: "Morgen ist Finale. Ihr habt 2 Stunden zum Fertigstellen — dann präsentiert ihr."
