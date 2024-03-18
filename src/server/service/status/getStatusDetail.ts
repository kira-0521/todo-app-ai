import type { StatusRepository } from "~/server/repository";

export const getStatusDetail = async (
	repository: StatusRepository,
	id: number,
) => {
	return await repository.findById(id);
};
