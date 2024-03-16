import type { FileWithPath } from "@mantine/dropzone";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const createTaskSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, { message: "Title is required" })
		.max(255, { message: "Title is too long" }),
	content: z.string().trim().optional(),
	thumbnail: z.string().trim().optional(),
	statusId: z.number().min(1, { message: "statusId is larger than 0" }),
}) satisfies z.ZodType<Omit<Prisma.TaskCreateInput, "createdBy">>;

export const createTaskAiSchema = createTaskSchema
	.pick({
		title: true,
	})
	.merge(
		z.object({
			statusId: z.string().trim(),
			thumbnail: z.custom<FileWithPath[]>().transform((file) => file),
		}),
	);
export type CreateTaskAiSchema = z.infer<typeof createTaskAiSchema>;
