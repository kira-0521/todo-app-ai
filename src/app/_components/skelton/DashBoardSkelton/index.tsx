"use client";

import { SimpleGrid, Skeleton, Stack } from "@mantine/core";
import { type FC, memo } from "react";

export const DashBoardSkelton: FC = memo(() => {
	return (
		<SimpleGrid cols={3}>
			<Stack miw={300}>
				<Skeleton height={50} radius="md" />
				<Skeleton height={50} radius="md" />
				<Skeleton height={50} radius="md" />
			</Stack>
			<Stack miw={300}>
				<Skeleton height={50} radius="md" />
				<Skeleton height={50} radius="md" />
				<Skeleton height={50} radius="md" />
			</Stack>
			<Stack miw={300}>
				<Skeleton height={50} radius="md" />
				<Skeleton height={50} radius="md" />
				<Skeleton height={50} radius="md" />
			</Stack>
		</SimpleGrid>
	);
});
