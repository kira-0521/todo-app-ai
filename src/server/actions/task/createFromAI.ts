"use server";

import { getServerAuthSession } from "~/server/auth";
import { checkExistId as checkExistStatusId } from "~/server/useCases";
import { createTaskAiSchema } from "./schema";

export const createTaskFromAIAction = async (formData: FormData) => {
	console.log(
		"========================== called: createTaskAction ==========================",
	);
	const entries = Object.fromEntries(formData);
	console.log(
		"========================== formData ==========================",
		entries,
	);
	const validatedData = createTaskAiSchema.safeParse(entries);

	if (!validatedData.success) {
		throw new Error(JSON.stringify(validatedData.error.issues[0]));
	}

	const { statusId } = validatedData.data;

	const parsedStatusId = Number.parseInt(statusId, 10);
	const isExistStatus = await checkExistStatusId(parsedStatusId);
	if (!isExistStatus) throw new Error("Invalid statusId");

	const session = await getServerAuthSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	console.log(
		"========================== called: end createTaskAction ==========================",
		validatedData.data,
	);
};
