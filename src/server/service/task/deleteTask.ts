import type { Task } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import type { TaskRepository } from "~/server/repository";

export const deleteTask = async (
	repository: TaskRepository,
	id: Task["id"],
): Promise<void> => {
	const session = await getServerAuthSession();
	if (!session) throw new Error("Unauthorized");

	const task = await repository.findById(id);
	if (session.user.id !== task?.createdById)
		throw new Error("Don't have permission to delete this task");

	await repository.delete(id);
};
