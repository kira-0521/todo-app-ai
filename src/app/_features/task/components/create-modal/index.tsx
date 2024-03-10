"use client";

import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { memo } from "react";

import type { FC } from "react";
import { CreateTask } from "..";

type Props = {
	isOpen: boolean;
};

export const CreateModal: FC<Props> = memo(({ isOpen }) => {
	const router = useRouter();
	return (
		<Modal
			opened={isOpen}
			onClose={() => router.push("/")}
			title="Create Task"
			centered
			size="lg"
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
		>
			<CreateTask />
		</Modal>
	);
});
