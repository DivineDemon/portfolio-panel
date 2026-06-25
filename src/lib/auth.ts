export interface SessionResponse {
  authenticated: boolean;
}

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

async function parseAuthResponse(response: Response): Promise<SessionResponse> {
  const data = (await response.json().catch(() => ({}))) as SessionResponse & {
    message?: string;
  };

  if (!response.ok) {
    throw new AuthError(data.message ?? "Authentication request failed", response.status);
  }

  return data;
}

export async function fetchSession(): Promise<SessionResponse> {
  const response = await fetch("/api/auth/session", {
    credentials: "include",
  });

  if (response.status === 401) {
    return { authenticated: false };
  }

  return parseAuthResponse(response);
}

export async function login(password: string): Promise<SessionResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  return parseAuthResponse(response);
}

export async function logout(): Promise<SessionResponse> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  return parseAuthResponse(response);
}
