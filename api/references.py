from __future__ import annotations

import json
import sys
import urllib.parse
from http.server import BaseHTTPRequestHandler
from pathlib import Path


sys.path.append(str(Path(__file__).resolve().parents[1]))

from server import fetch_references


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed.query)
        niche_id = query.get("nicheId", ["custom"])[0]
        niche_name = query.get("niche", [niche_id])[0]
        force_fresh = query.get("fresh", ["0"])[0] == "1"
        payload = fetch_references(niche_id, niche_name, force_fresh=force_fresh)
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
