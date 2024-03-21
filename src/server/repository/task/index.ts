import type { Prisma, Task } from "@prisma/client";
import { db } from "~/server/db";

export const createTaskRepository = () => {
	return {
		findAll: async (args?: Prisma.TaskFindManyArgs) => {
			return await db.task.findMany(args);
		},
		findFirst: async (args?: Prisma.TaskFindFirstArgs) => {
			return await db.task.findFirst(args);
		},
		findById: async (id: number) => {
			return await db.task.findUnique({ where: { id } });
		},
		create: async (args: Prisma.TaskCreateArgs) => {
			return await db.task.create(args);
		},
		update: async (args: Prisma.TaskUpdateArgs) => {
			return await db.task.update(args);
		},
		delete: async (id: Task["id"]) => {
			return await db.task.delete({ where: { id } });
		},
	};
};

export type TaskRepository = ReturnType<typeof createTaskRepository>;
