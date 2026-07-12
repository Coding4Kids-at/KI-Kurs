# Tag 4 — Whiteboard-Skript: "Wie echte Software tickt"

**Dauer:** 40 Minuten  

---

## Einstieg (5 min)

Recap Tag 3: "Wer zeigt kurz seinen Bot?"
2-3 Personen präsentieren ihren System-Prompt.

Frage: "Euer Bot antwortet jetzt. Aber was passiert wenn ihr die Seite schließt und neu öffnet?"
→ Alles weg. Kein Gedächtnis.

"Heute lernen wir wie Software Daten dauerhaft speichert."

---

## Block 1 — Datenbanken (12 min)

**An die Tafel:**
```
RAM (Arbeitsspeicher):
→ schnell, temporär — weg wenn Programm endet

Datenbank:
→ dauerhaft, strukturiert — bleibt auch nach Neustart
```

**Analogie:**
- RAM = Notizzettel auf dem Schreibtisch (weg wenn du nach Hause gehst)
- Datenbank = Ordner im Regal (bleibt über Nacht)

**Tabellenstruktur zeichnen:**
```
Tabelle: nachrichten
┌────┬──────────┬────────────────────────┬────────────────────┐
│ id │ nutzer   │ text                   │ datum              │
├────┼──────────┼────────────────────────┼────────────────────┤
│ 1  │ "Anna"   │ "Was ist ein Token?"   │ 2026-05-18 10:23   │
│ 2  │ "Ben"    │ "Halluzination?"       │ 2026-05-18 10:31   │
│ 3  │ "Anna"   │ "Danke!"               │ 2026-05-18 10:35   │
└────┴──────────┴────────────────────────┴────────────────────┘
```

SQL vereinfacht (kein tiefer Dive):
```sql
SELECT * FROM nachrichten WHERE nutzer = "Anna"
-- gibt alle Nachrichten von Anna zurück
```

---

## Block 2 — Was ist eine API? (13 min)

**An die Tafel — Restaurant-Analogie:**
```
Ich (Client) → bestelle beim Kellner (API) → Küche (Server/Datenbank)
            ← bekomme Essen (Antwort) ←
```

Ohne API: Ich gehe direkt in die Küche. Chaos.
Mit API: Definierter Eingang mit klaren Regeln.

**HTTP Methoden:**
```
GET   → Daten abrufen (Menükarte lesen)
POST  → Daten senden  (Bestellung aufgeben)
```

**JSON erklärt:**
```json
{
  "witz": "Warum können Geister so schlecht lügen? Weil man durch sie hindurchsieht.",
  "kategorie": "Kinder",
  "bewertung": 4.2
}
```
→ JSON = strukturiertes Text-Format. Jede API spricht JSON.

**URL-Anatomie:**
```
https://api.example.com/v1/witze?kategorie=kinder

https://         → Protokoll (verschlüsselt)
api.example.com  → Server-Adresse
/v1/witze        → Endpunkt (was will ich?)
?kategorie=kinder→ Parameter (wie gefiltert?)
```

---

## Block 3 — Wie die Gemini API funktioniert (10 min)

**An die Tafel:**
```
Eure App → POST /api/chat → Euer Backend → POST generativelanguage.googleapis.com → Gemini
        ←  Antwort (Text) ←              ← Antwort (JSON)                         ←
```

**Was im POST-Body steht:**
```json
{
  "contents": [
    {"role": "user", "parts": [{"text": "Was ist ein Token?"}]}
  ]
}
```

→ Das ist alles. Kein Geheimnis. Jede KI-App macht genau das.

---

## Überleitung zur Aktivität

"Jetzt werdet ihr selbst zu einer API — damit ihr es wirklich versteht."
