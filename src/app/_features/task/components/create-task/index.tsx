"use client";

import {
	Button,
	LoadingOverlay,
	Select,
	Stack,
	TextInput,
	Textarea,
} from "@mantine/core";
import { createTaskAction } from "~/server/actions";
import { api } from "~/trpc/react";

export function CreateTask() {
	const { data: allStatus, isLoading } = api.status.getAll.useQuery();

	return (
		<form action={createTaskAction}>
			<Stack pos="relative">
				<LoadingOverlay
					visible={isLoading}
					loaderProps={{ children: "Loading..." }}
				/>
				<TextInput
					id="title"
					name="title"
					size="md"
					type="text"
					label="Title"
					placeholder="Task Title"
					withAsterisk
					description="Input your task title here."
				/>
				<Textarea
					id="content"
					name="content"
					size="md"
					label="Content"
					placeholder="Task Content"
					description="Input your task process, description, or anything else here."
				/>
				<Select
					label="Status"
					id="statusId"
					name="statusId"
					placeholder="Pick status"
					description="Pick your task status here."
					size="md"
					withAsterisk
					withCheckIcon
					data={
						allStatus
							? allStatus.map((status) => ({
									value: status.id.toString(),
									label: status.title,
							  }))
							: []
					}
					searchable
				/>
				<Button type="submit">Submit</Button>
			</Stack>
		</form>
	);
}
