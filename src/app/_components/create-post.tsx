"use client";

import { Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
	const router = useRouter();
	const [name, setName] = useState("");

	const createPost = api.post.create.useMutation({
		onSuccess: () => {
			router.refresh();
			setName("");
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createPost.mutate({ name });
			}}
		>
			<TextInput
				type="text"
				placeholder="Title"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Button type="submit" disabled={createPost.isLoading}>
				{createPost.isLoading ? "Submitting..." : "Submit"}
			</Button>
		</form>
	);
}
