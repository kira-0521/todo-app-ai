"use client";

import { FileInput, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAt } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { useFormState } from "react-dom";
import { createTaskFromAIAction } from "~/server/actions";
import { Form } from "..";

export const CreateTaskFromAIForm: FC = memo(() => {
	const router = useRouter();
	const [state, dispatchAction] = useFormState(createTaskFromAIAction, {
		status: "success",
		message: "",
		length: 0,
	});

	useEffect(() => {
		if (state.status === "error") {
			notifications.show({
				title: "CreateTask",
				message: state.message,
				color: "danger",
			});
		}
		if (state.status === "success" && !!state.length) {
			notifications.show({
				title: "CreateTask",
				message: `Created ${state.length} tasks`,
			});
			router.refresh();
		}
	}, [state, router]);

	return (
		<Form
			form={{
				action: dispatchAction,
			}}
		>
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
