import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), '..', 'data', 'kilab.db')

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
  `)

  seedTasks()
}

const SEED_VERSION = 1

function seedTasks() {
  const count = db.prepare('SELECT COUNT(*) as n FROM tasks').get()
  if (count.n > 0) return

  const tasks = [
    // Tag 1 — KI Verstehen
    { id: 't1-1', day: 1, title: 'Workshop-App öffnen', description: 'Öffne die KI Lab App im Browser und gib deinen Namen ein.', type: 'required' },
    { id: 't1-2', day: 1, title: 'Erste KI-Frage', description: 'Schreibe im KI-Chat: "Erkläre mir in 3 Sätzen was ein LLM ist." Lies die Antwort.', type: 'required' },
    { id: 't1-3', day: 1, title: 'Token-Visualizer', description: 'Öffne den Token-Visualizer. Tokenize diese 5 Texte: "Hund", "Kindergarten", "KI ist toll", "The quick brown fox", einen eigenen Satz.', hint: 'Schau wie Wörter in Teile aufgeteilt werden — besonders zusammengesetzte Wörter.', type: 'required' },
    { id: 't1-4', day: 1, title: 'Kontext-Experiment', description: 'Stelle die Frage "Was ist 2+2?" dreimal: ohne Kontext, als Clown, als Lehrer für 5-Jährige. Schreibe auf was sich ändert.', type: 'required' },
    { id: 't1-5', day: 1, title: 'KI-Grenzen finden', description: 'Finde 2 Fragen die die KI nicht beantworten kann oder falsch beantwortet.', type: 'required' },
    { id: 't1-b1', day: 1, title: 'Bonus: KI erklären', description: 'Erkläre einem imaginären Freund in einer KI-Nachricht was ein Token ist — lass die KI prüfen ob deine Erklärung stimmt.', type: 'bonus' },

    // Tag 2 — KI Hinterfragen
    { id: 't2-1', day: 2, title: 'Halluzination 1: Bücher', description: 'Frage die KI nach Büchern eines Autors. Überprüfe ob alle Bücher wirklich existieren.', type: 'required' },
    { id: 't2-2', day: 2, title: 'Halluzination 2: Datum', description: 'Frage nach einem sehr spezifischen historischen Detail (Brief-Inhalt, genaues Datum). Dokumentiere ob die KI es erfindet.', type: 'required' },
    { id: 't2-3', day: 2, title: 'Mathe-Test', description: 'Bitte die KI: 347 × 829. Rechne selbst nach. Stimmt das Ergebnis?', hint: 'Richtig: 287.663', type: 'required' },
    { id: 't2-4', day: 2, title: 'Bias-Test', description: 'Frage nach einem "typischen Chirurgen" und einer "typischen Pflegefachkraft". Welche Stereotype tauchen auf?', type: 'required' },
    { id: 't2-5', day: 2, title: 'Fehler-Log: 3 Einträge', description: 'Dokumentiere im Fehler-Log mindestens 3 KI-Fehler die du heute gefunden hast.', type: 'required' },
    { id: 't2-b1', day: 2, title: 'Bonus: Eigene Fakten-Karten', description: 'Erstelle 5 eigene Fakten-Karten (3 echt, 2 erfunden) für andere Gruppen.', type: 'bonus' },

    // Tag 3 — Mit KI bauen
    { id: 't3-1', day: 3, title: 'Prompt Lab: Dreifach-Vergleich', description: 'Teste "Erkläre das Internet" in 3 Versionen: schlecht, mittel, gut. Vergleiche die Ergebnisse.', type: 'required' },
    { id: 't3-2', day: 3, title: 'System-Prompt bauen', description: 'Baue einen eigenen spezialisierten Assistenten mit einem vollständigen System-Prompt. Teste ihn mit 5 Nachrichten.', type: 'required' },
    { id: 't3-3', day: 3, title: 'HTML mit KI', description: 'Baue eine HTML-Seite mit KI als Co-Pilot. Öffne sie im Browser — sie muss funktionieren.', type: 'required' },
    { id: 't3-4', day: 3, title: 'Eigene Änderung', description: 'Ändere eine Kleinigkeit in deiner HTML-Seite OHNE KI zu fragen. Nur du und der Code.', type: 'required' },
    { id: 't3-5', day: 3, title: 'Projekt-Thema wählen', description: 'Entscheide dich für ein Bot-Thema für dein Schlussprojekt. Erster System-Prompt geschrieben.', type: 'required' },
    { id: 't3-b1', day: 3, title: 'Bonus: Format-Experiment', description: 'Teste die gleiche Frage in 4 Ausgabe-Formaten: Liste, Geschichte, Tabelle, Tweet.', type: 'bonus' },

    // Tag 4 — Daten & APIs
    { id: 't4-1', day: 4, title: 'Wetter-API abrufen', description: 'Rufe die Open-Meteo API im Browser ab. Lies die aktuelle Temperatur aus dem JSON.', type: 'required' },
    { id: 't4-2', day: 4, title: 'Mini-API bauen', description: 'Baue eine einfache Node.js API mit GET /api/witze. Teste sie im Browser.', type: 'required' },
    { id: 't4-3', day: 4, title: 'Datenbank hinzufügen', description: 'Erweitere die API um SQLite. Neue Witze müssen nach Neustart noch da sein.', type: 'required' },
    { id: 't4-4', day: 4, title: 'Claude API einbinden', description: 'Dein Projekt-Backend schickt Nachrichten an Claude und gibt die Antwort zurück.', type: 'required' },
    { id: 't4-5', day: 4, title: 'Frontend verbinden', description: 'Deine HTML-Seite nutzt dein Backend — Button-Klick → API-Call → KI-Antwort auf der Seite.', type: 'required' },
    { id: 't4-b1', day: 4, title: 'Bonus: Weitere Endpunkte', description: 'Füge deiner API 2 weitere Endpunkte hinzu die deinem Projekt nützen.', type: 'bonus' },

    // Tag 5 — Finale
    { id: 't5-1', day: 5, title: 'Projekt finalisiert', description: 'Dein Projekt hat keine offensichtlichen Bugs. Die Hauptfunktion läuft.', type: 'required' },
    { id: 't5-2', day: 5, title: 'README geschrieben', description: 'Dein Projekt hat eine README-Datei mit Beschreibung, Start-Anleitung und Beispiel-Fragen.', type: 'required' },
    { id: 't5-3', day: 5, title: 'Projekt-Galerie', description: 'Du hast mindestens 3 andere Projekte ausprobiert und je einen Post-It hinterlassen.', type: 'required' },
    { id: 't5-4', day: 5, title: 'Präsentation gehalten', description: 'Du hast dein Projekt der Gruppe vorgestellt (3-5 Minuten).', type: 'required' },
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
