"use client";

import { type FC, memo } from "react";
import { Dropzone } from "~/app/_components";
import { createTaskFromAIAction } from "~/server/actions";
import { api } from "~/trpc/react";
import { Form, StatusSelect, TitleInput } from "..";

export const CreateTaskFromAIForm: FC = memo(() => {
	const { data: allStatus, isLoading } = api.status.getAll.useQuery();

	return (
		<Form
			form={{
				action: createTaskFromAIAction,
			}}
			isLoadingOverlay={isLoading}
		>
			<TitleInput />
			<StatusSelect allStatus={allStatus ?? []} />
			<Dropzone
				name="thumbnail"
				onSelected={(file) => {
					// TODO: 選択したファイルを表示する
					console.log(
						"========================== onSelected:file ==========================",
						file,
					);
				}}
			/>
		</Form>
	);
});
