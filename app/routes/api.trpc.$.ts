import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/trpc/router";
import { createCallerFactory, createContext } from "~/trpc/utils";
import type { Route } from "./+types/api.trpc.$";
import { db } from "~/db";

export async function loader(args: Route.LoaderArgs) {}

export async function action(args: Route.ActionArgs) {}

function handler(args: Route.LoaderArgs | Route.ActionArgs) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req: args.request,
		router: appRouter,
		createContext: () =>
			createContext({
				headers: args.request.headers,
			}),
	});
}
