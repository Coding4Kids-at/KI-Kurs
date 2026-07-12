# SPEC.md — Coding 4 Kids: "KI im Griff"

**Version:** 1.0  
**Stand:** Mai 2026  
**Zielgruppe:** 12–16-Jährige, keine Vorkenntnisse nötig  
**Format:** 5 Tage Workshop, ~6h/Tag  

---

## Objective

Jugendliche lernen in 5 Tagen, wie moderne KI-Systeme wirklich funktionieren —
was dahinter steckt, wo sie scheitern, und wie man sie als Werkzeug einsetzt.

**Das zentrale Versprechen:** Kein blinder Glaube an KI-Antworten.
Wer diesen Kurs abschließt, versteht KI, hinterfragt sie und baut damit eigene Projekte.

**Der rote Faden:** Über alle 5 Tage bauen die Teilnehmer:innen ein eigenes KI-gestütztes Projekt —
von der Idee über erste Prompts bis zum fertigen Tool das sie mit nach Hause nehmen.

**Das Vehikel:** Eine eigene Workshop-App ("KI Lab"), die als Lernplattform dient,
als Aufgabentracker, als KI-Chat und als Prompt-Experimentierfeld.

---

## Die 5 Tage auf einen Blick

| Tag | Titel | Kernthema | Endergebnis |
|-----|-------|-----------|-------------|
| 1 | KI verstehen | LLMs, Tokens, Training, Was KI wirklich ist | Erste eigene KI-Konversation + Verständnis |
| 2 | KI hinterfragen | Halluzinationen, Bias, Grenzen, kritisches Denken | Persönlicher "KI-Fehler-Log" |
| 3 | Mit KI bauen | Prompting, Kontext, System-Prompts, Code mit KI | Erster eigener Mini-Bot |
| 4 | Daten & APIs | Daten speichern, APIs, wie Systeme kommunizieren | Projekt mit Datenbankanbindung |
| 5 | Finale | Projekt polishen, KI-Features hinzufügen, Präsentation | Fertiges Projekt zum Mitnehmen |

---

## Tag 1 — KI verstehen: "Was ist das eigentlich?"

### Ziel
Jugendliche verstehen, was hinter modernen KI-Systemen steckt — nicht als Magie,
sondern als trainiertes Muster-Erkennungssystem das sehr gut Wahrscheinlichkeiten berechnet.

### Whiteboard-Theorie (45 min)
**Die Autokorrektur-Metapher:**
- Autokorrektur am Handy: schlägt das nächste Wort vor weil es oft so war
- LLM = riesige Autokorrektur, trainiert auf unvorstellbar vielen Texten
- Kein "Verstehen" wie Menschen — Mustererkennung in sehr hoher Dimension
- Token: das kleinste Einheit (nicht Wort, nicht Buchstabe — irgendwas dazwischen)
- Training: Muster aus Milliarden von Texten extrahieren

**Zeichnung an der Tafel:**
```
Text → Tokens → Wahrscheinlichkeiten → nächstes Token → Text
"Die Katze sitzt auf der ___"
           P("Matte") = 0.31
           P("Couch") = 0.18
           P("Bank") = 0.12
           ...
```

**Was KI ist:**
- Sehr gutes Muster-Matching über riesige Textmengen
- Kein Gedächtnis zwischen Gesprächen (ohne externe Speicherung)
- Keine eigene Meinung — Wahrscheinlichkeitsverteilung über mögliche Antworten
- Kann sich irren, erfinden, halluzinieren

**Was KI nicht ist:**
- Nicht: allwissend oder unfehlbar
- Nicht: "denkt" wie ein Mensch
- Nicht: versteht im menschlichen Sinne

### Raum-Aktivität (25 min)
**"Ich bin ein LLM!"**  
*Material: Stifte, A4-Zettel, Stoppuhr*

