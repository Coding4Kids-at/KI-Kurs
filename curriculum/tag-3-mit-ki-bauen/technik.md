# Tag 3 — Technik-Block: "Prompt Lab + erster eigener Bot"

**Dauer:** ~3.5 Stunden (inkl. Pausen)  

---

## Schritt 1 — Prompt Lab (45 min)

Im KI Lab: Tab "Prompt Lab" öffnen.

Der Prompt Lab hat zwei Bereiche:
- Links: Prompt eingeben
- Rechts: KI-Antwort + Vergleichsmodus

**Aufgabe 1 — Dreifach-Vergleich:**
Gleiche Frage, 3 Qualitätsstufen. Alle 3 im Prompt Lab speichern.

*Frage:* "Erkläre mir wie das Internet funktioniert."

Version A — Schlecht:
```
Erkläre Internet.
```

Version B — Mittel:
```
Erkläre mir wie das Internet funktioniert. Ich bin 14 Jahre alt.
```

Version C — Gut:
```
Du bist ein Lehrer der Informatik für 14-Jährige erklärt.
Erkläre wie das Internet funktioniert.
Nutze eine Analogie aus dem Alltag.
Antworte in 4 nummerierten Schritten.
Maximal 3 Sätze pro Schritt.
Kein Fachjargon ohne Erklärung.
```

Unterschiede dokumentieren: Was ist besser? Was fehlt noch bei B?

**Aufgabe 2 — Format-Experiment:**
Gleicher Inhalt, verschiedene Formate:
```
[Gleiche Frage] → Antworte als Aufzählung
[Gleiche Frage] → Antworte als kurze Geschichte
[Gleiche Frage] → Antworte als Tabelle mit 2 Spalten
[Gleiche Frage] → Antworte in einem Tweet (280 Zeichen)
```

Wann welches Format nützlich ist — kurze Diskussion in der Gruppe.

---

## Schritt 2 — System-Prompt bauen (35 min)

Jede:r baut einen spezialisierten Mini-Assistenten im Prompt Lab.

**Themen-Vorschläge:**
- Koch-Assistent (kennt nur Rezepte, spricht wie ein Sternekoch)
- Mathe-Tutor (erklärt Schritt für Schritt, lobt für richtige Antworten)
- Film-Empfehler (kennt Genres, fragt nach Stimmung, gibt 3 Vorschläge)
- Witz-Maschine (erzählt Witze, erklärt wenn man nicht lacht)
- Sprach-Lehrer (antwortet immer zweisprachig: Deutsch + Englisch)

**Template:**
```
Du bist [ROLLE — wer bist du, wie heißt du?].
Deine Aufgabe ist es [HAUPTFUNKTION].
Antworte immer auf Deutsch.
[BESONDERE REGELN — max. 3 Regeln].
Wenn du etwas nicht weißt, sagst du das ehrlich.
Fange jede Antwort mit [TYPISCHE BEGRÜSSUNG] an.
```

Testen: 5 Nachrichten schicken und prüfen ob der Bot konsistent bleibt.
Im Prompt Lab speichern unter "Mein Bot V1".

---

## Schritt 3 — Die Gemini-CLI: KI direkt im Terminal (35 min)

Bisher war die KI im Browser (Chat, Prompt Lab). Die **Gemini-CLI** bringt die KI ins **Terminal** —
und dort kann sie **Dateien lesen und selbst schreiben**. Kein Copy-Paste mehr. Damit baut ihr gleich
eure Webseite.

**Vorbereitung (Trainer):** Das fertige Bundle verteilen (Node ist mit drin, keine Installation):
`gemini-ki-portable-mit-node.zip` — Download:
`https://github.com/Coding4Kids-at/KI-Kurs/releases/download/v1.0/gemini-ki-portable-mit-node.zip`

**Schritt 3a — CLI starten:**
Bundle **entpacken** (Rechtsklick → Alle extrahieren), dann Doppelklick auf `KI-STARTEN.cmd`
(Windows) bzw. `KI-starten.command` (Mac). Beim ersten Start wird der Trainer-Key abgefragt (derselbe
wie in der App). **Der entpackte Bundle-Ordner ist ab jetzt euer Projektordner** — die CLI arbeitet
genau hier.

Erste Fragen direkt im Terminal:
```
Erkläre mir in einem Satz was eine CLI ist.
Schreib mir eine Datei hallo.txt mit einem Gruß darin.
```
→ Schau nach: Die Datei `hallo.txt` ist im Bundle-Ordner wirklich aufgetaucht. Die KI hat sie
selbst geschrieben.

