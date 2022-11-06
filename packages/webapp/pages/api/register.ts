import type { NextApiRequest, NextApiResponse } from "next";
import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";
import { dependencies } from "adapters";
import { register } from "domain/sites/usecases/register";
import { Result } from "domain/helpers/Result";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<FairlyticsKey>>
) {
  const registerCommandResult = await register(dependencies);
  res.status(200).json(registerCommandResult);
}
