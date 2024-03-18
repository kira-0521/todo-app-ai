import { db } from "~/server/db";

export const createUserRepository = () => {
	return {
		findById: async (id: string) => {
			return await db.user.findUnique({ where: { id } });
		},
	};
};

export type UserRepository = ReturnType<typeof createUserRepository>;