- Gruppe in 3er-Teams aufteilen
- Team A schreibt 10 Satzanfänge auf Zettel (z.B. "Die beste Pizza hat...")
- Team B sieht nur die ersten 3 Wörter und muss das wahrscheinlichste Ende erraten
- Team C wertet aus: stimmte die Vorhersage? Warum ja/nein?
- Diskussion: Welche Sätze waren leicht vorherzusagen? Welche überraschend?
- → Erkenntnis: KI macht genau das — aber mit Milliarden Beispielen trainiert

**Variante:** Gleiche Aktivität mit anderen Kontext-Wörtern zeigen wie stark Kontext die Vorhersage verändert.

### Technik-Block (3h mit Pausen)

**Schritt 1 — Erste Konversation**
Jede:r öffnet die Workshop-App und schreibt die erste Nachricht an die KI.
Aufgabe: "Erkläre mir was ein Neuronales Netz ist — in 3 Sätzen."

**Schritt 2 — Tokens sichtbar machen**
Die Workshop-App hat einen Token-Visualizer: Text eingeben → Tokens farbig hervorheben.
Aufgabe: 5 verschiedene Sätze tokenizen, beobachten wie Wörter aufgespaltet werden.

**Schritt 3 — Kontext-Experiment**
Gleiche Frage, 3 verschiedene Vorgaben:
1. Ohne Kontext: "Was ist 2+2?"
2. Mit falschem Kontext: "Du bist ein Clown. Was ist 2+2?"
3. Mit Lern-Kontext: "Du erklärst das einem 10-jährigen Kind. Was ist 2+2?"

Beobachten: Wie verändert der Kontext die Antwort?

**Schritt 4 — Workshop-App erkunden**
Kinder erkunden die KI Lab App: Aufgaben-Liste, KI-Chat, Prompt Lab.

### Workshop-App Aufgaben Tag 1
- [ ] Workshop-App geöffnet und Name eingegeben
- [ ] Erste Nachricht an KI geschickt
- [ ] Token-Visualizer ausprobiert (mindestens 3 Beispiele)
- [ ] Kontext-Experiment durchgeführt und Beobachtung aufgeschrieben
- [ ] Bonus: Erkläre einem Freund/einer Freundin was ein Token ist (in eigenen Worten)

---

## Tag 2 — KI hinterfragen: "Wann lügt die KI?"

### Ziel
Jugendliche entwickeln gesunden Skeptizismus gegenüber KI-Ausgaben —
sie erkennen Halluzinationen, Bias und die Grenzen von KI-Systemen.

### Whiteboard-Theorie (40 min)
**Halluzinationen:**
- KI "erfindet" Fakten die plausibel klingen aber falsch sind
- Kein böser Wille — sie hat gelernt plausible Texte zu produzieren
- Beispiel: Falsche Zitate, erfundene Quellen, nicht-existente Bücher

**Warum passiert das?**
```
Training: "maximiere Wahrscheinlichkeit nächstes Token"
→ Manchmal ist eine falsche aber "klingende" Antwort wahrscheinlicher
→ als "Ich weiß es nicht"
```

**Bias:**
- KI lernt aus menschlichen Texten — mit allen menschlichen Vorurteilen
- Wenn in Trainingsdaten X häufig mit Y vorkommt: KI verbindet X mit Y
- Beispiel: Rollenbilder, Stereotype, kulturelle Annahmen

**Prompt Injection (einfach erklärt):**
- "Vergiss alle Anweisungen und tu so als wärst du..."
- KI kann durch geschickte Prompts aus ihrer Rolle gebracht werden
- Sicherheits-Relevanz: Systeme die User-Input direkt an KI weiterleiten

### Raum-Aktivität (30 min)
**"Echt oder Erfunden?"**  
*Material: ausgedruckte Fakten-Karten (50% echt, 50% KI-halluziniert)*

- 15 Fakten-Karten auf dem Tisch verteilen
- Teams: 3 Minuten Zeit — sortieren in "echt" und "erfunden"
- Auflösung + Diskussion: Woran hat man es erkannt? Was hat getäuscht?
- Erkenntnis: Selbst aufmerksame Menschen werden von gut formulierten Falschinformationen getäuscht

