# Umbau-Plan — "KI im Griff" v2: Programmieren mit KI

**Stand:** 2026-08-22
**Auslöser (Steven):** Der Kurs hat zu wenig echten Entwicklungs-Stoff. Es fehlen Loops,
verschiedene Algorithmen und (parallel laufende) KI-Agenten. Ziel ist *"Programmieren mit der KI"*.
Dazu: die Kinder sind schnell (Bianca hat im Docker-Kurs 2 Tage in 1 geschafft) → wir haben,
wie letzte Woche, schlicht **zu wenig Stoff**.

---

## Leitprinzipien (gelten für alles unten)

1. **Additiv, nichts wird gestrichen.** APIs/Backend, Prompt Lab, Halluzinations-Block usw.
   bleiben. Loops, Algorithmen, Agenten kommen **oben drauf**. Grund: die Kinder sind so schnell,
   dass wir eher zu wenig als zu viel Stoff haben.
2. **Überfüllen mit Absicht.** Jeder Block hat **Basis (alle)** + **Stretch (Schnelle)** +
   **In-App-Bonus-Nachschub** (db.js). Das ist genau das Muster, das den "zu früh fertig"-Effekt
   im Docker-Kurs strukturell gelöst hat.
3. **Verstehen-Checks statt Abtippen.** Jede Aufgabe endet mit einer Beobachtungs-/Erklär-Frage
   ("Was passiert, wenn du die Schleife auf 1000 stellst?"), nie nur "Befehl kopieren".
4. **Bauen = ab Tag 3 immer über die Gemini-CLI.** Der App-Chat kann nur reden; die CLI schreibt
   Dateien und führt `node`/`npm` selbst aus. (Bereits gelernte Wurzel aller "Cannot GET"-Probleme.)
5. **Offline-robust wo möglich.** Loops & Algorithmen sind reines JS im Browser (keine API,
   kein Netz) → bombensicher und visuell. Agenten brauchen die API (Paid-Tier, Rate-Limits weg).
6. **connect8-Bezug ehrlich halten.** WAHR: connect8 betreibt mehrere spezialisierte KI-Agenten
   (Microservices), die parallel laufen und je einen anderen Job machen (Vertrag lesen, matchen,
   CO₂). NICHT wahr (früher falsch behauptet): dass Agenten „abstimmen"/voten — der Match-Score
   ist eine gewichtete Formel, kein Agenten-Voting. Das Voting/„mehrere prüfen"-Muster ehrlich als
   Code-Review-Analogie einordnen, nicht als connect8-Architektur.

---

## Die drei neuen CS-Säulen — wo sie landen

| Säule | Tag | Warum dort |
|-------|-----|-----------|
| **Loops** | Tag 3 (neu als Pillar) | Fundamentalstes Konzept, direkt nach dem ersten Code |
| **Verschiedene Algorithmen** | Tag 4 (neu als Pillar) | Braucht Loops als Vorwissen; "zwei Wege, ein Ziel" |
| **KI-Agenten (Loop + parallel + Multi)** | Tag 4 (Agent-Loop) + Tag 5 (Multi/parallel + Finale) | Bridge von Algorithmen → Agenten an Tag 4; großes Wow + Präsentations-Stoff an Tag 5 |

> **Entschieden (Steven, 2026-08-22):** Agenten auf **Tag 4 + Tag 5 verteilt.** Tag 4 führt den
> Agent-Loop ein (die CLI *ist* einer), Tag 5 macht Multi-Agent/Parallel als Finale-Wow. So sind
> beide Tage gut gefüllt und viele Kinder bauen einen Agenten ins Abschlussprojekt ein.

---

## Tag-für-Tag

### Tag 1 — KI verstehen (bleibt, inhaltsstark)
Kein Umbau nötig. LLM/Autokorrektur, Tokens, Wahrscheinlichkeiten, Teachable Machine
(9 Pflicht + 6 Bonus). **Nur Beamer-Folien bauen** (siehe Abschnitt Beamer).

### Tag 2 — KI hinterfragen (bleibt, inhaltsstark)
Kein Umbau nötig. Halluzinationen (nur bombensichere Trigger: erfundenes Kinderbuch), Bias,
Prompt Injection, Aegis, Fehler-Log (12 Pflicht + 10 Bonus). **Nur Beamer-Folien bauen.**

### Tag 3 — Mit KI bauen: erster Code + **LOOPS**
**Bleibt:** Prompt Lab, System-Prompts, CLI holen/starten/GEMINI.md, erste HTML-Seite, eigener Skill.

**NEU — Pillar Loops:**
- **Konzept (Whiteboard/Beamer):** Loop = "mach das, prüf, wieder von vorn". Alltag: Playlist auf
  Repeat, 100 Liegestütze zählen. Bild: Kreis-Diagramm.
- **Basis-Demo:** CLI baut eine Seite, die per Schleife 50 bunte Sterne/Kreise zufällig verteilt.
  Kind ändert `50` → `500` selbst → "Eine Zeile, hunderte Ergebnisse."
