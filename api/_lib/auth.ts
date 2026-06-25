import { timingSafeEqual } from "node:crypto";
import type { VercelRequest } from "@vercel/node";
import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE_NAME = "portfolio_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export interface SessionPayload {
  sub: string;
}

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set and at least 32 characters");
  }

  return new TextEncoder().encode(secret);
}

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }

  return password;
}

export function timingSafePasswordMatch(input: string, expected: string): boolean {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret(), {
      algorithms: ["HS256"],
    });

    if (typeof payload.sub !== "string") {
      return null;
    }

    return { sub: payload.sub };
  } catch {
    return null;
  }
}

export function serializeSessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return `${SESSION_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function clearSessionCookie(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function getSessionTokenFromRequest(req: VercelRequest): string | null {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const [name, ...valueParts] = part.trim().split("=");

    if (name === SESSION_COOKIE_NAME) {
      const value = valueParts.join("=");

      return value ? decodeURIComponent(value) : null;
    }
  }

  return null;
}
