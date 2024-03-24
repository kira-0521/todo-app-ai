import type {
	GenerateContentRequest,
	GenerativeContentBlob,
} from "@google/generative-ai";
import { generativeModel } from "./generativeAI";
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
						inlineData: image,
					},
				],
			},
		],
	};

	const result = await generativeModel.generateContent(req);
	const response = result.response;
	const text = response.text();

	console.log(
		"========================== text ==========================\n",
		text.replace("```json```", ""),
	);

	const columns = JSON.parse(
		text.replace("```json```", ""),
	) as GenerateTaskResponse;
	return columns;
};
