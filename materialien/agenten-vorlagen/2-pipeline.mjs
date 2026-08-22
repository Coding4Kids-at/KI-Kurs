// 2-pipeline.mjs — DREI Agenten als Team: Autor -> Kritiker -> Editor.
// Starten:  node 2-pipeline.mjs
//
// Ein Text wandert durch eine Kette. Jeder Agent hat eine andere Rolle.
// Ein Agent allein ist okay — ein Team ist besser.

import { frageKI } from "./ki.mjs";

const thema = "ein kurzer Werbetext (2 Sätze) für einen Roboter-Hund";
console.log("THEMA:", thema);

// 1) AUTOR schreibt den ersten Entwurf.
const autor = "Du bist ein Werbetexter. Schreibe knackig und kurz.";
const entwurf = await frageKI(`Schreibe ${thema}.`, autor);
console.log("\nAUTOR:\n" + entwurf);

// 2) KRITIKER sagt, was besser sein könnte (nur Kritik, kein neuer Text).
const kritiker = "Du bist ein strenger Kritiker. Nenne in Stichpunkten 3 Dinge, die man besser machen kann.";
const kritik = await frageKI(`Hier ist ein Werbetext:\n${entwurf}`, kritiker);
console.log("\nKRITIKER:\n" + kritik);

// 3) EDITOR baut die Kritik ein und liefert die Endversion.
const editor = "Du bist ein Editor. Verbessere den Text anhand der Kritik. Gib nur den fertigen Text zurück.";
const endversion = await frageKI(`Text:\n${entwurf}\n\nKritik:\n${kritik}`, editor);
console.log("\nEDITOR (Endversion):\n" + endversion);

// PROBIER SELBST (per CLI umbauen):
// - Häng einen 4. Agenten an, der den Text ins Englische übersetzt.
// - Ändere das Thema oben.
// - Lass den Kritiker besonders streng oder besonders nett sein — wie ändert sich das Ergebnis?
