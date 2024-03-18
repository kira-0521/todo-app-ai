import type { CreateTaskSchema } from "~/server/actions";
import { getServerAuthSession } from "~/server/auth";
import { checkExistStatusId } from "~/server/domainService";
import type { StatusRepository, TaskRepository } from "~/server/repository";

const NON_EXISTING_STATUS_ID = -1;
export const createTaskService = async (
	repository: TaskRepository,
	statusRepository: StatusRepository,
	data: CreateTaskSchema,
) => {
	const statusId = data.statusId ?? NON_EXISTING_STATUS_ID;
	const isExistStatus = await checkExistStatusId(
		statusRepository,
		statusId ?? NON_EXISTING_STATUS_ID,
	);
	if (!isExistStatus) throw new Error("Invalid statusId");

	const session = await getServerAuthSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	try {
		await repository.create({
			data: {
				title: data.title,
				content: data.content,
				status: { connect: { id: statusId } },
				createdBy: { connect: { id: session.user.id } },
			},
		});
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create task");
	}
};
