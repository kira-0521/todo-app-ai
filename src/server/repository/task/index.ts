import type { Prisma } from "@prisma/client";
import { db } from "~/server/db";

export const createTaskRepository = () => {
	return {
		findAll: async () => {
			return await db.task.findMany();
		},
		findFirst: async (args?: Prisma.TaskFindFirstArgs) => {
			return await db.task.findFirst(args);
		},
		create: async (args: Prisma.TaskCreateArgs) => {
			return await db.task.create(args);
		},
	};
};

export type TaskRepositoryType = ReturnType<typeof createTaskRepository>;
