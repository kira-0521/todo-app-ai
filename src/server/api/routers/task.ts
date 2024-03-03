import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ title: z.string().min(1), statusId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.task.create({
				data: {
					title: input.title,
					status: { connect: { id: input.statusId } },
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getLatest: protectedProcedure.query(({ ctx }) => {
		return ctx.db.task.findFirst({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),
});
