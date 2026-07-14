@echo off
cd /d "%~dp0"
echo Starting preview server for Tonight Not Sleeping...
echo.
echo Open on this computer:
echo   http://127.0.0.1:5173/index.html
echo.
echo If you want to open from phone, use your computer's Wi-Fi IPv4 address:
echo   http://YOUR_COMPUTER_IP:5173/index.html
echo.
echo Keep this window open while previewing.
echo Press Ctrl+C to stop.
echo.
"C:\Users\93785\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 5173 --bind 0.0.0.0
