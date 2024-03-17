"use client";

import { FileInput, rem } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { type FC, memo } from "react";
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
			<FileInput
				id="thumbnail"
				name="thumbnail"
				label="Thumbnail"
				placeholder="Upload Thumbnail"
				description="AI reads thumbnails and creates tasks"
				withAsterisk
				leftSection={<IconAt style={{ width: rem(18), height: rem(18) }} />}
			/>
		</Form>
	);
});
