from __future__ import annotations

import json
import sys
import urllib.parse
from http.server import BaseHTTPRequestHandler
from pathlib import Path


sys.path.append(str(Path(__file__).resolve().parents[1]))

from lib.backend_core import fetch_references, generate_ideas, now_iso


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed.query)
        niche_id = query.get("nicheId", ["custom"])[0]
        niche_name = query.get("niche", [niche_id])[0]
        try:
            count = int(query.get("count", ["10"])[0])
        except ValueError:
            count = 10
        count = max(1, min(count, 25))
        force_fresh = query.get("fresh", ["0"])[0] == "1"
        reference_payload = fetch_references(niche_id, niche_name, force_fresh=force_fresh)
        ideas = generate_ideas(niche_id, niche_name, reference_payload["references"], count)
        payload = {
            "niche_id": niche_id,
            "niche_name": niche_name,
            "generated_at": now_iso(),
            "ideas": ideas,
            "references": reference_payload["references"],
            "queries": reference_payload["queries"],
            "errors": reference_payload.get("errors", []),
        }
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
