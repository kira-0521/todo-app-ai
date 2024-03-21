export const parseStatusId = (formData: FormData) => {
	const { statusId } = Object.fromEntries(formData);
	if (typeof statusId !== "string")
		throw new Error(`Invalid statusId: ${statusId}`);
	const parsedStatusId = Number.parseInt(statusId, 10);
	return parsedStatusId;
};
