import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
	createStatusRepository,
	createTaskRepository,
	createUserRepository,
} from "~/server/repository";
import { getTaskDetail, getTaskList } from "~/server/service";

const taskRepository = createTaskRepository();
const statusRepository = createStatusRepository();
const userRepository = createUserRepository();

export const taskRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async () => {
		return await getTaskList(taskRepository, statusRepository, userRepository);
	}),
	getDetail: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			return await getTaskDetail(
				taskRepository,
				statusRepository,
				userRepository,
				input.id,
			);
		}),
});
