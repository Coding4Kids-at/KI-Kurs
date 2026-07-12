# Tag 1 — Whiteboard-Skript: "Was ist KI eigentlich?"

**Dauer:** 45 Minuten  
**Material:** Whiteboard/Flipchart, farbige Marker  

---

## Einstieg (5 min)

Frage in die Runde: "Wer hat diese Woche schon KI benutzt?"
→ Hände heben lassen
Frage: "Was glaubt ihr: Was passiert wenn ihr ChatGPT etwas fragt?"

Antworten sammeln, nicht bewerten — nur aufschreiben.
Typische Antworten: "Es denkt nach", "Es weiß alles", "Es googelt", "Es ist intelligent"

---

## Block 1 — Die Autokorrektur-Metapher (10 min)

**An die Tafel zeichnen:**
```
Handy-Tastatur:
Ich esse gerne ___

[Kuchen] [Pizza] [Sushi]
```

Frage: "Woher weiß euer Handy was ihr schreiben wollt?"
→ Es hat gelernt welche Wörter oft zusammen vorkommen.

Erweiterung zeichnen:
```
Sehr viele Texte aus dem Internet
             ↓
    Muster erkennen
             ↓
"Welches Wort kommt als nächstes?"
```

**Kernaussage (groß schreiben):**
> KI = sehr gute Autokorrektur, trainiert auf unfassbar vielen Texten

---

## Block 2 — Was ein Token ist (10 min)

An die Tafel:
```
"Hund"      → 1 Token
"Kindergarten" → 2-3 Tokens  
"🐕"         → 1 Token
" hallo"     → anderer Token als "hallo"
```

Erklärung: KI liest keine Wörter, keine Buchstaben — sie liest Chunks.
Ein Chunk ist ungefähr ein häufiges Wortfragment.

Übung an der Tafel: Wer schätzt wie viele Tokens hat dieser Satz?
`"Die schnelle braune Katze springt über den faulen Hund."`
→ Ungefähr 12-14 Tokens

**Kernaussage:**
> Tokens sind die "Bausteine" die KI verarbeitet — kleiner als Wörter, größer als Buchstaben

---

## Block 3 — Wahrscheinlichkeiten, nicht Wissen (10 min)

An die Tafel:
```
Eingabe: "Die Hauptstadt von Österreich ist ___"

Nächstes Token — Wahrscheinlichkeiten:
  "Wien"    → 97%
  "Linz"    → 1%
  "Salzburg"→ 0.5%
  "Berlin"  → 0.3%
  ...
```

Frage: "Was passiert wenn die KI einen schlechten Tag hat und 'Linz' auswählt?"
→ Sie gibt eine falsche Antwort — nicht weil sie lügt, sondern weil sie rät.

An die Tafel:
```
Eingabe: "Die Hauptstadt von [wenig bekanntes Land] ist ___"

Wahrscheinlichkeiten:
  "[irgendeine Stadt]" → 40%
  "[andere Stadt]"     → 30%
  "[falsche Stadt]"    → 20%
  "ich weiß es nicht" → 5%
```

→ Die KI wählt fast nie "ich weiß es nicht" — sie rät lieber überzeugend.

**Kernaussage:**
> KI "weiß" nichts — sie berechnet was wahrscheinlich als nächstes kommen sollte.

---

## Block 4 — Was KI nicht ist (10 min)

Häufige Missverständnisse korrigieren:

| Mythos | Wahrheit |
|--------|---------|
| KI googelt Antworten | Nein — sie hat keine Internetverbindung (meist) |
| KI denkt nach wie wir | Nein — Wahrscheinlichkeitsberechnung |
| KI weiß alles | Nein — sie kennt nur was im Training war |
| KI hat eine Meinung | Nein — sie spiegelt Muster aus Trainingsdaten |
| KI lügt absichtlich | Nein — sie halluziniert (rät falsch) |

Frage zum Abschluss: "Ändert das wie ihr KI benutzen werdet?"

---

## Überleitung zur Aktivität

"Jetzt erlebt ihr selbst wie das ist — ihr werdet kurz zu einem LLM."
