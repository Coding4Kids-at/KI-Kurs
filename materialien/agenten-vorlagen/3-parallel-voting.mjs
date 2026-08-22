// 3-parallel-voting.mjs — DREI Agenten GLEICHZEITIG (parallel), dann wählt eine Jury die beste Idee.
// Starten:  node 3-parallel-voting.mjs
//
// Genau dieses Muster nutzt connect8 in echt: viele KI-Agenten arbeiten parallel und stimmen sich ab.

import { frageKI } from "./ki.mjs";

const frage = "Nenne EINEN ausgefallenen Namen für eine neue Eissorte. Antworte mit nur dem Namen, ohne Erklärung.";
console.log("FRAGE:", frage, "\n");

// Drei verschiedene Persönlichkeiten -> drei verschiedene Ideen.
const rollen = [
  "Du bist superkreativ und magst verrückte Ideen. Antworte mit genau einem kurzen Namen.",
  "Du bist klassisch und elegant. Antworte mit genau einem kurzen Namen.",
  "Du bist lustig und magst Wortwitze. Antworte mit genau einem kurzen Namen.",
];

console.time("Zeit parallel");
// Promise.all startet ALLE drei Fragen GLEICHZEITIG (nicht nacheinander).
const antworten = await Promise.all(
  rollen.map((rolle) => frageKI(frage, rolle))
);
console.timeEnd("Zeit parallel"); // -> viel schneller als 3x nacheinander zu fragen

antworten.forEach((a, i) => console.log(`Agent ${i + 1}: ${a}`));

// JURY-Agent stimmt ab.
const jury = "Du bist eine faire Jury. Antworte nur mit der Nummer der besten Idee (1, 2 oder 3) und einem kurzen Grund.";
const liste = antworten.map((a, i) => `${i + 1}. ${a}`).join("\n");
const urteil = await frageKI(`Wähle die beste Eissorte:\n${liste}`, jury);
console.log("\nJURY:", urteil);

// PROBIER SELBST (per CLI umbauen):
// - Frag 5 Agenten statt 3 (Rollen ergänzen).
// - Ändere die Frage in etwas für dein eigenes Projekt.
// - Baue es einmal MIT Schleife (nacheinander) und vergleiche die Zeit mit Promise.all.
