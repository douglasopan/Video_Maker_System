const crypto = require("crypto");

const queryMap = {
  "ai-bodycam-stories": [
    "bodycam mystery story shorts",
    "fictional bodycam horror story short video",
    "bodycam footage mystery viral shorts",
    "police bodycam storytelling YouTube Shorts",
  ],
  "horror-pov": ["horror POV short video trend", "scary POV TikTok story", "found footage horror short video"],
  "mystery-stories": ["mystery story short video trend", "unexplained mystery shorts storytelling"],
};

const titleSeeds = [
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
];

const suffixes = [
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
];

const details = [
  "a locked basement appears in a house marked vacant",
  "one corrupted frame reveals a second camera angle",
  "the front door opens before anyone reaches it",
  "the most replayed second contains a hidden reflection",
  "the road sign changes between two bodycam cuts",
  "the hook lands before the viewer understands the location",
  "a light turns on in a room that should be empty",
  "the radio answers before anyone speaks",
  "a child's drawing matches the exact camera angle",
  "the audio contains a whisper under the static",
];

const twists = [
  "the timestamp proves the event started before the protagonist arrived",
  "the person calling for help was visible in the opening shot",
  "the safest-looking character was the only one who knew the truth",
  "the final frame reveals a second camera watching the first",
  "the clue everyone ignored was moving between cuts",
  "the voice on the recording belongs to someone who is not in the scene",
  "the warning sign is written in the protagonist's handwriting",
  "the location was empty because the event already happened",
];

const angles = [
  "Build the video around a clean first-second hook, one visual clue, and a final twist.",
  "Keep the story fictional, safe, and designed for replay value.",
  "Use realistic AI-generated scenes instead of real footage or real people.",
  "Make the comments prompt obvious: ask viewers what detail they noticed first.",
];

const generatedTitles = new Set();

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function hash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 10);
}

function stripTags(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function queriesForNiche(nicheId, nicheName) {
  return [...new Set([...(queryMap[nicheId] || []), `${nicheName} viral shorts`, `${nicheName} YouTube Shorts storytelling`])].slice(0, 5);
}

function scoreReference(title, published) {
  const text = title.toLowerCase();
  let score = 50;
  for (const keyword of ["short", "shorts", "viral", "bodycam", "mystery", "story", "pov", "footage", "horror"]) {
    if (text.includes(keyword)) score += 4;
  }
  if (published) score += 4;
  return Math.max(0, Math.min(score, 100));
}

async function googleNews(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 VideoMakerSystem/1.0" },
  });
  if (!response.ok) throw new Error(`Google News ${response.status}`);
  const xml = await response.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 5);
  return items
    .map((match) => {
      const block = match[1];
      const title = stripTags(block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s)?.[1] || block.match(/<title>(.*?)<\/title>/s)?.[1]);
      const link = stripTags(block.match(/<link>(.*?)<\/link>/s)?.[1]);
      const source = stripTags(block.match(/<source[^>]*>(.*?)<\/source>/s)?.[1] || "Google News");
      const published = stripTags(block.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1]);
      return { title, url: link, source, published, query, type: "news", score: scoreReference(title, published) };
    })
    .filter((item) => item.title && item.url);
}

function fallbackReferences(nicheName) {
  return [
    {
      title: `${nicheName} internal pattern: first-second hook, one clue, final twist`,
      url: "",
      source: "Internal fallback",
      published: new Date().toISOString(),
      query: nicheName,
      type: "fallback",
      score: 50,
    },
  ];
}

async function fetchReferences(nicheId, nicheName) {
  const queries = queriesForNiche(nicheId, nicheName);
  const references = [];
  const errors = [];

  for (const query of queries) {
    try {
      references.push(...(await googleNews(query)));
    } catch (error) {
      errors.push(`${query}: ${error.message}`);
    }
  }

  const seen = new Set();
  const unique = references
    .sort((a, b) => b.score - a.score)
    .filter((reference) => {
      const key = reference.url || reference.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 18);

  return {
    niche_id: nicheId,
    niche_name: nicheName,
    fetched_at: new Date().toISOString(),
    queries,
    references: unique.length ? unique : fallbackReferences(nicheName),
    errors,
  };
}

function detailFromReference(reference) {
  const title = String(reference.title || "").toLowerCase();
  if (title.includes("basement")) return "a locked basement appears in a house marked vacant";
  if (title.includes("footage")) return "one corrupted frame reveals a second camera angle";
  if (title.includes("bodycam")) return "the most replayed second contains a hidden reflection";
  if (title.includes("viral")) return "the hook lands before the viewer understands the location";
  return pick(details);
}

function generateIdeas(nicheId, nicheName, references, count) {
  const sourceReferences = references && references.length ? references : fallbackReferences(nicheName);
  const ideas = [];
  let guard = 0;

  while (ideas.length < count && guard < count * 20) {
    guard += 1;
    const reference = sourceReferences[guard % sourceReferences.length];
    const title = `${pick(titleSeeds)} ${pick(suffixes)}`;
    if (generatedTitles.has(title)) continue;
    generatedTitles.add(title);
    const clue = detailFromReference(reference);
    const ideaKey = hash(`${nicheId}:${title}:${clue}:${Date.now()}:${Math.random()}`);

    ideas.push({
      id: `${nicheId}-live-${ideaKey}`,
      key: ideaKey,
      title,
      hook: pick([
        `A routine check turns strange when ${clue}.`,
        `Everyone thinks the scene is normal until ${clue}.`,
        `The first frame looks harmless, but ${clue}.`,
        `The camera catches one clue that changes the whole story: ${clue}.`,
      ]),
      twist: pick(twists),
      angle: pick(angles),
      length: pick(["45-60 seconds", "50-65 seconds", "35-55 seconds"]),
      nicheId,
      referenceTitle: reference.title,
      referenceUrl: reference.url,
      referenceSource: reference.source,
      noveltySeed: Math.floor(Math.random() * 900) + 100,
    });
  }

  return ideas;
}

module.exports = {
  fetchReferences,
  generateIdeas,
};
