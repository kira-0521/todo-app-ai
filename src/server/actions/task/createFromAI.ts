"use server";

import { generateTask } from "~/ai/generateTask";
import { fileToBase64 } from "~/ai/util";
import { getServerAuthSession } from "~/server/auth";
import { checkExistStatusId } from "~/server/domainService";
import { createStatusRepository } from "~/server/repository";
import { createTaskAiSchema } from "./schema";

const statusRepository = createStatusRepository();

export const createTaskFromAIAction = async (formData: FormData) => {
	const entries = Object.fromEntries(formData);

	if (typeof entries.statusId !== "string")
		throw new Error(`Invalid statusId: ${entries.statusId}`);
	const validatedData = createTaskAiSchema.safeParse(entries);

	if (!validatedData.success) {
		throw new Error(JSON.stringify(validatedData.error.issues[0]));
	}

	const parsedStatusId = Number.parseInt(entries.statusId, 10);
	const isExistStatus = await checkExistStatusId(
		statusRepository,
		parsedStatusId,
	);
	if (!isExistStatus) throw new Error("Invalid statusId");

	const { thumbnail } = validatedData.data;

	const session = await getServerAuthSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	if (!thumbnail) throw new Error("Invalid image");
	const base64String = await fileToBase64(thumbnail);

	const res = await generateTask({
		image: {
			// TODO: mimetype取得
			mime_type: "image/png",
			data: base64String,
		},
	});
	const resObj = res[0];
	if (!resObj || !resObj.text) throw new Error("Invalid response");
	console.log(JSON.parse(resObj.text));

	console.log(
		"========================== called: end createTaskAction ==========================",
	);
};
