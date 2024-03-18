"use server";

import { revalidatePath } from "next/cache";
import type { TaskDetail } from "~/@types/task";
import {
	createStatusRepository,
	createTaskRepository,
	createUserRepository,
} from "~/server/repository";
import { updateTask } from "~/server/service";
import { updateTaskSchema } from ".";

type UpdateTaskActionState = {
	message: string;
};

const taskRepository = createTaskRepository();
const statusRepository = createStatusRepository();
const userRepository = createUserRepository();

export const updateTaskAction = async (
	formData: FormData,
	state: UpdateTaskActionState,
) => {
	let updatedTask: TaskDetail;
	try {
		const entries = Object.entries(formData);
		const validatedData = updateTaskSchema.safeParse(entries);
		if (!validatedData.success) {
			return {
				...state,
				message: "Failed to update task",
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
			message:
				error && error instanceof Error
					? error.message
					: "Failed to update task",
		};
	}
	revalidatePath(`/task/${updatedTask.id}`);
};
