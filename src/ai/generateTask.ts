import type {
	GenerateContentRequest,
	GenerativeContentBlob,
} from "@google-cloud/vertexai";
import { generativeModel } from "./init";

export const generateTask = async ({
	prompt,
	image,
}: {
	prompt: string;
	image: GenerativeContentBlob;
}) => {
	const req: GenerateContentRequest = {
		contents: [
			{ role: "user", parts: [{ text: prompt }, { inline_data: image }] },
		],
	};

	console.log("========================== req ==========================", req);

	const streamingResp = await generativeModel.generateContentStream(req);

	for await (const item of streamingResp.stream) {
		process.stdout.write(`stream chunk: ${JSON.stringify(item)}`);
	}

	process.stdout.write(
		`aggregated response: ${JSON.stringify(await streamingResp.response)}`,
	);
};
