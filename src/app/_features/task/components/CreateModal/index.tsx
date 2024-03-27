"use client";

import { Button, Modal, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { Tabs } from "@mantine/core";
import { IconInputAi, IconPencil } from "@tabler/icons-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import type { FC } from "react";
import { CreateTaskForm, CreateTaskFromAIForm } from "..";
import type { CreateType } from "../..";

type Props = {
	isOpen: boolean;
	createType: CreateType;
};

export const CreateModal: FC<Props> = memo(({ isOpen, createType }) => {
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
			transitionProps={{ transition: "fade", duration: 200 }}
		>
			<ErrorBoundary
				errorComponent={({ error, reset }) => {
					return (
						<Stack>
							<Text c="danger">{error.message}</Text>
							<Button
								onClick={reset}
								type="button"
								variant="outline"
								color="danger"
							>
								Reset Modal
							</Button>
						</Stack>
					);
				}}
			>
				<Tabs
					defaultValue={createType}
					onChange={(value) => router.push(`/create?type=${value || "manual"}`)}
				>
					<Tabs.List>
						<Tabs.Tab value="manual" leftSection={<IconPencil />}>
							Manual
						</Tabs.Tab>
						<Tabs.Tab value="ai" leftSection={<IconInputAi />}>
							AI
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="manual" p={20}>
						<CreateTaskForm />
					</Tabs.Panel>

					<Tabs.Panel value="ai" p={20}>
						<CreateTaskFromAIForm />
					</Tabs.Panel>
				</Tabs>
			</ErrorBoundary>
		</Modal>
	);
});
