"use client";

import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { createTaskAction } from "~/server/actions";
import { api } from "~/trpc/react";
import { ContentTextarea, Form, StatusSelect, TitleInput } from "..";

export function CreateTaskForm() {
	const [state, dispatchAction] = useFormState(createTaskAction, {
		errorMessage: "",
	});
	const { data: allStatus, isLoading } = api.status.getAll.useQuery();

	useEffect(() => {
		if (state?.errorMessage) {
			notifications.show({
				title: "CreateTask",
				message: state.errorMessage,
				color: "danger",
			});
		}
	}, [state]);

	return (
		<Form
			form={{
				action: dispatchAction,
			}}
			isLoadingOverlay={isLoading}
		>
			<TitleInput />
			<StatusSelect allStatus={allStatus ?? []} />
			<ContentTextarea />
		</Form>
	);
}
