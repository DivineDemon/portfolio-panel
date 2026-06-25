import type { IncomingMessage, ServerResponse } from "node:http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Plugin, ViteDevServer } from "vite";

import loginHandler from "../api/auth/login";
import logoutHandler from "../api/auth/logout";
import sessionHandler from "../api/auth/session";

type ApiHandler = (req: VercelRequest, res: VercelResponse) => unknown;

const routes: Record<string, { methods: string[]; handler: ApiHandler }> = {
  "/api/auth/login": { methods: ["POST"], handler: loginHandler },
  "/api/auth/session": { methods: ["GET"], handler: sessionHandler },
  "/api/auth/logout": { methods: ["POST"], handler: logoutHandler },
};

function createVercelResponse(res: ServerResponse): VercelResponse {
  let statusCode = 200;

  return {
    status(code: number) {
      statusCode = code;
      res.statusCode = code;
      return this;
    },
    setHeader(name: string, value: string | string[]) {
      res.setHeader(name, value);
      return this;
    },
    json(body: unknown) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = statusCode;
        res.end(JSON.stringify(body));
      }
    },
    end() {
      res.end();
    },
  } as VercelResponse;
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const data = Buffer.concat(chunks).toString("utf8");

      if (!data) {
        resolve(undefined);
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function apiDevMiddleware(req: IncomingMessage, res: ServerResponse, next: (error?: Error) => void) {
  const pathname = req.url?.split("?")[0];

  if (!pathname?.startsWith("/api/")) {
    next();
    return;
  }

  const route = routes[pathname];

  if (!route) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Not found" }));
    return;
  }

  const method = req.method ?? "GET";

  if (!route.methods.includes(method)) {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method not allowed" }));
    return;
  }

  void (async () => {
    try {
      const vercelReq = req as VercelRequest;

      if (method === "POST" || method === "PUT" || method === "PATCH") {
        vercelReq.body = await readJsonBody(req);
      }

      await route.handler(vercelReq, createVercelResponse(res));
    } catch (_error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Internal server error" }));
    }
  })();
}

export function apiDevPlugin(): Plugin {
  return {
    name: "portfolio-api-dev",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(apiDevMiddleware);
    },
  };
}
