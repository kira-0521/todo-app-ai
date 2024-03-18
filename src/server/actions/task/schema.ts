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
}) satisfies z.ZodType<Partial<Omit<Prisma.TaskCreateInput, "createdBy">>>;
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const createTaskAiSchema = z.object({
	thumbnail: z.custom<File>().transform((file) => file),
});
export type CreateTaskAiSchema = z.infer<typeof createTaskAiSchema>;

export const deleteTaskSchema = z.object({
	id: z.number(),
});
export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>;

export const updateTaskSchema = z.object({
	id: z.number(),
	title: z.string().trim().optional(),
	content: z.string().trim().optional(),
	statusId: z
		.number()
		.min(1, { message: "statusId is larger than 0" })
		.optional(),
});
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