**Schritt 3b — GEMINI.md: der KI Kontext geben:**
Erstelle im Bundle-Ordner eine Datei `GEMINI.md`:
```
Ich heiße [DEIN NAME] und bin im KI-Workshop.
Ich baue gerade einen [DEIN BOT-THEMA]-Bot.
Antworte immer auf Deutsch und erkläre Befehle anfängerfreundlich.
```
CLI **neu starten** (Fenster schließen, `KI-STARTEN.cmd` erneut). Merkst du den Unterschied?
Die KI kennt jetzt deinen Kontext bei jedem Start.

---

## Schritt 4 — Erste HTML-Seite mit der CLI bauen (50 min)

Jetzt baut die CLI eine echte Webseite — und schreibt die Datei **direkt** in euren Ordner.

**Schritt 4a — Ordner in VS Code öffnen:**
VS Code öffnen → *Datei → Ordner öffnen* → den **entpackten Bundle-Ordner** aus Schritt 3 wählen.
Links seht ihr jetzt alle Dateien, die die KI anlegt (`hallo.txt`, `GEMINI.md`). Ein zweites Terminal
für die CLI startet ihr in VS Code über *Terminal → Neues Terminal* (oder wieder per `KI-STARTEN`).

**Schritt 4b — KI schreibt die Seite (in der CLI):**
```
Erstelle eine Datei index.html: eine Seite mit dem Titel "Mein Witze-Generator",
5 vorgespeicherten Witzen als Liste und einem Button "Neuer Witz", der zufällig
einen Witz auswählt und groß anzeigt. Weißer Hintergrund, blaue Überschrift,
runder Button.
```
→ In VS Code taucht `index.html` **von selbst** auf. Doppelklick → im Browser öffnen. Der Button muss
funktionieren.

**Schritt 4c — Anpassungen mit der CLI:**
Iterativ verbessern, die KI ändert die Datei jedes Mal direkt:
```
Öffne index.html und ändere die Schriftfarbe des Witzes auf Rot.
Füge einen Dark-Mode-Button hinzu, der die Seite dunkel schaltet.
```
Browser neu laden. Jede Änderung: Was genau hat die KI geändert? Versteht man es?

**Schritt 4d — Eigene Änderung ohne KI:**
Eine Sache selbst in VS Code ändern, ohne die KI zu fragen — Witz-Text, eine Farbe oder einen eigenen
6. Witz. Speichern (`Strg+S`), Browser neu laden.
→ Beweis: Ich verstehe den Code, ich bin nicht abhängig von KI.

**Schritt 4e — Bonus: Einen eigenen Skill bauen:**
Ein Skill ist ein Befehl, den du selbst erfindest. Erstelle `.gemini/commands/witz.toml`:
```
description = "Erzählt einen kurzen Programmier-Witz"
prompt = "Erzähl mir einen kurzen, kindgerechten Witz über Programmieren."
```
CLI neu starten, dann im Terminal `/witz` tippen. Dein eigener Befehl läuft!

**Verstehen-Check:** "Was kann die CLI, was der Browser-Chat nicht kann?" → Dateien direkt lesen und
schreiben, im Projektordner arbeiten, eigene Befehle (Skills).

---

## Schritt 5 — Bilder mit KI (Bonus, 25 min)

KI kann nicht nur Text, sondern auch **zeichnen**. Zwei niederschwellige Werkzeuge zum Ausprobieren:
- **[autodraw.com](https://www.autodraw.com)** — du kritzelst grob mit der Maus, oben schlägt die KI
  passende saubere Symbole vor, die deine Zeichnung ersetzen. Kein Login.
- **Canva** (C4K-Accounts, Zugang + Passwort vom Trainer) — Text-zu-Bild für Grafiken, die du in
  deiner HTML-Seite oder deinem Projekt nutzen kannst.

**Aufgabe:** Erzeuge ein Bild/Symbol, das zu deinem Bot-Thema passt (z.B. ein Logo), und speichere es
für dein Projekt.

**Kurz einordnen:** Bildgeneration ist ein starkes Kreativ-Werkzeug — und **dieselbe** Technik, mit der
Deepfakes entstehen (Tag 2). Nutzen ja, aber wissen, was es ist.

---

## Schritt 6 — Schüler-Projekt starten (30 min)

**Projektauswahl:**
Jede:r entscheidet sich für ein Bot-Thema.
Trainer hat Liste mit Vorschlägen (Film-Bot, Rezept-Bot, Quiz-Bot, etc.)

**Erster System-Prompt:**
Für das gewählte Thema einen ersten System-Prompt schreiben.
Im Prompt Lab testen.

**Projekt-Zettel ausfüllen:**
```
Mein Projekt: ___________________
Mein Bot ist: ___________________
Das kann mein Bot: _______________
System-Prompt gespeichert: Ja / Nein
```

---

## Ende des Tages

Kurze Runde: Jede:r zeigt der Gruppe seinen Bot-Namen und erklärt in einem Satz was er macht.
Ausblick: "Morgen bekommt euer Bot ein Gedächtnis — er kann Daten speichern."
