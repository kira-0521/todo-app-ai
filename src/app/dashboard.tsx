import { Flex, Title } from "@mantine/core";

import type { FC } from "react";
import { api } from "~/trpc/server";
import { CreateModal, TaskList } from "./_features";

type Props = { isOpenModal: boolean };

const NOT_EXISTENT_ID = 0;
export const Dashboard: FC<Props> = async ({ isOpenModal }) => {
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
		<>
			<Flex gap={20}>
				{statuses
					.filter((s) => s.id !== NOT_EXISTENT_ID)
					.sort((a, b) => a.displayOrder - b.displayOrder)
					.map((status) => (
						<Flex key={status.id} direction="column" miw={300}>
							<Title order={2} lineClamp={1}>
								{status.title}
							</Title>
							<TaskList taskList={taskStatusMap[status.id] ?? []} />
						</Flex>
					))}
			</Flex>
			<CreateModal isOpen={isOpenModal} />
		</>
	);
};
