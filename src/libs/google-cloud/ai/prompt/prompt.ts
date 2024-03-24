import type { Part } from "@google/generative-ai";
import { downloadFromImagesForPrompts } from "~/libs/supabase";
import { fileToBase64 } from "../util";

export const generatePrompt = async (): Promise<Part[]> => {
	const [dashboardImg, modalImg, formImg] = await Promise.all(
		(await downloadFromImagesForPrompts()).map((image) => fileToBase64(image)),
	);

	if (!dashboardImg || !modalImg || !formImg) throw new Error("Invalid image");

	return [
		{
			text: "Generate required tasks. \ncolumns, title, and content should be in valid JSON format.\n\nParse the strings and UI components included in the image correctly, and identify the required tasks based on the results.\n\nFor example, the first image shows a header, a list of tasks, and a button to add tasks.\n\nWe can also see that the header has an icon, the list of tasks has strings representing the status and a list of tasks based on the status, and the button to add tasks has the text '+New'.",
		},
		{
			inlineData: {
				mimeType: "image/png",
				data: dashboardImg,
			},
		},
		{
			text: '{"columns": [{"title": "Header Implementation", "content": "- [ ] Implement icon component - [ ] Implement header component - [ ] Implement common button component"}, {"title": "Task List Implementation", "content": "- [ ] Implement task panel component - [ ] Implement task list component"}, {"title": "Add Task Button Implementation", "content": "- [ ] Implement add task button component"}, {"title": "Dashboard Page Implementation", "content": "- [ ] Place header - [ ] Place task list - [ ] Place add task button"}]}',
		},
		{
			inlineData: {
				mimeType: "image/png",
				data: modalImg,
			},
		},
		{
			text: '{"columns": [{"title": "Modal Implementation", "content": "- [ ] Implement common modal component - [ ] Implement modal component"}]}',
		},
		{
			inlineData: {
				mimeType: "image/png",
				data: formImg,
			},
		},
		{
			text: '{"columns": [{"title": "Form Component Implementation", "content": "- [ ] Implement common form component - [ ] Implement common input component"}]}',
		},
		{
			text: "Generate tasks based on this image.",
		},
	];
};
