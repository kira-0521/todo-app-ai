"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTaskRepository } from "~/server/repository";

import { parseTaskId } from "~/server/domainService/task";
import { deleteTask } from "~/server/service";
import { deleteTaskSchema } from ".";

const taskRepository = createTaskRepository();

type DeleteTaskActionState = {
	status?: "success" | "error";
	message?: string;
};

export const deleteTaskAction = async (
	state: DeleteTaskActionState,
	formData: FormData,
) => {
	const parsedId = parseTaskId(formData);
	const validatedData = deleteTaskSchema.safeParse({ id: parsedId });
	if (!validatedData.success) {
		throw new Error(JSON.stringify(validatedData.error.issues[0]));
	}

	try {
		await deleteTask(taskRepository, validatedData.data.id);
	} catch (error: unknown) {
		return {
			...state,
			status: "error" as const,
			message: `Failed: ${error}`,
		} satisfies DeleteTaskActionState;
	}
	revalidatePath("/");
	redirect("/");
};
