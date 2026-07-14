import type { NextApiRequest, NextApiResponse } from "next";
import { dependencies } from "adapters";
import { Result } from "domain/helpers/Result";
import { HostStats } from "domain/analytics/models/HostStats";
import { parseDateRange } from "domain/analytics/models/DateRange";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<HostStats[]>>
) {
  const fairlyticsKey = req.body.fairlyticsKey; // private key
  const dateRange = parseDateRange(req.body.from, req.body.to);

  if (!dateRange) {
    return res.status(400).json({ error: "Invalid date range" });
  }

  // What's public related to this private key ?
  const publicKey = await dependencies.secureKeyRepository.getPublicKey(
    fairlyticsKey
  );

  if (!publicKey) {
    return res.status(404).json({ error: "Invalid key" });
  }

  const stats = await dependencies.statsDatatbase.getStats(
    publicKey,
    dateRange
  );
  res.status(200).json(stats);
}
