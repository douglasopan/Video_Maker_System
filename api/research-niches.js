const { researchNiches } = require("../vercel_lib/ideas");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Use POST with a niches array." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const niches = Array.isArray(body.niches) ? body.niches : [];
    if (!niches.length) {
      res.status(400).json({ ok: false, error: "No niches provided for research." });
      return;
    }

    const ranking = await researchNiches(niches);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      ok: true,
      generated_at: new Date().toISOString(),
      min_real_references: 3,
      ranking,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message || "Research failed.",
    });
  }
};
