import { env } from "cloudflare:workers";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router";

export const client = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: import.meta.env.DEV
				? `${env.VITE_DEV_URL}/api/trpc`
				: `${env.VITE_PROD_URL}/api/trpc`,
		}),
	],
});
