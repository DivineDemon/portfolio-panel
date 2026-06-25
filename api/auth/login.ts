import type { VercelRequest, VercelResponse } from "@vercel/node";

import { createSessionToken, getAdminPassword, serializeSessionCookie, timingSafePasswordMatch } from "../_lib/auth.js";

interface LoginBody {
  password?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = req.body as LoginBody | undefined;
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const adminPassword = getAdminPassword();

    if (!timingSafePasswordMatch(password, adminPassword)) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = await createSessionToken();

    res.setHeader("Set-Cookie", serializeSessionCookie(token));
    return res.status(200).json({ authenticated: true });
  } catch (_error) {
    return res.status(500).json({ message: "Authentication is not configured" });
  }
}
