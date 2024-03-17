import type { Status } from "@prisma/client";
import type { StatusRepositoryType } from "~/server/repository";

export const checkExistId = async (
	repository: StatusRepositoryType,
	id: Status["id"],
): Promise<boolean> => {
	const statusIds = await repository
		.findAll()
		.then((statuses) => statuses.map((status) => status.id));
	return statusIds.includes(id);
};
