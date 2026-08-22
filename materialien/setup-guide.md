# Setup-Guide — KI Lab Workshop

Diese Anleitung richtet Deinen Laptop für den Workshop ein. Alle Tools sind kostenlos.

Auf den Workshop-Laptops ist meist schon alles vorinstalliert — deshalb **zuerst prüfen**, dann
nur das Fehlende nachholen.

---

## Was du brauchst

| Tool | Wofür | Download |
|------|-------|---------|
| Docker Desktop | Die KI-Lab-App läuft als fertiger Container | docker.com/products/docker-desktop |
| Node.js 24+ | Für deine eigenen Projekte ab Tag 3 (HTML/Backend) | nodejs.org |
| VS Code | Code-Editor für deine Projekte | code.visualstudio.com |
| Browser | Chrome oder Firefox | vorinstalliert |
| KI-Assistent (Gemini CLI) | ab Tag 3 | **nicht installieren** — fertiges Bundle vom Trainer |

---

## Schritt 1 — Prüfen, was schon da ist

Terminal öffnen (Windows-Taste → `PowerShell` → Enter) und nacheinander:

```
docker --version
node --version
```

- Kommt jeweils eine **Versionsnummer**? Dann ist das Tool da → den Installations-Schritt unten
  überspringen.
- Steht dort **„not recognized" / „nicht gefunden"**? Dann fehlt genau das → unten nachinstallieren.

---

## Schritt 2 — Docker Desktop (nur falls oben gefehlt)

1. [docker.com → Docker Desktop](https://www.docker.com/products/docker-desktop/) laden und installieren.
2. **PC einmal neu starten.**
3. Docker Desktop öffnen und warten, bis links unten der kleine Wal ruhig/grün ist (beim ersten Mal 1–2 Min).

> **Wichtig:** Der Wal muss laufen. `docker --version` zeigt die Nummer auch, wenn Docker nur
> installiert, aber **nicht gestartet** ist. Kommt später „Cannot connect to the Docker daemon",
> ist Docker Desktop einfach nicht offen.

---

## Schritt 3 — Node.js & VS Code (nur falls oben gefehlt)

- **Node.js:** [nodejs.org](https://nodejs.org) → große grüne Taste (Version **24 oder höher**),
  installieren, Terminal danach einmal neu öffnen. (Brauchst du ab Tag 3 für deine eigenen Projekte.)
- **VS Code:** [code.visualstudio.com](https://code.visualstudio.com) → installieren. Empfohlene
  Erweiterung: „Prettier".

---

## Schritt 4 — Die KI-Lab-App holen & starten

Die App kommt als fertiger Container — nichts zu bauen, nichts per npm zu installieren.

**App-Paket holen** (beim ersten Mal ein, zwei Minuten):
```
docker pull ghcr.io/intsanerarity/ki-lab:latest
```

**App starten** — der Trainer gibt dir den API-Key, den du hier einträgst:
```
docker run -d -p 3000:3000 --name ki-lab -e GEMINI_API_KEY=AIzaSy-KEY-VOM-TRAINER ghcr.io/intsanerarity/ki-lab:latest
```

Browser öffnen: **http://localhost:3000** → Namen eingeben, los geht's.

> Später wieder starten (nach Neustart): **nicht** nochmal `docker run` (Name schon vergeben),
> sondern `docker start ki-lab`. Dein Fortschritt bleibt erhalten.

---

## Schritt 5 — KI-Assistent (Gemini CLI, ab Tag 3): NICHT installieren

Die Gemini-CLI wird **nicht** installiert. Der Trainer verteilt ein fertiges Bundle (Node ist
mit drin → läuft ohne Vorinstallation): herunterladen, entpacken, Doppelklick auf `KI-STARTEN.cmd`
(Windows) bzw. `KI-starten.command` (Mac). Kein `npm install`, kein Login.

Direkter Download (empfohlen):
```
https://github.com/Coding4Kids-at/KI-Kurs/releases/download/v1.0/gemini-ki-portable-mit-node.zip
```

Der API-Key wird beim ersten Start abgefragt (derselbe Trainer-Key wie für die App).

---

## Häufige Probleme

**„Cannot connect to the Docker daemon"**
→ Docker Desktop ist nicht offen. Starten und warten, bis der Wal grün ist.

**http://localhost:3000 zeigt nichts**
→ Läuft der Container? `docker ps` prüfen; wenn `ki-lab` fehlt: `docker start ki-lab`.

**„The container name /ki-lab is already in use"**
→ App wurde schon gestartet. Nicht neu `run`en, sondern `docker start ki-lab`.

**Chat sagt „Trainer fragen" / kein API-Key**
→ Der Key wurde beim `docker run` nicht (oder falsch) mit `-e GEMINI_API_KEY=…` übergeben.
Container entfernen (`docker rm -f ki-lab`) und mit korrektem Key neu starten.

**`node`/`npm` nicht gefunden (bei eigenen Projekten ab Tag 3)**
→ Node.js aus Schritt 3 installieren, Terminal neu öffnen.
