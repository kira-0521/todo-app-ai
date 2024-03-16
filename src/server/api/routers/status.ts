import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const statusRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ title: z.string().min(1), displayOrder: z.number() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.status.create({
				data: {
					title: input.title,
					displayOrder: input.displayOrder,
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		// await new Promise((resolve) => setTimeout(resolve, 3000));
		return await ctx.db.status.findMany();
	}),

	getLatest: protectedProcedure.query(({ ctx }) => {
		return ctx.db.status.findFirst({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),
});
