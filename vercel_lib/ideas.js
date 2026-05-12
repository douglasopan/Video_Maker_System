const crypto = require("crypto");

const MIN_REAL_REFERENCES = 3;

const queryMap = {
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
  "horror-pov": ["horror POV short video trend", "scary POV TikTok story", "found footage horror short video"],
  "survival-stories": ["survival story short video trend", "lost hiker survival story shorts", "wilderness survival viral story"],
  "mystery-stories": ["mystery story short video trend", "unexplained mystery shorts storytelling", "short mystery twist story video"],
  "animated-moral-stories": ["animated moral story shorts", "moral story YouTube Shorts", "animated story TikTok trend"],
  "bizarre-facts": ["bizarre facts shorts trend", "weird facts YouTube Shorts", "strange facts TikTok viral"],
  "historical-drama-shorts": ["historical drama shorts", "history storytelling YouTube Shorts", "historical TikTok story trend"],
  "animal-rescue-stories": ["animal rescue story shorts", "animal rescue viral video", "pet rescue TikTok story"],
  "scary-camping-stories": ["scary camping story shorts", "camping horror TikTok story", "campfire horror YouTube Shorts"],
  "court-case-stories": ["court case story shorts", "courtroom drama YouTube Shorts", "legal story TikTok trend"],
  "emergency-call-stories": ["emergency call story shorts", "911 call story YouTube Shorts", "dispatcher story TikTok"],
  "creepy-neighbor-stories": ["creepy neighbor story shorts", "neighbor mystery TikTok story", "suburban mystery YouTube Shorts"],
  "lost-footage-stories": ["lost footage story shorts", "found footage mystery shorts", "lost tape horror TikTok"],
};

const productionTraits = {
  "ai-bodycam-stories": { ease: 92, safety: 74, scale: 94, global: 90, risk: 40 },
  "police-encounter-stories": { ease: 70, safety: 48, scale: 80, global: 77, risk: 78 },
  "true-crime-shorts": { ease: 62, safety: 36, scale: 72, global: 80, risk: 87 },
  "horror-pov": { ease: 88, safety: 62, scale: 88, global: 87, risk: 58 },
  "survival-stories": { ease: 82, safety: 66, scale: 80, global: 84, risk: 55 },
  "mystery-stories": { ease: 85, safety: 82, scale: 90, global: 88, risk: 38 },
  "animated-moral-stories": { ease: 90, safety: 90, scale: 92, global: 85, risk: 24 },
  "bizarre-facts": { ease: 87, safety: 86, scale: 94, global: 82, risk: 30 },
  "historical-drama-shorts": { ease: 75, safety: 64, scale: 76, global: 78, risk: 50 },
  "animal-rescue-stories": { ease: 77, safety: 70, scale: 82, global: 88, risk: 48 },
  "scary-camping-stories": { ease: 89, safety: 66, scale: 87, global: 85, risk: 52 },
  "court-case-stories": { ease: 73, safety: 50, scale: 78, global: 74, risk: 74 },
  "emergency-call-stories": { ease: 80, safety: 56, scale: 86, global: 84, risk: 66 },
  "creepy-neighbor-stories": { ease: 86, safety: 68, scale: 89, global: 84, risk: 50 },
  "lost-footage-stories": { ease: 88, safety: 64, scale: 88, global: 87, risk: 55 },
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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function queriesForNiche(nicheId, nicheName, limit = 5) {
  return [...new Set([...(queryMap[nicheId] || []), `${nicheName} viral shorts`, `${nicheName} YouTube Shorts storytelling`])].slice(0, limit);
}

function parseDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function scoreReference(title, published, source) {
  const text = `${title} ${source}`.toLowerCase();
  let score = 45;
  for (const keyword of ["short", "shorts", "viral", "tiktok", "youtube", "reels", "bodycam", "mystery", "story", "pov", "footage", "horror"]) {
    if (text.includes(keyword)) score += 4;
  }
  const date = parseDate(published);
  if (date) {
    const days = (Date.now() - date.getTime()) / 86400000;
    if (days <= 30) score += 14;
    else if (days <= 120) score += 8;
    else if (days <= 365) score += 4;
  }
  return clamp(score, 0, 100);
}

async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 VideoMakerSystem/1.0" },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function googleNews(query, limit = 5) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`Google News ${response.status}`);
  const xml = await response.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit);
  return items
    .map((match) => {
      const block = match[1];
      const title = stripTags(block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s)?.[1] || block.match(/<title>(.*?)<\/title>/s)?.[1]);
      const link = stripTags(block.match(/<link>(.*?)<\/link>/s)?.[1]);
      const source = stripTags(block.match(/<source[^>]*>(.*?)<\/source>/s)?.[1] || "Google News");
      const published = stripTags(block.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1]);
      return { title, url: link, source, published, query, type: "news", score: scoreReference(title, published, source) };
    })
    .filter((item) => item.title && item.url);
}

