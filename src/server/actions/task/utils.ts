import type { UpdateTaskSchema } from ".";

export const toFormDataForUpdateTask = (schema: UpdateTaskSchema): FormData => {
	const formData = new FormData();
	formData.append("statusId", schema.statusId.toString());
	formData.append("id", schema.id.toString());
	formData.append("title", schema.title);
	formData.append("content", schema.content);

	return formData;
};
