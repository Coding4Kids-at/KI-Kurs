# KI-Agenten-Gerüst

Fertige Mini-Programme zum **Ausführen, Anschauen und Umbauen**. Damit lernt ihr, wie man
mehrere KIs zusammenarbeiten lässt — statt nur eine einzelne Frage zu stellen.

> Ihr müsst nichts installieren. Die Programme nutzen den Node, der schon im KI-Bundle steckt,
> und fragen die KI direkt übers Internet.

## Starten

Im Terminal (im selben Ordner wie diese Dateien):

```
node 0-frage-eine-ki.mjs      # Aufwärmen: eine einzige Frage
node 1-agent-loop.mjs         # EIN Agent in einer Schleife mit Ziel
node 2-pipeline.mjs           # DREI Agenten als Team: Autor -> Kritiker -> Editor
node 3-parallel-voting.mjs    # DREI Agenten gleichzeitig + Jury wählt die beste Idee
```

Der API-Schlüssel wird automatisch aus `key.txt` (vom KI-Start) oder aus der Umgebungsvariable
`GEMINI_API_KEY` genommen. Findet er keinen: Trainer fragen und die KI einmal starten.

## Was ihr lernt

| Datei | Konzept |
|-------|---------|
| `0-frage-eine-ki.mjs` | Der kleinste Baustein: eine Frage, eine Antwort. |
| `1-agent-loop.mjs` | **Agent-Loop:** denken → handeln → prüfen → wiederholen. Genau das macht die CLI. |
| `2-pipeline.mjs` | **Multi-Agent-Pipeline:** ein Ergebnis wandert durch mehrere Rollen. |
| `3-parallel-voting.mjs` | **Parallele Agenten:** viele gleichzeitig (`Promise.all`) + Abstimmung. |
| `ki.mjs` | Der Helfer, der die KI fragt. Musst du nicht anfassen. |

## Umbauen (das ist der eigentliche Spaß)

Jede Datei hat unten einen Block **„PROBIER SELBST"**. Ändere die Programme selbst oder lass dir
von der Gemini-CLI helfen, z.B.:

```
Öffne 2-pipeline.mjs und häng einen vierten Agenten an, der den Text ins Englische übersetzt.
```

## Für Trainer

- Dependency-frei (nur Node-`fetch`) → kein `npm install`, läuft mit dem gebündelten Node.
- `ki.mjs` setzt `thinkingBudget: 0` + `maxOutputTokens: 2048` (sonst schneidet gemini-2.5-flash ab).
- Auslieferung: diesen Ordner als `agenten/` ins CLI-Bundle legen (nächster Bundle-Rebuild) oder
  als separates Release-Asset. Vor dem Workshop einmal mit echtem Key testen.
