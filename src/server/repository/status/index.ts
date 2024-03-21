import type { Prisma, Status } from "@prisma/client";
import { db } from "~/server/db";

export const createStatusRepository = () => {
	return {
		findAll: async () => {
			return await db.status.findMany();
		},
		findById: async (id: Status["id"]) => {
			return await db.status.findUnique({ where: { id } });
		},
		create: async (args: Prisma.StatusCreateArgs) => {
			return await db.status.create(args);
		},
	};
};

export type StatusRepository = ReturnType<typeof createStatusRepository>;
