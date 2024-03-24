import type { Part } from "@google-cloud/vertexai";
import { downloadFromImagesForPrompts } from "~/libs/supabase";
import { fileToBase64 } from "../util";

export const generatePrompt = async (): Promise<Part[]> => {
	const [dashboardImg, modalImg, formImg] = await Promise.all(
		(await downloadFromImagesForPrompts()).map((image) => fileToBase64(image)),
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
			text: '```json```{"columns": [{"title": "ヘッダーの実装","content": "- [ ] アイコンコンポーネントの実装\n- [ ] ヘッダーコンポーネントの実装\n- [ ] 共通ボタンコンポーネントの実装"},{"title": "タスク一覧の実装","content": "- [ ] タスクパネルコンポーネントの実装\n- [ ] タスク一覧コンポーネントの実装"},{"title": "タスク追加ボタンの実装","content": "- [ ] タスク追加ボタンコンポーネントの実装"},{"title": "ダッシュボードページの実装","content": "- [ ] ヘッダーの配置\n- [ ] タスク一覧の配置\n- [ ] タスク追加ボタンの配置"',
		},
		{
			inline_data: {
				mime_type: "image/png",
				data: modalImg,
			},
		},
		{
			text: '{"columns": [{"title": "モーダルの実装","content": "- [ ] 共通モーダルコンポーネントの実装\n- [ ] モーダルコンポーネントの実装"}]}',
		},
		{
			inline_data: {
				mime_type: "image/png",
				data: formImg,
			},
		},
		{
			text: '{"columns": [{"title": "フォームコンポーネントの実装","content": "- [ ] 共通フォームコンポーネントの実装\n- [ ] 共通インプットコンポーネントの実装"}]}',
		},
		{
			text: "この画像をもとにタスクを生成して下さい。",
		},
	];
};
