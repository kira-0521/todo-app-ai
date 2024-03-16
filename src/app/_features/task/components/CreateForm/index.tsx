"use client";

import { createTaskAction } from "~/server/actions";
import { api } from "~/trpc/react";
import { ContentTextarea, Form, StatusSelect, TitleInput } from "..";

export function CreateTaskForm() {
	const { data: allStatus, isLoading } = api.status.getAll.useQuery();

	return (
		<Form
			form={{
				action: createTaskAction,
			}}
			isLoadingOverlay={isLoading}
		>
			<TitleInput />
			<StatusSelect allStatus={allStatus ?? []} />
			<ContentTextarea />
		</Form>
	);
}
