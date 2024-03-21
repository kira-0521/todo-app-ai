import { db } from "~/server/db";

export const createUserRepository = () => {
	return {
		findAll: async () => {
			return await db.user.findMany();
		},
		findById: async (id: string) => {
			return await db.user.findUnique({ where: { id } });
		},
	};
};

export type UserRepository = ReturnType<typeof createUserRepository>;
