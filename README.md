# Video Maker System

Internal tool for discovering viral short-form niches and turning them into ideas, scripts, scene breakdowns, visual prompts, voiceovers, captions, production boards, and export packages.

## Features

- Real Niche Research board with weighted opportunity scoring
- Live reference research through Vercel functions and the local Python backend
- Fresh idea generation with local history to avoid repetition
- Script, scene, visual prompt, voiceover, caption, and export flows
- Export Center with separated video-generator prompts from 5 to 15 seconds
- Hard stop when real references are unavailable, so the app does not invent generic research data

## Run Locally

```bash
python tools/local_server.py --host 127.0.0.1 --port 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

On Windows, you can also run:

```bat
start.bat
```

## Optional Video Export Script

The video generation helper uses Pillow and FFmpeg:

```bash
python -m pip install -r requirements.txt
python tools/make_first_video.py
```

Generated videos and runtime cache are ignored by Git.

## Notes

The app uses public web/RSS search as a first MVP source of references. References are used only as trend and format signals; generated stories should remain fictional and should not copy real people, victims, allegations, or sensitive case details.
