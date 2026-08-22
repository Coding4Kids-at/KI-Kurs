// 1-agent-loop.mjs — EIN Agent in einer Schleife mit einem Ziel.
// Starten:  node 1-agent-loop.mjs
//
// Muster eines Agenten:  DENKEN -> HANDELN -> ERGEBNIS PRÜFEN -> wenn nicht gut genug: NOCHMAL.
// Genau so arbeitet auch die Gemini-CLI, die ihr die ganze Woche benutzt habt.

import { frageKI } from "./ki.mjs";

// Die Rolle der KI. Sie soll NUR den Namen liefern, ohne Erklärung.
const rolle = "Du bist kreativ und antwortest immer nur mit dem Namen selbst, ohne Erklärung.";

// Die erste Aufgabe. Diese Nachricht ändert sich in der Schleife (Feedback).
let aufgabe = "Erfinde einen coolen Team-Namen für eine Gruppe im KI-Workshop.";

const MAX_VERSUCHE = 5;

for (let versuch = 1; versuch <= MAX_VERSUCHE; versuch++) {
  console.log(`\n--- Versuch ${versuch} ---`);

  // DENKEN + HANDELN: die KI macht einen Vorschlag.
  const vorschlag = await frageKI(aufgabe, rolle);
  console.log("KI schlägt vor:", vorschlag);

  // PRÜFEN (im Code, nicht von der KI!): hat der Name genau 2 Wörter?
  const woerter = vorschlag.split(/\s+/).filter(Boolean);
  if (woerter.length === 2) {
    console.log(`Ziel erreicht nach ${versuch} Versuch(en): "${vorschlag}"`);
    break;
  }

  // NICHT gut genug -> Feedback an die KI, und die Schleife läuft nochmal.
  const wortWort = woerter.length === 1 ? "Wort" : "Wörter";
  console.log(`${woerter.length} ${wortWort} statt 2. Ich sage es der KI und versuche es nochmal.`);
  aufgabe = `"${vorschlag}" hat ${woerter.length} ${wortWort}. Ich brauche einen Namen aus GENAU zwei Wörtern.`;
}

// PROBIER SELBST (per CLI umbauen):
// - Neues Ziel: der Name muss mit "Turbo" beginnen  (Tipp: vorschlag.startsWith("Turbo"))
// - Zähle Buchstaben statt Wörter.
// - Was passiert, wenn du MAX_VERSUCHE auf 1 stellst? Und auf 20?
