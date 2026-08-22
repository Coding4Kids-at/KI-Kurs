@echo off
setlocal
cd /d "%~dp0"
title KI Lab starten

echo.
echo   ============================================================
echo     KI Lab wird gestartet ...
echo   ============================================================
echo.

REM --- Docker muss laufen ---
docker version >nul 2>&1
if errorlevel 1 (
  echo   Docker laeuft nicht. Bitte zuerst Docker Desktop oeffnen und
  echo   warten, bis es gruen ist. Dann diese Datei erneut doppelklicken.
  echo.
  pause
  exit /b 1
)

REM --- Key aus key.txt lesen (liegt neben dieser Datei) ---
set "KEY="
if exist "%~dp0key.txt" set /p KEY=<"%~dp0key.txt"
if "%KEY%"=="" (
  echo   Hinweis: keine key.txt gefunden. Die App startet trotzdem,
  echo   der KI-Chat sagt dann "Trainer fragen". Frag den Trainer nach der key.txt.
  echo.
)

REM --- alten Container entfernen, neuestes Image holen, starten ---
echo   Alte Version aufraeumen ...
docker rm -f ki-lab >nul 2>&1
echo   Neueste Version laden (kann beim ersten Mal 1-2 Minuten dauern) ...
docker pull ghcr.io/intsanerarity/ki-lab:latest
echo   Starten ...
docker run -d -p 3000:3000 --name ki-lab -e GEMINI_API_KEY=%KEY% ghcr.io/intsanerarity/ki-lab:latest >nul

REM --- kurz warten, dann Browser oeffnen ---
timeout /t 3 >nul
start "" "http://localhost:3000"

echo.
echo   Fertig! Die App ist im Browser offen: http://localhost:3000
echo   Zum Beenden die Datei STOP-KI-LAB.cmd doppelklicken.
echo.
echo   Dieses Fenster kannst du jetzt schliessen.
echo.
pause
endlocal
