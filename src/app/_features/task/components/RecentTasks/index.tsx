"use client";

import {
	Avatar,
	Badge,
	Flex,
	Highlight,
	SimpleGrid,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { memo } from "react";
import type { TaskList } from "~/@types/task";
import classes from "./index.module.css";

import { format } from "date-fns";
import Link from "next/link";
import type { FC } from "react";
import {
	STATUS_COLOR_MAP,
	statusGuard,
} from "~/app/_features/status/@types/status";
import { isWithinLastFiveMinutes } from "~/libs/utils";

type Props = {
	taskList: TaskList;
};

export const RecentTasks: FC<Props> = memo(({ taskList }) => {
	const recentTasks = taskList.filter((t) =>
		isWithinLastFiveMinutes(t.createdAt),
	);

	return (
		<Stack gap="sm" mah={280}>
			<Title order={2} className={classes.heading}>
				Recent Tasks
			</Title>
			{recentTasks.length ? (
				<Highlight
					highlight="last 5 minutes"
					color="orange"
					className={classes.description}
				>
					List of tasks created in the last 5 minutes.
				</Highlight>
			) : (
				<Text fs="italic" className={classes.description}>
					No Recent Tasks.
				</Text>
			)}
			{recentTasks.length !== 0 && (
				<SimpleGrid
					className={classes.cards}
					cols={4}
					spacing="xs"
					verticalSpacing="xs"
				>
					{recentTasks.map((task) => (
						<Flex
							key={task.id}
							component={Link}
							className={classes.card}
							gap="xs"
							align="start"
							direction="column"
							href={`/task?id=${task.id}`}
						>
							<Title order={5} lineClamp={1}>
								{task.title}
							</Title>
							<Flex gap="xs">
								<Badge
									size="xs"
									color={
										statusGuard(task.status)
											? STATUS_COLOR_MAP[task.status]
											: "gray"
									}
								>
									{task.status}
								</Badge>
								<Tooltip label={task.username}>
									<Avatar size="xs" src={task.userIconUrl} />
								</Tooltip>
							</Flex>
							<Text lineClamp={2} c="dimmed" size="xs">
								created: {format(task.createdAt, "yyyy-MM-dd HH:mm:ss")}
							</Text>
						</Flex>
					))}
				</SimpleGrid>
			)}
		</Stack>
	);
});
