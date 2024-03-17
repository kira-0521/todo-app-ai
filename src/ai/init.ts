import {
	HarmBlockThreshold,
	HarmCategory,
	VertexAI,
} from "@google-cloud/vertexai";
import { env } from "~/env";

const vertexAI = new VertexAI({
	project: env.GCLOUD_PROJECT_ID,
	location: env.GCLOUD_LOCATION,
});
const model = env.GCLOUD_AI_MODEL;

export const generativeModel = vertexAI.preview.getGenerativeModel({
	model,
	generation_config: {
		max_output_tokens: 2048,
		temperature: 0.4,
		top_p: 1,
		top_k: 32,
	},
	safety_settings: [
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	],
});
