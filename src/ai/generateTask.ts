import type {
	GenerateContentRequest,
	GenerativeContentBlob,
} from "@google-cloud/vertexai";
import { generativeModel } from "./init";
import { generatePrompt } from "./prompt/prompt";

export const generateTask = async ({
	image,
}: {
	image: GenerativeContentBlob;
}) => {
	const req: GenerateContentRequest = {
		contents: [
			{
				role: "user",
				parts: [
					...(await generatePrompt()),
					{
						inline_data: image,
					},
				],
			},
		],
	};

	const streamingResp = await generativeModel.generateContentStream(req);

	for await (const item of streamingResp.stream) {
		process.stdout.write(`stream chunk: ${JSON.stringify(item)}`);
	}

	const {
		candidates: [content],
	} = await streamingResp.response;
	if (!content) throw new Error("Invalid content");
	const {
		content: { parts },
	} = content;
	return parts;
};
