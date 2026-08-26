@echo off
cd /d "%~dp0"
echo Compilando 8 Damas para Android...
call npm install
call npm run apk
echo.
echo APK en dist-android\OchoDamas-1.0.0.apk
pause
