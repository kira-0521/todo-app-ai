"use server";

import { revalidatePath } from "next/cache";
import { parseStatusId } from "~/server/domainService";
import {
	createStatusRepository,
	createTaskRepository,
} from "~/server/repository";
import { createTaskService } from "~/server/service/task/createTask";
import { createTaskSchema } from ".";

const statusRepository = createStatusRepository();
const taskRepository = createTaskRepository();

export type CreateTaskState = {
	errorMessage: string;
};

export const createTaskAction = async (
	state: CreateTaskState,
	formData: FormData,
) => {
	const entries = Object.fromEntries(formData);
	const parsedStatusId = parseStatusId(formData);
	const validatedData = createTaskSchema.safeParse({
		...entries,
		statusId: parsedStatusId,
	});

	if (!validatedData.success) {
		return {
			...state,
			errorMessage: JSON.stringify(validatedData.error.issues[0]),
		};
	}

	try {
		await createTaskService(
			taskRepository,
			statusRepository,
			validatedData.data,
		);
	} catch (error) {
		return {
			...state,
			errorMessage: `Failed to create task ${error}`,
		};
	}

	revalidatePath("/");
	return {
		...state,
		errorMessage: "",
	};
};
