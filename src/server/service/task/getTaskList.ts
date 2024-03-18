import type { TaskRepository } from "~/server/repository";

export const getTaskList = async (repository: TaskRepository) => {
	return await repository.findAll();
};
