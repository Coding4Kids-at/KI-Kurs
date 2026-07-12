# Trainer-Handbuch — "KI im Griff"

---

## Vorbereitung vor dem Workshop

### 1 Woche vorher
- [ ] Laptop-Setup testen (Node.js, npm install, App starten)
- [ ] Anthropic API-Key besorgen und auf Budget-Limit prüfen ($10-20 reicht)
- [ ] Fakten-Karten für Tag 2 ausdrucken und laminieren
- [ ] Zettel und Stifte für alle Raum-Aktivitäten vorbereiten

### 1 Tag vorher
- [ ] App auf allen Teilnehmer-Laptops installieren oder Netzwerk-Distribution testen
- [ ] `.env` mit API-Key auf allen Geräten einrichten
- [ ] App-Start testen auf einem frischen Gerät
- [ ] Backup-Plan ohne Internet: Ollama lokal einrichten (siehe unten)

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
Die Antwortqualität ist etwas niedriger als Claude Haiku.

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
→ Kommt auf den Anwendungsfall an. Claude, ChatGPT, Gemini — alle haben Stärken und Schwächen.
Wir nutzen Claude weil wir damit entwickeln und die API gut zugänglich ist.

---

## Wenn etwas schiefgeht

**App startet nicht:**
1. Sind beide Terminals gestartet (Backend + Frontend)?
2. `npm install` ausgeführt?
3. Läuft ein anderes Programm auf Port 3001 oder 5173?

**Chat zeigt Fehler:**
1. API-Key korrekt in `.env` eingetragen?
2. Budget nicht überschritten? → Anthropic Console prüfen

**Ein Kind kommt nicht mit:**
→ Pair-Programming: setze zwei Kinder zusammen.
Das Schnellere erklärt dem Langsameren — beide lernen dabei.

**Zu schnelle Kinder:**
→ Bonus-Aufgaben in der App
→ Helfen bei anderen als "Junior Trainer"
→ Eigene Feature-Ideen für ihre App umsetzen

---

## Sicherheits-Hinweise

- API-Key nach dem Workshop rotieren (Anthropic Console → API Keys)
- Kinder sollen keine eigenen API-Keys anlegen (Kosten!)
- Eingaben der Kinder werden an Anthropic gesendet — keine sensiblen Daten eingeben
- `.env` Dateien NICHT auf GitHub hochladen
