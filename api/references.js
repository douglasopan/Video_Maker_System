const { fetchReferences } = require("../vercel_lib/ideas");

module.exports = async function handler(req, res) {
  const nicheId = String(req.query.nicheId || "custom");
  const nicheName = String(req.query.niche || nicheId);
  const payload = await fetchReferences(nicheId, nicheName);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(payload);
};
