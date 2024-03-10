"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { createTaskSchema } from "./schema";

export const createTaskAction = async (formData: FormData) => {
	const entries = Object.fromEntries(formData);

	if (typeof entries.statusId !== "string")
		throw new Error(`Invalid statusId: ${entries.statusId}`);
	const parsedStatusId = Number.parseInt(entries.statusId, 10);
	const validatedData = createTaskSchema.safeParse({
		...entries,
		statusId: parsedStatusId,
	});

	if (!validatedData.success) {
		throw new Error(validatedData.error.issues[0]?.message);
	}

	const statusIds = (await db.status.findMany()).map((status) => status.id);
	if (!statusIds.includes(validatedData.data.statusId)) {
		throw new Error("Invalid statusId");
	}

	const session = await getServerAuthSession();
	if (!session) {
		throw new Error("Unauthorized");
	}

	try {
		await db.task.create({
			data: {
				title: validatedData.data.title,
				content: validatedData.data.content,
				status: { connect: { id: validatedData.data.statusId } },
				createdBy: { connect: { id: session.user.id } },
			},
		});
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create task");
	}

	revalidatePath("/");
	redirect("/");
};
