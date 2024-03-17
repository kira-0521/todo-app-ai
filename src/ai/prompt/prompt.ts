import fs from "fs";
import type { Part } from "@google-cloud/vertexai";

const images = [
	fs.readFileSync("./src/ai/prompt/image/dashboard.png"),
	fs.readFileSync("./src/ai/prompt/image/modal.png"),
	fs.readFileSync("./src/ai/prompt/image/form.png"),
];

export const generatePrompt = async (): Promise<Part[]> => {
	const [dashboardImg, modalImg, formImg] = images.map((image) =>
		image.toString("base64"),
	);

	if (!dashboardImg || !modalImg || !formImg) throw new Error("Invalid image");

	return [
		{
			text: "必要なタスクを生成します。\ncolumns,title,content,json形式。\n\n画像に含まれる文字列とUIコンポーネントが含まれるか正しく解析し、その上で必要なタスクを洗い出します。\n例えば1枚目の画像はヘッダー、タスクの一覧、タスクの追加ボタンが確認できます。\nまた、ヘッダーにはアイコン、タスクの一覧にはStatusを表す文字列とステータスに基づくタスクの一覧、タスクの追加ボタンには「+New」と書かれているのがわかります。",
		},
		{
			inline_data: {
				mime_type: "image/png",
				data: dashboardImg,
			},
		},
		{
			text: '```json```\n{\n"columns": [\n{\n"title": "ヘッダーの実装",\n"content": "- [ ] アイコンコンポーネントの実装\\n- [ ] ヘッダーコンポーネントの実装\\n- [ ] 共通ボタンコンポーネントの実装"\n},\n{\n"title": "タスク一覧の実装",\n"content": "- [ ] タスクパネルコンポーネントの実装\\n- [ ] タスク一覧コンポーネントの実装"\n},\n{\n"title": "タスク追加ボタンの実装",\n"content": "- [ ] タスク追加ボタンコンポーネントの実装"\n},\n{\n"title": "ダッシュボードページの実装",\n"content": "- [ ] ヘッダーの配置\\n- [ ] タスク一覧の配置\\n- [ ] タスク追加ボタンの配置"\n',
		},
		{
			inline_data: {
				mime_type: "image/png",
				data: modalImg,
			},
		},
		{
			text: '{\n"columns": [\n{\n"title": "モーダルの実装",\n"content": "- [ ] 共通モーダルコンポーネントの実装\\n- [ ] モーダルコンポーネントの実装"\n},\n]\n}',
		},
		{
			inline_data: {
				mime_type: "image/png",
				data: formImg,
			},
		},
		{
			text: '{\n"columns": [\n{\n"title": "フォームコンポーネントの実装",\n"content": "- [ ] 共通フォームコンポーネントの実装\\n- [ ] 共通インプットコンポーネントの実装"\n},\n]\n}',
		},
		{
			text: "この画像をもとにタスクを生成して下さい。",
		},
	];
};
