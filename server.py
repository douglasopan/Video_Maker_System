from __future__ import annotations

import argparse
import email.utils
import hashlib
import html
import json
import random
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
HISTORY_FILE = DATA_DIR / "idea-history.json"
CACHE_FILE = DATA_DIR / "reference-cache.json"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0 Safari/537.36"
)

NICHE_QUERY_MAP = {
    "ai-bodycam-stories": [
        "bodycam mystery story shorts",
        "fictional bodycam horror story short video",
        "bodycam footage mystery viral shorts",
        "police bodycam storytelling YouTube Shorts",
    ],
    "police-encounter-stories": [
        "police encounter story short video",
        "police bodycam encounter viral shorts",
        "traffic stop story YouTube Shorts",
    ],
    "true-crime-shorts": [
        "true crime shorts storytelling trend",
        "true crime YouTube Shorts mystery",
        "short true crime documentary viral",
    ],
    "horror-pov": [
        "horror POV short video trend",
        "scary POV TikTok story",
        "found footage horror short video",
    ],
    "survival-stories": [
        "survival story short video trend",
        "lost hiker survival story shorts",
        "wilderness survival viral story",
    ],
    "mystery-stories": [
        "mystery story short video trend",
        "unexplained mystery shorts storytelling",
        "short mystery twist story video",
    ],
}

HOOK_TEMPLATES = [
    "A routine check turns strange when {detail}.",
    "Everyone thinks the scene is normal until {detail}.",
    "The first frame looks harmless, but {detail}.",
    "A simple report becomes disturbing after {detail}.",
    "The camera catches one clue that changes the whole story: {detail}.",
    "The narrator misses the warning, but viewers can see {detail}.",
    "A quiet scene gets worse when {detail}.",
    "The answer is hidden in the background, where {detail}.",
]

TWIST_TEMPLATES = [
    "the timestamp proves the event started before the protagonist arrived",
    "the person calling for help was visible in the opening shot",
    "the safest-looking character was the only one who knew the truth",
    "the final frame reveals a second camera watching the first",
    "the clue everyone ignored was moving between cuts",
    "the voice on the recording belongs to someone who is not in the scene",
    "the warning sign is written in the protagonist's handwriting",
    "the location was empty because the event already happened",
    "the object in the background appears in every scene, closer each time",
    "the final image makes viewers replay the first three seconds",
]

DETAIL_TEMPLATES = [
    "a light turns on in a room that should be empty",
    "the radio answers before anyone speaks",
    "a shadow points toward the wrong door",
    "the same symbol appears in three different places",
    "a child's drawing matches the exact camera angle",
    "a disconnected phone number calls again",
    "a reflection shows someone standing behind the camera",
    "the door closes from the inside",
    "a map shows one extra street",
    "the audio contains a whisper under the static",
]

ANGLE_TEMPLATES = [
    "Build the video around a clean first-second hook, one visual clue, and a final twist.",
    "Keep the story fictional, safe, and designed for replay value.",
    "Use realistic AI-generated scenes instead of real footage or real people.",
    "Make the comments prompt obvious: ask viewers what detail they noticed first.",
    "Use short, punchy narration with a documentary rhythm and no graphic content.",
]

TITLE_SUFFIXES = [
    "at the Vacant House",
    "under the Static",
    "behind the Wrong Door",
    "inside the Missing Minute",
    "from the Porch Reflection",
    "near the Basement Wall",
    "before Dispatch Answered",
    "after the Door Closed",
    "in the Second Camera Angle",
    "beneath the Timestamp",
    "beside the Unmarked Map",
    "from the Last Radio Call",
]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_data_dir() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not HISTORY_FILE.exists():
        HISTORY_FILE.write_text(json.dumps({"ideas": []}, indent=2), encoding="utf-8")
    if not CACHE_FILE.exists():
        CACHE_FILE.write_text(json.dumps({"references": {}}, indent=2), encoding="utf-8")


def read_json(path: Path, fallback: dict[str, Any]) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return fallback


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def http_get(url: str, timeout: int = 12) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def strip_tags(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def decode_duck_url(url: str) -> str:
    unescaped = html.unescape(url)
    parsed = urllib.parse.urlparse(unescaped)
    params = urllib.parse.parse_qs(parsed.query)
    if "uddg" in params:
        return params["uddg"][0]
    return unescaped


def parse_pub_date(value: str | None) -> str:
    if not value:
        return ""
    try:
        parsed = email.utils.parsedate_to_datetime(value)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc).isoformat()
    except Exception:
        return value


