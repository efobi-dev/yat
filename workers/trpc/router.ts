import { initTRPC } from "@trpc/server";
import { z } from "zod";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
	hello: t.procedure.input(z.string().nullish()).query(({ input }) => {
		return `Hello ${input ?? "World"}!`;
	}),
	goodbye: t.procedure.input(z.string().nullish()).query(({ input }) => {
		return `Goodbye ${input ?? "World"}!`;
	}),
});

export type AppRouter = typeof appRouter;
