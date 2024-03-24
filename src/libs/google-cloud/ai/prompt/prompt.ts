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
			text: '{"columns": [{"title": "Header Implementation", "content": "- [ ] Implement icon component - [ ] Implement header component - [ ] Implement common button component"}, {"title": "Task List Implementation", "content": "- [ ] Implement task panel component - [ ] Implement task list component"}, {"title": "Add Task Button Implementation", "content": "- [ ] Implement add task button component"}, {"title": "Dashboard Page Implementation", "content": "- [ ] Place header - [ ] Place task list - [ ] Place add task button - [ ] styling"}]}',
		},
		{
			inlineData: {
				mimeType: "image/png",
				data: modalImg,
			},
		},
		{
			text: '{"columns": [{"title": "Header Implementation", "content": "- [ ] Implement Logo component - [ ] Implement header component - [ ] Implement icons component - [ ] Implement icons event - [ ] styling"},{"title": "Admin User Management Form Implementation", "content": "- [ ] Implement FormHeader - [ ] Implement common input component - [ ] Implement Firstame - [ ] Implement Lastname - [ ] Implement Email - [ ] Implement Password - [ ] Implement Role - [ ] Implement CreateUser Button"},{"title": "Footer Implementation", "content": "- [ ] Implement Footer component - [ ] Implement All right reserved - [ ] styling" }]}',
		},
		{
			inlineData: {
				mimeType: "image/png",
				data: formImg,
			},
		},
		{
			text: '{"columns": [{"title": "Header Implementation", "content": "- [ ] Implement Logo component - [ ] Implement header component - [ ] Implement search component - [ ] Implement share component - [ ] styling"},{"title": "Orders Table Implementation", "content": "- [ ] Implement table component - [ ] Implement table header component - [ ] Implement table body component - [ ] Implement table row component - [ ] Implement table cell component - [ ] styling"},{"title": "Footer Implementation", "content": "- [ ] Implement Footer component - [ ] Implement All right reserved - [ ] styling"}]}',
		},
	];
};