async function fetchReferences(nicheId, nicheName, options = {}) {
  const queryLimit = options.queryLimit || 5;
  const perQueryLimit = options.perQueryLimit || 5;
  const maxReferences = options.maxReferences || 18;
  const queries = queriesForNiche(nicheId, nicheName, queryLimit);
  const results = await Promise.allSettled(queries.map((query) => googleNews(query, perQueryLimit)));
  const references = [];
  const errors = [];

  for (const result of results) {
    if (result.status === "fulfilled") references.push(...result.value);
    else errors.push(result.reason?.message || "Search failed");
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
    .slice(0, maxReferences);

  return {
    niche_id: nicheId,
    niche_name: nicheName,
    fetched_at: new Date().toISOString(),
    queries,
    references: unique,
    has_real_data: unique.length >= MIN_REAL_REFERENCES,
    min_real_references: MIN_REAL_REFERENCES,
    errors,
  };
}

function detailFromReference(reference) {
  const title = String(reference.title || "").toLowerCase();
  if (title.includes("basement")) return "a locked basement appears in a house marked vacant";
  if (title.includes("footage")) return "one corrupted frame reveals a second camera angle";
  if (title.includes("bodycam")) return "the most replayed second contains a hidden reflection";
  if (title.includes("viral")) return "the hook lands before the viewer understands the location";
  if (title.includes("court")) return "one courtroom detail changes the whole story";
  if (title.includes("rescue")) return "the rescue footage hides a detail viewers will debate";
  return `a real trend signal from ${reference.source || "the source"} points to a stronger hook`;
}

function generateIdeas(nicheId, nicheName, references, count) {
  if (!references || references.length < MIN_REAL_REFERENCES) {
    const error = new Error(`Not enough real references for ${nicheName}. Found ${references?.length || 0}, need ${MIN_REAL_REFERENCES}.`);
    error.statusCode = 424;
    throw error;
  }

  const ideas = [];
  let guard = 0;

  while (ideas.length < count && guard < count * 20) {
    guard += 1;
    const reference = references[guard % references.length];
    const title = `${pick(titleSeeds)} ${pick(suffixes)}`;
    if (generatedTitles.has(title)) continue;
    generatedTitles.add(title);
    const clue = detailFromReference(reference);
    const ideaKey = hash(`${nicheId}:${title}:${clue}:${reference.url}:${Date.now()}:${Math.random()}`);

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

function analyzeNicheResearch(niche) {
  const references = niche.references || [];
  const traits = productionTraits[niche.id] || { ease: 70, safety: 65, scale: 70, global: 70, risk: 55 };
  const sources = [...new Set(references.map((reference) => reference.source).filter(Boolean))];
  const averageReferenceScore = references.length
    ? Math.round(references.reduce((total, reference) => total + (reference.score || 0), 0) / references.length)
    : 0;
  const recentCount = references.filter((reference) => {
    const date = parseDate(reference.published);
    return date && (Date.now() - date.getTime()) / 86400000 <= 120;
  }).length;
  const realDataScore = clamp(references.length * 5 + sources.length * 4 + recentCount * 5 + averageReferenceScore * 0.35, 0, 100);
  const opportunityScore = Math.round(
    realDataScore * 0.45 +
      traits.ease * 0.16 +
      traits.scale * 0.14 +
      traits.global * 0.1 +
      traits.safety * 0.1 -
      traits.risk * 0.05,
  );
  const topSources = sources.slice(0, 4);

  return {
    id: niche.id,
    name: niche.name,
    score: clamp(opportunityScore, 0, 100),
    realDataScore: Math.round(realDataScore),
    referencesCount: references.length,
    sourcesCount: sources.length,
    recentCount,
    averageReferenceScore,
    productionEase: traits.ease,
    safetyScore: traits.safety,
    scaleScore: traits.scale,
    globalAppeal: traits.global,
    riskScore: traits.risk,
    hasRealData: references.length >= MIN_REAL_REFERENCES,
    topSources,
    queries: niche.queries || [],
    references: references.slice(0, 6),
    errors: niche.errors || [],
    reason:
      references.length >= MIN_REAL_REFERENCES
        ? `${references.length} real references found across ${sources.length} sources, with ${recentCount} recent signals.`
        : `Only ${references.length} real references found. Production should not start until at least ${MIN_REAL_REFERENCES} useful sources are available.`,
  };
}

async function researchNiches(niches) {
  const researched = await Promise.all(
    niches.map(async (niche) => {
      const payload = await fetchReferences(niche.id, niche.name, {
        queryLimit: 3,
        perQueryLimit: 5,
        maxReferences: 10,
      });
      return analyzeNicheResearch({ ...niche, ...payload });
    }),
  );
  return researched.sort((a, b) => b.score - a.score);
}

module.exports = {
  MIN_REAL_REFERENCES,
  fetchReferences,
  generateIdeas,
  analyzeNicheResearch,
  researchNiches,
};
