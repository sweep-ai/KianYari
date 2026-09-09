const UPSTREAM_BASE = process.env.SWEEP_API_BASE_URL || "https://api.sweepai.site";

export function createSweepProxy(path) {
  return async function handler(req, res) {
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const upstream = await fetch(`${UPSTREAM_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body ?? {}),
      });
      const text = await upstream.text();
      res.status(upstream.status).setHeader("Content-Type", "application/json");
      return res.end(text);
    } catch {
      return res.status(502).json({ error: "Upstream unavailable" });
    }
  };
}
