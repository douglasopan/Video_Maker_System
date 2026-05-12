@echo off
cd /d "%~dp0"
python tools\local_server.py --host 127.0.0.1 --port 4173
