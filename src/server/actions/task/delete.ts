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
	state: DeleteTaskActionState,
	formData: FormData,
) => {
	console.log(
		"========================== called:deleteTaskAction ==========================",
	);
	const { id } = Object.fromEntries(formData);
	if (typeof id !== "string") throw new Error("id is not a string");
	const parsedId = Number.parseInt(id, 10);
	const validatedData = deleteTaskSchema.safeParse({ id: parsedId });
	if (!validatedData.success) {
		throw new Error(JSON.stringify(validatedData.error.issues[0]));
	}
	console.log(
		"========================== id ==========================",
		validatedData.data.id,
	);

	try {
		await deleteTask(taskRepository, validatedData.data.id);
	} catch (error: unknown) {
		return {
			...state,
			message: `Failed to delete task ${error}`,
		} satisfies DeleteTaskActionState;
	}
	revalidatePath("/");
	redirect("/");
};