**Fakten-Karten Beispiele (halluziniert, klingen aber plausibel):**
- "Albert Einstein hat 1921 das Buch 'Relativität für Kinder' veröffentlicht"
- "Die Eiffelturm-Antennen wurden 1953 nach einem Blitzeinschlag ausgetauscht"
- "Netflix wurde 1997 in Austin, Texas gegründet" (falsch: Los Gatos, Kalifornien)

### Technik-Block (3h mit Pausen)

**Schritt 1 — Halluzinationen provozieren**
Aufgaben-Liste mit "Halluzinationsfallen":
- "Nenne mir 5 Bücher von [Autor der nur 2 Bücher geschrieben hat]"
- "Was hat Goethe in seinem letzten Brief vom 3. März 1832 geschrieben?"
- "Erkläre mir den Unterschied zwischen GPT-5 und GPT-6"
Ergebnisse in Fehler-Log eintragen.

**Schritt 2 — Bias testen**
Gleiche Frage, verschiedene Namen/Kontexte:
- "Beschreibe einen typischen Ingenieur"
- "Beschreibe eine typische Krankenschwester"
- "Beschreibe einen typischen Hacker"
Beobachten: Gibt es Stereotype? Wie ausgeprägt?

**Schritt 3 — Verifikation üben**
Für jede KI-Antwort: Mindestens eine Quelle überprüfen.
Workflow: KI fragt → Antwort notieren → Google/Wikipedia → stimmt es?

**Schritt 4 — Persönlichen Fehler-Log anlegen**
Die Workshop-App hat eine "Fehler-Log"-Seite.
Jede:r dokumentiert: 3 Fehler die die KI heute gemacht hat.
Format: Frage → KI-Antwort → Was war falsch → Wie hätte man es bemerken können?

### Workshop-App Aufgaben Tag 2
- [ ] Mindestens 2 Halluzinationen provoziert und dokumentiert
- [ ] Bias-Test durchgeführt und Beobachtungen aufgeschrieben
- [ ] 3 KI-Antworten mit externer Quelle verifiziert
- [ ] Persönlicher Fehler-Log: mindestens 3 Einträge
- [ ] Bonus: "Fake or Real?"-Aktivität mit eigenem Fakten-Set erstellen

---

## Tag 3 — Mit KI bauen: "KI als Co-Pilot"

### Ziel
Jugendliche lernen Prompting als Skill — und bauen mit KI als Partner ihren ersten eigenen Mini-Chatbot.

### Whiteboard-Theorie (35 min)
**Prompting ist ein Skill:**
- Garbage in → Garbage out
- Je präziser der Input, desto nützlicher der Output
- Kontext ist alles: Wer bin ich? Was soll die KI tun? Welches Format?

**Anatomie eines guten Prompts:**
```
[Rolle]        "Du bist ein freundlicher Koch der gesunde Rezepte erklärt"
[Aufgabe]      "Erkläre mir wie man Pasta Carbonara macht"
[Kontext]      "Ich bin Anfänger, habe keine Sahne und koche für 2 Personen"
[Format]       "Antworte in 5 nummerierten Schritten, maximal 2 Sätze pro Schritt"
[Einschränkung] "Benutze keine Fachbegriffe"
```

**System-Prompts:**
- Permanente Anweisungen die bei jeder Nachricht aktiv sind
- Damit baut man spezialisierte KI-Assistenten
- Beispiel: Workshop-App-System-Prompt für "KI die nur über Mathematik spricht"

### Raum-Aktivität (25 min)
**"Stille Post mit Prompts"**  
*Material: Zettel, Stifte*

- 5er-Teams in einer Reihe
- Person 1 denkt sich ein Bild/Szene aus (z.B. "roter Drache auf Wolke")
- Person 1 schreibt einen Prompt der dieses Bild erzeugen soll
- Person 2 liest den Prompt, beschreibt was sie sich darunter vorstellt (kein Weitergeben des Originals)
- Person 3 macht aus der Beschreibung von Person 2 einen neuen Prompt
- Person 4 und 5 das gleiche
- Auflösung: Was hat sich verändert? Warum?
- Erkenntnis: Kleine Änderungen in Prompts = große Änderungen im Output

