import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createStatusRepository } from "~/server/repository";

const statusRepository = createStatusRepository();

export const statusRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ title: z.string().min(1), displayOrder: z.number() }))
		.mutation(async ({ ctx, input }) => {
			return await statusRepository.create({
				data: {
					title: input.title,
					displayOrder: input.displayOrder,
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getAll: protectedProcedure.query(async () => {
		return await statusRepository.findAll();
	}),

	getLatest: protectedProcedure.query(({ ctx }) => {
		return statusRepository.findFirst({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),
});
