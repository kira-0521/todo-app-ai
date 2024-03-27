import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createStatusRepository } from "~/server/repository";
import { getAllStatus, getStatusDetail } from "~/server/service/status";

const statusRepository = createStatusRepository();

export const statusRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async () => {
		return await getAllStatus(statusRepository);
	}),

	getDetail: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			return await getStatusDetail(statusRepository, input.id);
		}),
});
