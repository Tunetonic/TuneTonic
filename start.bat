@echo off

start /b docker-compose up

timeout /t 5 /nobreak

call services/expo-qrcode/start.bat

