"use server";

import { revalidatePath } from "next/cache";
import type { TaskDetail } from "~/@types/task";
import { parseStatusId } from "~/server/domainService";
import { parseTaskId } from "~/server/domainService/task";
import {
	createStatusRepository,
	createTaskRepository,
	createUserRepository,
} from "~/server/repository";
import { updateTask } from "~/server/service";
import { updateTaskSchema } from ".";

type UpdateTaskActionState = {
	status: "success" | "error";
	message: string;
};

const taskRepository = createTaskRepository();
const statusRepository = createStatusRepository();
const userRepository = createUserRepository();

export const updateTaskAction = async (
	state: UpdateTaskActionState,
	formData: FormData,
) => {
	let updatedTask: TaskDetail;
	try {
		const entries = Object.fromEntries(formData);
		const parsedTaskId = parseTaskId(formData);
		const parsedStatusId = parseStatusId(formData);
		const validatedData = updateTaskSchema.safeParse({
			...entries,
			id: parsedTaskId,
			statusId: parsedStatusId,
		});
		if (!validatedData.success) {
			const { issues } = validatedData.error;
			return {
				...state,
				status: "error" as const,
				message: `Failed: ${issues[0]?.path} ${issues[0]?.message}`,
			};
		}
		updatedTask = await updateTask(
			taskRepository,
			statusRepository,
			userRepository,
			validatedData.data,
		);
	} catch (error: unknown) {
		return {
			...state,
			status: "error" as const,
			message: error && error instanceof Error ? error.message : "Failed",
		};
	}
	revalidatePath(`/task/${updatedTask.id}`);
	return {
		...state,
		status: "success" as const,
		message: "",
	};
};
