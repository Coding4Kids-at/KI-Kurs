# Algorithmen zum Anschauen

Drei fertige Seiten, die zeigen, wie ein Computer denkt. **Einfach im Browser öffnen** (Doppelklick) —
sie laufen komplett ohne KI und ohne Internet, kosten also nichts.

| Datei | Was sie zeigt |
|-------|---------------|
| `sortier-rennen.html` | Zwei Sortier-Algorithmen (Bubble vs. Quicksort) sortieren dieselben Balken um die Wette. Regler für die Anzahl + Vergleichs-Zähler. |
| `labyrinth.html` | Breitensuche (BFS): die Suche breitet sich wie Wasser aus und findet den kürzesten Weg. |
| `suche.html` | Der Reihe nach suchen (linear) vs. clever halbieren (binär) — mit Schritt-Zähler. |

## Warum fertig vorgebaut?

Die KI (CLI) etwas komplett neu bauen zu lassen, kostet jedes Mal Tokens. Diese Seiten baut ihr
deshalb **nicht** von Grund auf — ihr **schaut sie an und ändert dann gezielt eine Sache** mit der
Gemini-CLI (z.B. Farben, mehr Balken, ein dritter Algorithmus). Das ist billiger und ihr lernt
trotzdem, echten Code mit der KI zu verändern.

## Für Trainer

- Reines Offline-JS (kein Netz, kein API-Key, kein `npm install`) → 0 Kosten beim Anschauen.
- Algorithmen in Node gegengeprüft: Sortierung korrekt, binäre Suche max. 7 Schritte für 1–100.
- Wird als `algorithmen/` mit dem CLI-Bundle ausgeliefert (neben `agenten/`).
