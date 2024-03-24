import type {
	GenerateContentRequest,
	GenerativeContentBlob,
} from "@google-cloud/vertexai";
import { generativeModel } from "./init";
import { generatePrompt } from "./prompt/prompt";

type Column = {
	title: string;
	content: string;
};
export type GenerateTaskResponse = {
	columns: Column[];
};

export const generateTask = async ({
	image,
}: {
	image: GenerativeContentBlob;
}): Promise<GenerateTaskResponse> => {
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
	const part = parts[0];
	if (!part || !part.text) throw new Error("Invalid part");
	console.log(
		"========================== part ==========================",
		part,
	);
	console.log(
		"========================== part.text ==========================",
		part.text,
	);
	const columns = JSON.parse(
		part.text.replace("```json```", ""),
	) as GenerateTaskResponse;
	return columns;
};
