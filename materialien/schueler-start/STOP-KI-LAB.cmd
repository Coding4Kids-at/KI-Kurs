@echo off
setlocal
title KI Lab beenden

echo.
echo   KI Lab wird beendet ...
docker rm -f ki-lab >nul 2>&1
echo   Erledigt. Die App ist gestoppt.
echo.
echo   Zum Weiterarbeiten einfach wieder START-KI-LAB.cmd doppelklicken.
echo.
pause
endlocal