def score_reference(title: str, source: str, published: str) -> int:
    text = f"{title} {source}".lower()
    score = 50
    for keyword in [
        "short",
        "shorts",
        "tiktok",
        "youtube",
        "viral",
        "bodycam",
        "mystery",
        "story",
        "pov",
        "footage",
        "strange",
        "horror",
    ]:
        if keyword in text:
            score += 4
    if published:
        try:
            age_days = (datetime.now(timezone.utc) - datetime.fromisoformat(published)).days
            if age_days <= 7:
                score += 12
            elif age_days <= 30:
                score += 8
            elif age_days <= 120:
                score += 4
        except Exception:
            pass
    return max(0, min(score, 100))


def google_news_references(query: str, limit: int = 8) -> list[dict[str, Any]]:
    encoded = urllib.parse.quote_plus(query)
    url = f"https://news.google.com/rss/search?q={encoded}&hl=en-US&gl=US&ceid=US:en"
    body = http_get(url)
    root = ET.fromstring(body)
    results: list[dict[str, Any]] = []
    for item in root.findall(".//item")[:limit]:
        title = strip_tags(item.findtext("title", ""))
        link = item.findtext("link", "")
        source = item.findtext("source", "") or "Google News"
        published = parse_pub_date(item.findtext("pubDate"))
        if not title or not link:
            continue
        results.append(
            {
                "title": title,
                "url": link,
                "source": strip_tags(source),
                "published": published,
                "query": query,
                "type": "news",
                "score": score_reference(title, source, published),
            }
        )
    return results


def duckduckgo_references(query: str, limit: int = 8) -> list[dict[str, Any]]:
    encoded = urllib.parse.quote_plus(query)
    url = f"https://duckduckgo.com/html/?q={encoded}"
    body = http_get(url)
    pattern = re.compile(
        r'<a[^>]+class="result__a"[^>]+href="(?P<href>[^"]+)"[^>]*>(?P<title>.*?)</a>',
        re.IGNORECASE | re.DOTALL,
    )
    results: list[dict[str, Any]] = []
    for match in pattern.finditer(body):
        title = strip_tags(match.group("title"))
        link = decode_duck_url(match.group("href"))
        if not title or not link:
            continue
        domain = urllib.parse.urlparse(link).netloc.replace("www.", "")
        results.append(
            {
                "title": title,
                "url": link,
                "source": domain or "DuckDuckGo",
                "published": "",
                "query": query,
                "type": "web",
                "score": score_reference(title, domain, ""),
            }
        )
        if len(results) >= limit:
            break
    return results


def fallback_references(niche_name: str) -> list[dict[str, Any]]:
    seed_titles = [
        f"{niche_name} format reference: strong first-second hook",
        f"{niche_name} pacing reference: short setup, fast escalation, final twist",
        f"{niche_name} visual reference: AI-friendly fictional scenes",
    ]
    return [
        {
            "title": title,
            "url": "",
            "source": "Internal fallback",
            "published": now_iso(),
            "query": niche_name,
            "type": "fallback",
            "score": 50,
        }
        for title in seed_titles
    ]


def queries_for_niche(niche_id: str, niche_name: str) -> list[str]:
    base = NICHE_QUERY_MAP.get(niche_id, [])
    generic = [
        f"{niche_name} viral shorts",
        f"{niche_name} YouTube Shorts storytelling",
        f"{niche_name} TikTok story trend",
    ]
    return list(dict.fromkeys([*base, *generic]))[:5]


