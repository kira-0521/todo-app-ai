import type { Prisma } from "@prisma/client";
import { db } from "~/server/db";

export const createStatusRepository = () => {
	return {
		findAll: async () => {
			return await db.status.findMany();
		},
		findFirst: async (args?: Prisma.StatusFindFirstArgs) => {
			return await db.status.findFirst(args);
		},
		create: async (args: Prisma.StatusCreateArgs) => {
			return await db.status.create(args);
		},
	};
};

export type StatusRepositoryType = ReturnType<typeof createStatusRepository>;
