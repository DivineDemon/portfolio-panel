import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getSessionTokenFromRequest, verifySessionToken } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const token = getSessionTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const session = await verifySessionToken(token);

    if (!session) {
      return res.status(401).json({ authenticated: false });
    }

    return res.status(200).json({ authenticated: true });
  } catch (_error) {
    return res.status(500).json({ message: "Unable to verify session" });
  }
}
