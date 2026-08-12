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

## Schritt 2 — Eigene Mini-API mit der Gemini-CLI (60 min)

**Ab hier bauen wir mit der Gemini-CLI (Tag 3), nicht mit dem App-Chat.** Die CLI schreibt die Dateien
direkt in den Projektordner **und** kann `npm`/`node` selbst ausführen — der App-Chat kann nur antworten,
keinen Server anlegen. Die Kinder arbeiten im Bundle-Ordner aus Tag 3 (in VS Code geöffnet).

In der **Gemini-CLI** eingeben:
```
Erstelle im Unterordner witz-api eine Express.js API auf Port 3001. Routen:
- GET /            → kurzer Hinweistext mit allen verfügbaren Adressen
- GET /api/witze       → zufälliger Witz aus einer Liste
- GET /api/witze/alle  → alle Witze
- POST /api/witze      → neuer Witz {"text": "..."}
Witze als Array im Code. Lege package.json an, installiere express und starte
den Server danach.
```

Die CLI legt `witz-api/server.js` an, installiert und startet. Läuft er nicht: in der CLI `Starte den
Server.`

**Testen im Browser:**
- `http://localhost:3001/api/witze` → ein Witz?
- `http://localhost:3001/` → dein Hinweistext

> **„Cannot GET /" ist kein Fehler:** Der Server läuft, aber für die nackte Adresse `/` gibt es ohne Route
> nichts. Deshalb die **GET /-Startseite** und der Aufruf der echten `/api/...`-Adressen. Häufigster
> Stolperstein an Tag 4 — vorab ansagen.

---

## Schritt 3 — Datenbank hinzufügen (40 min)

Problem: API-Neustart → alle neuen Witze weg.

In der **Gemini-CLI**:
```
Ändere witz-api/server.js: Statt dem Array eine SQLite-Datenbank nutzen
(eingebautes Modul node:sqlite). Beim ersten Start die DB anlegen und mit 3
Beispiel-Witzen füllen. POST /api/witze speichert in die DB. Server neu starten.
```

Testen (ein POST geht **nicht** im Browser, der macht nur GET):
1. In der CLI: `Füge per Terminal-Befehl einen neuen Witz hinzu.` (sie nutzt `curl`)
2. Server stoppen (`Strg+C`) → neu starten
3. `http://localhost:3001/api/witze/alle` → Witz ist noch da!

---

## Schritt 4 — Gemini API einbinden (40 min)

Das Schüler-Projekt bekommt ein Backend, das die Gemini API nutzt.

In der **Gemini-CLI**:
```
Erstelle in meinem Projektordner ein Backend server.js (Express, Port 3001):
- GET /          → kurzer Hinweistext
- POST /api/chat → nimmt {"message": "..."}, schickt es mit meinem System-Prompt
  an Gemini (Modell gemini-2.5-flash, Key aus process.env.GEMINI_API_KEY) und
  gibt {"antwort": "..."} als JSON zurück.
Aktiviere CORS. Installiere die nötigen Pakete.
[SYSTEM-PROMPT VON TAG 3 ANHÄNGEN]
```

Key anlegen — in der CLI: `Erstelle eine .env mit GEMINI_API_KEY=[KEY-VOM-TRAINER].`
*(Trainer gibt Key aus. Der Key gehört NIE in den Code oder auf GitHub — nur in die `.env`.)*

Testen: in der CLI `Schick per Terminal-Befehl eine Test-Nachricht an /api/chat.` → KI-Antwort kommt?

> **CORS** wird gleich in Schritt 5 gebraucht, damit die Webseite das Backend überhaupt ansprechen darf.

---

## Schritt 5 — Frontend + Backend verbinden (30 min)

Die HTML-Seite von Tag 3 mit dem neuen Backend verbinden.

In der **Gemini-CLI**:
```
Öffne meine index.html und ändere sie: Beim Button-Klick per fetch einen POST an
http://localhost:3001/api/chat schicken (Body {"message": Text aus dem Eingabefeld})
und die KI-Antwort auf der Seite anzeigen.
```

Backend muss laufen (Schritt 4). Testen: Button klicken → KI-Antwort erscheint auf der Seite.

> **Kommt nichts an?** Checkliste: Läuft das Backend? Ist CORS aktiv (Schritt 4)? Die Browser-Konsole
> (`F12` → Console) zeigt den echten Fehler.

---

## Ende des Tages

Jede:r hat:
- Eine eigene API die läuft
- Daten die nach Neustart erhalten bleiben
- Frontend das mit Backend kommuniziert

Ausblick: "Morgen ist Finale. Ihr habt 2 Stunden zum Fertigstellen — dann präsentiert ihr."