def fetch_references(niche_id: str, niche_name: str, force_fresh: bool = False) -> dict[str, Any]:
    ensure_data_dir()
    cache = read_json(CACHE_FILE, {"references": {}})
    cache_key = f"{niche_id}:{niche_name.lower()}"
    cached = cache.get("references", {}).get(cache_key)
    if cached and not force_fresh:
        fetched_at = cached.get("fetched_at", "")
        try:
            age = time.time() - datetime.fromisoformat(fetched_at).timestamp()
            if age < 60 * 30:
                return cached
        except Exception:
            pass

    queries = queries_for_niche(niche_id, niche_name)
    references: list[dict[str, Any]] = []
    errors: list[str] = []
    for query in queries:
        try:
            references.extend(google_news_references(query, limit=5))
        except Exception as exc:
            errors.append(f"Google News failed for {query}: {exc}")
        try:
            references.extend(duckduckgo_references(query, limit=5))
        except Exception as exc:
            errors.append(f"DuckDuckGo failed for {query}: {exc}")

    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for reference in sorted(references, key=lambda item: item.get("score", 0), reverse=True):
        key = reference.get("url") or reference.get("title", "").lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append(reference)
        if len(unique) >= 18:
            break

    if not unique:
        unique = fallback_references(niche_name)

    payload = {
        "niche_id": niche_id,
        "niche_name": niche_name,
        "fetched_at": now_iso(),
        "queries": queries,
        "references": unique,
        "errors": errors[-5:],
    }
    cache.setdefault("references", {})[cache_key] = payload
    write_json(CACHE_FILE, cache)
    return payload


def stable_hash(value: str) -> str:
    return hashlib.sha1(value.encode("utf-8")).hexdigest()[:10]


def get_used_idea_keys() -> set[str]:
    history = read_json(HISTORY_FILE, {"ideas": []})
    return {item.get("key", "") for item in history.get("ideas", []) if item.get("key")}


def get_used_titles() -> set[str]:
    history = read_json(HISTORY_FILE, {"ideas": []})
    return {item.get("title", "").strip().lower() for item in history.get("ideas", []) if item.get("title")}


def save_ideas_to_history(ideas: list[dict[str, Any]]) -> None:
    history = read_json(HISTORY_FILE, {"ideas": []})
    existing = {item.get("key", "") for item in history.get("ideas", [])}
    for idea in ideas:
        if idea["key"] in existing:
            continue
        history.setdefault("ideas", []).append(
            {
                "key": idea["key"],
                "title": idea["title"],
                "niche_id": idea["nicheId"],
                "reference_title": idea.get("referenceTitle", ""),
                "created_at": now_iso(),
            }
        )
        existing.add(idea["key"])
    history["ideas"] = history.get("ideas", [])[-500:]
    write_json(HISTORY_FILE, history)


def extract_reference_detail(reference: dict[str, Any], rng: random.Random) -> str:
    # References are only used as format signals. Keep generated stories fictional
    # and avoid importing names, accusations, real victims, or real-case details.
    title = reference.get("title", "").lower()
    motif_map = [
        (("basement", "cellar"), "a locked basement appears in a house marked vacant"),
        (("horror", "disturbing", "scary"), "the calmest room contains the most impossible clue"),
        (("found footage", "footage", "recording"), "one corrupted frame reveals a second camera angle"),
        (("staged", "fake", "ai"), "one background detail suggests the footage was intentionally staged"),
        (("porch", "door"), "the front door opens before anyone reaches it"),
        (("bear", "animal", "emu"), "the radio reports movement outside, but the shadow is human-shaped"),
        (("crash", "traffic", "stop"), "the road sign changes between two bodycam cuts"),
        (("viral", "social media"), "the most replayed second contains a hidden reflection"),
        (("short", "shorts", "tiktok", "youtube"), "the hook lands before the viewer understands the location"),
    ]
    for keywords, detail in motif_map:
        if any(keyword in title for keyword in keywords):
            return detail
    return rng.choice(DETAIL_TEMPLATES)


