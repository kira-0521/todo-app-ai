import { Container, Flex, Text } from "@mantine/core";

import { api } from "~/trpc/server";

import { Suspense } from "react";

import { DashBoardSkelton } from "./_components/skelton";
import { TaskList } from "./_features/task/";

export default function Home() {
	return (
		<main>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard />
				</Suspense>
			</Container>
		</main>
	);
}

const NOT_EXISTENT_ID = 0;
async function Dashboard() {
	const statuses = await api.status.getAll.query();
	const tasks = await api.task.getAll.query();

	const taskStatusMap = tasks.reduce<Record<number, (typeof tasks)[number][]>>(
		(acc, task) => {
			const statusId = task.statusId ?? NOT_EXISTENT_ID;
			if (!acc[statusId]) {
				acc[statusId] = [];
			}
			acc[statusId] = [...(acc[statusId] ?? []), task];
			return acc;
		},
		{ [NOT_EXISTENT_ID]: [] },
	);

	tasks[Symbol.iterator] = function* () {
		yield* this;
	};

	return (
		<Flex gap={20}>
			{statuses
				.filter((s) => s.id !== NOT_EXISTENT_ID)
				.sort((a, b) => a.displayOrder - b.displayOrder)
				.map((status) => (
					<Flex key={status.id} direction="column" miw={300}>
						<Text>{status.title}</Text>
						<TaskList taskList={taskStatusMap[status.id] ?? []} />
					</Flex>
				))}
		</Flex>
	);
}
