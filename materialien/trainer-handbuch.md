# Trainer-Handbuch — "KI im Griff"

---

## Vorbereitung vor dem Workshop

### 1 Woche vorher
- [ ] **Gemini-API-Key (Paid-Tier)** anlegen + **Budget-Cap** setzen (siehe Abschnitt „Kosten & Budget")
- [ ] Laptop-Setup testen: `docker pull ghcr.io/intsanerarity/ki-lab:latest` + einmal starten
- [ ] CLI-Bundle bereitlegen (`gemini-ki-portable-mit-node.zip`, ab Tag 3) — USB oder Download-Link
- [ ] Fakten-Karten für Tag 2 ausdrucken und laminieren
- [ ] Zettel und Stifte für alle Raum-Aktivitäten vorbereiten

### 1 Tag vorher
- [ ] Auf jedem Laptop `docker pull ghcr.io/intsanerarity/ki-lab:latest` gezogen (oder Image per USB verteilt)
- [ ] App-Start auf einem frischen Gerät getestet: `docker run -d -p 3000:3000 --name ki-lab -e GEMINI_API_KEY=<KEY> ghcr.io/intsanerarity/ki-lab:latest` → http://localhost:3000
- [ ] Trainer-Key parat (wird beim `docker run` per `-e` übergeben — NICHT im Image)
- [ ] Für Tag 3+: Node.js + VS Code auf den Laptops vorhanden (eigene Schüler-Projekte)

---

## Kosten & Budget (Gemini)

**Die reinen Kosten sind winzig.** Bei ~15 Kindern × 5 Tagen und kurzen, kindgerechten Antworten
(die App begrenzt Output bereits auf 600–800 Token) liegt der ganze Workshop bei grob **$3–12**.
Modellpreis Gemini 2.5 Flash (Stand Aug 2026): ca. $0,30 Input / $2,50 Output je 1 Mio Token.

**Warum trotzdem Paid-Tier und nicht Free-Tier?** Nicht wegen des Preises, sondern wegen zwei Dingen:
1. **Rate-Limits:** Der Free-Tier erlaubt nur wenige Anfragen pro Minute — 15 Kinder gleichzeitig auf
   einem Key ergeben ständige „429 / Rate limit"-Fehler, der Chat hakt dauernd.
2. **Datenschutz:** Google darf **Free-Tier-Eingaben fürs Training nutzen**. Paid-Tier (und Vertex AI)
   **nicht**. Bei Kinder-Eingaben ist das der entscheidende Grund.

**So richtest du es ein (einmalig):**
1. In [Google AI Studio](https://aistudio.google.com/apikey) einen API-Key anlegen und das Projekt
   auf **Paid / Billing aktiviert** stellen (Kreditkarte beim verknüpften Google-Cloud-Projekt).
2. In der [Google Cloud Console](https://console.cloud.google.com/billing) → **Billing → Budgets &
   alerts** ein Budget anlegen, z.B. **$20/Monat**, mit E-Mail-Alert bei 50/90/100 %. Das ist dein
   Sicherheitsnetz — du wirst gewarnt, lange bevor etwas teuer wird.
3. **Ein Trainer-Key für alle.** Die Kinder tippen ihn nie selbst ab — du gibst ihn beim `docker run`
   per `-e GEMINI_API_KEY=…` mit (bzw. beim ersten CLI-Start). Kein eigener Key pro Kind.

> Hält sich die Nutzung im Rahmen, kostet der Workshop real wenige Dollar — der Budget-Cap sorgt
> dafür, dass es nie „aus Versehen" mehr wird.

---

## Tages-Zeitplan (je ~6 Stunden)

### Standardtag-Struktur
```
09:00 – 09:15  Ankommen, Laptops hochfahren
09:15 – 09:20  Kurzes Recap von gestern (ab Tag 2)
09:20 – 10:05  Whiteboard-Theorie
10:05 – 10:30  Raum-Aktivität
10:30 – 10:45  Pause + Snacks
10:45 – 12:30  Technik-Block Teil 1
12:30 – 13:15  Mittagspause
13:15 – 15:00  Technik-Block Teil 2
15:00 – 15:15  Pause
15:15 – 15:50  Gruppenarbeit / offene Zeit
15:50 – 16:00  Tages-Abschluss: Was haben wir heute gelernt?
```

### Tag 5 — Abweichung
```
09:00 – 09:20  Ankommen, Projekte aufbauen
09:20 – 09:40  Abschluss-Whiteboard (20 min)
09:40 – 11:30  Freie Projekt-Fertigstellung
11:30 – 12:00  Projekt-Galerie
12:00 – 12:30  Mittagspause
12:30 – 14:30  Präsentationen
14:30 – 14:45  Reflexionsrunde
14:45 – 15:00  Abschluss, Zertifikate
```

---

## Backup-Plan: Offline ohne API-Key

Wenn der API-Key nicht verfügbar ist oder kein Internet:

**Ollama installieren (Windows/Mac/Linux):**
```bash
# Windows: winget install Ollama.Ollama
# Mac:     brew install ollama
# Linux:   curl -fsSL https://ollama.ai/install.sh | sh

# Modell herunterladen (einmalig, ~4GB):
ollama pull llama3.2

# Starten:
ollama serve
```

**Workshop-App auf Ollama umstellen** (in `backend/.env`):
```
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```
*(Backend müsste entsprechend angepasst werden — separate Ollama-Route)*

**Wichtig:** Ollama-Modelle antworten auf Englisch und müssen per Prompt auf Deutsch gezwungen werden.
Die Antwortqualität ist etwas niedriger als Gemini Flash. (Der Ollama-Fallback ist optional und im
Backend noch nicht fertig verdrahtet — nur als Notnagel ohne Internet gedacht.)

---

## Häufige Fragen der Teilnehmer:innen

**"Kann KI das Internet hacken?"**
→ Nein. KI-Modelle haben selbst keinen Internet-Zugriff (außer es wird explizit eingebaut).
Das Modell das wir nutzen kennt nur Texte die beim Training dabei waren.

**"Wird KI uns alle Arbeitsplätze wegnehmen?"**
→ Ehrliche Antwort: Einige Jobs werden sich verändern, andere entstehen neu.
Historisch hat Technologie immer mehr Jobs geschaffen als vernichtet — aber nicht für alle gleich.
Das Wichtigste: verstehen wie KI funktioniert und sie als Werkzeug einsetzen können.

**"Hat KI ein Bewusstsein?"**
→ Nein, nach aktuellem Forschungsstand nicht. KI hat kein Bewusstsein, keine Gefühle, keine Wünsche.
Sie ist sehr gut darin, so zu klingen als ob — weil das im Training belohnt wurde.

**"Kann KI lügen?"**
→ Nein — KI hat keine Absichten. Sie halluziniert (produziert Falschinformationen) aber lügt nicht bewusst.

**"Welche KI ist die Beste?"**
→ Kommt auf den Anwendungsfall an. Gemini, ChatGPT, Claude — alle haben Stärken und Schwächen.
Wir nutzen Gemini, weil die API gut zugänglich ist und einen brauchbaren kostenlosen Einstieg hat.

---

## Wenn etwas schiefgeht

**App startet nicht:**
1. Läuft Docker Desktop (Wal grün)?
2. Container da? `docker ps` — wenn `ki-lab` fehlt: `docker start ki-lab` (oder neu `docker run …`).
3. Port 3000 belegt? Anderes Programm stoppen oder Container mit `-p 3001:3000` starten.

**Chat zeigt Fehler / „Trainer fragen":**
1. Key beim `docker run` per `-e GEMINI_API_KEY=…` übergeben? (`docker rm -f ki-lab` und neu starten)
2. Budget/Rate-Limit? → [Google AI Studio](https://aistudio.google.com/apikey) bzw. Cloud-Billing prüfen

**Ein Kind kommt nicht mit:**
→ Pair-Programming: setze zwei Kinder zusammen.
Das Schnellere erklärt dem Langsameren — beide lernen dabei.

**Zu schnelle Kinder:**
→ Bonus-Aufgaben in der App
→ Helfen bei anderen als "Junior Trainer"
→ Eigene Feature-Ideen für ihre App umsetzen

---

## Sicherheits-Hinweise

- API-Key nach dem Workshop rotieren ([Google AI Studio](https://aistudio.google.com/apikey) → Keys)
- Kinder sollen keine eigenen API-Keys anlegen (Kosten!)
- Eingaben der Kinder werden an Google gesendet — keine sensiblen/persönlichen Daten eingeben
  (Paid-Tier: Eingaben werden nicht fürs Training genutzt — siehe „Kosten & Budget")
- API-Key NIE ins Docker-Image bauen — immer nur per `-e GEMINI_API_KEY=…` beim Start; `.env` NICHT auf GitHub
