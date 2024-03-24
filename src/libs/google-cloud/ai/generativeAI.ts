import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GCLOUD_API_KEY);

export const generativeModel = genAI.getGenerativeModel({
	model: env.GCLOUD_AI_MODEL,
});
