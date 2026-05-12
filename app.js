const pipelineSteps = [
  "Real Niche Research",
  "Idea Generator",
  "Script Builder",
  "Scene Breakdown",
  "Visual Prompt Generator",
  "Voiceover Builder",
  "Captions Builder",
  "Production Board",
  "Export Center",
];

const niches = [
  {
    id: "ai-bodycam-stories",
    name: "AI Bodycam Stories",
    metrics: {
      viralPotential: 9.1,
      aiProductionEase: 9.2,
      emotionalIntensity: 8.4,
      internationalAppeal: 9.0,
      volumePotential: 9.4,
      lowRealFootageDependence: 9.5,
      shortNarrativeEase: 9.1,
      retentionPotential: 9.3,
      commentPotential: 8.1,
      sensitiveRisk: 4.0,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: [
      "Strong first-second hooks",
      "Easy fictional scene generation",
      "Repeatable twist structure",
      "High retention pacing",
    ],
    risks: ["Police-adjacent themes need careful non-graphic handling", "Avoid real agency names"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["YouTube Shorts", "TikTok", "Instagram Reels"],
    recommendedVideoLength: "45-60 seconds",
    style: "Cinematic bodycam, tense narration, realistic documentary tone, strong twist ending.",
    reason:
      "This niche has high retention potential, strong first-second hooks, easy short-form storytelling structure, global appeal in English, and can be produced using AI-generated scenes without depending on real footage.",
    world: "late-night bodycam call",
    setting: "quiet suburban street",
    protagonist: "a responding officer",
  },
  {
    id: "police-encounter-stories",
    name: "Police Encounter Stories",
    metrics: {
      viralPotential: 9.2,
      aiProductionEase: 7.0,
      emotionalIntensity: 8.5,
      internationalAppeal: 7.7,
      volumePotential: 8.0,
      lowRealFootageDependence: 6.0,
      shortNarrativeEase: 8.5,
      retentionPotential: 8.9,
      commentPotential: 8.7,
      sensitiveRisk: 7.8,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: true,
      explicitViolenceRisk: true,
      realFactDependent: false,
    },
    strengths: ["High debate potential", "Clear conflict setups", "Strong hooks"],
    risks: ["High sensitivity", "Can imply real accusations", "Needs non-graphic framing"],
    productionDifficulty: "Medium",
    language: "English",
    platforms: ["YouTube Shorts", "TikTok"],
    recommendedVideoLength: "35-55 seconds",
    style: "Documentary-style encounters with fictional, de-escalated outcomes.",
    reason:
      "The niche can pull strong retention, but the sensitive-risk score is high, so it ranks below safer fictional formats.",
    world: "fictional public encounter",
    setting: "busy roadside stop",
    protagonist: "a witness with a phone camera",
  },
  {
    id: "true-crime-shorts",
    name: "True Crime Shorts",
    metrics: {
      viralPotential: 9.4,
      aiProductionEase: 6.2,
      emotionalIntensity: 9.0,
      internationalAppeal: 8.0,
      volumePotential: 7.2,
      lowRealFootageDependence: 5.2,
      shortNarrativeEase: 8.1,
      retentionPotential: 9.0,
      commentPotential: 8.6,
      sensitiveRisk: 8.7,
    },
    tags: {
      massProduction: false,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: true,
      explicitViolenceRisk: true,
      realFactDependent: true,
    },
    strengths: ["Very high curiosity", "Strong retention loops", "Large existing audience"],
    risks: ["Real victims", "Graphic subject matter", "Fact-checking burden"],
    productionDifficulty: "High",
    language: "English",
    platforms: ["YouTube Shorts", "Facebook Reels"],
    recommendedVideoLength: "45-75 seconds",
    style: "Careful documentary summary with no graphic detail.",
    reason:
      "True crime has major viral pull, but the safety, sourcing, and sensitivity penalties reduce its MVP score.",
    world: "case-file recap",
    setting: "archival investigation board",
    protagonist: "a narrator following one clue",
  },
  {
    id: "horror-pov",
    name: "Horror POV",
    metrics: {
      viralPotential: 8.4,
      aiProductionEase: 8.8,
      emotionalIntensity: 8.8,
      internationalAppeal: 8.7,
      volumePotential: 8.8,
      lowRealFootageDependence: 9.2,
      shortNarrativeEase: 8.9,
      retentionPotential: 8.8,
      commentPotential: 7.2,
      sensitiveRisk: 5.8,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Easy AI visuals", "Universal tension", "Strong twist format"],
    risks: ["Can become repetitive", "Avoid excessive gore"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["TikTok", "YouTube Shorts", "Instagram Reels"],
    recommendedVideoLength: "35-60 seconds",
    style: "POV camera, restrained horror, atmospheric sound, final reveal.",
    reason:
      "Horror POV is scalable and safe when kept non-graphic, but it trails AI bodycam stories on comment potential and novelty.",
    world: "first-person horror clip",
    setting: "dark hallway",
    protagonist: "someone recording alone",
  },
  {
    id: "survival-stories",
    name: "Survival Stories",
    metrics: {
      viralPotential: 8.0,
      aiProductionEase: 8.2,
      emotionalIntensity: 8.6,
      internationalAppeal: 8.4,
      volumePotential: 8.0,
      lowRealFootageDependence: 8.4,
      shortNarrativeEase: 8.2,
      retentionPotential: 8.4,
      commentPotential: 7.4,
      sensitiveRisk: 5.5,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Clear stakes", "Global outdoor appeal", "Easy three-act structure"],
    risks: ["Needs believable survival logic", "Avoid dangerous how-to framing"],
    productionDifficulty: "Medium",
    language: "English",
    platforms: ["YouTube Shorts", "Instagram Reels"],
    recommendedVideoLength: "45-70 seconds",
    style: "Cinematic survival recap with urgent narration and practical details.",
    reason:
      "Survival stories score well on emotional stakes and global reach, with moderate production complexity.",
    world: "survival emergency",
    setting: "remote trail",
    protagonist: "a stranded hiker",
  },
  {
    id: "mystery-stories",
    name: "Mystery Stories",
    metrics: {
      viralPotential: 8.5,
      aiProductionEase: 8.5,
      emotionalIntensity: 7.7,
      internationalAppeal: 8.8,
      volumePotential: 9.0,
      lowRealFootageDependence: 9.1,
      shortNarrativeEase: 8.8,
      retentionPotential: 8.9,
      commentPotential: 8.0,
      sensitiveRisk: 3.8,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Low sensitivity", "Very repeatable", "Comment-friendly theories"],
    risks: ["Needs strong original twists", "Hooks need specific evidence"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["YouTube Shorts", "TikTok", "Facebook Reels"],
    recommendedVideoLength: "40-60 seconds",
    style: "Puzzle-box narration, visual clues, unresolved final question.",
    reason:
      "Mystery stories are safe and scalable, with strong comment potential through theories and unresolved details.",
    world: "unsolved fictional mystery",
    setting: "locked apartment",
    protagonist: "a narrator tracing a clue",
  },
  {
    id: "animated-moral-stories",
    name: "Animated Moral Stories",
    metrics: {
      viralPotential: 7.8,
      aiProductionEase: 9.0,
      emotionalIntensity: 7.8,
      internationalAppeal: 8.5,
      volumePotential: 9.2,
      lowRealFootageDependence: 9.5,
      shortNarrativeEase: 8.9,
      retentionPotential: 8.1,
      commentPotential: 6.8,
      sensitiveRisk: 2.4,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Very safe", "Mass-producible", "Broad international reach"],
    risks: ["Lower novelty", "Can feel formulaic"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["Facebook Reels", "YouTube Shorts", "TikTok"],
    recommendedVideoLength: "45-75 seconds",
    style: "Clean animation, simple moral setup, emotional payoff.",
    reason:
      "Animated moral stories are highly scalable and safe, though their viral ceiling is lower than tension-led niches.",
    world: "animated life lesson",
    setting: "small neighborhood",
    protagonist: "a misunderstood character",
  },
  {
    id: "bizarre-facts",
    name: "Bizarre Facts",
    metrics: {
      viralPotential: 8.0,
      aiProductionEase: 8.7,
      emotionalIntensity: 5.7,
      internationalAppeal: 8.2,
      volumePotential: 9.4,
      lowRealFootageDependence: 8.6,
      shortNarrativeEase: 8.7,
      retentionPotential: 7.5,
      commentPotential: 7.5,
      sensitiveRisk: 3.0,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: false,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: true,
    },
    strengths: ["High volume", "Easy prompt generation", "Simple formats"],
    risks: ["Fact-checking needed", "Lower emotional intensity"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["YouTube Shorts", "Instagram Reels", "TikTok"],
    recommendedVideoLength: "25-45 seconds",
    style: "Fast factual narration with one surprising visual reveal.",
    reason:
      "Bizarre facts are easy to scale, but the fact-checking requirement and lower emotional intensity keep the score moderate.",
    world: "strange fact reveal",
    setting: "minimal visual explainer",
    protagonist: "a fast narrator",
  },
  {
    id: "historical-drama-shorts",
    name: "Historical Drama Shorts",
    metrics: {
      viralPotential: 7.6,
      aiProductionEase: 7.5,
      emotionalIntensity: 8.1,
      internationalAppeal: 7.8,
      volumePotential: 7.6,
      lowRealFootageDependence: 8.0,
      shortNarrativeEase: 7.7,
      retentionPotential: 8.0,
      commentPotential: 7.0,
      sensitiveRisk: 5.0,
    },
    tags: {
      massProduction: false,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: true,
    },
    strengths: ["Premium visual tone", "Strong drama", "Education angle"],
    risks: ["Research burden", "Period accuracy complexity"],
    productionDifficulty: "High",
    language: "English",
    platforms: ["YouTube Shorts", "Facebook Reels"],
    recommendedVideoLength: "50-75 seconds",
    style: "Cinematic period drama with focused emotional stakes.",
    reason:
      "Historical drama can look premium, but accuracy and production complexity lower its MVP ranking.",
    world: "historical turning point",
    setting: "war room",
    protagonist: "a person facing a choice",
  },
  {
    id: "animal-rescue-stories",
    name: "Animal Rescue Stories",
    metrics: {
      viralPotential: 8.3,
      aiProductionEase: 7.7,
      emotionalIntensity: 8.8,
      internationalAppeal: 8.8,
      volumePotential: 8.2,
      lowRealFootageDependence: 7.0,
      shortNarrativeEase: 8.0,
      retentionPotential: 8.0,
      commentPotential: 8.2,
      sensitiveRisk: 4.8,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: true,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["High empathy", "Global appeal", "Comment-friendly outcomes"],
    risks: ["Real footage expectations", "Avoid distressing imagery"],
    productionDifficulty: "Medium",
    language: "English",
    platforms: ["Facebook Reels", "Instagram Reels", "TikTok"],
    recommendedVideoLength: "35-60 seconds",
    style: "Warm documentary tone, no distressing visuals, emotional payoff.",
    reason:
      "Animal rescue stories have strong empathy, but the visual authenticity requirement adds production friction.",
    world: "rescue moment",
    setting: "rainy roadside",
    protagonist: "a rescuer",
  },
  {
    id: "scary-camping-stories",
    name: "Scary Camping Stories",
    metrics: {
      viralPotential: 8.2,
      aiProductionEase: 8.9,
      emotionalIntensity: 8.4,
      internationalAppeal: 8.5,
      volumePotential: 8.7,
      lowRealFootageDependence: 9.2,
      shortNarrativeEase: 8.8,
      retentionPotential: 8.6,
      commentPotential: 7.4,
      sensitiveRisk: 5.2,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Easy AI environments", "Strong sound design", "Clear suspense curve"],
    risks: ["Crowded horror subniche", "Avoid graphic outcomes"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["TikTok", "YouTube Shorts", "Instagram Reels"],
    recommendedVideoLength: "40-65 seconds",
    style: "Night-vision camping POV, quiet build, unsettling final detail.",
    reason:
      "Scary camping stories are highly producible and global, though the niche is competitive.",
    world: "camping horror",
    setting: "forest campsite",
    protagonist: "a camper filming a noise",
  },
  {
    id: "court-case-stories",
    name: "Court Case Stories",
    metrics: {
      viralPotential: 8.5,
      aiProductionEase: 7.3,
      emotionalIntensity: 8.0,
      internationalAppeal: 7.4,
      volumePotential: 7.8,
      lowRealFootageDependence: 6.8,
      shortNarrativeEase: 8.0,
      retentionPotential: 8.5,
      commentPotential: 8.5,
      sensitiveRisk: 7.4,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: true,
      explicitViolenceRisk: false,
      realFactDependent: true,
    },
    strengths: ["Strong payoff moments", "Debate-friendly", "Clear stakes"],
    risks: ["Legal sensitivity", "Fact dependence", "Real-person risk"],
    productionDifficulty: "Medium",
    language: "English",
    platforms: ["YouTube Shorts", "TikTok", "Facebook Reels"],
    recommendedVideoLength: "45-70 seconds",
    style: "Fictional courtroom recap with one decisive reveal.",
    reason:
      "Court case stories can earn comments, but real-case dependence and legal sensitivity create penalties.",
    world: "fictional courtroom reveal",
    setting: "small courtroom",
    protagonist: "a witness",
  },
  {
    id: "emergency-call-stories",
    name: "Emergency Call Stories",
    metrics: {
      viralPotential: 8.7,
      aiProductionEase: 8.0,
      emotionalIntensity: 8.9,
      internationalAppeal: 8.4,
      volumePotential: 8.6,
      lowRealFootageDependence: 8.8,
      shortNarrativeEase: 8.7,
      retentionPotential: 9.0,
      commentPotential: 7.7,
      sensitiveRisk: 6.6,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Audio-led retention", "Strong urgency", "Low visual dependence"],
    risks: ["Needs tasteful crisis framing", "Avoid panic exploitation"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["TikTok", "YouTube Shorts"],
    recommendedVideoLength: "35-60 seconds",
    style: "Tense call audio recreation with restrained cinematic visuals.",
    reason:
      "Emergency call stories are strong for retention, but crisis framing raises sensitivity risk.",
    world: "fictional emergency call",
    setting: "dispatcher console",
    protagonist: "a calm dispatcher",
  },
  {
    id: "creepy-neighbor-stories",
    name: "Creepy Neighbor Stories",
    metrics: {
      viralPotential: 8.6,
      aiProductionEase: 8.6,
      emotionalIntensity: 8.2,
      internationalAppeal: 8.4,
      volumePotential: 8.9,
      lowRealFootageDependence: 9.0,
      shortNarrativeEase: 8.9,
      retentionPotential: 8.7,
      commentPotential: 8.0,
      sensitiveRisk: 5.0,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Relatable setting", "Easy twist endings", "High comment prompts"],
    risks: ["Can feel repetitive", "Avoid harassment framing"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["TikTok", "YouTube Shorts", "Instagram Reels"],
    recommendedVideoLength: "40-60 seconds",
    style: "Suburban suspense, quiet escalation, final reversal.",
    reason:
      "Creepy neighbor stories are very scalable and accessible, with moderate sensitivity concerns.",
    world: "neighbor mystery",
    setting: "apartment hallway",
    protagonist: "a tenant checking a doorbell camera",
  },
  {
    id: "lost-footage-stories",
    name: "Lost Footage Stories",
    metrics: {
      viralPotential: 8.7,
      aiProductionEase: 8.8,
      emotionalIntensity: 8.3,
      internationalAppeal: 8.7,
      volumePotential: 8.8,
      lowRealFootageDependence: 9.1,
      shortNarrativeEase: 8.8,
      retentionPotential: 8.9,
      commentPotential: 7.8,
      sensitiveRisk: 5.5,
    },
    tags: {
      massProduction: true,
      globalEnglish: true,
      twistFriendly: true,
      realFootageDependent: false,
      explicitViolenceRisk: false,
      realFactDependent: false,
    },
    strengths: ["Found-footage hook", "AI-friendly visuals", "Strong mystery framing"],
    risks: ["Needs clear fictional labeling", "Avoid real disaster imitation"],
    productionDifficulty: "Low",
    language: "English",
    platforms: ["YouTube Shorts", "TikTok", "Instagram Reels"],
    recommendedVideoLength: "40-65 seconds",
    style: "Analog footage texture, documentary voice, hidden final clue.",
    reason:
      "Lost footage stories are strong and scalable, but need careful fictional framing to avoid misinformation.",
    world: "found-footage clip",
    setting: "abandoned station",
    protagonist: "a person reviewing old tape",
  },
];

const state = {
  selectedNicheId: null,
  ideas: [],
  selectedIdea: null,
  artifacts: null,
  references: [],
  referenceQueries: [],
  referenceMode: "idle",
  nicheResearch: [],
  nicheResearchMode: "idle",
  exportSceneSeconds: 10,
};

const EXPORT_MIN_SCENE_SECONDS = 5;
const EXPORT_MAX_SCENE_SECONDS = 15;

const criteriaWeights = {
  viralPotential: 0.14,
  aiProductionEase: 0.14,
  emotionalIntensity: 0.1,
  internationalAppeal: 0.1,
  volumePotential: 0.12,
  lowRealFootageDependence: 0.11,
  shortNarrativeEase: 0.1,
  retentionPotential: 0.13,
  commentPotential: 0.06,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function calculateAutoNicheScore(niche) {
  const positiveScore = Object.entries(criteriaWeights).reduce((total, [key, weight]) => {
    return total + niche.metrics[key] * weight;
  }, 0) * 10;

  let penalty = niche.metrics.sensitiveRisk * 1.65;
  if (niche.metrics.sensitiveRisk >= 8) penalty += 8;
  else if (niche.metrics.sensitiveRisk >= 7) penalty += 4;
  if (niche.tags.realFootageDependent) penalty += 4;
  if (niche.tags.explicitViolenceRisk) penalty += 4;
  if (niche.tags.realFactDependent) penalty += 3;

  let bonus = 0;
  if (niche.tags.massProduction) bonus += 1.5;
  if (niche.tags.globalEnglish) bonus += 1.5;
  if (niche.tags.twistFriendly) bonus += 1.5;
  if (niche.metrics.aiProductionEase >= 8.5) bonus += 0.8;
  if (niche.metrics.lowRealFootageDependence >= 8.5) bonus += 0.8;
  if (niche.metrics.shortNarrativeEase >= 8.5) bonus += 0.8;

  return Math.round(clamp(positiveScore - penalty + bonus, 0, 100));
}

function getRankedNiches() {
  return niches
    .map((niche) => ({ ...niche, score: calculateAutoNicheScore(niche) }))
    .sort((a, b) => b.score - a.score);
}

function getBestNiche() {
  return getRankedNiches()[0];
}

function getSelectedNiche() {
  if (!state.selectedNicheId) return null;
  const selected = niches.find((niche) => niche.id === state.selectedNicheId);
  if (!selected) return null;
  return { ...selected, score: calculateAutoNicheScore(selected) };
}

function formatList(items) {
  return items.join(", ");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderPipeline() {
  $("#pipelineBand").innerHTML = pipelineSteps
    .map(
      (step, index) => `
        <div class="pipeline-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(step)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderManualSelect() {
  const select = $("#manualNicheSelect");
  const selectedNiche = getSelectedNiche();
  select.innerHTML = getRankedNiches()
    .map(
      (niche) =>
        `<option value="${niche.id}" ${niche.id === selectedNiche?.id ? "selected" : ""}>${escapeHtml(
          niche.name,
        )} - ${niche.score}/100</option>`,
    )
    .join("");
  if (!selectedNiche) {
    select.insertAdjacentHTML("afterbegin", '<option value="" selected disabled>Run Real Niche Research</option>');
  }
}

function renderDashboard() {
  const selectedNiche = getSelectedNiche();
  if (!selectedNiche) {
    $("#dashboardNicheName").textContent = "Waiting for real research";
    $("#dashboardScore").textContent = "--";
    $("#dashboardReason").textContent =
      "Run real niche research to rank current source signals before choosing what to produce.";
    $("#dashboardFacts").innerHTML = "";
    return;
  }

  const niche = selectedNiche;
  $("#dashboardNicheName").textContent = niche.name;
  $("#dashboardScore").textContent = niche.score;
  $("#dashboardReason").textContent = niche.reason;
  $("#dashboardFacts").innerHTML = [
    ["Recommended Platforms", formatList(niche.platforms)],
    ["Recommended Video Length", niche.recommendedVideoLength],
    ["Recommended Style", niche.style],
    ["Production Difficulty", niche.productionDifficulty],
  ]
    .map(
      ([label, value]) => `
        <div class="fact">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderSelectedNiche() {
  const niche = getSelectedNiche();
  if (!niche) {
    $("#selectedNicheName").textContent = "Not selected";
    $("#selectedScore").textContent = "--";
    $("#selectedReason").textContent = "Run analysis from the dashboard.";
    $("#selectedMeta").innerHTML = "";
    $("#selectedStrengths").innerHTML = "";
    $("#selectedRisks").innerHTML = "";
    return;
  }

  $("#selectedNicheName").textContent = niche.name;
  $("#selectedScore").textContent = niche.score;
  $("#selectedReason").textContent = niche.reason;
  $("#selectedMeta").innerHTML = [
    ["Recommended Platforms", formatList(niche.platforms)],
    ["Recommended Video Length", niche.recommendedVideoLength],
    ["Recommended Style", niche.style],
    ["Production Difficulty", niche.productionDifficulty],
    ["Recommended Language", niche.language],
    ["Decision Basis", "Safety, production ease, scalability, global appeal, retention"],
  ]
    .map(
      ([label, value]) => `
        <div class="meta-item">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `,
    )
    .join("");

  $("#selectedStrengths").innerHTML = niche.strengths
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join("");
  $("#selectedRisks").innerHTML = niche.risks
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join("");
}

function renderRanking() {
  const selectedId = getSelectedNiche()?.id;
  $("#rankingTable").innerHTML = getRankedNiches()
    .map(
      (niche, index) => `
        <tr class="${niche.id === selectedId ? "selected-row" : ""}" data-niche-id="${niche.id}">
          <td>${index + 1}</td>
          <td><strong>${escapeHtml(niche.name)}</strong></td>
          <td class="score-cell">
            <strong>${niche.score}/100</strong>
            <div class="score-bar"><span style="width: ${niche.score}%"></span></div>
          </td>
          <td>${escapeHtml(niche.productionDifficulty)}</td>
          <td>${escapeHtml(niche.language)}</td>
          <td>${escapeHtml(formatList(niche.platforms))}</td>
          <td>${escapeHtml(niche.strengths.slice(0, 2).join("; "))}</td>
          <td>${escapeHtml(niche.risks.slice(0, 2).join("; "))}</td>
        </tr>
      `,
    )
    .join("");
}

function getResearchForNiche(nicheId) {
  return state.nicheResearch.find((item) => item.id === nicheId);
}

function renderNicheResearchBoard() {
  const status = $("#nicheResearchStatus");
  const grid = $("#nicheResearchGrid");
  if (!status || !grid) return;

  if (state.nicheResearchMode === "loading") {
    status.textContent = "Searching real data...";
    grid.className = "niche-research-grid empty-state";
    grid.textContent = "Searching real references, sources, recency, and production signals for each niche.";
    return;
  }

  if (state.nicheResearchMode === "error") {
    status.textContent = "Research failed";
    grid.className = "niche-research-grid empty-state";
    grid.textContent = "No generic data will be used. Check the connection or run research again.";
    return;
  }

  if (!state.nicheResearch.length) {
    status.textContent = "No real research yet";
    grid.className = "niche-research-grid empty-state";
    grid.textContent = "Research starts automatically. Use the button above to run it again.";
    return;
  }

  const usableCount = state.nicheResearch.filter((item) => item.hasRealData).length;
  status.textContent = `${usableCount} niches with enough real data`;
  grid.className = "niche-research-grid";
  grid.innerHTML = state.nicheResearch
    .map((item, index) => {
      const baseNiche = niches.find((niche) => niche.id === item.id) || {};
      const references = item.references || [];
      const evidence = references.slice(0, 3).map((reference) => {
        const title = escapeHtml(reference.title || "Reference");
        const source = escapeHtml(reference.source || "Source");
        return reference.url
          ? `<a href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">${title}<br><span>${source}</span></a>`
          : `<a>${title}<br><span>${source}</span></a>`;
      });
      return `
        <article class="niche-research-card">
          <div class="idea-meta">
            <span class="mini-label">Rank ${index + 1}</span>
            <span class="mini-label">${item.hasRealData ? "Real data" : "Need more data"}</span>
          </div>
          <h4>${escapeHtml(item.name)}</h4>
          <div class="score-bar"><span style="width: ${item.score}%"></span></div>
          <div class="metric-row">
            <div class="metric"><span>Opportunity</span><strong>${item.score}/100</strong></div>
            <div class="metric"><span>References</span><strong>${item.referencesCount}</strong></div>
            <div class="metric"><span>Sources</span><strong>${item.sourcesCount}</strong></div>
          </div>
          <div class="metric-row">
            <div class="metric"><span>Recent</span><strong>${item.recentCount}</strong></div>
            <div class="metric"><span>Production</span><strong>${item.productionEase}/100</strong></div>
            <div class="metric"><span>Risk</span><strong>${item.riskScore}/100</strong></div>
          </div>
          <p>${escapeHtml(item.reason)}</p>
          <div class="research-details">
            <span>Language: <strong>${escapeHtml(baseNiche.language || "English")}</strong></span>
            <span>Difficulty: <strong>${escapeHtml(baseNiche.productionDifficulty || "Medium")}</strong></span>
            <span>Platforms: <strong>${escapeHtml(formatList(baseNiche.platforms || []))}</strong></span>
          </div>
          <div class="query-list">${(item.queries || [])
            .slice(0, 3)
            .map((query) => `<span>${escapeHtml(query)}</span>`)
            .join("")}</div>
          <div class="evidence-list">${evidence.join("")}</div>
          <button class="choose-niche-button" type="button" data-research-niche-id="${item.id}" ${
            item.hasRealData ? "" : "disabled"
          }>Produce This Niche</button>
        </article>
      `;
    })
    .join("");
}

async function researchRealNiches() {
  state.nicheResearchMode = "loading";
  state.nicheResearch = [];
  $("#systemStatus").textContent = "Researching real niche opportunities...";
  renderNicheResearchBoard();

  const body = {
    niches: niches.map((niche) => ({ id: niche.id, name: niche.name })),
  };

  const response = await fetch("/api/research-niches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || `Research API returned ${response.status}`);
  }

  state.nicheResearch = payload.ranking || [];
  state.nicheResearchMode = "ready";
  $("#systemStatus").textContent = `Research complete: ${state.nicheResearch.length} niches analyzed`;
  renderNicheResearchBoard();
  return state.nicheResearch;
}

function normalizeLiveIdea(idea, niche, index) {
  const requiredFields = ["id", "key", "title", "hook", "twist", "angle", "length"];
  const missingField = requiredFields.find((field) => !idea[field]);
  if (missingField) {
    throw new Error(`Research API returned an incomplete idea without ${missingField}.`);
  }

  return {
    id: idea.id,
    key: idea.key,
    title: idea.title,
    hook: idea.hook,
    twist: idea.twist,
    angle: idea.angle,
    length: idea.length,
    nicheId: idea.nicheId || niche.id,
    referenceTitle: idea.referenceTitle,
    referenceUrl: idea.referenceUrl,
    referenceSource: idea.referenceSource,
    noveltySeed: idea.noveltySeed,
  };
}

async function researchAndGenerateIdeasForNiche(niche, options = {}) {
  const forceFresh = options.forceFresh ?? true;
  $("#systemStatus").textContent = `Searching references for ${niche.name}...`;
  state.referenceMode = "loading";
  state.references = [];
  state.referenceQueries = [];
  renderReferences();

  try {
    const params = new URLSearchParams({
      nicheId: niche.id,
      niche: niche.name,
      count: "10",
      fresh: forceFresh ? "1" : "0",
      t: String(Date.now()),
    });
    const response = await fetch(`/api/generate-ideas?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok || payload.ok === false) {
      throw new Error(payload.error || `Reference API returned ${response.status}`);
    }
    state.references = payload.references || [];
    state.referenceQueries = payload.queries || [];
    state.referenceMode = "live";
    $("#systemStatus").textContent = `Fresh ideas generated from ${state.references.length} live references`;
    return (payload.ideas || []).map((idea, index) => normalizeLiveIdea(idea, niche, index));
  } catch (error) {
    state.references = [];
    state.referenceQueries = [];
    state.referenceMode = "error";
    $("#systemStatus").textContent = `No real ideas generated: ${error.message}`;
    return [];
  }
}

function renderReferences() {
  const status = $("#referenceStatus");
  const grid = $("#referenceGrid");
  if (!status || !grid) return;

  if (state.referenceMode === "loading") {
    status.textContent = "Searching...";
    grid.className = "reference-grid empty-state";
    grid.textContent = "Searching web references and preparing fresh angles.";
    return;
  }

  if (state.referenceMode === "error") {
    status.textContent = "Need real sources";
    grid.className = "reference-grid empty-state";
    grid.textContent = "The system could not find enough real references. It will not generate generic ideas.";
    return;
  }

  if (!state.references.length) {
    status.textContent = "No research yet";
    grid.className = "reference-grid empty-state";
    grid.textContent = "Run the idea generator to search references.";
    return;
  }

  status.textContent = "Live research";
  grid.className = "reference-grid";
  grid.innerHTML = state.references
    .slice(0, 6)
    .map((reference) => {
      const title = escapeHtml(reference.title || "Reference");
      const source = escapeHtml(reference.source || reference.type || "Source");
      const score = reference.score ? `Score ${reference.score}/100` : "Reference";
      const url = reference.url || "";
      const titleNode = url
        ? `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${title}</a>`
        : `<a>${title}</a>`;
      return `
        <article class="reference-card">
          ${titleNode}
          <span>${source} - ${escapeHtml(score)}</span>
          <span>${escapeHtml(reference.query || "Original inspiration only")}</span>
        </article>
      `;
    })
    .join("");
}

function renderIdeas() {
  const niche = getSelectedNiche();
  $("#ideasTitle").textContent = niche ? `${niche.name} ideas` : "Initial video ideas";

  if (!state.ideas.length) {
    $("#ideasGrid").innerHTML = `<div class="empty-state">No ideas generated yet.</div>`;
    return;
  }

  $("#ideasGrid").innerHTML = state.ideas
    .map(
      (idea, index) => `
        <article class="idea-card">
          <div class="idea-meta">
            <span class="mini-label">Idea ${index + 1}</span>
            <span class="mini-label">${escapeHtml(idea.length)}</span>
          </div>
          <h3>${escapeHtml(idea.title)}</h3>
          <p>${escapeHtml(idea.hook)}</p>
          <p><strong>Twist:</strong> ${escapeHtml(idea.twist)}.</p>
          ${
            idea.referenceTitle
              ? `<div class="reference-mini">Reference seed: ${escapeHtml(idea.referenceTitle)}${
                  idea.referenceSource ? ` - ${escapeHtml(idea.referenceSource)}` : ""
                }</div>`
              : ""
          }
          <button class="select-idea-button" type="button" data-idea-id="${idea.id}">Build Video Package</button>
        </article>
      `,
    )
    .join("");
}

function buildProductionPackage(niche, idea) {
  const script = [
    {
      time: "0-3s",
      label: "Hook",
      text: `This ${niche.world} starts normal, until the camera catches something no one was supposed to see.`,
    },
    {
      time: "4-12s",
      label: "Setup",
      text: `${idea.hook} The narrator points out one visual clue, then cuts before the answer is obvious.`,
    },
    {
      time: "13-25s",
      label: "Escalation",
      text: `Every new angle makes the scene feel less random: the sound repeats, the background changes, and the main character makes one risky choice.`,
    },
    {
      time: "26-42s",
      label: "Twist",
      text: `The twist lands when ${idea.twist}. The viewer should want to replay the opening frame.`,
    },
    {
      time: "43-60s",
      label: "Payoff",
      text: `End on a final unanswered detail and invite comments with a direct question about what really happened.`,
    },
  ];

  const scenes = [
    {
      time: "0-3s",
      title: "Cold open",
      visual: `Immediate close POV from a ${niche.world}, unstable handheld framing, one strange object visible for less than a second.`,
    },
    {
      time: "4-12s",
      title: "Normal setup",
      visual: `Wide establishing view of a ${niche.setting}, realistic lighting, no graphic content, subtle tension.`,
    },
    {
      time: "13-25s",
      title: "Clue escalation",
      visual: `Focused shot on the detail that changes the meaning of the scene, shallow depth, documentary realism.`,
    },
    {
      time: "26-42s",
      title: "Twist reveal",
      visual: `The same place from a new angle, showing that ${idea.twist}, cinematic tension, believable AI-generated scene.`,
    },
    {
      time: "43-60s",
      title: "Final frame",
      visual: `Freeze on one unresolved clue, high retention ending, clean composition for captions.`,
    },
  ];

  const visualPrompts = scenes.map((scene) => ({
    time: scene.time,
    title: scene.title,
    prompt: `${scene.visual} Style: ${niche.style} Vertical 9:16, realistic motion, no gore, no real logos, no real people, safe fictional short-form video asset.`,
  }));

  const voiceover = script.map((item) => item.text).join("\n\n");
  const captions = [
    "THIS LOOKED NORMAL AT FIRST",
    "THEN THE CAMERA CAUGHT ONE DETAIL",
    "WATCH THE BACKGROUND",
    "THE TWIST WAS IN FRAME ONE",
    "WHAT WOULD YOU HAVE DONE?",
  ];

  return {
    niche: niche.name,
    score: niche.score,
    idea,
    references: state.references,
    script,
    scenes,
    visualPrompts,
    voiceover,
    captions,
    production: [
      { status: "Idea", item: idea.title, detail: "Selected and ready" },
      { status: "Script", item: "Retention script", detail: "Generated from hook, escalation, twist, payoff" },
      { status: "Assets", item: "Visual prompts and voiceover", detail: "Ready for external AI tools" },
      { status: "Export", item: "Production package", detail: "Copy-ready packet" },
    ],
  };
}

function renderScript() {
  if (!state.artifacts) {
    $("#scriptOutput").className = "artifact-list empty-state";
    $("#scriptOutput").textContent = "Select an idea to generate a script.";
    return;
  }

  $("#scriptTitle").textContent = state.artifacts.idea.title;
  $("#scriptOutput").className = "artifact-list";
  $("#scriptOutput").innerHTML = state.artifacts.script
    .map(
      (item) => `
        <article class="artifact-card">
          <span class="timecode">${escapeHtml(item.time)} - ${escapeHtml(item.label)}</span>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderScenes() {
  if (!state.artifacts) {
    $("#sceneOutput").className = "artifact-list empty-state";
    $("#sceneOutput").textContent = "No scene breakdown yet.";
    return;
  }

  $("#sceneOutput").className = "artifact-list";
  $("#sceneOutput").innerHTML = state.artifacts.scenes
    .map(
      (scene) => `
        <article class="artifact-card">
          <span class="timecode">${escapeHtml(scene.time)}</span>
          <h3>${escapeHtml(scene.title)}</h3>
          <p>${escapeHtml(scene.visual)}</p>
        </article>
      `,
    )
    .join("");
}

function renderPrompts() {
  if (!state.artifacts) {
    $("#promptOutput").className = "artifact-list empty-state";
    $("#promptOutput").textContent = "No prompts yet.";
    return;
  }

  $("#promptOutput").className = "artifact-list";
  $("#promptOutput").innerHTML = state.artifacts.visualPrompts
    .map(
      (prompt) => `
        <article class="artifact-card">
          <span class="timecode">${escapeHtml(prompt.time)}</span>
          <h3>${escapeHtml(prompt.title)}</h3>
          <p>${escapeHtml(prompt.prompt)}</p>
        </article>
      `,
    )
    .join("");
}

function renderVoiceover() {
  $("#voiceoverOutput").value = state.artifacts
    ? state.artifacts.voiceover
    : "Select an idea to generate narration.";
}

function renderCaptions() {
  if (!state.artifacts) {
    $("#captionsOutput").className = "caption-stack empty-state";
    $("#captionsOutput").textContent = "No captions yet.";
    return;
  }

  $("#captionsOutput").className = "caption-stack";
  $("#captionsOutput").innerHTML = state.artifacts.captions
    .map((caption) => `<div class="caption-line">${escapeHtml(caption)}</div>`)
    .join("");
}

function renderProductionBoard() {
  const statuses = ["Idea", "Script", "Assets", "Export"];
  const items = state.artifacts?.production ?? [];
  $("#productionBoard").innerHTML = statuses
    .map((status) => {
      const item = items.find((entry) => entry.status === status);
      return `
        <section class="board-column">
          <h3>${escapeHtml(status)}</h3>
          ${
            item
              ? `<article class="board-card"><h3>${escapeHtml(item.item)}</h3><p>${escapeHtml(item.detail)}</p></article>`
              : `<div class="empty-state">Waiting</div>`
          }
        </section>
      `;
    })
    .join("");
}

function getExportSceneSeconds() {
  const seconds = Number.parseInt(state.exportSceneSeconds, 10);
  return clamp(
    Number.isFinite(seconds) ? seconds : 10,
    EXPORT_MIN_SCENE_SECONDS,
    EXPORT_MAX_SCENE_SECONDS,
  );
}

function getEstimatedVideoSeconds(data) {
  const matches = data.idea.length.match(/\d+/g)?.map(Number) ?? [];
  return matches.length ? Math.max(...matches) : 60;
}

function getPromptPhase(index, total) {
  if (index === 0) return "opening hook";
  if (index === total - 1) return "final twist payoff";
  if (index < total * 0.34) return "setup and curiosity";
  if (index < total * 0.68) return "escalation and clue reveal";
  return "twist buildup";
}

function createScenePromptSegments() {
  if (!state.artifacts) return [];

  const data = state.artifacts;
  const segmentSeconds = getExportSceneSeconds();
  const totalSeconds = getEstimatedVideoSeconds(data);
  const segmentCount = Math.ceil(totalSeconds / segmentSeconds);

  return Array.from({ length: segmentCount }, (_, index) => {
    const start = index * segmentSeconds;
    const end = Math.min(totalSeconds, start + segmentSeconds);
    const duration = end - start;
    const promptIndex = Math.min(
      Math.floor((index * data.visualPrompts.length) / segmentCount),
      data.visualPrompts.length - 1,
    );
    const basePrompt = data.visualPrompts[promptIndex];
    const scriptBeat = data.script[Math.min(promptIndex, data.script.length - 1)];
    const phase = getPromptPhase(index, segmentCount);
    const referenceSeed = data.references?.[promptIndex % Math.max(1, data.references.length)];

    return {
      index: index + 1,
      time: `${start}-${end}s`,
      duration,
      title: basePrompt.title,
      prompt: [
        `Generate a ${duration}-second vertical 9:16 video clip for SCENE ${index + 1} of ${segmentCount}.`,
        `Story niche: ${data.niche}. Video idea: ${data.idea.title}.`,
        referenceSeed?.title ? `Reference inspiration only: ${referenceSeed.title}. Do not copy it directly.` : "",
        `Scene phase: ${phase}. Timeline: ${start}-${end} seconds.`,
        `Visual direction: ${basePrompt.prompt}`,
        `Narrative beat: ${scriptBeat.label} - ${scriptBeat.text}`,
        "Keep the same realistic fictional bodycam/documentary style across all clips.",
        "Do not add subtitles, text overlays, watermarks, logos, real people, gore, or graphic violence.",
        "Leave clean lower-screen space for captions and end the clip with a visual detail that can continue into the next scene.",
      ].join(" "),
    };
  });
}

function createSegmentedPromptsText() {
  if (!state.artifacts) return "No separated prompts yet.";

  const data = state.artifacts;
  const segments = createScenePromptSegments();
  return [
    "SEPARATED VIDEO GENERATOR PROMPTS",
    `SELECTED NICHE: ${data.niche}`,
    `AUTO NICHE SCORE: ${data.score}/100`,
    `VIDEO IDEA: ${data.idea.title}`,
    `SEGMENT LENGTH: ${getExportSceneSeconds()} seconds`,
    `TOTAL CLIPS: ${segments.length}`,
    "",
    ...segments.flatMap((segment) => [
      `SCENE ${String(segment.index).padStart(2, "0")} - ${segment.time}`,
      `DURATION: ${segment.duration} seconds`,
      `TITLE: ${segment.title}`,
      "PROMPT TO PASTE:",
      segment.prompt,
      "",
    ]),
  ].join("\n");
}

function createExportText() {
  if (!state.artifacts) return "No export package yet.";
  const data = state.artifacts;
  return [
    `SELECTED NICHE: ${data.niche}`,
    `AUTO NICHE SCORE: ${data.score}/100`,
    "",
    `IDEA: ${data.idea.title}`,
    `HOOK: ${data.idea.hook}`,
    `TWIST: ${data.idea.twist}`,
    "",
    "REFERENCE SEEDS:",
    ...(data.references?.length
      ? data.references
          .slice(0, 6)
          .map(
            (reference) =>
              `- ${reference.title}${reference.source ? ` (${reference.source})` : ""}${
                reference.url ? ` - ${reference.url}` : ""
              }`,
          )
      : ["- No external references attached."]),
    "",
    "SCRIPT:",
    ...data.script.map((item) => `[${item.time}] ${item.label}: ${item.text}`),
    "",
    "SCENES:",
    ...data.scenes.map((scene) => `[${scene.time}] ${scene.title}: ${scene.visual}`),
    "",
    "VISUAL PROMPTS:",
    ...data.visualPrompts.map((prompt) => `[${prompt.time}] ${prompt.prompt}`),
    "",
    createSegmentedPromptsText(),
    "",
    "VOICEOVER:",
    data.voiceover,
    "",
    "CAPTIONS:",
    ...data.captions.map((caption) => `- ${caption}`),
  ].join("\n");
}

function renderExport() {
  const input = $("#sceneDurationInput");
  if (input) input.value = getExportSceneSeconds();

  const segments = createScenePromptSegments();
  $("#segmentSummary").textContent = state.artifacts
    ? `${segments.length} separated video clips at ${getExportSceneSeconds()} seconds each, ready to paste.`
    : "Build a video package to generate separated prompts.";
  $("#segmentedPromptOutput").value = createSegmentedPromptsText();
  $("#exportOutput").value = createExportText();
}

function renderAll() {
  renderDashboard();
  renderManualSelect();
  renderSelectedNiche();
  renderRanking();
  renderNicheResearchBoard();
  renderReferences();
  renderIdeas();
  renderScript();
  renderScenes();
  renderPrompts();
  renderVoiceover();
  renderCaptions();
  renderProductionBoard();
  renderExport();
}

function setActiveView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".flow-step").forEach((step) => step.classList.toggle("active", step.dataset.view === viewId));
}

function clearGeneratedArtifacts() {
  state.selectedIdea = null;
  state.artifacts = null;
  state.references = [];
  state.referenceQueries = [];
  state.referenceMode = "idle";
}

async function runAutoNicheFinder() {
  clearGeneratedArtifacts();
  renderAll();
  try {
    await researchRealNiches();
    setActiveView("dashboard");
  } catch (error) {
    state.nicheResearchMode = "error";
    $("#systemStatus").textContent = `Research failed: ${error.message}`;
    renderNicheResearchBoard();
  }
}

async function generateIdeas() {
  if (!state.selectedNicheId) {
    $("#systemStatus").textContent = "Choose a researched niche before generating ideas";
    setActiveView("dashboard");
    return;
  }
  const niche = getSelectedNiche();
  clearGeneratedArtifacts();
  state.ideas = await researchAndGenerateIdeasForNiche(niche, { forceFresh: true });
  renderAll();
  setActiveView("ideas");
}

async function selectNiche(nicheId) {
  if (!nicheId) return;
  state.selectedNicheId = nicheId;
  clearGeneratedArtifacts();
  const niche = getSelectedNiche();
  $("#systemStatus").textContent = `${niche.name} selected manually`;
  renderAll();
  state.ideas = await researchAndGenerateIdeasForNiche(niche, { forceFresh: true });
  renderAll();
}

async function chooseResearchedNiche(nicheId) {
  const research = getResearchForNiche(nicheId);
  if (!research || !research.hasRealData) {
    $("#systemStatus").textContent = "This niche does not have enough real research yet";
    return;
  }

  state.selectedNicheId = nicheId;
  clearGeneratedArtifacts();
  state.references = research.references || [];
  state.referenceQueries = research.queries || [];
  state.referenceMode = "live";
  const niche = getSelectedNiche();
  $("#systemStatus").textContent = `${niche.name} chosen from real research`;
  renderAll();
  state.ideas = await researchAndGenerateIdeasForNiche(niche, { forceFresh: false });
  renderAll();
  setActiveView("ideas");
}

function selectIdea(ideaId) {
  const idea = state.ideas.find((entry) => entry.id === ideaId);
  if (!idea) return;
  const niche = getSelectedNiche();
  state.selectedIdea = idea;
  state.artifacts = buildProductionPackage(niche, idea);
  $("#systemStatus").textContent = `Production package built for ${idea.title}`;
  renderAll();
  setActiveView("script");
}

async function copyTextareaToClipboard(selector, copiedMessage, selectedMessage) {
  const textarea = $(selector);
  const text = textarea.value;
  try {
    await navigator.clipboard.writeText(text);
    $("#systemStatus").textContent = copiedMessage;
  } catch {
    textarea.focus();
    textarea.select();
    const copied = document.execCommand && document.execCommand("copy");
    $("#systemStatus").textContent = copied ? copiedMessage : selectedMessage;
  }
}

function bindEvents() {
  $("#mainFindButton").addEventListener("click", runAutoNicheFinder);
  $("#topFindButton").addEventListener("click", runAutoNicheFinder);
  $("#generateIdeasButton").addEventListener("click", generateIdeas);
  $("#refreshIdeasButton").addEventListener("click", generateIdeas);

  $("#manualNicheSelect").addEventListener("change", (event) => {
    selectNiche(event.target.value);
  });

  $("#rankingTable").addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-niche-id]");
    if (row) selectNiche(row.dataset.nicheId);
  });

  $("#nicheResearchGrid").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-research-niche-id]");
    if (button) chooseResearchedNiche(button.dataset.researchNicheId);
  });

  $("#ideasGrid").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-idea-id]");
    if (button) selectIdea(button.dataset.ideaId);
  });

  $$(".flow-step").forEach((step) => {
    step.addEventListener("click", () => setActiveView(step.dataset.view));
  });

  $("#sceneDurationInput").addEventListener("change", (event) => {
    const next = clamp(
      Math.round(Number(event.target.value) || 10),
      EXPORT_MIN_SCENE_SECONDS,
      EXPORT_MAX_SCENE_SECONDS,
    );
    state.exportSceneSeconds = next;
    event.target.value = next;
    renderExport();
    $("#systemStatus").textContent = `Scene prompts split into ${next}-second clips`;
  });

  $("#copyScenePromptsButton").addEventListener("click", () => {
    copyTextareaToClipboard(
      "#segmentedPromptOutput",
      "Separated scene prompts copied",
      "Separated scene prompts selected",
    );
  });

  $("#copyExportButton").addEventListener("click", async () => {
    copyTextareaToClipboard("#exportOutput", "Export package copied", "Export package selected");
  });
}

function init() {
  renderPipeline();
  renderAll();
  bindEvents();
  researchRealNiches().catch((error) => {
    state.nicheResearchMode = "error";
    $("#systemStatus").textContent = `Research failed: ${error.message}`;
    renderNicheResearchBoard();
  });
}

init();
