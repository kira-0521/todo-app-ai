"use client";

import { Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { api } from "~/trpc/react";

const schema = z.object({
	title: z
		.string()
		.min(2, { message: "Title should be at least 2 characters" }),
	displayOrder: z
		.number()
		.min(1, { message: "Display order should be at least 1" }),
});

export function CreateStatus() {
	const router = useRouter();
	const form = useForm({
		initialValues: {
			title: "",
			displayOrder: 1,
		},
		validate: zodResolver(schema),
	});

	const createStatus = api.status.create.useMutation({
		onSuccess: () => {
			router.refresh();
		},
	});

	const STATUS_ID_TEMP = 1;

	return (
		<form
			onSubmit={form.onSubmit((values) =>
				createStatus.mutate({
					title: values.title,
					displayOrder: STATUS_ID_TEMP,
				}),
			)}
		>
			<TextInput
				type="text"
				placeholder="Title"
				{...form.getInputProps("title")}
			/>
			<NumberInput
				placeholder="DisplayOrder"
				{...form.getInputProps("displayOrder")}
			/>
			<Button type="submit" disabled={createStatus.isLoading}>
				{createStatus.isLoading ? "Submitting..." : "Submit"}
			</Button>
		</form>
	);
}
