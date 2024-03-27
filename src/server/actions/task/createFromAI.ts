"use server";

import { generateTask as generateTasks } from "~/libs/google-cloud/ai/generateTask";
import { fileToBase64 } from "~/libs/google-cloud/ai/util";
import {
	createStatusRepository,
	createTaskRepository,
} from "~/server/repository";
import { createTaskService } from "~/server/service";
import { createTaskAiSchema } from "./schema";

const statusRepository = createStatusRepository();
const taskRepository = createTaskRepository();

export type CreateTaskFromAIState =
	| {
			status: "success";
			message: string;
			length: number;
	  }
	| {
			status: "error";
			message: string;
			length?: never;
	  };

export const createTaskFromAIAction = async (
	_: CreateTaskFromAIState,
	formData: FormData,
) => {
	const entries = Object.fromEntries(formData);
	const validatedData = createTaskAiSchema.safeParse(entries);
	if (!validatedData.success) {
		return {
			status: "error",
			message: JSON.stringify(validatedData.error.issues[0]),
		} satisfies CreateTaskFromAIState;
	}

	const { thumbnail } = validatedData.data;
	const base64String = await fileToBase64(thumbnail);

	try {
		const generatedTasks = await generateTasks({
			image: {
				// TODO: mimetype取得
				mimeType: "image/png",
				data: base64String,
			},
		});
		const STATUS_ID_NOT_STARTED = 1;
		const result = await Promise.all(
			generatedTasks.columns.map((column) =>
				createTaskService(taskRepository, statusRepository, {
					title: column.title,
					content: column.content,
					statusId: STATUS_ID_NOT_STARTED,
				}),
			),
		);

		// revalidatePath("/");
		return {
			status: "success",
			message: "Success to generate task",
			length: result.length,
		} satisfies CreateTaskFromAIState;
	} catch (error) {
		console.error(
			"\n========================== error ==========================\n",
			error,
		);
		return {
			status: "error",
			message: "Failed to generate task. Please Retry.",
		} satisfies CreateTaskFromAIState;
	}
};
