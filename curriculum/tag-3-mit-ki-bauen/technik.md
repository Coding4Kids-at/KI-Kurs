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

## Schritt 3 — Erste HTML-Seite mit KI (50 min)

VS Code öffnen. Neuen Ordner erstellen: `mein-erster-bot/`

**Schritt 3a — KI schreibt die Seite:**
Im KI-Chat eingeben:
```
Du bist ein Web-Entwickler. Erstelle mir eine einfache HTML-Seite.
Die Seite soll:
- Einen Titel haben: "Mein Witze-Generator"
- 5 vorgespeicherte Witze als Liste anzeigen
- Einen Button "Neuer Witz" der zufällig einen Witz auswählt und groß anzeigt
- Modern aussehen: weißer Hintergrund, blaue Überschrift, runder Button

Gib mir nur den HTML-Code, ich kopiere ihn direkt in eine Datei.
```

Code kopieren → in `index.html` einfügen → im Browser öffnen.

**Schritt 3b — Anpassungen mit KI:**
Jetzt iterativ verbessern:
- "Ändere die Schriftfarbe des Witzes auf Rot"
- "Füge einen 'Witz teilen' Button hinzu (der nichts tut, nur sichtbar ist)"
- "Mache die Seite dunkler — Dark Mode"

Jede Änderung: Was hat KI geändert? Versteht man es?

**Schritt 3c — Eigene Änderung ohne KI:**
Aufgabe: Eine Sache selbst ändern ohne KI zu fragen.
- Text eines Witzes ändern
- Farbe eines Elements ändern
- Einen eigenen Witz hinzufügen

→ Beweis: Ich verstehe den Code, ich bin nicht abhängig von KI.

---

## Schritt 4 — Schüler-Projekt starten (30 min)

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
