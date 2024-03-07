import { createTRPCRouter } from "~/server/api/trpc";
import { statusRouter } from "./routers/status";
import { taskRouter } from "./routers/task";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	task: taskRouter,
	status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
