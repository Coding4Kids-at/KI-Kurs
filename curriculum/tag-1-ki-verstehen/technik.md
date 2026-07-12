# Tag 1 — Technik-Block: "Erste Schritte mit KI"

**Dauer:** ~3 Stunden (inkl. Pausen)  
**Alle 20 Min Technik → 10 Min Pause**  

---

## Schritt 1 — Workshop-App starten (15 min)

Trainer startet die KI Lab App (vorher eingerichtet).
Jede:r öffnet im Browser: `http://localhost:3000`

Name eingeben → App ist personalisiert.
Kurze Tour: Dashboard, Aufgaben, KI-Chat, Prompt Lab.

**Aufgabe:** Im KI-Chat schreiben:
> "Hallo! Erkläre mir in 3 Sätzen was ein LLM ist."

Antwort lesen. Versteht man sie? Was ist unklar?

---

## Schritt 2 — Token-Visualizer (25 min)

Im KI Lab: Tab "Token-Visualizer" öffnen.

**Aufgabe 1:** Diese 5 Texte tokenizen und Tokens zählen:
1. `Hund`
2. `Kindergarten`
3. `KI ist toll`
4. `The quick brown fox`
5. Eigener Satz (beliebig)

In Aufgaben-Antwortfeld eintragen: "Was hat mich überrascht?"

**Aufgabe 2:** Gleiches Wort, andere Schreibweise:
- `hallo` vs `Hallo` vs `HALLO` vs ` hallo` (mit Leerzeichen davor)
→ Sind das die gleichen oder verschiedene Tokens?

**Erkenntnisse besprechen:** Warum ist das wichtig?
→ KI sieht Texte komplett anders als wir.

---

## Schritt 3 — Kontext-Experiment (30 min)

**Die gleiche Frage, 3 verschiedene Kontexte:**

Alle öffnen KI-Chat und stellen 3-mal die Frage `"Was ist 2+2?"`:

**Versuch 1 — Kein Kontext:**
```
Was ist 2+2?
```

**Versuch 2 — Falscher Kontext:**
```
Du bist ein Clown bei einem Kindergeburtstag. Was ist 2+2?
```

**Versuch 3 — Bildungs-Kontext:**
```
Du erklärst einem 5-jährigen Kind zum ersten Mal Mathematik. Was ist 2+2?
```

Beobachtungen in Aufgaben-Feld eintragen:
- Was war anders?
- Welche Antwort war am hilfreichsten?
- Was macht Kontext mit der KI?

**Kurze Besprechung in der Gruppe** (5 min)

---

## Schritt 4 — Fragen die KI keine beantworten kann (20 min)

**Aufgabe:** Findet Fragen wo die KI versagt oder komisch antwortet.
Versucht:
- Eine Frage über ein sehr aktuelles Ereignis (letzten Monat)
- Eine Frage nach eurem Namen und Geburtstag
- Eine sehr persönliche Frage: "Was dachte ich gestern?"
- Eine math. Aufgabe: `834 × 729 = ?` → nachrechnen ob stimmt

Beobachtungen notieren: Wo hat die KI Grenzen?

---

## Schritt 5 — Erste Aufgaben abhaken (10 min)

Auf dem Dashboard die Tag-1-Aufgaben durchgehen.
Completed-Boxen abhaken.
Konfetti wenn alle Pflichtaufgaben erledigt.

---

## Häufige Fragen und Antworten

**"Kann die KI das Internet benutzen?"**
→ Dieses Modell nicht. Es kennt nur was beim Training dabei war (bis zu einem bestimmten Datum).

**"Ist KI gefährlich?"**
→ Nicht automatisch. Aber es ist wichtig zu verstehen wie sie funktioniert — das macht euch heute.

**"Welche KI ist die beste?"**
→ Kommt drauf an wofür. Wir benutzen Claude, andere sind ChatGPT (OpenAI), Gemini (Google), etc.

**"Kann KI Bilder malen?"**
→ Es gibt separate KI-Modelle für Bilder (DALL-E, Stable Diffusion). Das sind andere Architekturen.

---

## Ende des Tages (5 min)

Frage in die Runde: "Was ist die eine Sache die ihr heute gelernt habt?"
→ Jede:r sagt einen Satz
→ Ausblick auf morgen: "Morgen lernt ihr, wann die KI lügt."
