# paket-bauen.ps1 — baut die passwortgeschuetzte Schueler-EXE neu.
# Enthaelt selbst KEINEN Key. Der Key kommt aus deiner key.txt (Parameter -KeyFile).
#
# Beispiel:
#   powershell -ExecutionPolicy Bypass -File paket-bauen.ps1 `
#     -KeyFile "C:\pfad\key.txt" -Passwort "MeinKursPasswort" `
#     -Bundle "C:\...\gemini-ki-portable-mit-node"
#
# Voraussetzung: 7-Zip installiert (winget install 7zip.7zip).

param(
  [Parameter(Mandatory=$true)][string]$KeyFile,
  [Parameter(Mandatory=$true)][string]$Passwort,
  [Parameter(Mandatory=$true)][string]$Bundle,          # entpackter Gemini-CLI-Bundle-Ordner
  [string]$StartDir = (Split-Path -Parent $MyInvocation.MyCommand.Path),  # dieser Ordner (Starter)
  [string]$Arbeit = "C:\c4k\KI-Workshop-Start",
  [string]$Out = "C:\c4k\KI-Workshop-Start.exe"
)

$ErrorActionPreference = 'Stop'
$7z = 'C:\Program Files\7-Zip\7z.exe'
$sfx = 'C:\Program Files\7-Zip\7z.sfx'
if (-not (Test-Path $7z)) { throw "7-Zip fehlt. Erst: winget install 7zip.7zip" }

# Struktur frisch aufbauen
if (Test-Path -LiteralPath $Arbeit) { Remove-Item -LiteralPath $Arbeit -Recurse -Force }
New-Item -ItemType Directory -Force -Path "$Arbeit\Gemini-CLI" | Out-Null
New-Item -ItemType Directory -Force -Path "$Arbeit\KI-Lab-App" | Out-Null

# Gemini-CLI-Bundle kopieren (ohne .unblocked), Key rein
robocopy $Bundle "$Arbeit\Gemini-CLI" /E /XF ".unblocked" /NFL /NDL /NJH /NJS /NP | Out-Null
Copy-Item -LiteralPath $KeyFile -Destination "$Arbeit\Gemini-CLI\key.txt" -Force

# App-Starter + Key
Copy-Item -LiteralPath "$StartDir\START-KI-LAB.cmd","$StartDir\STOP-KI-LAB.cmd","$StartDir\LIESMICH.txt" -Destination "$Arbeit\KI-Lab-App\" -Force
Copy-Item -LiteralPath $KeyFile -Destination "$Arbeit\KI-Lab-App\key.txt" -Force
if (Test-Path "$StartDir\..\..\materialien\schueler-start\START-HIER-LIESMICH.txt") {} # optional

# Passwortgeschuetzte, selbst-entpackende EXE (AES-256, Header verschluesselt)
if (Test-Path -LiteralPath $Out) { Remove-Item -LiteralPath $Out -Force }
& $7z a -t7z ("-sfx" + $sfx) ("-p" + $Passwort) -mhe=on -mx=5 $Out $Arbeit | Out-Null
if ($LASTEXITCODE -ne 0) { throw "7z-Build fehlgeschlagen (exit $LASTEXITCODE)" }

Write-Output ("Fertig: " + $Out + "  (" + [math]::Round((Get-Item $Out).Length/1MB,1) + " MB)")
Write-Output "Passwort den Kindern muendlich geben. Key nach dem Workshop rotieren."