def generate_ideas(niche_id: str, niche_name: str, references: list[dict[str, Any]], count: int) -> list[dict[str, Any]]:
    used = get_used_idea_keys()
    used_titles = get_used_titles()
    batch_titles: set[str] = set()
    rng = random.Random(f"{niche_id}:{time.time_ns()}")
    references = references or fallback_references(niche_name)
    ideas: list[dict[str, Any]] = []
    attempts = 0

    while len(ideas) < count and attempts < count * 12:
        attempts += 1
        reference = references[(attempts + rng.randrange(len(references))) % len(references)]
        detail = extract_reference_detail(reference, rng)
        hook = rng.choice(HOOK_TEMPLATES).format(detail=detail)
        twist = rng.choice(TWIST_TEMPLATES)
        angle = rng.choice(ANGLE_TEMPLATES)
        title_seed = rng.choice(
            [
                "The Camera Was Already Recording",
                "The Door Opened Before the Call",
                "The Missing Minute on the Bodycam",
                "The Voice Under the Static",
                "The Drawing on the Kitchen Table",
                "The Timestamp Nobody Noticed",
                "The Shadow in the Porch Reflection",
                "The Basement Knock at 2 A.M.",
                "The House That Called Dispatch",
                "The Last Frame Changed Everything",
                "The Officer Saw Tomorrow's Footage",
                "The Map Had One Extra Street",
            ]
        )
        title = f"{title_seed} {rng.choice(TITLE_SUFFIXES)}"
        title_key = title.lower()
        if title_key in used_titles or title_key in batch_titles:
            continue
        variant = rng.randint(100, 999)
        key = stable_hash(f"{niche_id}:{title}:{detail}:{twist}:{reference.get('url')}:{variant}")
        if key in used:
            continue
        ideas.append(
            {
                "id": f"{niche_id}-live-{key}",
                "key": key,
                "title": title,
                "hook": hook,
                "twist": twist,
                "angle": angle,
                "length": rng.choice(["45-60 seconds", "50-65 seconds", "35-55 seconds"]),
                "nicheId": niche_id,
                "referenceTitle": reference.get("title", ""),
                "referenceUrl": reference.get("url", ""),
                "referenceSource": reference.get("source", ""),
                "noveltySeed": variant,
            }
        )
        used.add(key)
        used_titles.add(title_key)
        batch_titles.add(title_key)

    if len(ideas) < count:
        for index in range(len(ideas), count):
            key = stable_hash(f"{niche_id}:fallback:{time.time_ns()}:{index}")
            ideas.append(
                {
                    "id": f"{niche_id}-live-{key}",
                    "key": key,
                    "title": f"Fresh Twist Concept {index + 1} {rng.choice(TITLE_SUFFIXES)}",
                    "hook": rng.choice(HOOK_TEMPLATES).format(detail=rng.choice(DETAIL_TEMPLATES)),
                    "twist": rng.choice(TWIST_TEMPLATES),
                    "angle": rng.choice(ANGLE_TEMPLATES),
                    "length": "45-60 seconds",
                    "nicheId": niche_id,
                    "referenceTitle": "Generated fallback concept",
                    "referenceUrl": "",
                    "referenceSource": "Internal generator",
                    "noveltySeed": rng.randint(100, 999),
                }
            )

    save_ideas_to_history(ideas)
    return ideas


class VideoMakerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, payload: dict[str, Any], status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed.query)

        if parsed.path == "/api/health":
            self.send_json({"ok": True, "time": now_iso()})
            return

        if parsed.path == "/api/references":
            niche_id = query.get("nicheId", ["custom"])[0]
            niche_name = query.get("niche", [niche_id])[0]
            force_fresh = query.get("fresh", ["0"])[0] == "1"
            payload = fetch_references(niche_id, niche_name, force_fresh=force_fresh)
            self.send_json(payload)
            return

        if parsed.path == "/api/generate-ideas":
            niche_id = query.get("nicheId", ["custom"])[0]
            niche_name = query.get("niche", [niche_id])[0]
            count = max(1, min(int(query.get("count", ["10"])[0]), 25))
            force_fresh = query.get("fresh", ["0"])[0] == "1"
            reference_payload = fetch_references(niche_id, niche_name, force_fresh=force_fresh)
            ideas = generate_ideas(niche_id, niche_name, reference_payload["references"], count)
            self.send_json(
                {
                    "niche_id": niche_id,
                    "niche_name": niche_name,
                    "generated_at": now_iso(),
                    "ideas": ideas,
                    "references": reference_payload["references"],
                    "queries": reference_payload["queries"],
                    "errors": reference_payload.get("errors", []),
                }
            )
            return

        return super().do_GET()


def main() -> None:
    parser = argparse.ArgumentParser(description="Video Maker Viral System local server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()

    ensure_data_dir()
    server = ThreadingHTTPServer((args.host, args.port), VideoMakerHandler)
    print(f"Video Maker Viral System running at http://{args.host}:{args.port}/")
    print("Press Ctrl+C to stop.")
    server.serve_forever()


if __name__ == "__main__":
    main()
