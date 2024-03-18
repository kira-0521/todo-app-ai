"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTaskRepository } from "~/server/repository";

import { deleteTask } from "~/server/service";
import { deleteTaskSchema } from ".";
type DeleteTaskActionState = {
	message: string;
};

const taskRepository = createTaskRepository();

export const deleteTaskAction = async (
	formData: FormData,
	state: DeleteTaskActionState,
) => {
	try {
		const entries = Object.fromEntries(formData);
		const validatedData = deleteTaskSchema.safeParse(entries);
		if (!validatedData.success) {
			return {
				...state,
				message: "Failed to delete task",
			};
		}
		await deleteTask(taskRepository, validatedData.data.id);
	} catch (error: unknown) {
		return {
			...state,
			message:
				error && error instanceof Error
					? error.message
					: "Failed to delete task",
		} satisfies DeleteTaskActionState;
	}
	revalidatePath("/");
	redirect("/");
};
