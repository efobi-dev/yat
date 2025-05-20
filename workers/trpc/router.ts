import { createTRPCRouter } from "./utils";
import { publicRouter } from "./routes/public";

export const appRouter = createTRPCRouter({
	public: publicRouter,
});

export type AppRouter = typeof appRouter;
