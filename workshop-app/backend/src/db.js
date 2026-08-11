import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), '..', 'data', 'kilab.db')

// Bump this when the seed tasks change — the DB is then re-seeded automatically.
const SEED_VERSION = 5

let db

export function getDb() {
  if (!db) {
    db = new DatabaseSync(DB_PATH)
    initSchema()
  }
  return db
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      day INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      hint TEXT,
      solution TEXT,
      type TEXT DEFAULT 'required',
      completed INTEGER DEFAULT 0,
      answer TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS fehler_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      erstellt_am TEXT DEFAULT (datetime('now')),
      frage TEXT NOT NULL,
      ki_antwort TEXT NOT NULL,
      was_war_falsch TEXT NOT NULL,
      erkenntnis TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS prompt_lab_saves (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      erstellt_am TEXT DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      prompt TEXT NOT NULL,
      antwort TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS db_meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `)

  // Re-seed tasks whenever SEED_VERSION was bumped (existing DBs get the new tasks).
  const versionRow = db.prepare('SELECT value FROM db_meta WHERE key = ?').get('seed_version')
  const currentVersion = versionRow ? parseInt(versionRow.value) : 0
  if (currentVersion < SEED_VERSION) {
    db.exec('DELETE FROM tasks')
    seedTasks()
    db.prepare('INSERT OR REPLACE INTO db_meta (key, value) VALUES (?, ?)').run('seed_version', String(SEED_VERSION))
  }
}

function seedTasks() {
  const tasks = [
    // Tag 1 — KI Verstehen
    { id: 't1-1', day: 1, title: 'Workshop-App öffnen', description: 'Öffne die KI Lab App im Browser und gib deinen Namen ein.', type: 'required' },
    { id: 't1-2', day: 1, title: 'Erste KI-Frage', description: 'Schreibe im KI-Chat: "Erkläre mir in 3 Sätzen was ein LLM ist." Lies die Antwort.', type: 'required' },
    { id: 't1-3', day: 1, title: 'Token-Visualizer', description: 'Öffne den Token-Visualizer und gib nacheinander ein: "Hund", "Kindergarten", "KI ist toll", "The quick brown fox" und einen eigenen Satz.\nZähle bei jedem: Wie viele Wörter — und wie viele Tokens zeigt die App?', hint: 'Achte darauf, wo ein einzelnes Wort in mehrere Tokens zerfällt (z.B. "Kindergarten") und dass sogar das Leerzeichen ein eigenes Token ist. Merksatz: ein Wort ist nicht gleich ein Token.', type: 'required' },
    { id: 't1-4', day: 1, title: 'Kontext-Experiment', description: 'Stelle die Frage "Was ist 2+2?" dreimal: ohne Kontext, als Clown, als Lehrer für 5-Jährige. Schreibe auf was sich ändert.', type: 'required' },
    { id: 't1-5', day: 1, title: 'KI-Grenzen finden', description: 'Finde 2 Fragen die die KI nicht beantworten kann oder falsch beantwortet.', type: 'required' },
    { id: 't1-6', day: 1, title: 'Teachable Machine 1: Dein erstes KI-Modell', description: 'Du bringst einer KI mit der Webcam selbst etwas bei — ganz ohne eigene Bilder.\n1. Öffne teachablemachine.withgoogle.com und klick auf "Get Started".\n2. Wähle "Image Project" (Bild-Projekt) → "Standard image model".\n3. Benenne "Class 1" um in "Daumen hoch". Klick "Webcam", halte den Daumen hoch und halte "Hold to Record" gedrückt, bis ca. 50 Bilder gesammelt sind.\n4. Benenne "Class 2" um in "Daumen runter" und nimm genauso ca. 50 Bilder auf.\n5. Klick "Train Model" (Modell trainieren) und warte — den Tab NICHT wechseln.\n6. Test rechts unter "Preview": halte Daumen hoch/runter vor die Kamera. Erkennt die KI es richtig?', hint: 'Kein Login, nichts wird gespeichert. Der Laptop braucht eine Webcam. Die Balken rechts zeigen in Prozent, wie sicher sich die KI ist. Das nennt man "überwachtes Lernen": du zeigst Beispiele mit der richtigen Antwort, die KI lernt das Muster selbst.', type: 'required' },
    { id: 't1-7', day: 1, title: 'Teachable Machine 2: Garbage in, garbage out', description: 'Jetzt sabotierst du dein Modell mit Absicht — um zu sehen, wie stark KI von guten Beispielen abhängt.\n1. Lösche bei "Daumen runter" fast alle Bilder (Mülleimer-Symbol), sodass nur noch ca. 5 übrig sind.\n2. Klick erneut auf "Train Model".\n3. Teste wieder Daumen hoch und Daumen runter in der Vorschau.\nSchreib auf: Ist die Erkennung jetzt schlechter oder unsicherer als vorher?', hint: '"Garbage in, garbage out": Eine KI ist immer nur so gut wie ihre Trainingsdaten. Wenige oder einseitige Beispiele führen zu schlechten Vorhersagen — genau deshalb ist Datenqualität bei echten KI-Systemen so entscheidend.', type: 'required' },
    { id: 't1-8', day: 1, title: 'Teachable Machine 3: Wo die KI einfach rät', description: 'Was macht die KI mit etwas, das sie NIE gelernt hat?\n1. Bring dein Modell wieder auf guten Stand (viele Bilder pro Klasse) oder nutze das aus Aufgabe 1.\n2. Halte in der Vorschau etwas völlig Anderes vor die Kamera: einen Stift, dein Gesicht, eine flache Hand.\n3. Beobachte die Prozent-Balken: Ordnet die KI es trotzdem einer der zwei Klassen zu — und wie sicher?\nSchreib auf: Sagt die KI jemals "weiß ich nicht"?', hint: 'Die KI kennt nur die Klassen, die DU ihr gegeben hast. Für alles Unbekannte gibt es kein "weiß nicht" — sie rät trotzdem, oft mit hoher Prozentzahl. Diese übertriebene Selbstsicherheit ist bei echten KIs ein echtes Risiko.', type: 'required' },
    { id: 't1-9', day: 1, title: 'Teachable Machine 4: Dein eigenes Modell', description: 'Jetzt du: bau ein eigenes Modell mit 2 oder 3 selbst ausgedachten Klassen.\nIdeen: "Brille auf" / "Brille ab" · "Stift" / "Radiergummi" / "Handy" · "lächeln" / "ernst".\n1. Klassen umbenennen oder ein neues Bild-Projekt starten.\n2. Pro Klasse ca. 50 abwechslungsreiche Bilder aufnehmen (verschiedene Winkel, Abstände, Licht).\n3. Trainieren und testen.\nSchreib auf: Welche Klassen hast du gewählt und wie gut funktioniert es?', hint: 'Rezept für ein gutes Modell: viele Bilder, verschiedene Blickwinkel und Lichtsituationen, und Klassen die sich wirklich klar unterscheiden. Je vielfältiger die Beispiele, desto besser erkennt die KI.', type: 'required' },
    { id: 't1-b1', day: 1, title: 'Bonus: KI erklären', description: 'Erkläre einem imaginären Freund in einer KI-Nachricht was ein Token ist — lass die KI prüfen ob deine Erklärung stimmt.', type: 'bonus' },

    // Tag 2 — KI Hinterfragen
    { id: 't2-1', day: 2, title: 'Halluzination 1: Bücher', description: 'Frage die KI nach Büchern eines Autors. Überprüfe ob alle Bücher wirklich existieren.', type: 'required' },
    { id: 't2-2', day: 2, title: 'Halluzination 2: Datum', description: 'Frage nach einem sehr spezifischen historischen Detail (Brief-Inhalt, genaues Datum). Dokumentiere ob die KI es erfindet.', type: 'required' },
    { id: 't2-3', day: 2, title: 'Mathe-Test', description: 'Bitte die KI: 347 × 829. Rechne selbst nach. Stimmt das Ergebnis?', hint: 'Richtig: 287.663', type: 'required' },
    { id: 't2-4', day: 2, title: 'Bias-Test', description: 'Frage nach einem "typischen Chirurgen" und einer "typischen Pflegefachkraft". Welche Stereotype tauchen auf?', type: 'required' },
    { id: 't2-5', day: 2, title: 'Fehler-Log: 3 Einträge', description: 'Dokumentiere im Fehler-Log mindestens 3 KI-Fehler die du heute gefunden hast.', type: 'required' },
    { id: 't2-6', day: 2, title: 'Sensible Daten & Aegis', description: 'Überlege: Welche 5 Infos würdest du einem Fremden auf der Straße NICHT erzählen? Genau die gehören nicht in eine KI. Installiere Aegis (coding4kids.at/aegis) und teste, wie es erfundene persönliche Daten im Chat anonymisiert.', hint: 'Aegis ersetzt persönliche Daten durch Platzhalter und entschlüsselt sie erst beim Herauskopieren. Nie ECHTE persönliche Daten zum Testen nehmen — denk dir welche aus.', type: 'required' },
    { id: 't2-7', day: 2, title: 'Mensch oder KI?', description: 'Schau dir die Bild-/Video-Beispiele vom Trainer an und rate: echt oder KI-generiert? Notiere: Woran hast du es (nicht) erkannt?', hint: 'KI-Bilder haben oft Fehler an Händen, Zähnen, Text im Bild, Hintergründen. Aber: es wird immer schwerer. "Im Video gesehen" ist kein Beweis mehr.', type: 'required' },
    { id: 't2-b1', day: 2, title: 'Bonus: Eigene Fakten-Karten', description: 'Erstelle 5 eigene Fakten-Karten (3 echt, 2 erfunden) für andere Gruppen.', type: 'bonus' },

    // Tag 3 — Mit KI bauen
    { id: 't3-1', day: 3, title: 'Prompt Lab: Dreifach-Vergleich', description: 'Teste "Erkläre das Internet" in 3 Versionen: schlecht, mittel, gut. Vergleiche die Ergebnisse.', type: 'required' },
    { id: 't3-2', day: 3, title: 'System-Prompt bauen', description: 'Baue einen eigenen spezialisierten Assistenten mit einem vollständigen System-Prompt. Teste ihn mit 5 Nachrichten.', type: 'required' },
    { id: 't3-3', day: 3, title: 'HTML mit KI', description: 'Baue eine HTML-Seite mit KI als Co-Pilot. Öffne sie im Browser — sie muss funktionieren.', type: 'required' },
    { id: 't3-4', day: 3, title: 'Eigene Änderung', description: 'Ändere eine Kleinigkeit in deiner HTML-Seite OHNE KI zu fragen. Nur du und der Code.', type: 'required' },
    { id: 't3-5', day: 3, title: 'Projekt-Thema wählen', description: 'Entscheide dich für ein Bot-Thema für dein Schlussprojekt. Erster System-Prompt geschrieben.', type: 'required' },
    { id: 't3-6', day: 3, title: 'Gemini-CLI starten', description: 'Entpacke das CLI-Bundle vom Trainer und starte es (Doppelklick KI-STARTEN.cmd). Lass die KI eine Datei hallo.txt schreiben und erstelle eine GEMINI.md mit deinem Namen und Bot-Thema. Starte neu — kennt die KI jetzt deinen Kontext?', hint: 'Kein npm install, kein Login — das Bundle bringt Node mit. Der entpackte Ordner ist dein Projektordner: GEMINI.md wird bei jedem Start automatisch geladen.', type: 'required' },
    { id: 't3-b1', day: 3, title: 'Bonus: Format-Experiment', description: 'Teste die gleiche Frage in 4 Ausgabe-Formaten: Liste, Geschichte, Tabelle, Tweet.', type: 'bonus' },
    { id: 't3-b2', day: 3, title: 'Bonus: Eigener CLI-Skill', description: 'Baue in der Gemini-CLI einen eigenen Befehl: Datei .gemini/commands/witz.toml mit description und prompt. Starte neu und teste ihn mit /witz.', hint: 'Der Ordner heißt genau .gemini/commands (Punkt am Anfang!). In der .toml stehen description = "..." und prompt = "...".', type: 'bonus' },
    { id: 't3-b3', day: 3, title: 'Bonus: Bild mit KI', description: 'Erstelle mit autodraw.com (kritzeln → KI ersetzt) oder Canva ein Bild/Logo, das zu deinem Bot-Thema passt, und speichere es für dein Projekt.', hint: 'autodraw.com braucht keinen Login. Bildgeneration ist dieselbe Technik wie Deepfakes (Tag 2) — cooles Werkzeug, aber wissen was es ist.', type: 'bonus' },

    // Tag 4 — Daten & APIs
    { id: 't4-1', day: 4, title: 'Wetter-API abrufen', description: 'Rufe die Open-Meteo API im Browser ab. Lies die aktuelle Temperatur aus dem JSON.', type: 'required' },
    { id: 't4-2', day: 4, title: 'Mini-API bauen', description: 'Baue eine einfache Node.js API mit GET /api/witze. Teste sie im Browser.', type: 'required' },
    { id: 't4-3', day: 4, title: 'Datenbank hinzufügen', description: 'Erweitere die API um SQLite. Neue Witze müssen nach Neustart noch da sein.', type: 'required' },
    { id: 't4-4', day: 4, title: 'Gemini API einbinden', description: 'Dein Projekt-Backend schickt Nachrichten an die Gemini API und gibt die Antwort zurück.', type: 'required' },
    { id: 't4-5', day: 4, title: 'Frontend verbinden', description: 'Deine HTML-Seite nutzt dein Backend — Button-Klick → API-Call → KI-Antwort auf der Seite.', type: 'required' },
    { id: 't4-b1', day: 4, title: 'Bonus: Weitere Endpunkte', description: 'Füge deiner API 2 weitere Endpunkte hinzu die deinem Projekt nützen.', type: 'bonus' },

    // Tag 5 — Finale
    { id: 't5-1', day: 5, title: 'Projekt finalisiert', description: 'Dein Projekt hat keine offensichtlichen Bugs. Die Hauptfunktion läuft.', type: 'required' },
    { id: 't5-2', day: 5, title: 'README geschrieben', description: 'Dein Projekt hat eine README-Datei mit Beschreibung, Start-Anleitung und Beispiel-Fragen.', type: 'required' },
    { id: 't5-3', day: 5, title: 'Projekt-Galerie', description: 'Du hast mindestens 3 andere Projekte ausprobiert und je einen Post-It hinterlassen.', type: 'required' },
    { id: 't5-4', day: 5, title: 'Präsentation gehalten', description: 'Du hast dein Projekt der Gruppe vorgestellt (3-5 Minuten).', type: 'required' },
    { id: 't5-5', day: 5, title: 'Reflexion ohne KI', description: 'Beantworte OHNE die KI zu fragen: Was kann KI gut? Was kann KI nicht gut? Worauf muss ich aufpassen (Halluzinationen, sensible Daten, Deepfakes)? Kann ich der KI vertrauen — und wann nicht?', hint: 'Kein richtig/falsch — deine eigene Einschätzung nach dieser Woche. Genau das ist der Kern: KI ist ein Werkzeug, die Verantwortung bleibt beim Menschen.', type: 'required' },
    { id: 't5-b1', day: 5, title: 'Bonus: GitHub Upload', description: 'Erstelle einen GitHub-Account und lade dein Projekt hoch.', type: 'bonus' },
  ]

  const insert = db.prepare(`
    INSERT OR IGNORE INTO tasks (id, day, title, description, hint, solution, type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  for (const t of tasks) {
    insert.run(t.id, t.day, t.title, t.description, t.hint || null, t.solution || null, t.type)
  }
}
