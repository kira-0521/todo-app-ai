import { Skeleton, Stack } from "@mantine/core";
import type { FC } from "react";

export const TaskListSkeleton: FC = () => {
	return (
		<Stack gap="sm">
			<Skeleton height={50} radius="md" />
			<Skeleton height={50} radius="md" />
			<Skeleton height={50} radius="md" />
		</Stack>
	);
};