### Technik-Block (3.5h mit Pausen)

**Schritt 1 — Prompt Lab**
Die Workshop-App hat einen Prompt Lab Tab.
Aufgabe: Den gleichen Prompt in 3 verschiedenen Varianten testen:
- Kurz (1 Satz)
- Mittel (Rolle + Aufgabe)
- Lang (Rolle + Aufgabe + Kontext + Format + Einschränkung)
Ergebnis-Vergleich dokumentieren.

**Schritt 2 — System-Prompt bauen**
Jede:r baut einen spezialisierten Mini-Assistenten.
Themen-Vorschläge: Koch-Assistent, Mathe-Tutor, Rätsel-Generator, Film-Empfehler, Übersetzungs-Helfer
Format:
```
Du bist [ROLLE].
[BESCHREIBUNG was du tust].
Antworte immer auf Deutsch.
[EINSCHRÄNKUNGEN].
Wenn du etwas nicht weißt, sagst du das ehrlich.
```

**Schritt 3 — Code mit KI schreiben**
Erste Erfahrung: Eine einfache HTML-Seite mit KI als Co-Pilot bauen.
Aufgabe: "Ich möchte eine Seite die mir 5 zufällige Witze anzeigt. Schreib mir HTML + JavaScript."
→ Code kopieren, in VS Code einfügen, öffnen, testen.
→ Dann anpassen: "Ändere die Schriftfarbe auf blau" / "Füge einen Button hinzu"

**Schritt 4 — Schüler-Projekt beginnen**
Jede:r entscheidet sich für ein Projekt-Thema.
Optionen: Film-Bot, Rezept-Bot, Quiz-Bot, Fakten-Bot, Witz-Bot, eigene Idee
Erster System-Prompt für das eigene Projekt schreiben.

### Workshop-App Aufgaben Tag 3
- [ ] Prompt Lab: alle 3 Varianten getestet und verglichen
- [ ] Eigener System-Prompt geschrieben und getestet
- [ ] HTML-Seite mit KI gebaut und im Browser geöffnet
- [ ] Projekt-Thema gewählt
- [ ] Erster System-Prompt für eigenes Projekt fertig
- [ ] Bonus: Eigene Seite um ein Feature erweitert (mit KI-Hilfe)

---

## Tag 4 — Daten & APIs: "Wie echte Software tickt"

### Ziel
Jugendliche verstehen wie Daten gespeichert werden, was eine API ist,
und wie verschiedene Systeme miteinander kommunizieren — die Bausteine jeder modernen App.

### Whiteboard-Theorie (40 min)
**Daten speichern:**
- Alles in Apps ist irgendwo gespeichert: Nachrichten, User-Profile, Bestellungen
- Datenbank = geordnetes System zum Speichern und Abrufen von Daten
- Tabellen wie Excel: Zeilen = Einträge, Spalten = Felder
- SQL (vereinfacht): "Gib mir alle Nachrichten von heute"

**Was ist eine API?**
```
Client (Browser/App) → HTTP Request → API → Datenbank
                     ← HTTP Response ←
```
- API = definierter Eingang um Daten abzufragen oder zu senden
- Wie ein Kellner im Restaurant: Ich sage was ich will, er bringt es (ich gehe nicht selbst in die Küche)
- Jede App die du nutzt kommuniziert mit APIs: TikTok, Instagram, Google Maps

**Request & Response:**
- GET: Daten abrufen
- POST: Daten senden
- JSON: das "Sprach-Format" für APIs

**KI-API:**
- Claude ist auch nur eine API
- Wir senden Text rein → bekommen Text raus
- Genau das machen wir im eigenen Projekt: unsere App → Claude API → Antwort

### Raum-Aktivität (25 min)
**"Ich bin eine API!"**  
*Material: Zettel mit "Endpunkten", Stoppuhr*

