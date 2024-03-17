"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

	if (typeof entries.statusId !== "string")
		throw new Error(`Invalid statusId: ${entries.statusId}`);
	const parsedStatusId = Number.parseInt(entries.statusId, 10);
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
	redirect("/");
};
