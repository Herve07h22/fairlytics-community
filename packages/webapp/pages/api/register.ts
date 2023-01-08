import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";
import { dependencies } from "adapters";
import { register } from "domain/sites/usecases/register";
import { Result } from "domain/helpers/Result";

// This API is called from the landing page. So we have to handle CORS

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST"],
  origin: "https://fairlytics.tech",
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<void>>
) {
  await runMiddleware(req, res, cors);
  const email = req.body.email;
  if (email && typeof email === "string") {
    const registerCommandResult = await register(email, dependencies);
    res.status(200).json(registerCommandResult);
    return;
  }
  res.status(200).json({ error: "A valid email is expected" });
}
