import { env } from "cloudflare:workers";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "~/lib/auth.server";
import { appRouter } from "./trpc/router";

const api = new Hono<{ Bindings: Env }>();

api.get("/api/hello", (c) => c.text("Hello From Hono!"));

api.use(
	"/api/trpc/*",
	trpcServer({
		endpoint: "/api/trpc",
		router: appRouter,
	}),
);

api.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

api.use(
	"*",
	cors({
		origin: [env.VITE_DEV_URL, env.VITE_PROD_URL],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

export { api };
