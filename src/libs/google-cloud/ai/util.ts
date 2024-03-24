import type { BunFile } from "bun";

export const fileToBase64 = async (file: File | BunFile | Blob) => {
	const arrBuf = await file.arrayBuffer();
	const buffer = Buffer.from(arrBuf);
	const base64String = buffer.toString("base64");
	return base64String;
};