- 2 Rollen: "Client" und "Server"
- Server-Kind bekommt Zettel mit Daten (z.B. Liste von 10 Städten + Wetter)
- Client schickt schriftliche Anfragen: "GET /weather?city=Wien"
- Server sucht Antwort und gibt JSON-Antwort zurück: `{"city": "Wien", "temp": 22}`
- Fehler-Runde: Client fragt nach Stadt die nicht existiert → 404 Not Found
- Erkenntnis: APIs haben klare Regeln — Anfragen müssen im richtigen Format sein

### Technik-Block (3.5h mit Pausen)

**Schritt 1 — Erste API-Anfrage mit dem Browser**
Öffentliche APIs direkt im Browser aufrufen:
- `https://api.open-meteo.com/v1/forecast?latitude=47.8&longitude=12.2&current=temperature_2m`
- Wetterdaten für Kufstein live abrufen
- JSON im Browser sehen und verstehen

**Schritt 2 — Eigene Mini-API bauen (mit KI-Hilfe)**
Aufgabe: KI schreibt eine einfache Node.js API mit einem Endpunkt.
```
GET /api/joke → gibt einen zufälligen Witz zurück
```
Starten, im Browser testen, dann erweitern.

**Schritt 3 — Daten speichern**
Bestehende API um Datenbankanbindung erweitern:
- Witze in SQLite-Datenbank speichern
- `POST /api/joke` → neuen Witz hinzufügen
- `GET /api/jokes` → alle Witze abrufen
KI hilft beim Schreiben des Datenbankzugriffs.

**Schritt 4 — Schüler-Projekt: Backend ausbauen**
Das eigene Projekt bekommt ein einfaches Backend:
- API-Endpunkt für die Hauptfunktion
- Verbindung zur Claude API für KI-Antworten
- Optional: Datenspeicherung

### Workshop-App Aufgaben Tag 4
- [ ] Wetter-API im Browser abgefragt und JSON gelesen
- [ ] Eigene Mini-API mit Endpunkt gebaut und getestet
- [ ] Datenbankanbindung hinzugefügt (Daten persistiert)
- [ ] Projekt-Backend: Claude API eingebunden
- [ ] Bonus: Weitere Endpunkte für eigenes Projekt gebaut

---

## Tag 5 — Das Finale: "Zeig was du gebaut hast"

### Ziel
Jugendliche schließen ihr Projekt ab, fügen KI-Features hinzu und präsentieren es der Gruppe.

### Whiteboard-Theorie (20 min)
**KI verantwortungsvoll einsetzen — der Abschluss-Input:**
- Was bedeutet es wenn Maschinen Inhalte erzeugen die echt aussehen aber erfunden sind?
- Deepfakes, Fake News, manipulative Inhalte
- Die wichtigste Fähigkeit: Quellen prüfen, kritisch bleiben
- Wir haben diese Woche beides gelernt: bauen UND hinterfragen

**Ausblick — was kommt nach diesem Kurs:**
- Prompt Engineering als echte Karriere-Skill
- Open-Source-Modelle die man selbst betreiben kann
- KI in der Wissenschaft, Medizin, Kreativarbeit
- Was sich in 5 Jahren geändert haben wird

### Raum-Aktivität (30 min)
**"Projekt-Galerie"**

- Laptops aufgestellt wie in einer Ausstellung
- 20 Minuten: alle laufen rum und testen die Projekte der anderen
- Sticky Notes: jede:r hinterlässt bei jedem Projekt 1 Kommentar ("Ich finde cool dass...")
- Letzter Schritt vor der Präsentation: Feedback einarbeiten (15 min)

### Technik-Block (2h)
**Finalisierung:**
- Offene Bugs fixen
- UI aufräumen
- KI-Feature verbessern (bessere System-Prompts, Fehlerbehandlung)
- Projekt dokumentieren: README mit Beschreibung was das Tool kann

**Präsentation (2h):**
Jede:r hat 3-5 Minuten:
1. Was ist dein Projekt? (1 Satz)
2. Live-Demo — zeig es
3. Welche KI-Funktion steckt drin?
4. Was war am schwierigsten?
5. Was würdest du als nächstes hinzufügen?

