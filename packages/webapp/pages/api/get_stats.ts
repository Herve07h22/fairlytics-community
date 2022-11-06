import type { NextApiRequest, NextApiResponse } from "next";
import { dependencies } from "adapters";
import { Result } from "domain/helpers/Result";
import { HostStats } from "domain/analytics/models/HostStats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<HostStats[]>>
) {
  console.log("request body :", req.body);
  const fairlyticsKey = req.body.fairlyticsKey; // private key
  const dateInterval = req.body.dateInterval;

  // What's public related to this private key ?
  const publicKey = await dependencies.secureKeyRepository.getPublicKey(
    fairlyticsKey
  );
  console.log("publicKey :", publicKey);

  if (!publicKey) {
    return res.status(404).json({ error: "Invalid key" });
  }

  const stats = await dependencies.statsDatatbase.getStats(
    publicKey,
    dateInterval
  );
  res.status(200).json(stats);
}
