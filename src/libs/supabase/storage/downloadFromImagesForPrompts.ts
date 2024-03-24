import { supabase } from "..";

const BUCKET_NAME = "imageForPrompts";

export const downloadFromImagesForPrompts = async () => {
	const { data, error } = await supabase.storage.from(BUCKET_NAME).list();
	console.log(
		"========================== error ==========================",
		error,
	);

	if (!data) throw new Error("Invalid data");

	const result = await Promise.all(
		data?.map((img) => supabase.storage.from(BUCKET_NAME).download(img.name)),
	);

	if (result.some((r) => r.error)) {
		throw new Error(result[0]?.error?.message);
	}

	const blobs = result
		.map((r) => r.data)
		.filter((blobOrNull): blobOrNull is Blob => !!blobOrNull);

	return blobs;
};
