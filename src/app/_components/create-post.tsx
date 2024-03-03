"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { api } from "~/trpc/react";

const schema = z.object({
	name: z.string().min(2, { message: "Name should have at least 2 letters" }),
});

export function CreatePost() {
	const router = useRouter();
	const form = useForm({
		initialValues: {
			name: "",
		},
		validate: zodResolver(schema),
	});

	const createPost = api.post.create.useMutation({
		onSuccess: () => {
			router.refresh();
		},
	});

	return (
		<form
			onSubmit={form.onSubmit((values) =>
				createPost.mutate({ name: values.name }),
			)}
		>
			<TextInput
				type="text"
				placeholder="Title"
				{...form.getInputProps("name")}
			/>
			<Button type="submit" disabled={createPost.isLoading}>
				{createPost.isLoading ? "Submitting..." : "Submit"}
			</Button>
		</form>
	);
}