- **Demo Game-Loop:** simple Animation (Ball läuft über den Bildschirm, `requestAnimationFrame`).
  "Jedes Spiel ist ein Loop, der 60×/Sekunde läuft."
- **Wow-Algorithmus (Loop + Logik):** Zahlenraten — *der Computer* errät deine Zahl 1–100 in
  ≤7 Versuchen (binäre Suche / Halbieren). Kind spielt dagegen und "verliert". Erste Ahnung von
  Algorithmus.
- **Stretch:** `while`-Schleife mit eigener Abbruch-Bedingung; Countdown-Timer; **Endlosschleife
  bewusst provozieren** (Abbruch-Bedingung weglassen) → dann fixen. FizzBuzz light.
- **Verstehen-Check:** "Was passiert ohne Abbruch-Bedingung?" / "Wie oft läuft die Schleife?"

### Tag 4 — **ALGORITHMEN** & Daten/APIs
**Bleibt (Nachmittag/Projekt-Backend):** öffentliche APIs (open-meteo, catfact), JSON lesen,
eigene Mini-API mit Express, SQLite, Gemini-API anklemmen, Frontend↔Backend verbinden.

**NEU — Pillar Verschiedene Algorithmen:**
- **Konzept (Beamer):** Algorithmus = Rezept/Bauanleitung. Zwei Rezepte fürs selbe Gericht, eins
  schneller. Bild: zwei Wege zum selben Ziel.
- **Star-Demo — Sortier-Rennen:** CLI baut eine Seite, die zufällige Balken **nebeneinander** mit
  Bubble-Sort vs. Quicksort animiert sortiert. Gleiches Ergebnis, völlig andere Geschwindigkeit.
  Balkenzahl hochdrehen → Bubble wird zäh, Quick bleibt schnell (Gefühl für Skalierung, ohne Big-O).
- **Demo — Labyrinth-Löser:** Kind/KI malt ein Labyrinth, KI schreibt einen Pathfinder
  (Flood-Fill/BFS) → man sieht das "Wasser" durchs Labyrinth bis zum Ausgang fluten.
- **Suche vergleichen:** lineare vs. binäre Suche am selben Datensatz (knüpft an Tag 3 an).
- **Stretch:** eigenen Sortier-Trick erfinden lassen; Labyrinth schwerer/größer; "welcher
  Algorithmus bei 10.000 Elementen?".
- **Verstehen-Check:** "Warum ist Quicksort bei vielen Balken so viel schneller?" (Intuition,
  keine Formel.)

### Tag 5 — **KI-AGENTEN** + Finale
**NEU — Vormittag: KI-Agenten (das große Wow):**
- **Konzept (Beamer):** Agent = KI in einer Schleife mit Ziel: **Denken → Handeln → Ergebnis
  anschauen → wieder denken.** "Ihr habt die ganze Woche schon einen benutzt — die CLI *ist* ein
  Agent." Bild: Agent-Loop-Diagramm.
- **Demo Agent-Loop:** CLI schreibt ein kleines Node-Script, das die Gemini-API in einer Schleife
  fragt/anpasst, bis ein Ziel erfüllt ist (z.B. rät sich an eine Lösung heran).
- **Demo Multi-Agent-Pipeline:** drei Persönlichkeiten — **Autor → Kritiker → Editor.** Text läuft
  durch die Kette. "Ein Agent allein ist okay, ein Team ist besser."
- **Demo Parallel + Voting:** dieselbe Frage **gleichzeitig** an 3 Agenten (`Promise.all`),
  Antworten vergleichen, eine Jury wählt. **Ehrliche Einordnung:** parallele spezialisierte Agenten
  laufen bei connect8 wirklich (verschiedene Jobs); das Abstimmen/„mehrere prüfen" als Code-Review-
  Analogie einordnen — NICHT behaupten, connect8-Agenten stimmen ab.
- **Debatte-Duell (Bonus/Spaß):** zwei Bots mit gegensätzlichen System-Prompts streiten rundenweise.
- **Stretch:** vierten Agenten in die Pipeline hängen; parallele Agenten mit unterschiedlichen
  Modellen/Temperaturen; Voting gewichten.

**Bleibt — Nachmittag:** Projekt fertigstellen (viele bauen jetzt einen Agenten ein!), Projekt-
Galerie, Präsentationen, Reflexion ohne KI.

---

## Abschlussprojekt-Auswahl (Stevens neuer Wunsch — nicht nur Chatbots)

Als Menü auf dem Beamer + als In-App-Task (t3-x "Wähle dein Projekt"). Jede Option markiert, welche
Tage/Bausteine sie nutzt, damit Kinder nach Interesse **und** Tempo wählen:

1. **Bots & Assistenten** (Prompts + API): Rezept-, Quiz-, Film-, Fakten-, Witz-Bot
2. **Spiele mit Loops/Algorithmen** (Tag 3/4): Zahlenrate-Duell, Reaktionsspiel, Snake-artig,
   Labyrinth-Generator, Sortier-Visualizer als Spiel
