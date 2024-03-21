export const parseTaskId = (formData: FormData, key = "") => {
	const id = formData.get(key ? key : "id");
	if (typeof id !== "string") throw new Error(`Invalid taskId: ${id}`);
	const parsedTaskId = Number.parseInt(id, 10);
	return parsedTaskId;
};
