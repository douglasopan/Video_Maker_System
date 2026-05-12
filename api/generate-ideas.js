const { fetchReferences, generateIdeas } = require("../vercel_lib/ideas");

module.exports = async function handler(req, res) {
  const nicheId = String(req.query.nicheId || "custom");
  const nicheName = String(req.query.niche || nicheId);
  const count = Math.max(1, Math.min(Number.parseInt(req.query.count || "10", 10) || 10, 25));
  const referencePayload = await fetchReferences(nicheId, nicheName);
  const ideas = generateIdeas(nicheId, nicheName, referencePayload.references, count);

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    niche_id: nicheId,
    niche_name: nicheName,
    generated_at: new Date().toISOString(),
    ideas,
    references: referencePayload.references,
    queries: referencePayload.queries,
    errors: referencePayload.errors,
  });
};
