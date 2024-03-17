import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createTaskRepository } from "~/server/repository";

const taskRepository = createTaskRepository();

export const taskRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async () => {
		return await taskRepository.findAll();
	}),

	getLatest: protectedProcedure.query(({ ctx }) => {
		return taskRepository.findFirst({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),
});
