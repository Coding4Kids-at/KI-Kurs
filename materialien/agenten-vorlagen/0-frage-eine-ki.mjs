// 0-frage-eine-ki.mjs — der kleinste Baustein: EINE Frage an die KI.
// Starten:  node 0-frage-eine-ki.mjs
//
// Das ist noch kein Agent — nur eine einzige Frage. Damit fangen wir an.

import { frageKI } from "./ki.mjs";

const antwort = await frageKI("Erkläre in einem Satz, was ein KI-Agent ist.");
console.log(antwort);

// PROBIER SELBST (per CLI oder von Hand):
// - Ändere die Frage oben.
// - Gib der KI eine Rolle: frageKI("...", "Du bist ein Pirat und redest wie einer.")