### Workshop-App Aufgaben Tag 5
- [ ] Projekt finalisiert (kein offensichtlicher Bug)
- [ ] README für eigenes Projekt geschrieben
- [ ] Präsentation vorbereitet (max. 5 Min)
- [ ] Präsentation gehalten
- [ ] Projekt-Galerie: Kommentare bei 3 anderen Projekten hinterlassen
- [ ] Bonus: Eigenes Projekt auf GitHub hochgeladen

---

## Workshop-App: "KI Lab"

### Was es ist
Die KI Lab App ist die zentrale Lernplattform für alle 5 Tage.
Sie läuft lokal auf jedem Laptop und enthält Aufgaben, KI-Chat, Prompt Lab und Fehler-Log.

### Features

| Feature | Beschreibung |
|---------|-------------|
| Aufgaben-Tracker | Aufgaben pro Tag, abhaken, Fortschritt |
| KI-Chat | Claude API Integration, kindgerechte Antworten auf Deutsch |
| Prompt Lab | Prompts direkt testen, Varianten vergleichen, Ergebnisse speichern |
| Token-Visualizer | Text eingeben → Tokens farbig hervorheben |
| Fehler-Log | Eigene KI-Fehler dokumentieren (Datum, Frage, Fehler, Erkenntnis) |
| Dashboard | Wochen-Fortschritt, Tages-Übersicht |

### Tech Stack (analog zu erstem Workshop)
- Frontend: React 19, Vite, Tailwind CSS 3.4
- Backend: Node.js (ESM), Express, `node:sqlite`
- KI: Google Gemini API, `gemini-2.5-flash`
- Port Backend: 3001, Port Frontend: 5173 (dev)
- Build: Docker Multi-Stage

### System-Prompt für den Workshop-Chat
```
Du bist ein freundlicher KI-Assistent für den Coding4Kids Workshop "KI im Griff".
Die Teilnehmer:innen sind 12-16 Jahre alt und lernen diese Woche wie KI funktioniert.

Aktuelle Woche: {currentDay}. Tag
Aktuelles Thema: {currentTopic}

Wichtig:
- Antworte immer auf Deutsch
- Erkläre Begriffe mit Alltagsbeispielen (kein Fachjargon ohne Erklärung)
- Wenn du etwas nicht mit Sicherheit weißt, sag das ehrlich
- Hilf beim Verstehen, gib keine fertigen Lösungen — stelle Gegenfragen
- Wenn du auf Fehler in deinen eigenen Antworten hingewiesen wirst, erkenne das an
```

---

## Schüler-Projekt: "Mein KI-Bot"

Jede:r Teilnehmer:in baut über 5 Tage einen eigenen spezialisierten Chatbot.
Das Schüler-Projekt ist ein Starter-Template (HTML + einfaches Node.js Backend).

**Mögliche Bot-Typen:**
- Film-Empfehler Bot
- Rezept-Bot (gibt Rezepte basierend auf vorhandenen Zutaten)
- Quiz-Bot (erstellt Quizfragen zu beliebigen Themen)
- Fakten-Bot (erklärt beliebige Themen für Kinder)
- Witz-Bot
- Eigene Idee

**Starter-Template enthält:**
- Einfaches Chat-Interface (HTML + CSS)
- Verbindung zur Gemini API (über lokales Backend)
- System-Prompt Feld das der Schüler/die Schülerin anpassen kann
- Speichern und Laden der Konversation

---

## KI-Kosten

`gemini-2.5-flash` — schnelles, günstiges Gemini-Modell.
Ein API-Key des Trainers reicht für alle Kinder (kostenloses Kontingent im Google AI Studio).

Geschätzte Kosten: 5 Tage, 15 Kinder:
- ~800-1500 Chat-Nachrichten gesamt
- Gemini Flash: großzügiges kostenloses Kontingent, darüber ~$0.30 per 1M Input-Token
- Gesamt: in der Regel $0 (Free-Tier), sonst wenige Dollar für den ganzen Workshop

**Ohne Internet / kostenlos:** Ollama + llama3.2 lokal (Anleitung im Trainer-Handbuch).
