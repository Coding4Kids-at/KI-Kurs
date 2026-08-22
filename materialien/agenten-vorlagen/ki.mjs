// ki.mjs — kleiner Helfer, damit alle Agenten-Scripts die KI einfach fragen koennen.
// Nutzt die Gemini-REST-API direkt mit fetch (in Node eingebaut) — KEINE Installation noetig.
// Diesen Helfer musst du nicht anfassen. Die spannenden Sachen stehen in den nummerierten Scripts.

import { readFileSync } from "node:fs";

// Den Trainer-Schlüssel finden: erst die Umgebungsvariable, sonst die Datei key.txt aus dem Bundle.
function ladeSchluessel() {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY.trim();
  }
  // key.txt liegt entweder neben diesem Script oder eine Ebene höher (Bundle-Ordner).
  for (const pfad of ["./key.txt", "../key.txt"]) {
    try {
      return readFileSync(new URL(pfad, import.meta.url), "utf8").trim();
    } catch {
      // nächsten Pfad probieren
    }
  }
  console.error("Kein API-Schlüssel gefunden. Frag den Trainer und starte die KI einmal (key.txt).");
  process.exit(1);
}

const SCHLUESSEL = ladeSchluessel();
const MODELL = "gemini-2.5-flash";

// Eine Frage an die KI stellen. systemPrompt ist optional und gibt der KI eine Rolle.
export async function frageKI(frage, systemPrompt = "") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELL}:generateContent?key=${SCHLUESSEL}`;

  const koerper = {
    contents: [{ role: "user", parts: [{ text: frage }] }],
    generationConfig: {
      maxOutputTokens: 2048,
      // Ohne diese Zeile "denkt" gemini-2.5-flash so lange, dass die echte Antwort abgeschnitten wird.
      thinkingConfig: { thinkingBudget: 0 },
    },
  };
  if (systemPrompt) {
    koerper.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  let antwort;
  try {
    antwort = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(koerper),
    });
  } catch {
    console.error("\nKeine Verbindung zur KI. Bist du im Internet? Sonst frag den Trainer.");
    process.exit(1);
  }

  if (!antwort.ok) {
    // Freundliche Meldung statt hässlichem Stacktrace (die Kinder sollen wissen, was zu tun ist).
    if (antwort.status === 429) {
      console.error("\nDie KI ist gerade ausgelastet oder das Guthaben ist aufgebraucht. Sag dem Trainer Bescheid.");
    } else if (antwort.status === 400 || antwort.status === 403) {
      console.error("\nDer API-Schlüssel passt nicht oder fehlt. Frag den Trainer nach dem richtigen Schlüssel.");
    } else {
      console.error(`\nKI-Fehler ${antwort.status}. Frag den Trainer.`);
    }
    process.exit(1);
  }

  const daten = await antwort.json();
  return daten.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "(keine Antwort)";
}
