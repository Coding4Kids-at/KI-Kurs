# Tag 4 — Raum-Aktivität: "Ich bin eine API!"

**Dauer:** 25 Minuten  
**Material:** Zettel für "Anfragen" und "Antworten", Stoppuhr  

---

## Ziel

APIs als Konzept körperlich begreifen — durch Rollenspiel.

---

## Rollen

**Server-Team (2-3 Personen):**
Bekommen eine "Datenbank" (ausgedruckte Tabelle mit Daten).
Antworten auf Anfragen nach fest definierten Regeln.

**Client-Team (Rest der Gruppe):**
Stellen schriftliche Anfragen an die API.
Bekommen Antworten zurück.

---

## Die "Datenbank" (vorbereiten)

```
WETTER-TABELLE:
Stadt       | Temperatur | Wetter     | Wind
------------|------------|------------|------
Wien        | 22         | sonnig     | 12
München     | 18         | bewölkt    | 8
Berlin      | 15         | Regen      | 20
Zürich      | 14         | Schnee     | 5
Hamburg     | 16         | bewölkt    | 25
```

---

## API-Endpunkte (Regeln für Server-Team)

```
GET /wetter?stadt=Wien
→ Antwort: {"stadt": "Wien", "temp": 22, "wetter": "sonnig"}

GET /wetter/alle
→ Antwort: alle 5 Einträge als JSON

GET /wetter?stadt=London
→ Antwort: {"fehler": "Stadt nicht gefunden", "code": 404}
```

Server-Team bekommt diese Regeln ausgedruckt.

---

## Ablauf

### Runde 1 — Normale Anfragen (8 min)

Clients schreiben Anfragen auf Zettel und übergeben sie dem Server-Team.
Server-Team sucht Antwort in Datenbank und schreibt JSON-Antwort zurück.

Beispiel-Anfragen die Clients stellen:
- `GET /wetter?stadt=Wien`
- `GET /wetter/alle`
- `GET /wetter?stadt=Paris`

Server-Team antwortet schnell und nach Regeln.

### Runde 2 — Fehlerhafte Anfragen (5 min)

Trainer sagt: "Stellt jetzt falsch formatierte Anfragen."
Clients versuchen die API zu verwirren:
- `BEKOMME /wetter wien` (falsches Format)
- `GET /temperatur?wo=Wien` (falscher Endpunkt)
- `GET /wetter?` (fehlender Parameter)

Server-Team antwortet immer: `{"fehler": "Ungültige Anfrage", "code": 400}`

Diskussion: Warum haben APIs strenge Regeln?

### Runde 3 — POST (Daten senden) (7 min)

Neues Szenario: Clients können neue Einträge hinzufügen.

```
POST /wetter
Body: {"stadt": "Salzburg", "temp": 19, "wetter": "sonnig"}
```

Server-Team schreibt den Eintrag in die Tabelle.
Nächste GET-Anfrage für Salzburg → funktioniert jetzt!

### Auswertung (5 min)

Fragen:
- Was war einfach? Was war schwierig?
- Was wäre wenn zwei Clients gleichzeitig schreiben?
- Was passiert wenn der Server abstürzt während er schreibt?

**Kernaussage:**
> Jede App die ihr kennt hat genau das — Server, Clients, Endpunkte, JSON.
> Instagram, TikTok, Netflix — alle funktionieren so.
