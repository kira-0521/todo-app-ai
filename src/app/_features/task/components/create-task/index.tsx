"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { api } from "~/trpc/react";

const schema = z.object({
	title: z.string().min(2, { message: "Name should have at least 2 letters" }),
});

export function CreateTask() {
	const router = useRouter();
	const form = useForm({
		initialValues: {
			title: "",
		},
		validate: zodResolver(schema),
	});

	const createTask = api.task.create.useMutation({
		onSuccess: () => {
			router.refresh();
		},
	});

	const STATUS_ID_TEMP = 1;

	return (
		<form
			onSubmit={form.onSubmit((values) =>
				createTask.mutate({ title: values.title, statusId: STATUS_ID_TEMP }),
			)}
		>
			<TextInput
				type="text"
				placeholder="Title"
				{...form.getInputProps("title")}
			/>
			<Button type="submit" disabled={createTask.isLoading}>
				{createTask.isLoading ? "Submitting..." : "Submit"}
			</Button>
		</form>
	);
}
