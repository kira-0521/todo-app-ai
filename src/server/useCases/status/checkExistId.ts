import type { Status } from "@prisma/client";
import { db } from "~/server/db";

export const checkExistId = async (id: Status["id"]): Promise<boolean> => {
	const statusIds = (await db.status.findMany()).map((status) => status.id);
	if (!statusIds.includes(id)) return false;
	return true;
};
