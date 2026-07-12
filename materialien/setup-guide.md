# Setup-Guide — KI Lab Workshop

Diese Anleitung richtet Deinen Laptop für den Workshop ein.
Alle Tools sind kostenlos.

---

## Was du brauchst

| Tool | Warum | Download |
|------|-------|---------|
| Node.js 22 | Für das Backend | nodejs.org |
| VS Code | Code-Editor | code.visualstudio.com |
| Browser | Chrome oder Firefox | vorinstalliert |

**Nicht nötig:** Docker, Kubernetes, Linux-Kenntnisse

---

## Schritt 1 — Node.js installieren

1. Gehe auf [nodejs.org](https://nodejs.org)
2. Klicke auf "LTS" (die grüne Schaltfläche)
3. Installer herunterladen und ausführen
4. Alle Standardeinstellungen belassen

**Prüfen ob es funktioniert:**
```
node --version
```
→ Muss `v22.x.x` zeigen

---

## Schritt 2 — VS Code installieren

1. Gehe auf [code.visualstudio.com](https://code.visualstudio.com)
2. Download und Installation
3. VS Code öffnen

**Empfohlene Erweiterungen** (optional aber nützlich):
- "Prettier" — Code automatisch formatieren

---

## Schritt 3 — Workshop-App starten

Der Trainer gibt dir die Workshop-App auf USB-Stick oder über das lokale Netzwerk.

```bash
# In den Workshop-App Ordner wechseln:
cd workshop-app

# Backend-Abhängigkeiten installieren:
cd backend
npm install
cd ..

# Frontend-Abhängigkeiten installieren:
cd frontend
npm install
cd ..
```

**API-Key eintragen** (der Trainer gibt dir den Key):
```bash
# Datei backend/.env erstellen und öffnen:
# Inhalt: GEMINI_API_KEY=AIzaSy-xxxxx
```

**App starten (zwei Terminals):**

Terminal 1 (Backend):
```bash
cd backend
node src/server.js
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Browser öffnen: `http://localhost:5173`

---

## Häufige Probleme

**"node: command not found"**
→ Node.js nicht korrekt installiert. Schritt 1 wiederholen.

**"npm ERR! ENOENT"**
→ Falscher Ordner. Prüfe mit `ls` ob du im richtigen Ordner bist.

**Seite lädt nicht**
→ Läuft das Backend? Fehlermeldungen im Terminal?

**Chat-Fehler "Kein API-Key"**
→ `.env` Datei fehlt oder API-Key falsch eingetragen.