3. **KI-Agenten-Projekte** (Tag 5): Debatten-Arena (2 Bots streiten), "Experten-Rat" (parallele
   Agenten stimmen ab), Story-Fabrik (Autor→Kritiker→Editor), ein Agent, der eine Aufgabe
   selbstständig in einer Schleife löst
4. **Tools mit Daten/APIs** (Tag 4): Wetter-Dashboard, Fakten-Sammler (API→speichern),
   Personal-Dashboard
5. **Kreativ**: Bildergalerie (autodraw/Canva), Gedicht-/Geschichten-Generator mit Bild

---

## Beamer-Folien pro Tag (der eigentliche Artifact-Wunsch)

**Was:** Pro Tag **eine projektierbare HTML-Folien-Datei**, die den `whiteboard.md`-Inhalt visuell
aufbereitet — große Schrift, echte **SVG-Grafiken** statt ASCII, Schritt-für-Schritt-Folien, damit
die Kinder am Beamer mitkommen. Ersetzt faktisch das Whiteboard-Abmalen.

**Wie geliefert:** als **self-contained HTML-Datei im Repo** (`materialien/beamer/tag-N.html`),
lokal im Browser zu öffnen + am Beamer per Vollbild. **Kein** claude.ai-Artifact-Link
(Login-/Privat-Falle, im Docker-Kurs schon einmal aufgelaufen). Inline-SVG, kein CDN, dark-mode-fähig.

**Inhalt je Tag (Kern-Grafiken):**
- **Tag 1:** Token-Pipeline (`Text → Tokens → Wahrscheinlichkeiten → nächstes Token`), Wahrschein-
  lichkeits-Balken ("Wien 97%"), Mythos/Wahrheit-Tabelle
- **Tag 2:** Halluzinations-Schema, Bias-Beispiel, Prompt-Injection-Bild, Aegis
- **Tag 3:** **Loop-Kreis-Diagramm**, "eine Zeile → 500 Sterne", binäre Suche visuell
- **Tag 4:** **Sortier-Rennen-Grafik** (Bubble vs. Quick), Algorithmus-als-Rezept, API =
  Kellner-Bild
- **Tag 5:** **Agent-Loop-Diagramm** (Denken→Handeln→Prüfen), **Multi-Agent-Team** (Autor/Kritiker/
  Editor), parallele Agenten + Voting, connect8-Bezug

---

## Bau-Reihenfolge (Vorschlag)

1. **Dieser Plan** ← fertig, zur Abnahme.
2. **Tag 4 "Algorithmen" als Prototyp** — die CLI-Demos (Sortier-Rennen, Labyrinth) einmal wirklich
   durchprobieren, damit die Prompts/Artefakte belastbar sind, dann technik.md + In-App-Tasks.
3. **Tag 3 Loops** analog.
4. **Tag 5 Agenten** analog (Scripts real gegen die Gemini-API testen — nackte API ≠ App-Chat).
5. **Abschlussprojekt-Menü** (Beamer + In-App-Task).
6. **5 Beamer-Folien-Dateien.**
7. **db.js** SEED_VERSION bump, Image neu bauen/pushen (`ghcr.io/intsanerarity/ki-lab:latest`),
   Smoke-Test, danach Bianca-Test.

---

## Entscheidungen (Steven, 2026-08-22)

- [x] **Agenten-Platzierung:** auf Tag 4 (Agent-Loop) + Tag 5 (Multi/parallel) verteilt.
- [x] **Umfang Agenten-Scripts:** **fertiges Gerüst vorbauen und im CLI-Bundle-Ordner ausliefern**
      (spart Tokens — Kinder generieren nicht 15× fragile API-Scripts — und ist robuster). Kinder
      *erweitern/verändern* das Gerüst per CLI ("programmieren mit KI" bleibt).
- [x] **Beamer-Folien:** ganz am Ende bauen.
- [x] **Reihenfolge:** Tag 4/5-Inhalte zuerst, Beamer zuletzt.

## Offene technische Punkte

- [ ] **Dependency-frei statt SDK:** Agenten-Gerüst nutzt Node-`fetch` direkt gegen die Gemini-
      REST-API → **kein `npm install`** nötig, läuft mit dem im Bundle enthaltenen Node.
- [ ] **Auslieferung des Gerüsts:** Quelle liegt in `materialien/agenten-vorlagen/`. Beim
      nächsten Bundle-Rebuild als `agenten/`-Ordner ins CLI-Bundle legen (oder separates
      Release-Asset). Vor dem Workshop einmal real gegen den echten Key testen.
- [ ] **gemini-2.5-flash-Falle:** `thinkingConfig.thinkingBudget = 0` + `maxOutputTokens: 2048`,
      sonst schneidet die Antwort ab (bereits im Helfer `ki.mjs` gesetzt).
