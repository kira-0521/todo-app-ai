"use server";

import { generateTask } from "~/ai/generateTask";
import { getServerAuthSession } from "~/server/auth";
import { createStatusRepository } from "~/server/repository";
import { checkExistId as checkExistStatusId } from "~/server/service";
import { createTaskAiSchema } from "./schema";

const statusRepository = createStatusRepository();

export const createTaskFromAIAction = async (formData: FormData) => {
	const entries = Object.fromEntries(formData);
	const validatedData = createTaskAiSchema.safeParse(entries);

	if (!validatedData.success) {
		throw new Error(JSON.stringify(validatedData.error.issues[0]));
	}

	const { statusId, thumbnail } = validatedData.data;

	const parsedStatusId = Number.parseInt(statusId, 10);
	const isExistStatus = await checkExistStatusId(
		statusRepository,
		parsedStatusId,
	);
	if (!isExistStatus) throw new Error("Invalid statusId");

	const session = await getServerAuthSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	if (!thumbnail) throw new Error("Invalid image");
	const arrBuf = await thumbnail.arrayBuffer();
	const buffer = Buffer.from(arrBuf);
	const base64String = buffer.toString("base64");

	await generateTask({
		prompt: "hello",
		image: {
			mime_type: "image/png",
			data: base64String,
		},
	});

	console.log(
		"========================== called: end createTaskAction ==========================",
		validatedData.data,
	);
};
