import type { StatusRepository } from "~/server/repository";

export const getAllStatus = async (repository: StatusRepository) => {
	return await repository.findAll();
};
